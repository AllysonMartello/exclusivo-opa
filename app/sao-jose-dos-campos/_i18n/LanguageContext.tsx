"use client";

import { useEffect, ReactNode } from "react";
import { translations, type Dictionary } from "./translations";

export function LanguageProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.lang = "pt-BR";
  }, []);

  return <>{children}</>;
}

export function useT(): Dictionary {
  return translations.pt;
}
