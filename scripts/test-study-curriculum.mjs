import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";

const projectRoot = new URL("../", import.meta.url).pathname;
const outputDir = await mkdtemp(join(tmpdir(), "padh-study-curriculum-"));

try {
  await build({
    absWorkingDir: projectRoot,
    entryPoints: {
      "dados-clinicos": "src/lib/dados-clinicos.ts",
      "estudo-curricular": "src/lib/estudo-curricular.ts",
    },
    outdir: outputDir,
    bundle: true,
    format: "esm",
    platform: "node",
  });

  const { MODULOS } = await import(
    pathToFileURL(join(outputDir, "dados-clinicos.js")).href
  );
  const { ETAPAS_ESTUDO_PCH, COMPLEMENTOS_ESTUDO_PCH, ORDEM_ESTUDO_PCH } =
    await import(pathToFileURL(join(outputDir, "estudo-curricular.js")).href);

  const moduleIds = MODULOS.map((modulo) => modulo.id);
  const assignedIds = ETAPAS_ESTUDO_PCH.flatMap((etapa) => etapa.moduleIds);

  assert.equal(MODULOS.length, 8, "all eight original modules must remain");
  assert.equal(new Set(moduleIds).size, moduleIds.length, "module IDs must be unique");
  assert.equal(
    new Set(assignedIds).size,
    assignedIds.length,
    "each module must appear in only one study stage",
  );
  assert.deepEqual(
    [...assignedIds].sort(),
    [...moduleIds].sort(),
    "every original module must appear in the study path",
  );
  assert.deepEqual(ORDEM_ESTUDO_PCH, assignedIds, "recommended order must match the stage order");
  assert.deepEqual(
    ORDEM_ESTUDO_PCH,
    moduleIds,
    "study order must remain aligned with the existing sequential module unlocking",
  );

  for (const [moduleId, relatedIds] of Object.entries(COMPLEMENTOS_ESTUDO_PCH)) {
    assert.ok(moduleIds.includes(moduleId), `complement source ${moduleId} must exist`);
    for (const relatedId of relatedIds) {
      assert.ok(moduleIds.includes(relatedId), `complement target ${relatedId} must exist`);
      assert.notEqual(moduleId, relatedId, `${moduleId} cannot complement itself`);
    }
  }

  for (const modulo of MODULOS) {
    assert.ok(modulo.pilarNome, `${modulo.id} must retain its pillar name`);
    assert.ok(modulo.corNome, `${modulo.id} must retain its color identity`);
    assert.ok(modulo.corSimbolo, `${modulo.id} must retain its color symbol`);
    assert.ok(modulo.sinais.length > 0, `${modulo.id} must retain its signs`);
    assert.ok(modulo.aplicacao.length > 0, `${modulo.id} must retain its application steps`);
    assert.ok(modulo.indicacoes.length > 0, `${modulo.id} must retain its indications`);
    assert.ok(modulo.cuidados.length > 0, `${modulo.id} must retain its cautions`);
    assert.ok(modulo.tarefasPaciente.length > 0, `${modulo.id} must retain patient tasks`);
    assert.ok(modulo.teoricos.length > 0, `${modulo.id} must retain references`);
    assert.ok(modulo.checklistSinais.length > 0, `${modulo.id} must retain its checklist`);
    assert.ok(modulo.atividades.length > 0, `${modulo.id} must retain study activities`);
    assert.ok(modulo.tempoEstimado > 0, `${modulo.id} must retain its estimated study time`);
  }

  console.log(
    `Study curriculum OK: ${moduleIds.length} modules assigned once across ${ETAPAS_ESTUDO_PCH.length} stages; all complementary links resolve.`,
  );
} finally {
  await rm(outputDir, { recursive: true, force: true });
}
