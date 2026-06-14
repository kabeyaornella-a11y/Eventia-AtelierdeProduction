/**
 * Converts all JPG/PNG assets to WebP format using sharp.
 * Run with: node scripts/optimize-images.mjs
 * Install sharp first: npm install --save-dev sharp
 *
 * Output: src/assets/*.webp (alongside originals)
 */
import { createRequire } from "node:module";
import { readdirSync, existsSync } from "node:fs";
import { join, extname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const require = createRequire(import.meta.url);

let sharp;
try {
  sharp = require("sharp");
} catch {
  console.error("sharp is not installed. Run: npm install --save-dev sharp");
  process.exit(1);
}

const assetsDir = join(__dirname, "../src/assets");
const SUPPORTED = new Set([".jpg", ".jpeg", ".png"]);

const files = readdirSync(assetsDir).filter((f) => SUPPORTED.has(extname(f).toLowerCase()));

console.log(`Found ${files.length} image(s) to process…\n`);

for (const file of files) {
  const input = join(assetsDir, file);
  const output = join(assetsDir, basename(file, extname(file)) + ".webp");

  if (existsSync(output)) {
    console.log(`  skip  ${file} (WebP already exists)`);
    continue;
  }

  try {
    const info = await sharp(input).webp({ quality: 82 }).toFile(output);
    const original = (await sharp(input).metadata()).size ?? 0;
    const savings = original > 0 ? Math.round((1 - info.size / original) * 100) : 0;
    console.log(`  ✓  ${file} → ${basename(output)} (${savings}% smaller)`);
  } catch (err) {
    console.error(`  ✗  ${file}: ${err.message}`);
  }
}

console.log("\nDone. Update image imports to use .webp variants in production builds.");
