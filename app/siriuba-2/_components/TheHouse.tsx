"use client";

import InteractiveBentoGallery, { MediaItemType } from "./ui/interactive-bento-gallery";
import { UtensilsCrossed, Waves, Bath, Home, Sun, Wind, FileText, Anchor, Compass, Trees, Sofa } from "lucide-react";
import { motion } from "motion/react";
import { useT } from "../_i18n/LanguageContext";

const detailIcons = [
  Waves,
  Trees,
  Compass,
  Anchor,
  Bath,
  Sofa,
  Home,
  UtensilsCrossed,
  Waves,
  Wind,
  Sofa,
  Home,
  Sun,
  FileText,
];

const mediaConfig: { url: string; span: string }[] = [
  {
    url: "/assets/siriuba-2/vista-mar",
    span: "col-span-2 row-span-2 sm:col-span-1 sm:row-span-2 md:col-span-2 md:row-span-2",
  },
  {
    url: "/assets/siriuba-2/area-externa",
    span: "col-span-2 row-span-2 sm:col-span-2 sm:row-span-2 md:col-span-2 md:row-span-2",
  },
  {
    url: "/assets/siriuba-2/ambientes-integrados",
    span: "col-span-2 row-span-2 sm:col-span-2 sm:row-span-2 md:col-span-2 md:row-span-2",
  },
  {
    url: "/assets/siriuba-2/luz-natural",
    span: "col-span-2 row-span-2 sm:col-span-1 sm:row-span-2 md:col-span-2 md:row-span-2",
  },
  {
    url: "/assets/siriuba-2/piscina-deck",
    span: "col-span-2 row-span-2 sm:col-span-1 sm:row-span-2 md:col-span-2 md:row-span-2",
  },
  {
    url: "/assets/siriuba-2/pavimento-2",
    span: "col-span-2 row-span-2 sm:col-span-1 sm:row-span-2 md:col-span-2 md:row-span-2",
  },
  {
    url: "/assets/siriuba-2/estrutura",
    span: "col-span-2 row-span-2 sm:col-span-1 sm:row-span-2 md:col-span-2 md:row-span-2",
  },
];

export default function TheHouse() {
  const t = useT();

  const mediaItems: MediaItemType[] = mediaConfig.map((cfg, i) => ({
    id: i + 1,
    type: "image",
    title: t.theHouse.media[i].title,
    desc: t.theHouse.media[i].desc,
    url: cfg.url,
    span: cfg.span,
  }));

  return (
    <section id="a-casa" className="py-16 md:py-24 bg-bg-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <InteractiveBentoGallery
          mediaItems={mediaItems}
          title={t.theHouse.galleryTitle}
          description={t.theHouse.galleryDescription}
        />

        <div className="mt-20 md:mt-32 max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-primary-2 uppercase tracking-widest text-xs font-bold mb-4 block">{t.theHouse.differentialsEyebrow}</span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-primary-1">{t.theHouse.differentialsTitle}</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.theHouse.details.map((text, index) => {
              const Icon = detailIcons[index] ?? Home;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px" }}
                  transition={{ delay: index * 0.05, duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="relative bg-white/40 backdrop-blur-md p-5 rounded-2xl border border-white/60 hover:bg-white hover:shadow-md transition-all duration-300 flex items-center gap-4 group"
                >
                  <div className="flex-shrink-0 w-11 h-11 rounded-full bg-white shadow-sm flex items-center justify-center text-primary-2 group-hover:bg-primary-2 group-hover:text-white transition-all duration-300">
                    <Icon size={20} strokeWidth={1.5} />
                  </div>
                  <p className="text-text-sec text-sm md:text-base leading-snug">
                    {text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
