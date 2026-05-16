import type { Metadata } from "next";
import "./morro.css";

export const metadata: Metadata = {
  title: "Casa no Morro da Cruz | OPA Ilhabela",
  description:
    "Casa exclusiva no Morro da Cruz, Ilhabela. Arquitetura contemporânea, vista privilegiada e curadoria OPA Imóveis.",
  alternates: { canonical: "/imovel-morro-da-cruz" },
};

export default function MorroLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
