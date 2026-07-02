"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MapPin, Hash, Ruler, BedDouble, Bath, Eye, Anchor,
  Snowflake, Sun, Sofa, Utensils, Waves, ChefHat, Layers, FileText, BatteryCharging, Flame
} from "lucide-react";

export default function FichaResumida() {
  const [activeTab, setActiveTab] = useState<"ficha" | "recursos">("ficha");

  const fichaItems = [
    { icon: <MapPin size={16} />, text: "Engenho D'Água · Ilhabela · SP" },
    { icon: <Hash size={16} />, text: "Código CA006944" },
    { icon: <Ruler size={16} />, text: "942,80 m² de terreno" },
    { icon: <Ruler size={16} />, text: "343,26 m² casa + 45 m² piscina" },
    { icon: <BedDouble size={16} />, text: "4 dormitórios" },
    { icon: <Bath size={16} />, text: "4 suítes" },
    { icon: <Eye size={16} />, text: "Vista para o canal de São Sebastião" },
    { icon: <Anchor size={16} />, text: "Píer náutico na praia da frente" },
  ];

  const recursosItems = [
    { icon: <Sun size={16} />, text: "Aquecimento" },
    { icon: <Snowflake size={16} />, text: "Ar condicionado" },
    { icon: <Bath size={16} />, text: "Banheira" },
    { icon: <BatteryCharging size={16} />, text: "Carregador eletrônico para carro e bicicleta" },
    { icon: <Flame size={16} />, text: "Churrasqueira" },
    { icon: <ChefHat size={16} />, text: "Cozinha" },
    { icon: <Layers size={16} />, text: "Mais de um andar" },
    { icon: <FileText size={16} />, text: "Matrícula" },
    { icon: <Sofa size={16} />, text: "Mobiliado" },
    { icon: <Waves size={16} />, text: "Piscina" },
    { icon: <Eye size={16} />, text: "Vista para o mar" },
  ];

  const activeItems = activeTab === "ficha" ? fichaItems : recursosItems;

  return (
    <section className="py-16 bg-white text-primary-1 border-b border-gray-100 min-h-[300px]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Tabs */}
        <div className="flex gap-8 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("ficha")}
            className={`pb-4 text-sm font-medium tracking-wide uppercase transition-colors relative ${
              activeTab === "ficha" ? "text-primary-1" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Ficha Técnica
            {activeTab === "ficha" && (
              <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary-1" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("recursos")}
            className={`pb-4 text-sm font-medium tracking-wide uppercase transition-colors relative ${
              activeTab === "recursos" ? "text-primary-1" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Recursos do Imóvel
            {activeTab === "recursos" && (
              <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary-1" />
            )}
          </button>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex flex-wrap gap-4 text-xs md:text-sm font-medium tracking-wide uppercase"
          >
            {activeItems.map((item, i) => (
              <span key={i} className="flex items-center gap-2 bg-gray-50 px-5 py-3 rounded-full border border-gray-100 shadow-sm text-gray-600 hover:shadow-md hover:bg-white transition-all cursor-default">
                <span className="text-primary-1/60">{item.icon}</span>
                {item.text}
              </span>
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}