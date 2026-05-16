import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(self), interest-cohort=()",
  },
];

const immutableCache = [
  { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "smabio.com.br" },
    ],
  },

  async headers() {
    return [
      { source: "/assets/:path*", headers: immutableCache },
      {
        source: "/:path*\\.(jpg|jpeg|png|webp|avif|svg|ico|gif|woff|woff2|ttf|otf|mp3|mp4)",
        headers: immutableCache,
      },
      { source: "/:path*", headers: securityHeaders },
    ];
  },

  async redirects() {
    return [
      { source: "/siriuba-2/index.html", destination: "/siriuba-2", permanent: true },
      { source: "/composicao-opa/index.html", destination: "/composicao-opa", permanent: true },
      { source: "/imovel-morro-da-cruz/index.html", destination: "/imovel-morro-da-cruz", permanent: true },
      { source: "/lancamento-opa/index.html", destination: "/lancamento-opa", permanent: true },
    ];
  },
};

export default nextConfig;
