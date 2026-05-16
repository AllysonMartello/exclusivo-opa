"use client";

import { motion } from "motion/react";
import { Maximize, BedDouble, Bath, Car, Trees, Home, MapPin, Anchor, Waves } from "lucide-react";

const specs = [
  { icon: <Maximize size={24} />, label: "Área Construída", value: "273 m² (+ 49m² piscina)" },
  { icon: <Trees size={24} />, label: "Área do Terreno", value: "667 m²" },
  { icon: <BedDouble size={24} />, label: "Suítes", value: "3 Suítes" },
  { icon: <Bath size={24} />, label: "Banheiros", value: "4 Banheiros + Lavabo" },
  { icon: <Car size={24} />, label: "Vagas", value: "4 Vagas" },
  { icon: <Home size={24} />, label: "Ano de Construção", value: "2022-2023" },
  { icon: <MapPin size={24} />, label: "Localização", value: "Cond. Isolabela (100m da praia)" },
  { icon: <Anchor size={24} />, label: "Condomínio", value: "R$ 1.100/mês" },
  { icon: <Waves size={24} />, label: "Valor de Venda", value: "R$ 4.250.000" },
];

export default function TechnicalSpecs() {
  return (
    <section className="py-24 bg-primary-1 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif mb-6"
          >
            Ficha Técnica
          </motion.h2>
          <div className="w-12 h-1 bg-primary-2 mx-auto"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12 mb-20">
          {specs.filter(s => s.label !== "Valor de Venda").map((spec, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col items-start p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300"
            >
              <div className="text-primary-2 mb-6 bg-white/10 p-3 rounded-full">
                {spec.icon}
              </div>
              <h4 className="text-white/60 text-xs uppercase tracking-widest font-medium mb-2">{spec.label}</h4>
              <p className="text-lg font-serif text-white">{spec.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Highlighted Price Card */}
        <div className="flex justify-center">
          {specs.filter(s => s.label === "Valor de Venda").map((spec, index) => (
            <motion.div 
              key="price-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center text-center p-10 md:p-14 rounded-[3rem] bg-white text-primary-1 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.3)] border-4 border-primary-2 max-w-lg w-full"
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
                  Oportunidade Única em Ilhabela
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
