"use client";
import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

export default function AEstrutura() {
  return (
    <section 
      className="relative py-32 bg-cover bg-center bg-fixed bg-no-repeat"
      style={{ backgroundImage: "url('/assets/engenho-CA006944/engenho-CA006944-varanda-vista-panoramica-mar-piscina-desktop.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/70"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col items-center text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-serif mb-12 text-white tracking-tight"
        >
          Transparência e Segurança
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl space-y-8 text-xl md:text-2xl text-white/90 leading-[1.8] font-light"
        >
          <p>Toda casa que entra na curadoria da OPA passa por verificação documental e técnica antes de aparecer aqui. E esta passou com excelência:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 text-left text-lg max-w-3xl mx-auto py-4">
            {[
              "Escritura registrada sem ônus",
              "Habite-se emitido",
              "IPTU em dia",
              "Área construída averbada",
              "Conservação técnica avaliada",
              "Análise de salinidade e drenagem"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 md:p-5 rounded-2xl backdrop-blur-sm">
                <CheckCircle2 className="text-white opacity-80 shrink-0" size={24} />
                <span className="font-light text-white/95">{item}</span>
              </div>
            ))}
          </div>

          <p className="font-medium text-white text-2xl pt-4">O comprador recebe o dossiê completo antes da assinatura.</p>
        </motion.div>
      </div>
    </section>
  );
}