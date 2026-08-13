<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Portfolio project rules

Before planning or changing code for this repository, read and follow:

```text
docs/AGENTS_Portfolio_Implementation_V5_VI.md
```

This project specification is the source of truth for:

- Architecture and routing decisions.
- Locale behavior: `/` is Vietnamese and `/en` is English.
- SEO, canonical, hreflang, sitemap, and robots requirements.
- Content fallback and placeholder rules.
- Heading hierarchy.
- Responsive layout modes.
- Font and visual direction.
- Quality gates and Definition of Done.

Do not introduce routes, content, dependencies, design patterns, or implementation choices that conflict with that document. If Next.js documentation and the project specification conflict, verify the current Next.js behavior from `node_modules/next/dist/docs/`, explain the conflict, and preserve the product decisions from the project specification unless the user explicitly changes them.
