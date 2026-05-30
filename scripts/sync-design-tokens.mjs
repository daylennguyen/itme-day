#!/usr/bin/env node
/**
 * Syncs :root and .light token blocks from the design-system CSS into production.
 * Run after editing docs/itme.day Design System/colors_and_type.css:
 *   node scripts/sync-design-tokens.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = join(
  root,
  "docs/itme.day Design System/colors_and_type.css",
);
const target = join(root, "src/styles/design-tokens.css");

const css = readFileSync(source, "utf8");
const rootStart = css.indexOf(":root {");
const lightStart = css.indexOf(".light {");
if (rootStart === -1 || lightStart === -1) {
  console.error("Missing :root or .light in colors_and_type.css");
  process.exit(1);
}

let depth = 0;
let lightEnd = lightStart;
for (let i = lightStart; i < css.length; i++) {
  if (css[i] === "{") depth++;
  if (css[i] === "}") {
    depth--;
    if (depth === 0) {
      lightEnd = i + 1;
      break;
    }
  }
}

const rootBlock = css.slice(rootStart, lightStart).trim();
const lightBlock = css.slice(lightStart, lightEnd).trim();

const header = `/* Production mirror of docs/itme.day Design System/colors_and_type.css */
/* Regenerate: node scripts/sync-design-tokens.mjs */
/* Fantasy faces: public/fonts/ via src/lib/fonts.ts (next/font/local) */

`;

const mergedRoot = rootBlock.replace(
  /:root\s*\{/,
  `:root {\n  --font-fantasy: var(--font-runescape), var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;\n  --font-titling: var(--font-titling-face), "Times New Roman", Georgia, serif;`,
).replace(
  /\s*--font-sans:[^;]+;\s*/,
  "\n",
).replace(
  /\s*--font-mono:[^;]+;\s*/,
  "\n",
).replace(
  /\s*--font-fantasy:[^;]+;\s*/,
  "\n",
).replace(
  /\s*--font-titling:[^;]+;\s*/,
  "\n",
);

writeFileSync(target, header + mergedRoot + "\n\n" + lightBlock + "\n");
console.log("Wrote", target);
