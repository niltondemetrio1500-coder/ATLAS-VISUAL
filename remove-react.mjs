import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

// Remove module preloads and script bundle
html = html.replace(/<link rel="modulepreload" href="\/assets\/index-C4JlTHCP\.js"\/>/g, '');
html = html.replace(/<link rel="modulepreload" href="\/assets\/routes-CbLn9wXr\.js"\/>/g, '');
html = html.replace(/<script type="module" async="" src="\/assets\/index-C4JlTHCP\.js"><\/script>/g, '');

// Also remove the inline hydration state just in case it takes up space
html = html.replace(/<script class="\$tsr" id="\$tsr-stream-barrier">.*?<\/script>/g, '');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Removed React hydration scripts.');
