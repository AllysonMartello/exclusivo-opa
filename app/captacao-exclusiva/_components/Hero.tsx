"use client";

import { ArrowRight } from "lucide-react";

const headline = "Um imóvel bem vendido começa antes do anúncio.";

export default function Hero() {
  const words = headline.split(" ");
  const totalMs = words.length * 55;

  return (
    <section className="relative min-h-[100dvh] w-full flex items-end overflow-hidden">
      {/* Placeholder do loop drone — trocar por <video> quando vier o asset final */}
      <div className="absolute inset-0 z-0 placeholder-image">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80&auto=format&fit=crop"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-1/80 via-primary-1/25 to-primary-1/10" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-12 pb-24 md:pb-32 lg:pb-40 pt-32">
        <div className="max-w-4xl">
          <span className="inline-block text-white/70 uppercase tracking-[0.32em] text-[11px] md:text-xs font-medium mb-8">
            Lançamento OPA · Captação Exclusiva
          </span>

          <h1 className="word-reveal font-serif text-white text-[34px] leading-[1.08] sm:text-5xl md:text-6xl lg:text-[68px] tracking-tight max-w-[18ch]">
            {words.map((w, i) => (
              <span
                key={i}
                style={{ animationDelay: `${i * 55 + 200}ms` }}
                className="mr-[0.22em]"
              >
                {w}
              </span>
            ))}
          </h1>

          <p
            className="mt-8 md:mt-10 text-white/85 text-base md:text-xl font-light leading-relaxed max-w-2xl opacity-0"
            style={{
              animation: `captacao-word-in 900ms cubic-bezier(0.21,0.47,0.32,0.98) ${totalMs + 700}ms forwards`,
            }}
          >
            Captação exclusiva em Ilhabela para quem quer vender bem — não só rápido.
          </p>

          <a
            href="#convite"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("convite")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group inline-flex items-center gap-3 mt-12 md:mt-14 text-white text-sm md:text-base font-medium"
          >
            <span className="cta-underline">Quero conversar sobre meu imóvel</span>
            <ArrowRight
              size={18}
              className="transition-transform duration-500 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/50 text-[10px] uppercase tracking-[0.4em]">
        <span>Role</span>
        <span className="w-px h-10 bg-white/30" />
      </div>
    </section>
  );
}
