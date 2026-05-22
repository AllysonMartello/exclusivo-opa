"use client";

import { motion } from "motion/react";
import { useT } from "../_i18n/LanguageContext";

export default function Divisao() {
  const t = useT();
  const opa = t.divisao.columns.opa;
  const proprietario = t.divisao.columns.proprietario;

  return (
    <section className="relative overflow-hidden bg-primary-1">
      {/* Background Image with Parallax effect */}
      <motion.div
        initial={{ scale: 1.05 }}
        animate={{ scale: 1.1 }}
        transition={{
          duration: 30,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute inset-0 z-0"
      >
        <img
          src="/assets/teste-lancamento/partnership_division.png"
          alt="Partnership and Division"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </motion.div>
      <div className="absolute inset-0 bg-primary-1/90 z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary-1/40 via-transparent to-primary-1/95 z-0" />

      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-2/40 to-transparent z-10" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 py-20 md:py-28 lg:py-36"
      >
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6 md:mb-8">
            <div className="h-[1px] w-12 bg-primary-2" />
            <span className="text-primary-2 uppercase tracking-[0.3em] text-[10px] font-black drop-shadow-md">
              {t.divisao.eyebrow}
            </span>
            <div className="h-[1px] w-12 bg-primary-2" />
          </div>

          <h2 className="section-title text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white leading-[1.05] drop-shadow-lg">
            {t.divisao.title}
          </h2>

          <p className="text-white/80 text-base md:text-lg leading-relaxed font-light max-w-xl mx-auto drop-shadow-md">
            {t.divisao.intro}
          </p>
        </div>

        <div className="mt-14 md:mt-20 grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-10 lg:gap-0 items-stretch bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
          <div className="lg:pr-12">
            <span className="block text-primary-2 uppercase tracking-[0.3em] text-[10px] font-black mb-6">
              {opa.label}
            </span>
            <ul className="space-y-4 mb-8">
              {opa.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-4 text-white text-lg md:text-xl font-serif group"
                >
                  <span className="text-primary-2 mt-1.5 transition-transform duration-300 group-hover:scale-125">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-white/60 text-sm md:text-base leading-relaxed font-light italic border-l-2 border-primary-2/50 pl-4">
              {opa.caption}
            </p>
          </div>

          <div
            aria-hidden
            className="hidden lg:block w-px bg-gradient-to-b from-transparent via-white/20 to-transparent"
          />
          <div
            aria-hidden
            className="lg:hidden h-px w-full max-w-[200px] mx-auto bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />

          <div className="lg:pl-12">
            <span className="block text-primary-2 uppercase tracking-[0.3em] text-[10px] font-black mb-6">
              {proprietario.label}
            </span>
            <ul className="space-y-4 mb-8">
              {proprietario.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-4 text-white text-lg md:text-xl font-serif group"
                >
                  <span className="text-primary-2/60 mt-1.5 transition-transform duration-300 group-hover:scale-125">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                    </svg>
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-white/60 text-sm md:text-base leading-relaxed font-light italic border-l-2 border-primary-2/30 pl-4">
              {proprietario.caption}
            </p>
          </div>
        </div>

        <p className="mt-14 md:mt-20 text-white/80 text-base md:text-lg leading-relaxed font-light max-w-3xl mx-auto text-center drop-shadow-md">
          {t.divisao.closing}
        </p>

        <div className="mt-10 md:mt-14 pt-8 md:pt-10 border-t border-white/10 text-center">
          <p className="text-primary-2 text-xl md:text-2xl lg:text-3xl font-serif italic leading-snug max-w-2xl mx-auto drop-shadow-md">
            {t.divisao.highlight}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
