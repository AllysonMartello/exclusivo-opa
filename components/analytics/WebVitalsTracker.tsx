"use client";

import { useReportWebVitals } from "next/web-vitals";
import { usePathname } from "next/navigation";
import { pushWebVitals } from "@/lib/analytics";

/**
 * Reporta Core Web Vitals (LCP, INP, CLS, FCP, TTFB) para o dataLayer.
 * O GTM pode entao mandar para GA4 como evento `web_vitals` — util para
 * correlacionar performance com taxa de conversao.
 */
export default function WebVitalsTracker() {
  const pathname = usePathname();
  useReportWebVitals((metric) => {
    pushWebVitals(metric.name, metric.value, metric.id, pathname);
  });
  return null;
}
