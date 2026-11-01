import { readFileSync } from "node:fs";
import assert from "node:assert/strict";

const source = readFileSync("src/providers/ProfileProvider.tsx", "utf8");

assert.match(source, /\.insert\(\{\s*user_id:\s*user\.id,\s*objectives:\s*validatedLocal\s*\}\)/,
  "New profiles must be inserted for the authenticated user only.");
assert.match(source, /insertError\?\.code\s*===\s*"23505"/,
  "Concurrent profile creation must detect a unique-key conflict.");
assert.match(source, /Perfil recuperado após criação concorrente/,
  "A concurrent creation must recover the existing profile.");
assert.match(source, /\.eq\("user_id",\s*user\.id\)\s*\.maybeSingle\(\)/,
  "Recovery must re-read only the authenticated user's profile.");
assert.match(source, /Não foi possível carregar seu perfil/,
  "Initial profile-load failures must be visible to the user.");
assert.match(source, /const fetchRequestId = useRef\(0\)/,
  "Profile requests must have a generation guard.");
assert.match(source, /if \(requestId !== fetchRequestId\.current\) return;/,
  "Stale profile requests must not overwrite the current user's state.");
assert.match(source, /if \(!user\) \{\s*setProfile\(null\)/,
  "Logging out must clear the previous user's profile from provider state.");
assert.match(source, /setLoading\(true\);\s*if \(isManual\)/,
  "A new authenticated profile load must expose its loading state.");

console.log("Profile provisioning invariants passed.");
