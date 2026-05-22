"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useT } from '../../_i18n/LanguageContext';

const ScrollytellingImpact = () => {
  const t = useT();
  const phrases = t.scrollytelling.phrases;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [phrases.length]);

  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] bg-[#0F2A44] overflow-hidden flex items-center justify-center py-20">
      {/* Background Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#2F5D82]/30 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-[1400px] w-full px-6 md:px-16 text-center z-10">
        <h2 className="text-3xl md:text-5xl lg:text-7xl xl:text-8xl font-black text-white leading-tight tracking-tighter flex flex-col md:block items-center justify-center">
          <span className="opacity-40">{t.scrollytelling.prefix}</span>{" "}
          <div className="inline-block relative min-h-[1.2em] md:min-h-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.95, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -30, scale: 0.95, filter: "blur(10px)" }}
                transition={{ 
                  duration: 1.2, 
                  ease: [0.22, 1, 0.36, 1] // Quartic Out - very smooth
                }}
                className="inline-block"
              >
                <span className="text-[#2F5D82] italic font-serif serif-italic pr-2">
                  {phrases[index].dynamic}
                </span>
                <span className="text-white">
                  {phrases[index].conclusion}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </h2>
      </div>

      {/* Decorative vertical lines */}
      <div className="absolute left-10 top-0 w-px h-full bg-white/5 hidden lg:block" />
      <div className="absolute right-10 top-0 w-px h-full bg-white/5 hidden lg:block" />
    </section>
  );
};

export default ScrollytellingImpact;
