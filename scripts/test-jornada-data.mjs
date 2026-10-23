import assert from "node:assert/strict";
import { rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";

const projectRoot = new URL("../", import.meta.url).pathname;
const bundlePath = join(tmpdir(), `padh-jornada-data-${process.pid}.mjs`);

try {
  await build({
    absWorkingDir: projectRoot,
    entryPoints: ["src/lib/jornada-data.ts"],
    outfile: bundlePath,
    bundle: true,
    format: "esm",
    platform: "node",
  });

  const { JORNADA_DATA } = await import(pathToFileURL(bundlePath).href);
  const phaseIds = JORNADA_DATA.map((phase) => phase.id);
  assert.equal(new Set(phaseIds).size, phaseIds.length, "phase IDs must be unique");

  const allSessions = JORNADA_DATA.flatMap((phase) =>
    phase.sessoes.map((session) => ({ phaseId: phase.id, sessionId: session.id })),
  );
  for (const route of allSessions) {
    const matches = JORNADA_DATA.flatMap((phase) =>
      phase.id === route.phaseId
        ? phase.sessoes.filter((session) => session.id === route.sessionId)
        : [],
    );
    assert.equal(
      matches.length,
      1,
      `route /jornada/${route.phaseId}/${route.sessionId} must resolve exactly once`,
    );
  }

  const expansion = JORNADA_DATA.find((phase) => phase.id === "expansao");
  assert.ok(expansion, "the Expansão phase must remain present");
  assert.equal(expansion.sessoes.length, 6, "all six Expansão sessions must be preserved");

  console.log(`Jornada data OK: ${phaseIds.length} unique phases, ${allSessions.length} resolvable sessions.`);
} finally {
  await rm(bundlePath, { force: true });
}
