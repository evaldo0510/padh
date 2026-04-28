
import fs from 'fs';
import path from 'path';

function walk(dir, callback) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filepath = path.join(dir, file);
    const stats = fs.statSync(filepath);
    if (stats.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') {
        walk(filepath, callback);
      }
    } else if (stats.isFile() && (file.endsWith('.tsx') || file.endsWith('.ts'))) {
      callback(filepath);
    }
  });
}

const cleanups = [
  {
    // Remove text-primary if spiritual-icon is present
    pattern: /className=["']([^"']*\b)spiritual-icon([^"']*\b)text-primary(\b[^"']*)["']/g,
    replacement: 'className="$1spiritual-icon$2$3"'
  },
  {
    // Remove text-amber-500 if spiritual-icon is present (standardizing to primary)
    pattern: /className=["']([^"']*\b)spiritual-icon([^"']*\b)text-amber-500(\b[^"']*)["']/g,
    replacement: 'className="$1spiritual-icon$2$3"'
  },
  {
      // Cleanup whitespace
      pattern: /className=["']\s+([^"']+)["']/g,
      replacement: 'className="$1"'
  },
  {
      // Cleanup whitespace
      pattern: /className=["']([^"']+)\s+["']/g,
      replacement: 'className="$1"'
  },
  {
      // Cleanup multiple spaces
      pattern: /className=["']([^"']+)["']/g,
      replacement: (match, p1) => `className="${p1.replace(/\s+/g, ' ').trim()}"`
  }
];

walk('./src', (filepath) => {
  let content = fs.readFileSync(filepath, 'utf8');
  let changed = false;

  cleanups.forEach(({ pattern, replacement }) => {
    if (typeof replacement === 'function') {
        if (pattern.test(content)) {
            content = content.replace(pattern, replacement);
            changed = true;
        }
    } else {
        if (pattern.test(content)) {
            content = content.replace(pattern, replacement);
            changed = true;
        }
    }
  });

  if (changed) {
    fs.writeFileSync(filepath, content);
    console.log(`Cleaned up ${filepath}`);
  }
});

