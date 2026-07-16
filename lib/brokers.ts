import type { AccessCardData, ImovelCardData } from "@/components/LinksHub";

export const IMOVEIS_EXCLUSIVOS: ImovelCardData[] = [
  {
    href: "https://exclusivo.opailhabela.com.br/engenho-CA006944?utm_source=linkbio&utm_medium=linkbio&utm_campaign=engenho_d_agua",
    img: "/assets/engenho-CA006944/piscina-varanda-gourmet.jpg",
    badge: "Exclusivo",
    badgePulse: false,
    title: "Casa Contemporânea no Engenho D'água",
    location: "Engenho D'água, Ilhabela — SP",
    code: "CA006944",
    description:
      "Um endereço raro à beira do canal de São Sebastião. Casa mobiliada, com vista panorâmica para o mar, píer na praia em frente e a poucos passos da Vila e gastronomia.",
  },
  {
    href: "/siriuba-2?utm_source=linkbio&utm_medium=linkbio&utm_campaign=siriuba_2",
    img: "/assets/siriuba-2/hero-desktop.avif",
    badge: "Lançamento",
    badgePulse: true,
    title: "Casa Contemporânea Siriúba 2",
    location: "Siriúba, Ilhabela — SP",
    code: "CA007139",
    description:
      "Residência contemporânea com arquitetura integrada à natureza, amplas áreas externas e vista privilegiada. Projeto exclusivo em lançamento.",
  },
];

export const INSTITUTIONAL_ACESSOS: AccessCardData[] = [
  {
    href: "https://opailhabela.com.br/",
    icon: "globe",
    title: "Site Oficial",
    desc: "Conheça nossos imóveis e serviços",
    color: "#0071C6",
  },
  {
    href: "https://wa.me/5512992570299?text=Ol%C3%A1%21%20Vim%20pela%20p%C3%A1gina%20de%20links%20e%20gostaria%20de%20saber%20mais%20sobre%20loca%C3%A7%C3%A3o%20e%20temporada.&utm_source=linkbio_opa&utm_medium=linkbio&utm_campaign=locacao",
    icon: "key",
    title: "Locação e Temporada",
    desc: "Fale com nossa equipe especialista",
    color: "#F39C12",
  },
  {
    href: "https://opailhabela.com.br/blog",
    icon: "book",
    title: "Nosso Blog",
    desc: "Acompanhe dicas e novidades",
    color: "#3B9ED4",
  },
  {
    href: "https://www.youtube.com/@marcohenriqueilhabela",
    icon: "youtube",
    title: "YouTube",
    desc: "Vídeos e tours pelos nossos imóveis",
    color: "#FF5252",
  },
  {
    href: "https://www.instagram.com/opaimoveisilhabela/",
    icon: "instagram",
    title: "Instagram",
    desc: "Siga e acompanhe nossos bastidores",
    color: "#E1306C",
  },
  {
    href: "https://www.facebook.com/opailhabela/",
    icon: "facebook",
    title: "Facebook",
    desc: "Curta nossa página no Facebook",
    color: "#1877F2",
  },
  {
    href: "https://opailhabela.com.br/anuncie-seu-imovel/",
    icon: "home",
    title: "Cadastre seu imóvel",
    desc: "Anuncie conosco em Ilhabela",
    color: "#1E90C4",
  },
];

export const ILHABELA_LINKS: AccessCardData[] = [
  {
    href: "https://turismoilhabela.com/",
    icon: "map",
    title: "O que fazer na ilha",
    desc: "Guia oficial de turismo de Ilhabela",
    color: "#2BB673",
    external: true,
  },
  {
    href: "https://horamarcada.dh.sp.gov.br/ViaDigital/",
    icon: "ferry",
    title: "Balsa sem fila",
    desc: "Agende o horário da travessia",
    color: "#F39C12",
    external: true,
  },
];

export type BrokerSlug = "marco" | "cristian" | "fabio" | "luana" | "june-rocha";

export type BrokerProfile = {
  slug: BrokerSlug;
  displayName: string;
  logoFile: string;
  // TODO: substituir os "#" abaixo pelos links reais de cada corretor.
  whatsapp?: string;
  instagram?: string;
  youtube?: string;
};

export const BROKERS: Record<BrokerSlug, BrokerProfile> = {
  marco: {
    slug: "marco",
    displayName: "Marco Henrique",
    logoFile: "marco-henrique.png",
    whatsapp: "#",
    instagram: "#",
    youtube: "https://www.youtube.com/@marcohenriqueilhabela",
  },
  cristian: {
    slug: "cristian",
    displayName: "Cristian Spengler",
    logoFile: "cristian-spengler.png",
    whatsapp: "#",
    instagram: "#",
  },
  fabio: {
    slug: "fabio",
    displayName: "Fábio Durello",
    logoFile: "fabio-durello.png",
    whatsapp: "#",
    instagram: "#",
  },
  luana: {
    slug: "luana",
    displayName: "Luana Machado",
    logoFile: "luana-machado.png",
    whatsapp: "#",
    instagram: "#",
  },
  "june-rocha": {
    slug: "june-rocha",
    displayName: "June Rocha",
    logoFile: "june-rocha.png",
    whatsapp: "https://wa.me/5511986719000",
    instagram: "https://www.instagram.com/june_rocha/",
  },
};

export function getBrokerAcessos(slug: BrokerSlug): AccessCardData[] {
  const broker = BROKERS[slug];
  const personal: AccessCardData[] = [];

  if (broker.whatsapp) {
    personal.push({
      href: broker.whatsapp,
      icon: "whatsapp",
      title: `Fale com ${broker.displayName}`,
      desc: "Atendimento direto no WhatsApp",
      color: "#25D366",
    });
  }
  if (broker.instagram) {
    personal.push({
      href: broker.instagram,
      icon: "instagram",
      title: `Instagram de ${broker.displayName}`,
      desc: "Acompanhe os bastidores",
      color: "#E1306C",
    });
  }
  if (broker.youtube) {
    personal.push({
      href: broker.youtube,
      icon: "youtube",
      title: `YouTube de ${broker.displayName}`,
      desc: "Tours e vídeos dos imóveis",
      color: "#FF5252",
    });
  }

  // Mantém os links institucionais — remove o YouTube institucional se o
  // corretor já tem o próprio (evita duplicar a mesma URL).
  const institutional = INSTITUTIONAL_ACESSOS.filter(
    (a) => !(broker.youtube && a.href === broker.youtube),
  );

  return [...personal, ...institutional];
}
