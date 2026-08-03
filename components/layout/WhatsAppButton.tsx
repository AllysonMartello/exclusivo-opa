"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { pushClickWhatsApp } from "@/lib/analytics";
import { BROKERS } from "@/lib/brokers";

const WA_HREF = `https://wa.me/5512974068058?text=${encodeURIComponent(
  "Olá! Gostaria de falar com a OPA Ilhabela."
)}`;

const BROKER_SLUGS = Object.keys(BROKERS);

// Paginas de apresentacao, sem captacao direta: o botao flutuante nao aparece.
const ROTAS_SEM_BOTAO = ["/siriuba-2/jornada"];

export default function WhatsAppButton() {
  const pathname = usePathname();
  const isBrokerPage = BROKER_SLUGS.some(
    (slug) => pathname === `/${slug}` || pathname.startsWith(`/${slug}/`),
  );
  const oculto = isBrokerPage || ROTAS_SEM_BOTAO.includes(pathname);

  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    if (oculto) return;
    const show = setTimeout(() => setShowBubble(true), 2500);
    const hide = setTimeout(() => setShowBubble(false), 6500);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, [oculto]);

  if (oculto) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
      style={{ minWidth: 56, minHeight: 56 }}
    >
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, x: 12, scale: 0.85 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 12, scale: 0.85 }}
            transition={{ type: "spring", stiffness: 340, damping: 26 }}
            className="relative bg-white text-gray-800 text-sm font-medium px-4 py-2.5 rounded-2xl shadow-xl whitespace-nowrap"
          >
            Entre em contato conosco
            <span className="absolute right-[-7px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-b-[6px] border-l-[8px] border-t-transparent border-b-transparent border-l-white" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={WA_HREF}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => pushClickWhatsApp("floating_button")}
        initial={{ scale: 0, opacity: 0, rotate: -180 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 1 }}
        whileHover={{ scale: 1.12, rotate: 8 }}
        whileTap={{ scale: 0.93 }}
        className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl"
        style={{ background: "#25D366" }}
        aria-label="Falar no WhatsApp"
      >
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{ background: "#25D366" }}
          animate={{ scale: [1, 1.5, 1.5], opacity: [0.5, 0, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut", repeatDelay: 1 }}
        />
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white relative z-10">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.558 4.14 1.535 5.878L.057 23.57a.75.75 0 0 0 .92.919l5.763-1.476A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.95 9.95 0 0 1-5.077-1.384l-.364-.216-3.773.967.995-3.688-.236-.38A9.953 9.953 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
        </svg>
      </motion.a>
    </div>
  );
}
