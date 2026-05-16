# Checklist para o gestor de tráfego — Tracking opa-site

Olá! Estamos finalizando o novo site da OPA Ilhabela (`opa-site`, Next.js, vai substituir o `exclusivo.opailhabela.com.br` atual). Preciso de algumas coisas suas para o tracking funcionar 100% no novo domínio.

A maior parte é **reaproveitar o que já existe** no site atual. Só algumas coisas novas no final.

---

## PARTE 1 — Reaproveitar do site atual

### 1.1 GTM (Google Tag Manager) — já existe

**Container atual:** `GTM-5XNTPNB9`

Vou continuar usando esse container no novo site, **não precisa criar outro**. Só preciso de:

- [ ] **Acesso de Editor ou Publish** ao container `GTM-5XNTPNB9` para o email: `growthcompassofc@gmail.com`
- [ ] Confirmar que esse container está ativo e funcionando hoje no site `opailhabela.com.br` principal (não no exclusivo) — é de lá que sei que está OK
- [ ] Quando eu pedir, **publicar a versão nova do container** com triggers/tags atualizadas para os eventos novos

### 1.2 Microsoft Clarity — já existe

**Project ID atual:** `wqp7zvhddc`

Continuo com o mesmo projeto, **não precisa criar outro**. Só preciso de:

- [ ] **Acesso ao projeto Clarity** `wqp7zvhddc` para `growthcompassofc@gmail.com`
- [ ] Confirmar se deseja ativar **masking de campos com PII** (telefone, email digitados no formulário ficam visíveis nos heatmaps hoje). Recomendação: ativar para LGPD.

### 1.3 GA4 — já existe?

Não sei se a OPA tem GA4 configurado hoje. Preciso confirmar:

- [ ] **A OPA tem propriedade GA4?** Se sim, qual o **Measurement ID** (formato `G-XXXXXXXXXX`)?
- [ ] **Acesso de Editor** à propriedade para `growthcompassofc@gmail.com`
- [ ] Está vinculado ao container GTM `GTM-5XNTPNB9`?

> Se **não existe GA4**, eu crio a propriedade — mas você precisa me dar acesso de admin à conta Google Analytics da OPA para isso.

### 1.4 Meta Pixel — já existe?

A OPA roda anúncio no Meta hoje, então o Pixel deve existir.

- [ ] Qual o **Pixel ID** (16 dígitos numéricos)?
- [ ] **Acesso ao Events Manager** para `growthcompassofc@gmail.com` (perfil: Analista ou superior)
- [ ] O pixel está disparando hoje no site atual via GTM?

### 1.5 Google Ads — campanhas ativas no `/siriuba-2`

Você mencionou que **Google Ads aponta para `/siriuba-2`** hoje. Vou preservar essa URL idêntica no site novo, então as campanhas continuam funcionando sem alteração — só preciso:

- [ ] Confirmar **lista exata das URLs de destino** que estão configuradas hoje no Google Ads (com e sem barra final, variantes UTM padrão, etc.) para eu garantir paridade 1:1
- [ ] **Acesso de leitura** à conta Google Ads `growthcompassofc@gmail.com` (opcional, só pra debugar se algo der errado na virada)
- [ ] O Pixel ID do **Google Ads Conversion** (formato `AW-XXXXXXXXX`) — diferente do GA4
- [ ] **Conversion Action ID** ativo para "Lead" (formato `XXXXXXX/XXXXXXX`)

---

## PARTE 2 — Criar novo (não existe ainda)

### 2.1 Meta CAPI Access Token (server-side conversions)

O site atual só dispara Lead pelo Pixel (client-side). Isso perde 20-40% de conversões por ad blocker e iOS Safari. O site novo vai duplicar o evento via servidor (Meta Conversions API) para recuperar esses dados.

**Como gerar** (no Events Manager):
1. Events Manager → seu Pixel → Settings
2. Procurar "Set up Conversions API"
3. "Generate access token" → escolher "Long-lived" (não expira)
4. Copiar token e me passar via canal seguro (1Password, Bitwarden, ou similar — **não pelo chat**)

- [ ] **Meta CAPI Access Token** gerado e armazenado em local seguro

### 2.2 GA4 Measurement Protocol API Secret

Mesmo motivo do CAPI: dispara conversões pelo servidor para o GA4 também.

**Como gerar** (no GA4):
1. GA4 → Admin → Data Streams → escolher o stream Web
2. "Measurement Protocol API secrets" → Create
3. Nickname: `opa-site-server`
4. Copiar o **Secret Value** e me passar via canal seguro

- [ ] **GA4 API Secret** criado e armazenado em local seguro

### 2.3 Acesso à Vercel (deploy)

O site novo vai morar na Vercel.

- [ ] **Acesso à conta Vercel** da OPA (ou criar conta nova se não houver) — preciso para fazer deploy e cadastrar as variáveis de ambiente sensíveis (tokens acima)

---

## PARTE 3 — Decisões de negócio

Coisas pra você decidir, não precisa de credencial:

### 3.1 Email destino dos leads

- [ ] **Email que recebe os leads hoje** (deve ser o mesmo do filtro Gmail "Siriuba 2 leads"). Vou usar idêntico no novo site para você não perder a organização da caixa.

### 3.2 Domínio de envio (Resend)

Hoje os emails saem de `onboarding@resend.dev` (genérico do Resend). Recomendação:

- [ ] Configurar **domínio verificado no Resend** (ex: `noreply@opailhabela.com.br`). Aumenta deliverability — sem isso, leads vão pra spam com mais frequência.

> Se quiser, eu cuido da config técnica (DNS, SPF, DKIM) — só preciso de acesso ao painel do domínio da OPA (Registro.br ou onde estiver hospedado).

### 3.3 LGPD / Cookie Consent — texto e termos

O banner de cookies já está no site novo (mesmo texto do atual). Confirma:

- [ ] **Tem Política de Privacidade publicada?** URL? Se não tiver, sugiro criar uma página `/politica-de-privacidade` no novo site — eu rascunho o texto se quiser.
- [ ] Quer adicionar botão "Rejeitar cookies"? Hoje só tem "Aceitar". É opcional, mas mais LGPD-friendly.

---

## PARTE 4 — O que eu faço quando você me entregar isso

1. Cadastro os tokens na Vercel (envs criptografadas, não ficam no código)
2. Implemento Meta CAPI + GA4 Measurement Protocol no servidor (~2h trabalho)
3. Configuro container GTM novo com os eventos:
   - `page_view` (Custom Event, substitui o Page View padrão)
   - `lead_form_open`, `lead_form_step`, `lead_form_submit`
   - `click_whatsapp`, `virtual_tour_view`, `virtual_tour_start`
   - `scroll_depth`, `engagement_time`, `web_vitals`
   - `consent_update`
4. Exporto o container atualizado como `.json` e te mando para você importar e publicar
5. Testamos juntos com GTM Preview + Meta Test Events + GA4 DebugView
6. Quando tudo bater, troca de domínio: `exclusivo.opailhabela.com.br` aponta pro Next.js novo

---

## Prioridades (se for difícil conseguir tudo de uma vez)

| Prioridade | Item | Sem isso, o que perdemos |
|---|---|---|
| **CRÍTICO** | Acesso GTM `GTM-5XNTPNB9` | Nenhum evento chega no GA4 nem no Meta |
| **CRÍTICO** | Pixel ID atual | Não conseguimos rastrear conversões nas campanhas Meta |
| **CRÍTICO** | Google Ads Conversion ID + Conversion Action | As campanhas atuais perdem o sinal de conversão |
| **ALTO** | GA4 Measurement ID + acesso | Sem GA4 não temos relatório consolidado |
| **ALTO** | Meta CAPI Token | Perdemos 20-40% de conversões por ad blocker |
| **MÉDIO** | GA4 API Secret | Idem CAPI, mas para GA4 |
| **MÉDIO** | Clarity access | Não conseguimos analisar heatmap/gravações no novo domínio |
| **BAIXO** | Domínio Resend verificado | Leads no spam com mais frequência (mas chegam) |

---

## Resumo do que enviar

Mande tudo em **um único arquivo** (1Password, Bitwarden, Google Doc protegido por senha — não pelo WhatsApp/email direto):

```
GTM Container ID:       GTM-5XNTPNB9 (já tenho)
Meta Pixel ID:          ____________________
Meta CAPI Token:        ____________________
GA4 Measurement ID:     G-__________________
GA4 API Secret:         ____________________
Google Ads ID:          AW-_________________
Google Ads Conv Action: __________/_________
Email destino leads:    ____________________
URLs Google Ads ativas: (lista)
```

Acessos a conceder (`growthcompassofc@gmail.com`):
- [ ] GTM Editor
- [ ] GA4 Editor
- [ ] Meta Events Manager Analyst
- [ ] Microsoft Clarity Team Member
- [ ] Google Ads Standard Access
- [ ] Vercel (Admin do projeto)
