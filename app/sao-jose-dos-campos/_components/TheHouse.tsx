"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Sofa, UtensilsCrossed, Bath, BedDouble, Info } from "lucide-react";
import { useT } from "../_i18n/LanguageContext";

const BASE = "/assets/sao-jose-dos-campos";
const differentialIcons = [Sofa, UtensilsCrossed, Bath, BedDouble];

type View = "today" | "furnished";

export default function TheHouse() {
  const t = useT();
  const [view, setView] = useState<View>("today");

  return (
    <section id="apartamento" className="py-16 md:py-24 lg:py-32 bg-bg-main">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-14">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary-2 uppercase tracking-widest text-xs font-bold mb-4 block"
          >
            {t.theHouse.eyebrow}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-primary-1 leading-tight"
          >
            {t.theHouse.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-sec text-base md:text-lg font-light max-w-2xl mx-auto"
          >
            {t.theHouse.intro}
          </motion.p>
        </div>

        <div className="flex justify-center mb-8 md:mb-12">
          <div
            role="tablist"
            aria-label="Visualização do apartamento"
            className="relative inline-grid grid-cols-2 items-center bg-white rounded-full p-1 shadow-sm"
          >
            <span
              aria-hidden="true"
              className={`absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full bg-primary-1 transition-transform duration-300 ease-out ${
                view === "today" ? "translate-x-0" : "translate-x-full"
              }`}
            />
            <button
              type="button"
              role="tab"
              aria-selected={view === "today"}
              onClick={() => setView("today")}
              className={`relative z-10 text-center px-5 md:px-7 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest transition-colors duration-200 ${
                view === "today" ? "text-white" : "text-primary-1/60 hover:text-primary-1"
              }`}
            >
              {t.theHouse.todayLabel}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={view === "furnished"}
              onClick={() => setView("furnished")}
              className={`relative z-10 text-center px-5 md:px-7 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest transition-colors duration-200 ${
                view === "furnished" ? "text-white" : "text-primary-1/60 hover:text-primary-1"
              }`}
            >
              {t.theHouse.furnishedLabel}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {t.theHouse.differentials.map((item, index) => {
            const Icon = differentialIcons[index] ?? Sofa;
            const imageKey = view === "today" ? item.image : item.imageFurnished;
            const src = `${BASE}/${imageKey}`;
            return (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px" }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-shadow flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-bg-alt">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={`${index}-${view}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={`${src}.jpg`}
                        alt={item.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        loading="lazy"
                        className="image-cover"
                      />
                    </motion.div>
                  </AnimatePresence>

                  <span
                    className={`absolute top-3 left-3 md:top-4 md:left-4 px-3 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest backdrop-blur-md z-10 transition-colors ${
                      view === "furnished"
                        ? "bg-primary-2 text-white"
                        : "bg-white/90 text-primary-1"
                    }`}
                  >
                    {view === "today" ? t.theHouse.todayLabel : t.theHouse.furnishedLabel}
                  </span>
                </div>

                <div className="p-6 md:p-8 flex items-start gap-4 md:gap-5">
                  <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-primary-2/10 flex items-center justify-center text-primary-2 shrink-0">
                    <Icon size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-serif text-primary-1 mb-2 md:mb-3 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-text-sec text-sm md:text-base font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <AnimatePresence>
          {view === "furnished" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3 }}
              className="mt-8 md:mt-10 max-w-3xl mx-auto bg-bg-alt rounded-2xl p-5 md:p-6 flex gap-3 md:gap-4 items-start"
            >
              <div className="w-9 h-9 rounded-full bg-primary-2/10 flex items-center justify-center text-primary-2 shrink-0">
                <Info size={16} />
              </div>
              <p className="text-text-sec text-xs md:text-sm leading-relaxed">
                {t.theHouse.disclaimer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
