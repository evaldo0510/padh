#!/usr/bin/env node
/**
 * Lighthouse runner (mobile/desktop) para medir baseline antes/depois.
 *
 * Uso:
 *   npm run lighthouse:mobile
 *   npm run lighthouse:desktop
 *   LH_URL=https://padhpoesia.lovable.app npm run lighthouse:mobile
 *   LH_LABEL=before npm run lighthouse:mobile
 *
 * Requer: npx lighthouse (baixado on-demand via npx) e Chrome instalado.
 * Saída: lighthouse-reports/<label>-<preset>-<timestamp>.{html,json}
 */
import { spawn } from "node:child_process";
import { mkdirSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const preset = process.argv[2] === "desktop" ? "desktop" : "mobile";
const url = process.env.LH_URL || "https://padhpoesia.lovable.app";
const label = (process.env.LH_LABEL || "run").replace(/[^a-zA-Z0-9._-]/g, "_");
const outDir = resolve(process.cwd(), "lighthouse-reports");
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

const ts = new Date().toISOString().replace(/[:.]/g, "-");
const base = `${outDir}/${label}-${preset}-${ts}`;

const args = [
  "--yes",
  "lighthouse",
  url,
  `--preset=${preset === "desktop" ? "desktop" : "perf"}`,
  preset === "mobile" ? "--form-factor=mobile" : "--form-factor=desktop",
  "--only-categories=performance,accessibility,best-practices,seo,pwa",
  "--output=html",
  "--output=json",
  `--output-path=${base}`,
  "--chrome-flags=--headless=new --no-sandbox --disable-gpu",
  "--quiet",
];

console.log(`\n▶ Lighthouse ${preset} → ${url}`);
console.log(`  Saída: ${base}.{html,json}\n`);

const child = spawn("npx", args, { stdio: "inherit" });
child.on("exit", (code) => process.exit(code ?? 0));
