import type { Metadata } from "next";
import "./composicao.css";

export const metadata: Metadata = {
  title: "Composição OPA — Curadoria Imobiliária em Ilhabela",
  description:
    "Curadoria, narrativa e estrutura digital para imóveis de alto padrão em Ilhabela. Diagnóstico inicial e processo dedicado.",
  alternates: { canonical: "/composicao-opa" },
};

export default function ComposicaoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
