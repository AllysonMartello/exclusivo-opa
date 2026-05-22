import type { Metadata } from "next";
import "./teste.css";
import { LanguageProvider } from "./_i18n/LanguageContext";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Captação Exclusiva em Ilhabela | OPA Imóveis",
    description:
      "Um imóvel bem vendido começa antes do anúncio. Captação exclusiva em Ilhabela para quem quer vender bem, não só rápido.",
    path: "/lancamento-opa",
  }),
  other: {
    "theme-color": "#253A47",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "OPA Imóveis · Captação Exclusiva",
  description:
    "Captação exclusiva de imóveis de alto padrão em Ilhabela, com curadoria, narrativa e estratégia próprias.",
  url: "https://opailhabela.com.br/lancamento-opa",
  areaServed: {
    "@type": "City",
    name: "Ilhabela",
  },
};

export default function LancamentoOpaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LanguageProvider>{children}</LanguageProvider>
    </>
  );
}
