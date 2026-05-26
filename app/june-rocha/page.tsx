import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import LinksHub, { type AccessCardData } from "@/components/LinksHub";
import { BROKERS, IMOVEIS_EXCLUSIVOS } from "@/lib/brokers";

const broker = BROKERS["june-rocha"];

export const metadata: Metadata = buildMetadata({
  title: `${broker.displayName} | Opa Ilhabela`,
  description: `Página exclusiva de ${broker.displayName} — corretora da Opa Imóveis Ilhabela.`,
  path: `/${broker.slug}`,
});

const acessos: AccessCardData[] = [
  {
    href: "https://wa.me/5511986719000?text=Ol%C3%A1%20June!%20Vim%20pela%20sua%20p%C3%A1gina%20de%20links.%20%5Bsrc:linkbio_june_card_whatsapp%5D",
    icon: "whatsapp",
    title: "WhatsApp",
    desc: "Fale diretamente com June",
    color: "#25D366",
  },
  {
    href: "mailto:june.rocha@opailhabela.com.br?subject=Contato%20via%20Linkbio%20%5Bsrc:linkbio_june_card_email%5D&body=Ol%C3%A1%20June%2C%20vim%20pela%20sua%20p%C3%A1gina%20de%20links.",
    icon: "mail",
    title: "E-mail",
    desc: "june.rocha@opailhabela.com.br",
    color: "#EA4335",
  },
  {
    href: "https://www.linkedin.com/in/june-rocha/?utm_source=linkbio_june&utm_medium=linkbio&utm_campaign=corretor_june_2026&utm_content=card_linkedin",
    icon: "linkedin",
    title: "LinkedIn",
    desc: "Conecte-se profissionalmente",
    color: "#0A66C2",
  },
  {
    href: "https://www.instagram.com/june_rocha/?utm_source=linkbio_june&utm_medium=linkbio&utm_campaign=corretor_june_2026&utm_content=card_instagram",
    icon: "instagram",
    title: "Instagram",
    desc: "@june_rocha",
    color: "#E1306C",
  },
  {
    href: "https://opailhabela.com.br/?utm_source=linkbio_june&utm_medium=linkbio&utm_campaign=corretor_june_2026&utm_content=card_opa_home",
    icon: "globe",
    title: "OPA Imóveis",
    desc: "Conheça nossos imóveis e serviços",
    color: "#0071C6",
  },
  {
    href: "https://opailhabela.com.br/blog?utm_source=linkbio_june&utm_medium=linkbio&utm_campaign=corretor_june_2026&utm_content=card_blog",
    icon: "book",
    title: "Blog – OPA Imóveis",
    desc: "Acompanhe dicas e novidades",
    color: "#3B9ED4",
  },
];

export default function Page() {
  return (
    <LinksHub
      logoSrc={`/assets/brokers/${broker.logoFile}`}
      logoAlt={broker.displayName}
      imoveis={IMOVEIS_EXCLUSIVOS}
      acessos={acessos}
    />
  );
}
