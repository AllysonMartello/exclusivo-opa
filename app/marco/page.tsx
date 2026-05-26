import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import LinksHub, { type AccessCardData } from "@/components/LinksHub";
import { BROKERS, IMOVEIS_EXCLUSIVOS } from "@/lib/brokers";

const broker = BROKERS.marco;

export const metadata: Metadata = buildMetadata({
  title: `${broker.displayName} | Opa Ilhabela`,
  description: `Página exclusiva de ${broker.displayName} — corretor da Opa Imóveis Ilhabela.`,
  path: `/${broker.slug}`,
});

const acessos: AccessCardData[] = [
  {
    href: "https://wa.me/5512974068058?text=Ol%C3%A1%20Marco!%20Vim%20pela%20sua%20p%C3%A1gina%20de%20links.%20%5Bsrc:linkbio_marco_card_whatsapp%5D",
    icon: "whatsapp",
    title: "Entre em contato",
    desc: "Fale diretamente com Marco no WhatsApp",
    color: "#25D366",
    external: true,
  },
  {
    href: "https://www.instagram.com/marcohenriqueilhabela/?utm_source=linkbio_marco&utm_medium=linkbio&utm_campaign=corretor_marco_2026&utm_content=card_instagram",
    icon: "instagram",
    title: "Instagram",
    desc: "@marcohenriqueilhabela",
    color: "#E1306C",
  },
  {
    href: "https://opailhabela.com.br/blog?utm_source=linkbio_marco&utm_medium=linkbio&utm_campaign=corretor_marco_2026&utm_content=card_blog",
    icon: "book",
    title: "Blog – OPA Imóveis",
    desc: "Acompanhe dicas e novidades",
    color: "#3B9ED4",
  },
  {
    href: "https://www.youtube.com/@marcohenriqueilhabela?utm_source=linkbio_marco&utm_medium=linkbio&utm_campaign=corretor_marco_2026&utm_content=card_youtube",
    icon: "youtube",
    title: "YouTube",
    desc: "Vídeos e tours pelos imóveis",
    color: "#FF5252",
  },
  {
    href: "https://opailhabela.com.br/?utm_source=linkbio_marco&utm_medium=linkbio&utm_campaign=corretor_marco_2026&utm_content=card_opa_home",
    icon: "globe",
    title: "OPA Imóveis",
    desc: "Conheça nossos imóveis e serviços",
    color: "#0071C6",
  },
  {
    href: "https://opailhabela.com.br/anuncie-seu-imovel/?utm_source=linkbio_marco&utm_medium=linkbio&utm_campaign=corretor_marco_2026&utm_content=card_cadastro_imovel",
    icon: "home",
    title: "Cadastro Imóveis",
    desc: "Anuncie seu imóvel conosco em Ilhabela",
    color: "#1E90C4",
  },
];

const ilhabela: AccessCardData[] = [
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

export default function Page() {
  return (
    <LinksHub
      logoSrc={`/assets/brokers/${broker.logoFile}`}
      logoAlt={broker.displayName}
      imoveis={IMOVEIS_EXCLUSIVOS}
      acessos={acessos}
      ilhabela={ilhabela}
    />
  );
}
