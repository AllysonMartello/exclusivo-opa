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
    href: `https://wa.me/5512974068058?text=${encodeURIComponent(
      "Olá Marco! Vim pela sua página de links.",
    )}`,
    icon: "whatsapp",
    title: "Entre em contato",
    desc: "Fale diretamente com Marco no WhatsApp",
    color: "#25D366",
    external: true,
  },
  {
    href: "https://www.instagram.com/marcohenriqueilhabela/",
    icon: "instagram",
    title: "Instagram",
    desc: "@marcohenriqueilhabela",
    color: "#E1306C",
  },
  {
    href: "https://opailhabela.com.br/blog",
    icon: "book",
    title: "Blog – OPA Imóveis",
    desc: "Acompanhe dicas e novidades",
    color: "#3B9ED4",
  },
  {
    href: "https://www.youtube.com/@marcohenriqueilhabela",
    icon: "youtube",
    title: "YouTube",
    desc: "Vídeos e tours pelos imóveis",
    color: "#FF5252",
  },
  {
    href: "https://opailhabela.com.br/",
    icon: "globe",
    title: "OPA Imóveis",
    desc: "Conheça nossos imóveis e serviços",
    color: "#0071C6",
  },
  {
    href: "https://opailhabela.com.br/anuncie-seu-imovel/",
    icon: "home",
    title: "Cadastro Imóveis",
    desc: "Anuncie seu imóvel conosco em Ilhabela",
    color: "#1E90C4",
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
