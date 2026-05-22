"use client";

import { Globe } from "lucide-react";
import { useLanguage } from "../_i18n/LanguageContext";

type Variant = "header-light" | "header-dark" | "mobile";

export default function LanguageSwitcher({ variant = "header-light" }: { variant?: Variant }) {
  const { lang, setLang, t } = useLanguage();

  const baseClasses =
    "inline-flex items-center gap-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300";

  const containerClass =
    variant === "mobile"
      ? `${baseClasses} px-3 py-2 border border-[#D9D9D9] text-[#0F2A44] bg-white`
      : variant === "header-dark"
        ? `${baseClasses} px-3 py-1.5 border border-[#D9D9D9] text-[#0F2A44]/70 bg-white/70 backdrop-blur-sm`
        : `${baseClasses} px-3 py-1.5 border border-white/30 text-white/80 bg-white/10 backdrop-blur-sm`;

  const activeButton =
    variant === "mobile" || variant === "header-dark"
      ? "bg-[#0F2A44] text-white"
      : "bg-white text-[#0F2A44]";
  const inactiveButton =
    variant === "mobile" || variant === "header-dark"
      ? "text-[#0F2A44]/50 hover:text-[#0F2A44]"
      : "text-white/60 hover:text-white";

  return (
    <div className={containerClass} role="group" aria-label={t.header.languageLabel}>
      <Globe size={12} className="opacity-70" />
      <button
        type="button"
        onClick={() => setLang("pt")}
        aria-pressed={lang === "pt"}
        aria-label="Português"
        className={`px-2 py-0.5 rounded-full transition-colors ${lang === "pt" ? activeButton : inactiveButton}`}
      >
        PT
      </button>
      <span className="opacity-30">|</span>
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        aria-label="English"
        className={`px-2 py-0.5 rounded-full transition-colors ${lang === "en" ? activeButton : inactiveButton}`}
      >
        EN
      </button>
    </div>
  );
}
