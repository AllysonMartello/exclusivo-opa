"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import { User } from "lucide-react";
import { useT } from "../_i18n/LanguageContext";

type ImageVariant = "tour" | "site" | "video" | "target" | "social";
type Media =
  | {
      type: "image";
      src: string;
      variant: ImageVariant;
      href?: string;
    }
  | { type: "campaign" }
  | { type: "social" };

const MEDIA: Media[] = [
  {
    type: "image",
    src: "/assets/lancamento-opa/Tour3d-lancamento.jpg",
    variant: "tour",
    href: "#",
  },
  {
    type: "image",
    src: "/assets/lancamento-opa/siteexclusivo-elite.jpg",
    variant: "site",
    href: "#",
  },
  {
    type: "image",
    src: "/assets/lancamento-opa/cinematografico-3d.jpg",
    variant: "video",
    href: "#",
  },
  { type: "campaign" },
  { type: "social" },
];

export default function Incluso() {
  const t = useT();

  return (
    <section
      id="capitulo"
      className="py-12 md:py-16 lg:py-20 bg-bg-main relative overflow-hidden"
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
            className="text-3xl sm:text-4xl md:text-5xl font-serif text-primary-1"
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
                  <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square max-h-[650px] rounded-3xl overflow-hidden shadow-2xl bg-bg-alt border border-white/5">
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
                  className="w-full lg:w-1/2 lg:px-8 text-center lg:text-left"
                >
                  <h3 className="section-subtitle text-2xl sm:text-3xl md:text-4xl font-serif text-primary-1 leading-tight mb-4">
                    {item.title}
                  </h3>
                  <p className="text-text-sec text-base md:text-lg font-light leading-relaxed mb-4">
                    {item.desc}
                  </p>
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-5">
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

                  {media.type === "image" && (media.variant === "tour" || media.variant === "site" || media.variant === "video") && (
                    <div className="mt-8">
                      <a 
                        href={media.href || "#"} 
                        className="inline-flex items-center justify-center px-8 py-3.5 border border-[#166188] text-[#166188] text-sm font-semibold tracking-wide rounded-full hover:bg-[#166188] hover:text-white transition-colors duration-300 group"
                      >
                        Ver ao vivo
                        <svg viewBox="0 0 24 24" className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  )}
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
// MediaPreview — Imagem estática (ou scroll para o Site)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type MediaImage = Extract<Media, { type: "image" }>;

function MediaPreview({ media, alt }: { media: MediaImage; alt: string }) {
  const isSite = media.variant === "site";

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#0d2535]">
      {isSite ? (
        <img
          src={media.src}
          alt={alt}
          className="w-full h-full object-cover site-scroll-animation"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <img
          src={media.src}
          alt={alt}
          className="w-full h-full object-cover object-center"
          loading="lazy"
          decoding="async"
        />
      )}

      {/* Gradiente escuro para dar um toque sutil no topo e base */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary-1/40 via-transparent to-transparent pointer-events-none" />

      {isSite && (
        <style>{`
          @keyframes site-scroll {
            0% { object-position: top center; }
            100% { object-position: bottom center; }
          }
          .site-scroll-animation {
            animation: site-scroll 22s ease-in-out infinite alternate;
          }
        `}</style>
      )}
    </div>
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
    <div className="absolute inset-0 overflow-hidden bg-primary-1">
      {/* Background image removed as requested */}
      <div className="absolute inset-0 bg-primary-1/90" />

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


