"use client";

import { useState, useRef } from "react";
import { motion } from "motion/react";
import { MessageCircle, Mail, Play, Pause } from "lucide-react";

export default function MarcosView() {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="py-24 bg-bg-alt">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/5 flex flex-col md:flex-row border border-border-main/50">
          <div className="w-full md:w-1/3 lg:w-2/5 h-[400px] md:h-auto relative">
            <img 
              src="https://smabio.com.br/wp-content/uploads/2026/04/Marco-2.png" 
              alt="Marco Henrique Markito" 
              className="w-full h-full object-cover object-top"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="w-full md:w-2/3 lg:w-3/5 p-10 md:p-16 flex flex-col justify-center bg-bg-main/30">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-xs font-bold tracking-widest text-primary-2 uppercase mb-4 block">O Olhar do Especialista</span>
              <h2 className="text-4xl font-serif text-primary-1 mb-2">Marco Henrique Markito</h2>
              <p className="text-text-sec text-sm font-medium tracking-wider mb-8">CRECI 79555</p>
              
              <div className="bg-primary-1/5 rounded-2xl p-6 flex items-center gap-4 md:gap-6 mb-10 border border-primary-1/10">
                <button 
                  onClick={togglePlay}
                  className="w-14 h-14 bg-primary-2 rounded-full flex items-center justify-center text-white shrink-0 shadow-lg hover:scale-105 transition-transform"
                >
                  {isPlaying ? <Pause fill="currentColor" size={24} /> : <Play fill="currentColor" size={24} className="ml-1" />}
                </button>
                <div className="flex-1">
                  <h4 className="font-bold text-primary-1 mb-1 flex items-center gap-2">
                    🎧 Marco explica a casa
                  </h4>
                  <p className="text-sm text-text-sec leading-relaxed">
                    "Gravei um áudio rápido explicando por que essa casa é única em Ilhabela."
                  </p>
                  
                  {/* Simulated Waveform */}
                  <div className="flex items-center gap-1 mt-3 h-6">
                    {[...Array(30)].map((_, i) => (
                      <motion.div 
                        key={i}
                        className="w-1 bg-primary-2/40 rounded-full"
                        animate={{ 
                          height: isPlaying ? ["20%", "100%", "40%", "80%", "20%"] : "20%",
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.05,
                          ease: "easeInOut" as const
                        }}
                        style={{ height: "20%" }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <blockquote className="text-text-main text-lg md:text-xl font-serif italic leading-relaxed mb-10 relative">
                <span className="absolute -top-6 -left-4 text-6xl text-primary-2/20">"</span>
                Tem imóvel que você esquece quando sai. Esse aqui você vai continuar pensando no carro de volta. Não é só a casa. É o que ela entrega quando você entende onde está, o que foi construído e o tipo de vida que ela permite. Posso falar dessa casa o dia inteiro. Se você quiser, é isso que a gente vai fazer.
              </blockquote>
              
              <div className="flex flex-col items-start gap-4">
                <a href="#contato" className="inline-flex items-center justify-center gap-2 bg-secondary text-white px-8 py-4 rounded-full font-medium hover:bg-blue-800 transition-all duration-300 group shadow-lg shadow-secondary/20 hover:shadow-xl hover:shadow-secondary/30 hover:-translate-y-0.5">
                  <MessageCircle size={20} className="group-hover:scale-110 transition-transform" />
                  Conversar com o Markito
                </a>
                <a href="mailto:marcofilhoilha@gmail.com" className="inline-flex items-center justify-center gap-2 text-text-sec text-sm font-medium hover:text-primary-1 transition-colors group px-4 py-2">
                  <Mail size={16} className="group-hover:scale-110 transition-transform" />
                  marcofilhoilha@gmail.com
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
