import type { Metadata } from "next";
import ThankYou from "../_components/ThankYou";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Obrigado | Apartamento Rua da Alegria, OPA Imóveis",
  description: "Recebemos sua mensagem. Vamos retornar em breve.",
  path: "/sao-jose-dos-campos/obrigado",
  noindex: true,
});

export default function ObrigadoPage() {
  return (
    <div data-app="sjc" className="w-full min-h-screen bg-bg-main relative">
      <ThankYou />
    </div>
  );
}
