import type { Metadata } from "next";
import "./midia-kit.css";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Mídia Kit 2026 · OPA Imóveis Ilhabela",
    description:
      "Mídia Kit executivo da OPA Imóveis Ilhabela — alcance, audiência e formatos de parceria de marca no mercado de alto padrão de Ilhabela.",
    path: "/kit-opa",
    image: null,
  }),
  other: {
    "theme-color": "#166188",
  },
};

export default function MidiaKitOpaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
