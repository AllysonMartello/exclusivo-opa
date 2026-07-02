"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../_i18n/LanguageContext";

const houseImages = [
  "/assets/engenho-CA006944/piscina-varanda-gourmet.jpg",
  "/assets/engenho-CA006944/engenho-CA006944-sala-jantar-living-vista-panoramica-mar.webp",
  "/assets/engenho-CA006944/engenho-CA006944-cozinha-gourmet-ilha-sala-jantar.webp",
  "/assets/engenho-CA006944/engenho-CA006944-varanda-vista-panoramica-mar-piscina.webp"
];

export default function TheHouse() {
  const { lang } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % houseImages.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="a-casa" className="bg-white text-primary-1">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        <div className="flex items-center justify-center py-24 px-8 lg:px-16 xl:px-24">
          <div className="max-w-xl w-full">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-serif mb-8 text-primary-1 tracking-tight"
            >
              {lang === "pt" ? "Sobre a Casa" : "About the House"}
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-8 text-lg md:text-xl text-text-sec leading-[1.8] font-light"
            >
              <p>
                {lang === "pt" 
                  ? "A casa fecha o conjunto. Foi desenhada, construída, mobiliada e equipada para uma família entrar e começar a vida no mesmo dia. Não há obra para acompanhar. Não há projeto para aprovar. Não há marceneiro para esperar."
                  : "The house completes the picture. It was designed, built, furnished, and equipped for a family to move in and start life on the very same day. No construction to monitor. No project to approve. No carpenter to wait for."
                }
              </p>
              <p>
                {lang === "pt"
                  ? "A arquitetura conversa com Ilhabela. Pedra, madeira, vidro, e a entrada de luz que vem do canal. Os espaços principais foram dimensionados para receber: cozinha aberta, sala em pé-direito alto, varanda contínua voltada para a água. Os dormitórios foram dimensionados para acolher."
                  : "The architecture speaks to Ilhabela. Stone, wood, glass, and the daylight coming from the channel. The main spaces were scaled to host: open kitchen, high-ceiling living room, continuous balcony facing the water. The bedrooms were scaled to nurture."
                }
              </p>
              <p className="text-primary-1 font-medium">
                {lang === "pt"
                  ? "É uma casa de família, não um projeto de revista. Mas tem o cuidado de revista nos detalhes que importam."
                  : "It is a family home, not a magazine project. But it has magazine-level care in the details that matter."
                }
              </p>
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