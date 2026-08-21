"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../_i18n/LanguageContext";
import { 
  MapPin, Hash, Ruler, BedDouble, Bath, Eye, Anchor,
  Snowflake, Sun, Sofa, Utensils, Waves, ChefHat, Layers, FileText, BatteryCharging, Flame
} from "lucide-react";

export default function FichaResumida() {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<"ficha" | "recursos">("ficha");

  const fichaItems = [
    { icon: <MapPin size={16} />, text: "Engenho D'Água · Ilhabela · SP" },
    { icon: <Hash size={16} />, text: lang === "pt" ? "Código CA006944" : "Code CA006944" },
    { icon: <Ruler size={16} />, text: lang === "pt" ? "1.131,00 m² de terreno" : "1,131.00 m² of land" },
    { icon: <Ruler size={16} />, text: lang === "pt" ? "407 m² de área construída" : "407 m² of built area" },
    { icon: <BedDouble size={16} />, text: lang === "pt" ? "4 dormitórios" : "4 bedrooms" },
    { icon: <Bath size={16} />, text: lang === "pt" ? "4 suítes" : "4 suites" },
    { icon: <Eye size={16} />, text: lang === "pt" ? "Vista para o canal de São Sebastião" : "View of the São Sebastião channel" },
    { icon: <Anchor size={16} />, text: lang === "pt" ? "Píer náutico na praia da frente" : "Nautical pier on the front beach" },
  ];

  const recursosItems = [
    { icon: <Sun size={16} />, text: lang === "pt" ? "Aquecimento" : "Heating" },
    { icon: <Snowflake size={16} />, text: lang === "pt" ? "Ar condicionado" : "Air conditioning" },
    { icon: <Bath size={16} />, text: lang === "pt" ? "Banheira" : "Bathtub" },
    { icon: <BatteryCharging size={16} />, text: lang === "pt" ? "Carregador eletrônico para carro e bicicleta" : "Electric car & bike charger" },
    { icon: <Flame size={16} />, text: lang === "pt" ? "Churrasqueira" : "BBQ grill" },
    { icon: <ChefHat size={16} />, text: lang === "pt" ? "Cozinha" : "Kitchen" },
    { icon: <Layers size={16} />, text: lang === "pt" ? "Mais de um andar" : "Multiple stories" },
    { icon: <FileText size={16} />, text: lang === "pt" ? "Matrícula" : "Deed / Property Registry" },
    { icon: <Sofa size={16} />, text: lang === "pt" ? "Mobiliado" : "Furnished" },
    { icon: <Waves size={16} />, text: lang === "pt" ? "Piscina" : "Pool" },
    { icon: <Eye size={16} />, text: lang === "pt" ? "Vista para o mar" : "Sea view" },
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
            {lang === "pt" ? "Ficha Técnica" : "Technical Specs"}
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
            {lang === "pt" ? "Recursos do Imóvel" : "Property Features"}
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