"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const experiences = [
  {
    time: "Manhã",
    title: "O Despertar Suave",
    desc: "A luz natural invade os ambientes através das grandes esquadrias. A suíte principal no térreo, com seu banheiro integrado ao jardim de inverno privativo, oferece um despertar único e revigorante.",
    img: "https://smabio.com.br/wp-content/uploads/2026/04/suite-master-acesso-piscina-casa-itaguassu-ilhabela-opa-imoveis.webp"
  },
  {
    time: "Tarde",
    title: "Fluidez e Protagonismo",
    desc: "A piscina de borda infinita com pedras Hijau assume o protagonismo. Sala e cozinha se conectam com fluidez ao espaço externo, criando uma atmosfera contínua e sofisticada para o cotidiano.",
    img: "https://smabio.com.br/wp-content/uploads/2026/04/casa-alto-padrao-morro-da-cruz-ilhabela-vista-mar-opa-imoveis.webp"
  },
  {
    time: "Noite",
    title: "Aconchego e Celebração",
    desc: "O projeto luminotécnico assinado transforma a atmosfera. O espaço gourmet com churrasqueira e forno a lenha torna-se o cenário perfeito para receber quem importa com elegância.",
    img: "https://smabio.com.br/wp-content/uploads/2026/04/cozinha-area-gourmet-iluminada-casa-alto-padrao-ilhabela-opa-imoveis.webp"
  }
];

export default function Experience() {
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
    <section id="experiencia" ref={containerRef} className="py-24 md:py-32 bg-bg-main relative overflow-hidden">
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
        <div className="text-center mb-20">
          <span className="text-primary-2 uppercase tracking-widest text-xs font-bold mb-4 block">A Vivência</span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px" }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-primary-1"
          >
            Um Dia na Casa
          </motion.h2>
        </div>

        <div className="space-y-24 md:space-y-32">
          {experiences.map((exp, index) => (
            <div key={index} className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-20 items-center`}>
              <motion.div 
                initial={{ opacity: 0, x: index % 2 === 1 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "0px" }}
                transition={{ duration: 0.8 }}
                className="w-full lg:w-1/2"
              >
                <div className="relative h-[400px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                  <img src={exp.img} alt={exp.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full lg:w-1/2 lg:px-8"
              >
                <span className="text-primary-2 font-medium tracking-widest uppercase text-sm mb-4 block">{exp.time}</span>
                <h3 className="text-3xl md:text-4xl font-serif text-primary-1 mb-6 leading-tight">{exp.title}</h3>
                <p className="text-text-sec text-lg font-light leading-relaxed">{exp.desc}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
