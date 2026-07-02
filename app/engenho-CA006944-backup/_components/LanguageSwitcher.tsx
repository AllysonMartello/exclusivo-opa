"use client";

import { Globe } from "lucide-react";
import { useLanguage } from "../_i18n/LanguageContext";

type Variant = "header-light" | "header-dark" | "mobile";

export default function LanguageSwitcher({ variant = "header-light" }: { variant?: Variant }) {
  const { lang, setLang, t } = useLanguage();

  const baseClasses =
    "inline-flex items-center gap-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300";

  const containerClass =
    variant === "mobile"
      ? `${baseClasses} px-3 py-2 border border-border-main/60 text-primary-1 bg-white`
      : variant === "header-dark"
        ? `${baseClasses} px-3 py-1.5 border border-border-main/60 text-text-main bg-white/70 backdrop-blur-sm`
        : `${baseClasses} px-3 py-1.5 border border-white/30 text-white bg-white/10 backdrop-blur-sm`;

  const activeButton =
    variant === "mobile" || variant === "header-dark"
      ? "bg-primary-1 text-white"
      : "bg-white text-primary-1";
  const inactiveButton =
    variant === "mobile" || variant === "header-dark"
      ? "text-primary-1/60 hover:text-primary-1"
      : "text-white/70 hover:text-white";

  return (
    <div className={containerClass} role="group" aria-label={t.header.languageLabel}>
      <Globe size={14} className="opacity-70" />
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
