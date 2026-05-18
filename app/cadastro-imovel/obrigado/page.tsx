import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import CadastroObrigado from "./_CadastroObrigado";

export const metadata: Metadata = buildMetadata({
  title: "Cadastro recebido — OPA Imóveis",
  description: "Recebemos o cadastro do seu imóvel. Vamos analisar e entrar em contato em breve.",
  path: "/cadastro-imovel/obrigado",
  noindex: true,
});

export default function ObrigadoPage() {
  return (
    <div data-app="cadastro-imovel" className="w-full min-h-[100dvh] bg-[#F4F7F7]">
      <CadastroObrigado />
    </div>
  );
}
