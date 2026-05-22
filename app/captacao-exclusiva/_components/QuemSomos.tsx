"use client";

import FadeIn from "./FadeIn";

export default function QuemSomos() {
  return (
    <section className="relative bg-bg-alt py-28 md:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-24 items-start">
          {/* Sticky image — Marco varanda / mar */}
          <div className="lg:sticky lg:top-28">
            <FadeIn>
              <div className="relative aspect-[4/5] w-full rounded-[32px] overflow-hidden border border-border-main placeholder-image">
                <img
                  src="https://picsum.photos/seed/opa-marco-varanda/1200/1500"
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary-1/50" />
                <div className="absolute bottom-6 left-6 text-white/85 text-[10px] uppercase tracking-[0.3em]">
                  Foto Marco · varanda
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="lg:pt-6">
            <FadeIn>
              <span className="text-secondary uppercase tracking-[0.32em] text-[11px] font-semibold">
                Bloco 06 · Quem somos
              </span>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2 className="font-serif text-primary-1 text-4xl md:text-5xl lg:text-[56px] leading-[1.05] mt-8 tracking-tight max-w-[14ch]">
                A OPA não trabalha com volume.
              </h2>
            </FadeIn>

            <div className="mt-10 space-y-7 text-text-main/85 text-base md:text-lg leading-[1.7] max-w-xl">
              <FadeIn delay={0.2}>
                <p>
                  Cada imóvel que entra no nosso portfólio é lançado com
                  narrativa, fotografia e estratégia própria.
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p>
                  Somos de Ilhabela. Conhecemos as casas que valem mais do que
                  pedem — e as que pedem mais do que valem.
                </p>
              </FadeIn>
              <FadeIn delay={0.4}>
                <p className="text-primary-1 font-medium">
                  Se o seu tem o perfil certo, queremos conversar.
                </p>
              </FadeIn>
            </div>

            <FadeIn delay={0.5} className="mt-14">
              <a
                href="#convite"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("convite")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-3 text-primary-1 text-sm md:text-base font-medium group"
              >
                <span className="border-b border-primary-1/30 group-hover:border-primary-1 transition-colors pb-0.5">
                  Apresentar meu imóvel
                </span>
                <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
              </a>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
