"use client";
import { motion } from "motion/react";
import { useLanguage } from "../_i18n/LanguageContext";

export default function ALeitura() {
  const { lang } = useLanguage();

  return (
    <section id="experiencia" className="py-32 bg-[#F8F9FA] text-primary-1">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-serif mb-24 text-primary-1 tracking-tight text-center"
        >
          {lang === "pt" ? "Pronta para Viver" : "Ready to Live"}
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-8 shadow-sm relative">
              <picture className="block absolute inset-0 w-full h-full">
                <source type="image/webp" srcSet="/assets/engenho-CA006944/engenho-CA006944-sala-jantar-living-vista-panoramica-mar-desktop.webp" />
                <img src="/assets/engenho-CA006944/engenho-CA006944-sala-jantar-living-vista-panoramica-mar-desktop.jpg" alt="A vista" className="w-full h-full object-cover" loading="lazy" />
              </picture>
            </div>
            <h3 className="text-3xl font-serif mb-4 text-primary-1">
              {lang === "pt" ? "O Privilégio do Olhar" : "The Privilege of the View"}
            </h3>
            <p className="text-xl text-text-sec font-light leading-relaxed">
              {lang === "pt" 
                ? "A casa olha para o canal de São Sebastião. Vê o sol cruzar o canal pela manhã e os barcos passarem o dia inteiro. Em dias claros, a Serra do Mar aparece na linha do horizonte."
                : "The house faces the São Sebastião channel. It sees the sun cross the channel in the morning and boats pass by all day long. On clear days, the Serra do Mar appears on the horizon."
              }
            </p>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="flex flex-col">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-8 shadow-sm relative">
              <picture className="block absolute inset-0 w-full h-full">
                <source type="image/webp" srcSet="/assets/engenho-CA006944/engenho-CA006944-sala-jantar-cozinha-living-tv-vista-jardim-desktop.webp" />
                <img src="/assets/engenho-CA006944/engenho-CA006944-sala-jantar-cozinha-living-tv-vista-jardim-desktop.jpg" alt="O estado" className="w-full h-full object-cover" loading="lazy" />
              </picture>
            </div>
            <h3 className="text-3xl font-serif mb-4 text-primary-1">
              {lang === "pt" ? "O estado" : "The Condition"}
            </h3>
            <p className="text-xl text-text-sec font-light leading-relaxed">
              {lang === "pt"
                ? "Cozinha completa. Ar-condicionado nos ambientes principais. Aquecimento solar. Mobiliário desenhado para os espaços. A próxima família entra com roupa e livros. O resto já está lá."
                : "Full kitchen. Air conditioning in the main areas. Solar heating. Specially designed furniture. The next family only needs to bring clothes and books. Everything else is ready."
              }
            </p>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-col">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-8 shadow-sm relative">
              <picture className="block absolute inset-0 w-full h-full">
                <source type="image/webp" srcSet="/assets/engenho-CA006944/engenho-CA006944-suite-cama-tv-vista-mar-01-desktop.webp" />
                <img src="/assets/engenho-CA006944/engenho-CA006944-suite-cama-tv-vista-mar-01-desktop.jpg" alt="A planta" className="w-full h-full object-cover" loading="lazy" />
              </picture>
            </div>
            <h3 className="text-3xl font-serif mb-4 text-primary-1">
              {lang === "pt" ? "A planta" : "The Floor Plan"}
            </h3>
            <p className="text-xl text-text-sec font-light leading-relaxed">
              {lang === "pt"
                ? "Os ambientes principais voltados para o mar. Os dormitórios distribuídos em dois pavimentos. Suíte master com varanda privativa. A área de serviço integrada à cozinha, com circulação independente."
                : "Main living spaces face the sea. Bedrooms are distributed over two floors. Master suite with private balcony. Service area integrated with the kitchen, featuring independent circulation."
              }
            </p>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="flex flex-col">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-8 shadow-sm relative bg-gray-100">
              <img src="/assets/engenho-CA006944/engenho-CA006944-entrada-porta-pivotante-vista-coqueiros.webp" alt="A documentação" className="w-full h-full object-cover absolute inset-0" loading="lazy" />
            </div>
            <h3 className="text-3xl font-serif mb-4 text-primary-1">
              {lang === "pt" ? "A documentação" : "The Documentation"}
            </h3>
            <p className="text-xl text-text-sec font-light leading-relaxed">
              {lang === "pt"
                ? "Escritura registrada. Habite-se em ordem. IPTU em dia. Sem cessão, sem inventário aberto, sem pendência de regularização. A negociação parte de terreno firme."
                : "Registered deed. Habite-se in perfect order. Property taxes up to date. No transfer issues, no open estate processes, no pending regularizations. The negotiation starts on firm ground."
              }
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}