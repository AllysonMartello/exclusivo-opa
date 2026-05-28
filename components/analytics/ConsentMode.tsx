import Script from "next/script";

/**
 * Consent Mode v2 — DEVE rodar antes de qualquer tag carregar (GTM, Clarity,
 * GA4, Meta Pixel, etc). O GTM/Clarity em LazyTags só carrega após 4s ou
 * interação do usuário, então afterInteractive é cedo o suficiente e não
 * bloqueia o caminho crítico de renderização (FCP/LCP).
 *
 * Instala window.gtag e seta default deny (LGPD-friendly).
 * O CookieConsent depois chama updateConsent(true) via gtag('consent','update').
 */
export default function ConsentMode() {
  const js = `
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
      functionality_storage: 'granted',
      security_storage: 'granted',
      wait_for_update: 500
    });
    // Se o usuário ja aceitou cookies em visita anterior, re-aplica consent
    // imediatamente (antes do GTM carregar) — assim o GA4 ja registra com permissao.
    try {
      if (localStorage.getItem('opa_cookie_consent') === 'accepted') {
        window.gtag('consent', 'update', {
          ad_storage: 'granted',
          ad_user_data: 'granted',
          ad_personalization: 'granted',
          analytics_storage: 'granted'
        });
      }
    } catch (e) {}
  `;
  return (
    <Script id="consent-mode-default" strategy="afterInteractive">
      {js}
    </Script>
  );
}
