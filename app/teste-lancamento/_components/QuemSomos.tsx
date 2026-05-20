"use client";

import { motion } from "motion/react";
import { useT } from "../_i18n/LanguageContext";

export default function QuemSomos() {
  const t = useT();

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-bg-main relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-2/20 to-transparent" />
      <div className="hidden md:block absolute -left-20 top-1/2 -translate-y-1/2 w-64 h-64 bg-primary-1/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-16 xl:gap-24">
          {/* Logo Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full lg:w-5/12 relative"
          >
            <div className="relative aspect-square w-full max-w-[240px] sm:max-w-[320px] lg:max-w-[400px] mx-auto">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="hidden md:block absolute -inset-10 border border-primary-2/10 rounded-full border-dashed"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="hidden md:block absolute -inset-4 border border-primary-1/10 rounded-full"
              />

              <div className="w-full h-full rounded-2xl md:rounded-[3rem] shadow-[0_20px_50px_rgba(42,60,79,0.15)] bg-primary-1 p-8 sm:p-12 relative z-10 flex items-center justify-center">
                <img
                  src="/assets/logo/logo-opa.svg"
                  alt={t.quemSomos.logoAlt}
                  width={400}
                  height={400}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto max-w-[180px] sm:max-w-[220px] lg:max-w-[260px]"
                />

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -bottom-6 -left-6 bg-primary-1 text-white p-6 rounded-2xl shadow-xl hidden md:block"
                >
                  <p className="text-[10px] uppercase tracking-widest font-bold mb-1 opacity-70">
                    {t.quemSomos.badgeLabel}
                  </p>
                  <p className="text-2xl font-serif">{t.quemSomos.badgeValue}</p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <div className="w-full lg:w-7/12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="h-[1px] w-12 bg-primary-2" />
                <span className="text-primary-2 uppercase tracking-[0.3em] text-[10px] font-black">
                  {t.quemSomos.eyebrow}
                </span>
              </div>

              <h2 className="section-title text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-serif text-primary-1 leading-[1.1]">
                {t.quemSomos.titleStart} <span className="italic">{t.quemSomos.titleEnd}</span>
              </h2>

              <div className="space-y-5 md:space-y-6">
                {t.quemSomos.paragraphs.map((p, i) => (
                  <p key={i} className="text-text-sec text-base md:text-lg leading-relaxed font-light max-w-2xl">
                    {p}
                  </p>
                ))}
              </div>

              <div className="mt-8 md:mt-10 pl-6 border-l-2 border-primary-2 max-w-2xl">
                <p className="text-primary-1 text-lg md:text-2xl font-serif italic leading-snug">
                  {t.quemSomos.highlight}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
