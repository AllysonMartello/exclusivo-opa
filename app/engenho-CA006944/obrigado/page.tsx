import type { Metadata } from "next";
import ThankYou from "../_components/ThankYou";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Obrigado | Engenho D’Água — OPA Imóveis",
  description: "Recebemos sua mensagem. Vamos retornar em breve.",
  path: "/engenho-CA006944/obrigado",
  noindex: true,
});

export default function ObrigadoPage() {
  return (
    <div data-app="engenho" className="w-full min-h-screen bg-bg-main relative">
      <ThankYou />
    </div>
  );
}
