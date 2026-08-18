import fs from 'fs';
import path from 'path';

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace texts
  content = content.replace(/17,90/g, '19,90');
  content = content.replace(/27,90/g, '37,90');
  content = content.replace(/15 Dias/g, '7 Dias');
  content = content.replace(/15 dias/g, '7 dias');

  // Replace URLs
  const regex = /https:\/\/atlasvisual-massoterapeutas\.lovable\.app\/__l5e\/assets-v1\/([a-zA-Z0-9-]+)\/([^"']+)/g;
  let match;
  const urls = [];
  while ((match = regex.exec(content)) !== null) {
    urls.push({
      fullUrl: match[0],
      id: match[1],
      filename: match[2]
    });
  }

  for (const item of urls) {
    const ext = path.extname(item.filename);
    const baseName = path.basename(item.filename, ext);
    const newFilename = `${item.id}-${baseName}.webp`;
    content = content.replace(new RegExp(item.fullUrl, 'g'), `/images/${newFilename}`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Processed ${filePath}`);
}

processFile(path.join('public', 'assets', 'routes-CbLn9wXr.js'));
