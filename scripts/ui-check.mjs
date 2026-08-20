import { access, copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import OpenAI from "openai";
import { chromium } from "playwright";
import { uiCheckConfig } from "./ui-check.config.mjs";

function parseArgs(argv) {
  const args = {
    baseUrl: process.env.UI_CHECK_BASE_URL ?? uiCheckConfig.defaultBaseUrl,
    model: process.env.UI_CHECK_MODEL ?? uiCheckConfig.defaultModel,
    outputDir: process.env.UI_CHECK_OUTPUT_DIR ?? uiCheckConfig.outputDir,
    baselineDir: process.env.UI_CHECK_BASELINE_DIR ?? uiCheckConfig.baselineDir,
    writeBaseline: process.env.UI_CHECK_WRITE_BASELINE === "1",
    captureOnly: process.env.UI_CHECK_CAPTURE_ONLY === "1",
  };

  for (let index = 2; index < argv.length; index += 1) {
    const token = argv[index];

    if (token === "--base-url" && argv[index + 1]) {
      args.baseUrl = argv[index + 1];
      index += 1;
      continue;
    }

    if (token === "--model" && argv[index + 1]) {
      args.model = argv[index + 1];
      index += 1;
      continue;
    }

    if (token === "--output-dir" && argv[index + 1]) {
      args.outputDir = argv[index + 1];
      index += 1;
      continue;
    }

    if (token === "--baseline-dir" && argv[index + 1]) {
      args.baselineDir = argv[index + 1];
      index += 1;
      continue;
    }

    if (token === "--write-baseline") {
      args.writeBaseline = true;
      continue;
    }

    if (token === "--capture-only") {
      args.captureOnly = true;
      continue;
    }

    if (token === "--help" || token === "-h") {
      args.help = true;
    }
  }

  return args;
}

function normalizeBaseUrl(value) {
  const normalized = value.endsWith("/") ? value : `${value}/`;
  return new URL(normalized);
}

async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function waitForServer(baseUrl) {
  const timeoutMs = 120_000;
  const start = Date.now();

  while (Date.now() - start < timeoutMs) {
    try {
      const response = await fetch(baseUrl);
      if (response.ok) {
        return;
      }
    } catch {
      // Retry until the server is ready.
    }

    await delay(1000);
  }

  throw new Error(`Timed out waiting for ${baseUrl.href}`);
}

function imageDataUrl(buffer) {
  return `data:image/png;base64,${buffer.toString("base64")}`;
}

function stripCodeFences(value) {
  const trimmed = value.trim();

  if (trimmed.startsWith("```")) {
    return trimmed
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/```$/, "")
      .trim();
  }

  return trimmed;
}

function extractJsonObject(text) {
  const cleaned = stripCodeFences(text);

  try {
    return JSON.parse(cleaned);
  } catch {
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (!match) {
      throw new Error("Judge output did not contain JSON.");
    }

    return JSON.parse(match[0]);
  }
}

function buildJudgePrompt(scenario, hasBaseline) {
  const expectationLines = scenario.expectations.map((item) => `- ${item}`).join("\n");

  return [
    scenario.prompt,
    "",
    "Scenario expectations:",
    expectationLines,
    "",
    hasBaseline
      ? "Image 1 is the baseline screenshot and image 2 is the current screenshot."
      : "The image is the current screenshot only.",
    "",
    "Return strict JSON only with this shape:",
    "{",
    '  "pass": boolean,',
    '  "confidence": number,',
    '  "summary": string,',
    '  "issues": [',
    "    {",
    '      "severity": "low" | "medium" | "high",',
    '      "title": string,',
    '      "evidence": string,',
    '      "recommendation": string',
    "    }",
    "  ],",
    '  "baselineDiffs": string[],',
    '  "notes": string[]',
    "}",
    "",
    "Do not wrap the answer in markdown.",
  ].join("\n");
}

function formatSummaryRow(result) {
  const status = result.capture.ok
    ? result.judge
      ? result.judge.pass
        ? "PASS"
        : "FAIL"
      : "CAPTURED"
    : "ERROR";

  return {
    scenario: result.scenario.id,
    status,
    confidence: result.judge?.confidence ?? "",
    route: result.scenario.route,
    viewport: `${result.scenario.viewport.width}x${result.scenario.viewport.height}`,
    screenshot: path.relative(process.cwd(), result.screenshotPath),
  };
}

async function captureScenario(browser, scenario, baseUrl, outputRoot, baselineRoot, writeBaseline) {
  const scenarioDir = path.join(outputRoot, scenario.id);
  const screenshotPath = path.join(scenarioDir, "current.png");
  const baselinePath = path.join(baselineRoot, `${scenario.id}.png`);
  await mkdir(scenarioDir, { recursive: true });

  const context = await browser.newContext({
    viewport: scenario.viewport,
    deviceScaleFactor: 1,
    colorScheme: "light",
  });

  const page = await context.newPage();
  page.setDefaultTimeout(20_000);

  const targetUrl = new URL(scenario.route, baseUrl).toString();

  try {
    await page.goto(targetUrl, { waitUntil: "domcontentloaded", timeout: 60_000 });
    await page.waitForLoadState("networkidle", { timeout: 10_000 }).catch(() => {});
    await page.evaluate(async () => {
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }
    });

    if (scenario.scrollY && scenario.scrollY > 0) {
      await page.evaluate((scrollY) => window.scrollTo({ top: scrollY, left: 0 }), scenario.scrollY);
    }

    await page.waitForTimeout(scenario.settleMs ?? 750);
    await page.screenshot({ path: screenshotPath, fullPage: false, animations: "disabled" });

    if (writeBaseline) {
      await mkdir(baselineRoot, { recursive: true });
      await copyFile(screenshotPath, baselinePath);
    }

    return {
      ok: true,
      url: targetUrl,
      screenshotPath,
      baselinePath,
    };
  } catch (error) {
    return {
      ok: false,
      url: targetUrl,
      screenshotPath,
      baselinePath,
      error: error instanceof Error ? error.message : String(error),
    };
  } finally {
    await page.close().catch(() => {});
    await context.close().catch(() => {});
  }
}

async function judgeScenario(client, scenario, captureResult, baselineAvailable, model) {
  const currentBuffer = await readFile(captureResult.screenshotPath);
  const content = [
    { type: "input_text", text: buildJudgePrompt(scenario, baselineAvailable) },
  ];

  if (baselineAvailable) {
    const baselineBuffer = await readFile(captureResult.baselinePath);
    content.push({
      type: "input_image",
      image_url: imageDataUrl(baselineBuffer),
      detail: "high",
    });
  }

  content.push({
    type: "input_image",
    image_url: imageDataUrl(currentBuffer),
    detail: "high",
  });

  const response = await client.responses.create({
    model,
    input: [
      {
        role: "user",
        content,
      },
    ],
    max_output_tokens: 1200,
  });

  const outputText = response.output_text?.trim() ?? "";

  if (!outputText) {
    throw new Error("Judge did not return any text.");
  }

  const parsed = extractJsonObject(outputText);

  return {
    pass: Boolean(parsed.pass),
    confidence: typeof parsed.confidence === "number" ? parsed.confidence : null,
    summary: typeof parsed.summary === "string" ? parsed.summary : "",
    issues: Array.isArray(parsed.issues) ? parsed.issues : [],
    baselineDiffs: Array.isArray(parsed.baselineDiffs) ? parsed.baselineDiffs : [],
    notes: Array.isArray(parsed.notes) ? parsed.notes : [],
    raw: parsed,
  };
}

function printHelp() {
  console.log([
    "Usage: pnpm ui:check [options]",
    "",
    "Options:",
    "  --base-url <url>       Base URL to check (default: UI_CHECK_BASE_URL or http://127.0.0.1:3000)",
    "  --model <name>         OpenAI model to use (default: UI_CHECK_MODEL or gpt-5.6)",
    "  --output-dir <path>    Output directory for screenshots and reports",
    "  --baseline-dir <path>  Baseline screenshot directory",
    "  --write-baseline       Copy current screenshots into the baseline directory",
    "  --capture-only         Skip OpenAI judge and only capture screenshots",
    "  -h, --help             Show this help",
  ].join("\n"));
}

async function main() {
  const args = parseArgs(process.argv);

  if (args.help) {
    printHelp();
    return;
  }

  const baseUrl = normalizeBaseUrl(args.baseUrl);
  const outputRoot = path.resolve(args.outputDir);
  const baselineRoot = path.resolve(args.baselineDir);

  await mkdir(outputRoot, { recursive: true });
  await waitForServer(baseUrl);

  let client = null;
  if (!args.captureOnly) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is required unless --capture-only is set.");
    }

    client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  const browser = await chromium.launch({ headless: true });
  const results = [];

  try {
    for (const scenario of uiCheckConfig.scenarios) {
      const captureResult = await captureScenario(
        browser,
        scenario,
        baseUrl,
        outputRoot,
        baselineRoot,
        args.writeBaseline,
      );

      const scenarioResult = {
        scenario,
        url: captureResult.url,
        screenshotPath: captureResult.screenshotPath,
        baselinePath: captureResult.baselinePath,
        capture: {
          ok: captureResult.ok,
          error: captureResult.error ?? null,
        },
        judge: null,
      };

      if (captureResult.ok && !args.captureOnly) {
        const baselineAvailable = !args.writeBaseline && (await fileExists(captureResult.baselinePath));

        try {
          scenarioResult.judge = await judgeScenario(
            client,
            scenario,
            captureResult,
            baselineAvailable,
            args.model,
          );
        } catch (error) {
          scenarioResult.judge = {
            pass: false,
            confidence: null,
            summary: error instanceof Error ? error.message : String(error),
            issues: [],
            baselineDiffs: [],
            notes: [],
            raw: null,
          };
        }
      }

      results.push(scenarioResult);
    }
  } finally {
    await browser.close().catch(() => {});
  }

  const summary = results.map(formatSummaryRow);
  console.table(summary);

  const report = {
    runAt: new Date().toISOString(),
    baseUrl: baseUrl.toString(),
    model: args.model,
    captureOnly: args.captureOnly,
    writeBaseline: args.writeBaseline,
    results,
  };

  const reportJsonPath = path.join(outputRoot, "report.json");
  const reportMdPath = path.join(outputRoot, "report.md");
  await writeFile(reportJsonPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");

  const mdLines = [
    "# UI Check Report",
    "",
    `Base URL: ${baseUrl.toString()}`,
    `Model: ${args.captureOnly ? "capture-only" : args.model}`,
    `Run at: ${report.runAt}`,
    "",
    "| Scenario | Status | Confidence | Route | Viewport | Screenshot |",
    "| --- | --- | --- | --- | --- | --- |",
    ...summary.map(
      (row) =>
        `| ${row.scenario} | ${row.status} | ${row.confidence ?? ""} | ${row.route} | ${row.viewport} | ${row.screenshot} |`,
    ),
    "",
  ];

  await writeFile(reportMdPath, `${mdLines.join("\n")}\n`, "utf8");

  const failures = results.filter(
    (result) => !result.capture.ok || (result.judge !== null && !result.judge.pass),
  );

  if (failures.length > 0) {
    console.error("\nUI check failed for the following scenarios:");
    for (const failure of failures) {
      const reason = failure.capture.ok ? failure.judge?.summary ?? "Unknown judge failure" : failure.capture.error;
      console.error(`- ${failure.scenario.id}: ${reason}`);
    }

    console.error(`\nReport written to ${path.relative(process.cwd(), reportMdPath)}`);
    process.exitCode = 1;
    return;
  }

  console.log(`\nAll UI checks passed. Report written to ${path.relative(process.cwd(), reportMdPath)}`);
}

main().catch((error) => {
  const message = error instanceof Error ? error.stack ?? error.message : String(error);
  console.error(message);

  if (/browser|executable/i.test(message)) {
    console.error("\nIf Playwright browsers are missing, run: pnpm exec playwright install chromium");
  }

  process.exitCode = 1;
});
