"use client";
import { motion } from "motion/react";

const stripImages = [
  "/assets/engenho-CA006944/engenho-CA006944-varanda-vista-panoramica-mar-piscina-desktop.jpg",
  "/assets/engenho-CA006944/engenho-CA006944-sala-jantar-living-vista-panoramica-mar-desktop.jpg",
  "/assets/engenho-CA006944/engenho-CA006944-cozinha-gourmet-ilha-sala-jantar-desktop.jpg",
  "/assets/engenho-CA006944/engenho-CA006944-banheiro-banheira-ducha-acesso-externo-desktop.jpg",
  "/assets/engenho-CA006944/engenho-CA006944-entrada-porta-pivotante-vista-coqueiros-desktop.jpg",
  "/assets/engenho-CA006944/piscina-varanda-gourmet-desktop.jpg",
];

export default function ImageAccordion() {
  return (
    <section className="w-full bg-white pb-12 pt-24">
      <div className="max-w-[95%] mx-auto mb-8 text-center md:text-left md:ml-[5%]">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-4xl font-serif text-primary-1"
        >
          Fragmentos do Engenho
        </motion.h2>
      </div>
      
      <div className="w-full h-[50vh] md:h-[70vh] flex overflow-hidden">
        {stripImages.map((src, idx) => (
          <div 
            key={idx} 
            className="group relative flex-1 hover:flex-[3] transition-[flex] duration-700 ease-out cursor-pointer overflow-hidden border-r-4 border-white last:border-r-0"
          >
            <img 
              src={src} 
              alt={`Ambiente ${idx + 1}`} 
              className="absolute inset-0 w-full h-full object-cover origin-center transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            {/* Subtle dark overlay that disappears on hover to focus the image */}
            <div className="absolute inset-0 bg-primary-1/20 group-hover:bg-transparent transition-colors duration-700" />
          </div>
        ))}
      </div>
    </section>
  );
}
