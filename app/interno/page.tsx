import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import InternalLinksHub from "@/components/InternalLinksHub";

export const metadata: Metadata = buildMetadata({
  title: "Central de Links & Acessos Internos | OPA Imóveis Ilhabela",
  description:
    "Painel de acessos internos com reunidos os links rápidos do Marco Henrique, sites OPA e materiais do Engenho D'água.",
  path: "/interno",
  noindex: true,
});

export default function InternoPage() {
  return <InternalLinksHub />;
}
