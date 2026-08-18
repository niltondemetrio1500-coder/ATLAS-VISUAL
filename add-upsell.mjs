import fs from 'fs';

const modalHtml = `
<div id="upsell-modal" class="fixed inset-0 z-50 flex hidden items-center justify-center bg-background/80 backdrop-blur-sm">
  <div class="relative w-full max-w-lg rounded-3xl border-2 border-accent bg-card p-8 shadow-[var(--shadow-strong)] text-center mx-4">
    <button id="upsell-close" class="absolute right-4 top-4 text-muted-foreground hover:text-foreground">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    </button>
    <span class="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4">✨ Oferta Especial Exclusiva</span>
    <h2 class="text-2xl font-black text-primary mb-2">Espere! Não leve apenas o básico.</h2>
    <p class="text-sm text-muted-foreground mb-6">Você está a um passo de levar o Atlas Visual Básico por R$ 24,90. Mas que tal levar o <strong>Plano Completo com os 5 Bônus Exclusivos</strong> por apenas <strong>R$ 20,00</strong>?</p>
    <p class="text-xs font-bold uppercase text-destructive mb-4">Isso é quase 50% de desconto no Plano Completo!</p>
    <div class="flex flex-col gap-4">
      <a href="COLOQUE_AQUI_O_LINK_DE_CHECKOUT_DE_20_REAIS" id="upsell-accept-btn" class="inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-extrabold uppercase tracking-wide text-accent-foreground shadow-[var(--shadow-strong)] transition-transform hover:scale-[1.03]" style="background-image:var(--gradient-accent)">SIM! QUERO O PLANO COMPLETO POR R$ 20</a>
      <a href="#" id="upsell-decline-btn" class="text-sm font-semibold text-muted-foreground underline hover:text-foreground">Não, obrigado. Quero apenas o básico por R$ 24,90</a>
    </div>
  </div>
</div>
<script>
document.addEventListener('DOMContentLoaded', () => {
  const btnBasic = document.getElementById('btn-basic-plan');
  const modal = document.getElementById('upsell-modal');
  const btnClose = document.getElementById('upsell-close');
  const btnDecline = document.getElementById('upsell-decline-btn');
  
  if (btnBasic && modal) {
    const originalHref = btnBasic.getAttribute('href');
    btnBasic.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.remove('hidden');
    });
    
    btnClose.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
    
    btnDecline.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = originalHref;
    });
  }
});
</script>
`;

let content = fs.readFileSync('index.html', 'utf8');

// 1. Change 19,90 to 24,90 globally
content = content.replace(/19,90/g, '24,90');

// 2. Add id to basic button
// We find the first occurrence of the checkout button link and add the id
const basicCheckoutRegex = /(<a href="https:\/\/checkout\.payt\.com\.br\/81c66c36b4cfd2b0cd3262a8dcd8c2ca\?[^"]*")(\s+class="[^"]*")/g;
content = content.replace(basicCheckoutRegex, '$1 id="btn-basic-plan"$2');

// 3. Inject modal right before </body>
if (!content.includes('upsell-modal')) {
  content = content.replace('</body>', `${modalHtml}</body>`);
}

fs.writeFileSync('index.html', content, 'utf8');
console.log('Upsell modal added successfully.');
