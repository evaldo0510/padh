import { PCH_OBJECTIVES, isValidObjective } from "../src/types/objectives";

function testObjectives() {
  const allowed = ["ansiedade", "foco", "escrita", "reprogramacao"];
  
  console.log("Checking PCH_OBJECTIVES definition...");
  if (PCH_OBJECTIVES.length !== 4) throw new Error("Should have 4 objectives");
  
  PCH_OBJECTIVES.forEach(obj => {
    if (!allowed.includes(obj.id)) throw new Error(`Invalid ID in PCH_OBJECTIVES: ${obj.id}`);
  });

  console.log("Testing isValidObjective helper...");
  if (!isValidObjective("ansiedade")) throw new Error("Should validate 'ansiedade'");
  if (isValidObjective("invalid")) throw new Error("Should NOT validate 'invalid'");
  if (isValidObjective("")) throw new Error("Should NOT validate empty string");
  if (isValidObjective(null)) throw new Error("Should NOT validate null");

  console.log("Validation logic passed.");
}

try {
  testObjectives();
} catch (e) {
  console.error("Test Failed:", e.message);
  process.exit(1);
}
