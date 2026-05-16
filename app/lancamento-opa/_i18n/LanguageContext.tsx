"use client";

import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { translations, type Lang, type Dictionary } from "./translations";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dictionary;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "lancamento_opa_lang";

const detectInitialLang = (): Lang => {
  if (typeof window === "undefined") return "pt";
  const queryLang = new URLSearchParams(window.location.search).get("lang")?.toLowerCase();
  if (queryLang === "pt" || queryLang === "en") return queryLang;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "pt" || stored === "en") return stored;
  const nav = window.navigator.language?.toLowerCase() ?? "";
  return nav.startsWith("pt") ? "pt" : "en";
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => detectInitialLang());

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en-US";
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang: setLangState,
      t: translations[lang],
    }),
    [lang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}

export function useT() {
  return useLanguage().t;
}
