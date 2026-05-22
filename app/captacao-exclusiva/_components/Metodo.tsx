"use client";

import { motion } from "motion/react";
import { Eye, Target, Zap } from "lucide-react";
import FadeIn from "./FadeIn";

const steps = [
  {
    letter: "O",
    title: "Olhar",
    icon: Eye,
    desc: "O imóvel é lido antes de qualquer ação. Arquitetura, orientação, vocação do espaço, perfil do comprador certo.",
  },
  {
    letter: "P",
    title: "Posicionamento",
    icon: Target,
    desc: "Definimos a narrativa. Qual história esse imóvel conta. Para quem. Em qual canal esse encontro acontece.",
  },
  {
    letter: "A",
    title: "Ação",
    icon: Zap,
    desc: "Vídeo, tour virtual, site exclusivo, campanha segmentada. Tudo junto. Com acompanhamento constante.",
  },
];

export default function Metodo() {
  return (
    <section
      id="metodo"
      className="relative bg-primary-1 text-white py-28 md:py-40 overflow-hidden"
    >
      <div className="absolute -top-32 -right-32 w-[520px] h-[520px] bg-secondary/30 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-40 -left-32 w-[600px] h-[600px] bg-primary-2/20 blur-[160px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-12">
        <FadeIn>
          <span className="text-primary-2 uppercase tracking-[0.32em] text-[11px] font-semibold">
            Bloco 04 · O Método
          </span>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-[56px] leading-[1.05] mt-8 tracking-tight max-w-3xl">
            Como um imóvel é lançado pela OPA.
          </h2>
        </FadeIn>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.letter}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.8,
                  delay: 0.12 * i,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                className="group relative bg-white/[0.04] border border-white/10 rounded-[32px] p-8 md:p-10 hover:bg-white/[0.07] hover:border-primary-2/40 transition-all duration-700"
              >
                <div className="flex items-start justify-between mb-8">
                  <span className="font-serif text-[88px] md:text-[112px] leading-none text-white/10 group-hover:text-primary-2 transition-colors duration-700 -mt-3">
                    {s.letter}
                  </span>
                  <div className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-primary-2 group-hover:bg-primary-2 group-hover:text-primary-1 transition-all duration-500">
                    <Icon size={18} strokeWidth={1.6} />
                  </div>
                </div>

                <h3 className="font-serif text-2xl md:text-[26px] mb-4 text-white">
                  {s.title}
                </h3>
                <p className="text-white/60 text-[15px] leading-[1.7] font-light">
                  {s.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
