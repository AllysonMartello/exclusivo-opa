import type { Metadata } from "next";
import "./siriuba.css";
import { LanguageProvider } from "./_i18n/LanguageContext";
import { buildMetadata } from "@/lib/seo";
import SoldOverlay from "./_components/SoldOverlay";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Imóvel Vendido — Siriúba 2 | OPA Imóveis",
    description:
      "A Casa Contemporânea Siriúba 2 foi negociada com sucesso pela OPA Imóveis. Conheça nossos outros imóveis disponíveis em Ilhabela.",
    path: "/siriuba-2",
    image: "/assets/siriuba-2/og-image.jpg",
  }),
  other: {
    "theme-color": "#1A2226",
  },
};

export default function SiriubaLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <SoldOverlay />
      {children}
    </LanguageProvider>
  );
}
