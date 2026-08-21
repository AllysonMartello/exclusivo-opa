"use client";

import React, { useState } from "react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function PopCadastroClient() {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const toggleCheck = (index: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const checklist = [
    "Formulário do proprietário recebido",
    "Pasta do Drive criada",
    "Fotos e vídeos organizados",
    "Informações ajustadas no GPT OPA",
    "Cadastro preenchido na plataforma",
    "Metragem (área total e construída) conferida",
    "Preço, condomínio e IPTU conferidos",
    "Valor, características e localização conferidos",
    "Fotos e capa conferidas",
    "Página final revisada",
  ];

  const allChecked = checklist.every((_, i) => checkedItems[i]);

  return (
    <div className="min-h-screen bg-[#0A2634] text-slate-100 font-sans selection:bg-[#2A82B0] selection:text-white pb-24 antialiased">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 pt-8 sm:pt-12">
        
        {/* Back Link */}
        <Link 
          href="/interno" 
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Voltar para Links Internos
        </Link>

        {/* Header */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#2A82B0] to-[#0C2D3E] border border-white/10 rounded-[32px] p-8 sm:p-10 mb-8 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle background element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10">
            <span className="inline-block text-[11px] font-bold tracking-[0.15em] uppercase bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full mb-5 text-white">
              POP OPA
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight mb-4 leading-tight">
              Cadastramento de Imóvel
            </h1>
            <p className="text-white/80 text-base sm:text-lg max-w-2xl font-light leading-relaxed">
              Fluxo padrão para organizar informações, materiais e publicar um novo imóvel na plataforma da OPA.
            </p>
          </div>
        </motion.section>

        {/* Info Grid */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
        >
          <div className="bg-[#0E3142] border border-white/10 rounded-2xl p-5">
            <span className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1.5 font-semibold">Objetivo</span>
            <strong className="block text-sm sm:text-base text-white font-medium">Não perder informações e facilitar o cadastro.</strong>
          </div>
          <div className="bg-[#0E3142] border border-white/10 rounded-2xl p-5">
            <span className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1.5 font-semibold">Responsável</span>
            <strong className="block text-sm sm:text-base text-white font-medium">Corretor responsável pelo imóvel.</strong>
          </div>
          <div className="bg-[#0E3142] border border-white/10 rounded-2xl p-5">
            <span className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1.5 font-semibold">Resultado final</span>
            <strong className="block text-sm sm:text-base text-white font-medium">Imóvel publicado e ajustes concluídos.</strong>
          </div>
        </motion.section>

        <h2 className="text-2xl font-medium text-white mb-6">Fluxo Passo a Passo</h2>

        {/* Steps */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {[
            {
              title: "Enviar o formulário ao proprietário",
              desc: "Enviar o formulário padrão de captação e solicitar o preenchimento com todas as informações disponíveis sobre o imóvel.",
              owner: "Captação / Corretor"
            },
            {
              title: "Solicitar a pasta do Drive",
              desc: "Pedir ao Allyson ou Kallyl a criação da pasta do imóvel no Drive, seguindo o padrão de organização da OPA.",
              owner: "Allyson / Kallyl"
            },
            {
              title: "Subir fotos e vídeos",
              desc: "Organizar na pasta todos os materiais disponíveis do imóvel.",
              list: [
                "Fotos",
                "Vídeos",
                "Plantas, documentos ou materiais complementares, quando houver",
                "Se faltar material, solicitar diretamente ao proprietário"
              ]
            },
            {
              title: "Ajustar as informações com o GPT OPA",
              desc: "Pegar as informações respondidas no formulário e enviar para o GPT OPA organizar, revisar e transformar no padrão de cadastro da empresa.",
              alert: "Importante: não inventar informações que não estejam no formulário."
            },
            {
              title: "Cadastrar na plataforma da OPA",
              desc: "Inserir as informações revisadas, características, valores e mídias na plataforma. Preencher todos os campos aplicáveis."
            },
            {
              title: "Conferir o cadastro",
              desc: "Abrir o imóvel publicado e revisar como um cliente veria, conferindo dado por dado contra o formulário do proprietário e a documentação do imóvel.",
              list: [
                "Metragem: área total e área construída conferem com o informado/documentação",
                "Preço: valor de venda ou locação, condomínio e IPTU",
                "Características: quartos, suítes, banheiros, vagas e demais itens",
                "Localização e endereço corretos",
                "Fotos, capa e textos revisados",
                "Se houver divergência, confirmar com o proprietário antes de seguir"
              ],
              alert: "Não finalizar com metragem ou preço em dúvida."
            }
          ].map((step, idx) => (
            <article key={idx} className="bg-[#0E3142] border border-white/10 rounded-2xl p-5 sm:p-6 flex gap-4 sm:gap-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 flex items-center justify-center rounded-xl bg-[#2A82B0]/20 text-[#55B3E6] font-bold text-lg border border-[#2A82B0]/30">
                {idx + 1}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed mb-1">
                  {step.desc}
                </p>
                {step.list && (
                  <ul className="list-disc list-outside ml-4 mt-3 space-y-1.5 text-sm sm:text-base text-slate-300 font-light">
                    {step.list.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
                {step.owner && (
                  <div className="mt-4 inline-block px-3 py-1.5 bg-[#061B25] border border-white/5 rounded-lg text-xs font-semibold text-slate-300">
                    Responsável: {step.owner}
                  </div>
                )}
                {step.alert && (
                  <div className="mt-4 inline-block px-3 py-1.5 bg-rose-500/10 border border-rose-500/20 rounded-lg text-xs font-semibold text-rose-200">
                    {step.alert}
                  </div>
                )}
              </div>
            </article>
          ))}
        </motion.section>

        {/* Final Checklist */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-10 p-6 sm:p-8 bg-[#0E3142] border-l-4 border-emerald-500 border-y border-r border-white/10 rounded-r-2xl rounded-l-md"
        >
          <h2 className="text-xl font-medium text-white mb-6">Checklist antes de finalizar</h2>
          
          <div className="space-y-3">
            {checklist.map((item, idx) => (
              <label 
                key={idx} 
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-white/5"
              >
                <div className="relative flex items-center justify-center pt-0.5">
                  <input 
                    type="checkbox" 
                    checked={!!checkedItems[idx]}
                    onChange={() => toggleCheck(idx)}
                    className="peer sr-only"
                  />
                  <div className="w-5 h-5 rounded-[6px] border-2 border-slate-500 peer-checked:border-emerald-500 peer-checked:bg-emerald-500 transition-all flex items-center justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                  </div>
                </div>
                <span className={`text-sm sm:text-base transition-colors ${checkedItems[idx] ? 'text-slate-400 line-through decoration-slate-500' : 'text-slate-200'}`}>
                  {item}
                </span>
              </label>
            ))}
          </div>

          <AnimatePresence>
            {allChecked && (
              <motion.div 
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl p-4 text-sm font-semibold flex items-center gap-2 overflow-hidden"
              >
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                Tudo certo? Boa. Imóvel cadastrado.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        <div className="mt-16 text-center text-xs text-slate-500">
          OPA Curadoria Imobiliária · Procedimento Operacional Padrão
        </div>
      </div>
    </div>
  );
}
