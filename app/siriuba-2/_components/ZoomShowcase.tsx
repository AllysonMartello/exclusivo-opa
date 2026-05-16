"use client";

import { ZoomParallax } from "./ui/zoom-parallax";
import { useT } from "../_i18n/LanguageContext";

const parallaxSrcs = [
  "/assets/siriuba-2/efeito-1",
  "/assets/siriuba-2/efeito-2",
  "/assets/siriuba-2/efeito-3",
  "/assets/siriuba-2/efeito-4",
  "/assets/siriuba-2/efeito-5",
  "/assets/siriuba-2/efeito-6",
  "/assets/siriuba-2/efeito-7",
];

export default function ZoomShowcase() {
  const t = useT();
  const parallaxImages = parallaxSrcs.map((src, i) => ({
    src,
    alt: [
      t.zoom.altSala,
      t.zoom.altPiscina,
      t.zoom.altSuite,
      t.zoom.altQuartoEscritorio,
      t.zoom.altCozinha,
      t.zoom.altBanheiro,
      t.zoom.altQuartoVista,
    ][i] ?? "",
  }));

  return (
    <section id="visao-geral" className="relative z-10">
      <ZoomParallax images={parallaxImages} />
    </section>
  );
}
