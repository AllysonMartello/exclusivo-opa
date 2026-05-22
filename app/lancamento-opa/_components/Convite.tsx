"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useT } from "../_i18n/LanguageContext";

export default function Convite() {
  const t = useT();

  return (
    <section id="contato" className="py-12 md:py-16 lg:py-20 bg-bg-alt relative overflow-hidden">
      <div className="hidden md:block absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-30 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-2/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/60 backdrop-blur-md rounded-[2.5rem] p-10 md:p-16 lg:p-20 shadow-2xl border border-white text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-[1px] w-8 md:w-12 bg-primary-2" />
            <span className="text-primary-2 uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold">
              {t.convite.eyebrow}
            </span>
            <div className="h-[1px] w-8 md:w-12 bg-primary-2" />
          </div>

          <h2 className="section-title text-3xl sm:text-4xl md:text-5xl font-serif text-primary-1 leading-[1.1] mb-6">
            {t.convite.title}
          </h2>
          
          {t.convite.subtitle && (
            <p className="text-text-sec text-base md:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-12">
              {t.convite.subtitle}
            </p>
          )}

          <a
            href="https://wa.me/5512974068058?text=Ol%C3%A1%2C%20gostaria%20de%20conversar%20sobre%20o%20lan%C3%A7amento%20do%20meu%20im%C3%B3vel%20com%20a%20OPA."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex mt-6 w-full sm:w-auto bg-[#166188] hover:bg-[#166188]/90 text-white px-8 md:px-12 py-5 rounded-full font-bold text-base md:text-lg items-center justify-center gap-3 transition-all hover:scale-105 shadow-[0_8px_30px_rgb(22,97,136,0.2)] group"
          >
            {t.convite.submitLabel}
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
