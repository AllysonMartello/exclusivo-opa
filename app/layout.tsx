import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { publicEnv } from "@/lib/env";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";
import ConsentMode from "@/components/analytics/ConsentMode";
import LazyTags from "@/components/analytics/LazyTags";
import GTMNoScript from "@/components/analytics/GTMNoScript";
import PageViewTracker from "@/components/analytics/PageViewTracker";
import ScrollDepthTracker from "@/components/analytics/ScrollDepthTracker";
import EngagementTimeTracker from "@/components/analytics/EngagementTimeTracker";
import WebVitalsTracker from "@/components/analytics/WebVitalsTracker";
import DebugMode from "@/components/analytics/DebugMode";
import CookieConsent from "@/components/layout/CookieConsent";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans-app",
});

export const metadata: Metadata = {
  metadataBase: new URL(publicEnv.NEXT_PUBLIC_SITE_URL),
  title: {
    default: "Exclusivo Opa Ilhabela | Lançamentos",
    template: "%s | OPA Ilhabela",
  },
  description:
    "Conheça os lançamentos exclusivos Opa Ilhabela: Composição, Morro da Cruz e Siriúba 2.",
  icons: {
    icon: "/assets/logo/logo-opa-nova.svg",
  },
  openGraph: {
    title: "Exclusivo Opa Ilhabela | Lançamentos",
    description:
      "Conheça os lançamentos exclusivos Opa Ilhabela: Composição, Morro da Cruz e Siriúba 2.",
    url: publicEnv.NEXT_PUBLIC_SITE_URL,
    siteName: "OPA Imóveis Ilhabela",
    locale: "pt_BR",
    type: "website",
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Exclusivo Opa Ilhabela | Lançamentos",
    description:
      "Conheça os lançamentos exclusivos Opa Ilhabela: Composição, Morro da Cruz e Siriúba 2.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ConsentMode />
        <GTMNoScript />
        {children}
        <CookieConsent />
        <WhatsAppButton />
        <LazyTags />
        <Suspense fallback={null}>
          <DebugMode />
          <PageViewTracker />
          <ScrollDepthTracker />
          <EngagementTimeTracker />
          <WebVitalsTracker />
        </Suspense>
      </body>
    </html>
  );
}
