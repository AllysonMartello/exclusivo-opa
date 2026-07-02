"use client";

import { ArrowRight, Play } from "lucide-react";
import { useLanguage, useT } from "../_i18n/LanguageContext";

const BASE = "/assets/engenho-CA006944";

export default function Hero() {
  const { lang, t } = useLanguage();
  return (
    <section className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden pt-32 pb-16 md:py-32">
      <div className="absolute inset-0 z-0">
        <picture className="block absolute inset-0 w-full h-full">
          <img
            src={`${BASE}/engenho-CA006944-varanda-piscina-vista-panoramica-mar.webp`}
            alt={t.hero.imageAlt}
            width={1920}
            height={1080}
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </picture>
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 px-6 md:px-12 lg:px-24 max-w-7xl w-full mx-auto flex flex-col items-center text-center">
        <div className="max-w-4xl flex flex-col items-center">
          <span className="text-white/80 uppercase tracking-[0.3em] text-xs md:text-sm font-medium mb-4 block">
            O bairro basta.
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white leading-[1.1] mb-4">
            Engenho D'Água · Ilhabela
          </h1>
          <p className="text-base md:text-xl text-white/90 font-light mb-6 md:mb-8 max-w-2xl leading-relaxed">
            {lang === "en" ? "A rare address by the São Sebastião channel. In Ilhabela, one of the few retreats where life happens without a car key." : "Um endereço raro à beira do canal de São Sebastião. Em Ilhabela, um dos poucos refúgios onde a vida acontece sem a chave do carro."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-10 md:mb-12">
            <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white/95 text-xs md:text-sm tracking-wide font-medium">{lang === "en" ? "Pier at the beach" : "Píer na praia em frente"}</span>
            <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white/95 text-xs md:text-sm tracking-wide font-medium">{lang === "en" ? "Ready & Furnished" : "Pronta e mobiliada"}</span>
            <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white/95 text-xs md:text-sm tracking-wide font-medium">{lang === "en" ? "Walking distance dining" : "Vila e gastronomia a pé"}</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-lead-form"))}
              className="bg-white text-primary-1 hover:bg-white/90 px-6 md:px-8 py-3.5 md:py-4 rounded-full flex items-center justify-center gap-2 transition-colors duration-300 text-sm md:text-base font-medium w-full sm:w-auto"
            >
              {lang === "en" ? "Talk to OPA" : "Falar com a OPA"} <ArrowRight size={18} />
            </button>
            <a
              href="#tour"
              className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-6 md:px-8 py-3.5 md:py-4 rounded-full flex items-center justify-center gap-2 transition-colors duration-300 text-sm md:text-base font-medium border border-white/20 w-full sm:w-auto"
            >
              <Play size={18} /> {lang === "en" ? "View gallery" : "Ver galeria"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
