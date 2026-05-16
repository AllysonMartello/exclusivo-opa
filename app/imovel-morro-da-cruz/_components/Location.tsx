"use client";

import { motion } from "motion/react";
import { MapPin, Anchor, Sailboat, UtensilsCrossed, Landmark, Navigation, Compass } from "lucide-react";

const distances = [
  { label: "Marina de Ilhabela", time: "6 min", icon: Anchor },
  { label: "Yacht Club", time: "8 min", icon: Sailboat },
  { label: "Restaurantes da Vila", time: "9 min", icon: UtensilsCrossed },
  { label: "Vila histórica", time: "10 min", icon: Landmark },
  { label: "Heliponto", time: "12 min", icon: Navigation },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
};

export default function Location() {
  return (
    <section className="py-24 md:py-32 bg-bg-main relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-2/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary-1/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <Compass size={16} className="text-primary-2" />
              <span className="text-primary-2 uppercase tracking-widest text-xs font-bold">Localização Estratégica em Ilhabela</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-primary-1 mb-8 leading-tight">
              Itaguassú, divisa com Perequê
            </h2>
            <div className="space-y-6 text-text-sec text-lg font-light leading-relaxed mb-10">
              <p>
                Localizada no Condomínio Isolabela, entre os bairros mais consolidados de Ilhabela: Itaguassú e Perequê. Quem conhece a ilha de verdade sabe o que isso vale. Viver aqui é estar acima do ritmo da cidade, respirando o ar puro da mata nativa.
              </p>
              <p>
                A apenas 100 metros da praia e com fácil acesso ao píer, o condomínio fechado garante privacidade absoluta. Uma localização rara, que une o silêncio da natureza à conveniência de estar a poucos minutos do centro vibrante.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-[2rem] shadow-lg shadow-black/5 border border-white">
              <h3 className="text-primary-1 font-serif text-2xl mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary-2/10 flex items-center justify-center text-primary-2">
                  <MapPin size={16} />
                </span>
                Ao redor da casa
              </h3>
              <motion.ul 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "0px" }}
                className="space-y-4"
              >
                {distances.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.li 
                      key={index} 
                      variants={itemVariants}
                      className="group flex items-center justify-between border-b border-border-main/30 pb-4 last:border-0 last:pb-0 hover:border-primary-2/30 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary-1/5 flex items-center justify-center text-primary-2 group-hover:bg-primary-2 group-hover:text-white transition-all duration-300 shadow-sm">
                          <Icon size={18} />
                        </div>
                        <span className="text-text-main font-medium group-hover:text-primary-1 transition-colors">{item.label}</span>
                      </div>
                      <span className="text-primary-2 font-bold bg-primary-1/5 px-4 py-1.5 rounded-full text-sm group-hover:bg-primary-2 group-hover:text-white transition-all duration-300">{item.time}</span>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 1 }}
            className="lg:col-span-7 relative h-[600px] lg:h-[800px] rounded-[2.5rem] overflow-hidden shadow-2xl bg-bg-alt border-4 border-white"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14565.6565!2d-45.3683!3d-23.7931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94d2a6e051415555%3A0x1234567890!2sItaguassu%2C%20Ilhabela%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: "grayscale(100%) invert(92%) contrast(83%)" }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 pointer-events-none"
            ></iframe>
            
            {/* Floating Glass Card */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute top-6 left-6 md:top-8 md:left-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 flex items-center gap-4 z-20"
            >
              <div className="w-12 h-12 bg-primary-1 rounded-full flex items-center justify-center text-white shadow-inner">
                <Compass size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-primary-2 uppercase tracking-wider mb-0.5">Coordenadas</p>
                <p className="text-sm font-mono text-primary-1 font-semibold">23°47'35"S 45°22'05"W</p>
              </div>
            </motion.div>

            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="relative">
                <div className="absolute -inset-6 bg-primary-2/20 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
                <div className="absolute -inset-3 bg-primary-2/40 rounded-full animate-pulse"></div>
                <div className="w-14 h-14 bg-primary-2 rounded-full border-4 border-white shadow-2xl flex items-center justify-center text-white relative z-10 transition-transform hover:scale-110">
                  <MapPin size={24} fill="currentColor" />
                </div>
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-bg-main/90 via-transparent to-bg-main/30 pointer-events-none"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
