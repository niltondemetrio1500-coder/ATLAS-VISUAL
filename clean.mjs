import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/<script defer src="\/~flock\.js"[^>]+><\/script>/g, '');
fs.writeFileSync('index.html', html, 'utf8');
