"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useT } from "../_i18n/LanguageContext";

const experienceImages = [
  "/assets/engenho-CA006944/engenho-CA006944-cozinha-ilha-living-vista-mar",
  "/assets/engenho-CA006944/piscina-varanda-gourmet",
  "/assets/engenho-CA006944/noite-casa-do-engenho",
];

export default function Experience() {
  const t = useT();
  const experiences = t.experience.items.map((item, i) => ({
    ...item,
    img: experienceImages[i],
  }));
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Cores da iluminação ambiente: Manhã (Dourado), Tarde (Azul claro), Noite (Azul escuro/Índigo)
  const lightColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["#FBBF24", "#38BDF8", "#312E81"]
  );

  const lightOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.12, 0.08, 0.20]
  );

  const lightY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["0%", "40%", "80%"]
  );

  return (
    <section id="experiencia" ref={containerRef} className="py-16 md:py-24 lg:py-32 bg-bg-main relative overflow-hidden">
      {/* Efeito de Iluminação Ambiente */}
      <motion.div 
        className="absolute left-0 right-0 mx-auto w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full pointer-events-none z-0 blur-[80px] md:blur-[150px] will-change-transform"
        style={{
          backgroundColor: lightColor,
          opacity: lightOpacity,
          top: lightY,
          transform: "translateY(-10%)"
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-20">
          <span className="text-primary-2 uppercase tracking-widest text-xs font-bold mb-4 block">{t.experience.eyebrow}</span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px" }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-primary-1"
          >
            {t.experience.title}
          </motion.h2>
        </div>

        <div className="space-y-16 md:space-y-24 lg:space-y-32">
          {experiences.map((exp, index) => (
            <div key={index} className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 md:gap-12 lg:gap-20 items-center`}>
              <motion.div 
                initial={{ opacity: 0, x: index % 2 === 1 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "0px" }}
                transition={{ duration: 0.8 }}
                className="w-full lg:w-1/2"
              >
                <div className="relative aspect-[16/10] sm:aspect-[16/10] lg:aspect-auto lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                  <picture className="block absolute inset-0 w-full h-full">
                    <source
                      type="image/avif"
                      srcSet={`${exp.img}-mobile.avif 640w, ${exp.img}-desktop.avif 1280w`}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <source
                      type="image/webp"
                      srcSet={`${exp.img}-mobile.webp 640w, ${exp.img}-desktop.webp 1280w`}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <img
                      src={`${exp.img}-desktop.jpg`}
                      srcSet={`${exp.img}-mobile.jpg 640w, ${exp.img}-desktop.jpg 1280w`}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      alt={exp.title}
                      width={1280}
                      height={960}
                      loading="lazy"
                      decoding="async"
                      className="image-cover"
                    />
                  </picture>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full lg:w-1/2 lg:px-8"
              >
                <span className="text-primary-2 font-medium tracking-widest uppercase text-xs sm:text-sm mb-3 md:mb-4 block">{exp.time}</span>
                <h3 className="section-subtitle text-2xl sm:text-3xl md:text-4xl font-serif text-primary-1 leading-tight">{exp.title}</h3>
                <p className="text-text-sec text-base md:text-lg font-light leading-relaxed">{exp.desc}</p>
              </motion.div>
            </div>
          ))}
        </div>

        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mt-32 text-center max-w-2xl mx-auto"
        >
          <p className="text-2xl md:text-3xl font-serif text-primary-1 italic leading-relaxed">
            "{t.experience.quote}"
          </p>
        </motion.div>
      </div>
    </section>
  );
}
