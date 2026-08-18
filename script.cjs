const fs = require('fs');
let html = fs.readFileSync('../atlas-visual-clone/index.html', 'utf8');
html = html.replace(/href="\/assets\/styles-[^"]+\.css"/g, 'href="/src/index.css"');
html = html.replace(/src="\/__l5e\//g, 'src="https://atlasvisual-massoterapeutas.lovable.app/__l5e/');
html = html.replace(/href="\/__l5e\//g, 'href="https://atlasvisual-massoterapeutas.lovable.app/__l5e/');
// the meta image might be dead, but that's fine for the visual layout
fs.writeFileSync('index.html', html);
