"use client";

import { motion } from "motion/react";
import { useT } from "../_i18n/LanguageContext";

export default function TheOPA() {
  const t = useT();
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-bg-main relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-2/20 to-transparent"></div>
      <div className="hidden md:block absolute -left-20 top-1/2 -translate-y-1/2 w-64 h-64 bg-primary-1/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 xl:gap-24">

          {/* Visual Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full lg:w-5/12 relative"
          >
            <div className="relative aspect-square w-full max-w-[240px] sm:max-w-[320px] lg:max-w-[400px] mx-auto">
              {/* Outer rings — desktop only */}
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

              {/* Main Image Container */}
              <div className="w-full h-full rounded-2xl md:rounded-[3rem] shadow-[0_20px_50px_rgba(42,60,79,0.15)] bg-primary-1 p-8 sm:p-12 relative z-10 flex items-center justify-center">
                <img
                  src="/assets/logo/logo-opa.svg"
                  alt={t.theOPA.logoAlt}
                  width={400}
                  height={400}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto max-w-[180px] sm:max-w-[220px] lg:max-w-[260px]"
                />

                {/* Floating Badge */}
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -bottom-6 -right-6 bg-primary-1 text-white p-6 rounded-2xl shadow-xl hidden md:block"
                >
                  <p className="text-[10px] uppercase tracking-widest font-bold mb-1 opacity-70">{t.theOPA.badgeLabel}</p>
                  <p className="text-2xl font-serif">{t.theOPA.badgeValue}</p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Content Side */}
          <div className="w-full lg:w-7/12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="h-[1px] w-12 bg-primary-2"></div>
                <span className="text-primary-2 uppercase tracking-[0.3em] text-[10px] font-black">{t.theOPA.eyebrow}</span>
              </div>

              <h2 className="section-title text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-serif text-primary-1 leading-[1.1]">
                {t.theOPA.titleStart} <span className="italic">{t.theOPA.titleEnd}</span>
              </h2>

              <div className="space-y-6 md:space-y-8">
                {t.theOPA.paragraphs.map((p, i) => (
                  <p key={i} className="text-text-sec text-lg leading-relaxed font-light max-w-2xl">
                    {p}
                  </p>
                ))}
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
