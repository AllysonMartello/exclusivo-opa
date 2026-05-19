"use client";

import { motion } from "motion/react";
import { useT } from "../_i18n/LanguageContext";

export default function Tensao() {
  const t = useT();
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-bg-alt relative overflow-hidden">
      <div className="hidden md:block absolute top-0 right-0 w-[500px] h-[500px] bg-primary-2/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-primary-2 uppercase tracking-widest text-xs font-bold mb-4 block"
        >
          {t.tensao.eyebrow}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="section-title text-3xl sm:text-4xl md:text-5xl font-serif text-primary-1 leading-tight"
        >
          {t.tensao.title}
        </motion.h2>

        <div className="space-y-5 md:space-y-6 text-text-sec text-base md:text-lg font-light leading-relaxed mb-10">
          {t.tensao.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.1 }}
            >
              {p}
            </motion.p>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-primary-1 text-lg md:text-2xl font-serif italic leading-snug border-l-2 border-primary-2 pl-5 md:pl-6"
        >
          {t.tensao.closer}
        </motion.p>
      </div>
    </section>
  );
}
