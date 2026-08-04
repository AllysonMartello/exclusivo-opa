"use client";

import Link from "next/link";

export default function SoldOverlay() {
  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#1A2226] text-white px-6 overflow-hidden">
      {/* Background image overlay with heavy blur and dark overlay */}
      <div className="absolute inset-0 z-0">
        <picture className="block w-full h-full">
          <source type="image/avif" srcSet="/assets/siriuba-2/hero-desktop.avif" />
          <img
            src="/assets/siriuba-2/hero-desktop.jpg"
            alt="Siriúba 2"
            className="w-full h-full object-cover opacity-20 filter blur-xl scale-105"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A2226]/90 via-[#1A2226]/95 to-[#1A2226]" />
      </div>

      {/* Content Card */}
      <div className="relative z-10 max-w-lg w-full text-center flex flex-col items-center">
        {/* Logo */}
        <div className="mb-8">
          <img
            src="/assets/logo/logo-opa.svg"
            alt="OPA Imóveis"
            className="h-10 w-auto mx-auto brightness-0 invert"
          />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          Imóvel Vendido
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white font-semibold leading-tight mb-4">
          Este imóvel foi vendido
        </h1>

        {/* Description */}
        <p className="text-white/70 text-base sm:text-lg font-light leading-relaxed mb-8 max-w-md">
          A Casa Contemporânea Siriúba 2 já foi negociada pela curadoria OPA Imóveis. Confira nossos outros imóveis exclusivos em Ilhabela.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
          <Link
            href="/"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#0071C6] hover:bg-[#005fa7] text-white font-medium text-sm transition-all duration-200 shadow-lg shadow-[#0071C6]/20 flex items-center justify-center gap-2"
          >
            Ver imóveis disponíveis
          </Link>
          <a
            href="https://wa.me/5512992570299?text=Ol%C3%A1!%20Vi%20que%20a%20casa%20do%20Siri%C3%BAba%202%20foi%20vendida%20e%20gostaria%20de%20conhecer%20outros%20im%C3%B3veis%20semelhantes."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-sm transition-all duration-200 backdrop-blur-sm flex items-center justify-center gap-2"
          >
            Falar no WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
