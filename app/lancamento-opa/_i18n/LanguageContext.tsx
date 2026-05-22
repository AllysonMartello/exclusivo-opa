"use client";

import { ReactNode } from "react";
import { t } from "./translations";

export function LanguageProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function useT() {
  return t;
}
