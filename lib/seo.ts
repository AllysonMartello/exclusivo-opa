import type { Metadata } from "next";
import { publicEnv } from "./env";

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
  const ogImage = image
    ? new URL(image, publicEnv.NEXT_PUBLIC_SITE_URL).toString()
    : undefined;

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
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630 }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}
