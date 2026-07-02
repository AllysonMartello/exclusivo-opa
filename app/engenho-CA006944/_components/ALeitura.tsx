"use client";
import { motion } from "motion/react";

export default function ALeitura() {
  return (
    <section className="py-32 bg-[#F8F9FA] text-primary-1">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-serif mb-24 text-primary-1 tracking-tight text-center"
        >
          Pronta para Viver
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-8 shadow-sm relative">
              <picture className="block absolute inset-0 w-full h-full">
                <source type="image/webp" srcSet="/assets/engenho-CA006944/engenho-CA006944-sala-jantar-living-vista-panoramica-mar-desktop.webp" />
                <img src="/assets/engenho-CA006944/engenho-CA006944-sala-jantar-living-vista-panoramica-mar-desktop.jpg" alt="A vista" className="w-full h-full object-cover" loading="lazy" />
              </picture>
            </div>
            <h3 className="text-3xl font-serif mb-4 text-primary-1">O Privilégio do Olhar</h3>
            <p className="text-xl text-text-sec font-light leading-relaxed">A casa olha para o canal de São Sebastião. Vê o sol cruzar o canal pela manhã e os barcos passarem o dia inteiro. Em dias claros, a Serra do Mar aparece na linha do horizonte.</p>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="flex flex-col">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-8 shadow-sm relative">
              <picture className="block absolute inset-0 w-full h-full">
                <source type="image/webp" srcSet="/assets/engenho-CA006944/engenho-CA006944-sala-jantar-cozinha-living-tv-vista-jardim-desktop.webp" />
                <img src="/assets/engenho-CA006944/engenho-CA006944-sala-jantar-cozinha-living-tv-vista-jardim-desktop.jpg" alt="O estado" className="w-full h-full object-cover" loading="lazy" />
              </picture>
            </div>
            <h3 className="text-3xl font-serif mb-4 text-primary-1">O estado</h3>
            <p className="text-xl text-text-sec font-light leading-relaxed">Cozinha completa. Ar-condicionado nos ambientes principais. Aquecimento solar. Mobiliário desenhado para os espaços. A próxima família entra com roupa e livros. O resto já está lá.</p>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-col">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-8 shadow-sm relative">
              <picture className="block absolute inset-0 w-full h-full">
                <source type="image/webp" srcSet="/assets/engenho-CA006944/engenho-CA006944-suite-cama-tv-vista-mar-01-desktop.webp" />
                <img src="/assets/engenho-CA006944/engenho-CA006944-suite-cama-tv-vista-mar-01-desktop.jpg" alt="A planta" className="w-full h-full object-cover" loading="lazy" />
              </picture>
            </div>
            <h3 className="text-3xl font-serif mb-4 text-primary-1">A planta</h3>
            <p className="text-xl text-text-sec font-light leading-relaxed">Os ambientes principais voltados para o mar. Os dormitórios distribuídos em dois pavimentos. Suíte master com varanda privativa. A área de serviço integrada à cozinha, com circulação independente.</p>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="flex flex-col">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-8 shadow-sm relative">
              <picture className="block absolute inset-0 w-full h-full">
                <source type="image/webp" srcSet="/assets/engenho-CA006944/engenho-CA006944-entrada-porta-pivotante-vista-coqueiros-desktop.webp" />
                <img src="/assets/engenho-CA006944/engenho-CA006944-entrada-porta-pivotante-vista-coqueiros-desktop.jpg" alt="A documentação" className="w-full h-full object-cover" loading="lazy" />
              </picture>
            </div>
            <h3 className="text-3xl font-serif mb-4 text-primary-1">A documentação</h3>
            <p className="text-xl text-text-sec font-light leading-relaxed">Escritura registrada. Habite-se em ordem. IPTU em dia. Sem cessão, sem inventário aberto, sem pendência de regularização. A negociação parte de terreno firme.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}