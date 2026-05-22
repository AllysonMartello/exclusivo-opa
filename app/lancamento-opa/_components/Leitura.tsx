"use client";

import { motion } from "motion/react";
import { useT } from "../_i18n/LanguageContext";

export default function Leitura() {
  const t = useT();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section className="bg-bg-alt relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-2/20 to-transparent z-10" />
      
      {/* Background Decorative Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-primary-2/10 to-transparent rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 py-12 md:py-16 lg:py-20"
      >
        <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6 md:mb-8">
            <div className="h-[1px] w-12 bg-primary-2" />
            <span className="text-primary-2 uppercase tracking-[0.3em] text-[10px] font-black">
              {t.leitura.eyebrow}
            </span>
            <div className="h-[1px] w-12 bg-primary-2" />
          </div>

          <h2 className="section-title text-3xl sm:text-4xl md:text-5xl font-serif text-primary-1 leading-[1.05]">
            {t.leitura.title}
          </h2>

          <p className="text-text-sec text-base md:text-lg leading-relaxed font-light max-w-xl mx-auto">
            {t.leitura.intro}
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-14 md:mt-24 relative">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="hidden md:block absolute left-[5%] right-[5%] top-[11px] h-[2px] bg-gradient-to-r from-transparent via-primary-2/40 to-transparent origin-left"
          />
          <div
            aria-hidden
            className="md:hidden absolute left-[11px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-primary-2/40 to-transparent"
          />

          <ol className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 relative">
            {t.leitura.timeline.map((node, i) => (
              <motion.li
                key={i}
                variants={itemVariants}
                className="flex md:flex-col items-start md:items-center gap-4 md:gap-4 md:text-center group"
              >
                <div className="relative">
                  <span
                    aria-hidden
                    className="block w-6 h-6 rounded-full border-2 border-primary-1 bg-bg-alt relative shrink-0 mt-0.5 md:mt-0 transition-transform duration-300 group-hover:scale-125 group-hover:border-primary-2"
                  >
                    <span className="block absolute inset-1 rounded-full bg-primary-1 transition-colors duration-300 group-hover:bg-primary-2" />
                  </span>
                  {/* Pulse effect on hover */}
                  <span className="absolute inset-0 rounded-full bg-primary-2/40 animate-ping opacity-0 group-hover:opacity-100" />
                </div>
                <div>
                  <div className="text-primary-1 font-serif text-lg md:text-xl leading-tight transition-colors duration-300 group-hover:text-primary-2">
                    {node.mark}
                  </div>
                  <div className="text-text-sec text-sm md:text-[15px] mt-1.5 leading-snug font-medium">
                    {node.label}
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-16 md:mt-24 bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl p-8 md:p-12 max-w-2xl mx-auto shadow-xl hover:shadow-2xl transition-shadow duration-500 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-2/5 rounded-bl-full transition-transform duration-500 group-hover:scale-110" />
          
          <span className="block text-primary-2 uppercase tracking-[0.3em] text-[10px] font-black mb-6 relative z-10">
            {t.leitura.reportLabel}
          </span>
          <div className="flex flex-wrap gap-3 relative z-10">
            {t.leitura.reportItems.map((item) => (
              <span
                key={item}
                className="px-4 py-2 rounded-full bg-bg-main text-primary-1 text-sm md:text-[15px] border border-primary-2/10 shadow-sm hover:bg-primary-1 hover:text-white hover:border-primary-1 transition-all duration-300 cursor-default"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-primary-2/20 relative z-10">
            <p className="text-accent font-serif italic text-lg md:text-xl leading-relaxed">
              "{t.leitura.reportFeatured}"
            </p>
          </div>
        </motion.div>

        <motion.p variants={itemVariants} className="mt-12 md:mt-16 text-text-sec text-base md:text-lg leading-relaxed font-light max-w-2xl mx-auto text-center">
          {t.leitura.body}
        </motion.p>

        <motion.div variants={itemVariants} className="mt-12 md:mt-16 pt-8 md:pt-10 border-t border-primary-2/30 text-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-bg-alt rotate-45 border-t border-l border-primary-2/30" />
          <p className="text-accent text-xl md:text-2xl lg:text-3xl font-serif italic leading-snug max-w-2xl mx-auto">
            {t.leitura.highlight}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
