const fs = require('fs');
const filepath = 'c:\\Users\\allys\\OneDrive\\Documentos\\exclusivo-opa\\app\\engenho-CA006944\\_i18n\\translations.ts';

let content = fs.readFileSync(filepath, 'utf8');

const new_pt_theHouse = `  theHouse: {
    galleryTitle: "Uma casa nova, clean e pronta para morar",
    galleryDescription:
      "Esta casa foge da oferta mais convencional de Ilhabela. A ilha tem uma história muito marcada por uma arquitetura mais rústica, com madeira, pedra, telhados aparentes e materiais naturais.\\n\\nAqui, o caminho é outro.\\nMais clean.\\nMais leve.\\nMais contemporâneo.\\n\\nÉ uma casa construída do zero, com ambientes integrados, tecnologia embarcada, decoração em tons claros e uma planta pensada para o uso real. Não é uma casa rústica adaptada. É uma casa nova, feita para quem quer viver Ilhabela com conforto, praticidade e uma leitura mais atual de arquitetura.",
    differentialsEyebrow: "O que a casa oferece na prática",
    differentialsTitle: "Diferenciais",
    video: {
      title: "Veja a casa em movimento",
      desc: "Luz, mar, arquitetura e rotina em poucos minutos.",
    },
    media: [
      { title: "Fachada", desc: "A entrada já apresenta a proposta da casa: arquitetura contemporânea, linhas limpas e vista aberta para o mar." },
      { title: "Entrada", desc: "Porta pivotante, luz natural e a presença do verde logo no primeiro contato com a casa." },
      { title: "Ambientes integrados", desc: "Sala, cozinha e vista trabalham juntas, criando uma área social ampla, leve e funcional." },
      { title: "Sala de jantar", desc: "Um ambiente para receber com o mar presente na rotina, sem esforço e sem excesso." },
      { title: "Living", desc: "A área social tem amplitude, conforto e uma relação constante com a paisagem." },
      { title: "Cozinha gourmet", desc: "Ilha central, integração com a sala de jantar e uma leitura contemporânea para o uso diário." },
      { title: "Cozinha integrada", desc: "A cozinha participa da casa. Não fica isolada. Ela se conecta ao living, à vista e à rotina." },
      { title: "Varanda e vista", desc: "Uma vista ampla para o canal, com piscina, horizonte e a cidade acontecendo ao fundo." },
      { title: "Suíte com vista", desc: "A área íntima mantém a mesma relação da casa com o mar: luz, amplitude e conforto." },
      { title: "Suíte master", desc: "A suíte master no pavimento principal simplifica o uso da casa e reforça a sensação de praticidade." },
      { title: "Banheiro da suíte", desc: "Dupla cuba, acabamento claro e vista, mantendo a linguagem clean do projeto." },
      { title: "Banheira", desc: "Um espaço de pausa, com iluminação bem resolvida e acabamento contemporâneo." },
      { title: "Escada interna", desc: "A escada conecta os pavimentos com leveza e reforça a identidade natural da decoração." },
      { title: "Área íntima", desc: "As suítes no pavimento inferior criam uma divisão inteligente entre moradores e hóspedes." },
      { title: "Suítes inferiores", desc: "As suítes recebem hóspedes com conforto, preservando a privacidade da rotina principal da casa." },
    ],
    details: [
      "Vista ampla para o mar e para o canal",
      "Localização no começo do Engenho D’Água",
      "Acesso mais simples em relação a casas muito altas",
      "Casa nova, construída do zero",
      "Arquitetura contemporânea e clean",
      "Ambientes integrados no pavimento principal",
      "Suíte master no mesmo andar da área social",
      "Três suítes no pavimento inferior",
      "Gourmet completo, independente e climatizado",
      "Casa totalmente climatizada",
      "Projeto luminotécnico e venezianas automatizadas",
      "Piscina e Churrasqueira",
      "Mobiliada, entrega porteira fechada",
      "Carregador para carro e bicicleta elétrica",
      "Matrícula regularizada",
    ],
  },`;

// To ensure we replace correctly, find the index of "  theHouse: {" 
// and the index of the next top level key "  experience: {"
const startIndex = content.indexOf('  theHouse: {');
const endIndex = content.indexOf('  experience: {', startIndex);

if (startIndex !== -1 && endIndex !== -1) {
  content = content.substring(0, startIndex) + new_pt_theHouse + '\n' + content.substring(endIndex);
  fs.writeFileSync(filepath, content);
  console.log('Fixed theHouse object in translations.ts');
} else {
  console.log('Could not find the bounds for replacement.');
}
