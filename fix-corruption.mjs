
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

// Keywords that likely start a new statement or expression in JS/TS/JSX
const keywords = [
  'const', 'let', 'var', 'return', 'if', 'else', 'for', 'while', 'switch', 
  'try', 'catch', 'finally', 'export', 'import', 'function', 'class', 
  'default', 'interface', 'type', 'enum', 'async', 'await',
  '\\{', '\\}', '\\[', '\\]', '\\(', '\\)', '<', '>', '=', ';', ',', '\\?', ':'
];

const keywordPattern = keywords.join('|');
const commentPattern = new RegExp(`//\\s(.*?)\\s(${keywordPattern})`, 'g');

walk('./src', (filepath) => {
  let content = fs.readFileSync(filepath, 'utf8');
  
  // Check if file is "one-lined" (contains very few newlines relative to size)
  const newlines = (content.match(/\n/g) || []).length;
  if (newlines < 10 && content.length > 500) {
      console.log(`Fixing one-lined file: ${filepath}`);
      
      // Replace // comments with /* */ comments when followed by a keyword
      let fixedContent = content.replace(commentPattern, '/* $1 */ $2');
      
      // Also try to insert newlines after common markers to help prettier
      fixedContent = fixedContent.replace(/([;{}])\s/g, '$1\n');
      fixedContent = fixedContent.replace(/import\s(.*?)\sfrom/g, 'import $1 from'); // Fix broken imports
      
      fs.writeFileSync(filepath, fixedContent);
  }
});
