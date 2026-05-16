"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { pushScrollDepth } from "@/lib/analytics";

const THRESHOLDS = [25, 50, 75, 90] as const;
type Threshold = (typeof THRESHOLDS)[number];

/**
 * Dispara `scroll_depth` em 25/50/75/90% por rota.
 *
 * Por que manual e não trigger nativo do GTM:
 * O Scroll Depth trigger do GTM não re-arma em navegacoes client-side de SPA —
 * uma vez disparado o 90% no /, ele não dispara mais em /siriuba-2.
 * Aqui resetamos o set de thresholds disparados a cada mudança de rota.
 */
export default function ScrollDepthTracker() {
  const pathname = usePathname();
  const fired = useRef<Set<Threshold>>(new Set());

  useEffect(() => {
    fired.current = new Set();

    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const viewport = window.innerHeight;
      const totalHeight = doc.scrollHeight - viewport;
      if (totalHeight <= 0) return;
      const pct = (scrollTop / totalHeight) * 100;

      for (const t of THRESHOLDS) {
        if (pct >= t && !fired.current.has(t)) {
          fired.current.add(t);
          pushScrollDepth(pathname, t);
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Dispara uma vez no mount caso a página já comece scrollada (ex: âncora #section)
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return null;
}
