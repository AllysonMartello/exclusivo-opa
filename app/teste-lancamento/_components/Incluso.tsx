"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import { User } from "lucide-react";
import { useT } from "../_i18n/LanguageContext";

type ImageVariant = "tour" | "site" | "video";
type Media =
  | {
      type: "image";
      src: string;
      variant: ImageVariant;
      href?: string;
      videoSrc?: string;
      hint: string;
    }
  | { type: "campaign" }
  | { type: "social" };

const MEDIA: Media[] = [
  {
    type: "image",
    src: "/assets/teste-lancamento/tour-lancamento.jpg",
    variant: "tour",
    href: "#",
    hint: "Iniciar tour 3D",
  },
  {
    type: "image",
    src: "/assets/teste-lancamento/lp-lancamento.jpg",
    variant: "site",
    href: "#",
    hint: "Visitar site",
  },
  {
    type: "image",
    src: "/assets/teste-lancamento/cinematografico-lancamento.jpg",
    variant: "video",
    href: "#",
    hint: "Ver filme",
  },
  { type: "campaign" },
  { type: "social" },
];

export default function Incluso() {
  const t = useT();

  return (
    <section
      id="capitulo"
      className="py-16 md:py-24 lg:py-32 bg-bg-main relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary-2 uppercase tracking-widest text-xs font-bold mb-4 block"
          >
            {t.incluso.eyebrow}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-primary-1"
          >
            {t.incluso.title}
          </motion.h2>
        </div>

        <div className="space-y-16 md:space-y-24 lg:space-y-32">
          {t.incluso.items.map((item, index) => {
            const isOdd = index % 2 === 1;
            const media = MEDIA[index];

            return (
              <div
                key={item.title}
                className={`flex flex-col ${
                  isOdd ? "lg:flex-row-reverse" : "lg:flex-row"
                } gap-8 md:gap-12 lg:gap-20 items-center`}
              >
                <motion.div
                  initial={{ opacity: 0, x: isOdd ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "0px" }}
                  transition={{ duration: 0.8 }}
                  className="w-full lg:w-1/2"
                >
                  <div className="relative aspect-[16/10] lg:aspect-auto lg:h-[560px] rounded-3xl overflow-hidden shadow-2xl bg-bg-alt">
                    {media.type === "image" && (
                      <MediaPreview media={media} alt={item.title} />
                    )}
                    {media.type === "campaign" && <CampaignAnimatedThumb />}
                    {media.type === "social" && <SocialAnimatedThumb />}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="w-full lg:w-1/2 lg:px-8"
                >
                  <ItemIcon index={index} />
                  <h3 className="section-subtitle text-2xl sm:text-3xl md:text-4xl font-serif text-primary-1 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-text-sec text-base md:text-lg font-light leading-relaxed mb-4">
                    {item.desc}
                  </p>
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inc-tag text-[10px] md:text-[11px] uppercase tracking-[0.18em] font-bold px-3 py-1.5 rounded-full bg-gradient-to-br from-primary-1/10 to-primary-2/10 text-primary-2 border border-primary-2/25 backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="text-text-sec text-base md:text-lg font-light leading-relaxed">
                    {item.paraVoce}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MediaPreview — imagem (ou vídeo) com Ken Burns + overlay clicável
// Quando houver MP4, basta preencher `videoSrc` no MEDIA que ele entra
// automaticamente no lugar da imagem (mantendo o overlay).
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
type MediaImage = Extract<Media, { type: "image" }>;

function MediaPreview({ media, alt }: { media: MediaImage; alt: string }) {
  const isInteractive = media.variant === "tour" || media.variant === "video";
  const href = media.href ?? "#";

  return (
    <a
      href={href}
      aria-label={media.hint}
      className="media-preview group block absolute inset-0 w-full h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-0"
    >
      <div className="absolute inset-0 overflow-hidden">
        {media.videoSrc ? (
          <video
            src={media.videoSrc}
            poster={media.src}
            muted
            loop
            autoPlay
            playsInline
            preload="metadata"
            className="image-cover media-zoom"
          />
        ) : (
          <img
            src={media.src}
            alt={alt}
            className="image-cover media-zoom"
            loading="lazy"
            decoding="async"
          />
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-primary-1/65 via-primary-1/10 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/25 pointer-events-none" />

      {isInteractive && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative">
            <span className="absolute inset-0 rounded-full bg-white/30 media-ping" />
            <span className="absolute inset-0 rounded-full bg-white/20 media-ping media-ping-2" />
            <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/95 backdrop-blur-sm shadow-[0_12px_40px_-8px_rgba(0,0,0,0.5)] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <svg
                viewBox="0 0 24 24"
                className="w-7 h-7 md:w-8 md:h-8 text-primary-1 translate-x-[2px]"
                fill="currentColor"
              >
                <path d="M6 4.5 L20 12 L6 19.5 Z" />
              </svg>
            </div>
          </div>
        </div>
      )}

      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3 pointer-events-none">
        <span className="inline-flex items-center gap-2 bg-black/45 backdrop-blur-md px-3.5 py-2 rounded-full text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-white">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {media.hint}
        </span>
        <span className="hidden sm:inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md px-3 py-2 rounded-full text-[10px] uppercase tracking-[0.18em] font-bold text-white translate-x-0 group-hover:translate-x-1 transition-transform">
          Abrir
          <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17 L17 7" />
            <path d="M9 7 L17 7 L17 15" />
          </svg>
        </span>
      </div>

      <style>{`
        @keyframes media-kenburns {
          0%   { transform: scale(1.06) translate3d(0, 0, 0); }
          50%  { transform: scale(1.14) translate3d(-1.5%, -1%, 0); }
          100% { transform: scale(1.06) translate3d(0, 0, 0); }
        }
        .media-zoom {
          animation: media-kenburns 18s ease-in-out infinite;
          will-change: transform;
        }
        .media-preview:hover .media-zoom {
          animation-duration: 9s;
        }
        @keyframes media-ping {
          0%   { transform: scale(0.9); opacity: 0.7; }
          80%, 100% { transform: scale(1.9); opacity: 0; }
        }
        .media-ping {
          animation: media-ping 2.4s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .media-ping-2 {
          animation-delay: 1.2s;
        }
      `}</style>
    </a>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ItemIcon — ícone soft-3D contextual de cada capítulo
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function ItemIcon({ index }: { index: number }) {
  const renderers = [
    TourIcon,
    SiteIcon,
    VideoIcon,
    TargetIcon,
    AudienceIcon,
  ];
  const Render = renderers[index] ?? TourIcon;
  return (
    <div
      className="inc-icon-wrap relative w-16 h-16 md:w-20 md:h-20 mb-5 md:mb-6"
      aria-hidden
    >
      <div className="inc-icon-tile absolute inset-0 rounded-[22px] bg-gradient-to-br from-primary-1 to-primary-2 shadow-[0_14px_28px_-12px_rgba(21,97,135,0.55),inset_0_1px_0_rgba(255,255,255,0.35)]" />
      <div className="absolute inset-0 rounded-[22px] bg-gradient-to-tr from-white/35 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-[3px] rounded-[19px] ring-1 ring-inset ring-white/10 pointer-events-none" />
      <div className="absolute inset-0 flex items-center justify-center p-3 md:p-3.5 text-white">
        <Render />
      </div>
      <style>{`
        @keyframes inc-float {
          0%, 100% { transform: translateY(0) rotate(-1.5deg); }
          50% { transform: translateY(-3px) rotate(1.5deg); }
        }
        .inc-icon-wrap { animation: inc-float 5s ease-in-out infinite; }
        @keyframes inc-spin-y {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
        .inc-cube { transform-style: preserve-3d; animation: inc-spin-y 7s linear infinite; transform-origin: 50% 50%; }
        @keyframes inc-cursor {
          0%, 60% { transform: translate(0,0); }
          70% { transform: translate(6px, 4px); }
          100% { transform: translate(0,0); }
        }
        .inc-cursor { animation: inc-cursor 3.4s ease-in-out infinite; }
        @keyframes inc-scrub {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(8px); }
        }
        .inc-scrub { animation: inc-scrub 2.6s ease-in-out infinite; }
        @keyframes inc-radar {
          0% { transform: rotate(0deg); opacity: 0.95; }
          100% { transform: rotate(360deg); opacity: 0.95; }
        }
        .inc-radar { animation: inc-radar 3.2s linear infinite; transform-origin: 50% 50%; }
        @keyframes inc-ping {
          0% { transform: scale(0.6); opacity: 0.9; }
          80%, 100% { transform: scale(2.2); opacity: 0; }
        }
        .inc-ping { animation: inc-ping 2.2s ease-out infinite; transform-origin: 50% 50%; }
        @keyframes inc-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        .inc-bob-1 { animation: inc-bob 2.2s ease-in-out infinite; }
        .inc-bob-2 { animation: inc-bob 2.2s ease-in-out infinite 0.4s; }
        .inc-bob-3 { animation: inc-bob 2.2s ease-in-out infinite 0.8s; }
      `}</style>
    </div>
  );
}

// 1) Tour 3D — cubo isométrico girando
function TourIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-full h-full overflow-visible">
      <defs>
        <linearGradient id="cubeTop" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="cubeLeft" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id="cubeRight" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <g className="inc-cube">
        <polygon points="24,6 40,14 24,22 8,14" fill="url(#cubeTop)" />
        <polygon points="8,14 24,22 24,40 8,32" fill="url(#cubeLeft)" />
        <polygon points="40,14 24,22 24,40 40,32" fill="url(#cubeRight)" />
        <polyline
          points="8,14 24,22 40,14"
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.7"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        <line
          x1="24"
          y1="22"
          x2="24"
          y2="40"
          stroke="#ffffff"
          strokeOpacity="0.7"
          strokeWidth="0.8"
        />
      </g>
    </svg>
  );
}

// 2) Site dedicado — janela do navegador com cursor pulsando
function SiteIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-full h-full">
      <rect
        x="6"
        y="9"
        width="36"
        height="30"
        rx="4"
        fill="#ffffff"
        fillOpacity="0.92"
      />
      <rect x="6" y="9" width="36" height="7" rx="4" fill="#ffffff" fillOpacity="0.4" />
      <circle cx="10.5" cy="12.5" r="1.1" fill="#156187" opacity="0.7" />
      <circle cx="14" cy="12.5" r="1.1" fill="#156187" opacity="0.7" />
      <circle cx="17.5" cy="12.5" r="1.1" fill="#156187" opacity="0.7" />
      <rect
        x="21"
        y="11"
        width="18"
        height="3"
        rx="1.5"
        fill="#0071c6"
        opacity="0.25"
      />
      <rect x="11" y="21" width="14" height="2" rx="1" fill="#156187" opacity="0.55" />
      <rect x="11" y="25" width="22" height="2" rx="1" fill="#156187" opacity="0.35" />
      <rect x="11" y="29" width="18" height="2" rx="1" fill="#156187" opacity="0.35" />
      <g className="inc-cursor" style={{ transformOrigin: "30px 30px" }}>
        <path
          d="M30 30 L36 32 L33 33.5 L34.5 37 L32.5 38 L31 34.5 L28.5 36 Z"
          fill="#0071c6"
          stroke="#ffffff"
          strokeWidth="0.6"
        />
      </g>
    </svg>
  );
}

// 3) Vídeo em locação — clapboard / play com scrub
function VideoIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-full h-full">
      <rect
        x="6"
        y="14"
        width="36"
        height="26"
        rx="3"
        fill="#ffffff"
        fillOpacity="0.92"
      />
      <path
        d="M6 14 L42 14 L40 10 L4 10 Z"
        fill="#ffffff"
        fillOpacity="0.55"
      />
      <path
        d="M9 14 L13.5 10 L18 14 L13.5 14 Z M18 14 L22.5 10 L27 14 L22.5 14 Z M27 14 L31.5 10 L36 14 L31.5 14 Z"
        fill="#156187"
        opacity="0.85"
      />
      <g className="inc-scrub" style={{ transformOrigin: "24px 27px" }}>
        <polygon
          points="20,21 32,27 20,33"
          fill="#0071c6"
          stroke="#ffffff"
          strokeWidth="0.6"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

// 4) Distribuição calibrada — radar com sweep
function TargetIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-full h-full">
      <circle cx="24" cy="24" r="18" fill="#ffffff" fillOpacity="0.15" />
      <circle cx="24" cy="24" r="13" fill="#ffffff" fillOpacity="0.18" />
      <circle cx="24" cy="24" r="8" fill="#ffffff" fillOpacity="0.22" />
      <circle
        cx="24"
        cy="24"
        r="18"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.6"
        strokeWidth="0.8"
      />
      <circle
        cx="24"
        cy="24"
        r="13"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.5"
        strokeWidth="0.8"
      />
      <circle
        cx="24"
        cy="24"
        r="8"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.4"
        strokeWidth="0.8"
      />
      <line
        x1="6"
        y1="24"
        x2="42"
        y2="24"
        stroke="#ffffff"
        strokeOpacity="0.35"
        strokeWidth="0.5"
      />
      <line
        x1="24"
        y1="6"
        x2="24"
        y2="42"
        stroke="#ffffff"
        strokeOpacity="0.35"
        strokeWidth="0.5"
      />
      <g className="inc-radar" style={{ transformOrigin: "24px 24px" }}>
        <defs>
          <linearGradient id="sweep" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M24 24 L24 6 A18 18 0 0 1 42 24 Z" fill="url(#sweep)" />
      </g>
      <circle cx="24" cy="24" r="2.4" fill="#ffffff" />
    </svg>
  );
}

// 5) Audiência própria — pessoas pulsando em rede
function AudienceIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-full h-full overflow-visible">
      <line
        x1="24"
        y1="24"
        x2="10"
        y2="14"
        stroke="#ffffff"
        strokeOpacity="0.45"
        strokeWidth="0.8"
      />
      <line
        x1="24"
        y1="24"
        x2="38"
        y2="14"
        stroke="#ffffff"
        strokeOpacity="0.45"
        strokeWidth="0.8"
      />
      <line
        x1="24"
        y1="24"
        x2="10"
        y2="36"
        stroke="#ffffff"
        strokeOpacity="0.45"
        strokeWidth="0.8"
      />
      <line
        x1="24"
        y1="24"
        x2="38"
        y2="36"
        stroke="#ffffff"
        strokeOpacity="0.45"
        strokeWidth="0.8"
      />

      <g className="inc-bob-1">
        <circle cx="10" cy="14" r="3.2" fill="#ffffff" fillOpacity="0.85" />
        <circle cx="10" cy="14" r="3.2" fill="none" stroke="#ffffff" strokeOpacity="0.6" className="inc-ping" style={{ transformOrigin: "10px 14px" }} />
      </g>
      <g className="inc-bob-2">
        <circle cx="38" cy="14" r="3.2" fill="#ffffff" fillOpacity="0.6" />
      </g>
      <g className="inc-bob-3">
        <circle cx="10" cy="36" r="3.2" fill="#ffffff" fillOpacity="0.6" />
      </g>
      <g className="inc-bob-2">
        <circle cx="38" cy="36" r="3.2" fill="#ffffff" fillOpacity="0.85" />
        <circle cx="38" cy="36" r="3.2" fill="none" stroke="#ffffff" strokeOpacity="0.6" className="inc-ping" style={{ transformOrigin: "38px 36px" }} />
      </g>

      <circle cx="24" cy="24" r="6" fill="#ffffff" />
      <circle cx="24" cy="24" r="6" fill="none" stroke="#ffffff" strokeOpacity="0.7" className="inc-ping" style={{ transformOrigin: "24px 24px" }} />
      <text
        x="24"
        y="26.5"
        textAnchor="middle"
        fontSize="6"
        fontWeight="700"
        fill="#156187"
        fontFamily="sans-serif"
      >
        OPA
      </text>
    </svg>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Distribuição calibrada — alvos pulsando em cidades + sweep de luz
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
        src="/assets/siriuba-2/luz-natural-desktop.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover scale-105 blur-[2px]"
      />
      <div className="absolute inset-0 bg-primary-1/75" />

      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
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
            className="absolute -inset-4 rounded-full bg-white/30 animate-ping"
            style={{ animationDelay: p.delay, animationDuration: "2.4s" }}
          />
          <span
            className="absolute -inset-2 rounded-full bg-white/40"
            style={{
              animation: `campaign-pulse 2.4s ease-out infinite`,
              animationDelay: p.delay,
            }}
          />
          <span className="relative block w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.9)]" />
          <span className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap text-xs md:text-sm uppercase tracking-widest text-white/90 font-bold">
            {p.label}
          </span>
        </div>
      ))}

      <div className="absolute bottom-6 left-6 flex items-center gap-2 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[11px] md:text-xs uppercase tracking-[0.2em] text-white font-bold">
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
// Audiência própria — rede de pessoas conectadas, hub OPA no centro
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
type PersonNode = {
  id: number;
  x: number;
  y: number;
  size: number;
  active: boolean;
};

const SOCIAL_NODES: PersonNode[] = [
  { id: 0, x: 50, y: 50, size: 64, active: true },
  { id: 1, x: 30, y: 30, size: 48, active: true },
  { id: 2, x: 70, y: 30, size: 48, active: false },
  { id: 3, x: 28, y: 70, size: 48, active: false },
  { id: 4, x: 72, y: 72, size: 48, active: true },
  { id: 5, x: 14, y: 48, size: 38, active: false },
  { id: 6, x: 86, y: 50, size: 38, active: false },
  { id: 7, x: 50, y: 16, size: 38, active: true },
  { id: 8, x: 50, y: 84, size: 38, active: false },
  { id: 9, x: 18, y: 18, size: 30, active: false },
  { id: 10, x: 82, y: 18, size: 30, active: true },
  { id: 11, x: 12, y: 80, size: 30, active: false },
  { id: 12, x: 88, y: 82, size: 30, active: false },
  { id: 13, x: 38, y: 90, size: 30, active: false },
  { id: 14, x: 65, y: 90, size: 30, active: true },
];

const SOCIAL_CONNECTIONS: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [0, 4],
  [0, 5], [0, 6], [0, 7], [0, 8],
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
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

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
            strokeWidth="0.25"
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
                  ? "bg-white text-primary-1 shadow-[0_0_32px_rgba(255,255,255,0.5)]"
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

      <div className="absolute top-6 left-6 flex items-center gap-2 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full z-10">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[11px] md:text-xs uppercase tracking-[0.2em] text-white font-bold">
          Em alta agora
        </span>
      </div>

      <div className="absolute bottom-6 right-6 text-right text-white z-10">
        <p className="text-4xl sm:text-5xl font-serif leading-none">1M+</p>
        <p className="text-[10px] md:text-xs uppercase tracking-widest text-white/60 mt-1">
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
