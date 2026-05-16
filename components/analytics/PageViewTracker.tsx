"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { pushPageView } from "@/lib/analytics";

/**
 * Dispara `page_view` no dataLayer em toda mudança de rota client-side.
 *
 * Sem isso, o GTM só registra pageview do carregamento inicial — porque
 * o App Router do Next navega sem recarregar a página, e o `gtm.js` do GTM
 * não tem como saber que houve uma "navegação" lógica.
 *
 * Este foi exatamente o problema que travava o tracking no projeto antigo
 * (SPA Vite + react-router-dom): eventos disparavam do form, mas pageviews
 * nunca chegavam no GA4 fora da home.
 *
 * Skip do primeiro disparo para não duplicar com o `gtm.js` que ja dispara
 * pageview no load inicial automaticamente. A partir da segunda mudanca de
 * rota, este componente assume o trabalho.
 */
export default function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const qs = searchParams?.toString();
    const fullPath = qs ? `${pathname}?${qs}` : pathname;
    pushPageView(fullPath);
  }, [pathname, searchParams]);

  return null;
}
