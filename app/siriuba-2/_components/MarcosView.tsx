"use client";

import { useState, useRef } from "react";
import { motion } from "motion/react";
import { MessageCircle, Mail, Play, Pause } from "lucide-react";
import { useT } from "../_i18n/LanguageContext";

export default function MarcosView() {
  const t = useT();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.src) {
      audio.src = "/assets/siriuba-2/audio-marco.mp3";
    }
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => setIsPlaying(false));
    }
  };

  return (
    <section className="py-16 bg-bg-main border-t border-border-main/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-40 h-40 md:w-48 md:h-48 shrink-0 relative"
          >
            <div className="absolute inset-0 bg-primary-2/5 rounded-full blur-xl -z-10"></div>
            <img
              src="/assets/siriuba-2/marco.jpg"
              alt="Marco Henrique"
              width={400}
              height={400}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-top rounded-full border-2 border-white shadow-md grayscale-[20%] hover:grayscale-0 transition-[filter] duration-500"
            />
          </motion.div>
          
          <div className="flex-1 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[10px] font-bold tracking-[0.2em] text-primary-2 uppercase mb-2 block">{t.marcosView.eyebrow}</span>
              <h2 className="text-3xl font-serif text-primary-1 mb-1">{t.marcosView.name}</h2>
              <p className="text-text-sec text-xs font-medium tracking-wider mb-8">{t.marcosView.role}</p>
              
              <div className="bg-bg-alt/50 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-5 mb-8 border border-border-main/40">
                <audio
                  ref={audioRef}
                  preload="none"
                  onEnded={() => setIsPlaying(false)}
                  onPause={() => setIsPlaying(false)}
                  onPlay={() => setIsPlaying(true)}
                />
                <button 
                  onClick={togglePlay}
                  className="w-12 h-12 bg-primary-1 hover:bg-primary-2 text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-sm active:scale-95 shrink-0"
                >
                  {isPlaying ? <Pause fill="currentColor" size={20} /> : <Play fill="currentColor" size={20} className="ml-0.5" />}
                </button>
                <div className="flex-1 text-left w-full">
                  <p className="text-xs font-bold text-primary-1 mb-1">{t.marcosView.audioTitle}</p>
                  
                  <div className={`waveform flex items-center gap-1 h-4 w-full overflow-hidden ${isPlaying ? "is-playing" : ""}`} aria-hidden="true">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <span key={i} className="waveform-bar" style={{ animationDelay: `${i * 0.1}s` }} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-text-sec text-base font-serif italic mb-8 border-l-2 border-primary-2/20 pl-5 py-1">
                "{t.marcosView.quote}"
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
                <a href="#contato" className="text-sm font-bold text-primary-1 hover:text-primary-2 transition-colors flex items-center gap-2 group">
                  <MessageCircle size={18} />
                  {t.marcosView.talkCta}
                </a>
                <a href="mailto:marcofilhoilha@gmail.com" className="text-xs font-medium text-text-sec hover:text-primary-1 transition-colors flex items-center gap-2">
                  <Mail size={14} />
                  {t.marcosView.emailCta}
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
