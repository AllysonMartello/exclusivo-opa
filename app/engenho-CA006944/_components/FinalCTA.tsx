"use client";

import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { useT } from "../_i18n/LanguageContext";

export default function FinalCTA() {
  const t = useT();
  return (
    <section id="contato" className="py-20 md:py-32 bg-bg-main relative overflow-hidden">
      <div className="hidden md:block absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-30 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-2/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-title text-3xl sm:text-4xl md:text-6xl font-serif text-primary-1"
        >
          {t.finalCTA.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-text-sec text-base md:text-xl mb-8 md:mb-12 max-w-2xl mx-auto"
        >
          {t.finalCTA.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-lead-form"))}
            className="inline-flex items-center justify-center gap-3 bg-secondary hover:bg-secondary/90 text-white px-8 md:px-10 py-4 md:py-5 rounded-full text-base md:text-lg font-medium transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <MessageCircle size={24} />
            {t.finalCTA.button}
          </button>
          <p className="mt-6 text-sm text-text-sec">{t.finalCTA.footer}</p>
        </motion.div>
      </div>
    </section>
  );
}
