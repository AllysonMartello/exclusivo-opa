import type { MetadataRoute } from "next";
import { publicEnv } from "@/lib/env";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = publicEnv.NEXT_PUBLIC_SITE_URL;
  const now = new Date();
  const routes = ["", "/siriuba-2", "/siriuba-2/obrigado", "/composicao-opa", "/imovel-morro-da-cruz", "/lancamento-opa"];
  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));
}
