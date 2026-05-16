# Eventos e variáveis do dataLayer — opa-site (Next.js)

Lista exata do que o site novo dispara no dataLayer. Confere aí no GTM `GTM-5XNTPNB9` se os triggers e variáveis já existem com esses nomes — se sim, nada precisa mudar do seu lado.

Onde os nomes do site novo divergirem do que você já tem no GTM, é mais fácil eu ajustar no código do que você refazer trigger/tag.

---

## 1. `page_view` — pageview em SPA

**Quando dispara:** toda mudança de rota client-side do Next.js App Router (`/` → `/siriuba-2` → `/composicao-opa` etc.). NÃO dispara no carregamento inicial (esse o `gtm.js` cobre sozinho).

**Variáveis:**
- `event` = `"page_view"`
- `page_path` = ex `"/siriuba-2"`
- `page_title` = `document.title`
- `page_location` = `window.location.href`

> Crítico isso aqui — era o que tava quebrando antes. O trigger "Page View - DOM Ready" padrão do GTM não dispara em SPA. Precisa de um trigger Custom Event com event name `page_view`.

---

## 2. `lead_form_open` — usuário abre o modal de lead

**Quando dispara:** ao montar/abrir cada modal de formulário.

**Variáveis:**
- `event` = `"lead_form_open"`
- `form_id` = um dos:
  - `"lead-form-siriuba-2"`
  - `"lead-form-morro-da-cruz"`
  - `"lead-form-lancamento-imovel"`
  - `"lead-form-lancamento-empreendimento"`
  - `"lead-form-composicao-diagnostico"`

---

## 3. `lead_form_step` — usuário avança step do form multi-step

**Quando dispara:** a cada transição de step nos formulários (composicao tem 10 steps, lancamento tem 8-9, siriuba e morro têm multi-step também).

**Variáveis:**
- `event` = `"lead_form_step"`
- `form_id` = (mesmos valores do `lead_form_open`)
- `step_index` = número (0, 1, 2...)
- `step_name` = opcional, string

> Útil pra você identificar em que pergunta o usuário desiste.

---

## 4. `lead_form_submit` — conversão de lead

**Quando dispara:** após o POST pro `/api/lead` retornar OK.

**Variáveis:**
- `event` = `"lead_form_submit"`
- `form_id` = (mesmos valores acima)
- `lead_name` = string
- `lead_phone` = string (com máscara brasileira `(12) 99999-9999`)
- `lead_city` = string
- `lead_email` = string (opcional, só no siriuba-2)
- `event_id` = UUID v4 (para dedup com server-side se ativarmos CAPI/MP depois)

> Este é o evento que vira `Lead` no Meta Pixel e `generate_lead` no GA4.

---

## 5. `virtual_tour_view` — usuário interage com tour virtual

**Quando dispara:** clique no preview do tour virtual (siriuba-2 e morro-da-cruz).

**Variáveis:**
- `event` = `"virtual_tour_view"`
- `form_id` = `"siriuba-2"` ou `"morro-da-cruz"`

### 5b. `virtual_tour_start` — siriuba-2 apenas (extra)

O VirtualTour do siriuba-2 também dispara um evento mais rico (compatível com o que existia no site antigo):

- `event` = `"virtual_tour_start"`
- `tour_name` = `"Siriuba 2 Virtual Tour"`
- `click_id` = `"btn-virtual-tour-image"` (ou similar)
- `value` = `1`

---

## 6. `click_whatsapp` — clique em CTAs do WhatsApp

**Quando dispara:** clique em qualquer botão/link do WhatsApp.

**Variáveis:**
- `event` = `"click_whatsapp"`
- `click_location` = um dos:
  - `"floating_button"` (botão verde flutuante global)
  - `"thank_you_page"` (CTA da página /siriuba-2/obrigado)
  - `"morro_form_success"` (redirect automático depois do submit do morro)
  - `"lancamento_form_success"` (redirect automático depois do submit do lancamento)

---

## 7. `scroll_depth` — engajamento por rolagem

**Quando dispara:** ao atingir 25%, 50%, 75% e 90% da página. **Reseta a cada mudança de rota** (diferente do trigger nativo do GTM, que não re-arma em SPA).

**Variáveis:**
- `event` = `"scroll_depth"`
- `page_path` = ex `"/siriuba-2"`
- `scroll_depth` = número: `25`, `50`, `75` ou `90`

---

## 8. `engagement_time` — tempo ativo na página

**Quando dispara:** ao sair da rota (navegar, fechar tab, mudar tab). Pausa quando a tab fica oculta.

**Variáveis:**
- `event` = `"engagement_time"`
- `page_path` = ex `"/siriuba-2"`
- `time_seconds` = número (só dispara se ≥3s)

---

## 9. `web_vitals` — Core Web Vitals

**Quando dispara:** quando o Next.js mede LCP, INP, CLS, FCP, TTFB.

**Variáveis:**
- `event` = `"web_vitals"`
- `metric_name` = `"LCP"`, `"INP"`, `"CLS"`, `"FCP"`, `"TTFB"`
- `metric_value` = número (CLS multiplicado por 1000 pra inteiro)
- `metric_id` = string única do report
- `page_path` = ex `"/siriuba-2"`

---

## 10. `thank_you_page_view` — siriuba-2 apenas

**Quando dispara:** ao chegar em `/siriuba-2/obrigado` **vindo de um submit real** (não dispara em refresh ou acesso direto, pra evitar conversão duplicada).

**Variáveis:**
- `event` = `"thank_you_page_view"`
- `page_path` = `"/obrigado"`
- `eventID` = mesmo UUID gerado no `lead_form_submit` (para dedup)

---

## Consent Mode v2

Já está configurado igual ao site antigo:

**Default (LGPD-friendly):**
```js
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  functionality_storage: 'granted',
  security_storage: 'granted',
  wait_for_update: 500
});
```

**Quando o usuário aceita cookies** (no banner):
```js
gtag('consent', 'update', {
  ad_storage: 'granted',
  ad_user_data: 'granted',
  ad_personalization: 'granted',
  analytics_storage: 'granted'
});
```

Se já tem consent em `localStorage.opa_cookie_consent === "accepted"` de visita anterior, o `update` é re-aplicado **antes do GTM carregar** (evita perder eventos do início da sessão).

---

## Modo debug pra QA

Acessar qualquer URL com `?debug=1` (ex: `https://exclusivo.opailhabela.com.br/siriuba-2?debug=1`) ativa log de todos os eventos no console do browser. Persiste em sessionStorage. Desliga com `?debug=0`.

Acelera teste sem precisar abrir GTM Preview.

---

## Container já existente — confira se já tem isso

Para cada evento acima, precisa no GTM:

1. **Trigger Custom Event** com `Event name` exatamente igual (ex: `page_view`, `lead_form_submit`, etc.)
2. **Data Layer Variable** para cada variável que a tag vai usar (ex: DLV `form_id`, DLV `lead_name`, DLV `page_path`, etc.)
3. **Tags** ligadas:
   - GA4 Event tag → trigger no evento correspondente
   - Meta Pixel Lead → trigger no `lead_form_submit`
   - Google Ads Conversion → trigger no `lead_form_submit`

Onde tiver divergência de nome entre o que você tem no GTM e o que o site novo manda, **mais fácil eu ajustar no código** do que você refazer trigger/tag. Me diz onde tá diferente.

---

## Lazy-load (igual ao site antigo)

Container GTM `GTM-5XNTPNB9` carrega **após 4s OU primeira interação do usuário** (scroll/mousemove/touchstart/keydown/click) — o que vier primeiro. Mesma estratégia do site antigo para preservar LCP.

Microsoft Clarity (`wqp7zvhddc`) carrega junto com o GTM no mesmo lazy-load.
