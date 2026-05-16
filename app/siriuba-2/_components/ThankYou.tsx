"use client";

import { useEffect } from "react";
import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import Header from "./Header";
import { useT } from "../_i18n/LanguageContext";
import { pushClickWhatsApp } from "@/lib/analytics";

const WHATSAPP_NUMBER = "5512974068058";

export default function ThankYou() {
  const t = useT();
  const whatsappMessage = encodeURIComponent(t.thankYou.whatsappMessage);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Só dispara se a /obrigado foi alcançada via submit real (flag setada no LeadFormModal).
    // Bloqueia refresh e acesso direto à URL.
    let leadSubmitted: string | null = null;
    let leadEventID: string | null = null;
    try {
      leadSubmitted = sessionStorage.getItem("lead_submitted");
      leadEventID = sessionStorage.getItem("lead_eventID");
    } catch {
      return;
    }

    if (leadSubmitted !== "1") return;

    const w = window as any;
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({
      event: "thank_you_page_view",
      page_path: "/obrigado",
      eventID: leadEventID,
    });

    try {
      sessionStorage.removeItem("lead_submitted");
      sessionStorage.removeItem("lead_eventID");
    } catch {
      // ignore
    }
  }, []);

  return (
    <div className="min-h-screen relative flex flex-col overflow-hidden">
      {/* Imagem de fundo */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source
            media="(max-width: 767px)"
            srcSet="/assets/siriuba-2/vista-mar-mobile.avif"
            type="image/avif"
          />
          <source
            media="(min-width: 768px)"
            srcSet="/assets/siriuba-2/vista-mar-desktop.avif"
            type="image/avif"
          />
          <img
            src="/assets/siriuba-2/vista-mar-desktop.jpg"
            alt={t.thankYou.imageAlt}
            className="w-full h-full object-cover"
            fetchPriority="high"
          />
        </picture>
        {/* Overlay escuro suave */}
        <div className="absolute inset-0 bg-primary-1/60" />
      </div>

      <Header />

      {/* Conteúdo centralizado */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" as const }}
          className="max-w-xl w-full text-center space-y-10"
        >
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-white/60 text-sm font-medium tracking-widest uppercase"
          >
            {t.thankYou.eyebrow}
          </motion.p>

          {/* Título */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="font-serif text-white text-4xl md:text-5xl leading-tight"
          >
            {t.thankYou.title}
          </motion.h1>

          {/* Divisor */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="w-12 h-px bg-white/30 mx-auto origin-left"
          />

          {/* Corpo */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-white/70 text-lg md:text-xl leading-relaxed"
          >
            {t.thankYou.bodyLine1}
            <br className="hidden md:block" />
            {t.thankYou.bodyLine2}
          </motion.p>

          {/* Botão WhatsApp */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => pushClickWhatsApp("thank_you_page")}
              className="inline-flex items-center gap-3 bg-white text-primary-1 px-8 py-4 rounded-full font-semibold text-base hover:bg-white/90 transition-colors shadow-xl"
            >
              <MessageCircle size={20} />
              {t.thankYou.whatsappCta}
            </a>
          </motion.div>

        </motion.div>
      </main>
    </div>
  );
}
