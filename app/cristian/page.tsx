import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import LinksHub, { type AccessCardData } from "@/components/LinksHub";
import { BROKERS, IMOVEIS_EXCLUSIVOS } from "@/lib/brokers";

const broker = BROKERS.cristian;

export const metadata: Metadata = buildMetadata({
  title: `${broker.displayName} | Opa Ilhabela`,
  description: `Página exclusiva de ${broker.displayName} — corretor da Opa Imóveis Ilhabela.`,
  path: `/${broker.slug}`,
});

const acessos: AccessCardData[] = [
  {
    href: "https://api.whatsapp.com/send?phone=5511991676770&text=Ol%C3%A1%20Cristian!%20Vim%20pela%20sua%20p%C3%A1gina%20de%20links.%20%5Bsrc:linkbio_cristian_card_whatsapp%5D",
    icon: "whatsapp",
    title: "WhatsApp",
    desc: "Fale diretamente com Cristian",
    color: "#25D366",
  },
  {
    href: "https://www.instagram.com/spengler.imoveis/?utm_source=linkbio_cristian&utm_medium=linkbio&utm_campaign=corretor_cristian_2026&utm_content=card_instagram",
    icon: "instagram",
    title: "Instagram",
    desc: "@spengler.imoveis",
    color: "#E1306C",
  },
  {
    href: "https://opailhabela.com.br/?utm_source=linkbio_cristian&utm_medium=linkbio&utm_campaign=corretor_cristian_2026&utm_content=card_opa_home",
    icon: "globe",
    title: "OPA Imóveis",
    desc: "Conheça nossos imóveis e serviços",
    color: "#0071C6",
  },
  {
    href: "https://www.linkedin.com/in/cristianspengler/?utm_source=linkbio_cristian&utm_medium=linkbio&utm_campaign=corretor_cristian_2026&utm_content=card_linkedin",
    icon: "linkedin",
    title: "LinkedIn",
    desc: "Conecte-se profissionalmente",
    color: "#0A66C2",
  },
  {
    href: "mailto:opa.cristians@gmail.com?subject=Contato%20via%20Linkbio%20%5Bsrc:linkbio_cristian_card_email%5D&body=Ol%C3%A1%20Cristian%2C%20vim%20pela%20sua%20p%C3%A1gina%20de%20links.",
    icon: "mail",
    title: "E-mail",
    desc: "opa.cristians@gmail.com",
    color: "#EA4335",
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
