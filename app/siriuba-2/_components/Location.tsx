"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Anchor, Sailboat, UtensilsCrossed, Landmark, Compass } from "lucide-react";
import { useT } from "../_i18n/LanguageContext";

const itemImages = [
  ["/assets/siriuba-2/viana"],
  [
    "/assets/siriuba-2/siriuba",
    "/assets/siriuba-2/siriuba-drone",
  ],
  [
    "/assets/siriuba-2/armacao",
    "/assets/siriuba-2/bl3",
  ],
  [
    "/assets/siriuba-2/vila",
    "/assets/siriuba-2/vila-opa",
  ],
];

const itemIcons = [UtensilsCrossed, Anchor, Sailboat, Landmark];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
};

export default function Location() {
  const t = useT();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-bg-main relative overflow-hidden">
      <div className="hidden md:block absolute top-0 right-0 w-[500px] h-[500px] bg-primary-2/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="hidden md:block absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary-1/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 lg:gap-20 items-center">
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
            <div className="space-y-5 md:space-y-6 text-text-sec text-base md:text-lg font-light leading-relaxed mb-8 md:mb-10">
              {t.location.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <p className="font-bold text-primary-1">{t.location.highlight}</p>
              <p>{t.location.paragraphFinal}</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-[2rem] shadow-lg shadow-black/5 border border-white">
              <h3 className="section-subtitle text-primary-1 font-serif text-xl md:text-2xl flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary-2/10 flex items-center justify-center text-primary-2">
                  <MapPin size={16} />
                </span>
                {t.location.aroundTitle}
              </h3>
              <motion.ul
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "0px" }}
                className="space-y-4"
              >
                {t.location.items.map((item, index) => {
                  const Icon = itemIcons[index] ?? Anchor;
                  const images = itemImages[index] ?? [];
                  const isExpanded = expandedIndex === index;
                  const hasAccordion = images.length > 0 || (item.description?.length ?? 0) > 0;

                  return (
                    <motion.li
                      key={index}
                      variants={itemVariants}
                      className={`group flex flex-col border-b border-border-main/30 pb-4 last:border-0 last:pb-0 hover:border-primary-2/30 transition-colors ${hasAccordion ? 'cursor-pointer' : ''}`}
                      onClick={() => hasAccordion && toggleAccordion(index)}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary-1/5 flex items-center justify-center text-primary-2 group-hover:bg-primary-2 group-hover:text-white transition-all duration-300 shadow-sm">
                            <Icon size={18} />
                          </div>
                          <span className="text-text-main font-medium group-hover:text-primary-1 transition-colors">{item.label}</span>
                        </div>
                        <span className="text-primary-2 font-bold bg-primary-1/5 px-4 py-1.5 rounded-full text-sm group-hover:bg-primary-2 group-hover:text-white transition-all duration-300">{item.time}</span>
                      </div>

                      <AnimatePresence>
                        {isExpanded && hasAccordion && (
                          <motion.div
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            className="overflow-hidden rounded-xl w-full"
                          >
                            {images.length > 0 && (
                              <div className="flex flex-col gap-3 mb-4">
                                {images.map((src, i) => {
                                  const caption = item.captions?.[i];
                                  return (
                                    <figure key={i} className="relative overflow-hidden rounded-xl shadow-md aspect-[16/9]">
                                      <picture className="block w-full h-full">
                                        <source srcSet={`${src}.avif`} type="image/avif" />
                                        <source srcSet={`${src}.webp`} type="image/webp" />
                                        <img
                                          src={`${src}.jpg`}
                                          alt={caption ?? item.label}
                                          loading="lazy"
                                          decoding="async"
                                          width={1280}
                                          height={720}
                                          className="image-cover"
                                        />
                                      </picture>
                                      {caption && (
                                        <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white text-xs font-medium px-3 py-2">
                                          {caption}
                                        </figcaption>
                                      )}
                                    </figure>
                                  );
                                })}
                              </div>
                            )}
                            {item.description && item.description.length > 0 && (
                              <div className="space-y-3 text-sm text-text-sec pb-2 px-1">
                                {item.description.map((desc, i) => {
                                  const colon = desc.indexOf(':');
                                  if (colon > -1) {
                                    const tagKey = desc.slice(0, colon).trim() as keyof typeof t.location.descriptionTags;
                                    const translatedTag = t.location.descriptionTags[tagKey];
                                    if (translatedTag) {
                                      return (
                                        <p key={i}>
                                          <span className="font-bold text-primary-1">{translatedTag}:</span>
                                          {desc.slice(colon + 1)}
                                        </p>
                                      );
                                    }
                                  }
                                  return <p key={i}>{desc}</p>;
                                })}
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 1 }}
            className="lg:col-span-7 relative aspect-[4/5] sm:aspect-[4/5] lg:aspect-auto lg:h-[800px] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl bg-bg-alt border-4 border-white"
          >
            <a
              href="https://www.google.com/maps/place/Praia+do+Siri%C3%BAba,+Ilhabela+-+SP/@-23.7403,-45.3347,15z"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.location.openInMaps ?? "Abrir no Google Maps"}
              className="absolute inset-0 group"
            >
              <picture className="block absolute inset-0 w-full h-full">
                <source srcSet="/assets/siriuba-2/map-static.avif" type="image/avif" />
                <source srcSet="/assets/siriuba-2/map-static.webp" type="image/webp" />
                <img
                  src="/assets/siriuba-2/map-static.jpg"
                  alt={t.location.mapAlt ?? "Mapa de Siriúba, Ilhabela"}
                  width={1280}
                  height={1600}
                  loading="lazy"
                  decoding="async"
                  className="image-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </picture>
              <span className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white text-primary-1 px-6 py-3 rounded-full font-bold text-sm shadow-xl group-hover:scale-105 transition-transform z-30">
                {t.location.openInMaps ?? "Abrir no Google Maps"}
              </span>
            </a>

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
                <p className="text-[10px] md:text-xs font-bold text-primary-2 uppercase tracking-wider mb-0.5">{t.location.coordinatesLabel}</p>
                <p className="text-xs md:text-sm font-mono text-primary-1 font-semibold whitespace-nowrap">23°44'25"S 45°20'05"W</p>
              </div>
            </motion.div>

            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="relative">
                <div className="absolute -inset-6 bg-primary-2/20 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
                <div className="absolute -inset-3 bg-primary-2/40 rounded-full animate-pulse"></div>
                <div className="w-14 h-14 bg-primary-2 rounded-full border-4 border-white shadow-2xl flex items-center justify-center text-white relative z-10 transition-transform hover:scale-110">
                  <MapPin size={24} fill="currentColor" />
                </div>
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-bg-main/90 via-transparent to-bg-main/30 pointer-events-none"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
