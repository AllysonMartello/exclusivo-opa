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

// 1. Update Location.tsx
replaceInFile(path.join(dir, '_components', 'Location.tsx'), [
    ['Mapa de Siriúba', 'Mapa de Engenho D’Água']
]);

// 2. Update obrigado/page.tsx
replaceInFile(path.join(dir, 'obrigado', 'page.tsx'), [
    ['Siriúba 2', 'Engenho D’Água']
]);

// 3. Update layout.tsx
replaceInFile(path.join(dir, 'layout.tsx'), [
    ['Siriúba 2', 'Engenho D’Água']
]);
