"use client";

import { motion } from "motion/react";
import { useT } from "../_i18n/LanguageContext";

export default function Criterio() {
  const t = useT();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const fadeUp: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const lensVariants: any = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8 } },
  };

  return (
    <section className="bg-bg-main relative py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-2/5 via-transparent to-transparent opacity-70" />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 relative z-10">
        
        {/* CABEÇALHO */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-4xl mx-auto mb-20 md:mb-32"
        >
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-8">
            <div className="h-[1px] w-8 md:w-12 bg-primary-2/40" />
            <span className="text-primary-2 uppercase tracking-[0.4em] text-[10px] font-black">
              {t.criterio.eyebrow}
            </span>
            <div className="h-[1px] w-8 md:w-12 bg-primary-2/40" />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl md:text-5xl font-serif text-primary-1 leading-[1.05] tracking-tight mb-8"
          >
            {t.criterio.title}
          </motion.h2>

          <motion.div variants={fadeUp} className="space-y-4 max-w-2xl mx-auto">
            {t.criterio.intro.map((paragraph, i) => (
              <p key={i} className="text-text-sec text-xl md:text-3xl leading-relaxed font-light">
                {paragraph}
              </p>
            ))}
          </motion.div>
        </motion.div>

        {/* 4 LENTES (VOCAÇÕES) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative max-w-5xl mx-auto mb-24 md:mb-32"
        >
          {/* Connecting Line Desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-primary-2/20 -translate-y-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
            {t.criterio.lenses.map((lens, i) => (
              <motion.div
                key={lens}
                variants={lensVariants}
                className="relative group flex flex-col items-center justify-center p-8 bg-white/40 backdrop-blur-md rounded-[2rem] border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] hover:-translate-y-2 transition-all duration-500"
              >
                <span className="text-primary-2 font-serif italic text-sm tracking-widest mb-3 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-primary-1 font-serif text-2xl md:text-xl lg:text-2xl leading-snug">
                  {lens}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* SIM OU NÃO SINGELO */}
        <div className="relative pt-10">
          
          {/* Animated Dropping Line */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: 80 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute left-1/2 top-0 w-[1px] bg-gradient-to-b from-primary-2/10 to-primary-2/60 -translate-x-1/2 hidden md:block"
          />

          {/* Center Split Dot */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute left-1/2 top-[80px] w-2 h-2 rounded-full bg-primary-2 -translate-x-1/2 -translate-y-1/2 hidden md:block"
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-0 relative md:pt-32"
          >
            {/* Split Lines Desktop */}
            <div className="hidden md:block absolute top-[80px] left-[25%] right-[25%] h-[1px] bg-primary-2/20" />
            <div className="hidden md:block absolute top-[80px] left-[25%] w-[1px] h-10 bg-primary-2/20" />
            <div className="hidden md:block absolute top-[80px] right-[25%] w-[1px] h-10 bg-primary-2/20" />

            {/* SIM */}
            <motion.div variants={fadeUp} className="text-center md:px-12 lg:px-20">
              <span className="inline-block px-4 py-1.5 border border-primary-1/10 rounded-full text-primary-1 uppercase tracking-[0.3em] text-[10px] font-black mb-6 bg-white/50">
                Sim
              </span>
              <p className="font-serif text-2xl md:text-3xl text-primary-1 leading-relaxed">
                {t.criterio.decisionYes}
              </p>
            </motion.div>

            {/* NÃO */}
            <motion.div variants={fadeUp} className="text-center md:px-12 lg:px-20 relative">
              {/* Divider on Mobile */}
              <div className="md:hidden absolute -top-8 left-1/2 w-16 h-[1px] bg-primary-2/20 -translate-x-1/2" />
              
              <span className="inline-block px-4 py-1.5 border border-primary-2/10 rounded-full text-text-sec uppercase tracking-[0.3em] text-[10px] font-black mb-6 bg-white/30">
                Não
              </span>
              <p className="font-serif text-2xl md:text-3xl text-text-sec leading-relaxed opacity-80">
                {t.criterio.decisionNo}
              </p>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
