import type { Metadata } from "next";
import PopCadastroClient from "./PopCadastroClient";

export const metadata: Metadata = {
  title: "POP Cadastro de Imóvel | OPA Imóveis",
  description: "Procedimento Operacional Padrão para cadastramento de imóveis na OPA.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PopCadastroPage() {
  return <PopCadastroClient />;
}
