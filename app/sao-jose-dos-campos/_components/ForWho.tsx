"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { t } from "../_i18n/t";

export default function ForWho() {
  const profiles = t.forWho.profiles.map((p, i) => ({ id: i + 1, ...p }));
  const [selected, setSelected] = useState<number[]>([]);

  const toggleProfile = (id: number) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-16 md:py-24 lg:py-40 bg-bg-main relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="hidden md:block absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-20">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-2/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 0.8 }}
          className="relative aspect-[16/9] sm:aspect-[16/7] md:aspect-[16/6] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-xl bg-bg-alt mb-12 md:mb-20"
        >
          <Image
            src="/assets/sao-jose-dos-campos/pra-quem-entende.jpg"
            alt="Apartamento na Rua da Alegria, Jardim Satélite"
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            loading="lazy"
            className="image-cover"
          />
        </motion.div>

        <div className="text-center mb-12 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary-2 uppercase tracking-[0.4em] text-xs font-bold mb-4 md:mb-6 block"
          >
            {t.forWho.eyebrow}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title text-3xl sm:text-5xl md:text-7xl font-serif text-primary-1 leading-tight"
          >
            {t.forWho.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-sec text-base md:text-xl font-light max-w-2xl mx-auto leading-relaxed"
          >
            {t.forWho.intro}
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {profiles.map((profile, index) => {
            const isSelected = selected.includes(profile.id);
            return (
              <motion.div 
                key={profile.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px" }}
                transition={{ delay: index * 0.1 + 0.3 }}
                onClick={() => toggleProfile(profile.id)}
                className={`group relative p-6 sm:p-8 md:p-10 rounded-[2rem] cursor-pointer transition-all duration-500 border-2 ${
                  isSelected 
                    ? "bg-primary-1 border-primary-1 shadow-2xl scale-[1.02]" 
                    : "bg-white border-transparent hover:border-primary-2/30 shadow-sm hover:shadow-xl"
                }`}
              >
                <div className="flex flex-col h-full justify-between gap-8">
                  <div>
                    <span className={`text-[10px] uppercase tracking-widest font-bold mb-4 block transition-colors duration-300 ${
                      isSelected ? "text-white/60" : "text-primary-2"
                    }`}>
                      {profile.tag}
                    </span>
                    <p className={`text-lg sm:text-xl md:text-2xl font-light leading-snug transition-colors duration-300 ${
                      isSelected ? "text-white" : "text-text-main"
                    }`}>
                      "{profile.text}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div 
                        className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-500 ${
                          isSelected ? "bg-white" : "bg-primary-2/20 group-hover:bg-primary-2/30"
                        }`}
                      >
                        <motion.div
                          className={`w-6 h-6 rounded-full shadow-md ${
                            isSelected ? "bg-primary-1" : "bg-primary-2"
                          }`}
                          animate={{ x: isSelected ? 24 : 0 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      </div>
                      <span className={`text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${
                        isSelected ? "text-white" : "text-primary-2"
                      }`}>
                        {isSelected ? t.forWho.selectedLabel : t.forWho.unselectedLabel}
                      </span>
                    </div>

                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-white/40"
                      >
                        <Check size={40} strokeWidth={1} />
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-12 md:mt-20 text-center"
        >
          <div className="space-y-6">
            <p className="text-text-sec font-serif italic text-xl md:text-2xl px-4">
              "{t.forWho.quote}"
            </p>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-lead-form"))}
              className="mt-6 md:mt-8 bg-primary-2 text-white px-6 md:px-8 py-3.5 md:py-4 rounded-full font-bold hover:bg-opacity-90 transition-all shadow-lg"
            >
              {t.forWho.cta}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
