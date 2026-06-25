"use client";

import { ArrowRight, Play } from "lucide-react";
import { useT } from "../_i18n/LanguageContext";

const BASE = "/assets/engenho-CA006944";

export default function Hero() {
  const t = useT();
  return (
    <section className="relative min-h-[100dvh] w-full flex items-end justify-start overflow-hidden pt-32 md:pt-48 pb-16 md:pb-24 lg:pb-32">
      <div className="absolute inset-0 z-0">
        <picture className="block absolute inset-0 w-full h-full">
          {/* Mobile: foto vertical dedicada (media query força uso independente de DPR) */}
          <source
            type="image/avif"
            media="(max-width: 767px)"
            srcSet={`${BASE}/engenho-CA006944-sala-jantar-varanda-vista-panoramica-mar-mobile.avif`}
          />
          <source
            type="image/webp"
            media="(max-width: 767px)"
            srcSet={`${BASE}/engenho-CA006944-sala-jantar-varanda-vista-panoramica-mar-mobile.webp`}
          />
          <source
            type="image/jpeg"
            media="(max-width: 767px)"
            srcSet={`${BASE}/engenho-CA006944-sala-jantar-varanda-vista-panoramica-mar-mobile.jpg`}
          />
          {/* Tablet/Desktop */}
          <source
            type="image/avif"
            srcSet={`${BASE}/engenho-CA006944-sala-jantar-varanda-vista-panoramica-mar-desktop.avif 1024w, ${BASE}/engenho-CA006944-sala-jantar-varanda-vista-panoramica-mar-desktop.avif 1920w`}
            sizes="100vw"
          />
          <source
            type="image/webp"
            srcSet={`${BASE}/engenho-CA006944-sala-jantar-varanda-vista-panoramica-mar-desktop.webp 1024w, ${BASE}/engenho-CA006944-sala-jantar-varanda-vista-panoramica-mar-desktop.webp 1920w`}
            sizes="100vw"
          />
          <img
            src={`${BASE}/engenho-CA006944-sala-jantar-varanda-vista-panoramica-mar-desktop.jpg`}
            srcSet={`${BASE}/engenho-CA006944-sala-jantar-varanda-vista-panoramica-mar-mobile.jpg 767w, ${BASE}/engenho-CA006944-sala-jantar-varanda-vista-panoramica-mar-desktop.jpg 1920w`}
            sizes="100vw"
            alt={t.hero.imageAlt}
            width={1920}
            height={1080}
            fetchPriority="high"
            decoding="async"
            className="image-cover"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      <div className="relative z-10 px-6 md:px-12 lg:px-24 max-w-7xl w-full mx-auto">
        <div className="max-w-3xl">
          <span className="text-white/80 uppercase tracking-[0.3em] text-xs md:text-sm font-medium mb-4 block">
            {t.hero.eyebrow}
          </span>
          <h1 className="section-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white leading-[1.1]">
            {t.hero.title}
          </h1>
          <p className="text-base md:text-xl text-white/90 font-light mb-8 md:mb-10 max-w-2xl">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-lead-form"))}
              className="bg-white text-primary-1 hover:bg-white/90 px-6 md:px-8 py-3.5 md:py-4 rounded-full flex items-center justify-center gap-2 transition-colors duration-300 text-sm md:text-base font-medium w-full sm:w-auto"
            >
              {t.hero.primaryCta} <ArrowRight size={18} />
            </button>
            <a
              href="#tour"
              className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-6 md:px-8 py-3.5 md:py-4 rounded-full flex items-center justify-center gap-2 transition-colors duration-300 text-sm md:text-base font-medium border border-white/20 w-full sm:w-auto"
            >
              <Play size={18} /> {t.hero.secondaryCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
