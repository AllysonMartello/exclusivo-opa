import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { serverEnv } from "@/lib/env";

export const runtime = "nodejs";

// Mapa unico de site -> label exibido no email e no subject.
// Fonte da verdade — clients mandam apenas `site`, nao `subject`.
const SITE_LABELS = {
  "siriuba-2": "Siriúba 2",
  "morro-da-cruz": "Morro da Cruz",
  "composicao-opa": "Composição Opa",
  "lancamento-opa-imovel": "Lançamento Opa — Imóvel",
  "lancamento-opa-empreendimento": "Lançamento Opa — Empreendimento",
  "cadastro-imovel": "Cadastro de Imóvel — Proprietário",
} as const;

type SiteKey = keyof typeof SITE_LABELS;

const leadSchema = z.object({
  site: z.enum(Object.keys(SITE_LABELS) as [SiteKey, ...SiteKey[]]).optional(),
  origin: z.string().optional(),
  receivedAt: z.string().optional(),
  nome: z.string().min(1, "Nome obrigatório"),
  telefone: z.string().min(1, "Telefone obrigatório"),
  email: z.string().email().optional().or(z.literal("")),
  cidade: z.string().optional().default(""),
  answers: z.record(z.string(), z.string()).optional(),
  // event_id (UUID gerado no client) — preservado para deduplicação client↔server
  // quando a Fase A (Meta CAPI + GA4 MP) for ativada.
  event_id: z.string().optional(),
  // honeypot anti-bot — campo invisível, se vier preenchido descartamos
  website: z.string().optional(),
});

type LeadPayload = z.infer<typeof leadSchema>;

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const renderHtml = (p: LeadPayload, siteLabel: string) => {
  const row = (k: string, v: string) =>
    `<tr><td style="padding:6px 12px;border-bottom:1px solid #eee;font-weight:600;white-space:nowrap;">${escapeHtml(k)}</td><td style="padding:6px 12px;border-bottom:1px solid #eee;">${escapeHtml(v)}</td></tr>`;

  const answerRows = p.answers
    ? Object.entries(p.answers).map(([k, v]) => row(k, v)).join("")
    : "";

  return `<!doctype html>
<html><body style="font-family:system-ui,-apple-system,sans-serif;color:#111;max-width:640px;margin:0 auto;padding:24px;">
  <h2 style="margin:0 0 8px;">Novo lead — ${escapeHtml(siteLabel)}</h2>
  <p style="color:#555;margin:0 0 16px;">${escapeHtml(p.origin ?? "")} · ${escapeHtml(p.receivedAt ?? "")}</p>
  <table style="width:100%;border-collapse:collapse;font-size:14px;">
    ${row("Nome", p.nome)}
    ${row("Telefone", p.telefone)}
    ${p.email ? row("E-mail", p.email) : ""}
    ${row("Cidade", p.cidade)}
    ${answerRows}
  </table>
</body></html>`;
};

// rate limit in-memory simples — 6 reqs por minuto por IP
const hits = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000;
const MAX_HITS = 6;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now > rec.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  rec.count += 1;
  if (rec.count > MAX_HITS) return true;
  return false;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Muitas tentativas. Tente novamente em 1 minuto." }, { status: 429 });
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Campos inválidos", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const body = parsed.data;

  // honeypot: bots preenchem todos os campos. Respondemos 200 mas não enviamos.
  if (body.website && body.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  if (!serverEnv.RESEND_API_KEY || !serverEnv.LEAD_TO_EMAIL) {
    // Em desenvolvimento local sem credenciais Resend, aceitamos o lead mas
    // só logamos para inspeção — não falhamos.
    console.warn("[api/lead] RESEND_API_KEY/LEAD_TO_EMAIL ausentes; lead aceito mas não enviado por email.", {
      nome: body.nome,
      telefone: body.telefone,
      cidade: body.cidade,
    });
    return NextResponse.json({ ok: true, dryRun: true });
  }

  const siteLabel = body.site ? SITE_LABELS[body.site] : "Siriúba 2";

  const resend = new Resend(serverEnv.RESEND_API_KEY);
  const replyTo = body.email && body.email.length > 0 ? body.email : undefined;

  try {
    const { error } = await resend.emails.send({
      from: `OPA Leads <onboarding@resend.dev>`,
      to: [serverEnv.LEAD_TO_EMAIL],
      subject: `[SITE ${siteLabel}] Novo lead — ${body.nome}`,
      html: renderHtml(body, siteLabel),
      ...(replyTo ? { replyTo } : {}),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ ok: false, error: "Falha no envio" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ ok: false, error: "Erro inesperado" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: false, error: "Method not allowed" }, { status: 405 });
}
