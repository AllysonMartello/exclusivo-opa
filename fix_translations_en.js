const fs = require('fs');
const filepath = 'c:\\Users\\allys\\OneDrive\\Documentos\\exclusivo-opa\\app\\engenho-CA006944\\_i18n\\translations.ts';

let content = fs.readFileSync(filepath, 'utf8');

// The file ends with:
// export const translations: Record<Lang, Dictionary> = { pt, en };
// 
// So `pt` is declared, then `en` is declared.
// We can just replace the `en` declaration with `const en: Dictionary = pt;`
// Or just replace the `export const translations...` line to export `{ pt, en: pt }`.

content = content.replace(/export const translations: Record<Lang, Dictionary> = \{ pt, en \};/, 'export const translations: Record<Lang, Dictionary> = { pt, en: pt };');

fs.writeFileSync(filepath, content);
console.log('Fixed English translations by falling back to PT.');
