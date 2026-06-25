import type { Metadata } from "next";
import "./engenho.css";
import { LanguageProvider } from "./_i18n/LanguageContext";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Engenho D’Água — Casa de Alto Padrão à Venda em Ilhabela | OPA Imóveis",
    description:
      "Casa exclusiva à beira-mar em Ilhabela, com vista para o canal e arquitetura premium. Curadoria OPA Imóveis. Agende uma visita.",
    path: "/engenho-CA006944",
    image: "/assets/engenho-CA006944/engenho-CA006944-fachada-frontal-entrada-vista-mar.jpg",
  }),
  other: {
    "theme-color": "#253A47",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Residence",
  name: "Engenho D’Água",
  description: "Casa de alto padrão à beira-mar em Ilhabela, curadoria OPA Imóveis.",
  url: "https://opailhabela.com.br/engenho-CA006944",
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

export default function EngenhoLayout({ children }: { children: React.ReactNode }) {
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
