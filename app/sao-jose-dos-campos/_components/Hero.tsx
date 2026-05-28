"use client";

import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";
import { t } from "../_i18n/t";

const BASE = "/assets/sao-jose-dos-campos";
const WHATSAPP_NUMBER = "5512974068058";

export default function Hero() {
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t.leadForm.whatsappMessage)}`;

  return (
    <section className="relative min-h-[100dvh] w-full flex items-end justify-start overflow-hidden pb-16 md:pb-24 lg:pb-32 bg-primary-1">
      <div className="absolute inset-0 z-0">
        <Image
          src={`${BASE}/hero-mobile.jpg`}
          alt={t.hero.imageAlt}
          fill
          priority
          fetchPriority="high"
          sizes="(max-width: 767px) 100vw, 0px"
          className="image-cover md:hidden"
        />
        <Image
          src={`${BASE}/hero-desktop.jpg`}
          alt={t.hero.imageAlt}
          fill
          priority
          fetchPriority="high"
          sizes="(min-width: 768px) 100vw, 0px"
          className="image-cover hidden md:block"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
      </div>

      <div className="relative z-10 px-6 md:px-12 lg:px-24 max-w-7xl w-full mx-auto">
        <div className="max-w-3xl">
          <span className="text-white/80 uppercase tracking-[0.3em] text-[10px] md:text-xs font-medium mb-4 block">
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
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-6 md:px-8 py-3.5 md:py-4 rounded-full flex items-center justify-center gap-2 transition-colors duration-300 text-sm md:text-base font-medium w-full sm:w-auto"
            >
              <MessageCircle size={18} /> {t.hero.secondaryCta}
            </a>
          </div>

          <p className="text-white/70 text-xs md:text-sm mt-4 md:mt-5">
            {t.hero.microcopy}
          </p>
        </div>
      </div>
    </section>
  );
}
