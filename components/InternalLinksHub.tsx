"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Copy,
  Check,
  ExternalLink,
  Share2,
  Folder,
  FileText,
  UserCheck,
  Globe,
  Home,
  Sparkles,
  ClipboardList,
  Handshake,
  Layers,
  Sparkle
} from "lucide-react";

export type InternalLinkItem = {
  id: string;
  title: string;
  url: string;
  description: string;
  category: "marco" | "opa" | "engenho";
  badge: string;
  isExternalSharepoint?: boolean;
  icon: React.ElementType;
  accentColor: string;
};

const CATEGORIES = [
  { id: "all", label: "Todos os Acessos", icon: Layers },
  { id: "marco", label: "Marco Henrique", icon: UserCheck },
  { id: "opa", label: "Sites OPA", icon: Globe },
  { id: "engenho", label: "Engenho D'Água", icon: Home },
] as const;

const INTERNAL_LINKS: InternalLinkItem[] = [
  // LINKS E ACESSOS MARCO
  {
    id: "midia-kit-marco",
    title: "Mídia Kit Marco",
    url: "https://exclusivo.opailhabela.com.br/midia-kit-marco",
    description: "Apresentação institucional, perfil do público, métricas de audiência e formatos de parceria do corretor Marco Henrique.",
    category: "marco",
    badge: "Mídia Kit",
    icon: FileText,
    accentColor: "#3B82F6", // Blue
  },
  {
    id: "linkbio-marco",
    title: "Linkbio Marco",
    url: "https://exclusivo.opailhabela.com.br/marco",
    description: "Hub de links exclusivo do corretor Marco Henrique para redes sociais e contato com clientes.",
    category: "marco",
    badge: "Linkbio",
    icon: UserCheck,
    accentColor: "#10B981", // Emerald
  },

  // SITES DA OPA
  {
    id: "linkbio-opa",
    title: "Linkbio OPA (Página Principal)",
    url: "https://exclusivo.opailhabela.com.br/",
    description: "Portal principal de links da OPA Imóveis Ilhabela com imóveis exclusivos e acessos institucionais.",
    category: "opa",
    badge: "Linkbio OPA",
    icon: Globe,
    accentColor: "#0071C6", // OPA Brand Blue
  },
  {
    id: "lancamento-opa",
    title: "Lançamento OPA",
    url: "https://exclusivo.opailhabela.com.br/lancamento-opa",
    description: "Página de lançamentos de imóveis e empreendimentos exclusivos da OPA Imóveis.",
    category: "opa",
    badge: "Lançamentos",
    icon: Sparkles,
    accentColor: "#8B5CF6", // Purple
  },
  {
    id: "cadastro-imovel",
    title: "Cadastro de Imóvel",
    url: "https://exclusivo.opailhabela.com.br/cadastro-imovel",
    description: "Formulário direto para proprietários e captação de novos imóveis em Ilhabela.",
    category: "opa",
    badge: "Captação",
    icon: ClipboardList,
    accentColor: "#F59E0B", // Amber
  },
  {
    id: "midia-kit-opa",
    title: "Mídia Kit OPA",
    url: "https://exclusivo.opailhabela.com.br/midia-kit-opa",
    description: "Apresentação institucional completa e kit comercial da OPA Imóveis Ilhabela.",
    category: "opa",
    badge: "Mídia Kit",
    icon: FileText,
    accentColor: "#06B6D4", // Cyan
  },

  // LINKS E ACESSOS ENGENHO
  {
    id: "nativos-engenho",
    title: "Nativos - Engenho (CA006944)",
    url: "https://opailhabela-my.sharepoint.com/:f:/g/personal/atendimento_opailhabela_com_br/IgC6FgJmrRuOSKz9ImxUlyS8AR5AlMPc_lR5MaQiNzlglv0?e=m6W8PP",
    description: "Pasta oficial no SharePoint contendo arquivos brutos, fotos em alta resolução, vídeos e documentos originais do imóvel.",
    category: "engenho",
    badge: "SharePoint / Arquivos",
    isExternalSharepoint: true,
    icon: Folder,
    accentColor: "#0284C7", // SharePoint Sky Blue
  },
  {
    id: "pagina-exclusiva-engenho",
    title: "Página Exclusiva do Imóvel",
    url: "https://exclusivo.opailhabela.com.br/engenho-CA006944",
    description: "Landing page oficial e exclusiva da Casa Contemporânea no Engenho D'água para apresentação aos clientes.",
    category: "engenho",
    badge: "Site do Imóvel",
    icon: Home,
    accentColor: "#EC4899", // Pink/Rose
  },
  {
    id: "material-corretores-engenho",
    title: "Material para Corretores",
    url: "https://exclusivo.opailhabela.com.br/engenho-CA006944/parcerias",
    description: "Portal de apoio a parceiros com ficha resumida, fotos selecionadas, regras de comissão e mensagens prontas para corretores.",
    category: "engenho",
    badge: "Parcerias & Vendas",
    icon: Handshake,
    accentColor: "#14B8A6", // Teal
  },
];

export default function InternalLinksHub() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const copyToClipboard = (url: string, id: string, title: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setToastMessage(`Link de "${title}" copiado!`);
    setTimeout(() => setCopiedId(null), 2500);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const copyCategoryLinksText = (catId: string, catLabel: string) => {
    const items = INTERNAL_LINKS.filter(
      (item) => catId === "all" || item.category === catId
    );
    const formattedText = `📌 *${catLabel.toUpperCase()} - ACESSOS OPA*\n\n` +
      items.map((i) => `🔹 *${i.title}*\n${i.url}`).join("\n\n");

    navigator.clipboard.writeText(formattedText);
    setToastMessage(`Links da seção "${catLabel}" copiados em formato de mensagem!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredLinks = INTERNAL_LINKS.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const query = search.toLowerCase().trim();
    const matchesSearch =
      !query ||
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.badge.toLowerCase().includes(query) ||
      item.url.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  const categoriesToDisplay = [
    { id: "marco", title: "LINKS E ACESSOS MARCO", desc: "Mídia Kit e Linkbio do corretor Marco Henrique" },
    { id: "opa", title: "SITES DA OPA", desc: "Portais principais, lançamentos, cadastro de imóveis e mídia kit" },
    { id: "engenho", title: "LINKS E ACESSOS ENGENHO", desc: "Arquivos no SharePoint, página do imóvel CA006944 e portal de corretores" },
  ].filter(
    (cat) =>
      selectedCategory === "all" || selectedCategory === cat.id
  );

  return (
    <div className="min-h-screen bg-[#0B131F] text-slate-100 selection:bg-sky-500 selection:text-white pb-24">
      {/* Background Glow Overlay */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-sky-600/15 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl" />
      </div>

      {/* Toast Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 bg-sky-500 text-white font-medium px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-sky-400/40 backdrop-blur-md"
          >
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Check className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14">
        {/* Header Branding */}
        <div className="flex flex-col items-center text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-5 shadow-inner"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
            </span>
            <span>Uso Interno & Equipe OPA</span>
          </motion.div>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.img
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            src="/assets/logo/logo-opa-nova.svg"
            alt="OPA Imóveis Ilhabela"
            className="h-16 sm:h-20 mb-6 drop-shadow-[0_10px_20px_rgba(0,113,198,0.3)]"
          />

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3"
          >
            Central de Links & Acessos
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed font-light"
          >
            Todos os links rápidos, páginas exclusivas, portais e materiais de apoio reunidos em um único lugar organizado.
          </motion.p>
        </div>

        {/* Search & Category Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 p-4 sm:p-5 rounded-2xl shadow-2xl mb-10 space-y-4"
        >
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Pesquisar por nome, link, palavra-chave ou categoria..."
              className="w-full bg-slate-950/70 border border-slate-800 rounded-xl pl-12 pr-10 py-3.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500/70 focus:ring-2 focus:ring-sky-500/20 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded-md transition-colors"
              >
                Limpar
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              const count =
                cat.id === "all"
                  ? INTERNAL_LINKS.length
                  : INTERNAL_LINKS.filter((i) => i.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? "bg-sky-500 text-white shadow-lg shadow-sky-500/25 font-semibold"
                      : "bg-slate-950/50 text-slate-400 hover:text-white hover:bg-slate-800/80 border border-slate-800/60"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                      isActive
                        ? "bg-white/25 text-white"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Links Sections */}
        {filteredLinks.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800/50">
            <p className="text-slate-400 text-base mb-2">Nenhum resultado encontrado para &quot;{search}&quot;</p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("all");
              }}
              className="text-xs text-sky-400 hover:text-sky-300 underline font-medium"
            >
              Resetar filtros de busca
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {categoriesToDisplay.map((catGroup) => {
              const itemsInGroup = filteredLinks.filter(
                (item) => item.category === catGroup.id
              );

              if (itemsInGroup.length === 0) return null;

              return (
                <motion.section
                  key={catGroup.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="space-y-5"
                >
                  {/* Category Title & Quick Copy All */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
                    <div>
                      <div className="flex items-center gap-2">
                        <Sparkle className="w-4 h-4 text-sky-400" />
                        <h2 className="text-lg font-bold text-white tracking-wide uppercase">
                          {catGroup.title}
                        </h2>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {catGroup.desc}
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        copyCategoryLinksText(catGroup.id, catGroup.title)
                      }
                      className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-slate-700/60 transition-colors shadow-sm"
                      title="Copiar todos os links desta categoria em formato de texto para enviar no WhatsApp"
                    >
                      <Share2 className="w-3.5 h-3.5 text-sky-400" />
                      <span>Copiar Seção</span>
                    </button>
                  </div>

                  {/* Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {itemsInGroup.map((item) => {
                      const Icon = item.icon;
                      const isCopied = copiedId === item.id;

                      return (
                        <div
                          key={item.id}
                          className="group relative bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-slate-700/90 rounded-2xl p-5 transition-all duration-300 shadow-xl flex flex-col justify-between overflow-hidden"
                        >
                          {/* Top Accent Line */}
                          <div
                            className="absolute top-0 left-0 right-0 h-1 transition-opacity duration-300 opacity-60 group-hover:opacity-100"
                            style={{ backgroundColor: item.accentColor }}
                          />

                          <div>
                            {/* Card Header: Icon + Badge */}
                            <div className="flex items-start justify-between gap-3 mb-3">
                              <div
                                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105"
                                style={{
                                  backgroundColor: `${item.accentColor}1A`,
                                  color: item.accentColor,
                                }}
                              >
                                <Icon className="w-5 h-5" />
                              </div>

                              <span
                                className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider border"
                                style={{
                                  backgroundColor: `${item.accentColor}12`,
                                  borderColor: `${item.accentColor}33`,
                                  color: item.accentColor,
                                }}
                              >
                                {item.badge}
                              </span>
                            </div>

                            {/* Title & Description */}
                            <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors mb-1.5">
                              {item.title}
                            </h3>
                            <p className="text-slate-300 text-xs leading-relaxed mb-4 font-light">
                              {item.description}
                            </p>

                            {/* URL Display */}
                            <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl px-3 py-2 text-[11px] font-mono text-slate-400 truncate mb-4 select-all">
                              {item.url}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2 pt-2 border-t border-slate-800/60">
                            {/* Copy Link Button */}
                            <button
                              onClick={() =>
                                copyToClipboard(item.url, item.id, item.title)
                              }
                              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all duration-200 ${
                                isCopied
                                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                                  : "bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700/50"
                              }`}
                            >
                              {isCopied ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                  <span>Copiado!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
                                  <span>Copiar Link</span>
                                </>
                              )}
                            </button>

                            {/* Open External Link Button */}
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-all shadow-md shadow-sky-600/20 shrink-0"
                            >
                              <span>Abrir</span>
                              <ExternalLink className="w-3.5 h-3.5 opacity-90" />
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.section>
              );
            })}
          </div>
        )}

        {/* Footer info */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 pt-8 border-t border-slate-800/80 text-center text-xs text-slate-500 flex flex-col items-center gap-2"
        >
          <p>© {new Date().getFullYear()} OPA Imóveis Ilhabela · Central de Acessos Internos</p>
          <p className="text-[11px] text-slate-600">
            Dica: Adicione esta página aos seus favoritos no navegador para acesso imediato.
          </p>
        </motion.footer>
      </div>
    </div>
  );
}
