import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import LinksHub, { type AccessCardData } from "@/components/LinksHub";
import { BROKERS, IMOVEIS_EXCLUSIVOS } from "@/lib/brokers";

const broker = BROKERS.fabio;

export const metadata: Metadata = buildMetadata({
  title: `${broker.displayName} | Opa Ilhabela`,
  description: `Página exclusiva de ${broker.displayName} — corretor da Opa Imóveis Ilhabela.`,
  path: `/${broker.slug}`,
});

const acessos: AccessCardData[] = [
  {
    href: "https://wa.me/5511981815074?text=Ol%C3%A1%20F%C3%A1bio!%20Vim%20pela%20sua%20p%C3%A1gina%20de%20links.%20%5Bsrc:linkbio_fabio_card_whatsapp%5D",
    icon: "whatsapp",
    title: "WhatsApp",
    desc: "Fale diretamente com Fábio",
    color: "#25D366",
  },
  {
    href: "https://opailhabela.com.br/?utm_source=linkbio_fabio&utm_medium=linkbio&utm_campaign=corretor_fabio_2026&utm_content=card_opa_home",
    icon: "globe",
    title: "OPA Imóveis",
    desc: "Conheça nossos imóveis e serviços",
    color: "#0071C6",
  },
  {
    href: "https://www.instagram.com/portaldomorumbi/?utm_source=linkbio_fabio&utm_medium=linkbio&utm_campaign=corretor_fabio_2026&utm_content=card_instagram_portal_morumbi",
    icon: "instagram",
    title: "Portal do Morumbi",
    desc: "Acompanhe no Instagram",
    color: "#E1306C",
  },
  {
    href: "https://www.instagram.com/villasamoa/?utm_source=linkbio_fabio&utm_medium=linkbio&utm_campaign=corretor_fabio_2026&utm_content=card_instagram_villas_amoa",
    icon: "instagram",
    title: "Villas Amoa",
    desc: "Acompanhe no Instagram",
    color: "#E1306C",
  },
  {
    href: "https://www.threads.com/@fabiodurello?xmt=AQG0-uDAXoaq8WQfy_eCwBXBZH1skOOdaiu8flAv9kBJ4Mk&utm_source=linkbio_fabio&utm_medium=linkbio&utm_campaign=corretor_fabio_2026&utm_content=card_threads",
    icon: "threads",
    title: "Threads",
    desc: "@fabiodurello",
    color: "#FFFFFF",
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
