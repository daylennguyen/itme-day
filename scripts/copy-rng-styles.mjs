#!/usr/bin/env node
/**
 * Copies prebuilt Tailwind v4 CSS from the npm package into public/.
 * Avoids PostCSS/Tailwind v3 conflicts when importing style.css via JS.
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

if (!fs.existsSync(source)) {
  console.warn(`Skip: package styles not found at ${source}`);
  process.exit(0);
}

fs.copyFileSync(source, dest);
console.log(`Copied ${path.relative(repoRoot, dest)}`);
