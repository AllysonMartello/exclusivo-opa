"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

/**
 * Ativa modo debug do tracking quando a URL tem `?debug=1` (ou `?debug=tracking`).
 * Persiste em sessionStorage para sobreviver a navegacoes client-side.
 *
 * Com isso ligado, todo pushEvent loga no console — acelera QA sem precisar abrir
 * o GTM Preview a cada teste.
 */
export default function DebugMode() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const param = searchParams?.get("debug");
    if (param === "1" || param === "tracking") {
      sessionStorage.setItem("opa_debug", "1");
    }
    if (param === "0") {
      sessionStorage.removeItem("opa_debug");
    }
    window.__opaDebug = sessionStorage.getItem("opa_debug") === "1";
    if (window.__opaDebug) {
      // eslint-disable-next-line no-console
      console.log(
        "%c[opa-track] debug ATIVO",
        "background:#0071C6;color:white;padding:2px 6px;border-radius:4px",
        "— eventos serão logados no console. Desative com ?debug=0"
      );
    }
  }, [searchParams]);

  return null;
}
