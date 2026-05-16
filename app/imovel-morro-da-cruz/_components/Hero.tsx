"use client";

import { motion } from "motion/react";
import { ArrowRight, Play } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] w-full flex items-end justify-start overflow-hidden pb-24 md:pb-32">
      <div className="absolute inset-0 z-0">
        <img
          src="https://smabio.com.br/wp-content/uploads/2026/04/area-externa-piscina-casa-alto-padrao-ilhabela-opa-imoveis.webp"
          alt="Refúgio no Morro da Cruz"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      <div className="relative z-10 px-6 md:px-12 lg:px-24 max-w-7xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-3xl"
        >
          <span className="text-white/80 uppercase tracking-[0.3em] text-xs md:text-sm font-medium mb-4 block">
            Itaguassú / Perequê, SP
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-white mb-6 leading-[1.1]">
            Casa Contemporânea<br />em Ilhabela
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-light mb-10 max-w-xl">
            Arquitetura rústico-contemporânea e conceito boutique a passos do mar.
          </p>
          
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent("open-lead-form"))}
              className="bg-white text-primary-1 hover:bg-white/90 px-8 py-4 rounded-full flex items-center justify-center gap-2 transition-all duration-300 text-sm md:text-base font-medium w-full sm:w-auto"
            >
              Falar com Marco Henrique <ArrowRight size={18} />
            </button>
            <a href="#tour" className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-8 py-4 rounded-full flex items-center justify-center gap-2 transition-all duration-300 text-sm md:text-base font-medium border border-white/20 w-full sm:w-auto">
              <Play size={18} /> Tour Virtual
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
