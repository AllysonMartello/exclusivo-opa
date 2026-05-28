import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./sjc.css";
import { LanguageProvider } from "./_i18n/LanguageContext";
import { buildMetadata } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-sjc-sans",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-sjc-serif",
});

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Apartamento no Residencial Caribe, Rua da Alegria 98, Jardim Satélite | OPA Imóveis",
    description:
      "Apartamento de 75,42 m² no Residencial Caribe, Edifício Haiti. 3 dormitórios, 1 suíte, 1 vaga. Rua da Alegria, 98, Jardim Satélite, São José dos Campos. R$ 475.000.",
    path: "/sao-jose-dos-campos",
    image: "/assets/sao-jose-dos-campos/hero-desktop.jpg",
  }),
  other: {
    "theme-color": "#4A3F38",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Residence",
  name: "Apartamento 14, Edifício Haiti, Residencial Caribe",
  description:
    "Apartamento de 75,42 m² no Residencial Caribe (Edifício Haiti), com 3 dormitórios, 1 suíte, 1 vaga, salão de festas, solário e portaria.",
  url: "https://opailhabela.com.br/sao-jose-dos-campos",
  image: "https://opailhabela.com.br/assets/sao-jose-dos-campos/hero-desktop.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua da Alegria, 98",
    addressLocality: "São José dos Campos",
    addressRegion: "SP",
    postalCode: "12231",
    addressCountry: "BR",
  },
  floorSize: {
    "@type": "QuantitativeValue",
    value: 75.42,
    unitCode: "MTK",
  },
  numberOfRooms: 3,
  numberOfBathroomsTotal: 2,
  offers: {
    "@type": "Offer",
    price: 475000,
    priceCurrency: "BRL",
    availability: "https://schema.org/InStock",
    url: "https://opailhabela.com.br/sao-jose-dos-campos",
  },
};

export default function SJCLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.variable} ${poppins.variable}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LanguageProvider>{children}</LanguageProvider>
    </div>
  );
}
