"use client";

import { ZoomParallax } from "./ui/zoom-parallax";
import { useT } from "../_i18n/LanguageContext";

const parallaxSrcs = [
  "/assets/engenho-CA006944/engenho-CA006944-fachada-frontal-entrada-vista-mar",
  "/assets/engenho-CA006944/engenho-CA006944-varanda-vista-panoramica-mar-piscina",
  "/assets/engenho-CA006944/engenho-CA006944-suite-cama-vista-mar-01",
  "/assets/engenho-CA006944/engenho-CA006944-sala-jantar-varanda-vista-panoramica-mar",
  "/assets/engenho-CA006944/engenho-CA006944-cozinha-gourmet-ilha-sala-jantar",
  "/assets/engenho-CA006944/engenho-CA006944-banheiro-dupla-cuba-suite-vista-mar",
  "/assets/engenho-CA006944/engenho-CA006944-suite-cama-tv-vista-mar-01",
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
