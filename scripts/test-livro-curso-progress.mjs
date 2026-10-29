import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const [page, migration, types] = await Promise.all([
  readFile(new URL("src/pages/LivroCurso.tsx", root), "utf8"),
  readFile(new URL("supabase/migrations/20261028160000_padh_livro_curso_progress.sql", root), "utf8"),
  readFile(new URL("src/integrations/supabase/types.ts", root), "utf8"),
]);

const chapterIds = [...page.matchAll(/id:\s*"(capitulo-[^"]+)"/g)].map((match) => match[1]);
assert.ok(chapterIds.length > 0, "Livro-Curso must define chapters");
assert.equal(new Set(chapterIds).size, chapterIds.length, "chapter IDs must be unique");

assert.match(page, /supabase\.auth\.getUser\(\)/, "progress operations must confirm the authenticated user");
assert.match(page, /\.from\("padh_livro_curso_progress"\)[\s\S]*?\.select\("chapter_id"\)[\s\S]*?\.eq\("user_id",\s*authData\.user\.id\)/, "progress reads must be scoped to the authenticated user");
assert.match(page, /\.upsert\([\s\S]*?user_id:\s*authData\.user\.id[\s\S]*?\{\s*onConflict:\s*"user_id,chapter_id"\s*\}/, "completion writes must upsert the user's chapter");
assert.match(page, /\.delete\(\)[\s\S]*?\.eq\("user_id",\s*authData\.user\.id\)[\s\S]*?\.eq\("chapter_id",\s*id\)/, "unmarking must target only the user's chapter");
assert.match(page, /if\s*\(error\)\s*throw error/, "write errors must prevent success handling");
assert.match(page, /disabled=\{!progressLoaded \|\| Boolean\(progressError\) \|\| savingChapter !== null\}/, "chapter controls must be disabled while loading, errored, or saving");

assert.match(migration, /enable row level security/i, "RLS must be enabled");
for (const action of ["select", "insert", "update", "delete"]) {
  assert.match(migration, new RegExp(`for ${action} to authenticated`, "i"), `RLS must define authenticated ${action} policy`);
}
assert.match(migration, /using\s*\(auth\.uid\(\)\s*=\s*user_id\)/i, "read/update/delete policies must restrict rows to their owner");
assert.match(migration, /with check\s*\(auth\.uid\(\)\s*=\s*user_id\)/i, "insert/update policies must prevent writing another user's row");
assert.match(types, /padh_livro_curso_progress:[\s\S]*?Insert:\s*\{[\s\S]*?user_id:\s*string/, "generated insert type must require user_id");

console.log(`Livro-Curso progress invariants OK: ${chapterIds.length} unique chapters; auth scoping, read/write/delete guards, RLS policies and insert types checked. These are static regression checks, not live Supabase integration tests.`);
