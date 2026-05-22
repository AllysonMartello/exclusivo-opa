"use client";

import { motion } from 'framer-motion';
import { Layers, Globe, Target } from 'lucide-react';
import { useT } from '../../_i18n/LanguageContext';

// Common animation for icons
const iconPulse = {
  scale: [1, 1.05, 1],
  opacity: [0.8, 1, 0.8],
};

const glowPulse = {
  scale: [1, 1.2, 1],
  opacity: [0.3, 0.5, 0.3],
};

export const CinematicVideoVisual = () => {
  const t = useT();
  return (
    <div className="relative w-full h-full bg-[#050A0F] overflow-hidden rounded-2xl flex flex-col items-center justify-center p-6 group">
      {/* Background Glow */}
      <motion.div
        animate={glowPulse}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-40 h-40 bg-[#2F5D82]/20 blur-[60px] rounded-full"
      />

      <div className="relative z-10 flex flex-col items-center gap-4">
        {t.visuals.cinematic.map((text, idx) => (
          <motion.span
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2, duration: 0.8 }}
            className="text-lg md:text-xl font-bold text-white uppercase tracking-[0.4em] drop-shadow-lg"
          >
            {text}
          </motion.span>
        ))}
        
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="h-px w-24 bg-[#2F5D82] mt-4 origin-center"
        />
      </div>

      {/* Subtle Lens Flare Effect */}
      <motion.div 
        animate={{ 
          x: ['-50%', '50%'],
          opacity: [0, 0.3, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
      />
    </div>
  );
};

export const VirtualTourVisual = () => {
  const t = useT();
  return (
    <div className="relative w-full h-full bg-[#F7F6F3] overflow-hidden rounded-2xl flex flex-col items-center justify-center p-6 border border-black/[0.03]">
      <motion.div 
        animate={glowPulse}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-40 h-40 bg-[#2F5D82]/10 blur-[50px] rounded-full"
      />

      <div className="relative z-10 flex flex-col items-center gap-6">
        <motion.div 
          animate={iconPulse}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-20 h-20 rounded-2xl border border-black/5 flex items-center justify-center bg-white shadow-sm"
        >
          <Layers className="text-[#2F5D82] w-8 h-8" />
        </motion.div>
        <div className="text-center">
          <div className="text-[10px] uppercase tracking-[0.4em] text-[#0F2A44]/40 font-black mb-1">{t.visuals.virtualTour.primary}</div>
          <div className="text-[8px] uppercase tracking-[0.2em] text-[#0F2A44]/20 font-bold">{t.visuals.virtualTour.secondary}</div>
        </div>
      </div>

      {/* Scanning Line - Simplified */}
      <motion.div 
        animate={{ top: ['20%', '80%', '20%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#2F5D82]/40 to-transparent"
      />
    </div>
  );
};

export const ExclusiveSiteVisual = () => {
  const t = useT();
  return (
    <div className="relative w-full h-full bg-white overflow-hidden rounded-2xl flex flex-col items-center justify-center p-6">
      <div className="absolute inset-0 [background-image:radial-gradient(#D9D9D9_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />
      
      <div className="relative z-10 flex flex-col items-center gap-6">
        <motion.div 
          animate={iconPulse}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-20 h-20 rounded-2xl border border-[#0F2A44]/5 flex items-center justify-center bg-[#0F2A44] shadow-xl"
        >
          <Globe className="text-white w-8 h-8" />
        </motion.div>
        <div className="text-center">
          <div className="text-[10px] uppercase tracking-[0.4em] text-[#0F2A44]/40 font-black mb-1">{t.visuals.exclusiveSite.primary}</div>
          <div className="text-[8px] uppercase tracking-[0.2em] text-[#0F2A44]/20 font-bold">{t.visuals.exclusiveSite.secondary}</div>
        </div>
      </div>
    </div>
  );
};

export const SegmentedCampaignVisual = () => {
  const t = useT();
  return (
    <div className="relative w-full h-full bg-[#F7F6F3] overflow-hidden rounded-2xl flex flex-col items-center justify-center p-6 border border-black/[0.03]">
      <div className="relative z-10 flex flex-col items-center gap-8 w-full">
        <div className="relative">
          {[...Array(2)].map((_, i) => (
            <motion.div 
              key={i}
              animate={{ scale: [1, 1.8], opacity: [0.3, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 1.5 }}
              className="absolute inset-0 border border-[#2F5D82] rounded-full"
            />
          ))}
          <div className="w-16 h-16 rounded-full bg-[#2F5D82] flex items-center justify-center shadow-lg relative z-10">
            <Target className="text-white w-6 h-6" />
          </div>
        </div>

        <div className="w-full max-w-[200px] space-y-2">
          <div className="flex flex-col gap-1">
            <div className="text-[10px] uppercase tracking-widest text-[#0F2A44] font-black">{t.visuals.segmented.primary}</div>
            <div className="text-[9px] uppercase tracking-widest text-[#2F5D82] font-bold">{t.visuals.segmented.secondary}</div>
          </div>
          <div className="w-full h-1 bg-[#0F2A44]/5 rounded-full overflow-hidden">
            <motion.div 
              animate={{ width: ['0%', '95%'] }}
              transition={{ duration: 3, ease: "easeOut" }}
              className="h-full bg-[#2F5D82]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
