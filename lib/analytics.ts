type DataLayerEvent = {
  event?: string;
  [key: string]: unknown;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __opaDebug?: boolean;
  }
}

const isDebug = (): boolean => {
  if (typeof window === "undefined") return false;
  return !!window.__opaDebug;
};

export function pushEvent(payload: DataLayerEvent) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
  if (isDebug()) {
    // eslint-disable-next-line no-console
    console.log("%c[opa-track]", "color:#0071C6;font-weight:bold", payload.event ?? "(consent)", payload);
  }
}

/**
 * Atualiza Consent Mode v2 via gtag('consent','update',...).
 * O `gtag` é instalado pelo ConsentMode no <head>.
 */
export function updateConsent(granted: boolean) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  const state = granted ? "granted" : "denied";
  window.gtag("consent", "update", {
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state,
    analytics_storage: state,
  });
  if (isDebug()) {
    // eslint-disable-next-line no-console
    console.log("%c[opa-track]", "color:#0071C6;font-weight:bold", "consent_update", { granted });
  }
}

/**
 * UUID v4 — usado como event_id para deduplicação client↔server (Meta CAPI, GA4 MP).
 * Usa crypto.randomUUID quando disponível, fallback simples caso contrário.
 */
export function generateEventId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export type LeadEventPayload = {
  form_id: string;
  lead_name: string;
  lead_phone: string;
  lead_city?: string;
  lead_email?: string;
  event_id?: string;
};

export function pushLeadSubmit(payload: LeadEventPayload) {
  pushEvent({ event: "lead_form_submit", ...payload });
}

export function pushLeadFormOpen(form_id: string) {
  pushEvent({ event: "lead_form_open", form_id });
}

export function pushLeadFormStep(form_id: string, step_index: number, step_name?: string) {
  pushEvent({ event: "lead_form_step", form_id, step_index, step_name });
}

export function pushClickWhatsApp(location: string) {
  pushEvent({ event: "click_whatsapp", click_location: location });
}

export function pushVirtualTourView(form_id: string) {
  pushEvent({ event: "virtual_tour_view", form_id });
}

/**
 * Dispara page_view no dataLayer — necessário em navegações client-side
 * do App Router, onde o GTM não registra pageview automaticamente.
 */
export function pushPageView(path: string, title?: string) {
  pushEvent({
    event: "page_view",
    page_path: path,
    page_title: title ?? (typeof document !== "undefined" ? document.title : ""),
    page_location: typeof window !== "undefined" ? window.location.href : "",
  });
}

export function pushScrollDepth(path: string, depth: 25 | 50 | 75 | 90) {
  pushEvent({ event: "scroll_depth", page_path: path, scroll_depth: depth });
}

export function pushEngagementTime(path: string, time_seconds: number) {
  pushEvent({ event: "engagement_time", page_path: path, time_seconds });
}

export function pushWebVitals(name: string, value: number, id: string, path: string) {
  pushEvent({
    event: "web_vitals",
    metric_name: name,
    metric_value: Math.round(name === "CLS" ? value * 1000 : value),
    metric_id: id,
    page_path: path,
  });
}
