"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useT } from "../_i18n/LanguageContext";

export default function Perguntas() {
  const t = useT();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-bg-alt relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-2/20 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto px-6 sm:px-10 py-20 md:py-28 lg:py-36"
      >
        <div className="flex items-center justify-center gap-3 mb-6 md:mb-8">
          <div className="h-[1px] w-12 bg-primary-2" />
          <span className="text-primary-2 uppercase tracking-[0.3em] text-[10px] font-black">
            {t.perguntas.eyebrow}
          </span>
          <div className="h-[1px] w-12 bg-primary-2" />
        </div>

        <h2 className="section-title text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-primary-1 leading-[1.05] text-center mb-12 md:mb-16">
          {t.perguntas.title}
        </h2>

        <div className="divide-y divide-primary-2/25 border-t border-b border-primary-2/25">
          {t.perguntas.items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`perguntas-answer-${i}`}
                  className="w-full flex items-center justify-between gap-6 py-6 md:py-8 text-left group cursor-pointer"
                >
                  <span className="text-primary-1 text-lg md:text-xl lg:text-2xl font-serif leading-snug">
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="shrink-0 text-primary-2 group-hover:text-primary-1 transition-colors"
                  >
                    <ChevronDown className="w-5 h-5 md:w-6 md:h-6" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`perguntas-answer-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-text-sec text-base md:text-lg leading-relaxed font-light pb-6 md:pb-8 pr-12 md:pr-16">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
