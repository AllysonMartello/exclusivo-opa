"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useT } from "../_i18n/LanguageContext";

const BASE = "/assets/sao-jose-dos-campos/carrossel";
const TOTAL = 15;

const slides = Array.from({ length: TOTAL }, (_, i) => {
  const num = String(i + 1).padStart(2, "0");
  return { src: `${num}.jpg`, alt: `Apartamento Rua da Alegria, foto ${i + 1}` };
});

export default function Gallery() {
  const t = useT();
  const loop = [...slides, ...slides];

  return (
    <section
      id="galeria"
      aria-label={t.gallery.title}
      className="py-16 md:py-24 bg-bg-main overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 md:mb-14 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-primary-2 uppercase tracking-widest text-xs font-bold mb-4 block"
        >
          {t.gallery.eyebrow}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-serif text-primary-1 leading-tight"
        >
          {t.gallery.title}
        </motion.h2>
      </div>

      <div className="marquee relative w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-24 z-10 bg-gradient-to-r from-bg-main to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-24 z-10 bg-gradient-to-l from-bg-main to-transparent" />

        <ul className="marquee-track flex gap-4 md:gap-6 w-max">
          {loop.map((slide, i) => (
            <li
              key={`${slide.src}-${i}`}
              className="relative shrink-0 w-[260px] sm:w-[320px] md:w-[400px] lg:w-[460px] aspect-[4/3] rounded-2xl md:rounded-[2rem] overflow-hidden shadow-sm bg-bg-alt"
              aria-hidden={i >= slides.length ? "true" : undefined}
            >
              <Image
                src={`${BASE}/${slide.src}`}
                alt={i >= slides.length ? "" : slide.alt}
                fill
                sizes="(max-width: 640px) 260px, (max-width: 768px) 320px, (max-width: 1024px) 400px, 460px"
                loading="lazy"
                draggable={false}
                className="image-cover"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
