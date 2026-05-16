"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, Check, Send, Lock } from "lucide-react";
import {
  pushLeadFormOpen,
  pushLeadFormStep,
  pushLeadSubmit,
  pushClickWhatsApp,
  generateEventId,
} from "@/lib/analytics";

export type LeadFormVariant = "imovel" | "empreendimento";

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  variant: LeadFormVariant;
}

type StepKind = "contact" | "options" | "text" | "textarea";

interface Step {
  id: string;
  kind: StepKind;
  question: string;
  hint?: string;
  options?: string[];
  placeholder?: string;
  optional?: boolean;
}

const CONTACT_STEP: Step = {
  id: "contato",
  kind: "contact",
  question: "Vamos começar pelo básico.",
  hint: "Como podemos te chamar e onde te encontramos.",
};

const STEPS_IMOVEL: Step[] = [
  CONTACT_STEP,
  {
    id: "tipo",
    kind: "options",
    question: "Qual o tipo do imóvel?",
    options: ["Casa", "Apartamento", "Terreno", "Cobertura", "Outro"],
  },
  {
    id: "localizacao",
    kind: "text",
    question: "Onde o imóvel está localizado?",
    hint: "Bairro e cidade.",
    placeholder: "Ex.: Praia do Curral, Ilhabela",
  },
  {
    id: "metragem",
    kind: "text",
    question: "Qual a metragem aproximada?",
    hint: "Terreno e área construída.",
    placeholder: "Ex.: 800m² de terreno e 320m² construídos",
  },
  {
    id: "preco",
    kind: "text",
    question: "O imóvel está no preço de quanto?",
    hint: "Valor pretendido ou avaliação existente.",
    placeholder: "Ex.: R$ 4.500.000",
  },
  {
    id: "listado",
    kind: "options",
    question: "O imóvel está listado com outros corretores ou imobiliárias atualmente?",
    options: ["Sim", "Não"],
  },
  {
    id: "tempo",
    kind: "options",
    question: "Há quanto tempo o imóvel está disponível para venda?",
    options: [
      "Ainda não foi ao mercado",
      "Menos de 6 meses",
      "6 meses a 1 ano",
      "Mais de 1 ano",
    ],
  },
  {
    id: "motivacao",
    kind: "textarea",
    question: "O que te motivou a buscar uma abordagem diferente para a venda?",
    hint: "Campo opcional. Conte com suas palavras.",
    placeholder: "Opcional",
    optional: true,
  },
];

const STEPS_EMPREENDIMENTO: Step[] = [
  CONTACT_STEP,
  {
    id: "empresa",
    kind: "text",
    question: "Qual o nome da empresa ou incorporadora?",
    placeholder: "Ex.: Incorporadora XYZ",
  },
  {
    id: "tipo",
    kind: "options",
    question: "Qual o tipo do empreendimento?",
    options: [
      "Condomínio de casas",
      "Condomínio de lotes",
      "Edifício residencial",
      "Uso misto",
      "Outro",
    ],
  },
  {
    id: "localizacao",
    kind: "text",
    question: "Onde o empreendimento está localizado?",
    hint: "Bairro e cidade.",
    placeholder: "Ex.: Centro, Ilhabela",
  },
  {
    id: "estagio",
    kind: "options",
    question: "Qual o estágio atual?",
    options: [
      "Pré-lançamento (ainda em aprovação)",
      "Pronto para lançar",
      "Já lançado, com unidades paradas",
    ],
  },
  {
    id: "unidades",
    kind: "text",
    question: "Quantas unidades no total e quantas ainda disponíveis?",
    placeholder: "Ex.: 24 unidades, 9 disponíveis",
  },
  {
    id: "faixa-preco",
    kind: "text",
    question: "Qual a faixa de preço das unidades?",
    placeholder: "Ex.: R$ 1.8M a R$ 3.2M",
  },
  {
    id: "estrutura",
    kind: "options",
    question: "Já existe estrutura de vendas montada?",
    hint: "Equipe comercial, corretores parceiros, stand.",
    options: ["Sim, completa", "Parcial", "Não"],
  },
  {
    id: "motivacao",
    kind: "textarea",
    question: "O que te motivou a buscar a OPA para esse empreendimento?",
    hint: "Campo opcional. Conte com suas palavras.",
    placeholder: "Opcional",
    optional: true,
  },
];

const VARIANT_CONFIG: Record<LeadFormVariant, {
  title: string;
  steps: Step[];
  formId: string;
  formName: string;
  subject: (nome: string) => string;
  origin: string;
}> = {
  imovel: {
    title: "Aplicar meu imóvel",
    steps: STEPS_IMOVEL,
    formId: "lead-form-lancamento-imovel",
    formName: "Lead Lançamento OPA — Imóvel",
    subject: (nome) => `[Lançamento OPA] Novo lead (imóvel) — ${nome}`,
    origin: "Landing Page Lançamento OPA — Aplicar Imóvel",
  },
  empreendimento: {
    title: "Aplicar meu empreendimento",
    steps: STEPS_EMPREENDIMENTO,
    formId: "lead-form-lancamento-empreendimento",
    formName: "Lead Lançamento OPA — Empreendimento",
    subject: (nome) => `[Lançamento OPA] Novo lead (empreendimento) — ${nome}`,
    origin: "Landing Page Lançamento OPA — Aplicar Empreendimento",
  },
};

const WHATSAPP_NUMBER = "5512974068058";
const WHATSAPP_MESSAGE =
  "Olá! Acabei de aplicar pelo site do Lançamento OPA e gostaria de dar continuidade.";

const maskPhoneBR = (raw: string) => {
  const d = raw.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};

const isValidPhoneBR = (v: string) => v.replace(/\D/g, "").length >= 10;

export default function LeadFormModal({ isOpen, onClose, variant }: LeadFormModalProps) {
  const config = VARIANT_CONFIG[variant];
  const steps = config.steps;
  const stepCount = steps.length;

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [contact, setContact] = useState({ nome: "", telefone: "" });
  const [contactErrors, setContactErrors] = useState<{ nome?: string; telefone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previousActive = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    pushLeadFormOpen(config.formId);
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
  }, [isOpen, onClose, config.formId]);

  useEffect(() => {
    if (isOpen) pushLeadFormStep(config.formId, currentStep);
  }, [currentStep, isOpen, config.formId]);

  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setCurrentStep(0);
        setAnswers({});
        setContact({ nome: "", telefone: "" });
        setContactErrors({});
        setIsSubmitted(false);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / stepCount) * 100;
  const isLastStep = currentStep === stepCount - 1;

  const validateContact = () => {
    const errs: typeof contactErrors = {};
    if (contact.nome.trim().length < 2) errs.nome = "Informe seu nome completo.";
    if (!isValidPhoneBR(contact.telefone)) errs.telefone = "Telefone inválido.";
    setContactErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const canAdvance = (): boolean => {
    if (step.kind === "contact") return contact.nome.trim().length >= 2 && isValidPhoneBR(contact.telefone);
    if (step.optional) return true;
    const value = answers[step.id];
    return !!value && value.trim().length > 0;
  };

  const nextStep = () => {
    if (step.kind === "contact" && !validateContact()) return;
    if (currentStep < stepCount - 1) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleOptionSelect = (option: string) => {
    setAnswers((prev) => ({ ...prev, [step.id]: option }));
    setTimeout(() => {
      if (currentStep < stepCount - 1) setCurrentStep(currentStep + 1);
    }, 250);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const stepAnswers: Record<string, string> = {};
    steps.forEach((s) => {
      if (s.kind === "contact") return;
      const v = answers[s.id];
      if (v && v.trim().length > 0) {
        stepAnswers[s.question] = v;
      }
    });

    const eventId = generateEventId();
    try {
      sessionStorage.setItem("lead_eventID", eventId);
      sessionStorage.setItem("lead_submitted", "1");
    } catch {
      // ignore
    }

    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          origin: config.origin,
          receivedAt: new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }),
          nome: contact.nome,
          telefone: contact.telefone,
          cidade: "Ilhabela",
          subject: config.subject(contact.nome),
          answers: stepAnswers,
          event_id: eventId,
        }),
      });
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
    }

    pushLeadSubmit({
      form_id: config.formId,
      lead_name: contact.nome,
      lead_phone: contact.telefone,
      lead_city: "Ilhabela",
      event_id: eventId,
    });

    const encoded = encodeURIComponent(WHATSAPP_MESSAGE);
    pushClickWhatsApp("lancamento_form_success");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank");

    setIsSubmitted(true);
    setIsSubmitting(false);
    setTimeout(() => {
      onClose();
    }, 3200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0F2A44]/80 backdrop-blur-md"
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-form-title"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
            className="relative bg-white w-full max-w-2xl rounded-[32px] md:rounded-[40px] overflow-hidden shadow-2xl flex flex-col max-h-[88dvh]"
          >
            {/* Header */}
            <div className="px-6 md:px-10 py-5 md:py-6 flex items-center justify-between border-b border-[#F2F2F2] shrink-0">
              <div className="flex items-center gap-3 md:gap-4 min-w-0">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#2F5D82]/10 flex items-center justify-center text-[#2F5D82] shrink-0">
                  <span className="font-extrabold text-[11px] md:text-[12px] tracking-wider">
                    {currentStep + 1}/{stepCount}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] uppercase tracking-[0.2em] font-extrabold text-[#2F5D82]">
                    Aplicação
                  </p>
                  <h3
                    id="lead-form-title"
                    className="font-sans text-[#0F2A44] text-[17px] md:text-[19px] font-bold truncate"
                  >
                    {config.title}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar"
                className="p-2 hover:bg-[#F7F6F3] rounded-full transition-colors text-[#0F2A44]/40 hover:text-[#0F2A44] shrink-0"
              >
                <X size={22} aria-hidden="true" />
              </button>
            </div>

            {/* Progress */}
            <div className="h-[3px] w-full bg-[#F2F2F2] shrink-0">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                className="h-full bg-[#2F5D82]"
              />
            </div>

            {/* Content */}
            <div
              className="flex-1 overflow-y-auto px-6 md:px-12 py-8 md:py-10"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
                    className="space-y-8"
                  >
                    <div>
                      <h4 className="font-sans text-[26px] md:text-[32px] text-[#0F2A44] font-bold leading-[1.25]">
                        {step.question}
                      </h4>
                      {step.hint && (
                        <p className="mt-3 text-[15px] md:text-[16px] text-[#2B2B2B]/80 font-normal leading-relaxed">
                          {step.hint}
                        </p>
                      )}
                    </div>

                    {step.kind === "contact" && (
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="lf-nome" className="sr-only">
                            Nome completo
                          </label>
                          <input
                            id="lf-nome"
                            type="text"
                            autoComplete="name"
                            placeholder="Seu nome completo"
                            value={contact.nome}
                            onChange={(e) => setContact({ ...contact, nome: e.target.value })}
                            aria-invalid={!!contactErrors.nome}
                            className={`w-full px-5 py-4 rounded-2xl bg-[#F7F6F3] border-2 outline-none transition-colors text-[16px] text-[#0F2A44] font-semibold placeholder:text-[#0F2A44]/55 placeholder:font-medium ${
                              contactErrors.nome
                                ? "border-red-500"
                                : "border-transparent focus:border-[#2F5D82]"
                            }`}
                          />
                          {contactErrors.nome && (
                            <p className="text-red-600 text-xs mt-1 ml-2">{contactErrors.nome}</p>
                          )}
                        </div>
                        <div>
                          <label htmlFor="lf-tel" className="sr-only">
                            WhatsApp com DDD
                          </label>
                          <input
                            id="lf-tel"
                            type="tel"
                            inputMode="tel"
                            autoComplete="tel"
                            placeholder="WhatsApp com DDD"
                            value={contact.telefone}
                            onChange={(e) =>
                              setContact({ ...contact, telefone: maskPhoneBR(e.target.value) })
                            }
                            aria-invalid={!!contactErrors.telefone}
                            className={`w-full px-5 py-4 rounded-2xl bg-[#F7F6F3] border-2 outline-none transition-colors text-[16px] text-[#0F2A44] font-semibold placeholder:text-[#0F2A44]/55 placeholder:font-medium ${
                              contactErrors.telefone
                                ? "border-red-500"
                                : "border-transparent focus:border-[#2F5D82]"
                            }`}
                          />
                          {contactErrors.telefone && (
                            <p className="text-red-600 text-xs mt-1 ml-2">{contactErrors.telefone}</p>
                          )}
                        </div>
                      </div>
                    )}

                    {step.kind === "options" && (
                      <div className="grid grid-cols-1 gap-3">
                        {step.options?.map((option) => {
                          const isSelected = answers[step.id] === option;
                          return (
                            <button
                              key={option}
                              type="button"
                              onClick={() => handleOptionSelect(option)}
                              className={`group flex items-center justify-between p-5 rounded-2xl border-2 transition-all duration-300 text-left ${
                                isSelected
                                  ? "bg-[#0F2A44] border-[#0F2A44] text-white shadow-lg"
                                  : "bg-[#F7F6F3] border-transparent hover:border-[#2F5D82]/30 text-[#0F2A44]"
                              }`}
                            >
                              <span className="font-semibold text-[16px] md:text-[17px]">{option}</span>
                              <div
                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ml-4 ${
                                  isSelected
                                    ? "bg-[#2F5D82] border-[#2F5D82] text-white"
                                    : "border-[#0F2A44]/15 group-hover:border-[#2F5D82]/50"
                                }`}
                              >
                                {isSelected && <Check size={14} strokeWidth={4} />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {step.kind === "text" && (
                      <input
                        type="text"
                        placeholder={step.placeholder}
                        value={answers[step.id] || ""}
                        onChange={(e) =>
                          setAnswers((prev) => ({ ...prev, [step.id]: e.target.value }))
                        }
                        className="w-full px-5 py-4 rounded-2xl bg-[#F7F6F3] border-2 border-transparent focus:border-[#2F5D82] outline-none transition-colors text-[16px] text-[#0F2A44] font-semibold placeholder:text-[#0F2A44]/55 placeholder:font-medium"
                      />
                    )}

                    {step.kind === "textarea" && (
                      <textarea
                        rows={5}
                        placeholder={step.placeholder}
                        value={answers[step.id] || ""}
                        onChange={(e) =>
                          setAnswers((prev) => ({ ...prev, [step.id]: e.target.value }))
                        }
                        className="w-full px-5 py-4 rounded-2xl bg-[#F7F6F3] border-2 border-transparent focus:border-[#2F5D82] outline-none transition-colors text-[16px] text-[#0F2A44] font-medium leading-relaxed placeholder:text-[#0F2A44]/55 placeholder:font-medium resize-none"
                      />
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                    className="flex flex-col items-center justify-center text-center space-y-6 py-10"
                  >
                    <div className="w-20 h-20 bg-[#2F5D82]/10 text-[#2F5D82] rounded-full flex items-center justify-center">
                      <Check size={44} strokeWidth={3} />
                    </div>
                    <h4 className="text-[28px] md:text-[32px] font-sans font-bold text-[#0F2A44] leading-tight">
                      Aplicação recebida.
                    </h4>
                    <p className="text-[#2B2B2B]/85 text-[16px] md:text-[17px] max-w-sm font-normal leading-relaxed">
                      Marco analisa cada aplicação pessoalmente. Em breve entraremos em contato pelo
                      WhatsApp.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {!isSubmitted && (
              <div className="px-6 md:px-10 py-5 md:py-6 bg-[#F7F6F3] border-t border-[#F2F2F2] flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className={`flex items-center gap-2 font-extrabold text-[12px] uppercase tracking-[0.2em] transition-all ${
                    currentStep === 0
                      ? "opacity-0 pointer-events-none"
                      : "text-[#0F2A44]/65 hover:text-[#0F2A44]"
                  }`}
                >
                  <ChevronLeft size={18} /> Voltar
                </button>

                <div className="flex items-center gap-3">
                  <p className="hidden sm:flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#0F2A44]/60 font-semibold">
                    <Lock size={12} className="text-[#2F5D82]" /> Confidencial
                  </p>

                  {isLastStep ? (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="flex items-center gap-2 bg-[#2F5D82] hover:bg-[#0F2A44] text-white px-7 md:px-9 py-3.5 rounded-full font-extrabold text-[12px] uppercase tracking-[0.2em] transition-all duration-500 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Enviando..." : "Enviar aplicação"}
                      {!isSubmitting && <Send size={16} aria-hidden="true" />}
                    </button>
                  ) : (
                    step.kind !== "options" && (
                      <button
                        type="button"
                        onClick={nextStep}
                        disabled={!canAdvance()}
                        className="flex items-center gap-2 bg-[#0F2A44] hover:bg-[#2F5D82] text-white px-7 md:px-9 py-3.5 rounded-full font-extrabold text-[12px] uppercase tracking-[0.2em] transition-all duration-500 shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Continuar <ChevronRight size={16} />
                      </button>
                    )
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
