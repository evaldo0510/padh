import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const [analyticsPage, analyticsHelpers, migration] = await Promise.all([
  readFile(new URL("src/components/admin/BehaviorAnalytics.tsx", root), "utf8"),
  readFile(new URL("src/lib/user-events.ts", root), "utf8"),
  readFile(new URL("supabase/migrations/20261101025139_fix_admin_analytics_user_id_and_agent_run_fk.sql", root), "utf8"),
]);

assert.match(analyticsPage, /from\("profiles"\)\.select\("user_id, created_at"\)/);
assert.match(analyticsPage, /profiles\.map\(\(p\) => p\.user_id\)/);
assert.match(analyticsPage, /stageUsers\.has\(p\.user_id\)/);
assert.doesNotMatch(analyticsPage, /profiles\.map\(\(p\) => p\.id\)/);

assert.match(analyticsHelpers, /profiles: \{ user_id: string; created_at: string \}\[\]/);
assert.match(analyticsHelpers, /profiles\.map\(\(p\) => p\.user_id\)/);
assert.match(analyticsHelpers, /activityDaysByUser\.get\(p\.user_id\)/);
assert.match(analyticsHelpers, /entry\.users\.push\(p\.user_id\)/);

assert.match(migration, /SELECT p\.user_id AS id/);
assert.match(migration, /ALTER COLUMN requested_by DROP NOT NULL/);

console.log("Admin analytics identity checks OK: profile cohorts and activity are joined by auth.users.id.");
