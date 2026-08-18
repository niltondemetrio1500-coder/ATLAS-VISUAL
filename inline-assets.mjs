import fs from 'fs';
import path from 'path';

let html = fs.readFileSync('index.html', 'utf8');

// Inline CSS
if (fs.existsSync('index.css')) {
  const css = fs.readFileSync('index.css', 'utf8');
  html = html.replace('<link rel="stylesheet" href="./index.css" data-precedence="default"/>', `<style>${css}</style>`);
  console.log('Inlined index.css');
}

// Inline Images
const imageRegex = /(src|href)="\.\/images\/([^"]+)"/g;
let match;
const processed = new Set();

// Extract all matches first to avoid infinite loops if replace modifies string length
const matches = [...html.matchAll(imageRegex)];

for (const m of matches) {
  const attribute = m[1];
  const filename = m[2];
  const filepath = path.join('images', filename);
  
  if (fs.existsSync(filepath) && !processed.has(filename)) {
    const ext = path.extname(filename).toLowerCase();
    let mimeType = 'image/webp';
    if (ext === '.png') mimeType = 'image/png';
    else if (ext === '.jpg' || ext === '.jpeg') mimeType = 'image/jpeg';
    else if (ext === '.svg') mimeType = 'image/svg+xml';

    const base64Data = fs.readFileSync(filepath).toString('base64');
    const dataUri = `data:${mimeType};base64,${base64Data}`;
    
    // Replace all occurrences of this specific image
    const searchRegex = new RegExp(`(src|href)="\\.\\/images\\/${filename}"`, 'g');
    html = html.replace(searchRegex, `$1="${dataUri}"`);
    
    processed.add(filename);
    console.log(`Inlined ${filename}`);
  }
}

// Inline Favicon
if (fs.existsSync('favicon.ico')) {
  const base64Favicon = fs.readFileSync('favicon.ico').toString('base64');
  html = html.replace('href="./favicon.ico"', `href="data:image/x-icon;base64,${base64Favicon}"`);
  console.log('Inlined favicon.ico');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Done! All assets inlined.');
