"use client";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Anchor, Utensils, ShoppingBag, ChevronDown } from "lucide-react";
import { useLanguage } from "../_i18n/LanguageContext";

export default function Location() {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<number | null>(0);

  const toggleTab = (index: number) => {
    setActiveTab(activeTab === index ? null : index);
  };

  const tabs = lang === "pt" ? [
    {
      title: "Píer Náutico",
      icon: <Anchor size={20} />,
      content: "Em frente à casa, na praia, fica o píer náutico de embarque e desembarque. Daqui sai-se de barco sem precisar pegar carro até marina e sem agenda. A travessia para São Sebastião e a saída para o canal começam a poucos passos do portão."
    },
    {
      title: "Gastronomia",
      icon: <Utensils size={20} />,
      content: "Os principais restaurantes da costa sul ficam a caminhar. Portinho. Restaurante Braz. Restaurante Capitano. Praia. Manapani. Porto Engenho. Pitanga. Sete endereços de cozinha entre o café da manhã e o jantar, todos sem precisar pegar o carro."
    },
    {
      title: "Conveniência",
      icon: <ShoppingBag size={20} />,
      content: "O Minimax, mercado de referência da região, fica a poucos minutos a pé. A vila, com farmácia, padaria e o comércio local, está ao lado."
    }
  ] : [
    {
      title: "Nautical Pier",
      icon: <Anchor size={20} />,
      content: "In front of the house, on the beach, is the nautical boarding and landing pier. From here you can head out by boat without needing to take a car to a marina and without any schedule. The crossing to São Sebastião and the entrance to the channel start just a few steps from the gate."
    },
    {
      title: "Gastronomy",
      icon: <Utensils size={20} />,
      content: "The main restaurants on the south coast are within walking distance. Portinho. Restaurante Braz. Restaurante Capitano. Praia. Manapani. Porto Engenho. Pitanga. Seven culinary options between breakfast and dinner, all without needing a car."
    },
    {
      title: "Convenience",
      icon: <ShoppingBag size={20} />,
      content: "Minimax, the region's reference market, is just a few minutes' walk away. The village, with a pharmacy, bakery, and local shops, is right next door."
    }
  ];

  return (
    <section className="bg-[#F8F9FA] text-primary-1">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh] lg:min-h-screen">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full h-[50vh] lg:h-auto order-2 lg:order-1 relative"
        >
          <iframe 
            src="https://maps.google.com/maps?q=Engenho+D'%C3%81gua,+Ilhabela&t=&z=15&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0, position: 'absolute', top: 0, left: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa Engenho D'Água"
          ></iframe>
        </motion.div>

        <div className="flex items-center justify-center py-24 px-8 lg:px-16 xl:px-24 order-1 lg:order-2 overflow-y-auto">
          <div className="max-w-xl w-full">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-serif mb-8 text-primary-1 tracking-tight"
            >
              {lang === "pt" ? "O Endereço" : "The Location"}
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg md:text-xl text-text-sec leading-[1.8] font-light mb-12"
            >
              {lang === "pt" 
                ? "Engenho D'Água é um dos bairros mais antigos da costa sul de Ilhabela. Vizinhança estável, com famílias que mantêm casa na região há gerações. A praia tem mar protegido pelo canal e entrada rasa, com perfil indicado para crianças e para embarcações pequenas."
                : "Engenho D'Água is one of the oldest neighborhoods on the south coast of Ilhabela. Stable neighborhood, with families who have kept houses in the region for generations. The beach has a sea protected by the channel and a shallow entrance, with a profile suitable for children and small boats."
              }
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4 mb-12"
            >
              {tabs.map((tab, index) => (
                <div key={index} className="rounded-2xl overflow-hidden bg-white shadow-[0_2px_10px_rgb(0,0,0,0.04)] hover:shadow-[0_4px_20px_rgb(0,0,0,0.08)] transition-shadow">
                  <button
                    onClick={() => toggleTab(index)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <div className="flex items-center gap-4 text-primary-1 font-medium text-lg">
                      <div className="w-10 h-10 rounded-full bg-primary-1/5 flex items-center justify-center text-primary-1">
                        {tab.icon}
                      </div>
                      {tab.title}
                    </div>
                    <ChevronDown 
                      size={20} 
                      className={`text-gray-400 transition-transform duration-300 ${activeTab === index ? 'rotate-180' : ''}`} 
                    />
                  </button>
                  <AnimatePresence>
                    {activeTab === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 pt-0 text-text-sec leading-relaxed font-light">
                          {tab.content}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-medium text-primary-1 text-2xl pt-4 border-t border-gray-200"
            >
              {lang === "pt" 
                ? "É um dos poucos endereços da ilha onde a vida acontece sem deslocamento. O carro fica para quando dá vontade de sair."
                : "It is one of the few addresses on the island where life happens without driving. The car is only for when you feel like going away."
              }
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}