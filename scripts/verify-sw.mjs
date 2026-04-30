import fs from 'fs';
import path from 'path';

const swPath = path.resolve(process.cwd(), 'src/sw.js');

if (!fs.existsSync(swPath)) {
  console.error('Service Worker file not found at:', swPath);
  process.exit(1);
}

const content = fs.readFileSync(swPath, 'utf8');

// Simple regex to find "await" and check if it's inside an "async" function
// This is a naive check but can catch common mistakes in the specific structure of this project
const lines = content.split('\n');
let errors = 0;

lines.forEach((line, index) => {
  if (line.includes('await')) {
    // Check if the current block seems to be an async function
    // We look backwards for the nearest function definition
    let foundAsync = false;
    for (let i = index; i >= 0; i--) {
      if (lines[i].includes('async function') || lines[i].includes('async (') || lines[i].includes('async (')) {
        foundAsync = true;
        break;
      }
      if (lines[i].includes('function') && !lines[i].includes('async')) {
        break; 
      }
    }

    // Special case for global scope (not allowed in many SW environments without specific config)
    // and for non-async event listeners
    if (!foundAsync) {
       console.error(`Error: 'await' used in potentially non-async context at line ${index + 1}: ${line.trim()}`);
       errors++;
    }
  }
});

if (errors > 0) {
  console.error(`Found ${errors} potential async errors in Service Worker.`);
  process.exit(1);
}

console.log('Service Worker syntax verification passed.');
process.exit(0);
