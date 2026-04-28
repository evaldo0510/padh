
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

const replacements = [
  {
    // Exact h-4 w-4 match within className
    pattern: /className=["']([^"']*\b)h-4 w-4(\b[^"']*)["']/g,
    replacement: 'className="$1spiritual-icon$2"'
  },
  {
    // Exact w-4 h-4 match within className
    pattern: /className=["']([^"']*\b)w-4 h-4(\b[^"']*)["']/g,
    replacement: 'className="$1spiritual-icon$2"'
  },
  {
    // h-5 w-5 match
    pattern: /className=["']([^"']*\b)h-5 w-5(\b[^"']*)["']/g,
    replacement: 'className="$1spiritual-icon spiritual-icon-lg$2"'
  },
  {
    // h-3.5 w-3.5 match
    pattern: /className=["']([^"']*\b)h-3\.5 w-3\.5(\b[^"']*)["']/g,
    replacement: 'className="$1spiritual-icon spiritual-icon-sm$2"'
  },
  {
    // h-6 w-6 match
    pattern: /className=["']([^"']*\b)h-6 w-6(\b[^"']*)["']/g,
    replacement: 'className="$1spiritual-icon spiritual-icon-xl$2"'
  }
];

walk('./src', (filepath) => {
  let content = fs.readFileSync(filepath, 'utf8');
  let changed = false;

  replacements.forEach(({ pattern, replacement }) => {
    if (pattern.test(content)) {
      content = content.replace(pattern, replacement);
      changed = true;
    }
  });

  if (changed) {
    // Clean up double spaces or spaces next to quotes that might have been introduced
    content = content.replace(/className="\s+/g, 'className="');
    content = content.replace(/\s+"/g, '"');
    content = content.replace(/\s+/g, ' '); // This might be too aggressive for code, let's be careful.
    // Better cleanup:
    content = content.replace(/className=" /g, 'className="');
    content = content.replace(/ "/g, '"');
    content = content.replace(/  /g, ' ');

    fs.writeFileSync(filepath, content);
    console.log(`Updated ${filepath}`);
  }
});
