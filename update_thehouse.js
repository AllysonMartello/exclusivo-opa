const fs = require('fs');
const filepath = 'c:\\Users\\allys\\OneDrive\\Documentos\\exclusivo-opa\\app\\engenho-CA006944\\_components\\TheHouse.tsx';

let content = fs.readFileSync(filepath, 'utf8');

const newMediaConfig = `const mediaConfig: { url: string; span: string }[] = [
  { url: "/assets/engenho-CA006944/engenho-CA006944-fachada-frontal-entrada-vista-mar", span: "col-span-2 row-span-2 sm:col-span-1 sm:row-span-2 md:col-span-2 md:row-span-2" },
  { url: "/assets/engenho-CA006944/engenho-CA006944-entrada-porta-pivotante-vista-coqueiros", span: "col-span-2 row-span-2 sm:col-span-2 sm:row-span-2 md:col-span-2 md:row-span-2" },
  { url: "/assets/engenho-CA006944/engenho-CA006944-sala-estar-cozinha-integrada-vista-mar", span: "col-span-2 row-span-2 sm:col-span-2 sm:row-span-2 md:col-span-2 md:row-span-2" },
  { url: "/assets/engenho-CA006944/engenho-CA006944-sala-jantar-varanda-vista-panoramica-mar", span: "col-span-2 row-span-2 sm:col-span-1 sm:row-span-2 md:col-span-2 md:row-span-2" },
  { url: "/assets/engenho-CA006944/engenho-CA006944-sala-estar-jantar-sofa-vista-mar", span: "col-span-2 row-span-2 sm:col-span-1 sm:row-span-2 md:col-span-2 md:row-span-2" },
  { url: "/assets/engenho-CA006944/engenho-CA006944-cozinha-gourmet-ilha-sala-jantar", span: "col-span-2 row-span-2 sm:col-span-1 sm:row-span-2 md:col-span-2 md:row-span-2" },
  { url: "/assets/engenho-CA006944/engenho-CA006944-cozinha-ilha-living-vista-mar", span: "col-span-2 row-span-2 sm:col-span-1 sm:row-span-2 md:col-span-2 md:row-span-2" },
  { url: "/assets/engenho-CA006944/engenho-CA006944-varanda-vista-panoramica-mar-piscina", span: "col-span-2 row-span-2 sm:col-span-1 sm:row-span-2 md:col-span-2 md:row-span-2" },
  { url: "/assets/engenho-CA006944/engenho-CA006944-suite-cama-tv-vista-mar-01", span: "col-span-2 row-span-2 sm:col-span-1 sm:row-span-2 md:col-span-2 md:row-span-2" },
  { url: "/assets/engenho-CA006944/engenho-CA006944-suite-cama-vista-mar-01", span: "col-span-2 row-span-2 sm:col-span-1 sm:row-span-2 md:col-span-2 md:row-span-2" },
  { url: "/assets/engenho-CA006944/engenho-CA006944-banheiro-dupla-cuba-suite-vista-mar", span: "col-span-2 row-span-2 sm:col-span-1 sm:row-span-2 md:col-span-2 md:row-span-2" },
  { url: "/assets/engenho-CA006944/engenho-CA006944-banheiro-banheira-nicho-iluminado", span: "col-span-2 row-span-2 sm:col-span-1 sm:row-span-2 md:col-span-2 md:row-span-2" },
  { url: "/assets/engenho-CA006944/engenho-CA006944-escada-interna-pendentes-rattan", span: "col-span-2 row-span-2 sm:col-span-1 sm:row-span-2 md:col-span-2 md:row-span-2" },
  { url: "/assets/engenho-CA006944/engenho-CA006944-corredor-circulacao-suites", span: "col-span-2 row-span-2 sm:col-span-1 sm:row-span-2 md:col-span-2 md:row-span-2" },
  { url: "/assets/engenho-CA006944/engenho-CA006944-suite-cama-tv-armario-vista-mar", span: "col-span-2 row-span-2 sm:col-span-1 sm:row-span-2 md:col-span-2 md:row-span-2" },
];`;

content = content.replace(/const mediaConfig[\s\S]*?\];/, newMediaConfig);

// Update detailIcons to have 15 elements since we have 15 details.
const newDetailIcons = `const detailIcons = [
  Waves, Trees, Compass, Anchor, Bath, Sofa, Home, UtensilsCrossed, Waves, Wind, Sofa, Home, Sun, FileText, Anchor
];`;
content = content.replace(/const detailIcons[\s\S]*?\];/, newDetailIcons);

fs.writeFileSync(filepath, content);
console.log('updated thehouse');
