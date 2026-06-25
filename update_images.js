const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\allys\\OneDrive\\Documentos\\exclusivo-opa\\app\\engenho-CA006944\\_components';

const filesToUpdate = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of filesToUpdate) {
  const filepath = path.join(dir, file);
  let content = fs.readFileSync(filepath, 'utf8');

  // Change base directory
  content = content.replace(/\/assets\/siriuba-2/g, '/assets/engenho-CA006944');

  // Hero
  if (file === 'Hero.tsx') {
    content = content.replace(/hero-desktop/g, 'engenho-CA006944-fachada-frontal-entrada-vista-mar');
    content = content.replace(/hero-tablet/g, 'engenho-CA006944-fachada-frontal-entrada-vista-mar');
    content = content.replace(/hero-mobile-v3/g, 'engenho-CA006944-fachada-frontal-entrada-vista-mar');
  }

  // VirtualTour
  if (file === 'VirtualTour.tsx') {
    content = content.replace(/tour-preview/g, 'engenho-CA006944-sala-estar-cozinha-integrada-vista-mar');
  }

  // Location
  if (file === 'Location.tsx') {
    content = content.replace(/location-destaque/g, 'engenho-CA006944-varanda-vista-panoramica-mar-piscina');
  }

  // TheHouse
  if (file === 'TheHouse.tsx') {
    content = content.replace(/video-cover/g, 'engenho-CA006944-entrada-porta-pivotante-vista-coqueiros');
    content = content.replace(/galeria-1/g, 'engenho-CA006944-fachada-frontal-entrada-vista-mar');
    content = content.replace(/galeria-2/g, 'engenho-CA006944-entrada-porta-pivotante-vista-coqueiros');
    content = content.replace(/galeria-3/g, 'engenho-CA006944-sala-estar-cozinha-integrada-vista-mar');
    content = content.replace(/galeria-4/g, 'engenho-CA006944-sala-jantar-varanda-vista-panoramica-mar');
    content = content.replace(/galeria-5/g, 'engenho-CA006944-sala-estar-jantar-sofa-vista-mar');
    content = content.replace(/galeria-6/g, 'engenho-CA006944-cozinha-gourmet-ilha-sala-jantar');
    content = content.replace(/galeria-7/g, 'engenho-CA006944-cozinha-ilha-living-vista-mar');
    // Extend galeria images since Siriuba had 7 and this one has 15
    // Wait, modifying the array in TheHouse might be harder this way.
  }

  // Experience
  if (file === 'Experience.tsx') {
    content = content.replace(/experience-1/g, 'engenho-CA006944-cozinha-ilha-living-vista-mar');
    content = content.replace(/experience-2/g, 'engenho-CA006944-sala-jantar-living-vista-panoramica-mar');
    content = content.replace(/experience-3/g, 'engenho-CA006944-cozinha-gourmet-ilha-geladeira-living');
  }

  // ForWho
  if (file === 'ForWho.tsx') {
    content = content.replace(/for-who-main/g, 'engenho-CA006944-sala-jantar-cozinha-living-tv-vista-jardim');
  }

  // TheOPA
  if (file === 'TheOPA.tsx') {
    content = content.replace(/the-opa/g, 'engenho-CA006944-living-tv-varanda-aberta-vista-jardim');
  }

  // MarcosView
  if (file === 'MarcosView.tsx') {
    content = content.replace(/marcos-view/g, 'engenho-CA006944-suite-cama-vista-mar-morros');
  }

  // FinalCTA
  if (file === 'FinalCTA.tsx') {
    content = content.replace(/final-cta/g, 'engenho-CA006944-sala-jantar-vista-panoramica-mar');
  }

  fs.writeFileSync(filepath, content);
}
console.log('updated image paths in components');
