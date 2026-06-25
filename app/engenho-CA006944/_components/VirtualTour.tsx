"use client";

import { motion } from "motion/react";
import { Play, Eye, Maximize, Map, Navigation, Ruler } from "lucide-react";
import { useState } from "react";
import { useT } from "../_i18n/LanguageContext";
import { pushVirtualTourView, pushEvent } from "@/lib/analytics";

const featureIcons = [Eye, Maximize, Map, Navigation, Ruler];

export default function VirtualTour() {
  const t = useT();
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = (clickId: string) => {
    setIsPlaying(true);
    pushVirtualTourView("engenho-CA006944");
    pushEvent({
      event: "virtual_tour_start",
      tour_name: "Engenho Virtual Tour",
      click_id: clickId,
      value: 1,
    });
  };

  return (
    <section id="tour" className="py-16 md:py-24 bg-primary-1 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title text-3xl sm:text-4xl md:text-5xl font-serif"
          >
            {t.virtualTour.title}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative w-full max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-2xl group border border-white/10 mb-8 md:mb-10"
          >
            {!isPlaying ? (
              <button
                type="button"
                id="btn-virtual-tour-image"
                onClick={() => handlePlay("btn-virtual-tour-image")}
                className="cursor-pointer h-full w-full block"
                aria-label={t.virtualTour.button}
              >
                <picture className="block w-full h-full">
                  <source
                    type="image/avif"
                    srcSet="/assets/engenho-CA006944/engenho-CA006944-sala-estar-cozinha-integrada-vista-mar-mobile.avif 400w, /assets/engenho-CA006944/engenho-CA006944-sala-estar-cozinha-integrada-vista-mar-desktop.avif 720w"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <source
                    type="image/webp"
                    srcSet="/assets/engenho-CA006944/engenho-CA006944-sala-estar-cozinha-integrada-vista-mar-mobile.webp 400w, /assets/engenho-CA006944/engenho-CA006944-sala-estar-cozinha-integrada-vista-mar-desktop.webp 720w"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <img
                    src="/assets/engenho-CA006944/engenho-CA006944-sala-estar-cozinha-integrada-vista-mar-desktop.jpg"
                    srcSet="/assets/engenho-CA006944/engenho-CA006944-sala-estar-cozinha-integrada-vista-mar-mobile.jpg 400w, /assets/engenho-CA006944/engenho-CA006944-sala-estar-cozinha-integrada-vista-mar-desktop.jpg 720w"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    alt={t.virtualTour.previewAlt}
                    width={720}
                    height={405}
                    loading="lazy"
                    decoding="async"
                    className="image-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </picture>
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-colors duration-300 group-hover:bg-black/50">
                  <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center text-white shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                    <Play size={32} className="ml-2" fill="currentColor" />
                  </div>
                </div>
              </button>
            ) : (
              <iframe
                title={t.virtualTour.title}
                src="https://my.matterport.com/show/?m=nNXRHwVvsxc&play=1"
                allowFullScreen
                allow="xr-spatial-tracking"
                loading="lazy"
                className="w-full h-full border-0 absolute inset-0"
              />
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center items-center gap-2 md:gap-6 mb-8 md:mb-10"
          >
            {t.virtualTour.features.map((feature, i) => {
              const Icon = featureIcons[i] ?? Eye;
              return (
                <div key={i} className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-white/90 text-xs sm:text-sm font-medium">
                  <Icon size={18} className="text-secondary" />
                  <span>{feature}</span>
                </div>
              );
            })}
          </motion.div>

          {!isPlaying && (
            <motion.button
              id="btn-virtual-tour-text"
              onClick={() => handlePlay("btn-virtual-tour-text")}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-secondary text-white px-8 md:px-10 py-4 md:py-5 rounded-full font-bold text-base md:text-lg hover:bg-opacity-90 transition-all shadow-xl"
            >
              {t.virtualTour.button}
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );
}
