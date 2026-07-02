"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronRight, ChevronLeft, Check, Send, Phone, User, MapPin, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useT } from "../_i18n/LanguageContext";
import { pushLeadFormOpen, pushLeadFormStep, pushLeadSubmit, generateEventId } from "@/lib/analytics";

const FORM_ID = "lead-form-engenho-CA006944";

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MULTI_STEP_INDEX = 1;

const maskPhoneBR = (raw: string) => {
  const d = raw.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};

const isValidPhoneBR = (v: string) => v.replace(/\D/g, "").length >= 10;

const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

export default function LeadFormModal({ isOpen, onClose }: LeadFormModalProps) {
  const t = useT();
  const router = useRouter();
  const stepCount = t.leadForm.steps.length;
  const FINAL_STEP_INDEX = stepCount - 1;
  const getStepType = (i: number): "single" | "multi" | "final" =>
    i === FINAL_STEP_INDEX ? "final" : i === MULTI_STEP_INDEX ? "multi" : "single";
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    email: "",
    cidade: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ nome?: string; telefone?: string; email?: string; cidade?: string }>({});

  const emailIsRequired = (() => {
    const target = t.leadForm.contactMethodEmail;
    if (!target) return false;
    return Object.values(answers).some((a) => a === target);
  })();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previousActive = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    pushLeadFormOpen(FORM_ID);
    previousActive.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      previousActive.current?.focus?.();
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    pushLeadFormStep(FORM_ID, currentStep);
  }, [currentStep, isOpen]);

  const handleOptionSelect = (option: string) => {
    const stepType = getStepType(currentStep);
    if (stepType === "single") {
      setAnswers({ ...answers, [currentStep]: option });
      setTimeout(() => nextStep(), 300);
    } else if (stepType === "multi") {
      const currentAnswers = answers[currentStep] || [];
      const newAnswers = currentAnswers.includes(option)
        ? currentAnswers.filter((a: string) => a !== option)
        : [...currentAnswers, option];
      setAnswers({ ...answers, [currentStep]: newAnswers });
    }
  };

  const nextStep = () => {
    if (currentStep < stepCount - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const newErrors: typeof errors = {};
    if (formData.nome.trim().length < 2) newErrors.nome = t.leadForm.errors?.name ?? "Informe seu nome";
    if (!isValidPhoneBR(formData.telefone)) newErrors.telefone = t.leadForm.errors?.phone ?? "Telefone inválido";
    const emailTrimmed = formData.email.trim();
    if (emailIsRequired && !emailTrimmed) {
      newErrors.email = t.leadForm.errors?.emailRequired ?? "Informe seu e-mail";
    } else if (emailTrimmed && !isValidEmail(emailTrimmed)) {
      newErrors.email = t.leadForm.errors?.email ?? "E-mail inválido";
    }
    if (formData.cidade.trim().length < 2) newErrors.cidade = t.leadForm.errors?.city ?? "Informe sua cidade";
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setSubmitError(null);
    setIsSubmitting(true);

    const answersMap: Record<string, string> = {};
    t.leadForm.steps.forEach((step, i) => {
      if (getStepType(i) !== "final") {
        const answer = answers[i];
        if (answer) {
          answersMap[step.question] = Array.isArray(answer) ? answer.join(", ") : answer;
        }
      }
    });

    const eventId = generateEventId();
    const payload = {
      site: "engenho-CA006944",
      origin: "Landing Page Engenho D’Água (exclusivo.opailhabela.com.br/engenho-CA006944)",
      receivedAt: new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }),
      nome: formData.nome,
      telefone: formData.telefone,
      email: formData.email.trim(),
      cidade: formData.cidade,
      answers: answersMap,
      event_id: eventId,
    };

    let ok = false;
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(payload),
      });
      ok = res.ok;
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
    }

    if (!ok) {
      setIsSubmitting(false);
      setSubmitError(
        t.leadForm.errors?.submit ??
          "Não foi possível enviar agora. Tente novamente em instantes ou fale com a gente pelo WhatsApp."
      );
      return;
    }

    pushLeadSubmit({
      form_id: FORM_ID,
      lead_name: formData.nome,
      lead_phone: formData.telefone,
      lead_city: formData.cidade,
      lead_email: formData.email.trim() || undefined,
      event_id: eventId,
    });

    try {
      sessionStorage.setItem("lead_submitted", "1");
      sessionStorage.setItem("lead_eventID", eventId);
    } catch {
      // sessionStorage indisponível (modo privado) — segue o fluxo
    }

    setIsSubmitting(false);
    onClose();
    router.push("/engenho-CA006944/obrigado");
  };

  const progress = ((currentStep + 1) / stepCount) * 100;
  const currentStepData = t.leadForm.steps[currentStep];
  const currentStepType = getStepType(currentStep);
  const showSubtitle = currentStepType === "multi";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-primary-1/80 backdrop-blur-md"
          />
          
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-form-title"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white w-full max-w-2xl rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col max-h-[85dvh]"
          >
            {/* Header */}
            <div className="p-4 md:p-8 flex items-center justify-between border-b border-primary-1/5 shrink-0">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-primary-2/10 rounded-full flex items-center justify-center text-primary-2 shrink-0">
                  <span className="font-bold text-xs md:text-sm">{currentStep + 1}/{stepCount}</span>
                </div>
                <h3 id="lead-form-title" className="font-serif text-primary-1 text-lg md:text-xl truncate">{t.leadForm.headerTitle}</h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label={t.leadForm.closeLabel ?? "Fechar"}
                className="p-2 hover:bg-primary-1/5 rounded-full transition-colors text-primary-1/40 hover:text-primary-1 shrink-0"
              >
                <X size={20} className="md:w-6 md:h-6" aria-hidden="true" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="h-1.5 w-full bg-primary-1/5 shrink-0">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-primary-2"
              />
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5 md:p-12" style={{ WebkitOverflowScrolling: 'touch' }}>
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    <div>
                      <h4 className="text-2xl md:text-3xl font-serif text-primary-1 mb-2 leading-tight">
                        {currentStepData.question}
                      </h4>
                      {showSubtitle && (
                        <p className="text-primary-1/40 text-sm italic">{t.leadForm.multiHint}</p>
                      )}
                    </div>

                    {currentStepType === "final" ? (
                      <form
                        id="lead-form-engenho-CA006944"
                        name="lead-form-engenho-CA006944"
                        onSubmit={handleSubmit}
                        className="lead-form space-y-6"
                        data-form-name="lead-engenho-CA006944"
                      >
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="lf-nome" className="sr-only">{t.leadForm.namePlaceholder}</label>
                            <div className="relative">
                              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-1/30" size={20} aria-hidden="true" />
                              <input
                                id="lf-nome"
                                required
                                type="text"
                                autoComplete="name"
                                aria-invalid={!!errors.nome}
                                aria-describedby={errors.nome ? "lf-nome-err" : undefined}
                                placeholder={t.leadForm.namePlaceholder}
                                value={formData.nome}
                                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                                className={`w-full pl-12 pr-4 py-4 rounded-2xl bg-primary-1/5 border-2 outline-none transition-colors text-primary-1 font-medium ${errors.nome ? "border-red-500" : "border-transparent focus:border-primary-2"}`}
                              />
                            </div>
                            {errors.nome && <p id="lf-nome-err" className="text-red-600 text-xs mt-1 ml-2">{errors.nome}</p>}
                          </div>
                          <div>
                            <label htmlFor="lf-tel" className="sr-only">{t.leadForm.phonePlaceholder}</label>
                            <div className="relative">
                              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-1/30" size={20} aria-hidden="true" />
                              <input
                                id="lf-tel"
                                required
                                type="tel"
                                inputMode="tel"
                                autoComplete="tel"
                                aria-invalid={!!errors.telefone}
                                aria-describedby={errors.telefone ? "lf-tel-err" : undefined}
                                placeholder={t.leadForm.phonePlaceholder}
                                value={formData.telefone}
                                onChange={(e) => setFormData({ ...formData, telefone: maskPhoneBR(e.target.value) })}
                                className={`w-full pl-12 pr-4 py-4 rounded-2xl bg-primary-1/5 border-2 outline-none transition-colors text-primary-1 font-medium ${errors.telefone ? "border-red-500" : "border-transparent focus:border-primary-2"}`}
                              />
                            </div>
                            {errors.telefone && <p id="lf-tel-err" className="text-red-600 text-xs mt-1 ml-2">{errors.telefone}</p>}
                          </div>
                          <div>
                            <label htmlFor="lf-email" className="sr-only">{emailIsRequired ? t.leadForm.emailPlaceholder : t.leadForm.emailPlaceholderOptional}</label>
                            <div className="relative">
                              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-1/30" size={20} aria-hidden="true" />
                              <input
                                id="lf-email"
                                required={emailIsRequired}
                                type="email"
                                inputMode="email"
                                autoComplete="email"
                                aria-invalid={!!errors.email}
                                aria-describedby={errors.email ? "lf-email-err" : undefined}
                                placeholder={emailIsRequired ? t.leadForm.emailPlaceholder : t.leadForm.emailPlaceholderOptional}
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className={`w-full pl-12 pr-4 py-4 rounded-2xl bg-primary-1/5 border-2 outline-none transition-colors text-primary-1 font-medium ${errors.email ? "border-red-500" : "border-transparent focus:border-primary-2"}`}
                              />
                            </div>
                            {errors.email && <p id="lf-email-err" className="text-red-600 text-xs mt-1 ml-2">{errors.email}</p>}
                          </div>
                          <div>
                            <label htmlFor="lf-cidade" className="sr-only">{t.leadForm.cityPlaceholder}</label>
                            <div className="relative">
                              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-1/30" size={20} aria-hidden="true" />
                              <input
                                id="lf-cidade"
                                required
                                type="text"
                                autoComplete="address-level2"
                                aria-invalid={!!errors.cidade}
                                aria-describedby={errors.cidade ? "lf-cid-err" : undefined}
                                placeholder={t.leadForm.cityPlaceholder}
                                value={formData.cidade}
                                onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                                className={`w-full pl-12 pr-4 py-4 rounded-2xl bg-primary-1/5 border-2 outline-none transition-colors text-primary-1 font-medium ${errors.cidade ? "border-red-500" : "border-transparent focus:border-primary-2"}`}
                              />
                            </div>
                            {errors.cidade && <p id="lf-cid-err" className="text-red-600 text-xs mt-1 ml-2">{errors.cidade}</p>}
                          </div>
                        </div>
                        {submitError && (
                          <p role="alert" className="text-red-600 text-sm text-center -mt-2">
                            {submitError}
                          </p>
                        )}
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-primary-2 text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-primary-2/90 transition-colors shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (t.leadForm.submittingLabel ?? "Enviando...") : t.leadForm.submitLabel}
                          {!isSubmitting && <Send size={20} aria-hidden="true" />}
                        </button>
                      </form>
                    ) : (
                      <div className="grid grid-cols-1 gap-3">
                        {currentStepData.options?.map((option) => {
                          const isSelected = currentStepType === "multi"
                            ? (answers[currentStep] || []).includes(option)
                            : answers[currentStep] === option;

                          return (
                            <button
                              key={option}
                              onClick={() => handleOptionSelect(option)}
                              className={`group flex items-center justify-between p-5 rounded-2xl border-2 transition-all text-left ${
                                isSelected 
                                  ? "bg-primary-1 border-primary-1 text-white shadow-lg" 
                                  : "bg-primary-1/5 border-transparent hover:border-primary-2/30 text-primary-1"
                              }`}
                            >
                              <span className="font-medium">{option}</span>
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                isSelected 
                                  ? "bg-primary-2 border-primary-2 text-white" 
                                  : "border-primary-1/10 group-hover:border-primary-2/50"
                              }`}>
                                {isSelected && <Check size={14} strokeWidth={4} />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center space-y-6 py-12"
                  >
                    <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                      <Check size={48} strokeWidth={3} />
                    </div>
                    <h4 className="text-3xl font-serif text-primary-1">{t.leadForm.successTitle}</h4>
                    <p className="text-text-sec text-lg max-w-sm">
                      {t.leadForm.successBody}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {!isSubmitted && (
              <div className="p-6 md:p-8 bg-primary-1/5 flex items-center justify-between">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className={`flex items-center gap-2 font-bold text-sm uppercase tracking-widest transition-all ${
                    currentStep === 0 ? "opacity-0 pointer-events-none" : "text-primary-1/40 hover:text-primary-1"
                  }`}
                >
                  <ChevronLeft size={20} /> {t.leadForm.backLabel}
                </button>

                {currentStepType === "multi" && (
                  <button
                    onClick={nextStep}
                    disabled={(answers[currentStep] || []).length === 0}
                    className={`flex items-center gap-2 bg-primary-1 text-white px-8 py-3 rounded-xl font-bold text-sm uppercase tracking-widest transition-all hover:bg-primary-1/90 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {t.leadForm.continueLabel} <ChevronRight size={20} />
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
