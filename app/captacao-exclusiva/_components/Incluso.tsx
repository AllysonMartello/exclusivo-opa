"use client";

import { Film, Compass, Globe, Megaphone } from "lucide-react";
import FadeIn from "./FadeIn";

const items = [
  {
    title: "Vídeo cinematográfico",
    desc: "Não é tour gravado de celular. É narrativa que desperta desejo antes da visita.",
    icon: Film,
    tag: "Direção · Roteiro · Edição",
    image: "https://picsum.photos/seed/opa-video-cinema/1600/900",
  },
  {
    title: "Tour virtual 3D",
    desc: "O comprador percorre cada cômodo antes de agendar. Quem chega, chega para comprar.",
    icon: Compass,
    tag: "Matterport · navegação imersiva",
    image: "https://picsum.photos/seed/opa-tour-3d/1600/900",
  },
  {
    title: "Site exclusivo dedicado",
    desc: "Um endereço digital só para aquele imóvel. À altura do que está sendo oferecido.",
    icon: Globe,
    tag: "Domínio próprio · narrativa completa",
    image: "https://picsum.photos/seed/opa-site-exclusivo/1600/900",
  },
  {
    title: "Campanha segmentada",
    desc: "Distribuição paga para o perfil certo — renda, localização, intenção de compra.",
    icon: Megaphone,
    tag: "Meta · Google · listas qualificadas",
    image: "https://picsum.photos/seed/opa-campanha-paga/1600/900",
  },
];

export default function Incluso() {
  return (
    <section className="relative bg-bg-main py-28 md:py-40">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12">
        <div className="max-w-3xl">
          <FadeIn>
            <span className="text-secondary uppercase tracking-[0.32em] text-[11px] font-semibold">
              Bloco 05 · O que está incluído
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-serif text-primary-1 text-4xl md:text-5xl lg:text-[56px] leading-[1.05] mt-8 tracking-tight">
              O que acompanha cada imóvel que aceitamos.
            </h2>
          </FadeIn>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <FadeIn key={item.title} delay={0.08 * i}>
                <article className="group h-full bg-white rounded-[32px] border border-border-main overflow-hidden hover:shadow-[0_30px_60px_-30px_rgba(37,58,71,0.25)] hover:-translate-y-1 transition-all duration-700">
                  <div className="relative aspect-[16/9] w-full placeholder-image overflow-hidden">
                    <img
                      src={item.image}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-1/65 via-primary-1/15 to-transparent" />
                    <div className="absolute bottom-4 left-5 text-white/85 text-[10px] uppercase tracking-[0.28em]">
                      {item.tag}
                    </div>
                    <div className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:bg-white group-hover:text-primary-1 transition-all duration-500">
                      <Icon size={18} strokeWidth={1.6} />
                    </div>
                  </div>

                  <div className="p-8 md:p-10">
                    <h3 className="font-serif text-primary-1 text-[22px] md:text-2xl mb-3 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-text-sec text-[15px] md:text-base leading-[1.7]">
                      {item.desc}
                    </p>
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
