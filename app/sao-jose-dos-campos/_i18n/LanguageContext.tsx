"use client";

import { useEffect, ReactNode } from "react";

export function LanguageProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.lang = "pt-BR";
  }, []);

  return <>{children}</>;
}
