"use client";

import { motion } from "motion/react";
import { useT } from "../_i18n/LanguageContext";

const BASE = "/assets/teste-lancamento";

export default function Olhar() {
  const t = useT();

  return (
    <section id="olhar" className="bg-bg-main relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-2/20 to-transparent z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[680px] xl:min-h-[760px]">
        {/* Imagem — preenche toda a metade esquerda no desktop */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative h-[60vh] min-h-[420px] sm:h-[70vh] lg:h-auto lg:min-h-0"
        >
          <picture className="block absolute inset-0 w-full h-full">
            <img
              src={`${BASE}/20-anos.jpg`}
              alt={t.olhar.imageAlt}
              className="image-cover"
              loading="lazy"
              decoding="async"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-t from-primary-1/30 via-transparent to-transparent" />
        </motion.div>

        {/* Conteúdo — direita, padded e centralizado verticalmente */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center px-6 py-16 sm:px-10 md:px-14 md:py-20 lg:px-16 lg:py-24 xl:px-24"
        >
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="h-[1px] w-12 bg-primary-2" />
              <span className="text-primary-2 uppercase tracking-[0.3em] text-[10px] font-black">
                {t.olhar.eyebrow}
              </span>
            </div>

            <h2 className="section-title text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-serif text-primary-1 leading-[1.1]">
              {t.olhar.title}
            </h2>

            <div className="space-y-5 md:space-y-6">
              {t.olhar.paragraphs.map((p, i) => (
                <p key={i} className="text-text-sec text-base md:text-lg leading-relaxed font-light">
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-8 md:mt-10 pl-6 border-l-2 border-primary-2">
              <p className="text-primary-1 text-lg md:text-2xl font-serif italic leading-snug">
                {t.olhar.highlight}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
