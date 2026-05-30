#!/usr/bin/env node
/**
 * Copies Gobby mascot files from dnd5e login into itme-day.
 * Stack matches dnd5e: anime.js path morphing + remeda (not Motion/Flubber).
 *
 * Usage: node scripts/sync-gobby-from-dnd5e.mjs [path-to-dnd5e-apps-web]
 * Default source: ../dnd5e/apps/web (relative to repo root)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const defaultSource = path.resolve(repoRoot, "../dnd5e/apps/web");
const sourceRoot = path.resolve(process.argv[2] ?? defaultSource);
const loginDir = path.join(sourceRoot, "src/app/login");
const gobbyDir = path.join(repoRoot, "src/components/gobby");

const loginToGobby = [
  "gobby-mascot.tsx",
  "chill-util-cat-face.tsx",
  "chill-face-layer-runners.ts",
  "chill-cat-face-utils.ts",
  "chill-face-static-markup.ts",
  "chill-eye-view-box.ts",
  "chill-map-number.ts",
  "use-prefers-reduced-motion.ts",
  "chill-util-cat-face.test.ts",
  "chill-eye-view-box.test.ts",
];

const publicCopies = [
  {
    from: path.join(sourceRoot, "public/gobby.svg"),
    to: path.join(repoRoot, "public/gobby.svg"),
  },
];

if (!fs.existsSync(sourceRoot)) {
  console.error(`Source not found: ${sourceRoot}`);
  console.error("Pass the dnd5e apps/web path as the first argument.");
  process.exit(1);
}

let ok = 0;

for (const name of loginToGobby) {
  const from = path.join(loginDir, name);
  const to = path.join(gobbyDir, name);
  if (!fs.existsSync(from)) {
    console.warn(`Skip (missing): ${from}`);
    continue;
  }
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
  console.log(`Copied ${path.relative(repoRoot, to)}`);
  ok++;
}

for (const { from, to } of publicCopies) {
  if (!fs.existsSync(from)) {
    console.warn(`Skip (missing): ${from}`);
    continue;
  }
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
  console.log(`Copied ${path.relative(repoRoot, to)}`);
  ok++;
}

console.log(`\nDone (${ok} files).`);
console.log("Regenerate layer runners in dnd5e via:");
console.log("  node apps/web/scripts/chill-generate-animate.mjs");
console.log("Then re-run: npm run sync:gobby");
console.log("\nNext: npm test && visual check face alignment");
