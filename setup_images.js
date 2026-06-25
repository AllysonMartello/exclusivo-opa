const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\allys\\OneDrive\\Documentos\\exclusivo-opa\\public\\assets\\engenho-CA006944';

const files = fs.readdirSync(dir).filter(f => f.endsWith('.webp') && !f.includes('-desktop') && !f.includes('-mobile'));

for (const file of files) {
  const baseName = file.replace('.webp', '');
  const originalPath = path.join(dir, file);
  
  // Create all required variations for the picture tags
  const copies = [
    `${baseName}-desktop.webp`,
    `${baseName}-mobile.webp`,
    `${baseName}-desktop.jpg`,
    `${baseName}-mobile.jpg`,
    `${baseName}-desktop.avif`,
    `${baseName}-mobile.avif`
  ];

  for (const copy of copies) {
    fs.copyFileSync(originalPath, path.join(dir, copy));
  }
}

console.log('Images duplicated to match the <picture> srcset structure!');
