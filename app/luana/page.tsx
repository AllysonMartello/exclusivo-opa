import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import LinksHub, { type AccessCardData } from "@/components/LinksHub";
import { BROKERS, IMOVEIS_EXCLUSIVOS } from "@/lib/brokers";

const broker = BROKERS.luana;

export const metadata: Metadata = buildMetadata({
  title: `${broker.displayName} | Opa Ilhabela`,
  description: `Página exclusiva de ${broker.displayName} — corretora da Opa Imóveis Ilhabela.`,
  path: `/${broker.slug}`,
});

const acessos: AccessCardData[] = [
  {
    href: "https://wa.me/message/XELR6E2673B7K1",
    icon: "whatsapp",
    title: "Vamos conversar?",
    desc: "Fale diretamente com Luana no WhatsApp",
    color: "#25D366",
  },
  {
    href: "https://www.instagram.com/luanamachado.imoveis?utm_source=linkbio_luana&utm_medium=linkbio&utm_campaign=corretor_luana_2026&utm_content=card_instagram",
    icon: "instagram",
    title: "Instagram",
    desc: "@luanamachado.imoveis",
    color: "#E1306C",
  },
  {
    href: "https://opailhabela.com.br/?utm_source=linkbio_luana&utm_medium=linkbio&utm_campaign=corretor_luana_2026&utm_content=card_opa_home",
    icon: "globe",
    title: "OPA Imóveis",
    desc: "Conheça nossos imóveis e serviços",
    color: "#0071C6",
  },
  {
    href: "https://www.youtube.com/@luanamachado.imoveis?utm_source=linkbio_luana&utm_medium=linkbio&utm_campaign=corretor_luana_2026&utm_content=card_youtube",
    icon: "youtube",
    title: "YouTube",
    desc: "Vídeos e tours pelos imóveis",
    color: "#FF5252",
  },
  {
    href: "mailto:luanamachadodecampos@hotmail.com?subject=Contato%20via%20Linkbio%20%5Bsrc:linkbio_luana_card_email%5D&body=Ol%C3%A1%20Luana%2C%20vim%20pela%20sua%20p%C3%A1gina%20de%20links.",
    icon: "mail",
    title: "E-mail",
    desc: "luanamachadodecampos@hotmail.com",
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
