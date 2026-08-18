import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');

console.log('--- DIAGNOSTICS ---');
console.log('1. Length:', html.length);
console.log('2. Has React modulepreload:', html.includes('modulepreload'));
console.log('3. Has Cloudflare lovable app URL:', html.includes('atlasvisual-massoterapeutas.lovable.app'));
console.log('4. Unclosed div tags:', (html.match(/<div/g) || []).length === (html.match(/<\/div/g) || []).length ? 'No (Valid)' : 'Yes (Invalid)');
console.log('5. Unclosed script tags:', (html.match(/<script/g) || []).length === (html.match(/<\/script/g) || []).length ? 'No (Valid)' : 'Yes (Invalid)');

const images = fs.existsSync('images') ? fs.readdirSync('images') : [];
const imgsInHtml = html.match(/src="\.\/images\/([^"]+)"/g) || [];
let missingImgs = 0;
for (let src of imgsInHtml) {
  const imgName = src.replace('src="./images/', '').replace('"', '');
  if (!images.includes(imgName)) {
    console.log('   Missing image file:', imgName);
    missingImgs++;
  }
}
console.log('6. Missing images:', missingImgs === 0 ? 'None' : missingImgs);

// Check if basic button has the ID properly
console.log('7. Upsell button ID exists:', html.includes('id="btn-basic-plan"'));
console.log('8. Upsell modal HTML exists:', html.includes('id="upsell-modal"'));
console.log('9. Meta Pixel exists:', html.includes('fbq(\'init\''));
console.log('10. UTMI script exists:', html.includes('t_4l=atob'));
