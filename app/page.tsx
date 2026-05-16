"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "motion/react";

const tabs = [
  { id: "imoveis", label: "Imóveis exclusivos" },
  { id: "acessos", label: "Nossos acessos" },
] as const;

type Tab = (typeof tabs)[number]["id"];

function IconGlobe({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 icon-draw">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function IconBook({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 icon-draw">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function IconYoutube({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 icon-draw">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
  );
}

function IconHome({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 icon-draw">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function IconInstagram({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 icon-draw">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

const acessos = [
  {
    href: "https://opailhabela.com.br/",
    Icon: IconGlobe,
    title: "Site Oficial",
    desc: "Conheça nossos imóveis e serviços",
    color: "#0071C6",
  },
  {
    href: "https://opailhabela.com.br/blog",
    Icon: IconBook,
    title: "Nosso Blog",
    desc: "Acompanhe dicas e novidades",
    color: "#3B9ED4",
  },
  {
    href: "https://www.youtube.com/@marcohenriqueilhabela",
    Icon: IconYoutube,
    title: "YouTube",
    desc: "Vídeos e tours pelos nossos imóveis",
    color: "#FF5252",
  },
  {
    href: "https://www.instagram.com/opaimoveisilhabela/",
    Icon: IconInstagram,
    title: "Instagram",
    desc: "Siga e acompanhe nossos bastidores",
    color: "#E1306C",
  },
  {
    href: "https://opailhabela.com.br/anuncie-seu-imovel/",
    Icon: IconHome,
    title: "Cadastre seu imóvel",
    desc: "Anuncie conosco em Ilhabela",
    color: "#1E90C4",
  },
];

function ImovelCard({
  href,
  img,
  badge,
  badgePulse,
  title,
  description,
  location,
  code,
  index,
}: {
  href: string;
  img: string;
  badge: string;
  badgePulse?: boolean;
  title: string;
  description: string;
  location: string;
  code?: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative bg-primary-2 rounded-2xl overflow-hidden border border-white/8 hover:border-secondary/30 transition-colors duration-300 shadow-xl flex flex-col sm:flex-row"
    >
      <div className="relative sm:w-1/2 aspect-[4/3] sm:aspect-auto overflow-hidden shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>

      <div className="flex flex-col justify-between gap-4 p-5 flex-1">
        <div className="flex flex-col gap-3">
          <div className="flex items-center">
            <span className="inline-flex items-center gap-1.5 bg-secondary/15 border border-secondary/30 text-secondary text-xs px-2.5 py-1 rounded-full uppercase tracking-widest">
              {badgePulse && (
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-secondary" />
                </span>
              )}
              {badge}
            </span>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg leading-snug">{title}</h3>
            <p className="text-text-sec text-xs mt-0.5">
              {location}
              {code && <span className="text-white/40"> · {code}</span>}
            </p>
          </div>

          <p className="text-text-sec text-sm leading-relaxed">{description}</p>
        </div>

        <a
          href={href}
          className="self-start inline-flex items-center gap-2 bg-secondary hover:bg-secondary/80 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200 shadow-lg shadow-secondary/20 group/btn"
        >
          Conheça o imóvel
          <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </motion.div>
  );
}

function AccessCard({ item, index }: { item: (typeof acessos)[number]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLAnchorElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });

  return (
    <motion.a
      ref={ref}
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.97 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative bg-primary-2 rounded-2xl p-6 sm:p-7 border border-white/5 overflow-hidden flex items-center gap-5 shadow-xl cursor-pointer"
    >
      <div
        className="absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(ellipse at 20% 50%, ${item.color}28 0%, transparent 65%)`,
        }}
      />
      <div
        className="absolute inset-0 rounded-2xl border-2 pointer-events-none transition-opacity duration-300"
        style={{ borderColor: item.color + "55", opacity: hovered ? 1 : 0 }}
      />

      <div
        className="relative z-10 shrink-0 w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
        style={{ background: item.color + "1A" }}
      >
        <div style={{ "--dash": inView ? "0" : "200" } as React.CSSProperties}>
          <style>{`
            .icon-draw path, .icon-draw circle, .icon-draw polygon, .icon-draw polyline, .icon-draw rect {
              stroke-dasharray: 200;
              stroke-dashoffset: var(--dash, 200);
              transition: stroke-dashoffset 0.7s cubic-bezier(0.4, 0, 0.2, 1);
            }
          `}</style>
          <item.Icon color={item.color} />
        </div>
      </div>

      <div className="relative z-10 flex-1 min-w-0">
        <h3 className="text-white font-bold text-lg leading-tight mb-1">{item.title}</h3>
        <p className="text-text-sec text-sm leading-snug truncate">{item.desc}</p>
      </div>

      <div
        className="relative z-10 shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          background: item.color + "2A",
          color: item.color,
          transform: hovered ? "translateX(3px)" : "translateX(0)",
        }}
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </motion.a>
  );
}

function CursorLight() {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const springX = useSpring(x, { stiffness: 80, damping: 20 });
  const springY = useSpring(y, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background: useTransform(
          [springX, springY],
          (vals) => {
            const [lx, ly] = vals as [number, number];
            return `radial-gradient(400px circle at ${lx}px ${ly}px, #0071C614 0%, transparent 70%)`;
          }
        ),
      }}
    />
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("imoveis");

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <div className="min-h-screen bg-bg-main flex flex-col overflow-x-hidden">
      <CursorLight />

      <section ref={heroRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <motion.img
          src="/assets/images/ilhabela-foto-de-cima-drone-opa-ilhabela.jpg"
          alt="Ilhabela vista do drone"
          style={{ y: imgY }}
          className="absolute inset-0 w-full h-[120%] object-cover will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 flex flex-col items-center text-center px-6"
        >
          <motion.img
            src="/assets/logo/logo-opa-nova.svg"
            alt="Opa Ilhabela"
            className="h-20 md:h-28 mb-8 drop-shadow-lg"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative z-10 flex flex-col items-center gap-4"
        >
          <p className="text-white/90 text-lg md:text-2xl font-light tracking-widest uppercase">
            Confira todos os acessos
          </p>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
            className="flex flex-col items-center gap-0.5"
          >
            <span className="block w-0.5 h-5 rounded-full bg-white/60" />
            <svg className="w-5 h-5 text-white/90" fill="none" viewBox="0 0 20 20">
              <path d="M10 3v11M4 9l6 7 6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      <section className="pt-16 pb-20 px-6 max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-3 mb-8"
        >
          <span className="text-white/60 text-sm flex items-center gap-2">
            <span>👆</span> Selecione uma opção
          </span>
          <div className="flex bg-primary-2 border border-white/10 rounded-full p-1 gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id ? "text-bg-main" : "text-text-sec hover:text-white"
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="tab-pill"
                    className="absolute inset-0 bg-secondary rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === "imoveis" && (
            <motion.div
              key="imoveis"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col gap-4"
            >
              <ImovelCard
                href="/siriuba-2"
                img="/assets/siriuba-2/hero-desktop.avif"
                badge="Lançamento"
                badgePulse
                title="Casa Contemporânea Siriúba 2"
                location="Siriúba, Ilhabela — SP"
                code="CA007139"
                description="Residência contemporânea com arquitetura integrada à natureza, amplas áreas externas e vista privilegiada. Projeto exclusivo em lançamento."
                index={0}
              />
            </motion.div>
          )}

          {activeTab === "acessos" && (
            <motion.div
              key="acessos"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              {acessos.map((item, i) => (
                <AccessCard key={item.href} item={item} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-center py-10 text-text-sec text-sm flex flex-col items-center gap-2"
      >
        <span>&copy; {new Date().getFullYear()} Opa Ilhabela. Todos os direitos reservados.</span>
        <a href="/politica-de-privacidade" className="text-text-sec/80 hover:text-white underline transition-colors">
          Política de Privacidade
        </a>
      </motion.footer>
    </div>
  );
}
