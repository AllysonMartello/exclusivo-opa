"use client";

import { motion } from "motion/react";
import { Play } from "lucide-react";
import { pushVirtualTourView } from "@/lib/analytics";

export default function VirtualTour() {
  return (
    <section id="tour" className="py-24 bg-primary-1 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif mb-6"
          >
            Explore cada detalhe, quando quiser, onde quiser.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/80 text-lg mb-12"
          >
            Caminhe pelos ambientes, sinta a proporção dos espaços e descubra a casa no seu próprio ritmo, antes mesmo da sua visita presencial.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            onClick={() => pushVirtualTourView("morro-da-cruz")}
            className="relative w-full max-w-4xl mx-auto aspect-video rounded-3xl overflow-hidden shadow-2xl group cursor-pointer border border-white/10"
          >
            <img 
              src="/images/banheiro-duplo-closet-casa-luxo-ilhabela-morro-da-cruz-opa-imoveis.webp" 
              alt="Preview do Tour Virtual" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-colors duration-300 group-hover:bg-black/50">
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center text-white shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                <Play size={32} className="ml-2" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
