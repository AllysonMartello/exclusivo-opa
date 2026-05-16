"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  Eye,
  Target,
  Zap,
  Video,
  Map,
  Globe,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { pushLeadSubmit, pushLeadFormOpen, pushLeadFormStep, generateEventId } from '@/lib/analytics';

const FORM_ID = 'lead-form-composicao-diagnostico';

// --- Components ---

const DiagnosisForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    pushLeadFormOpen(FORM_ID);
  }, []);

  useEffect(() => {
    pushLeadFormStep(FORM_ID, step);
  }, [step]);

  const questions = [
    { id: 'nome', type: 'text', title: '1️⃣ Seu nome', placeholder: 'Sua resposta' },
    { id: 'whatsapp', type: 'text', title: '2️⃣ Qual é o melhor WhatsApp para contato?', placeholder: '(11) 99999-9999' },
    { id: 'localizacao', type: 'text', title: '3️⃣ Qual é a localização do imóvel em Ilhabela?', placeholder: 'Ex: Engenho d’Água / Siriúba / Perequê / etc.' },
    { id: 'tipo', type: 'radio', title: '4️⃣ Qual tipo de imóvel estamos falando?', options: ['Casa', 'Terreno', 'Apartamento', 'Casa em condomínio', 'Outro'] },
    { id: 'estagio', type: 'radio', title: '5️⃣ Qual é o estágio atual do imóvel?', options: ['Ainda não está à venda', 'Já estou pensando em vender', 'Já está à venda', 'Já anunciei, mas não tive resultado'] },
    { id: 'anunciado', type: 'radio', title: '6️⃣ Seu imóvel está sendo anunciado atualmente?', options: ['Não', 'Sim, em portais', 'Sim, com corretor', 'Sim, com várias imobiliárias'] },
    { id: 'valor', type: 'radio', title: '7️⃣ Qual faixa de valor estimado do imóvel?', options: ['Até R$ 2 milhões', 'R$ 2M – R$ 5M', 'R$ 5M – R$ 10M', 'Acima de R$ 10M', 'Prefiro não informar'] },
    { id: 'diferencial', type: 'text', title: '8️⃣ O que você acredita ser o maior diferencial do imóvel?', placeholder: 'Ex: vista, arquitetura, localização, terreno, privacidade etc.' },
    { id: 'objetivo', type: 'radio', title: '9️⃣ Qual é o seu objetivo principal com a venda?', options: ['Vender o mais rápido possível', 'Vender pelo melhor valor possível', 'Ainda estou avaliando'] },
    { id: 'horario', type: 'radio', title: '🔟 Se fizer sentido, Marco pode analisar o potencial do imóvel e conversar com você.\n\nQual o melhor horário para contato?', options: ['Manhã', 'Tarde', 'Noite'] },
  ];

  const submitDiagnosis = async () => {
    if (submitting) return;
    setSubmitting(true);
    const answers: Record<string, string> = {};
    questions.forEach((q) => {
      if (['nome', 'whatsapp', 'localizacao'].includes(q.id)) return;
      const val = formData[q.id];
      if (val) answers[q.title.replace(/^[0-9️⃣🔟]+\s*/u, '').trim()] = val;
    });
    const eventId = generateEventId();
    try {
      sessionStorage.setItem('lead_eventID', eventId);
      sessionStorage.setItem('lead_submitted', '1');
    } catch {
      // ignore
    }
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origin: 'Landing Page Composicao OPA — Diagnostico',
          receivedAt: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
          nome: formData.nome ?? '',
          telefone: formData.whatsapp ?? '',
          cidade: formData.localizacao ?? 'Ilhabela',
          subject: `[Composicao OPA] Diagnostico — ${formData.nome ?? ''}`,
          answers,
          event_id: eventId,
        }),
      });
      pushLeadSubmit({
        form_id: FORM_ID,
        lead_name: formData.nome ?? '',
        lead_phone: formData.whatsapp ?? '',
        lead_city: formData.localizacao ?? '',
        event_id: eventId,
      });
    } catch (err) {
      console.error('Erro ao enviar diagnostico:', err);
    } finally {
      setIsSubmitted(true);
      setSubmitting(false);
    }
  };

  const handleNext = () => {
    if (step < questions.length - 1) setStep(step + 1);
    else void submitDiagnosis();
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleOptionSelect = (val: string) => {
    setFormData({ ...formData, [questions[step].id]: val });
    setTimeout(() => {
      if (step < questions.length - 1) setStep(step + 1);
    }, 300);
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-16 bg-white p-8 sm:p-12 rounded-[3rem] shadow-2xl border border-primary-1/5 max-w-2xl mx-auto z-20 relative">
        <CheckCircle2 className="w-16 h-16 text-primary-2 mx-auto mb-6" />
        <h3 className="text-3xl font-serif text-primary-1 mb-4">Diagnóstico recebido.</h3>
        <p className="text-text-sec text-lg">Marco avaliará as informações e entrará em contato no horário de preferência.</p>
      </div>
    );
  }

  const q = questions[step];
  const isLastStep = step === questions.length - 1;
  const canProceed = formData[q.id] && formData[q.id].trim() !== '';

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 sm:p-12 rounded-[3rem] shadow-2xl border border-primary-1/5 relative min-h-[450px] flex flex-col z-20 text-left">
      <div className="mb-8">
        <div className="w-full bg-bg-alt h-1.5 rounded-full mb-8">
          <div 
            className="bg-primary-2 h-1.5 rounded-full transition-all duration-500" 
            style={{ width: `${((step + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
        <h3 className="text-2xl font-serif text-primary-1 leading-relaxed whitespace-pre-wrap">{q.title}</h3>
      </div>

      <div className="flex-grow flex flex-col justify-center">
        {q.type === 'text' ? (
          <input 
            type="text" 
            className="w-full text-xl sm:text-2xl border-b-2 border-primary-1/10 py-4 bg-transparent outline-none focus:border-primary-2 transition-colors text-text-main placeholder:text-text-sec/30"
            placeholder={q.placeholder}
            value={formData[q.id] || ''}
            onChange={(e) => setFormData({ ...formData, [q.id]: e.target.value })}
            onKeyDown={(e) => { if (e.key === 'Enter' && canProceed) handleNext(); }}
          />
        ) : (
          <div className="space-y-3">
            {q.options?.map(opt => (
              <button
                key={opt}
                onClick={() => handleOptionSelect(opt)}
                className={`w-full text-left px-6 py-4 rounded-2xl border text-lg sm:text-xl transition-all ${formData[q.id] === opt ? 'border-primary-2 bg-primary-2/5 font-medium text-primary-1 shadow-sm' : 'border-black/5 hover:border-primary-1/20 bg-white text-text-sec hover:bg-bg-alt/50' }`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mt-10 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
        <button 
          onClick={handlePrev} 
          className={`text-text-sec hover:text-primary-1 font-medium transition-colors py-3 px-6 rounded-full hover:bg-bg-alt ${step === 0 ? 'invisible' : ''}`}
        >
          Voltar
        </button>
        <button 
          onClick={handleNext}
          disabled={!canProceed && q.type === 'text'}
          className={`flex w-full sm:w-auto justify-center items-center gap-2 px-8 py-4 rounded-full font-medium transition-transform ${canProceed || q.type === 'radio' ? 'bg-primary-1 text-white hover:bg-primary-1/90 hover:scale-[1.02] active:scale-95 shadow-lg' : 'bg-bg-alt text-text-sec/50 cursor-not-allowed'}`}
        >
          {isLastStep ? 'Solicitar análise do imóvel' : 'Próxima pergunta'} <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const SegurancaList = () => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const items = [
    { 
      id: 1,
      title: 'Proteção do valor real', 
      subtitle: 'Antes de qualquer divulgação, o imóvel passa por uma análise de precificação. O objetivo não é empurrar um preço alto para fechar contrato. É garantir que o imóvel chegue ao mercado no posicionamento certo, para o comprador certo, sem precisar de desconto para vender. Imóvel mal precificado queima rápido. E queimado, ele demora muito mais para ser vendido, quase sempre por menos do que valia.', 
      icon: <TrendingUp className="w-10 h-10" />,
      featured: false
    },
    { 
      id: 2,
      title: 'Segurança jurídica até as chaves', 
      subtitle: 'Em Ilhabela, imóveis de alto padrão frequentemente carregam históricos complexos. Documentação incompleta, registros antigos, situações que parecem simples e travam no cartório. A OPA acompanha o processo documental do primeiro contato até a assinatura. Nada disso chega ao comprador como surpresa, e nada disso trava a negociação quando ela está no melhor momento.', 
      icon: <ShieldCheck className="w-10 h-10" />,
      featured: true
    },
    { 
      id: 3,
      title: 'Discrição durante todo o processo', 
      subtitle: 'O proprietário não precisa aparecer. Não precisa negociar diretamente com desconhecidos. Não precisa abrir a casa para qualquer pessoa que clicou num anúncio. O filtro existe para isso. Quem chega ao imóvel já foi qualificado. Quem negocia é a OPA. O proprietário participa quando faz sentido, não quando é obrigado.', 
      icon: <Eye className="w-10 h-10" />,
      featured: false
    }
  ];

  return (
    <div className="space-y-4 max-w-4xl mx-auto w-full">
      {items.map((category) => {
        const isHovered = hoveredItem === category.id;
        return (
          <div
            key={category.id}
            className="relative group w-full"
            onMouseEnter={() => setHoveredItem(category.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div
              className={`relative w-full overflow-hidden border transition-all duration-300 ease-in-out cursor-default rounded-[2rem] ${
                isHovered
                  ? 'border-primary-2 shadow-2xl shadow-primary-2/20 bg-primary-1 text-white scale-[1.02] z-10'
                  : 'border-primary-1/10 bg-white hover:border-primary-1/30 text-primary-1 scale-100 z-0'
              }`}
            >
              {/* Corner brackets */}
              {isHovered && (
                <>
                  <div className="absolute top-6 left-6 w-6 h-6">
                    <div className="absolute top-0 left-0 w-4 h-[3px] bg-primary-2" />
                    <div className="absolute top-0 left-0 w-[3px] h-4 bg-primary-2" />
                  </div>
                  <div className="absolute bottom-6 right-6 w-6 h-6">
                    <div className="absolute bottom-0 right-0 w-4 h-[3px] bg-primary-2" />
                    <div className="absolute bottom-0 right-0 w-[3px] h-4 bg-primary-2" />
                  </div>
                </>
              )}

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-8 sm:px-12 w-full gap-6">
                <div className="flex-1 z-10 transition-transform duration-300">
                  <h3 className={`font-serif font-bold transition-colors duration-300 ${category.featured ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'} ${isHovered ? 'text-white' : 'text-primary-1'}`}>
                    {category.title}
                  </h3>
                  <p className={`mt-3 transition-colors duration-300 text-sm md:text-base leading-relaxed ${isHovered ? 'text-white/80' : 'text-text-sec'}`}>
                    {category.subtitle}
                  </p>
                </div>

                {/* Icon appears on hover */}
                <div className={`hidden md:block transition-all duration-500 ease-in-out transform ${isHovered ? 'opacity-100 translate-x-0 text-primary-2' : 'opacity-0 translate-x-8 absolute right-12'}`}>
                  {category.icon}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const FadeUp: React.FC<FadeUpProps> = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const Eyebrow = ({ children, className = "text-primary-2" }: { children: React.ReactNode, className?: string }) => (
  <span className={`block text-[11px] font-[800] tracking-[0.25em] uppercase mb-4 ${className}`}>
    {children}
  </span>
);

const Section = ({ children, altBg = false, className = "", id }: { children: React.ReactNode, altBg?: boolean, className?: string, id?: string }) => (
  <section id={id} className={`py-24 sm:py-32 px-6 sm:px-[60px] ${altBg ? 'bg-bg-alt' : 'bg-bg-main'} ${className}`}>
    <div className="max-w-7xl mx-auto">
      {children}
    </div>
  </section>
);

// --- Main App ---

export default function ComposicaoOpaPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div data-app="composicao" className="relative overflow-hidden selection:bg-primary-2/30 selection:text-primary-1">
      <div className="absolute w-[600px] h-[600px] bg-primary-2/5 blur-[100px] rounded-full top-[-100px] right-[-100px] z-0 pointer-events-none" />
      
      {/* Custom Cursor (Optional, subtle) */}
      <div 
        className="fixed top-0 left-0 w-6 h-6 rounded-full border border-primary-2/50 pointer-events-none z-50 mix-blend-difference transition-transform duration-75 ease-out hidden lg:block"
        style={{ transform: `translate(${mousePos.x - 12}px, ${mousePos.y - 12}px)` }}
      />
      <div 
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-primary-2 rounded-full pointer-events-none z-50 transition-transform duration-0 hidden lg:block"
        style={{ transform: `translate(${mousePos.x - 3}px, ${mousePos.y - 3}px)` }}
      />

      {/* Header with Logo */}
      <header className="fixed top-0 left-0 w-full z-40 px-6 py-4 flex justify-between items-center bg-transparent">
        <a href="/">
          <img 
            src="/assets/logo/logo-opa-nova.svg" 
            alt="Opa Logo" 
            className="h-10 sm:h-12 drop-shadow-md hover:scale-105 transition-transform"
          />
        </a>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://s2-g1.glbimg.com/oPIi6GxOg2qpQAhbW_BL_Sf4E28=/0x0:1772x1181/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2023/e/8/DuNW2ITxKyVDfb2enoTg/ilhabela-paulostefani1.jpg" 
            alt="Ilhabela" 
            className="w-full h-full object-cover scale-[1.02] blur-[2px]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto pt-20">
          <FadeUp>
            <Eyebrow className="text-white">Composição O.P.A</Eyebrow>
            <h1 className="font-serif font-bold text-[40px] sm:text-[48px] leading-[1.2] tracking-tight text-white mb-8">
              Seu imóvel não está encalhado por falta de divulgação.<br />
              <span className="text-white italic">Ele não vende porque nunca foi lançado direito.</span>
            </h1>
            <p className="text-[16px] sm:text-[18px] leading-[1.6] text-white/80 max-w-[600px] mx-auto mb-10 font-light text-center">
              A Composição O.P.A é o processo que nós criamos para levar propriedades únicas de Ilhabela ao comprador certo. Com curadoria, narrativa e uma estrutura digital que imobiliária tradicional não entrega.
            </p>
            <button 
              onClick={() => document.getElementById('diagnostico')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative inline-flex items-center justify-center px-7 py-3 bg-primary-1 text-white rounded-full font-semibold text-[14px] tracking-wide overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary-1/20"
            >
              <span className="relative z-10 flex items-center gap-2">
                Quero entender como funciona esse processo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </FadeUp>
        </div>

        <div className="hidden lg:flex absolute bottom-10 left-[60px] bg-white/70 backdrop-blur-[10px] rounded-[1.5rem] p-5 w-[340px] shadow-[0_10px_30px_rgba(0,0,0,0.05)] items-center gap-4 z-10">
          <div className="w-[50px] h-[50px] rounded-full bg-primary-1 text-white flex items-center justify-center font-bold flex-shrink-0">MH</div>
          <div>
            <p className="italic text-[13px] leading-[1.4] text-text-main mb-1">"Ninguém olha um imóvel com o olhar que a OPA se propõe a olhar. A gente vai além das quatro paredes."</p>
            <span className="text-[11px] font-[700] text-text-sec">MARCO HENRIQUE, SÓCIO-FUNDADOR</span>
          </div>
        </div>
      </section>

      {/* O Problema */}
      <Section>
        <div className="max-w-4xl mx-auto text-center">
          <FadeUp>
            <Eyebrow>O Problema</Eyebrow>
            <h2 className="font-serif text-[40px] sm:text-[48px] leading-[1.1] text-primary-1 mb-8">O que está errado com a maioria dos anúncios de imóveis de alto padrão</h2>
            
            <div className="text-[18px] leading-[1.6] text-text-sec space-y-6 text-left max-w-3xl mx-auto">
              <p>Fotos tiradas com celular. Descrição genérica. Preço jogado no portal.</p>
              <p>Isso é divulgação. E divulgação sem posicionamento não vende imóvel de alto padrão.</p>
              <p>O que ela faz é atrair curioso, queimar o momento de lançamento e desgastar o imóvel antes que o comprador certo chegue. E quando esse comprador aparece, o imóvel já perdeu a força.</p>
              <p>O comprador de um imóvel de R$ 800 mil, R$ 1,5 milhão, R$ 3 milhões em Ilhabela não age por impulso. Ele pesquisa. Compara. Precisa sentir o estilo de vida antes de agendar visita.</p>
              <p>Se o imóvel não é apresentado como produto, com narrativa, contexto e campanha estruturada, ele some no meio do barulho. Simples assim.</p>
            </div>
          </FadeUp>
        </div>
      </Section>

      {/* What is OPA */}
      <Section altBg>
        <div className="max-w-4xl mx-auto text-center mb-16">
          <FadeUp>
            <Eyebrow>O Mecanismo</Eyebrow>
            <h2 className="font-serif text-[48px] sm:text-[56px] leading-[1.1] text-primary-1 mb-6">O que é uma curadoria imobiliária</h2>
            <p className="text-[18px] leading-[1.6] text-text-sec max-w-2xl mx-auto">
              Antes de qualquer produção, antes de qualquer campanha, existe uma leitura. A OPA chama isso de curadoria imobiliária. Uma série de análises técnicas e mercadológicas que colocam o imóvel em outro nível. Não é slogan. É o ponto de partida de tudo.
            </p>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {[
            { letter: 'O', title: 'Olhar', desc: 'O imóvel passa por uma análise que vai além do óbvio. Arquitetura. Topografia. Orientação solar. Comportamento do clima da ilha. Mas também: quem está chegando a Ilhabela agora. O que esse comprador busca. Qual estilo de vida ele está disposto a pagar para ter. Essa leitura técnica da cidade, do comportamento de consumo de quem chega, é o que permite construir algo que não é genérico. É feito para aquele imóvel, para aquele comprador. Sem essa etapa, qualquer divulgação é chute.', icon: <Eye className="w-6 h-6 text-primary-2" /> },
            { letter: 'P', title: 'Posicionamento', desc: 'Com a leitura feita, vem a estratégia. Qual história esse imóvel conta. Para qual perfil de consumo. Em qual canal esse encontro acontece. Não existe modelo padrão aqui. Cada imóvel pede um caminho próprio, um direcionamento focado nos potenciais reais da propriedade e não nas quatro paredes dela.', icon: <Target className="w-6 h-6 text-primary-2" /> },
            { letter: 'A', title: 'Ação', desc: 'Com a estratégia definida, a execução começa em várias frentes ao mesmo tempo. Vídeo para o Instagram que mostra o imóvel de forma narrativa, de acordo com o consumidor. Vídeo longo para o YouTube que contextualiza o bairro, entrega o estilo de vida completo. Tour virtual onde o comprador de São Paulo caminha dentro do imóvel antes de comprar passagem. Site exclusivo. Campanha segmentada para o perfil certo de renda e intenção de compra. São várias frentes colocando o imóvel em evidência no mercado. Cada uma com um papel. Tudo operando com dados e acompanhamento constante.', icon: <Zap className="w-6 h-6 text-primary-2" /> }
          ].map((item, i) => (
            <FadeUp key={i} delay={i * 0.15} className={i === 0 ? "md:col-span-2" : ""}>
              <div className={`p-8 sm:p-12 rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.05)] border border-white/50 h-full group hover:-translate-y-1 transition-transform duration-300 flex flex-col ${i === 0 ? 'bg-primary-1 text-white md:flex-row md:items-start md:gap-12' : 'bg-white'}`}>
                
                <div className={`${i === 0 ? 'md:w-[40%] flex-shrink-0' : 'mb-6'}`}>
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold group-hover:scale-110 transition-transform ${i === 0 ? 'bg-white/10 text-white mb-8' : 'bg-primary-2/10 text-primary-2 mb-6'}`}>
                    {item.letter}
                  </div>
                  <h3 className={`text-[32px] sm:text-[36px] font-serif ${i === 0 ? 'text-white' : 'text-primary-1 mb-4'}`}>
                    {item.title}
                  </h3>
                </div>
                
                <div className={`${i === 0 ? 'md:w-[60%] md:pl-12 md:border-l border-white/20 pt-6 md:pt-0 mt-6 md:mt-0' : 'flex-1'}`}>
                  <p className={`text-[16px] leading-[1.7] ${i === 0 ? 'text-white/80' : 'text-text-sec'}`}>
                    {item.desc}
                  </p>
                </div>

              </div>
            </FadeUp>
          ))}
        </div>
      </Section>

      {/* The Ecosystem */}
      <Section>
        <div className="text-center max-w-3xl mx-auto mb-20">
          <FadeUp>
            <Eyebrow>Quem Executa</Eyebrow>
            <h2 className="text-4xl sm:text-5xl text-primary-1 mb-6">Duas forças trabalhando juntas</h2>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <FadeUp delay={0.1}>
            <div className="bg-white p-10 lg:p-12 rounded-[2.5rem] shadow-2xl shadow-black/5 h-full border border-black/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-2/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="w-20 h-20 rounded-full bg-primary-1 text-white flex items-center justify-center text-2xl font-serif mb-8">MH</div>
              <h3 className="text-3xl text-primary-1 mb-2">Marco Henrique</h3>
              <p className="text-text-sec leading-relaxed space-y-4 flex flex-col gap-4">
                <span>Marco desenvolveu uma leitura de Ilhabela que não se aprende em curso.</span>
                <span>Anos de mercado local ensinaram a ler a cidade. O comportamento de quem compra, o que cada bairro entrega de verdade, como o cliente percebe valor além das quatro paredes. Essa leitura é o que permite transformar um imóvel em algo que faz sentido para o comprador certo.</span>
                <span>E quando esse comprador chega, é essa credibilidade que conduz a negociação.</span>
              </p>
            </div>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="bg-primary-1 p-10 lg:p-12 rounded-[2.5rem] shadow-2xl shadow-black/10 h-full relative overflow-hidden text-white">
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-2/10 blur-3xl rounded-full translate-y-1/2 -translate-x-1/2"></div>
              <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center text-2xl font-serif mb-8 backdrop-blur-sm">OPA</div>
              <h3 className="text-3xl mb-2">Equipe Interna OPA</h3>
              <p className="text-white/80 leading-relaxed space-y-4 flex flex-col gap-4">
                <span>Por trás da estratégia existe uma equipe dedicada. Captação. Edição. Redação. Gestão de tráfego. Site dedicado. Assessoria jurídica.</span>
                <span>Tudo operando internamente. Porque quando estratégia e execução estão em mãos separadas, o resultado normalmente também se perde no caminho.</span>
              </p>
            </div>
          </FadeUp>
        </div>

        <FadeUp delay={0.4} className="mt-20 max-w-4xl mx-auto">
          <blockquote className="text-center">
            <p className="text-2xl sm:text-3xl text-primary-1 font-serif italic mb-8 leading-relaxed">
              "A gente conta a história do imóvel, do bairro, do estilo de vida e leva isso direto para quem está pronto para comprar."
            </p>
            <footer className="flex items-center justify-center gap-4">
              <img src="https://picsum.photos/seed/marco/100/100" alt="Marco Henrique" className="w-12 h-12 rounded-full object-cover" referrerPolicy="no-referrer" />
              <div className="text-left">
                <strong className="block text-primary-1 font-medium">Marco Henrique</strong>
                <span className="text-sm text-text-sec">Sócio-fundador da OPA Imóveis</span>
              </div>
            </footer>
          </blockquote>
        </FadeUp>
      </Section>

      {/* Imóveis que confiam na OPA */}
      <Section altBg>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeUp>
            <Eyebrow>Portfólio</Eyebrow>
            <h2 className="text-4xl sm:text-5xl text-primary-1 mb-6">Propriedades que estão sob nossa gestão agora</h2>
            <p className="text-text-sec text-lg mb-8">
              Não trabalhamos com volume. Trabalhamos com comprometimento.
            </p>
            <p className="text-text-sec text-lg">
              Cada imóvel que entra na Composição O.P.A recebe atenção de equipe completa, estratégia própria e acompanhamento constante. Por isso o número de projetos simultâneos é limitado e proposital. Abaixo, algumas das propriedades que estão sendo trabalhadas agora.
            </p>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', title: 'Casa com vista panorâmica', desc: 'Siriúba' },
            { img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80', title: 'Refúgio na Mata Atlântica', desc: 'Feiticeira' },
            { img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', title: 'Propriedade pé na areia', desc: 'Curral' },
          ].map((item, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div className="group relative rounded-[2rem] overflow-hidden aspect-[4/3] shadow-lg">
                <img 
                  src={item.img}
                  alt="Imóvel" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-1/90 via-primary-1/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <h3 className="text-white font-serif text-xl mb-2">{item.title}</h3>
                  <p className="text-white/80 text-sm">{item.desc}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </Section>

      {/* Deliverables */}
      <Section>
        <div className="text-center max-w-3xl mx-auto mb-20">
          <FadeUp>
            <Eyebrow>O que você recebe</Eyebrow>
            <h2 className="text-4xl sm:text-5xl text-primary-1 mb-6">Como um imóvel é apresentado quando entra na Composição O.P.A</h2>
            <p className="text-text-sec text-lg">
              Cada propriedade recebe uma estrutura completa de posicionamento. O objetivo não é divulgar. É fazer o imóvel chegar até quem realmente pode comprá-lo.
            </p>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { tag: 'Olhar', title: 'Curadoria e narrativa do imóvel', desc: 'O imóvel passa por um filtro interno. Marco lê arquitetura, contexto do bairro e, principalmente, entende quem é o cliente para aquela propriedade. A curadoria responde: esse imóvel está no preço? Ele conecta com o propósito da OPA? Existe um comprador real para ele agora? Se a resposta for sim, tudo o que vem depois é construído para esse comprador específico. Não para o mercado em geral.', icon: <Eye /> },
            { tag: 'Posicionamento', title: 'Vídeo cinematográfico', desc: 'Produção em linguagem de produto. Uma narrativa que desperta desejo em quem ainda não visitou e cria convicção em quem já está considerando. O imóvel precisa parar o scroll. Não apenas aparecer nele.', icon: <Video /> },
            { tag: 'Posicionamento', title: 'Tour virtual de alta fidelidade', desc: 'O comprador de SP, RJ ou do exterior percorre cada cômodo antes de agendar visita presencial. Isso não é comodidade. É filtro. Quem chega ao imóvel já chegou para comprar.', icon: <Map /> },
            { tag: 'Posicionamento', title: 'Site exclusivo do imóvel', desc: 'Um endereço digital dedicado com vídeo, tour, imagens e narrativa completa. Não um link de portal. Uma experiência à altura do que está sendo oferecido. Quando o comprador pesquisa, encontra o imóvel posicionado como produto.', icon: <Globe /> },
            { tag: 'Ação', title: 'Campanha de aquisição segmentada', desc: 'Google Ads com segmentação para o top 5% e 10% da renda familiar em SP, RJ e BH. Mapeamento de intenção de compra ativa. Proteção total contra curiosos. Remarketing. Relatório semanal.', icon: <TrendingUp /> },
            { tag: 'Ação', title: 'Segurança jurídica até as chaves', desc: 'Assessoria documental completa do primeiro contato até a assinatura. Em Ilhabela, imóveis de alto padrão frequentemente carregam históricos complexos. A OPA garante que nada disso trava a negociação.', icon: <ShieldCheck /> }
          ].map((item, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-black/5 border border-primary-1/5 h-full flex flex-col group hover:-translate-y-1 transition-transform duration-300">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-full bg-bg-main flex items-center justify-center text-primary-2 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary-1/40 bg-bg-main px-3 py-1 rounded-full">{item.tag}</span>
                </div>
                <h3 className="text-xl text-primary-1 mb-4 font-serif font-medium">{item.title}</h3>
                <p className="text-text-sec text-sm leading-relaxed flex-grow">{item.desc}</p>
                <div className="mt-6 pt-6 border-t border-bg-alt">
                  <a href="#" className="inline-flex items-center gap-2 text-sm font-medium text-primary-2 hover:text-primary-1 transition-colors">
                    Veja funcionando <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </Section>

      {/* Segurança do Patrimônio */}
      <Section altBg>
        <div className="text-center max-w-3xl mx-auto mb-20">
          <FadeUp>
            <Eyebrow>Segurança do Patrimônio</Eyebrow>
            <h2 className="text-4xl sm:text-5xl text-primary-1 mb-6">Vender um imóvel de alto padrão exige mais do que encontrar um comprador</h2>
            <p className="text-text-sec text-lg">
              A maioria das pessoas não percebe o risco até estar no meio do processo. Um imóvel precificado errado perde valor antes de receber a primeira visita. Um histórico documental mal resolvido pode travar a negociação no momento mais avançado. E um processo conduzido sem discrição expõe o proprietário de formas que ele nem imagina. A OPA trabalha com os três ao mesmo tempo.
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.2}>
          <SegurancaList />
        </FadeUp>
      </Section>

      {/* The 90 Days */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-12 max-w-3xl mx-auto text-center">
            <FadeUp>
              <Eyebrow>Os 90 dias</Eyebrow>
              <h2 className="text-4xl sm:text-5xl text-primary-1 mb-6">O que acontece nos primeiros 90 dias</h2>
              <p className="text-text-sec text-lg mb-8">
                O lançamento de um imóvel exclusivo não é um evento de um dia, é um processo de construção de desejo e valor. Durante 90 dias, nosso objetivo não é apenas gerar visualizações, mas sim encontrar, qualificar e trazer à mesa de negociação o comprador ideal, protegendo a exclusividade da sua propriedade a cada etapa.
              </p>
            </FadeUp>
          </div>
          <div className="lg:col-span-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { phase: 'Fase 1', days: 'Dias 1 a 30', title: 'Apresentação e Filtro', icon: <Eye className="w-8 h-8" />, desc: 'O imóvel é posicionado no mercado com a narrativa correta. Nosso foco é mapear o perfil exato de quem demonstra interesse real, filtrando curiosos para proteger a exclusividade do imóvel.' },
                { phase: 'Fase 2', days: 'Dias 31 a 60', title: 'Qualificação e Ajuste', icon: <Target className="w-8 h-8" />, desc: 'Intensificamos o contato com os perfis mais promissores. A comunicação se torna extremamente assertiva e o foco se volta inteiramente para as famílias e investidores com potencial de compra.' },
                { phase: 'Fase 3', days: 'Dias 61 a 90', title: 'Tração e Negociação', icon: <CheckCircle2 className="w-8 h-8" />, desc: 'O desejo foi construído. Nesta fase, as conexões estabelecidas se transformam em propostas sérias. Conduzimos os compradores qualificados até a mesa, garantindo a defesa do valor.' }
              ].map((item, i) => (
                <FadeUp key={i} delay={i * 0.15}>
                  <div className="bg-white p-8 rounded-[2rem] shadow-md border border-primary-1/5 flex flex-col sm:flex-row gap-6 items-start">
                    <div className="flex-shrink-0 w-24 h-24 rounded-full bg-bg-main flex flex-col items-center justify-center border border-primary-2/20 text-primary-2">
                      <span className="text-xs text-text-sec uppercase tracking-wider mb-1">{item.phase}</span>
                      {item.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl text-primary-1 font-serif">{item.title}</h3>
                        <span className="text-xs bg-primary-1/5 text-primary-1 px-2 py-1 rounded-full">{item.days}</span>
                      </div>
                      <p className="text-text-sec text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Transparência */}
      <Section altBg>
        <div className="max-w-4xl mx-auto text-center">
          <FadeUp>
            <Eyebrow>Transparência</Eyebrow>
            <h2 className="text-4xl text-primary-1 mb-6">Uma coisa que nenhuma estratégia séria pode garantir</h2>
            <p className="text-text-sec mb-8 leading-relaxed text-lg">
              Nenhuma campanha garante a venda de um imóvel. O mercado tem variáveis que ninguém controla.<br/>
              O que a OPA se compromete é outra coisa.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-3xl mx-auto">
              {[
                'Estratégia clara',
                'Execução consistente',
                'Inteligência de dados ao longo da campanha',
                'Compradores qualificados chegando ao imóvel'
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start bg-white p-5 rounded-xl shadow-sm border border-black/5">
                  <CheckCircle2 className="w-6 h-6 text-primary-2 flex-shrink-0" />
                  <span className="text-primary-1 font-medium leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-text-sec mt-10 text-lg font-serif italic text-primary-1">
              É isso que aumenta, de forma real e mensurável, a probabilidade de venda. Não prometemos o que não controlamos. E entregamos o que prometemos.
            </p>
          </FadeUp>
        </div>
      </Section>

      {/* Depoimentos */}
      <Section>
        <div className="max-w-4xl mx-auto text-center">
          <FadeUp>
            <Eyebrow>Depoimentos</Eyebrow>
            <h2 className="text-4xl sm:text-5xl text-primary-1 mb-16">O que diz quem passou pelo processo</h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="bg-white p-10 sm:p-16 rounded-[3rem] shadow-xl border border-primary-1/5 relative">
              <div className="absolute top-8 left-8 text-primary-2/20">
                 <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
              </div>
              <p className="relative z-10 text-xl sm:text-2xl text-primary-1 italic leading-relaxed mb-10 text-left pt-6 px-4">
                "Para quem não queria nem pisar mais na casa, acho que houve um trabalho muito delicado para a conversão acontecer. Uma venda não se constrói de um dia para a noite. Exige muito preparo. E hoje você está muito preparado."
              </p>
              <div className="flex items-center gap-4 border-t border-bg-alt pt-6 px-4">
                <div className="w-12 h-12 rounded-full bg-primary-1 text-white flex items-center justify-center font-bold">P</div>
                <div className="text-left">
                  <strong className="block text-primary-1">Proprietário</strong>
                  <span className="text-sm text-text-sec">Ilhabela, SP</span>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </Section>

      {/* Filtro */}
      <Section altBg>
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <div className="bg-primary-1 p-10 sm:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden text-white text-center">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-2/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-2/10 blur-3xl rounded-full translate-y-1/2 -translate-x-1/2"></div>
              
              <div className="relative z-10">
                <Eyebrow className="text-white/60">Filtro</Eyebrow>
                <h2 className="text-4xl font-serif mb-8 leading-relaxed">
                  A Composição O.P.A não é para qualquer imóvel
                </h2>
                <p className="text-white/80 text-lg leading-relaxed mb-6 max-w-2xl mx-auto">
                  Antes de qualquer coisa, o imóvel passa por uma leitura interna. A gente avalia se ele está no preço, se conecta com o propósito da OPA e se existe um comprador real para ele agora.
                </p>
                <p className="text-white/80 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
                  Aprovando, sentamos com o proprietário, analisamos os potenciais principais e desenvolvemos todo o processo juntos. Trabalhamos com poucos projetos por vez. Não tem como ser diferente se a proposta é dedicação real.
                </p>

                <button 
                  onClick={() => document.getElementById('diagnostico')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-primary-1 rounded-full font-bold text-[16px] tracking-wide overflow-hidden transition-transform hover:-translate-y-1 shadow-lg"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Quero uma análise do meu imóvel <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </div>
          </FadeUp>
        </div>
      </Section>

      {/* CTA / Form */}
      <Section id="diagnostico" className="relative overflow-hidden py-32">
        <div className="absolute top-0 left-0 w-full h-full bg-primary-1/5 mix-blend-multiply pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-2/10 blur-[100px] rounded-full pointer-events-none z-0"></div>
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <FadeUp>
            <Eyebrow>Análise Especializada</Eyebrow>
            <h2 className="text-4xl sm:text-5xl font-serif text-primary-1 mb-6">Diagnóstico Inicial do Imóvel</h2>
            <p className="text-lg text-text-sec max-w-2xl mx-auto mb-16 leading-relaxed">
              Responda algumas perguntas rápidas sobre a sua propriedade. Isso nos ajuda a entender o perfil do imóvel e avaliar se a Composição O.P.A é o caminho certo para ele.
            </p>
          </FadeUp>

          <FadeUp delay={0.2} className="relative z-20">
            <DiagnosisForm />
          </FadeUp>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-bg-main py-12 text-center border-t border-primary-1/10">
        <p className="text-text-sec text-sm">
          &copy; {new Date().getFullYear()} OPA Imóveis. Todos os direitos reservados. Ilhabela, SP.
        </p>
      </footer>

    </div>
  );
}
