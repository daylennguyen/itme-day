#!/usr/bin/env node
/**
 * Copies prebuilt Tailwind v4 CSS from the npm package into public/.
 * Unwraps @layer blocks so utilities are not overridden by our unlayered
 * Tailwind v3 preflight (see globals.css).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(
  repoRoot,
  "node_modules/@itme.day/rng-react-components/dist/style.css",
);
const dest = path.join(repoRoot, "public/rng-react-components.css");

/** Hoist a named @layer { ... } block to top-level CSS. */
function unwrapLayer(css, layerName) {
  const marker = `@layer ${layerName}{`;
  const markerSpaced = `@layer ${layerName} {`;
  let start = css.indexOf(markerSpaced);
  let headerLength = markerSpaced.length;
  if (start === -1) {
    start = css.indexOf(marker);
    headerLength = marker.length;
  }
  if (start === -1) return css;

  let depth = 1;
  let i = start + headerLength;
  const contentStart = i;

  while (i < css.length && depth > 0) {
    const char = css[i];
    if (char === "{") depth += 1;
    else if (char === "}") depth -= 1;
    i += 1;
  }

  const content = css.slice(contentStart, i - 1);
  return css.slice(0, start) + content + css.slice(i);
}

function prepareRngStyles(raw) {
  const withoutLayerOrder = raw.replace(
    /@layer theme, base, components, utilities;\s*/g,
    "",
  );

  return unwrapLayer(unwrapLayer(withoutLayerOrder, "theme"), "utilities");
}

if (!fs.existsSync(source)) {
  console.warn(`Skip: package styles not found at ${source}`);
  process.exit(0);
}

const raw = fs.readFileSync(source, "utf8");
const prepared = prepareRngStyles(raw);
fs.writeFileSync(dest, prepared);
console.log(`Copied ${path.relative(repoRoot, dest)} (layers unwrapped for v3 host)`);
