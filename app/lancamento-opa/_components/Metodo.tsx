"use client";

import { motion } from "motion/react";
import { useT } from "../_i18n/LanguageContext";

export default function Metodo() {
  const t = useT();

  return (
    <section id="composicao" className="py-12 md:py-20 lg:py-24 bg-bg-alt relative overflow-hidden">
      <div className="hidden md:block absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-2/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20 md:mb-28">
          <span className="text-primary-2 uppercase tracking-widest text-[10px] md:text-xs font-bold mb-4 block">
            {t.metodo.eyebrow}
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="section-title text-3xl sm:text-4xl md:text-5xl font-serif text-primary-1 leading-tight"
          >
            {t.metodo.title}
          </motion.h2>
        </div>

        <div className="relative max-w-5xl mx-auto">
          
          {/* --- THE CONNECTING LINES (Background) --- */}
          {/* Horizontal Line O -> P -> A (Desktop only) */}
          <div className="hidden md:block absolute top-[120px] left-[16%] right-[16%] h-[2px] z-0">
            <motion.div 
              initial={{ scaleX: 0 }} 
              whileInView={{ scaleX: 1 }} 
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2, duration: 1.0, ease: "linear" }}
              className="w-full h-full bg-primary-2/20 origin-left" 
            />
          </div>

          {/* Mobile connecting vertical line (Background) */}
          <div className="md:hidden absolute top-[10%] bottom-[30%] left-8 w-[2px] z-0">
            <motion.div 
              initial={{ scaleY: 0 }} 
              whileInView={{ scaleY: 1 }} 
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2, duration: 1.0, ease: "linear" }}
              className="w-full h-full bg-primary-2/20 origin-top" 
            />
          </div>

          {/* --- THE 3 CARDS --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8 relative z-10">
            {t.metodo.steps.map((step, index) => (
              <motion.div
                key={step.letter}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.4, duration: 0.6, ease: "easeOut" }}
                className="group relative bg-white/80 backdrop-blur-md rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-primary-2/10"
              >
                {/* Letter watermark */}
                <div className="absolute -top-6 -right-2 select-none pointer-events-none">
                  <span className="block text-[100px] md:text-[140px] leading-none font-serif text-primary-2/5 group-hover:text-primary-2/10 transition-colors duration-500">
                    {step.letter}
                  </span>
                </div>

                <div className="relative z-10">
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-3xl md:text-4xl font-serif text-primary-1 font-semibold">
                      {step.letter}
                    </span>
                    <span className="text-primary-2/40 text-sm uppercase tracking-widest">·</span>
                    <h3 className="text-2xl md:text-3xl font-serif text-primary-1">{step.name}</h3>
                  </div>

                  <p className="text-text-sec text-base leading-relaxed font-light">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* --- THE CONCLUSION (Vertical Drop) --- */}
          <div className="mt-12 md:mt-16 flex flex-col items-center">
            
            {/* Dropping line from the middle */}
            <motion.div 
              initial={{ height: 0 }} 
              whileInView={{ height: 60 }} 
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
              className="w-[2px] bg-gradient-to-b from-primary-2/20 to-primary-2/60 mb-6"
            />
            
            {/* The final conclusion phrase */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              whileInView={{ opacity: 1, scale: 1, y: 0 }} 
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 1.6, duration: 0.6, ease: "easeOut" }}
              className="text-center bg-white border border-primary-2/20 rounded-full px-8 py-5 shadow-xl shadow-primary-2/5"
            >
              <p className="text-primary-1 font-serif text-lg md:text-2xl leading-none">
                {/* @ts-ignore */}
                {t.metodo.conclusion}
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
