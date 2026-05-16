import type { Metadata } from "next";
import ThankYou from "../_components/ThankYou";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Obrigado | Siriúba 2 — OPA Imóveis",
  description: "Recebemos sua mensagem. Vamos retornar em breve.",
  path: "/siriuba-2/obrigado",
  noindex: true,
});

export default function ObrigadoPage() {
  return (
    <div data-app="siriuba" className="w-full min-h-screen bg-bg-main relative">
      <ThankYou />
    </div>
  );
}
