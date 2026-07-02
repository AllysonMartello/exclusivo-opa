"use client";
import { useRef } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "engenho-CA006944-entrada-porta-pivotante-vista-coqueiros-desktop",
  "engenho-CA006944-fachada-frontal-entrada-vista-mar-desktop",
  "engenho-CA006944-cozinha-gourmet-ilha-geladeira-living-mobile",
  "engenho-CA006944-cozinha-gourmet-ilha-sala-jantar-desktop",
  "engenho-CA006944-cozinha-ilha-living-vista-mar-desktop",
  "engenho-CA006944-sala-jantar-living-vista-panoramica-mar-mobile",
  "engenho-CA006944-varanda-vista-panoramica-mar-piscina-desktop",
  "piscina-varanda-gourmet-desktop",
  "engenho-CA006944-varanda-piscina-vista-panoramica-mar-desktop",
  "engenho-CA006944-banheiro-ducha-box-cuba-espelho-desktop",
  "engenho-CA006944-banheiro-banheira-ducha-acesso-externo-desktop",
  "engenho-CA006944-living-tv-varanda-aberta-vista-jardim-mobile"
];

export default function Galeria() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth, scrollLeft } = scrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth : clientWidth;
      scrollRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="bg-white">
      <div className="relative group w-full h-[80vh] md:h-[90vh]">
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar w-full h-full"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {images.map((img, index) => (
            <div 
              key={index} 
              className="snap-center shrink-0 w-full h-full relative"
            >
              <img
                src={`/assets/engenho-CA006944/${img}.jpg`}
                alt={`Galeria ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
        
        {/* Floating Arrows */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-16 h-16 bg-white text-[#253A47] rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:scale-105 transition-transform z-10"
          aria-label="Anterior"
        >
          <ChevronLeft size={32} strokeWidth={2} />
        </button>
        <button 
          onClick={() => scroll('right')}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-16 h-16 bg-white text-[#253A47] rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:scale-105 transition-transform z-10"
          aria-label="Próxima"
        >
          <ChevronRight size={32} strokeWidth={2} />
        </button>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  );
}
