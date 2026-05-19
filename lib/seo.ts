import type { Metadata } from "next";
import { publicEnv } from "./env";

export const DEFAULT_OG_IMAGE = "/assets/siriuba-2/og-image.jpg";

export type PageSeo = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  image,
  noindex,
}: PageSeo): Metadata {
  const url = new URL(path, publicEnv.NEXT_PUBLIC_SITE_URL).toString();
  const ogImage = new URL(
    image ?? DEFAULT_OG_IMAGE,
    publicEnv.NEXT_PUBLIC_SITE_URL,
  ).toString();

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: "OPA Imóveis Ilhabela",
      locale: "pt_BR",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
