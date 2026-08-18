import fs from 'fs';
import path from 'path';

function moveFiles() {
  // Move index.css
  if (fs.existsSync(path.join('public', 'index.css'))) {
    fs.renameSync(path.join('public', 'index.css'), 'index.css');
  }

  // Move images folder
  if (fs.existsSync(path.join('public', 'images'))) {
    if (!fs.existsSync('images')) {
      fs.mkdirSync('images');
    }
    const images = fs.readdirSync(path.join('public', 'images'));
    for (const img of images) {
      fs.renameSync(path.join('public', 'images', img), path.join('images', img));
    }
  }

  // Update index.html
  if (fs.existsSync('index.html')) {
    let html = fs.readFileSync('index.html', 'utf8');
    html = html.replace(/href="\/index\.css"/g, 'href="./index.css"');
    html = html.replace(/src="\/images\//g, 'src="./images/');
    html = html.replace(/href="\/images\//g, 'href="./images/');
    html = html.replace(/href="\/favicon\.ico"/g, 'href="./favicon.ico"');
    fs.writeFileSync('index.html', html, 'utf8');
  }
}

moveFiles();
console.log('Converted to pure static site relative paths.');
