"use client";

import { motion } from "motion/react";
import { useT } from "../_i18n/LanguageContext";

export default function Tensao() {
  const t = useT();

  return (
    <section className="bg-bg-alt relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-2/20 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto px-6 sm:px-10 py-20 md:py-28 lg:py-36 text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-6 md:mb-8">
          <div className="h-[1px] w-12 bg-primary-2" />
          <span className="text-primary-2 uppercase tracking-[0.3em] text-[10px] font-black">
            {t.tensao.eyebrow}
          </span>
          <div className="h-[1px] w-12 bg-primary-2" />
        </div>

        <h2 className="section-title text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-primary-1 leading-[1.05]">
          {t.tensao.title}
        </h2>

        <div className="space-y-5 md:space-y-6 max-w-2xl mx-auto">
          {t.tensao.paragraphs.map((p, i) => (
            <p key={i} className="text-text-sec text-base md:text-lg leading-relaxed font-light">
              {p}
            </p>
          ))}
        </div>

        <div className="mt-10 md:mt-14 pt-8 md:pt-10 border-t border-primary-2/30">
          <p className="text-primary-1 text-xl md:text-2xl lg:text-3xl font-serif italic leading-snug max-w-2xl mx-auto">
            {t.tensao.highlight}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
