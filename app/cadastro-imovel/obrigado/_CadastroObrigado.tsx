"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { MessageCircle, CheckCircle2, Home } from "lucide-react";
import { pushClickWhatsApp } from "@/lib/analytics";

const WHATSAPP_NUMBER = "5512974068058";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Olá! Acabei de cadastrar meu imóvel pelo site e gostaria de dar continuidade."
);

export default function CadastroObrigado() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let leadSubmitted: string | null = null;
    let leadEventID: string | null = null;
    try {
      leadSubmitted = sessionStorage.getItem("lead_submitted");
      leadEventID = sessionStorage.getItem("lead_eventID");
    } catch {
      return;
    }

    if (leadSubmitted !== "1") return;

    const w = window as unknown as { dataLayer?: unknown[] };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({
      event: "thank_you_page_view",
      page_path: "/cadastro-imovel/obrigado",
      form_id: "cadastro-imovel",
      eventID: leadEventID,
    });

    try {
      sessionStorage.removeItem("lead_submitted");
      sessionStorage.removeItem("lead_eventID");
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <main className="min-h-[100dvh] flex flex-col items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-xl w-full text-center space-y-8"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mx-auto w-20 h-20 md:w-24 md:h-24 bg-[#809C9E]/15 rounded-full flex items-center justify-center"
        >
          <CheckCircle2 size={48} className="text-[#4A6B7C]" strokeWidth={1.8} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="text-[#809C9E] text-xs md:text-sm font-semibold tracking-[0.3em] uppercase"
        >
          Ficha técnica recebida
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="font-serif text-[#253A47] text-3xl md:text-5xl leading-tight"
        >
          Obrigado! Recebemos as informações do seu imóvel.
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="w-12 h-px bg-[#809C9E]/40 mx-auto origin-center"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-[#1A2226]/70 text-base md:text-lg leading-relaxed"
        >
          Já estamos preparando a divulgação do seu imóvel. Se algum dado mudar ou precisar
          complementar algo, é só falar com a gente pelo WhatsApp.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2"
        >
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => pushClickWhatsApp("cadastro_imovel_obrigado")}
            className="inline-flex items-center gap-2 bg-[#253A47] text-white px-7 py-3.5 rounded-full font-semibold text-base hover:bg-[#253A47]/90 transition-colors shadow-lg"
          >
            <MessageCircle size={20} />
            Falar pelo WhatsApp
          </a>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-white text-[#253A47] px-7 py-3.5 rounded-full font-semibold text-base border border-[#D5DCE2] hover:bg-[#E8ECEE] transition-colors"
          >
            <Home size={20} />
            Voltar ao início
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
