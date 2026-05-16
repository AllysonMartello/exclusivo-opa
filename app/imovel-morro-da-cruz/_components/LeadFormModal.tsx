"use client";

import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronRight, ChevronLeft, Check, Send, Phone, User, MapPin } from "lucide-react";
import { pushLeadFormOpen, pushLeadFormStep, pushClickWhatsApp, pushLeadSubmit, generateEventId } from "@/lib/analytics";

const FORM_ID = "lead-form-morro-da-cruz";

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const steps = [
  {
    id: 1,
    question: "O que você procura em Ilhabela?",
    type: "single",
    options: [
      "Segunda residência",
      "Refúgio familiar",
      "Investimento patrimonial",
      "Mudança de estilo de vida"
    ]
  },
  {
    id: 2,
    question: "O que é mais importante para a experiência da sua família em Ilhabela?",
    type: "single",
    options: [
      "Privacidade e tranquilidade",
      "Vista panorâmica para o mar ou natureza",
      "Acesso ao mar / vida náutica",
      "Proximidade da Vila e restaurantes",
      "Integração com a natureza"
    ]
  },
  {
    id: 3,
    question: "Qual é a faixa de investimento prevista?",
    type: "single",
    options: [
      "Até R$ 3 milhões",
      "De R$ 3M a R$ 5M",
      "De R$ 5M a R$ 10M",
      "Acima de R$ 10M"
    ]
  },
  {
    id: 4,
    question: "Como você pretende estruturar a aquisição?",
    type: "single",
    options: [
      "Recursos próprios",
      "Financiamento",
      "Estudo permuta parcial"
    ]
  },
  {
    id: 5,
    question: "Quando pretende tomar a decisão de compra?",
    type: "single",
    options: [
      "Estou pronto para avançar agora",
      "Nos próximos 3 a 6 meses",
      "Apenas estudando o mercado"
    ]
  },
  {
    id: 6,
    question: "Como seria a composição ideal da casa?",
    subtitle: "(Selecione o que fizer sentido)",
    type: "multi",
    options: [
      "4 ou mais suítes",
      "Área gourmet completa",
      "Piscina",
      "Home office com vista",
      "Casa de hóspedes / caseiro",
      "Estrutura náutica"
    ]
  },
  {
    id: 7,
    question: "Você já tem alguma região de preferência em Ilhabela?",
    type: "single",
    options: [
      "Sul (Curral, Feiticeira, Julião)",
      "Norte (Siriúba, Armação)",
      "Centro (Vila, Engenho D’Água)",
      "Costeira mais isolada",
      "Ainda estou aberto a sugestões"
    ]
  },
  {
    id: 8,
    question: "Antes de agendar uma visita presencial, você gostaria de ver um tour virtual imersivo da casa?",
    type: "single",
    options: [
      "Sim, gostaria de conhecer primeiro online",
      "Prefiro ir direto para a visita presencial"
    ]
  },
  {
    id: 9,
    question: "Como prefere que entremos em contato?",
    type: "single",
    options: [
      "WhatsApp",
      "Ligação",
      "E-mail"
    ]
  },
  {
    id: 10,
    question: "Quase lá! Como podemos te chamar?",
    type: "final"
  }
];

export default function LeadFormModal({ isOpen, onClose }: LeadFormModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});

  useEffect(() => {
    if (isOpen) pushLeadFormOpen(FORM_ID);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) pushLeadFormStep(FORM_ID, currentStep);
  }, [currentStep, isOpen]);
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    cidade: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOptionSelect = (option: string) => {
    const step = steps[currentStep];
    if (step.type === "single") {
      setAnswers({ ...answers, [step.id]: option });
      setTimeout(() => nextStep(), 300);
    } else if (step.type === "multi") {
      const currentAnswers = answers[step.id] || [];
      const newAnswers = currentAnswers.includes(option)
        ? currentAnswers.filter((a: string) => a !== option)
        : [...currentAnswers, option];
      setAnswers({ ...answers, [step.id]: newAnswers });
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
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
    
    const answersForEmail: Record<string, string> = {};
    steps.forEach((step) => {
      if (step.type !== "final") {
        const answer = answers[step.id];
        if (answer) {
          answersForEmail[step.question] = Array.isArray(answer) ? answer.join(", ") : answer;
        }
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
          site: "morro-da-cruz",
          origin: "Landing Page Morro da Cruz",
          receivedAt: new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }),
          nome: formData.nome,
          telefone: formData.telefone,
          cidade: formData.cidade,
          answers: answersForEmail,
          event_id: eventId,
        }),
      });

      pushLeadSubmit({
        form_id: FORM_ID,
        lead_name: formData.nome,
        lead_phone: formData.telefone,
        lead_city: formData.cidade,
        event_id: eventId,
      });
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
    }

    // Redirect to WhatsApp with a simple message
    const whatsappMessage = "Olá! Gostaria de mais informações sobre a casa Morro da Cruz em Ilhabela.";
    const encodedMessage = encodeURIComponent(whatsappMessage);
    pushClickWhatsApp("morro_form_success");
    window.open(`https://wa.me/5512974068058?text=${encodedMessage}`, "_blank");
    
    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
      setIsSubmitted(false);
      setCurrentStep(0);
      setAnswers({});
      setFormData({ nome: "", telefone: "", cidade: "" });
    }, 3000);
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

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
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white w-full max-w-2xl rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col max-h-[85dvh]"
          >
            {/* Header */}
            <div className="p-4 md:p-8 flex items-center justify-between border-b border-primary-1/5 shrink-0">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-primary-2/10 rounded-full flex items-center justify-center text-primary-2 shrink-0">
                  <span className="font-bold text-xs md:text-sm">{currentStep + 1}/{steps.length}</span>
                </div>
                <h3 className="font-serif text-primary-1 text-lg md:text-xl truncate">Consultoria Personalizada</h3>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-primary-1/5 rounded-full transition-colors text-primary-1/40 hover:text-primary-1 shrink-0"
              >
                <X size={20} className="md:w-6 md:h-6" />
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
                        {steps[currentStep].question}
                      </h4>
                      {steps[currentStep].subtitle && (
                        <p className="text-primary-1/40 text-sm italic">{steps[currentStep].subtitle}</p>
                      )}
                    </div>

                    {steps[currentStep].type === "final" ? (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-1/30" size={20} />
                            <input
                              required
                              type="text"
                              placeholder="Seu nome completo"
                              value={formData.nome}
                              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-primary-1/5 border-2 border-transparent focus:border-primary-2 outline-none transition-all text-primary-1 font-medium"
                            />
                          </div>
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-1/30" size={20} />
                            <input
                              required
                              type="tel"
                              placeholder="Telefone / WhatsApp"
                              value={formData.telefone}
                              onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-primary-1/5 border-2 border-transparent focus:border-primary-2 outline-none transition-all text-primary-1 font-medium"
                            />
                          </div>
                          <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-1/30" size={20} />
                            <input
                              required
                              type="text"
                              placeholder="Cidade onde mora"
                              value={formData.cidade}
                              onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-primary-1/5 border-2 border-transparent focus:border-primary-2 outline-none transition-all text-primary-1 font-medium"
                            />
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-primary-2 text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-primary-2/90 transition-all shadow-lg hover:shadow-primary-2/20"
                        >
                          Finalizar e Enviar <Send size={20} />
                        </button>
                      </form>
                    ) : (
                      <div className="grid grid-cols-1 gap-3">
                        {steps[currentStep].options?.map((option) => {
                          const isSelected = steps[currentStep].type === "multi" 
                            ? (answers[steps[currentStep].id] || []).includes(option)
                            : answers[steps[currentStep].id] === option;
                          
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
                    <h4 className="text-3xl font-serif text-primary-1">Solicitação Enviada!</h4>
                    <p className="text-text-sec text-lg max-w-sm">
                      Obrigado pelo seu interesse. Marco Henrique entrará em contato em breve com as informações solicitadas.
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
                  <ChevronLeft size={20} /> Voltar
                </button>
                
                {steps[currentStep].type === "multi" && (
                  <button
                    onClick={nextStep}
                    disabled={(answers[steps[currentStep].id] || []).length === 0}
                    className={`flex items-center gap-2 bg-primary-1 text-white px-8 py-3 rounded-xl font-bold text-sm uppercase tracking-widest transition-all hover:bg-primary-1/90 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    Continuar <ChevronRight size={20} />
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
