"use client";

import FadeIn from "./FadeIn";

export default function Olhar() {
  return (
    <section className="relative bg-bg-alt py-28 md:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-16 lg:gap-24 items-start">
          {/* Sticky image — Marco em ambiente externo */}
          <div className="lg:sticky lg:top-28">
            <FadeIn>
              <div className="relative aspect-[4/5] w-full rounded-[32px] overflow-hidden border border-border-main placeholder-image">
                <img
                  src="https://picsum.photos/seed/opa-marco-feiticeira/1200/1500"
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-1/40 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-white/85 text-[10px] uppercase tracking-[0.3em]">
                  Marco · Praia da Feiticeira
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Text, scrolls past sticky image */}
          <div className="lg:pt-6">
            <FadeIn>
              <span className="text-secondary uppercase tracking-[0.32em] text-[11px] font-semibold">
                Bloco 03 · O Olhar
              </span>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2 className="font-serif text-primary-1 text-4xl md:text-5xl lg:text-[56px] leading-[1.05] mt-8 tracking-tight">
                Vinte anos lendo Ilhabela.
              </h2>
            </FadeIn>

            <div className="mt-10 space-y-7 text-text-main/85 text-base md:text-lg leading-[1.7] max-w-xl">
              <FadeIn delay={0.2}>
                <p>
                  A OPA foi construída por quem cresceu na ilha. Conhece cada bairro,
                  cada orientação solar, cada detalhe que o mercado ignora e o
                  comprador certo valoriza.
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p>
                  Antes de qualquer foto ou anúncio, o imóvel é lido. Entendido.
                  Só então apresentado.
                </p>
              </FadeIn>
              <FadeIn delay={0.4}>
                <p className="text-primary-1 font-medium">
                  Esse olhar não se encontra em qualquer imobiliária.
                </p>
              </FadeIn>
            </div>

            <FadeIn delay={0.5} className="mt-14">
              <div className="flex items-center gap-4">
                <span className="w-12 h-px bg-primary-1/30" />
                <span className="uppercase tracking-[0.32em] text-[11px] font-semibold text-primary-1/60">
                  Nascidos em Ilhabela · Atuando desde 2005
                </span>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
