"use client";

import { motion } from "motion/react";
import { useT } from "../_i18n/LanguageContext";

export default function Tensao() {
  const t = useT();

  return (
    <section className="bg-bg-alt relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-2/20 to-transparent z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[680px] xl:min-h-[760px]">
        {/* Conteúdo — esquerda */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center px-6 py-16 sm:px-10 md:px-14 md:py-20 lg:px-16 lg:py-24 xl:px-24 z-10"
        >
          <div className="max-w-xl mx-auto lg:mx-0">
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <div className="h-[1px] w-12 bg-primary-2" />
              <span className="text-primary-2 uppercase tracking-[0.3em] text-[10px] font-black">
                {t.tensao.eyebrow}
              </span>
            </div>

            <h2 className="section-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-primary-1 leading-[1.05]">
              {t.tensao.title}
            </h2>

            <div className="space-y-5 md:space-y-6">
              {t.tensao.paragraphs.map((p, i) => (
                <p key={i} className="text-text-sec text-base md:text-lg leading-relaxed font-light">
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-8 md:mt-12 pt-6 border-t border-primary-2/30">
              <p className="text-accent text-xl md:text-2xl font-serif italic leading-snug">
                {t.tensao.highlight}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Imagem — direita */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative h-[50vh] min-h-[400px] lg:h-auto lg:min-h-0 overflow-hidden order-first lg:order-last"
        >
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-bg-alt/80 lg:to-bg-alt z-10 hidden lg:block" />
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.08 }}
            transition={{
              duration: 20,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute inset-0 will-change-transform"
          >
            <img
              src="/assets/teste-lancamento/luxury_interior_tension.png"
              alt="Luxury Interior"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
