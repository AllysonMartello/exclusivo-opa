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
    href: "https://wa.me/5511981815074",
    icon: "whatsapp",
    title: "WhatsApp",
    desc: "Fale diretamente com Fábio",
    color: "#25D366",
  },
  {
    href: "https://opailhabela.com.br/",
    icon: "globe",
    title: "OPA Imóveis",
    desc: "Conheça nossos imóveis e serviços",
    color: "#0071C6",
  },
  {
    href: "https://www.instagram.com/portaldomorumbi/",
    icon: "instagram",
    title: "Portal do Morumbi",
    desc: "Acompanhe no Instagram",
    color: "#E1306C",
  },
  {
    href: "https://www.instagram.com/villasamoa/",
    icon: "instagram",
    title: "Villas Amoa",
    desc: "Acompanhe no Instagram",
    color: "#E1306C",
  },
  {
    href: "https://www.threads.com/@fabiodurello?xmt=AQG0-uDAXoaq8WQfy_eCwBXBZH1skOOdaiu8flAv9kBJ4Mk",
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
