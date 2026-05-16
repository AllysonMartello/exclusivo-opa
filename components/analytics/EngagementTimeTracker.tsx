"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { pushEngagementTime } from "@/lib/analytics";

/**
 * Mede tempo ativo na pagina e dispara `engagement_time` quando:
 *  - usuario navega para outra rota
 *  - tab fica oculta (visibilitychange -> hidden)
 *  - pagehide (saida real)
 *
 * "Ativo" = pagina visivel. Pausa quando a tab fica oculta para nao inflar
 * tempo de pessoas que abriram em outra aba e esqueceram.
 */
export default function EngagementTimeTracker() {
  const pathname = usePathname();
  const startedAt = useRef<number>(Date.now());
  const accumulated = useRef<number>(0);
  const isVisible = useRef<boolean>(true);

  useEffect(() => {
    startedAt.current = Date.now();
    accumulated.current = 0;
    isVisible.current = document.visibilityState === "visible";

    const flush = () => {
      if (isVisible.current) {
        accumulated.current += Date.now() - startedAt.current;
        startedAt.current = Date.now();
      }
      const seconds = Math.round(accumulated.current / 1000);
      if (seconds >= 3) {
        pushEngagementTime(pathname, seconds);
      }
      accumulated.current = 0;
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        if (isVisible.current) {
          accumulated.current += Date.now() - startedAt.current;
        }
        isVisible.current = false;
        flush();
      } else {
        startedAt.current = Date.now();
        isVisible.current = true;
      }
    };

    const onPageHide = () => flush();

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pagehide", onPageHide);

    return () => {
      flush();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pagehide", onPageHide);
    };
  }, [pathname]);

  return null;
}
