import type { Metadata } from "next";
import "./siriuba.css";
import { LanguageProvider } from "./_i18n/LanguageContext";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Siriúba 2 — Casa de Alto Padrão à Venda em Ilhabela | OPA Imóveis",
    description:
      "Casa exclusiva à beira-mar em Ilhabela, com vista para o canal e arquitetura premium. Curadoria OPA Imóveis. Agende uma visita.",
    path: "/siriuba-2",
    image: "/assets/siriuba-2/og-image.jpg",
  }),
  other: {
    "theme-color": "#253A47",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Residence",
  name: "Siriúba 2",
  description: "Casa de alto padrão à beira-mar em Ilhabela, curadoria OPA Imóveis.",
  url: "https://opailhabela.com.br/siriuba-2",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ilhabela",
    addressRegion: "SP",
    addressCountry: "BR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -23.7403,
    longitude: -45.3347,
  },
};

export default function SiriubaLayout({ children }: { children: React.ReactNode }) {
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
