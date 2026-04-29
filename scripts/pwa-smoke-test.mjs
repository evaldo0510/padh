#!/usr/bin/env node
/**
 * PWA Smoke Test — valida em produção que:
 *  1. O HTML é servido com cabeçalhos compatíveis com NetworkFirst (não cacheado agressivamente)
 *  2. O service worker (sw.js) está acessível e atualizado
 *  3. O manifest.webmanifest é válido
 *  4. APP_VERSION do bundle bate com o esperado (opcional via env)
 *
 * Uso:
 *   node scripts/pwa-smoke-test.mjs https://padhpoesia.lovable.app
 *   EXPECTED_VERSION=1.2.0 node scripts/pwa-smoke-test.mjs https://padhpoesia.lovable.app
 */

const url = process.argv[2] || "https://padhpoesia.lovable.app";
const expected = process.env.EXPECTED_VERSION;

const results = [];
const log = (ok, name, detail = "") => {
  results.push({ ok, name, detail });
  const icon = ok ? "✅" : "❌";
  console.log(`${icon} ${name}${detail ? ` — ${detail}` : ""}`);
};

async function head(path) {
  const r = await fetch(new URL(path, url).toString(), { cache: "no-store" });
  return { status: r.status, headers: Object.fromEntries(r.headers), text: await r.text() };
}

console.log(`\n🔍 PWA Smoke Test → ${url}\n`);

try {
  // 1. HTML root
  const root = await head("/");
  log(root.status === 200, "GET / responde 200", `status=${root.status}`);
  const cc = (root.headers["cache-control"] || "").toLowerCase();
  log(
    !cc.includes("immutable") && !/max-age=\d{5,}/.test(cc),
    "HTML não é cacheado agressivamente",
    `cache-control="${cc || "(vazio)"}"`,
  );
  log(root.text.includes("<div id=\"root\""), "HTML contém #root", "");

  // 2. Service worker
  const sw = await head("/sw.js");
  log(sw.status === 200, "Service worker (/sw.js) acessível", `status=${sw.status}`);
  log(
    sw.text.includes("workbox") || sw.text.includes("precache"),
    "SW parece gerado pelo Workbox",
  );
  log(
    sw.text.includes("skipWaiting") || sw.text.includes("self.skipWaiting"),
    "SW chama skipWaiting()",
  );

  // 3. Manifest
  const mf = await head("/manifest.webmanifest");
  log(mf.status === 200, "manifest.webmanifest acessível", `status=${mf.status}`);
  try {
    const json = JSON.parse(mf.text);
    log(json.display === "standalone", "manifest.display = standalone", `display=${json.display}`);
    log(Array.isArray(json.icons) && json.icons.length >= 2, "manifest tem ≥2 ícones");
  } catch {
    log(false, "manifest é JSON válido", "parse falhou");
  }

  // 4. Versão (opcional)
  if (expected) {
    const found = root.text.match(/v?(\d+\.\d+\.\d+)/);
    log(
      found?.[1] === expected,
      `APP_VERSION esperada = ${expected}`,
      `encontrada=${found?.[1] ?? "?"}`,
    );
  }
} catch (err) {
  log(false, "Execução do smoke test", err.message);
}

const failed = results.filter((r) => !r.ok).length;
console.log(`\n${failed === 0 ? "✨ Tudo OK" : `⚠️  ${failed} verificação(ões) falhou(aram)`}\n`);
process.exit(failed === 0 ? 0 : 1);
