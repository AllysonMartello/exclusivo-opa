import type { Metadata } from "next";
import "./cadastro-imovel.css";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Cadastro de Imóvel — OPA Imóveis Ilhabela",
    description:
      "Inicie o processo para anunciar seu imóvel com a OPA Imóveis. Preencha as informações da casa em um formulário guiado, etapa por etapa.",
    path: "/cadastro-imovel",
    noindex: true,
  }),
  other: {
    "theme-color": "#253A47",
  },
};

export default function CadastroImovelLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
