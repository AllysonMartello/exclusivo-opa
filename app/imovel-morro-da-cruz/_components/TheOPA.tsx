"use client";

import { motion } from "motion/react";

export default function TheOPA() {
  return (
    <section className="py-24 bg-bg-main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-16 lg:gap-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-5/12 flex justify-center"
          >
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-2xl relative">
              <div className="absolute inset-0 bg-primary-1/5 z-10 mix-blend-overlay"></div>
              <img 
                src="https://smabio.com.br/wp-content/uploads/2026/04/Frame-83.png" 
                alt="OPA Imóveis" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-7/12"
          >
            <span className="text-primary-2 uppercase tracking-widest text-xs font-bold mb-4 block">Quem Somos</span>
            <h2 className="text-4xl md:text-5xl font-serif text-primary-1 mb-8 leading-tight">
              Curadoria OPA Imóveis
            </h2>
            <div className="space-y-6 text-text-sec text-lg font-light leading-relaxed">
              <p>
                Vinte anos em Ilhabela ensinam coisas que nenhum portal mostra. Qual bairro valoriza. Qual imóvel tem problema que a foto esconde. Qual casa vale mais do que o preço pede e qual vale menos. Quando a OPA apresenta um imóvel, já passou por essa leitura. Você não está vendo um anúncio. Está vendo uma curadoria.
              </p>
              <p>
                Esta casa no Morro da Cruz passou por nossa rigorosa curadoria e representa o ápice do que consideramos um "imóvel com critério".
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
