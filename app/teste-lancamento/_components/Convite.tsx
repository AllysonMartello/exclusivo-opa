"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, User, Phone, MapPin, Sparkles, Check } from "lucide-react";
import { useT } from "../_i18n/LanguageContext";
import { pushLeadSubmit, generateEventId } from "@/lib/analytics";

const FORM_ID = "lead-form-teste-lancamento";

const maskPhoneBR = (raw: string) => {
  const d = raw.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};

const isValidPhoneBR = (v: string) => v.replace(/\D/g, "").length >= 10;

export default function Convite() {
  const t = useT();
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    localizacao: "",
    especial: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const newErrors: typeof errors = {};
    if (formData.nome.trim().length < 2) newErrors.nome = t.convite.errors.nome;
    if (!isValidPhoneBR(formData.telefone)) newErrors.telefone = t.convite.errors.telefone;
    if (formData.localizacao.trim().length < 2) newErrors.localizacao = t.convite.errors.localizacao;
    if (formData.especial.trim().length < 2) newErrors.especial = t.convite.errors.especial;

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitError(null);
    setIsSubmitting(true);

    const eventId = generateEventId();
    const payload = {
      site: "teste-lancamento",
      origin: "Landing Page Teste Lançamento (exclusivo.opailhabela.com.br/teste-lancamento)",
      receivedAt: new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }),
      nome: formData.nome,
      telefone: formData.telefone,
      email: "",
      cidade: formData.localizacao,
      answers: {
        [t.convite.fields.localizacao]: formData.localizacao,
        [t.convite.fields.especial]: formData.especial,
      },
      event_id: eventId,
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
      setSubmitError(t.convite.errors.submit);
      return;
    }

    pushLeadSubmit({
      form_id: FORM_ID,
      lead_name: formData.nome,
      lead_phone: formData.telefone,
      lead_city: formData.localizacao,
      event_id: eventId,
    });

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const inputClass = (hasError: boolean) =>
    `w-full pl-12 pr-4 py-4 rounded-2xl bg-white border-2 outline-none transition-colors text-primary-1 font-medium placeholder:text-primary-1/30 ${
      hasError ? "border-red-500" : "border-transparent focus:border-primary-2"
    }`;

  return (
    <section id="contato" className="py-20 md:py-32 bg-bg-alt relative overflow-hidden">
      <div className="hidden md:block absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-30 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-2/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-14"
        >
          <span className="text-primary-2 uppercase tracking-[0.4em] text-xs font-bold mb-4 block">
            {t.convite.eyebrow}
          </span>
          <h2 className="section-title text-3xl sm:text-4xl md:text-5xl font-serif text-primary-1 leading-tight">
            {t.convite.title}
          </h2>
          <p className="text-text-sec text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            {t.convite.subtitle}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.form
              key="form"
              id={FORM_ID}
              name={FORM_ID}
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white/60 backdrop-blur-md rounded-[2rem] p-6 md:p-10 shadow-xl border border-white space-y-5"
            >
              <div>
                <label htmlFor="tl-nome" className="block text-sm font-medium text-primary-1/70 mb-2 ml-2">
                  {t.convite.fields.nome}
                </label>
                <div className="relative">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-1/30"
                    size={20}
                    aria-hidden="true"
                  />
                  <input
                    id="tl-nome"
                    required
                    type="text"
                    autoComplete="name"
                    aria-invalid={!!errors.nome}
                    placeholder={t.convite.placeholders.nome}
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className={inputClass(!!errors.nome)}
                  />
                </div>
                {errors.nome && <p className="text-red-600 text-xs mt-1 ml-2">{errors.nome}</p>}
              </div>

              <div>
                <label htmlFor="tl-tel" className="block text-sm font-medium text-primary-1/70 mb-2 ml-2">
                  {t.convite.fields.telefone}
                </label>
                <div className="relative">
                  <Phone
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-1/30"
                    size={20}
                    aria-hidden="true"
                  />
                  <input
                    id="tl-tel"
                    required
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    aria-invalid={!!errors.telefone}
                    placeholder={t.convite.placeholders.telefone}
                    value={formData.telefone}
                    onChange={(e) =>
                      setFormData({ ...formData, telefone: maskPhoneBR(e.target.value) })
                    }
                    className={inputClass(!!errors.telefone)}
                  />
                </div>
                {errors.telefone && (
                  <p className="text-red-600 text-xs mt-1 ml-2">{errors.telefone}</p>
                )}
              </div>

              <div>
                <label htmlFor="tl-loc" className="block text-sm font-medium text-primary-1/70 mb-2 ml-2">
                  {t.convite.fields.localizacao}
                </label>
                <div className="relative">
                  <MapPin
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-1/30"
                    size={20}
                    aria-hidden="true"
                  />
                  <input
                    id="tl-loc"
                    required
                    type="text"
                    aria-invalid={!!errors.localizacao}
                    placeholder={t.convite.placeholders.localizacao}
                    value={formData.localizacao}
                    onChange={(e) => setFormData({ ...formData, localizacao: e.target.value })}
                    className={inputClass(!!errors.localizacao)}
                  />
                </div>
                {errors.localizacao && (
                  <p className="text-red-600 text-xs mt-1 ml-2">{errors.localizacao}</p>
                )}
              </div>

              <div>
                <label htmlFor="tl-esp" className="block text-sm font-medium text-primary-1/70 mb-2 ml-2">
                  {t.convite.fields.especial}
                </label>
                <div className="relative">
                  <Sparkles
                    className="absolute left-4 top-4 text-primary-1/30"
                    size={20}
                    aria-hidden="true"
                  />
                  <textarea
                    id="tl-esp"
                    required
                    rows={4}
                    aria-invalid={!!errors.especial}
                    placeholder={t.convite.placeholders.especial}
                    value={formData.especial}
                    onChange={(e) => setFormData({ ...formData, especial: e.target.value })}
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl bg-white border-2 outline-none transition-colors text-primary-1 font-medium placeholder:text-primary-1/30 resize-none ${
                      errors.especial ? "border-red-500" : "border-transparent focus:border-primary-2"
                    }`}
                  />
                </div>
                {errors.especial && (
                  <p className="text-red-600 text-xs mt-1 ml-2">{errors.especial}</p>
                )}
              </div>

              {submitError && (
                <p role="alert" className="text-red-600 text-sm text-center">
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-1 hover:bg-primary-1/90 text-white py-5 rounded-2xl font-bold text-base md:text-lg flex items-center justify-center gap-3 transition-colors shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? t.convite.submittingLabel : t.convite.submitLabel}
                {!isSubmitting && <Send size={20} aria-hidden="true" />}
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-[2rem] p-10 md:p-16 shadow-xl text-center space-y-6"
            >
              <div className="w-20 h-20 bg-primary-2/15 text-primary-1 rounded-full flex items-center justify-center mx-auto">
                <Check size={40} strokeWidth={2.5} />
              </div>
              <h3 className="text-4xl md:text-5xl font-serif text-primary-1 leading-tight">
                {t.convite.successTitle}
              </h3>
              <p className="text-text-sec text-lg md:text-xl max-w-md mx-auto leading-relaxed">
                {t.convite.successBody}
              </p>
              <p className="text-primary-2 text-base font-medium tracking-wide pt-2">
                {t.convite.successSignature}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
