"use client";

import { useEffect, useRef, useState } from "react";
import { Smartphone, FileText, Search } from "lucide-react";
import FadeIn from "./FadeIn";

const fragments = [
  { title: "Foto de celular", icon: Smartphone },
  { title: "Descrição genérica", icon: FileText },
  { title: "Três imobiliárias, três preços diferentes no mesmo portal", icon: Search },
];

export default function Tensao() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setRevealed(true);
        });
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`relative py-28 md:py-40 bg-bg-main desaturate-on-load ${revealed ? "is-revealed" : ""}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-24 items-center">
          {/* Left: visual placeholder evocando varanda subexposta */}
          <FadeIn>
            <div className="relative aspect-[4/5] w-full rounded-[28px] overflow-hidden border border-border-main placeholder-image">
              <img
                src="https://picsum.photos/seed/opa-tensao-varanda/1200/1500"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-1/70 via-primary-1/15 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white/80 text-[10px] uppercase tracking-[0.3em]">
                Varanda · 17h32
              </div>
            </div>
          </FadeIn>

          {/* Right: fragments + tension copy */}
          <div>
            <FadeIn>
              <span className="text-secondary uppercase tracking-[0.32em] text-[11px] font-semibold">
                Bloco 02 · O problema
              </span>
            </FadeIn>

            <div className="mt-10 flex flex-col gap-3">
              {fragments.map((f, i) => {
                const Icon = f.icon;
                return (
                  <FadeIn key={f.title} delay={0.08 * i}>
                    <div className="flex items-center gap-4 bg-white/70 backdrop-blur-sm border border-border-main rounded-2xl px-5 py-4">
                      <div className="w-9 h-9 rounded-full bg-bg-alt flex items-center justify-center text-secondary shrink-0">
                        <Icon size={16} strokeWidth={1.6} />
                      </div>
                      <p className="text-text-main text-[15px] md:text-base leading-snug">
                        {f.title}
                      </p>
                    </div>
                  </FadeIn>
                );
              })}
            </div>

            <FadeIn delay={0.4} className="mt-12">
              <p className="text-text-sec text-base md:text-lg leading-relaxed max-w-xl">
                O comprador vê essa contradição. Desconfia. Oferece menos — ou não oferece nada.
              </p>
            </FadeIn>

            <FadeIn delay={0.55} className="mt-8">
              <p className="font-serif text-primary-1 text-2xl md:text-[28px] leading-[1.25] max-w-xl">
                Não é falta de comprador.<br />
                <span className="text-secondary">É falta de cuidado com o que está sendo apresentado.</span>
              </p>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
