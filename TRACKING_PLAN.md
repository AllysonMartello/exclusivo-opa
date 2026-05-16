# Plano — Tracking robusto opa-site

Estado atual (já implementado na migração Next.js):
- GTM-5XNTPNB9 carregando via lazy-load (4s ou interação)
- Microsoft Clarity wqp7zvhddc carregando junto
- Consent Mode v2 com default deny + auto re-apply se localStorage tem accepted
- PageViewTracker disparando `page_view` em toda navegação client-side
- CookieConsent disparando `gtag('consent','update', granted)` no aceite
- API `/api/lead` recebendo POST de todos os 4 formulários (siriuba-2, composicao, lancamento, morro)
- Helpers `pushLeadSubmit`, `pushVirtualTourView` em `lib/analytics.ts`

O que falta para "não deixar nada passar".

---

## Fase A — Server-side tracking (impacto: ALTO)

Recupera 20-40% de conversões perdidas por ad blocker, iOS Safari ITP, e usuários que recusam cookies. O `/api/lead` ja recebe todos os leads — basta encaminhar para Meta CAPI e GA4 Measurement Protocol em paralelo ao Resend.

### A1. Meta Conversions API (CAPI)
- Endpoint: `https://graph.facebook.com/v21.0/{PIXEL_ID}/events`
- Evento: `Lead` com `event_id` único (mesmo gerado no client para dedup)
- Dados a enviar: nome (hashed), telefone (hashed), cidade, IP do request, user-agent, fbp/fbc cookies se existirem
- Implementação em [app/api/lead/route.ts](app/api/lead/route.ts) — adiciona chamada CAPI depois do Resend
- Dedup: client dispara `lead_form_submit` no dataLayer com `event_id` UUID, server-side reutiliza o mesmo UUID

### A2. GA4 Measurement Protocol
- Endpoint: `https://www.google-analytics.com/mp/collect?measurement_id={GA4_ID}&api_secret={API_SECRET}`
- Evento: `generate_lead` com `client_id` (capturar do cookie `_ga` ou gerar)
- Mesma chamada server-side em [app/api/lead/route.ts](app/api/lead/route.ts)
- Dedup com client GA4 via `event_id`

### A3. Cookies de identidade — capturar no client e enviar no POST
- Antes do POST para `/api/lead`, ler `_fbp`, `_fbc`, `_ga` dos cookies
- Incluir no payload do POST para o server passar para CAPI/MP
- Editar os 4 `LeadFormModal` (siriuba, lancamento, morro) e `DiagnosisForm` (composicao)

---

## Fase B — Cobertura de eventos de intenção (impacto: MÉDIO)

Mede o funil completo, não só conversão.

### B1. `lead_form_open` quando o modal abre
- Editar 4 modais: disparar evento ao montar com `isOpen=true`
- Útil pra calcular taxa de conversão por canal (anúncio que abre o form mas não converte)

### B2. `lead_form_step` no progresso do form multi-step
- DiagnosisForm composicao (10 steps), LeadFormModal lancamento (8-9 steps), LeadFormModal siriuba-2 (multi-step)
- Disparar a cada transição com `{form_id, step_index, step_name}`
- Identifica em que pergunta o usuário desiste

### B3. `click_whatsapp` — botão flutuante + CTAs
- `components/layout/WhatsAppButton.tsx` no onClick
- Botões "Falar no WhatsApp" dentro das landings
- Útil porque WhatsApp é conversão lateral que hoje passa em branco

### B4. `virtual_tour_view` — já existe helper, falta chamar
- VirtualTour.tsx do siriuba-2 e morro: disparar quando o iframe ou botão de tour for clicado
- Indicador top-of-funnel de intenção real

---

## Fase C — Engagement (impacto: MÉDIO)

### C1. Scroll depth manual
- Disparar `scroll_depth` em 25/50/75/90% por rota
- GTM tem trigger nativo mas em SPA bugga (não re-arma em navegação client-side) — fazer manual via hook reutilizável
- Crítico nas landings longas (siriuba-2, lancamento-opa, composicao)

### C2. Engagement time por rota
- Tempo desde mount até unmount/visibilitychange
- Disparar `engagement_time` com `{page_path, time_seconds}` no unmount

### C3. Web Vitals — Next.js tem hook nativo
- `useReportWebVitals` no layout raiz
- Disparar `web_vitals` com LCP, INP, CLS, FCP, TTFB
- Correlaciona performance com bounce/conversão no GA4

---

## Fase D — Higiene e debug (impacto: BAIXO mas necessário)

### D1. `eventID` consistente entre client e server
- UUID gerado no client antes do POST
- Salvo em sessionStorage como `lead_eventID`
- Reutilizado no `thank_you_page_view` (siriuba-2 ja faz isso parcialmente)
- Server-side usa o mesmo `eventID` no CAPI + MP

### D2. Variável global `debug=1` na URL ativa console.log dos eventos
- Util para QA: `?debug=1` faz `pushEvent` logar no console.group
- Acelera diagnostico sem precisar abrir GTM Preview

### D3. Validar 4 fluxos end-to-end com GTM Preview
- Checklist por landing: pageview inicial → scroll → form_open → form_step × N → form_submit → thank_you_page_view
- 4 sessions de QA antes de mandar pro ar

---

# O que o gestor precisa providenciar

Lista única, sem segredos no chat — só preciso confirmação que cada item existe e que ele consegue cadastrar nas envs da Vercel quando for hora.

## Credenciais Meta (CAPI)

| O que | Onde achar | Para que |
|---|---|---|
| **Meta Pixel ID** | Events Manager → Data Sources → seu pixel → ID numérico (16 dígitos) | Identificar a conta de anúncios |
| **Meta CAPI Access Token** | Events Manager → Data Sources → seu pixel → Settings → "Generate Access Token" | Autenticar requests server-side |
| **Test Event Code** (opcional, só QA) | Events Manager → Test Events → "Test Event Code" | Validar eventos chegando antes de ir pro live |

Confirmar:
- [ ] Tem acesso ao Business Manager / Events Manager da conta da OPA?
- [ ] O Pixel ID atual está ativo e recebendo eventos via GTM?
- [ ] Consegue gerar Access Token de longa duração (não expira)?

## Credenciais Google (GA4 Measurement Protocol)

| O que | Onde achar | Para que |
|---|---|---|
| **GA4 Measurement ID** | GA4 → Admin → Data Streams → Web stream → "G-XXXXXXXXXX" | Identificar a propriedade |
| **GA4 API Secret** | GA4 → Admin → Data Streams → Web stream → "Measurement Protocol API secrets" → Create | Autenticar requests server-side |

Confirmar:
- [ ] Tem acesso de Editor à propriedade GA4 da OPA?
- [ ] Pode criar API Secret (precisa permissão de Editor)?
- [ ] O GA4 ja está vinculado ao GTM-5XNTPNB9 hoje?

## GTM — configurações que o gestor precisa fazer

Quando a Fase A estiver no ar, o GTM precisa de:

1. **Custom Event Trigger** `page_view`
   - Trigger Type: Custom Event
   - Event name: `page_view`
   - Conecta com a tag GA4 Configuration (substitui o "Page View - All Pages" padrão)

2. **Data Layer Variables**:
   - `page_path` (DLV)
   - `page_title` (DLV)
   - `page_location` (DLV)
   - `event_id` (DLV — para dedup com server)
   - `form_id` (DLV)
   - `lead_name`, `lead_phone`, `lead_city` (DLV — só para Meta CAPI, NÃO mandar pro GA4 sem hash)

3. **Tags**:
   - GA4 Configuration: trigger no `page_view` custom
   - GA4 Event "generate_lead": trigger no `lead_form_submit`, com `event_id` para dedup
   - Meta Pixel Lead: trigger no `lead_form_submit`, com `event_id` para dedup com CAPI

4. **Consent Mode v2**: confirmar que a tag GA4 tem "Consent Settings → Require additional consent for: ad_storage + analytics_storage". Sem isso o default deny não funciona.

Confirmar:
- [ ] Tem acesso de Editor no GTM-5XNTPNB9?
- [ ] Quer que eu prepare um GTM container export (.json) com tudo configurado para importar de uma vez?

## Microsoft Clarity

Atual: tag carregando como wqp7zvhddc.

Confirmar:
- [ ] Tem acesso ao projeto Clarity?
- [ ] Quer adicionar masking de campos sensíveis (PII)? Hoje o telefone digitado no form fica visível nos heatmaps.

## Variáveis de ambiente Vercel (quando for deploy)

Atual (já no plano de migração):
- `RESEND_API_KEY`
- `LEAD_TO_EMAIL`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_GTM_ID=GTM-5XNTPNB9`
- `NEXT_PUBLIC_CLARITY_ID=wqp7zvhddc`

A adicionar para Fase A:
- `META_PIXEL_ID`
- `META_CAPI_ACCESS_TOKEN`
- `META_CAPI_TEST_EVENT_CODE` (opcional, só durante QA)
- `GA4_MEASUREMENT_ID`
- `GA4_API_SECRET`

---

# Ordem sugerida de execução

1. **Agora (sem depender do gestor):** Fase B + Fase C + Fase D — todos eventos client-side, scroll, engagement, web vitals, eventID consistente. Já melhora o relatório sem precisar de credencial nova.

2. **Quando o gestor confirmar credenciais Meta + GA4:** Fase A — server-side tracking. Esse é o ganho real de dados que estão sendo perdidos hoje.

3. **Após deploy:** QA com GTM Preview nos 4 fluxos, depois o gestor importa o GTM container atualizado.

Estimativa: Fase B+C+D = ~2-3h de implementação. Fase A = ~1-2h depois das credenciais.
