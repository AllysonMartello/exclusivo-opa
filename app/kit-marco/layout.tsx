import type { Metadata } from "next";
import "./midia-kit.css";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Mídia Kit 2026 · Marco Henrique | OPA Imóveis Ilhabela",
    description:
      "Mídia Kit executivo de Marco Henrique — corretor, arquiteto e empresário em Ilhabela. Alcance, audiência e formatos de parceria de marca.",
    path: "/kit-marco",
    image: null,
  }),
  other: {
    "theme-color": "#166188",
  },
};

export default function MidiaKitMarcoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
