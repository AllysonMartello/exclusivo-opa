"use client";

import { useState, useEffect, useMemo, useRef, FormEvent, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Send,
  Home,
  RotateCcw,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import { QUESTIONS } from "./questions";
import type { Answers, Question } from "./types";
import {
  pushLeadFormOpen,
  pushLeadFormStep,
  pushLeadSubmit,
  generateEventId,
} from "@/lib/analytics";

const FORM_ID = "cadastro-imovel";
const DRAFT_KEY = "opa-cadastro-imovel-draft-v1";

const maskPhoneBR = (raw: string) => {
  const d = raw.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};

const isValidPhoneBR = (v: string) => v.replace(/\D/g, "").length >= 10;
const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

const maskCurrencyBR = (raw: string) => {
  const digits = raw.replace(/\D/g, "").slice(0, 12);
  if (!digits) return "";
  const cents = parseInt(digits, 10);
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

const maskNumber = (raw: string) => raw.replace(/\D/g, "").slice(0, 6);

type DraftShape = { answers: Answers; otherText: Record<string, string>; savedAt: string };

function loadDraft(): DraftShape | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as DraftShape;
    if (!parsed.answers) return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveDraft(answers: Answers, otherText: Record<string, string>) {
  if (typeof window === "undefined") return;
  try {
    const payload: DraftShape = { answers, otherText, savedAt: new Date().toISOString() };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(payload));
  } catch {
    /* quota / privacy mode — silently ignore */
  }
}

function clearDraft() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {
    /* ignore */
  }
}

function validate(q: Question, answer: unknown, otherText?: string): string | null {
  const isEmpty =
    answer === undefined ||
    answer === null ||
    (typeof answer === "string" && answer.trim() === "") ||
    (Array.isArray(answer) && answer.length === 0);

  if (isEmpty) {
    return q.required ? "Esse campo é obrigatório." : null;
  }

  if (typeof answer === "string") {
    if (q.type === "tel" && !isValidPhoneBR(answer)) return "Digite um telefone válido com DDD.";
    if (q.type === "email" && !isValidEmail(answer)) return "Digite um e-mail válido.";
    if (q.type === "number" && !/^\d+$/.test(answer.trim())) return "Use apenas números.";
    if (q.type === "currency" && answer.trim() === "R$ 0,00") {
      if (q.required) return "Informe um valor.";
    }
  }

  if (Array.isArray(answer) && q.allowOther) {
    const hasOther = answer.includes("Outro");
    if (hasOther && !otherText?.trim()) return "Descreva o item em 'Outro'.";
  }

  return null;
}

interface Props {
  initialAnunciante?: { nome?: string; telefone?: string; email?: string };
}

export default function CadastroImovelForm({ initialAnunciante }: Props) {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(-1); // -1 = boas-vindas
  const [answers, setAnswers] = useState<Answers>(() => ({
    nomeCompleto: initialAnunciante?.nome,
    telefone: initialAnunciante?.telefone ? maskPhoneBR(initialAnunciante.telefone) : undefined,
    email: initialAnunciante?.email,
  }));
  const [otherText, setOtherText] = useState<Record<string, string>>({});
  const [stepError, setStepError] = useState<string | null>(null);
  const [draftAvailable, setDraftAvailable] = useState(false);
  const [draftRestored, setDraftRestored] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const draftCheckedRef = useRef(false);

  // Detectar draft salvo no primeiro mount. localStorage só existe no client,
  // então essa leitura precisa ficar em useEffect (não em useState initializer,
  // que rodaria no SSR). O setState aqui é intencional.
  useEffect(() => {
    if (draftCheckedRef.current) return;
    draftCheckedRef.current = true;
    const draft = loadDraft();
    if (draft && Object.keys(draft.answers).length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDraftAvailable(true);
    }
  }, []);

  // Auto-save em cada mudança de answers/otherText (após boas-vindas).
  useEffect(() => {
    if (stepIndex < 0) return;
    if (Object.keys(answers).length === 0) return;
    saveDraft(answers, otherText);
  }, [answers, otherText, stepIndex]);

  // Track open + step.
  useEffect(() => {
    pushLeadFormOpen(FORM_ID);
  }, []);

  useEffect(() => {
    if (stepIndex >= 0) pushLeadFormStep(FORM_ID, stepIndex);
  }, [stepIndex]);

  const visibleQuestions = useMemo(
    () => QUESTIONS.filter((q) => !q.when || q.when(answers)),
    [answers]
  );
  const total = visibleQuestions.length;
  const isReviewStep = stepIndex === total;
  const currentQuestion = stepIndex >= 0 && stepIndex < total ? visibleQuestions[stepIndex] : null;
  const sectionLabels = useMemo(() => {
    const map: { section: string; position: number; sectionTotal: number }[] = [];
    const counts: Record<string, number> = {};
    const totals: Record<string, number> = {};
    visibleQuestions.forEach((q) => {
      totals[q.section] = (totals[q.section] ?? 0) + 1;
    });
    visibleQuestions.forEach((q) => {
      counts[q.section] = (counts[q.section] ?? 0) + 1;
      map.push({ section: q.section, position: counts[q.section], sectionTotal: totals[q.section] });
    });
    return map;
  }, [visibleQuestions]);

  // Foco automático no input ao trocar de step.
  useEffect(() => {
    if (!currentQuestion) return;
    const t = setTimeout(() => inputRef.current?.focus(), 250);
    return () => clearTimeout(t);
  }, [stepIndex, currentQuestion]);

  const progress = stepIndex < 0 ? 0 : ((stepIndex + 1) / (total + 1)) * 100;

  const startForm = () => {
    setStepIndex(0);
  };

  const restoreDraft = () => {
    const draft = loadDraft();
    if (draft) {
      setAnswers(draft.answers);
      setOtherText(draft.otherText || {});
      setDraftRestored(true);
      setDraftAvailable(false);
      setStepIndex(0);
    }
  };

  const discardDraft = () => {
    clearDraft();
    setDraftAvailable(false);
    setDraftRestored(false);
  };

  const setAnswer = (id: string, value: unknown) => {
    setAnswers((prev) => ({ ...prev, [id]: value as Answers[string] }));
    setStepError(null);
  };

  const goNext = () => {
    if (!currentQuestion) return;
    const err = validate(currentQuestion, answers[currentQuestion.id], otherText[currentQuestion.id]);
    if (err) {
      setStepError(err);
      return;
    }
    setStepError(null);
    setStepIndex((s) => Math.min(s + 1, total));
  };

  const goPrev = () => {
    setStepError(null);
    setStepIndex((s) => Math.max(s - 1, 0));
  };

  const handleSelectSingle = (option: string) => {
    if (!currentQuestion) return;
    setAnswer(currentQuestion.id, option);
    setStepError(null);
    setTimeout(() => {
      setStepIndex((s) => Math.min(s + 1, total));
    }, 320);
  };

  const handleToggleMulti = (option: string) => {
    if (!currentQuestion) return;
    const current = (answers[currentQuestion.id] as string[] | undefined) ?? [];
    const next = current.includes(option)
      ? current.filter((o) => o !== option)
      : [...current, option];
    setAnswer(currentQuestion.id, next);
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      goNext();
      return;
    }
    // Em inputs simples, Enter avança; em textarea, só com Ctrl/Cmd.
    if (e.key === "Enter" && currentQuestion?.type !== "textarea") {
      e.preventDefault();
      goNext();
    }
  };

  const handleSubmit = async (e?: FormEvent) => {
    e?.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSubmitError(null);

    const answersMap: Record<string, string> = {};
    visibleQuestions.forEach((q) => {
      const v = answers[q.id];
      if (v === undefined || v === null) return;
      if (Array.isArray(v)) {
        if (v.length === 0) return;
        const others = otherText[q.id]?.trim();
        const labels = v.map((opt) => (opt === "Outro" && others ? `Outro: ${others}` : opt));
        answersMap[q.label] = labels.join(", ");
      } else if (typeof v === "string" && v.trim() !== "") {
        answersMap[q.label] = v;
      }
    });

    const nomeRaw = (answers.nomeCompleto as string | undefined)?.trim() ?? "";
    const telefoneRaw = (answers.telefone as string | undefined)?.trim() ?? "";
    const emailRaw = (answers.email as string | undefined)?.trim() ?? "";

    const eventId = generateEventId();
    const payload = {
      site: "cadastro-imovel",
      origin: "Formulário de cadastro de imóvel (exclusivo.opailhabela.com.br/cadastro-imovel)",
      receivedAt: new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }),
      nome: nomeRaw,
      telefone: telefoneRaw,
      email: emailRaw,
      cidade: "",
      answers: answersMap,
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
      console.error("Erro ao enviar cadastro:", err);
    }

    if (!ok) {
      setIsSubmitting(false);
      setSubmitError(
        "Não conseguimos enviar agora. Tente novamente em instantes — suas respostas continuam salvas."
      );
      return;
    }

    pushLeadSubmit({
      form_id: FORM_ID,
      lead_name: nomeRaw,
      lead_phone: telefoneRaw,
      lead_email: emailRaw || undefined,
      event_id: eventId,
    });

    try {
      sessionStorage.setItem("lead_submitted", "1");
      sessionStorage.setItem("lead_eventID", eventId);
    } catch {
      /* ignore */
    }

    clearDraft();
    setIsSubmitting(false);
    router.push("/cadastro-imovel/obrigado");
  };

  // -------- Render helpers --------

  const renderInput = (q: Question) => {
    const value = (answers[q.id] as string | undefined) ?? "";
    const commonClass =
      "w-full px-5 py-4 md:py-5 rounded-2xl bg-white border-2 border-[#D5DCE2] outline-none transition-colors text-[#1A2226] text-lg md:text-xl placeholder:text-[#1A2226]/35 focus:border-[#4A6B7C]";

    if (q.type === "textarea") {
      return (
        <textarea
          ref={(el) => {
            inputRef.current = el;
          }}
          value={value}
          onChange={(e) => setAnswer(q.id, e.target.value)}
          onKeyDown={handleKey}
          rows={5}
          placeholder={q.placeholder}
          className={`${commonClass} resize-none leading-relaxed`}
        />
      );
    }

    let mask: ((s: string) => string) | null = null;
    let inputMode: "text" | "tel" | "email" | "numeric" | "decimal" = "text";
    let type: string = "text";
    let autoComplete: string | undefined;

    if (q.type === "tel") {
      mask = maskPhoneBR;
      inputMode = "tel";
      type = "tel";
      autoComplete = "tel";
    } else if (q.type === "email") {
      inputMode = "email";
      type = "email";
      autoComplete = "email";
    } else if (q.type === "currency") {
      mask = maskCurrencyBR;
      inputMode = "numeric";
    } else if (q.type === "number") {
      mask = maskNumber;
      inputMode = "numeric";
    } else if (q.id === "nomeCompleto") {
      autoComplete = "name";
    }

    return (
      <input
        ref={(el) => {
          inputRef.current = el;
        }}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => setAnswer(q.id, mask ? mask(e.target.value) : e.target.value)}
        onKeyDown={handleKey}
        placeholder={q.placeholder}
        className={commonClass}
      />
    );
  };

  const renderSingle = (q: Question) => {
    const selected = answers[q.id] as string | undefined;
    return (
      <div className="grid grid-cols-1 gap-3">
        {q.options?.map((option) => {
          const isSelected = selected === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => handleSelectSingle(option)}
              className={`group flex items-center justify-between p-4 md:p-5 rounded-2xl border-2 transition-all text-left ${
                isSelected
                  ? "bg-[#253A47] border-[#253A47] text-white shadow-lg"
                  : "bg-white border-[#D5DCE2] hover:border-[#809C9E] text-[#1A2226]"
              }`}
            >
              <span className="font-medium text-base md:text-lg pr-3">{option}</span>
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${
                  isSelected
                    ? "bg-[#809C9E] border-[#809C9E] text-white"
                    : "border-[#D5DCE2] group-hover:border-[#809C9E]"
                }`}
              >
                {isSelected && <Check size={14} strokeWidth={4} />}
              </div>
            </button>
          );
        })}
      </div>
    );
  };

  const renderMulti = (q: Question) => {
    const selected = (answers[q.id] as string[] | undefined) ?? [];
    const showOther = q.allowOther;
    return (
      <div className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {q.options?.map((option) => {
            const isSelected = selected.includes(option);
            return (
              <button
                key={option}
                type="button"
                onClick={() => handleToggleMulti(option)}
                className={`group flex items-center justify-between p-4 md:p-5 rounded-2xl border-2 transition-all text-left ${
                  isSelected
                    ? "bg-[#253A47] border-[#253A47] text-white shadow-lg"
                    : "bg-white border-[#D5DCE2] hover:border-[#809C9E] text-[#1A2226]"
                }`}
              >
                <span className="font-medium text-base md:text-lg pr-3">{option}</span>
                <div
                  className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all shrink-0 ${
                    isSelected
                      ? "bg-[#809C9E] border-[#809C9E] text-white"
                      : "border-[#D5DCE2] group-hover:border-[#809C9E]"
                  }`}
                >
                  {isSelected && <Check size={14} strokeWidth={4} />}
                </div>
              </button>
            );
          })}
          {showOther && (
            <button
              type="button"
              onClick={() => handleToggleMulti("Outro")}
              className={`group flex items-center justify-between p-4 md:p-5 rounded-2xl border-2 transition-all text-left ${
                selected.includes("Outro")
                  ? "bg-[#253A47] border-[#253A47] text-white shadow-lg"
                  : "bg-white border-[#D5DCE2] hover:border-[#809C9E] text-[#1A2226]"
              }`}
            >
              <span className="font-medium text-base md:text-lg pr-3">Outro</span>
              <div
                className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all shrink-0 ${
                  selected.includes("Outro")
                    ? "bg-[#809C9E] border-[#809C9E] text-white"
                    : "border-[#D5DCE2] group-hover:border-[#809C9E]"
                }`}
              >
                {selected.includes("Outro") && <Check size={14} strokeWidth={4} />}
              </div>
            </button>
          )}
        </div>
        {showOther && selected.includes("Outro") && (
          <input
            type="text"
            value={otherText[q.id] ?? ""}
            onChange={(e) => setOtherText((p) => ({ ...p, [q.id]: e.target.value }))}
            placeholder="Descreva aqui o item..."
            className="w-full px-5 py-3 rounded-2xl bg-white border-2 border-[#D5DCE2] outline-none transition-colors text-[#1A2226] focus:border-[#4A6B7C]"
          />
        )}
      </div>
    );
  };

  const renderReview = () => {
    const filled = visibleQuestions.filter((q) => {
      const v = answers[q.id];
      if (v === undefined) return false;
      if (typeof v === "string") return v.trim() !== "";
      if (Array.isArray(v)) return v.length > 0;
      return false;
    });
    return (
      <div className="space-y-6">
        <p className="text-[#1A2226]/70 text-base md:text-lg leading-relaxed">
          Você respondeu <span className="font-semibold text-[#253A47]">{filled.length}</span> de{" "}
          <span className="font-semibold text-[#253A47]">{visibleQuestions.length}</span> perguntas.
          Confira o resumo abaixo antes de enviar. Se quiser ajustar algo, use o botão Voltar.
        </p>
        <div className="rounded-3xl border border-[#D5DCE2] bg-white overflow-hidden">
          <div className="max-h-[40vh] overflow-y-auto divide-y divide-[#D5DCE2]/60 ci-fade-mask-bottom">
            {filled.map((q) => {
              const v = answers[q.id];
              const others = otherText[q.id]?.trim();
              const display = Array.isArray(v)
                ? v.map((opt) => (opt === "Outro" && others ? `Outro: ${others}` : opt)).join(", ")
                : String(v ?? "");
              return (
                <div key={q.id} className="p-4 md:p-5">
                  <p className="text-xs uppercase tracking-widest text-[#809C9E] font-semibold mb-1">
                    {q.section}
                  </p>
                  <p className="text-[#253A47] font-medium mb-1">{q.label}</p>
                  <p className="text-[#1A2226]/80 text-sm md:text-base whitespace-pre-wrap break-words">
                    {display}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        {submitError && (
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700">
            <AlertCircle size={20} className="shrink-0 mt-0.5" />
            <p className="text-sm">{submitError}</p>
          </div>
        )}
      </div>
    );
  };

  // ============ Welcome screen ============
  if (stepIndex === -1) {
    return (
      <div
        data-app="cadastro-imovel"
        className="min-h-[100dvh] bg-[#F4F7F7] flex items-center justify-center px-5 py-12"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-2xl"
        >
          <p className="text-[#809C9E] uppercase tracking-[0.3em] text-xs font-semibold mb-4">
            OPA Agência Imobiliária
          </p>
          <h1 className="font-serif text-[#253A47] text-3xl sm:text-4xl md:text-5xl leading-[1.1] mb-6">
            Ficha técnica do seu imóvel
          </h1>
          <p className="text-[#1A2226]/75 text-base md:text-lg leading-relaxed mb-4">
            Que bom ter você com a gente. Agora que a parceria está acertada, precisamos montar a
            ficha técnica do imóvel para começar a divulgação e os atendimentos.
          </p>
          <p className="text-[#1A2226]/60 text-sm md:text-base leading-relaxed mb-10">
            Vamos te guiar pergunta por pergunta. Quanto mais completas as informações, melhor
            apresentamos o imóvel aos interessados — sem ter que voltar para você pedir dado por
            dado. Suas respostas ficam salvas automaticamente, você pode parar e voltar quando
            quiser.
          </p>

          {draftAvailable && !draftRestored && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 rounded-2xl border border-[#809C9E]/30 bg-[#809C9E]/10 p-5"
            >
              <div className="flex items-start gap-3 mb-4">
                <RotateCcw size={20} className="text-[#4A6B7C] mt-0.5 shrink-0" />
                <div>
                  <p className="text-[#253A47] font-semibold mb-1">
                    Encontramos um rascunho seu
                  </p>
                  <p className="text-[#1A2226]/70 text-sm">
                    Você começou a preencher este formulário antes. Quer continuar de onde parou
                    ou começar do zero?
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={restoreDraft}
                  className="flex-1 bg-[#253A47] text-white px-5 py-3 rounded-full font-medium hover:bg-[#253A47]/90 transition-colors"
                >
                  Continuar preenchendo
                </button>
                <button
                  type="button"
                  onClick={discardDraft}
                  className="flex-1 bg-white text-[#253A47] px-5 py-3 rounded-full font-medium border border-[#D5DCE2] hover:bg-[#E8ECEE] transition-colors"
                >
                  Começar do zero
                </button>
              </div>
            </motion.div>
          )}

          <button
            type="button"
            onClick={startForm}
            className="inline-flex items-center gap-3 bg-[#253A47] text-white px-8 py-4 rounded-full font-semibold text-base md:text-lg hover:bg-[#253A47]/90 transition-colors shadow-lg"
          >
            Preencher ficha técnica
            <ArrowRight size={20} />
          </button>

          <p className="mt-8 text-xs text-[#1A2226]/45 leading-relaxed">
            Leva cerca de 8 a 12 minutos. Tenha em mãos a guia do IPTU, as áreas do terreno e da
            construção e os valores combinados.
          </p>
        </motion.div>
      </div>
    );
  }

  // ============ Form / Review screen ============
  return (
    <div data-app="cadastro-imovel" className="min-h-[100dvh] bg-[#F4F7F7] flex flex-col">
      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-[#F4F7F7]/90 backdrop-blur-md border-b border-[#D5DCE2]/60">
        <div className="max-w-3xl mx-auto px-5 md:px-8 py-3 md:py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => router.push("/")}
              aria-label="Voltar à página inicial"
              className="p-2 rounded-full hover:bg-[#D5DCE2]/50 transition-colors text-[#253A47]/70"
            >
              <Home size={18} />
            </button>
            <div className="min-w-0">
              <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#809C9E] font-semibold truncate">
                {isReviewStep
                  ? "Revisão final"
                  : currentQuestion
                    ? `${currentQuestion.section} · ${sectionLabels[stepIndex]?.position}/${sectionLabels[stepIndex]?.sectionTotal}`
                    : ""}
              </p>
              <p className="text-xs md:text-sm text-[#1A2226]/60 font-medium">
                {isReviewStep ? `Pronto para enviar` : `Pergunta ${stepIndex + 1} de ${total}`}
              </p>
            </div>
          </div>
          {draftRestored && (
            <motion.span
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="hidden sm:inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-[#4A6B7C] font-semibold"
            >
              <Check size={12} /> Rascunho restaurado
            </motion.span>
          )}
        </div>
        <div className="h-1 w-full bg-[#D5DCE2]/60">
          <motion.div
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
            className="h-full bg-[#809C9E]"
          />
        </div>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 flex items-start md:items-center justify-center px-5 py-8 md:py-12">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            {isReviewStep ? (
              <motion.div
                key="review"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <p className="text-[#809C9E] uppercase tracking-[0.25em] text-xs font-semibold mb-3">
                    Última etapa
                  </p>
                  <h2 className="font-serif text-[#253A47] text-2xl md:text-4xl leading-tight">
                    Revise suas respostas e envie o cadastro.
                  </h2>
                </div>
                {renderReview()}
              </motion.div>
            ) : currentQuestion ? (
              <motion.div
                key={`q-${stepIndex}`}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.25 }}
                className="space-y-6 md:space-y-8"
              >
                <div>
                  <p className="text-[#809C9E] uppercase tracking-[0.25em] text-xs font-semibold mb-3 flex items-center gap-2">
                    <ChevronRight size={12} /> {currentQuestion.section}
                    {currentQuestion.required && (
                      <span className="text-[#C47A2C] normal-case tracking-normal font-medium">
                        · obrigatório
                      </span>
                    )}
                  </p>
                  <h2 className="font-serif text-[#253A47] text-2xl md:text-4xl leading-tight">
                    {currentQuestion.label}
                  </h2>
                  {currentQuestion.description && (
                    <p className="text-[#1A2226]/65 text-sm md:text-base mt-3 leading-relaxed">
                      {currentQuestion.description}
                    </p>
                  )}
                </div>

                <div>
                  {currentQuestion.type === "single"
                    ? renderSingle(currentQuestion)
                    : currentQuestion.type === "multi"
                      ? renderMulti(currentQuestion)
                      : renderInput(currentQuestion)}
                </div>

                {stepError && (
                  <motion.p
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-600 text-sm flex items-center gap-2"
                  >
                    <AlertCircle size={16} /> {stepError}
                  </motion.p>
                )}

                {currentQuestion.type !== "single" && (
                  <p className="text-xs text-[#1A2226]/40">
                    {currentQuestion.type === "textarea" ? (
                      <>Pressione <kbd className="px-1.5 py-0.5 rounded bg-[#D5DCE2]/70 font-mono">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 rounded bg-[#D5DCE2]/70 font-mono">Enter</kbd> para continuar</>
                    ) : (
                      <>Pressione <kbd className="px-1.5 py-0.5 rounded bg-[#D5DCE2]/70 font-mono">Enter ↵</kbd> para continuar</>
                    )}
                  </p>
                )}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer / Navigation */}
      <div className="sticky bottom-0 bg-[#F4F7F7]/95 backdrop-blur-md border-t border-[#D5DCE2]/60">
        <div className="max-w-3xl mx-auto px-5 md:px-8 py-4 md:py-5 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={goPrev}
            disabled={stepIndex === 0}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-medium text-sm transition-all ${
              stepIndex === 0
                ? "opacity-0 pointer-events-none"
                : "text-[#253A47]/70 hover:text-[#253A47] hover:bg-[#D5DCE2]/50"
            }`}
          >
            <ArrowLeft size={18} />
            Voltar
          </button>
          {isReviewStep ? (
            <button
              type="button"
              onClick={() => handleSubmit()}
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-[#253A47] text-white px-6 md:px-8 py-3 md:py-3.5 rounded-full font-semibold text-sm md:text-base hover:bg-[#253A47]/90 transition-colors shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Enviando..." : "Enviar cadastro"}
              {!isSubmitting && <Send size={18} />}
            </button>
          ) : (
            <button
              type="button"
              onClick={goNext}
              className="flex items-center gap-2 bg-[#253A47] text-white px-6 md:px-8 py-3 md:py-3.5 rounded-full font-semibold text-sm md:text-base hover:bg-[#253A47]/90 transition-colors shadow-lg"
            >
              {stepIndex === total - 1 ? "Ver resumo" : "Continuar"}
              <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
