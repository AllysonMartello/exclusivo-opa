import type { Metadata } from "next";
import "./jornada.css";
import { buildMetadata } from "@/lib/seo";
import JornadaClient from "./JornadaClient";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "50 dias: a jornada do Siriúba 2 | OPA Imóveis Ilhabela",
    description:
      "O registro dia a dia do lançamento do Siriúba 2: 26 peças de conteúdo, 4 plataformas e 50 dias entre a captação e a venda.",
    path: "/siriuba-2/jornada",
    image: null,
  }),
  other: {
    "theme-color": "#06283A",
  },
};

export default function JornadaPage() {
  return <JornadaClient />;
}
