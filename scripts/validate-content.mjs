import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const scanDirs = ["src"];
const placeholderPattern = /\bTODO_(?:SEO|CONTENT)_[A-Z0-9_]*\b/g;
const allowedReviewPlaceholder = "TODO_CONTENT_REVIEW";
const textExtensions = new Set([
  ".css",
  ".js",
  ".jsx",
  ".json",
  ".md",
  ".mjs",
  ".ts",
  ".tsx",
  ".yml",
  ".yaml",
]);

const failures = [];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const absolutePath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await walk(absolutePath);
      continue;
    }

    if (!entry.isFile() || !textExtensions.has(path.extname(entry.name))) {
      continue;
    }

    const content = await readFile(absolutePath, "utf8");
    const matches = [...content.matchAll(placeholderPattern)]
      .map((match) => match[0])
      .filter((placeholder) => placeholder !== allowedReviewPlaceholder);

    if (matches.length > 0) {
      failures.push({
        file: path.relative(root, absolutePath),
        placeholders: [...new Set(matches)],
      });
    }
  }
}

for (const dir of scanDirs) {
  await walk(path.join(root, dir));
}

if (failures.length > 0) {
  console.error("Content validation failed. Remove required TODO placeholders before production:");

  for (const failure of failures) {
    console.error(`- ${failure.file}: ${failure.placeholders.join(", ")}`);
  }

  process.exit(1);
}

console.log("Content validation passed.");
