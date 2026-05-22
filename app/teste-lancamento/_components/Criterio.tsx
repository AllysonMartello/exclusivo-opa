"use client";

import { motion } from "motion/react";
import { useT } from "../_i18n/LanguageContext";

export default function Criterio() {
  const t = useT();

  return (
    <section className="bg-bg-main relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-2/20 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto px-6 sm:px-10 py-20 md:py-28 lg:py-36"
      >
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6 md:mb-8">
            <div className="h-[1px] w-12 bg-primary-2" />
            <span className="text-primary-2 uppercase tracking-[0.3em] text-[10px] font-black">
              {t.criterio.eyebrow}
            </span>
            <div className="h-[1px] w-12 bg-primary-2" />
          </div>

          <h2 className="section-title text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-primary-1 leading-[1.05]">
            {t.criterio.title}
          </h2>

          <p className="text-text-sec text-base md:text-lg leading-relaxed font-light max-w-xl mx-auto">
            {t.criterio.intro}
          </p>
        </div>

        <div className="mt-14 md:mt-20">
          <div className="text-center mb-8 md:mb-10">
            <span className="text-primary-2 uppercase tracking-[0.4em] text-[11px] font-black">
              {t.criterio.lensesLabel}
            </span>
          </div>

          <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {t.criterio.lenses.map((lens, i) => (
              <li
                key={lens}
                className="group bg-white border border-primary-2/25 rounded-2xl p-6 md:p-7 text-center transition-shadow hover:shadow-md"
              >
                <span className="block text-primary-2 font-serif italic text-sm tracking-widest mb-3">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="h-px w-8 mx-auto bg-primary-2/40 mb-4" />
                <span className="block text-primary-1 font-serif text-xl md:text-2xl leading-snug">
                  {lens}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-12 md:mt-16 text-text-sec text-base md:text-lg leading-relaxed font-light max-w-2xl mx-auto text-center">
          {t.criterio.decisionLead}
        </p>

        <div className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-2 gap-px bg-primary-2/25 border border-primary-2/25 rounded-2xl overflow-hidden max-w-3xl mx-auto">
          <div className="bg-white p-6 md:p-8 text-center">
            <span className="block text-primary-2 uppercase tracking-[0.3em] text-[10px] font-black mb-2">
              Sim
            </span>
            <p className="text-primary-1 font-serif text-lg md:text-xl leading-snug">
              {t.criterio.decisionYes}
            </p>
          </div>
          <div className="bg-bg-alt p-6 md:p-8 text-center">
            <span className="block text-primary-2 uppercase tracking-[0.3em] text-[10px] font-black mb-2">
              Não
            </span>
            <p className="text-primary-1 font-serif text-lg md:text-xl leading-snug">
              {t.criterio.decisionNo}
            </p>
          </div>
        </div>

        <p className="mt-12 md:mt-16 text-text-sec text-base md:text-lg leading-relaxed font-light max-w-2xl mx-auto text-center">
          {t.criterio.body}
        </p>

        <div className="mt-10 md:mt-14 pt-8 md:pt-10 border-t border-primary-2/30 text-center">
          <p className="text-accent text-xl md:text-2xl lg:text-3xl font-serif italic leading-snug max-w-2xl mx-auto">
            {t.criterio.highlight}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
