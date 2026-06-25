"use client";

import { motion } from "motion/react";
import { MapPin, Compass } from "lucide-react";
import { useT } from "../_i18n/LanguageContext";

const LOCATION_IMAGE =
  "/assets/engenho-CA006944/engenho-CA006944-varanda-vista-panoramica-mar-piscina";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function Location() {
  const t = useT();

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-bg-main relative overflow-hidden">
      <div className="hidden md:block absolute top-0 right-0 w-[500px] h-[500px] bg-primary-2/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="hidden md:block absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary-1/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 lg:gap-20 items-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <Compass size={16} className="text-primary-2" />
              <span className="text-primary-2 uppercase tracking-widest text-xs font-bold">{t.location.eyebrow}</span>
            </div>
            <h2 className="section-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-primary-1 leading-tight">
              {t.location.title}
            </h2>
            <div className="space-y-5 md:space-y-6 text-text-sec text-base md:text-lg font-light leading-relaxed">
              {t.location.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              {t.location.highlight && (
                <p className="font-bold text-primary-1">{t.location.highlight}</p>
              )}
              {t.location.paragraphFinal && <p>{t.location.paragraphFinal}</p>}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 1 }}
            className="lg:col-span-7 relative aspect-[4/5] sm:aspect-[4/5] lg:aspect-auto lg:h-[700px] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl bg-bg-alt border-4 border-white"
          >
            <picture className="block absolute inset-0 w-full h-full">
              <source
                type="image/avif"
                srcSet={`${LOCATION_IMAGE}-mobile.avif 640w, ${LOCATION_IMAGE}-desktop.avif 1280w`}
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <source
                type="image/webp"
                srcSet={`${LOCATION_IMAGE}-mobile.webp 640w, ${LOCATION_IMAGE}-desktop.webp 1280w`}
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <img
                src={`${LOCATION_IMAGE}-desktop.jpg`}
                srcSet={`${LOCATION_IMAGE}-mobile.jpg 640w, ${LOCATION_IMAGE}-desktop.jpg 1280w`}
                sizes="(max-width: 1024px) 100vw, 60vw"
                alt={t.location.mapAlt ?? "Vista panorâmica de Engenho D’Água, Ilhabela"}
                width={1280}
                height={1600}
                loading="lazy"
                decoding="async"
                className="image-cover"
              />
            </picture>

            {/* Floating Glass Card */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute top-4 left-4 md:top-8 md:left-8 bg-white/90 backdrop-blur-md p-3 md:p-4 rounded-2xl shadow-xl border border-white/50 flex items-center gap-3 md:gap-4 z-20 max-w-[calc(100%-2rem)]"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-1 rounded-full flex items-center justify-center text-white shadow-inner flex-shrink-0">
                <Compass size={20} className="md:hidden" />
                <Compass size={24} className="hidden md:block" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] md:text-xs font-bold text-primary-2 uppercase tracking-wider mb-0.5">{t.location.aroundTitle}</p>
                <p className="text-xs md:text-sm text-primary-1 font-semibold whitespace-nowrap">Engenho D’Água, Ilhabela/SP</p>
              </div>
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-t from-bg-main/40 via-transparent to-transparent pointer-events-none"></div>
          </motion.div>
        </div>

        {/* Por perto Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm p-6 md:p-8 lg:p-10 rounded-[2rem] shadow-lg shadow-black/5 border border-white"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <h3 className="section-subtitle text-primary-1 font-serif text-xl md:text-2xl flex items-center gap-3 m-0">
              <span className="w-10 h-10 rounded-full bg-primary-2/10 flex items-center justify-center text-primary-2">
                <MapPin size={20} />
              </span>
              {t.location.aroundTitle}
            </h3>
          </div>
          
          <motion.ul
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {t.location.items.map((item, index) => (
              <motion.li
                key={index}
                variants={itemVariants}
                className="group flex items-center gap-4 p-4 rounded-xl hover:bg-bg-alt border border-transparent hover:border-border-main/30 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-primary-1/5 flex items-center justify-center text-primary-2 group-hover:bg-primary-2 group-hover:text-white transition-all duration-300 shadow-sm flex-shrink-0">
                  <MapPin size={18} />
                </div>
                <span className="text-text-main font-medium group-hover:text-primary-1 transition-colors leading-tight">{item.label}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
