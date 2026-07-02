"use client";
import { motion } from "motion/react";
import { useLanguage } from "../_i18n/LanguageContext";

export default function VirtualTour() {
  const { lang } = useLanguage();

  return (
    <section id="tour" className="py-32 bg-white text-primary-1 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-serif mb-16 text-primary-1 tracking-tight text-center"
        >
          {lang === "pt" ? "Veja além das imagens, ande por cada ambiente" : "See beyond the images, walk through every room"}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full aspect-video rounded-3xl overflow-hidden shadow-xl relative bg-gray-200"
        >
          <iframe
            title="Tour 3D"
            src="https://my.matterport.com/show/?m=tL9pSrTiUNR&play=1"
            allowFullScreen
            allow="xr-spatial-tracking"
            loading="lazy"
            className="w-full h-full border-0 absolute inset-0"
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 flex justify-center"
        >
          <a 
            href="https://my.matterport.com/show/?m=tL9pSrTiUNR" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-8 py-4 bg-primary-1 text-white rounded-full font-medium tracking-wide hover:bg-primary-1/90 transition-colors shadow-lg hover:shadow-xl"
          >
            {lang === "pt" ? "Ver tour virtual" : "View virtual tour"}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
