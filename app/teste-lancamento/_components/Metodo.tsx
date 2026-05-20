"use client";

import { motion } from "motion/react";
import { useT } from "../_i18n/LanguageContext";

export default function Metodo() {
  const t = useT();

  return (
    <section id="metodo" className="py-16 md:py-24 lg:py-32 bg-bg-alt relative overflow-hidden">
      <div className="hidden md:block absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-2/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-20">
          <span className="text-primary-2 uppercase tracking-widest text-xs font-bold mb-4 block">
            {t.metodo.eyebrow}
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px" }}
            className="section-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-primary-1 leading-tight"
          >
            {t.metodo.title}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {t.metodo.steps.map((step, index) => (
            <motion.div
              key={step.letter}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ delay: index * 0.12, duration: 0.6 }}
              className="group relative bg-white rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-white"
            >
              {/* Letter mark */}
              <div className="absolute -top-8 -right-2 md:-right-4 select-none pointer-events-none">
                <span className="block text-[120px] md:text-[160px] leading-none font-serif text-primary-2/15 group-hover:text-primary-2/25 transition-colors duration-500">
                  {step.letter}
                </span>
              </div>

              <div className="relative z-10">
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-3xl md:text-4xl font-serif text-primary-1 font-semibold">
                    {step.letter}
                  </span>
                  <span className="text-text-sec text-sm uppercase tracking-widest">·</span>
                  <h3 className="text-2xl md:text-3xl font-serif text-primary-1">{step.name}</h3>
                </div>

                <p className="text-text-sec text-base md:text-lg leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
