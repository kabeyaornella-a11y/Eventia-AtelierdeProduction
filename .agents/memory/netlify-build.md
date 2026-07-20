---
name: Netlify build config for Eventia
description: Correct publish/output directories for TanStack Start + Nitro netlify preset on lab-kbya
---

## Rule
`netlify.toml` must set `publish = "dist"` (not `.output/public`).

**Why:** The `@lovable.dev/vite-tanstack-config` with Nitro `netlify` preset writes static client assets to `dist/` at the repo root. The SSR serverless function goes to `.netlify/functions-internal/`. There is no `.output/` directory at all with this preset.

**How to apply:** Any time netlify.toml is touched or the build fails with "Deploy directory does not exist", verify `publish = "dist"`. The nitro.json (`publicDir: "../../dist"`) confirms this.

## Build output structure
- `dist/` — static assets served by Netlify CDN (JS chunks, fonts, robots.txt, sitemap)
- `.netlify/functions-internal/server/` — SSR Nitro function
- `.netlify/functions-internal/nitro.json` — preset metadata
