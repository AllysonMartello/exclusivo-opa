"use client";

import React, { useState, useMemo, useCallback, useDeferredValue, useEffect } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import {
  Search,
  Copy,
  Check,
  ExternalLink,
  ArrowRight,
  Folder,
  FileText,
  UserCheck,
  Globe,
  Home,
  Sparkles,
  ClipboardList,
  Handshake,
  Layers,
  X,
  ChevronDown
} from "lucide-react";

export type InternalLinkItem = {
  id: string;
  title: string;
  url: string;
  description: string;
  category: "marco" | "opa" | "engenho";
  badge: string;
  icon: React.ElementType;
};

const CATEGORIES = [
  { id: "all", label: "TODOS OS ACESSOS", icon: Layers },
  { id: "marco", label: "MARCO HENRIQUE", icon: UserCheck },
  { id: "opa", label: "SITES OPA", icon: Globe },
  { id: "engenho", label: "ENGENHO D'ÁGUA", icon: Home },
] as const;

const INTERNAL_LINKS: InternalLinkItem[] = [
  // LINKS E ACESSOS MARCO
  {
    id: "midia-kit-marco",
    title: "Mídia Kit Marco Henrique",
    url: "https://exclusivo.opailhabela.com.br/midia-kit-marco",
    description: "Apresentação institucional, perfil do público, métricas de audiência e formatos de parceria do corretor Marco Henrique.",
    category: "marco",
    badge: "Mídia Kit",
    icon: FileText,
  },
  {
    id: "linkbio-marco",
    title: "Linkbio Marco Henrique",
    url: "https://exclusivo.opailhabela.com.br/marco",
    description: "Hub de links exclusivo do corretor Marco Henrique para redes sociais e contato com clientes.",
    category: "marco",
    badge: "Linkbio",
    icon: UserCheck,
  },

  // SITES DA OPA
  {
    id: "linkbio-opa",
    title: "Linkbio OPA (Página Principal)",
    url: "https://exclusivo.opailhabela.com.br/",
    description: "Portal principal de links da OPA Imóveis Ilhabela com imóveis exclusivos e acessos institucionais.",
    category: "opa",
    badge: "Site Principal",
    icon: Globe,
  },
  {
    id: "lancamento-opa",
    title: "Lançamento OPA",
    url: "https://exclusivo.opailhabela.com.br/lancamento-opa",
    description: "Página de lançamentos de imóveis e oportunidades exclusivas da OPA Imóveis.",
    category: "opa",
    badge: "Lançamento",
    icon: Sparkles,
  },
  {
    id: "cadastro-imovel",
    title: "Cadastro de Imóvel",
    url: "https://exclusivo.opailhabela.com.br/cadastro-imovel",
    description: "Formulário direto para proprietários cadastrarem novos imóveis em Ilhabela.",
    category: "opa",
    badge: "Captação",
    icon: ClipboardList,
  },
  {
    id: "midia-kit-opa",
    title: "Mídia Kit OPA",
    url: "https://exclusivo.opailhabela.com.br/midia-kit-opa",
    description: "Apresentação institucional completa e kit comercial da OPA Imóveis Ilhabela.",
    category: "opa",
    badge: "Mídia Kit",
    icon: FileText,
  },

  // LINKS E ACESSOS ENGENHO
  {
    id: "nativos-engenho",
    title: "Nativos - Engenho (CA006944)",
    url: "https://opailhabela-my.sharepoint.com/:f:/g/personal/atendimento_opailhabela_com_br/IgC6FgJmrRuOSKz9ImxUlyS8AR5AlMPc_lR5MaQiNzlglv0?e=m6W8PP",
    description: "Pasta oficial no SharePoint contendo arquivos brutos, fotos em alta resolução, vídeos e documentos originais do imóvel.",
    category: "engenho",
    badge: "SharePoint / Arquivos",
    icon: Folder,
  },
  {
    id: "pagina-exclusiva-engenho",
    title: "Página Exclusiva do Imóvel",
    url: "https://exclusivo.opailhabela.com.br/engenho-CA006944",
    description: "Landing page oficial e exclusiva da Casa Contemporânea no Engenho D'água para apresentação aos clientes.",
    category: "engenho",
    badge: "Site do Imóvel",
    icon: Home,
  },
  {
    id: "material-corretores-engenho",
    title: "Material para Corretores",
    url: "https://exclusivo.opailhabela.com.br/engenho-CA006944/parcerias",
    description: "Portal de apoio a parceiros com ficha resumida, fotos selecionadas, regras de comissão e mensagens prontas para vendas.",
    category: "engenho",
    badge: "Parcerias & Vendas",
    icon: Handshake,
  },
];

// Memoized individual LinkCard component to prevent unnecessary re-renders
const LinkCard = React.memo(function LinkCard({
  item,
  isCopied,
  onCopy,
}: {
  item: InternalLinkItem;
  isCopied: boolean;
  onCopy: (url: string, id: string, title: string) => void;
}) {
  const Icon = item.icon;

  return (
    <div className="group bg-[#0E3142] hover:bg-[#123A4E] border border-white/10 hover:border-white/20 rounded-[24px] p-6 transition-colors duration-200 shadow-xl flex flex-col justify-between transform-gpu">
      <div>
        {/* Category Badge & Icon */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className="text-[10px] uppercase tracking-widest font-semibold text-[#55B3E6] bg-[#55B3E6]/10 border border-[#55B3E6]/20 px-3 py-1 rounded-full">
            {item.badge}
          </span>

          <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 group-hover:text-white transition-colors">
            <Icon className="w-4.5 h-4.5" />
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="text-lg font-semibold text-white tracking-tight group-hover:text-[#55B3E6] transition-colors mb-2">
          {item.title}
        </h3>
        <p className="text-slate-300 text-sm font-light leading-relaxed mb-5">
          {item.description}
        </p>

        {/* URL Display Box */}
        <div className="bg-[#061B25]/80 border border-white/5 rounded-xl px-3.5 py-2.5 text-xs font-mono text-slate-400 truncate mb-6 select-all">
          {item.url}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 pt-4 border-t border-white/10">
        {/* Copy Link Button */}
        <button
          onClick={() => onCopy(item.url, item.id, item.title)}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-xs font-medium transition-all shadow-md active:scale-95 ${
            isCopied
              ? "bg-emerald-600 text-white"
              : "bg-[#2A82B0] hover:bg-[#227099] text-white"
          }`}
        >
          {isCopied ? (
            <>
              <Check className="w-3.5 h-3.5 text-white" />
              <span>Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-white" />
              <span>Copiar Link</span>
            </>
          )}
        </button>

        {/* Open External Link Button */}
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white hover:bg-slate-100 text-[#0A2634] font-semibold text-xs px-5 py-2.5 rounded-full shadow-md flex items-center justify-center gap-1.5 transition-all shrink-0 active:scale-95"
        >
          <span>Abrir</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#0A2634]" />
        </a>
      </div>
    </div>
  );
});

export default function InternalLinksHub() {
  const [rawSearch, setRawSearch] = useState("");
  const deferredSearch = useDeferredValue(rawSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Lock body scroll when iOS sheet is open
  useEffect(() => {
    if (isMobileSheetOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileSheetOpen]);

  const copyToClipboard = useCallback((url: string, id: string, title: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setToastMessage(`Link de "${title}" copiado!`);
    setTimeout(() => setCopiedId(null), 2500);
    setTimeout(() => setToastMessage(null), 3500);
  }, []);

  const copyCategoryLinksText = useCallback((catId: string, catTitle: string) => {
    const items = INTERNAL_LINKS.filter(
      (item) => catId === "all" || item.category === catId
    );
    const formattedText = `📌 *${catTitle} - OPA IMÓVEIS*\n\n` +
      items.map((i) => `• *${i.title}*\n  ${i.url}`).join("\n\n");

    navigator.clipboard.writeText(formattedText);
    setToastMessage(`Links da seção "${catTitle}" copiados em texto!`);
    setTimeout(() => setToastMessage(null), 3500);
  }, []);

  // Filter links with useMemo for 60fps performance
  const filteredLinks = useMemo(() => {
    const query = deferredSearch.toLowerCase().trim();
    return INTERNAL_LINKS.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.badge.toLowerCase().includes(query) ||
        item.url.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [deferredSearch, selectedCategory]);

  const categoriesToDisplay = useMemo(() => {
    return [
      { id: "marco", title: "LINKS E ACESSOS MARCO", desc: "Mídia Kit e Linkbio do corretor Marco Henrique" },
      { id: "opa", title: "SITES DA OPA", desc: "Portais principais, lançamentos, cadastro de imóveis e mídia kit" },
      { id: "engenho", title: "LINKS E ACESSOS ENGENHO", desc: "Arquivos no SharePoint, página do imóvel CA006944 e portal de corretores" },
    ].filter(
      (cat) => selectedCategory === "all" || selectedCategory === cat.id
    );
  }, [selectedCategory]);

  const activeCategoryObj = useMemo(() => {
    return CATEGORIES.find((c) => c.id === selectedCategory) || CATEGORIES[0];
  }, [selectedCategory]);

  // Swipe to close drag gesture handler for mobile sheet
  const handleDragEnd = useCallback((_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > 100 || info.velocity.y > 500) {
      setIsMobileSheetOpen(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0A2634] text-slate-100 font-sans selection:bg-[#2A82B0] selection:text-white pb-24 antialiased">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-8 right-6 z-50 bg-[#2A82B0] text-white font-medium px-5 py-3.5 rounded-full shadow-2xl flex items-center gap-3 border border-white/20 backdrop-blur-md transform-gpu"
          >
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-medium tracking-wide">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Native iOS-Style Bottom Sheet Action Sheet with Swipe Gesture Support */}
      <AnimatePresence>
        {isMobileSheetOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileSheetOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 sm:hidden transform-gpu"
            />

            {/* Bottom Sheet Modal */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 35, mass: 0.8 }}
              drag="y"
              dragConstraints={{ top: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              className="fixed bottom-0 left-0 right-0 z-50 bg-[#0C2D3E] border-t border-white/20 rounded-t-[32px] p-6 pb-10 shadow-2xl sm:hidden max-h-[85vh] flex flex-col transform-gpu touch-pan-y"
            >
              {/* iOS Drag Handle Bar */}
              <div className="w-12 h-1.5 rounded-full bg-white/30 mx-auto mb-6 shrink-0 cursor-grab active:cursor-grabbing" />

              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-lg font-semibold text-white tracking-tight">Filtrar por Categoria</h3>
                  <p className="text-xs text-slate-400 font-light mt-0.5">Selecione uma seção para visualizar os acessos</p>
                </div>
                <button
                  onClick={() => setIsMobileSheetOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors active:scale-95"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* iOS List Options Container */}
              <div className="bg-[#061B25] border border-white/10 rounded-2xl overflow-hidden divide-y divide-white/5">
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = selectedCategory === cat.id;
                  const count =
                    cat.id === "all"
                      ? INTERNAL_LINKS.length
                      : INTERNAL_LINKS.filter((i) => i.category === cat.id).length;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setIsMobileSheetOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-4 transition-all active:bg-white/10 ${
                        isSelected
                          ? "bg-[#2A82B0]/25 text-white font-semibold"
                          : "text-slate-300 hover:bg-white/5 font-medium"
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                            isSelected
                              ? "bg-[#2A82B0] text-white shadow-md"
                              : "bg-white/5 text-slate-400"
                          }`}
                        >
                          <Icon className="w-4.5 h-4.5" />
                        </div>
                        <span className="text-sm tracking-wide">{cat.label}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                          {count} {count === 1 ? "link" : "links"}
                        </span>
                        {isSelected && (
                          <div className="w-6 h-6 rounded-full bg-[#2A82B0] flex items-center justify-center text-white shadow-sm">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-12 sm:pt-16">
        {/* Header Branding */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#55B3E6] mb-6">
            PAINEL INTERNO DE ACESSOS · OPA IMÓVEIS ILHABELA
          </p>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo/logo-opa-nova.svg"
            alt="OPA Imóveis Ilhabela"
            className="h-16 sm:h-20 mb-8 drop-shadow-md"
          />

          <h1 className="text-3xl sm:text-5xl font-semibold text-white tracking-tight mb-4">
            Central de Links & Acessos
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl font-light leading-relaxed">
            Todos os links essenciais, mídias kits e materiais de apoio organizados para rápida consulta e compartilhamento.
          </p>
        </div>

        {/* Search & Category Filter Section */}
        <div className="flex flex-col gap-6 mb-14">
          {/* Main White Pill Search Bar (Matching OPA search UI) */}
          <div className="relative w-full max-w-3xl mx-auto">
            <div className="bg-white rounded-full p-2 pl-6 shadow-2xl border border-white/20 flex items-center gap-3 transition-all focus-within:ring-4 focus-within:ring-[#2A82B0]/30">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                value={rawSearch}
                onChange={(e) => setRawSearch(e.target.value)}
                placeholder="Pesquisar por nome, palavra-chave ou link..."
                className="w-full bg-transparent text-[#0A2634] font-medium text-sm sm:text-base placeholder:text-slate-400 focus:outline-none py-2 pr-4"
              />
              {rawSearch ? (
                <button
                  onClick={() => setRawSearch("")}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors shrink-0 mr-1 active:scale-95"
                >
                  <X className="w-4 h-4" />
                </button>
              ) : null}
            </div>
          </div>

          {/* MOBILE iOS-Style Category Trigger (Visible only on mobile) */}
          <div className="w-full max-w-3xl mx-auto sm:hidden">
            <button
              onClick={() => setIsMobileSheetOpen(true)}
              className="w-full bg-[#061B25] hover:bg-[#08222F] border border-white/15 rounded-full px-6 py-3.5 flex items-center justify-between text-white font-medium shadow-xl transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-3 truncate">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider shrink-0">CATEGORIA:</span>
                <span className="text-xs font-semibold text-[#55B3E6] uppercase tracking-wider truncate">
                  {activeCategoryObj.label}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] bg-white/10 px-2.5 py-0.5 rounded-full text-slate-300">
                  {selectedCategory === "all"
                    ? INTERNAL_LINKS.length
                    : INTERNAL_LINKS.filter((i) => i.category === selectedCategory).length}
                </span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </div>
            </button>
          </div>

          {/* DESKTOP Clean Pill Selector Tabs (Visible on sm and up) */}
          <div className="hidden sm:flex items-center justify-center gap-2 flex-wrap">
            <div className="bg-[#061B25] p-1.5 rounded-full border border-white/10 inline-flex items-center gap-1">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 whitespace-nowrap active:scale-95 ${
                      isActive
                        ? "bg-white text-[#0A2634] shadow-md font-bold"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Links Sections */}
        {filteredLinks.length === 0 ? (
          <div className="text-center py-20 bg-[#071E29] rounded-[28px] border border-white/10">
            <p className="text-slate-300 text-base mb-3 font-light">
              Nenhum acessos encontrado para &quot;{deferredSearch}&quot;
            </p>
            <button
              onClick={() => {
                setRawSearch("");
                setSelectedCategory("all");
              }}
              className="text-xs text-[#55B3E6] hover:text-white uppercase tracking-widest font-semibold underline underline-offset-4"
            >
              Resetar pesquisa
            </button>
          </div>
        ) : (
          <div className="space-y-16">
            {categoriesToDisplay.map((catGroup) => {
              const itemsInGroup = filteredLinks.filter(
                (item) => item.category === catGroup.id
              );

              if (itemsInGroup.length === 0) return null;

              return (
                <section key={catGroup.id} className="space-y-6">
                  {/* Category Title & Quick Copy Link */}
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-white/10">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-medium tracking-tight text-white">
                        {catGroup.title}
                      </h2>
                      <p className="text-xs text-slate-400 font-light mt-1">
                        {catGroup.desc}
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        copyCategoryLinksText(catGroup.id, catGroup.title)
                      }
                      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#55B3E6] hover:text-white transition-colors underline decoration-[#55B3E6]/40 underline-offset-4 self-start sm:self-auto active:scale-95"
                    >
                      <span>Copiar Todos os Links</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {itemsInGroup.map((item) => (
                      <LinkCard
                        key={item.id}
                        item={item}
                        isCopied={copiedId === item.id}
                        onCopy={copyToClipboard}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}

        {/* Clean Footer */}
        <footer className="mt-24 pt-8 border-t border-white/10 text-center text-xs text-slate-400 font-light flex flex-col items-center gap-2">
          <p>© {new Date().getFullYear()} OPA Imóveis Ilhabela · Central de Acessos Internos</p>
          <p className="text-[11px] text-slate-500">
            Dica: Adicione esta página aos seus favoritos do navegador para acesso direto.
          </p>
        </footer>
      </div>
    </div>
  );
}
