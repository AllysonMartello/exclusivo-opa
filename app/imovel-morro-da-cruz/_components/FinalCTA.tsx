"use client";

import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";

export default function FinalCTA() {
  return (
    <section id="contato" className="py-32 bg-bg-main relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-30 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-2/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-serif text-primary-1 mb-8"
        >
          Pronto para conhecer seu novo refúgio?
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-text-sec text-xl mb-12 max-w-2xl mx-auto"
        >
          Agende uma visita exclusiva e sinta pessoalmente a atmosfera única desta casa no Morro da Cruz.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent("open-lead-form"))}
            className="inline-flex items-center justify-center gap-3 bg-secondary hover:bg-secondary/90 text-white px-10 py-5 rounded-full text-lg font-medium transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <MessageCircle size={24} />
            Agendar Visita e Consultoria
          </button>
          <p className="mt-6 text-sm text-text-sec">Atendimento discreto e personalizado.</p>
        </motion.div>
      </div>
    </section>
  );
}
