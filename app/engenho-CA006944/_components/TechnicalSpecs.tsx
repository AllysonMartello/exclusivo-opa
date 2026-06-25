"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Maximize, BedDouble, Bath, Trees, Home, MapPin, Anchor, Waves, FileText, Wind, Users, Sofa, UtensilsCrossed, CircleDollarSign } from "lucide-react";
import { useT } from "../_i18n/LanguageContext";

const specIcons = [
  <FileText size={24} />,      // Código
  <Home size={24} />,          // Tipo
  <MapPin size={24} />,        // Bairro
  <MapPin size={24} />,        // Cidade
  <Maximize size={24} />,      // Área construída
  <Trees size={24} />,         // Terreno
  <BedDouble size={24} />,     // Suítes
  <Bath size={24} />,          // Banheiros
  <Anchor size={24} />,        // Vagas
  <Home size={24} />,          // Condição
  <Sofa size={24} />,          // Entrega
  <FileText size={24} />,      // Documentação
  <FileText size={24} />,      // IPTU
  <CircleDollarSign size={24} /> // Valor de venda
];

export default function TechnicalSpecs() {
  const t = useT();
  const [activeTab, setActiveTab] = useState<'estrutura' | 'valores'>('estrutura');
  
  const specs = t.technicalSpecs.specs.map((s, i) => ({
    ...s,
    icon: specIcons[i] ?? <Home size={24} />,
  }));
  
  // The last item is the price card (index 13)
  const priceIndex = specs.length - 1;
  
  // Estrutura: from 0 to 10
  const estruturaSpecs = specs.slice(0, 11);
  // Valores: from 11 to 13
  const valoresSpecs = specs.slice(11, priceIndex);

  return (
    <section className="py-16 md:py-24 bg-primary-1 text-white min-h-[800px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title text-3xl sm:text-4xl md:text-5xl font-serif mb-8"
          >
            {t.technicalSpecs.title}
          </motion.h2>
          
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
            <button
              onClick={() => setActiveTab('estrutura')}
              className={`px-6 sm:px-8 py-3 rounded-full font-medium transition-all duration-300 text-sm sm:text-base border ${
                activeTab === 'estrutura' 
                  ? 'bg-primary-2 border-primary-2 text-white shadow-lg' 
                  : 'bg-transparent border-white/20 text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              A Casa
            </button>
            <button
              onClick={() => setActiveTab('valores')}
              className={`px-6 sm:px-8 py-3 rounded-full font-medium transition-all duration-300 text-sm sm:text-base border ${
                activeTab === 'valores' 
                  ? 'bg-primary-2 border-primary-2 text-white shadow-lg' 
                  : 'bg-transparent border-white/20 text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              Valores e Documentação
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'estrutura' && (
            <motion.div
              key="estrutura"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-8 gap-y-8 md:gap-y-12">
                {estruturaSpecs.map((spec, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex flex-col items-start p-4 sm:p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300"
                  >
                    <div className="text-primary-2 mb-4 sm:mb-6 bg-white/10 p-3 rounded-full">
                      {spec.icon}
                    </div>
                    <h4 className="text-white/60 text-xs uppercase tracking-widest font-medium mb-2">{spec.label}</h4>
                    <p className="text-base sm:text-lg font-serif text-white">{spec.value}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'valores' && (
            <motion.div
              key="valores"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {valoresSpecs.map((spec, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex flex-col items-start p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300"
                  >
                    <div className="text-primary-2 mb-4 bg-white/10 p-3 rounded-full">
                      {spec.icon}
                    </div>
                    <h4 className="text-white/60 text-xs uppercase tracking-widest font-medium mb-2">{spec.label}</h4>
                    <p className="text-xl font-serif text-white">{spec.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* Highlighted Price Card */}
              <div className="flex justify-center">
                {[specs[priceIndex]].map((spec) => (
                  <motion.div 
                    key="price-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className="flex flex-col items-center text-center p-8 sm:p-10 md:p-14 rounded-[2rem] md:rounded-[3rem] bg-white text-primary-1 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.3)] border-4 border-primary-2 max-w-lg w-full"
                  >
                    <div className="text-primary-2 mb-8 bg-primary-2/10 p-5 rounded-full">
                      {spec.icon}
                    </div>
                    <h4 className="text-primary-1/80 text-sm md:text-base uppercase tracking-[0.4em] font-bold mb-4">{spec.label}</h4>
                    <p className="text-5xl md:text-6xl font-serif font-bold text-primary-1 leading-tight tracking-tight">
                      {spec.value}
                    </p>
                    <div className="mt-8 pt-8 border-t border-primary-1/10 w-full">
                      <span className="text-xs md:text-sm text-primary-1/70 uppercase tracking-[0.2em] font-bold">
                        {t.technicalSpecs.priceFooter}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
