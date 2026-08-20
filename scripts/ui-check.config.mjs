const viewports = {
  mobile: { width: 390, height: 844 },
  desktop: { width: 1440, height: 900 },
  wide: { width: 1920, height: 1080 },
};

function buildPrompt({ locale, viewportName, route }) {
  const languageLabel = locale === "vi" ? "Vietnamese" : "English";
  const localeName = locale === "vi" ? "Vietnamese" : "English";
  const routeLabel = route === "/" ? "/" : route;

  return [
    `You are checking the ${languageLabel} landing page UI for the portfolio site.`,
    `Route: ${routeLabel}`,
    `Viewport: ${viewportName}.`,
    `Decide whether the screenshot matches the intended prompt and layout quality.`,
    "Focus on these checks:",
    "1. The visible copy and navigation language must match the locale.",
    "2. The hero must stay readable and above the fold.",
    "3. The Three.js background must remain behind content and must not push the hero down.",
    "4. The right-side hero card and CTA buttons must remain visible and aligned.",
    "5. The layout must not show obvious clipping, overflow, or a broken stacking order.",
    "6. If a baseline screenshot is provided, mention any meaningful visual drift from the baseline.",
    `Output strict JSON only.`,
    `Use the locale label "${localeName}" consistently in your reasoning.`,
  ].join(" ");
}

function makeScenario({ id, locale, route, viewportName }) {
  return {
    id,
    locale,
    route,
    viewportName,
    viewport: viewports[viewportName],
    prompt: buildPrompt({ locale, viewportName, route }),
    expectations: [
      locale === "vi" ? "Vietnamese visible content" : "English visible content",
      "Hero copy visible above the fold",
      "Background depth stays behind content",
      "No obvious layout shift or overflow",
    ],
  };
}

export const uiCheckConfig = {
  defaultBaseUrl: "http://127.0.0.1:3000",
  defaultModel: "gpt-5.6",
  outputDir: "artifacts/ui-check",
  baselineDir: "artifacts/ui-check/baselines",
  scenarios: [
    makeScenario({ id: "vi-mobile", locale: "vi", route: "/", viewportName: "mobile" }),
    makeScenario({ id: "vi-desktop", locale: "vi", route: "/", viewportName: "desktop" }),
    makeScenario({ id: "vi-wide", locale: "vi", route: "/", viewportName: "wide" }),
    makeScenario({ id: "en-mobile", locale: "en", route: "/en", viewportName: "mobile" }),
    makeScenario({ id: "en-desktop", locale: "en", route: "/en", viewportName: "desktop" }),
    makeScenario({ id: "en-wide", locale: "en", route: "/en", viewportName: "wide" }),
  ],
} ;
