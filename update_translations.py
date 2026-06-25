import re

filepath = r"c:\Users\allys\OneDrive\Documentos\exclusivo-opa\app\engenho-CA006944\_i18n\translations.ts"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# Replace pt texts
new_pt_hero = """  hero: {
    eyebrow: "PÁGINA FINAL — CA006944",
    title: "Sofisticação e vista deslumbrante no Engenho D’Água",
    subtitle:
      "Uma casa nova, contemporânea e pronta para viver Ilhabela desde o primeiro dia.\\n\\nCom vista ampla para o mar, ambientes integrados, suíte master no pavimento principal e gourmet independente, esta propriedade combina arquitetura clean, mobilidade e conforto em uma das regiões mais desejadas da ilha.",
    primaryCta: "Quero conhecer esta casa",
    secondaryCta: "Entender se faz sentido para mim",
    imageAlt: "Fachada frontal entrada vista mar",
  },"""
content = re.sub(r"  hero: \{.*?\},", new_pt_hero, content, flags=re.DOTALL, count=1)

new_pt_virtualTour = """  virtualTour: {
    title: "Esteja dentro da casa, da sua tela...",
    previewAlt: "Pré-visualização do tour virtual",
    features: [
      "Ver a integração entre sala, jantar e cozinha",
      "Entender a suíte master no pavimento principal",
      "Observar a vista para o mar e para o canal",
      "Ver como o gourmet funciona separado da casa",
      "Perceber a circulação entre área íntima e área social",
    ],
    button: "Acessar tour virtual",
  },"""
content = re.sub(r"  virtualTour: \{.*?\},", new_pt_virtualTour, content, flags=re.DOTALL, count=1)

new_pt_location = """  location: {
    eyebrow: "Localização",
    title: "Engenho D’Água, Ilhabela",
    paragraphs: [
      "A casa está no começo do Engenho D’Água, em uma posição muito interessante para quem quer vista, mas não quer complicar a rotina.",
      "Ela fica próxima ao plano da cidade, sem exigir uma subida longa para chegar em casa. Isso muda bastante o uso."
    ],
    highlight: "Em Ilhabela, muita casa entrega vista, mas cobra isso no acesso.",
    paragraphFinal:
      "Aqui, a leitura é outra: a subida é leve, mas suficiente para abrir uma vista ampla para o mar, para o centro, para o campo da aviação, para o píer do Saco da Capela e para o movimento do canal.\\n\\nNa prática, a casa entrega duas coisas difíceis de combinar na ilha: mobilidade e vista.",
    aroundTitle: "Ao redor da casa",
    coordinatesLabel: "Coordenadas",
    mapAlt: "Mapa de Engenho D'Água, Ilhabela",
    openInMaps: "Abrir no Google Maps",
    items: [
      {
        label: "Praia do Engenho D’Água",
        time: "",
        captions: ["Praia"],
        description: ["Acesso rápido à praia."],
      },
      {
        label: "Vila",
        time: "",
        captions: ["Centro Histórico"],
        description: ["Perto de serviços, esportes e rotina da cidade."],
      },
      {
        label: "Saco da Capela",
        time: "",
        captions: ["Saco da Capela"],
        description: ["Movimento do canal e píer."],
      },
      {
        label: "Avenida principal",
        time: "",
        captions: ["Acesso"],
        description: ["Fácil acesso aos principais pontos."],
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
  },"""
content = re.sub(r"  location: \{.*?\}(?=,\n  theHouse:)", new_pt_location, content, flags=re.DOTALL, count=1)

new_pt_theHouse = """  theHouse: {
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
  },"""
content = re.sub(r"  theHouse: \{.*?\}(?=,\n  experience:)", new_pt_theHouse, content, flags=re.DOTALL, count=1)

new_pt_experience = """  experience: {
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
        desc: "O gourmet independente muda a experiência da casa. A festa pode acontecer fora da área íntima. Os amigos chegam, a família se reúne, a casa recebe bem. Mas a parte privada continua preservada. É sobre receber sem perder a paz da casa.",
      },
    ],
    quote: "Uma casa pensada para o uso real.",
  },"""
content = re.sub(r"  experience: \{.*?\}(?=,\n  forWho:)", new_pt_experience, content, flags=re.DOTALL, count=1)

new_pt_forWho = """  forWho: {
    eyebrow: "Para quem",
    title: "Para quem quer viver Ilhabela com vista, conforto e mobilidade",
    intro:
      "Esta casa faz sentido para quem quer estar em Ilhabela sem transformar a rotina em esforço. Ela combina natureza, vista, arquitetura e acesso. Mas o principal é o uso. A casa foi pensada para funcionar bem tanto no dia a dia quanto nos momentos de casa cheia.",
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
    quote: "Mais do que uma casa com vista, ela entrega uma forma prática de viver Ilhabela.",
    cta: "Quero entender se faz sentido para minha família",
  },"""
content = re.sub(r"  forWho: \{.*?\}(?=,\n  virtualTour:)", new_pt_forWho, content, flags=re.DOTALL, count=1)

new_pt_tech = """  technicalSpecs: {
    title: "Ficha Técnica",
    specs: [
      { label: "Código", value: "CA006944" },
      { label: "Localização", value: "Engenho D’Água, Ilhabela/SP" },
      { label: "Tipo", value: "Casa" },
      { label: "Área construída", value: "376 m²" },
      { label: "Área do terreno", value: "1.131 m²" },
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
    priceFooter: "Engenho D’Água",
  },"""
content = re.sub(r"  technicalSpecs: \{.*?\}(?=,\n  theOPA:)", new_pt_tech, content, flags=re.DOTALL, count=1)

new_pt_opa = """  theOPA: {
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
  },"""
content = re.sub(r"  theOPA: \{.*?\}(?=,\n  marcosView:)", new_pt_opa, content, flags=re.DOTALL, count=1)

new_pt_marcos = """  marcosView: {
    eyebrow: "Atendimento",
    name: "Marco Henrique",
    role: "Arquiteto · Curadoria OPA Imóveis",
    audioTitle: "Análise Técnica, Engenho D’Água",
    quote: "“Tem muita casa em Ilhabela que tem vista, mas cobra isso no acesso. Você sobe muito, fica longe do plano, perde praticidade. Aqui é diferente. A casa está no começo do Engenho. Você sobe pouco e já ganha uma vista enorme para o mar.”",
    talkCta: "Falar com o Marco",
    emailCta: "Enviar e-mail profissional",
  },"""
content = re.sub(r"  marcosView: \{.*?\}(?=,\n  finalCTA:)", new_pt_marcos, content, flags=re.DOTALL, count=1)

new_pt_final = """  finalCTA: {
    title: "Pronto para conhecer uma casa nova no Engenho D’Água?",
    subtitle: "Vamos conversar.\\n\\nNão para empurrar uma visita. Para entender se essa casa faz sentido para o seu momento, para sua rotina e para a forma como você quer viver Ilhabela.",
    button: "Falar com a OPA",
    footer: "Atendimento direto com Marco Henrique.",
  },"""
content = re.sub(r"  finalCTA: \{.*?\}(?=,\n  footer:)", new_pt_final, content, flags=re.DOTALL, count=1)

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print("translations.ts updated successfully.")
