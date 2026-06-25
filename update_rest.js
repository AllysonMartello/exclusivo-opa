const fs = require('fs');

const filepath = 'c:\\Users\\allys\\OneDrive\\Documentos\\exclusivo-opa\\app\\engenho-CA006944\\_i18n\\translations.ts';
let content = fs.readFileSync(filepath, 'utf8');

const new_location = `  location: {
    eyebrow: "Localização Estratégica",
    title: "Engenho D’Água, Ilhabela",
    paragraphs: [
      "A casa está no começo do Engenho D’Água, em uma posição muito interessante para quem quer vista, mas não quer complicar a rotina.",
      "Ela fica próxima ao plano da cidade, sem exigir uma subida longa para chegar em casa. Isso muda bastante o uso."
    ],
    highlight: "Em Ilhabela, muita casa entrega vista, mas cobra isso no acesso.",
    paragraphFinal:
      "Aqui, a leitura é outra: a subida é leve, mas suficiente para abrir uma vista ampla para o mar, para o centro, para o campo da aviação, para o píer do Saco da Capela e para o movimento do canal. Na prática, a casa entrega duas coisas difíceis de combinar na ilha: mobilidade e vista.",
    aroundTitle: "Ao redor da casa",
    coordinatesLabel: "Coordenadas",
    mapAlt: "Mapa de Engenho D’Água, Ilhabela",
    openInMaps: "Abrir no Google Maps",
    items: [
      {
        label: "Praia do Engenho D’Água",
        time: "Próximo",
        captions: ["Praia do Engenho D’Água", "Acesso fácil"],
        description: [
          "Fácil acesso a uma das praias centrais mais conhecidas da ilha, com mar calmo e infraestrutura ao redor."
        ],
      },
      {
        label: "Centro Histórico (Vila)",
        time: "5 min",
        captions: ["Vila", "Gastronomia", "Lojas"],
        description: [
          "O coração da ilha. Serviços, restaurantes, lojas e o charme histórico de Ilhabela a poucos minutos de distância."
        ],
      },
      {
        label: "Saco da Capela",
        time: "3 min",
        captions: ["Saco da Capela", "Iate Clube", "Esportes"],
        description: [
          "A região mais náutica da ilha. Excelente para quem busca esportes, restaurantes na areia e serviços focados no mar."
        ],
      },
      {
        label: "Avenida Principal",
        time: "1 min",
        captions: ["Avenida", "Rotina", "Serviços"],
        description: [
          "A proximidade com a avenida principal garante mobilidade ágil para resolver a rotina da cidade sem esforço."
        ],
      },
    ],
    descriptionTags: {
      Destaque: "Destaque",
      Ambiente: "Ambiente",
      Curiosidade: "Curiosidade",
      Atrações: "Atrações",
      Estilo: "Estilo",
      Foco: "Foco",
      Visual: "Visual",
      Diferencial: "Diferencial",
    },
  },`;
content = content.replace(/  location: \{[\s\S]*?\}(?=,\n  theHouse:)/, new_location);

const new_experience = `  experience: {
    eyebrow: "Como seria viver aqui...",
    title: "A Vivência",
    items: [
      {
        time: "Manhã",
        title: "O dia começa simples",
        desc: "A casa funciona bem mesmo quando os proprietários estão sozinhos. No pavimento principal estão sala, jantar, cozinha, TV, suíte master, lavanderia e serviço. Tudo fica perto. A rotina não depende de deslocamentos constantes entre andares.",
      },
      {
        time: "Tarde",
        title: "A casa ganha movimento",
        desc: "A luz entra, os ambientes se conectam e a vista passa a fazer parte da rotina. A casa não foi pensada apenas para impressionar. Ela foi pensada para funcionar. Para receber. Para circular. Para viver com conforto.",
      },
      {
        time: "Noite",
        title: "Receber sem perder privacidade",
        desc: "O gourmet independente muda a experiência da casa. A festa pode acontecer fora da área íntima. Os amigos chegam, a família se reúne, a casa recebe bem. Mas a parte privada continua preservada. Porque, no fim, não é só sobre receber. É sobre receber sem perder a paz da casa.",
      },
    ],
    quote:
      "A casa foi pensada para funcionar bem tanto no dia a dia quanto nos momentos de casa cheia.",
  },`;
content = content.replace(/  experience: \{[\s\S]*?\}(?=,\n  forWho:)/, new_experience);

const new_forwho = `  forWho: {
    eyebrow: "Para quem",
    title: "Para quem quer viver Ilhabela com vista, conforto e mobilidade",
    intro:
      "Esta casa faz sentido para quem quer estar em Ilhabela sem transformar a rotina em esforço. Ela combina natureza, vista, arquitetura e acesso.",
    profiles: [
      {
        text: "Você está perto do plano da cidade, perto dos serviços e com acesso mais simples para viver Ilhabela de verdade.",
        tag: "A rotina",
      },
      {
        text: "Uma casa nova, contemporânea e clean, para quem não busca uma releitura rústica da ilha.",
        tag: "A arquitetura",
      },
      {
        text: "O gourmet independente permite receber amigos e família sem invadir a parte íntima da casa.",
        tag: "A convivência",
      },
      {
        text: "A suíte master no pavimento principal e as demais suítes no inferior criam uma divisão natural entre moradores e hóspedes.",
        tag: "A privacidade",
      },
    ],
    selectedLabel: "Para mim",
    unselectedLabel: "Clique aqui se for você",
    quote:
      "Mais do que uma casa com vista, ela entrega uma forma prática de viver Ilhabela.",
    cta: "Quero entender se faz sentido para minha família",
  },`;
content = content.replace(/  forWho: \{[\s\S]*?\}(?=,\n  virtualTour:)/, new_forwho);

const new_specs = `  technicalSpecs: {
    title: "Ficha Técnica",
    specs: [
      { label: "Código", value: "CA006944" },
      { label: "Localização", value: "Engenho D’Água, Ilhabela/SP" },
      { label: "Tipo", value: "Casa" },
      { label: "Área Construída", value: "376 m²" },
      { label: "Área do Terreno", value: "1.131 m²" },
      { label: "Suítes", value: "4 suítes" },
      { label: "Banheiros", value: "4 banheiros" },
      { label: "Vagas", value: "2 vagas" },
      { label: "Pavimentos", value: "Mais de um pavimento" },
      { label: "Suíte master", value: "No pavimento principal" },
      { label: "Demais suítes", value: "3 suítes no pavimento inferior" },
      { label: "Área social", value: "Sala, jantar, cozinha e TV integradas" },
      { label: "Gourmet", value: "Independente, completo e climatizado" },
      { label: "Climatização", value: "Casa totalmente climatizada" },
      { label: "Tecnologia", value: "Projeto luminotécnico e venezianas automatizadas" },
      { label: "Entrega", value: "Mobiliada e porteira fechada" },
      { label: "Documentação", value: "Matrícula regularizada" },
      { label: "IPTU", value: "R$ 10.963,00/ano" },
      { label: "Valor de venda", value: "R$ 8.500.000" },
    ],
    priceFooter: "Oportunidade no Engenho D’Água",
  },`;
content = content.replace(/  technicalSpecs: \{[\s\S]*?\}(?=,\n  theOPA:)/, new_specs);

const new_theopa = `  theOPA: {
    eyebrow: "Curadoria OPA Imóveis",
    titleStart: "Em Ilhabela, vista sozinha",
    titleEnd: "não explica valor.",
    paragraphs: [
      "Cada bairro responde de um jeito. Cada rua muda a experiência da casa. Cada acesso, cada nível, cada orientação e cada relação com o mar influencia o uso real do imóvel.",
      "Por isso, quando a OPA apresenta uma casa, ela não está apenas mostrando fotos bonitas. Ela está traduzindo o que aquele imóvel entrega na prática. Neste caso, o ponto não é só a vista. É a combinação entre Engenho D’Água, acesso fácil, arquitetura nova, planta inteligente, tecnologia, privacidade e uma casa pronta para viver desde o primeiro dia."
    ],
    badgeLabel: "Experiência",
    badgeValue: "+20 anos",
    logoAlt: "OPA Imóveis",
  },`;
content = content.replace(/  theOPA: \{[\s\S]*?\}(?=,\n  marcosView:)/, new_theopa);

const new_marcos = `  marcosView: {
    eyebrow: "Atendimento",
    name: "Marco Henrique",
    role: "Arquiteto · Curadoria OPA Imóveis",
    audioTitle: "Análise Técnica, Engenho D’Água",
    quote:
      "Tem muita casa em Ilhabela que tem vista, mas cobra isso no acesso. Você sobe muito, fica longe do plano, perde praticidade. Aqui é diferente. A casa está no começo do Engenho. Você sobe pouco e já ganha uma vista enorme para o mar.",
    talkCta: "Falar com o Marco",
    emailCta: "Enviar e-mail profissional",
  },`;
content = content.replace(/  marcosView: \{[\s\S]*?\}(?=,\n  finalCTA:)/, new_marcos);

const new_finalcta = `  finalCTA: {
    title: "Pronto para conhecer uma casa nova no Engenho D’Água?",
    subtitle:
      "Vamos conversar. Não para empurrar uma visita. Para entender se essa casa faz sentido para o seu momento, para sua rotina e para a forma como você quer viver Ilhabela.",
    button: "Falar com a OPA",
    footer: "Atendimento direto com Marco Henrique.",
  },`;
content = content.replace(/  finalCTA: \{[\s\S]*?\}(?=,\n  footer:)/, new_finalcta);

fs.writeFileSync(filepath, content);
console.log("Updated the rest of translations.ts");
