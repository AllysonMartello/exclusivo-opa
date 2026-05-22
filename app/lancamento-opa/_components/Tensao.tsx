"use client";

import { motion } from "motion/react";
import { useT } from "../_i18n/LanguageContext";

export default function Tensao() {
  const t = useT();

  return (
    <section className="relative bg-[#166188] text-white overflow-hidden py-12 md:py-16 flex items-center min-h-[40vh]">
      {/* Delicate background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#102e41]/50 via-transparent to-transparent opacity-60" />

      <div className="relative z-20 max-w-3xl mx-auto px-6 sm:px-10 w-full flex flex-col items-center text-center">
        
        {/* Eyebrow */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="flex items-center gap-3 mb-10"
        >
          <div className="h-[1px] w-6 md:w-10 bg-white/40" />
          <span className="text-[#B0D1E8] uppercase tracking-[0.3em] text-[10px] font-black">
            {t.tensao.eyebrow}
          </span>
          <div className="h-[1px] w-6 md:w-10 bg-white/40" />
        </motion.div>

        {/* Title */}
        <motion.h2 
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}
          className="text-2xl sm:text-3xl md:text-4xl font-serif text-white/90 mb-12"
        >
          {t.tensao.title}
        </motion.h2>

        <div className="w-full text-center space-y-10 md:space-y-12">
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}
            className="text-white/60 text-lg md:text-xl font-light leading-relaxed"
          >
            {t.tensao.paragraphs[0]}
          </motion.p>

          <motion.p 
            initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-[#B0D1E8] leading-tight py-2"
          >
            {t.tensao.paragraphs[1]}
          </motion.p>

          <motion.p 
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}
            className="text-white/60 text-lg md:text-xl font-light leading-relaxed"
          >
            {t.tensao.paragraphs[2]}
          </motion.p>

        </div>

        {/* Highlight / Conclusion */}
        <motion.div 
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 1.5 }}
          className="mt-16 pt-8 border-t border-white/10 w-full max-w-lg"
        >
          <p className="text-white/80 text-xl md:text-2xl font-serif leading-snug">
            {t.tensao.highlight}
          </p>
        </motion.div>

      </div>
    </section>
  );
}
