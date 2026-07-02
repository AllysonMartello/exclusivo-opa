"use client";
import { useRef } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "engenho-CA006944-fachada-frontal-entrada-vista-mar.webp",
  "engenho-CA006944-sala-estar-cozinha-integrada-vista-mar.webp",
  "engenho-CA006944-sala-jantar-living-vista-panoramica-mar.webp",
  "piscina-varanda-gourmet.jpg",
  "engenho-CA006944-living-tv-varanda-aberta-vista-jardim.webp",
  "engenho-CA006944-varanda-piscina-vista-panoramica-mar.webp",
  "engenho-CA006944-suite-cama-vista-mar-jardim.webp",
  "engenho-CA006944-suite-cama-tv-armario-vista-mar.webp",
  "engenho-CA006944-banheiro-banheira-nicho-iluminado.webp"
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
                src={`/assets/engenho-CA006944/${img}`}
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
