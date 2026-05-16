"use client";

import InteractiveBentoGallery, { MediaItemType } from "./ui/interactive-bento-gallery";
import { UtensilsCrossed, Waves, Bath, Lightbulb, Home, Sun } from "lucide-react";
import { motion } from "motion/react";

const exclusiveDetails = [
  { icon: Waves, text: "Piscina de borda infinita com pedras Hijau e hidromassagem" },
  { icon: UtensilsCrossed, text: "Espaço gourmet com churrasqueira e forno a lenha integrados" },
  { icon: Bath, text: "Suíte master no térreo com banheiro integrado ao jardim de inverno" },
  { icon: Lightbulb, text: "Projeto luminotécnico assinado e marcenaria planejada" },
  { icon: Home, text: "Arquitetura rústico-contemporânea e conceito boutique" },
  { icon: Sun, text: "Ambientes integrados com pé-direito generoso e iluminação natural" }
];

const mediaItems: MediaItemType[] = [
  {
    id: 1,
    type: "image",
    title: "Fachada Principal",
    desc: "Implantação em ferradura, toda a casa voltada para a piscina.",
    url: "https://smabio.com.br/wp-content/uploads/2026/04/casa-alto-padrao-morro-da-cruz-ilhabela-vista-mar-opa-imoveis.jpg-scaled.webp",
    span: "col-span-1 sm:col-span-1 md:col-span-1 row-span-2 sm:row-span-2 md:row-span-3",
  },
  {
    id: 2,
    type: "image",
    title: "Localização e Entorno",
    desc: "A 150 metros da Praia do Perequê, dentro de um condomínio fechado.",
    url: "https://smabio.com.br/wp-content/uploads/2026/04/Foto-o-morro-da-cruz-1-scaled.jpg",
    span: "col-span-1 sm:col-span-2 md:col-span-2 row-span-2 sm:row-span-2 md:row-span-2",
  },
  {
    id: 3,
    type: "image",
    title: "Living Integrado",
    desc: "Tudo aberto, tudo circula. Madeira de demolição de ipê do piso ao forro.",
    url: "https://smabio.com.br/wp-content/uploads/2026/04/sala-integrada-casa-alto-padrao-morro-da-cruz-ilhabela-area-externa-opa-imoveis.webp",
    span: "col-span-1 sm:col-span-2 md:col-span-1 row-span-2 sm:row-span-2 md:row-span-3",
  },
  {
    id: 4,
    type: "image",
    title: "Suíte Master",
    desc: "Banheiro integrado ao jardim. Box, ducha e closet abertos para a natureza.",
    url: "https://smabio.com.br/wp-content/uploads/2026/04/foto-variada-02-scaled.jpg",
    span: "col-span-1 sm:col-span-1 md:col-span-2 row-span-2 sm:row-span-2 md:row-span-2",
  },
  {
    id: 5,
    type: "image",
    title: "Paisagismo",
    desc: "Paisagismo que entra dentro da casa pela suíte master e pelo deck.",
    url: "https://smabio.com.br/wp-content/uploads/2026/04/suite-master-acesso-piscina-casa-itaguassu-ilhabela-opa-imoveis.webp",
    span: "col-span-1 sm:col-span-1 md:col-span-1 row-span-2 sm:row-span-2 md:row-span-3",
  },
  {
    id: 6,
    type: "image",
    title: "Área Gourmet",
    desc: "Churrasqueira e forno de pizza integrados à cozinha, tudo voltado para a piscina.",
    url: "https://smabio.com.br/wp-content/uploads/2026/04/cozinha-area-gourmet-casa-luxo-ilhabela-morro-da-cruz-integrada-opa-imoveis.webp",
    span: "col-span-1 sm:col-span-1 md:col-span-2 row-span-2 sm:row-span-2 md:row-span-2",
  },
  {
    id: 7,
    type: "image",
    title: "Detalhes em Madeira",
    desc: "Ipê de demolição no piso, no forro e na estrutura. Material que já viveu e vai durar.",
    url: "https://smabio.com.br/wp-content/uploads/2026/04/banheiro-duplo-closet-casa-luxo-ilhabela-morro-da-cruz-opa-imoveis.webp",
    span: "col-span-1 sm:col-span-1 md:col-span-1 row-span-2 sm:row-span-2 md:row-span-3",
  },
];

export default function TheHouse() {
  return (
    <section id="a-casa" className="py-24 bg-bg-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <InteractiveBentoGallery
          mediaItems={mediaItems}
          title="Arquitetura com Alma"
          description="Materiais naturais, linhas puras e uma integração perfeita com o entorno. Clique nas imagens para ampliar e explorar os detalhes."
        />

        <div className="mt-32 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-primary-2 uppercase tracking-widest text-xs font-bold mb-4 block">Diferenciais</span>
            <h3 className="text-3xl md:text-4xl font-serif text-primary-1">Detalhes Exclusivos</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exclusiveDetails.map((detail, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px" }}
                transition={{ delay: index * 0.1, duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="relative bg-white/40 backdrop-blur-md p-10 rounded-[2rem] border border-white/60 hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500 group flex flex-col overflow-hidden"
              >
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-primary-2/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                
                <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center text-primary-2 mb-8 group-hover:scale-110 group-hover:bg-primary-2 group-hover:text-white transition-all duration-500 relative z-10">
                  <detail.icon size={24} strokeWidth={1.5} />
                </div>
                <p className="text-text-sec text-lg leading-relaxed relative z-10">
                  {detail.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
