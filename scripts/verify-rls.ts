import { supabase } from "../src/integrations/supabase/client";

/**
 * Script to verify RLS policies.
 * Since we are in the sandbox, we test by asserting the presence of policies 
 * and checking if the tables have rowsecurity enabled.
 */
async function runRlsTests() {
  console.log("🚀 Starting RLS Security Tests...");

  const protectedTables = [
    "episode_favorites",
    "episode_progress",
    "exercise_responses",
    "purchases",
    "audit_logs"
  ];

  try {
    const { data: status, error } = await supabase.rpc('get_tables_security' as any);

    if (error) {
      console.error("❌ Failed to fetch security status:", error.message);
      process.exit(1);
    }

    let allPassed = true;

    protectedTables.forEach(tableName => {
      const table = (status as any[]).find(t => t.tablename === tableName);
      
      if (!table) {
        console.error(`❌ Table ${tableName} not found in security check!`);
        allPassed = false;
        return;
      }

      if (!table.rowsecurity) {
        console.error(`❌ Table ${tableName} HAS RLS DISABLED! CRITICAL VULNERABILITY.`);
        allPassed = false;
      } else {
        console.log(`✅ Table ${tableName}: RLS is ENABLED.`);
      }

      if (table.policies.length === 0) {
        console.warn(`⚠️ Table ${tableName}: No policies found. Access might be completely blocked or wide open depending on RLS default.`);
        allPassed = false;
      } else {
        console.log(`✅ Table ${tableName}: Found ${table.policies.length} policies.`);
      }
    });

    if (allPassed) {
      console.log("\n✨ All RLS sanity checks PASSED.");
    } else {
      console.error("\n❗ Some RLS sanity checks FAILED. Review security settings.");
      process.exit(1);
    }

  } catch (err) {
    console.error("Unexpected error during tests:", err);
    process.exit(1);
  }
}

runRlsTests();
