import type { Metadata } from "next";
import "./captacao.css";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Captação Exclusiva — OPA Ilhabela | Lançamento de Imóveis de Alto Padrão",
    description:
      "Captação exclusiva em Ilhabela para quem quer vender bem — não só rápido. Vinte anos lendo a ilha. O método O.P.A: Olhar, Posicionamento, Ação.",
    path: "/captacao-exclusiva",
  }),
  other: {
    "theme-color": "#253A47",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Captação Exclusiva OPA",
  serviceType: "Captação e lançamento de imóveis de alto padrão",
  provider: {
    "@type": "RealEstateAgent",
    name: "OPA Ilhabela",
    areaServed: { "@type": "City", name: "Ilhabela" },
  },
  description:
    "Captação exclusiva de imóveis em Ilhabela. Lançamento com vídeo cinematográfico, tour virtual, site dedicado e campanha segmentada.",
  url: "https://opailhabela.com.br/captacao-exclusiva",
};

export default function CaptacaoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
