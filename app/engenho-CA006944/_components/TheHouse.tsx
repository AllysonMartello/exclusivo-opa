"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const houseImages = [
  "/assets/engenho-CA006944/piscina-varanda-gourmet-desktop.jpg",
  "/assets/engenho-CA006944/engenho-CA006944-sala-jantar-living-vista-panoramica-mar-desktop.jpg",
  "/assets/engenho-CA006944/engenho-CA006944-cozinha-gourmet-ilha-sala-jantar-desktop.jpg",
  "/assets/engenho-CA006944/engenho-CA006944-banheiro-banheira-ducha-acesso-externo-desktop.jpg",
  "/assets/engenho-CA006944/engenho-CA006944-entrada-porta-pivotante-vista-coqueiros-desktop.jpg"
];

export default function TheHouse() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % houseImages.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-white text-primary-1">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        <div className="flex items-center justify-center py-24 px-8 lg:px-16 xl:px-24">
          <div className="max-w-xl w-full">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-serif mb-12 text-primary-1 tracking-tight"
            >
              Sobre a Casa
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-8 text-lg md:text-xl text-text-sec leading-[1.8] font-light"
            >
              <p>A casa fecha o conjunto. Foi desenhada, construída, mobiliada e equipada para uma família entrar e começar a vida no mesmo dia. Não há obra para acompanhar. Não há projeto para aprovar. Não há marceneiro para esperar.</p>
              <p>A arquitetura conversa com Ilhabela. Pedra, madeira, vidro, e a entrada de luz que vem do canal. Os espaços principais foram dimensionados para receber: cozinha aberta, sala em pé-direito alto, varanda contínua voltada para a água. Os dormitórios foram dimensionados para acolher.</p>
              <p className="text-primary-1 font-medium">É uma casa de família, não um projeto de revista. Mas tem o cuidado de revista nos detalhes que importam.</p>
            </motion.div>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-[50vh] lg:h-auto overflow-hidden bg-gray-100"
        >
          <AnimatePresence mode="popLayout">
            <motion.img
              key={currentImageIndex}
              src={houseImages[currentImageIndex]}
              alt="Imagens da Casa"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}