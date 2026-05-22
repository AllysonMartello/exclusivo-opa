"use client";

import { FormEvent, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Check } from "lucide-react";
import FadeIn from "./FadeIn";
import { generateEventId, pushLeadFormOpen, pushLeadSubmit } from "@/lib/analytics";

const FORM_ID = "lead-form-captacao-exclusiva";

const maskPhoneBR = (raw: string) => {
  const d = raw.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};

const isValidPhoneBR = (v: string) => v.replace(/\D/g, "").length >= 10;

type Errors = Partial<Record<"nome" | "telefone" | "cidade" | "detalhes", string>>;

export default function Convite() {
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    cidade: "",
    detalhes: "",
  });
  const [website, setWebsite] = useState(""); // honeypot
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [hasOpened, setHasOpened] = useState(false);

  const onFocusOnce = () => {
    if (hasOpened) return;
    setHasOpened(true);
    pushLeadFormOpen(FORM_ID);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const next: Errors = {};
    if (formData.nome.trim().length < 2) next.nome = "Como você se chama?";
    if (!isValidPhoneBR(formData.telefone)) next.telefone = "Telefone com DDD";
    if (formData.cidade.trim().length < 2) next.cidade = "Bairro ou localidade do imóvel";
    if (formData.detalhes.trim().length < 3) next.detalhes = "Conte um pouco sobre o imóvel";
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }
    setErrors({});
    setSubmitError(null);
    setIsSubmitting(true);

    const eventId = generateEventId();
    const payload = {
      site: "captacao-exclusiva" as const,
      origin:
        "Landing Page Captação Exclusiva (exclusivo.opailhabela.com.br/captacao-exclusiva)",
      receivedAt: new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }),
      nome: formData.nome.trim(),
      telefone: formData.telefone,
      email: "",
      cidade: formData.cidade.trim(),
      answers: { "O que torna esse imóvel especial?": formData.detalhes.trim() },
      event_id: eventId,
      website,
    };

    let ok = false;
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      ok = res.ok;
    } catch (err) {
      console.error("Erro ao enviar formulário:", err);
    }

    if (!ok) {
      setIsSubmitting(false);
      setSubmitError(
        "Não conseguimos enviar agora. Tente novamente em instantes ou fale com a gente pelo WhatsApp."
      );
      return;
    }

    pushLeadSubmit({
      form_id: FORM_ID,
      lead_name: formData.nome.trim(),
      lead_phone: formData.telefone,
      lead_city: formData.cidade.trim(),
      event_id: eventId,
    });

    try {
      sessionStorage.setItem("lead_submitted", "1");
      sessionStorage.setItem("lead_eventID", eventId);
    } catch {
      // sessionStorage indisponível
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <section id="convite" className="relative bg-primary-1 text-white py-28 md:py-40 overflow-hidden">
      {/* Fundo aéreo de Ilhabela em baixa opacidade */}
      <div className="absolute inset-0">
        <img
          src="https://picsum.photos/seed/opa-aerea-ilhabela/1920/1200"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-primary-1 via-primary-1/85 to-primary-1" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-10">
        <div className="text-center">
          <FadeIn>
            <span className="text-primary-2 uppercase tracking-[0.32em] text-[11px] font-semibold">
              Bloco 07 · Convite
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-[56px] leading-[1.08] mt-8 tracking-tight">
              Seu imóvel tem o perfil certo para a OPA?
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 text-white/70 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              Preencha abaixo. Analisamos pessoalmente e retornamos em até 24 horas.
            </p>
          </FadeIn>
        </div>

        <div className="mt-14 md:mt-20">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                onFocus={onFocusOnce}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                className="bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-[32px] p-7 md:p-12 space-y-6"
                noValidate
              >
                {/* honeypot — escondido visualmente, anti-bot */}
                <div className="hidden" aria-hidden="true">
                  <label>
                    Website
                    <input
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </label>
                </div>

                <Field
                  label="Como você se chama?"
                  id="cap-nome"
                  type="text"
                  autoComplete="name"
                  value={formData.nome}
                  onChange={(v) => setFormData({ ...formData, nome: v })}
                  error={errors.nome}
                />
                <Field
                  label="Qual seu telefone?"
                  id="cap-tel"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  value={formData.telefone}
                  onChange={(v) => setFormData({ ...formData, telefone: maskPhoneBR(v) })}
                  error={errors.telefone}
                  placeholder="(11) 99999-0000"
                />
                <Field
                  label="Onde fica o imóvel?"
                  id="cap-cidade"
                  type="text"
                  autoComplete="address-level2"
                  value={formData.cidade}
                  onChange={(v) => setFormData({ ...formData, cidade: v })}
                  error={errors.cidade}
                  placeholder="Bairro · região · Ilhabela"
                />

                <div>
                  <label
                    htmlFor="cap-detalhes"
                    className="block text-[11px] uppercase tracking-[0.28em] text-white/55 mb-3"
                  >
                    O que torna esse imóvel especial?
                  </label>
                  <textarea
                    id="cap-detalhes"
                    value={formData.detalhes}
                    onChange={(e) => setFormData({ ...formData, detalhes: e.target.value })}
                    rows={4}
                    placeholder="Vista, localização, arquitetura, momento — o que vier."
                    aria-invalid={!!errors.detalhes}
                    className={`w-full bg-white/[0.06] border ${
                      errors.detalhes ? "border-alert/60" : "border-white/15"
                    } focus:border-primary-2 outline-none rounded-2xl px-5 py-4 text-white placeholder-white/30 text-[15px] leading-relaxed transition-colors resize-none`}
                  />
                  {errors.detalhes && (
                    <p className="text-alert/90 text-xs mt-2 ml-1">{errors.detalhes}</p>
                  )}
                </div>

                {submitError && (
                  <p role="alert" className="text-alert text-sm text-center">
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="pulse-soft w-full bg-white text-primary-1 hover:bg-primary-2 hover:text-white px-8 py-5 rounded-2xl text-base md:text-lg font-medium flex items-center justify-center gap-3 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Enviando…" : "Quero que a OPA veja meu imóvel"}
                  {!isSubmitting && <Send size={18} />}
                </button>

                <p className="text-center text-[11px] uppercase tracking-[0.28em] text-white/35">
                  Análise pessoal · resposta em até 24h
                </p>
              </motion.form>
            ) : (
              <motion.div
                key="thanks"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-[32px] p-10 md:p-14 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary-2/20 text-primary-2 flex items-center justify-center mx-auto mb-8">
                  <Check size={28} strokeWidth={2} />
                </div>
                <h3 className="font-serif text-2xl md:text-3xl text-white mb-4 leading-tight">
                  Recebi. Vamos olhar com atenção e retornar até amanhã.
                </h3>
                <p className="text-primary-2 text-sm uppercase tracking-[0.3em]">
                  — OPA Ilhabela
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

type FieldProps = {
  label: string;
  id: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
  inputMode?: React.InputHTMLAttributes<HTMLInputElement>["inputMode"];
  placeholder?: string;
  error?: string;
};

function Field({
  label,
  id,
  type,
  value,
  onChange,
  autoComplete,
  inputMode,
  placeholder,
  error,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[11px] uppercase tracking-[0.28em] text-white/55 mb-3"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        inputMode={inputMode}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={!!error}
        className={`w-full bg-white/[0.06] border ${
          error ? "border-alert/60" : "border-white/15"
        } focus:border-primary-2 outline-none rounded-2xl px-5 py-4 text-white placeholder-white/30 text-[15px] transition-colors`}
      />
      {error && <p className="text-alert/90 text-xs mt-2 ml-1">{error}</p>}
    </div>
  );
}
