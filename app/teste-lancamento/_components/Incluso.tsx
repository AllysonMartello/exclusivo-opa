"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, ExternalLink, X, Maximize2, MapPin, Users, Target as TargetIcon, TrendingUp, Heart, MessageCircle, Send, Bookmark, Eye, Instagram, Youtube, User } from "lucide-react";
import { useT } from "../_i18n/LanguageContext";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📂 CONFIG — coloque as imagens em /public/assets/teste-lancamento/incluso/
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
type PopupConfig =
  | { type: "video"; youtubeId: string }
  | { type: "iframe"; src: string }
  | { type: "image"; src: string; alt: string }
  | { type: "external"; href: string }
  | { type: "custom"; render: () => React.ReactNode };

type IncludedConfig = {
  thumb?: string;                          // imagem estática
  customThumb?: () => React.ReactNode;     // thumb animada (sobrescreve thumb)
  thumbAlt: string;
  popup?: PopupConfig;                     // opcional: sem popup = card sem clique
};

const CONFIGS: IncludedConfig[] = [
  // 0 · Tour virtual 3D — DESTAQUE
  {
    thumb: "/assets/teste-lancamento/tour-lancamento.jpg",
    thumbAlt: "Pré-visualização do tour virtual",
    popup: { type: "iframe", src: "https://my.matterport.com/show/?m=nNXRHwVvsxc&play=1" },
  },
  // 1 · Site exclusivo dedicado — DESTAQUE
  {
    thumb: "/assets/teste-lancamento/lp-lancamento.jpg",
    thumbAlt: "Pré-visualização do site exclusivo",
    popup: { type: "iframe", src: "https://exclusivo.opailhabela.com.br/siriuba-2" },
  },
  // 2 · Vídeo cinematográfico
  {
    thumb: "/assets/teste-lancamento/cinematografico-lancamento.jpg",
    thumbAlt: "Capa do vídeo cinematográfico",
    popup: { type: "video", youtubeId: "7XWgckz3SPU" },
  },
  // 3 · Campanha segmentada (thumb animada + mock no popup)
  {
    customThumb: () => <CampaignAnimatedThumb />,
    thumbAlt: "Visualização de targeting de campanha",
    popup: { type: "custom", render: () => <CampaignPreview /> },
  },
  // 4 · Rede social com tração real — thumb rica + sem popup (conteúdo já é o card)
  {
    customThumb: () => <SocialAnimatedThumb />,
    thumbAlt: "Reels em alta nas redes da OPA",
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Mock de campanha segmentada — post patrocinado + dados de targeting
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function CampaignPreview() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-[360px_1fr] max-h-[80vh] overflow-y-auto">
      {/* Mock Instagram sponsored post */}
      <div className="bg-black p-4 md:p-6 flex items-center justify-center">
        <div className="w-full max-w-[320px] bg-white rounded-2xl overflow-hidden shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between px-3 py-2.5 border-b border-black/5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-1 to-primary-2 flex items-center justify-center text-white text-[10px] font-bold">
                OPA
              </div>
              <div>
                <p className="text-[12px] font-semibold text-black leading-tight">opaimoveisilhabela</p>
                <p className="text-[10px] text-black/50 leading-tight">Patrocinado · Ilhabela, SP</p>
              </div>
            </div>
            <span className="text-black text-lg leading-none">···</span>
          </div>
          {/* Image */}
          <div className="relative aspect-square bg-bg-alt">
            <img
              src="/assets/siriuba-2/area-externa.jpg"
              alt="Post patrocinado"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Actions */}
          <div className="px-3 py-2.5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3 text-black">
                <Heart size={20} strokeWidth={1.8} />
                <MessageCircle size={20} strokeWidth={1.8} />
                <Send size={20} strokeWidth={1.8} />
              </div>
              <Bookmark size={20} strokeWidth={1.8} className="text-black" />
            </div>
            <p className="text-[11px] text-black font-semibold mb-1">487 curtidas</p>
            <p className="text-[11px] text-black leading-snug">
              <span className="font-semibold">opaimoveisilhabela</span>{" "}
              <span className="text-black/80">
                A casa começa silenciosa. A luz entra suave. O mar ainda está mais calmo…
              </span>
            </p>
            <p className="text-[10px] text-black/40 mt-1.5">há 2 horas</p>
          </div>
          {/* CTA */}
          <div className="border-t border-black/5 px-3 py-2.5 flex items-center justify-between bg-black/[0.02]">
            <span className="text-[11px] text-black/60">exclusivo.opailhabela.com.br</span>
            <span className="text-[11px] text-blue-500 font-semibold">Saiba mais ›</span>
          </div>
        </div>
      </div>

      {/* Painel de segmentação */}
      <div className="p-6 md:p-8 bg-bg-main">
        <span className="block text-primary-2 uppercase tracking-[0.3em] text-[10px] font-bold mb-2">
          Configuração da campanha
        </span>
        <h5 className="text-xl md:text-2xl font-serif text-primary-1 mb-6 leading-tight">
          Distribuição paga para o perfil certo
        </h5>

        <div className="space-y-5">
          <div>
            <div className="flex items-center gap-2 text-primary-1 mb-2">
              <MapPin size={16} />
              <span className="text-xs uppercase tracking-widest font-bold">Localização</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {["São Paulo Capital", "ABC", "Campinas", "Jundiaí", "Itaim Bibi", "Alphaville"].map((t) => (
                <span key={t} className="text-xs bg-white px-3 py-1.5 rounded-full text-text-main border border-border-main">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 text-primary-1 mb-2">
              <Users size={16} />
              <span className="text-xs uppercase tracking-widest font-bold">Perfil</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {["35 a 65 anos", "Renda 30k+", "Famílias com filhos", "Sócios / executivos"].map((t) => (
                <span key={t} className="text-xs bg-white px-3 py-1.5 rounded-full text-text-main border border-border-main">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 text-primary-1 mb-2">
              <TargetIcon size={16} />
              <span className="text-xs uppercase tracking-widest font-bold">Interesses</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Casa de praia", "Imóveis alto padrão", "Náutica / vela", "Ilhabela", "Arquitetura"].map((t) => (
                <span key={t} className="text-xs bg-white px-3 py-1.5 rounded-full text-text-main border border-border-main">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-5 mt-2 border-t border-border-main">
            <div className="flex items-center gap-2 text-primary-1 mb-3">
              <TrendingUp size={16} />
              <span className="text-xs uppercase tracking-widest font-bold">Resultado típico (30 dias)</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "82k", label: "Alcance" },
                { value: "1,9k", label: "Cliques" },
                { value: "38", label: "Leads qualificados" },
              ].map((m) => (
                <div key={m.label} className="bg-white rounded-xl p-3 text-center border border-border-main">
                  <p className="text-xl font-serif text-primary-1 leading-none">{m.value}</p>
                  <p className="text-[10px] uppercase tracking-wider text-text-sec mt-1.5">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Thumb animada da Campanha — alvos pulsando em cidades + sweep
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function CampaignAnimatedThumb() {
  const pins = [
    { left: "22%", top: "38%", label: "SP", delay: "0s" },
    { left: "42%", top: "62%", label: "ABC", delay: "0.6s" },
    { left: "30%", top: "78%", label: "Campinas", delay: "1.2s" },
    { left: "62%", top: "45%", label: "Alphaville", delay: "1.8s" },
    { left: "78%", top: "30%", label: "RJ", delay: "2.4s" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      <img
        src="/assets/siriuba-2/luz-natural.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover scale-105 blur-[2px]"
      />
      <div className="absolute inset-0 bg-primary-1/75" />

      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="absolute inset-0 overflow-hidden">
        <div className="campaign-sweep absolute -inset-y-4 -left-1/4 w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12" />
      </div>

      {pins.map((p, i) => (
        <div
          key={i}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: p.left, top: p.top }}
        >
          <span
            className="absolute -inset-3 rounded-full bg-white/30 animate-ping"
            style={{ animationDelay: p.delay, animationDuration: "2.4s" }}
          />
          <span
            className="absolute -inset-1.5 rounded-full bg-white/40"
            style={{
              animation: `campaign-pulse 2.4s ease-out infinite`,
              animationDelay: p.delay,
            }}
          />
          <span className="relative block w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap text-[9px] uppercase tracking-widest text-white/90 font-bold">
            {p.label}
          </span>
        </div>
      ))}

      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[9px] uppercase tracking-[0.2em] text-white font-bold">
          Targeting ativo
        </span>
      </div>

      <style>{`
        @keyframes campaign-pulse {
          0% { transform: scale(0.8); opacity: 0.9; }
          70% { transform: scale(2.2); opacity: 0; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes campaign-sweep {
          0% { transform: translateX(0) skewX(12deg); }
          100% { transform: translateX(450%) skewX(12deg); }
        }
        .campaign-sweep {
          animation: campaign-sweep 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Thumb animada da Rede Social — rede de pessoinhas conectadas
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
type PersonNode = {
  id: number;
  x: number;       // 0-100 (%)
  y: number;       // 0-100 (%)
  size: number;    // px
  active: boolean; // pulsa mais forte
};

const SOCIAL_NODES: PersonNode[] = [
  // Hub central (OPA)
  { id: 0, x: 50, y: 50, size: 42, active: true },
  // Anel próximo
  { id: 1, x: 30, y: 30, size: 32, active: true },
  { id: 2, x: 70, y: 30, size: 32, active: false },
  { id: 3, x: 28, y: 70, size: 32, active: false },
  { id: 4, x: 72, y: 72, size: 32, active: true },
  // Anel intermediário
  { id: 5, x: 14, y: 48, size: 26, active: false },
  { id: 6, x: 86, y: 50, size: 26, active: false },
  { id: 7, x: 50, y: 16, size: 26, active: true },
  { id: 8, x: 50, y: 84, size: 26, active: false },
  // Anel externo
  { id: 9, x: 18, y: 18, size: 20, active: false },
  { id: 10, x: 82, y: 18, size: 20, active: true },
  { id: 11, x: 12, y: 80, size: 20, active: false },
  { id: 12, x: 88, y: 82, size: 20, active: false },
  { id: 13, x: 38, y: 90, size: 20, active: false },
  { id: 14, x: 65, y: 90, size: 20, active: true },
];

const SOCIAL_CONNECTIONS: [number, number][] = [
  // Hub pra anel próximo
  [0, 1], [0, 2], [0, 3], [0, 4],
  // Hub pra intermediário
  [0, 5], [0, 6], [0, 7], [0, 8],
  // Conexões secundárias
  [1, 9], [2, 10], [3, 11], [4, 12],
  [1, 7], [2, 7], [3, 8], [4, 8],
  [11, 13], [12, 14],
];

function SocialAnimatedThumb() {
  const connections = useMemo(
    () =>
      SOCIAL_CONNECTIONS.map(([a, b]) => ({
        a: SOCIAL_NODES[a],
        b: SOCIAL_NODES[b],
        key: `${a}-${b}`,
      })),
    []
  );

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-primary-1 via-primary-1 to-secondary overflow-hidden">
      {/* Textura grid sutil */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* SVG com linhas de conexão */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {connections.map((c, i) => (
          <motion.line
            key={c.key}
            x1={c.a.x}
            y1={c.a.y}
            x2={c.b.x}
            y2={c.b.y}
            stroke="white"
            strokeWidth="0.2"
            strokeOpacity="0.35"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.35 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{
              duration: 0.8,
              delay: 0.4 + i * 0.05,
              ease: "easeOut",
            }}
          />
        ))}
      </svg>

      {/* Ícones de pessoas */}
      {SOCIAL_NODES.map((node, i) => {
        const isHub = node.id === 0;
        return (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{
              duration: 0.5,
              delay: 0.1 + i * 0.07,
              type: "spring",
              stiffness: 200,
              damping: 18,
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            {node.active && (
              <>
                <span
                  className="absolute inset-0 rounded-full bg-white/30 animate-ping"
                  style={{
                    animationDelay: `${i * 0.4}s`,
                    animationDuration: "2.6s",
                  }}
                />
                <span
                  className="absolute inset-0 rounded-full bg-white/20"
                  style={{
                    animation: `social-network-pulse 2.6s ease-out infinite`,
                    animationDelay: `${i * 0.4}s`,
                  }}
                />
              </>
            )}

            <div
              className={`relative rounded-full flex items-center justify-center ${
                isHub
                  ? "bg-white text-primary-1 shadow-[0_0_24px_rgba(255,255,255,0.5)]"
                  : node.active
                  ? "bg-white/95 text-primary-1 shadow-lg"
                  : "bg-white/15 backdrop-blur-sm text-white border border-white/30"
              }`}
              style={{ width: `${node.size}px`, height: `${node.size}px` }}
            >
              <User
                size={node.size * 0.5}
                strokeWidth={isHub ? 2.2 : 1.8}
              />
            </div>
          </motion.div>
        );
      })}

      {/* Selo "em alta agora" + contador */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-full z-10">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[9px] uppercase tracking-[0.2em] text-white font-bold">
          Em alta agora
        </span>
      </div>

      <div className="absolute bottom-3 right-3 text-right text-white z-10">
        <p className="text-xl sm:text-2xl font-serif leading-none">1M+</p>
        <p className="text-[8px] uppercase tracking-widest text-white/60 mt-0.5">
          views / trim.
        </p>
      </div>

      <style>{`
        @keyframes social-network-pulse {
          0% { transform: scale(0.9); opacity: 0.7; }
          70% { transform: scale(2.4); opacity: 0; }
          100% { transform: scale(2.4); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const popupIcon = (type: PopupConfig["type"]) => {
  if (type === "video") return Play;
  if (type === "external") return ExternalLink;
  return Maximize2;
};

export default function Incluso() {
  const t = useT();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenIndex(null);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [openIndex]);

  const activeConfig = openIndex !== null ? CONFIGS[openIndex] : null;
  const activeItem = openIndex !== null ? t.incluso.items[openIndex] : null;

  const handleCardClick = (index: number) => {
    const popup = CONFIGS[index].popup;
    if (!popup) return;
    if (popup.type === "external") {
      window.open(popup.href, "_blank", "noopener,noreferrer");
      return;
    }
    setOpenIndex(index);
  };

  return (
    <section id="incluso" className="py-16 md:py-24 lg:py-32 bg-bg-main relative overflow-hidden">
      <div className="hidden md:block absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-20">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-2/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary-2 uppercase tracking-[0.4em] text-xs font-bold mb-4 md:mb-6 block"
          >
            {t.incluso.eyebrow}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title text-3xl sm:text-5xl md:text-6xl font-serif text-primary-1 leading-tight"
          >
            {t.incluso.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-sec text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed"
          >
            {t.incluso.subtitle}
          </motion.p>
        </div>

        {/* Grid 2 destaques + 3 secundários · 1 col em mobile */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 md:gap-10 lg:gap-12">
          {t.incluso.items.map((item, index) => {
            const cfg = CONFIGS[index];
            const hasPopup = !!cfg.popup;
            const Icon = hasPopup ? popupIcon(cfg.popup!.type) : null;
            const isFeatured = index < 2;
            const spanClass = isFeatured ? "md:col-span-3" : "md:col-span-2";

            // Thumb interna (mesmo conteúdo pra button ou div)
            const ThumbInner = (
              <>
                {cfg.customThumb ? (
                  <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.02]">
                    {cfg.customThumb()}
                  </div>
                ) : (
                  <img
                    src={cfg.thumb}
                    alt={cfg.thumbAlt}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                {hasPopup && (
                  <div className="absolute inset-0 bg-primary-1/15 group-hover:bg-primary-1/30 transition-colors duration-500 pointer-events-none" />
                )}

                {isFeatured && (
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md z-10">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-primary-1 text-[10px] uppercase tracking-[0.15em] font-bold">
                      {t.incluso.featuredLabel}
                    </span>
                  </div>
                )}

                {hasPopup && Icon && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className={`rounded-full bg-white/95 text-primary-1 flex items-center justify-center shadow-2xl transition-transform duration-500 group-hover:scale-110 group-hover:bg-white ${
                        isFeatured ? "w-20 h-20 md:w-24 md:h-24" : "w-14 h-14 md:w-16 md:h-16"
                      }`}
                    >
                      <Icon
                        size={isFeatured ? 36 : 24}
                        strokeWidth={2}
                        className={cfg.popup!.type === "video" ? "ml-1 fill-current" : ""}
                      />
                    </div>
                  </div>
                )}
              </>
            );

            const thumbClass = `group relative w-full aspect-video rounded-2xl overflow-hidden bg-bg-alt transition-all duration-500 ${
              isFeatured
                ? "shadow-xl hover:shadow-[0_30px_60px_-15px_rgba(37,58,71,0.35)] ring-1 ring-primary-1/10"
                : "shadow-md hover:shadow-2xl"
            } ${hasPopup ? "cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-2 focus:ring-offset-2" : ""}`;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px" }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={spanClass}
              >
                {hasPopup ? (
                  <button
                    type="button"
                    onClick={() => handleCardClick(index)}
                    aria-label={`Abrir ${item.title}`}
                    className={thumbClass}
                  >
                    {ThumbInner}
                  </button>
                ) : (
                  <div className={thumbClass}>{ThumbInner}</div>
                )}

                {/* Texto explicativo embaixo da thumb */}
                <div className={isFeatured ? "mt-6 md:mt-7" : "mt-4 md:mt-5"}>
                  <h3
                    className={`font-serif text-primary-1 leading-tight mb-2 md:mb-3 ${
                      isFeatured
                        ? "text-2xl md:text-3xl lg:text-[2rem]"
                        : "text-lg md:text-xl"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`text-text-sec leading-relaxed font-light ${
                      isFeatured ? "text-base md:text-lg" : "text-sm md:text-[15px]"
                    }`}
                  >
                    {item.desc}
                  </p>

                  {/* Bloco "Para você" — entra 200ms depois do card */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px" }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                    className={`mt-4 pl-4 border-l-2 border-primary-2 ${isFeatured ? "md:pl-5" : ""}`}
                  >
                    <span className="block text-primary-2 uppercase tracking-[0.2em] text-[10px] font-bold mb-1.5">
                      {t.incluso.paraVoceLabel}
                    </span>
                    <p
                      className={`text-text-main leading-relaxed ${
                        isFeatured ? "text-[15px] md:text-base" : "text-sm md:text-[15px]"
                      }`}
                    >
                      {item.paraVoce}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal universal */}
      <AnimatePresence>
        {activeConfig?.popup && activeItem && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenIndex(null)}
              className="absolute inset-0 bg-primary-1/90 backdrop-blur-md"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={activeItem.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-5xl"
            >
              <div className="flex items-center justify-between mb-4 text-white">
                <h4 className="text-lg md:text-2xl font-serif">{activeItem.title}</h4>
                <button
                  type="button"
                  onClick={() => setOpenIndex(null)}
                  aria-label={t.incluso.modalClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {activeConfig.popup!.type === "video" && (
                <div className="relative aspect-video w-full bg-black rounded-2xl overflow-hidden shadow-2xl">
                  <iframe
                    src={`https://www.youtube.com/embed/${activeConfig.popup!.youtubeId}?autoplay=1&rel=0`}
                    title={activeItem.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              )}

              {activeConfig.popup!.type === "iframe" && (
                <div className="relative w-full h-[70vh] md:h-[75vh] bg-black rounded-2xl overflow-hidden shadow-2xl">
                  <iframe
                    src={activeConfig.popup!.src}
                    title={activeItem.title}
                    allow="fullscreen; xr-spatial-tracking; accelerometer; gyroscope"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              )}

              {activeConfig.popup!.type === "image" && (
                <div className="relative w-full max-h-[80vh] bg-black rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center">
                  <img
                    src={activeConfig.popup!.src}
                    alt={activeConfig.popup!.alt}
                    className="max-w-full max-h-[80vh] object-contain"
                  />
                </div>
              )}

              {activeConfig.popup!.type === "custom" && activeConfig.popup!.render()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
