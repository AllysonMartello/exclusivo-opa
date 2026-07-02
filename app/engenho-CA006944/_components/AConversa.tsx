"use client";
import { motion } from "motion/react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useLanguage } from "../_i18n/LanguageContext";

export default function AConversa() {
  const { lang } = useLanguage();

  return (
    <section className="relative min-h-[90vh] flex items-center py-32 bg-primary-1 text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <picture>
          <img 
            src="/assets/engenho-CA006944/engenho-CA006944-fachada-frontal-entrada-vista-mar.webp" 
            alt="Fachada" 
            className="w-full h-full object-cover opacity-20 mix-blend-luminosity"
            loading="lazy"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-t from-primary-1 via-primary-1/95 to-primary-1/70"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 text-center relative z-10 w-full flex flex-col items-center">
        
        {/* Floating Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-20 h-20 bg-white/5 backdrop-blur-sm rounded-full flex items-center justify-center mb-10 border border-white/10"
        >
          <MessageCircle className="text-white/90 w-8 h-8" strokeWidth={1.5} />
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-serif mb-8 tracking-tight"
        >
          {lang === "pt" ? "Venha conhecer o Engenho" : "Come visit Engenho"}
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="max-w-3xl mx-auto space-y-6 text-lg md:text-xl text-white/70 leading-[1.7] font-light mb-12"
        >
          <p>
            {lang === "pt"
              ? "A visita é com hora marcada. Não há plantão, não há tráfego de visitantes."
              : "Visits are scheduled by appointment only. There is no open house, no visitor traffic."
            }
          </p>
          <p>
            {lang === "pt"
              ? "Antes da visita, uma conversa rápida para entender o que vocês procuram e se essa é, de fato, a casa ideal."
              : "Before the visit, a quick conversation to understand what you are looking for and if this is indeed the ideal home."
            }
          </p>
          <p className="text-white/90 font-medium text-xl md:text-2xl pt-6">
            {lang === "pt"
              ? "A partir daí, o resto é conduzido com critério."
              : "From then on, everything else is handled with criteria."
            }
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-16 bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-md max-w-3xl mx-auto"
        >
          <div className="text-center md:text-left">
            <p className="uppercase tracking-[0.2em] text-white/50 text-xs font-semibold mb-2">
              {lang === "pt" ? "Valor de Venda" : "Sale Price"}
            </p>
            <p className="font-medium tracking-tight text-4xl md:text-5xl text-white">
              R$ 8.500.000<span className="text-2xl text-white/50">,00</span>
            </p>
          </div>
          <div className="hidden md:block w-px h-16 bg-white/10"></div>
          <div className="text-center md:text-left">
            <p className="uppercase tracking-[0.2em] text-white/50 text-xs font-semibold mb-2">
              {lang === "pt" ? "IPTU (Anual)" : "IPTU (Annual)"}
            </p>
            <p className="font-medium tracking-tight text-2xl md:text-3xl text-white/90">
              R$ 10.963<span className="text-xl text-white/50">,00</span>
            </p>
          </div>
        </motion.div>
        
        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          onClick={() => window.dispatchEvent(new CustomEvent("open-lead-form"))}
          className="group relative bg-white text-primary-1 px-10 md:px-14 py-5 md:py-6 rounded-full font-medium hover:bg-gray-50 transition-all duration-300 mb-24 flex items-center justify-center gap-4 mx-auto text-lg md:text-xl shadow-[0_0_40px_rgb(255,255,255,0.1)] hover:shadow-[0_0_60px_rgb(255,255,255,0.2)] hover:-translate-y-1"
        >
          {lang === "pt" ? "Conversar com a OPA" : "Talk to OPA"}
          <ArrowRight size={24} className="transition-transform group-hover:translate-x-1.5 text-primary-1" />
        </motion.button>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="w-full pt-16 border-t border-white/10 flex flex-col items-center"
        >
          <span className="uppercase tracking-[0.2em] text-white/40 text-xs font-semibold mb-12">
            {lang === "pt" ? "Corretores Responsáveis" : "Responsible Brokers"}
          </span>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-32 w-full max-w-4xl">
            {/* Cristian */}
            <div className="flex flex-col items-center space-y-2.5">
              <p className="text-white/90 font-medium text-lg tracking-wide mb-1">Cristian Spengler</p>
              <p className="text-white/50 font-light text-sm tracking-wider">CRECI 293581</p>
              <p className="text-white/50 font-light text-sm tracking-wider">(11) 93956-6693</p>
              <a href="mailto:cristian.spengler@opailhabela.com.br" className="text-white/50 font-light text-sm tracking-wide hover:text-white transition-colors">cristian.spengler@opailhabela.com.br</a>
            </div>
            
            {/* Marco */}
            <div className="flex flex-col items-center space-y-2.5">
              <p className="text-white/90 font-medium text-lg tracking-wide mb-1">Marco Henrique da S. Filho</p>
              <p className="text-white/50 font-light text-sm tracking-wider">CRECI 79555</p>
              <p className="text-white/50 font-light text-sm tracking-wider">(12) 97406-8058</p>
              <a href="mailto:marcofilhoilha@gmail.com" className="text-white/50 font-light text-sm tracking-wide hover:text-white transition-colors">marcofilhoilha@gmail.com</a>
            </div>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="w-full mt-16 pt-8 border-t border-white/5 text-center"
        >
          <p className="text-white/30 font-light text-xs tracking-widest uppercase">
            {lang === "pt" ? "© 2026 OPA Imóveis. Todos os direitos reservados." : "© 2026 OPA Imóveis. All rights reserved."}
          </p>
        </motion.div>
      </div>
    </section>
  );
}