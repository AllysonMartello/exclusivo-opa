"use client";

import { ArrowRight } from "lucide-react";
import { useT } from "../_i18n/LanguageContext";

const BASE = "/assets/siriuba-2";

// ⇩ Vídeo de fundo do hero. Deixe vazio ("") para usar só a imagem.
// Aceita:
//   - arquivo local em /public, ex: "/assets/lancamento-opa/hero.mp4"
//   - URL externa direta para .mp4/.webm
// Dica: codifique em H.264 .mp4 (compatibilidade) + .webm (peso) e adicione um segundo <source>.
const HERO_VIDEO_MP4 = "/assets/lancamento-opa/HERO_VIDEO_MP4.mp4";
const HERO_VIDEO_WEBM = ""; // .webm atual está mais pesado que o .mp4 — desativado de propósito

export default function Hero() {
  const t = useT();

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("composicao")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {/* Imagem (fallback + poster enquanto vídeo carrega) */}
        <picture className="block absolute inset-0 w-full h-full">
          <source
            type="image/avif"
            media="(max-width: 767px)"
            srcSet={`${BASE}/hero-mobile-v3.avif`}
          />
          <source
            type="image/webp"
            media="(max-width: 767px)"
            srcSet={`${BASE}/hero-mobile-v3.webp`}
          />
          <source
            type="image/jpeg"
            media="(max-width: 767px)"
            srcSet={`${BASE}/hero-mobile-v3.jpg`}
          />
          <source
            type="image/avif"
            srcSet={`${BASE}/hero-tablet.avif 1024w, ${BASE}/hero-desktop.avif 1920w`}
            sizes="100vw"
          />
          <source
            type="image/webp"
            srcSet={`${BASE}/hero-tablet.webp 1024w, ${BASE}/hero-desktop.webp 1920w`}
            sizes="100vw"
          />
          <img
            src={`${BASE}/hero-desktop.jpg`}
            srcSet={`${BASE}/hero-tablet.jpg 1024w, ${BASE}/hero-desktop.jpg 1920w`}
            sizes="100vw"
            alt={t.hero.imageAlt}
            width={1920}
            height={1080}
            fetchPriority="high"
            decoding="async"
            className="image-cover"
          />
        </picture>

        {/* Vídeo por cima da imagem (cobre quando carrega) */}
        {HERO_VIDEO_MP4 && (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={`${BASE}/hero-desktop.jpg`}
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          >
            {HERO_VIDEO_WEBM && <source src={HERO_VIDEO_WEBM} type="video/webm" />}
            <source src={HERO_VIDEO_MP4} type="video/mp4" />
          </video>
        )}

        {/* Overlay azul OPA escuro — melhora a legibilidade sobre o vídeo */}
        <div className="absolute inset-0 bg-[#15232D]/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#15232D]/30 via-transparent to-[#15232D]/50" />
      </div>

      <div className="relative z-10 px-6 md:px-12 lg:px-24 max-w-7xl w-full mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-white/80 uppercase tracking-[0.3em] text-xs md:text-sm font-medium mb-4 block">
            {t.hero.eyebrow}
          </span>
          <h1 className="section-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white leading-[1.1]">
            {t.hero.title}
          </h1>
          <p className="text-base md:text-xl text-white/90 font-light mb-8 md:mb-10 max-w-2xl mx-auto">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
            <button
              onClick={handleCtaClick}
              className="bg-white text-primary-1 hover:bg-white/90 px-6 md:px-8 py-3.5 md:py-4 rounded-full flex items-center justify-center gap-2 transition-colors duration-300 text-sm md:text-base font-medium w-full sm:w-auto"
            >
              {t.hero.primaryCta} <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
