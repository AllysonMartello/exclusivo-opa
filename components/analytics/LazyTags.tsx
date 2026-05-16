"use client";

import { useEffect } from "react";
import { publicEnv } from "@/lib/env";

const GTM_ID = publicEnv.NEXT_PUBLIC_GTM_ID;
const CLARITY_ID = publicEnv.NEXT_PUBLIC_CLARITY_ID;

export default function LazyTags() {
  useEffect(() => {
    let loaded = false;

    const loadTags = () => {
      if (loaded) return;
      loaded = true;

      (function (w: Window & typeof globalThis, d: Document, s: string, l: string, i: string) {
        // @ts-expect-error dataLayer is dynamic
        w[l] = w[l] || [];
        // @ts-expect-error dataLayer is dynamic
        w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
        const f = d.getElementsByTagName(s)[0];
        const j = d.createElement(s) as HTMLScriptElement;
        const dl = l !== "dataLayer" ? "&l=" + l : "";
        j.async = true;
        j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
        f.parentNode?.insertBefore(j, f);
      })(window, document, "script", "dataLayer", GTM_ID);

      (function (c: Window, l: Document, a: string, r: string, i: string) {
        // @ts-expect-error clarity is dynamic
        c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
        const t = l.createElement(r) as HTMLScriptElement;
        t.async = true;
        t.src = "https://www.clarity.ms/tag/" + i;
        const y = l.getElementsByTagName(r)[0];
        y.parentNode?.insertBefore(t, y);
      })(window, document, "clarity", "script", CLARITY_ID);
    };

    const events = ["scroll", "mousemove", "touchstart", "keydown", "click"] as const;
    const once = () => {
      loadTags();
      events.forEach((e) => window.removeEventListener(e, once));
    };
    events.forEach((e) => window.addEventListener(e, once, { passive: true, once: true }));
    const timer = window.setTimeout(loadTags, 4000);

    return () => {
      window.clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, once));
    };
  }, []);

  return null;
}
