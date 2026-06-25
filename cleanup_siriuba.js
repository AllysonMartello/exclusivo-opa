const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\allys\\OneDrive\\Documentos\\exclusivo-opa\\app\\engenho-CA006944';

function replaceInFile(filepath, replacements) {
    if (!fs.existsSync(filepath)) return;
    let content = fs.readFileSync(filepath, 'utf8');
    let original = content;
    for (const [search, replace] of replacements) {
        content = content.split(search).join(replace);
    }
    if (content !== original) {
        fs.writeFileSync(filepath, content);
        console.log(`Updated ${filepath}`);
    }
}

// 1. Rename siriuba.css to engenho.css
const cssPath = path.join(dir, 'siriuba.css');
const newCssPath = path.join(dir, 'engenho.css');
if (fs.existsSync(cssPath)) {
    fs.renameSync(cssPath, newCssPath);
    console.log('Renamed siriuba.css to engenho.css');
}

// 2. Update siriuba.css / engenho.css content
replaceInFile(newCssPath, [
    ['data-app="siriuba"', 'data-app="engenho"']
]);

// 3. Update LanguageContext.tsx
replaceInFile(path.join(dir, '_i18n', 'LanguageContext.tsx'), [
    ['siriuba2_lang', 'engenho_lang']
]);

// 4. Update translations.ts (fix remaining Siriúba 2 texts)
replaceInFile(path.join(dir, '_i18n', 'translations.ts'), [
    ['Siriúba 2', 'Engenho D’Água'],
    ['siriuba-2', 'engenho-CA006944'],
    ['Siriúba', 'Engenho D’Água'],
    ['siriuba', 'engenho']
]);

// 5. Update VirtualTour.tsx
replaceInFile(path.join(dir, '_components', 'VirtualTour.tsx'), [
    ['siriuba-2', 'engenho-CA006944'],
    ['Siriuba 2', 'Engenho']
]);

// 6. Update Location.tsx
replaceInFile(path.join(dir, '_components', 'Location.tsx'), [
    ['/assets/engenho-CA006944/siriuba', '/assets/engenho-CA006944/engenho-CA006944-varanda-vista-panoramica-mar-piscina'],
    ['/assets/engenho-CA006944/siriuba-drone', '/assets/engenho-CA006944/engenho-CA006944-fachada-frontal-entrada-vista-mar']
]);

// 7. Update LeadFormModal.tsx
replaceInFile(path.join(dir, '_components', 'LeadFormModal.tsx'), [
    ['siriuba-2', 'engenho-CA006944'],
    ['Siriúba 2', 'Engenho D’Água'],
    ['siriuba2', 'engenhoca006944']
]);

// 8. Update Header.tsx
replaceInFile(path.join(dir, '_components', 'Header.tsx'), [
    ['/siriuba-2', '/engenho-CA006944']
]);

// 9. Update page.tsx
replaceInFile(path.join(dir, 'page.tsx'), [
    ['Siriuba2Inner', 'EngenhoInner'],
    ['Siriuba2Page', 'EngenhoPage'],
    ['data-app="siriuba"', 'data-app="engenho"']
]);

// 10. Update layout.tsx
replaceInFile(path.join(dir, 'layout.tsx'), [
    ['./siriuba.css', './engenho.css'],
    ['/siriuba-2', '/engenho-CA006944'],
    ['SiriubaLayout', 'EngenhoLayout']
]);

// 11. Update obrigado/page.tsx
replaceInFile(path.join(dir, 'obrigado', 'page.tsx'), [
    ['/siriuba-2', '/engenho-CA006944'],
    ['data-app="siriuba"', 'data-app="engenho"']
]);
