import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const pages = [
  {
    route: "/",
    file: path.join(root, ".next/server/app/index.html"),
    lang: "vi",
    mustContain: /[ăâđêôơưáàảãạấầẩẫậắằẳẵặéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵ]/i,
    contentLabel: "Vietnamese content",
  },
  {
    route: "/en",
    file: path.join(root, ".next/server/app/en.html"),
    lang: "en",
    mustContain: /\b(The|the|English|portfolio|personal)\b/,
    contentLabel: "English content",
  },
];

const headingPattern = /<h([1-6])\b([^>]*)>([\s\S]*?)<\/h\1>/gi;
const tagPattern = /<[^>]*>/g;

function stripTags(value) {
  return value.replace(tagPattern, " ").replace(/\s+/g, " ").trim();
}

function getAttribute(attributes, name) {
  const match = attributes.match(new RegExp(`${name}=["']([^"']+)["']`, "i"));
  return match?.[1] ?? "";
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

for (const page of pages) {
  const html = await readFile(page.file, "utf8");
  const headings = [...html.matchAll(headingPattern)].map((match) => ({
    level: Number(match[1]),
    id: getAttribute(match[2], "id"),
    text: stripTags(match[3]),
  }));

  const h1Count = headings.filter((heading) => heading.level === 1).length;

  assert(
    html.includes(`<html lang="${page.lang}"`),
    `${page.route} must render <html lang="${page.lang}"> in initial HTML.`,
  );
  assert(page.mustContain.test(html), `${page.route} must contain initial ${page.contentLabel}.`);
  assert(h1Count === 1, `${page.route} must have exactly one H1. Found ${h1Count}.`);

  let previousLevel = 0;
  let workSectionSeen = false;

  for (const heading of headings) {
    assert(heading.text.length > 0, `${page.route} has an empty H${heading.level}.`);

    if (previousLevel > 0) {
      assert(
        heading.level <= previousLevel + 1,
        `${page.route} skips heading level from H${previousLevel} to H${heading.level}.`,
      );
    }

    if (heading.level === 2 && heading.id === "work") {
      workSectionSeen = true;
    }

    if (heading.id === "stack" || /^tech stack$/i.test(heading.text)) {
      assert(heading.level === 3, `${page.route} Tech Stack must be an H3.`);
      assert(workSectionSeen, `${page.route} Tech Stack must be inside/after the Work H2 section.`);
    }

    previousLevel = heading.level;
  }
}

console.log("HTML validation passed.");
