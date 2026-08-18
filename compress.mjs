import fs from 'fs';
import path from 'path';
import axios from 'axios';
import sharp from 'sharp';

async function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace texts
  content = content.replace(/17,90/g, '19,90');
  content = content.replace(/27,90/g, '37,90');
  content = content.replace(/15 Dias/g, '7 Dias');
  content = content.replace(/15 dias/g, '7 dias');

  // Extract URLs
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

  // Download and compress
  for (const item of urls) {
    const ext = path.extname(item.filename);
    const baseName = path.basename(item.filename, ext);
    const newFilename = `${item.id}-${baseName}.webp`;
    const outputPath = path.join('public', 'images', newFilename);

    if (!fs.existsSync(outputPath)) {
      console.log(`Downloading ${item.fullUrl}...`);
      try {
        const response = await axios({
          url: item.fullUrl,
          responseType: 'arraybuffer'
        });
        
        console.log(`Compressing to ${newFilename}...`);
        await sharp(response.data)
          .webp({ quality: 60 })
          .toFile(outputPath);
      } catch (err) {
        console.error(`Error downloading ${item.fullUrl}:`, err.message);
      }
    }

    // Replace in content
    content = content.replace(new RegExp(item.fullUrl, 'g'), `/images/${newFilename}`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Processed ${filePath}`);
}

async function main() {
  if (!fs.existsSync(path.join('public', 'images'))) {
    fs.mkdirSync(path.join('public', 'images'), { recursive: true });
  }

  await processFile('index.html');
  await processFile(path.join('public', 'assets', 'index-C4JlTHCP.js'));
}

main().catch(console.error);
