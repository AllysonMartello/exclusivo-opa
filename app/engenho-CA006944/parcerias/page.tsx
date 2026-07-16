import type { Metadata } from "next";
import { ArrowRight, FileText, Globe, Play, Image as ImageIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Parcerias | Engenho D'Água",
  description: "Portal do Parceiro - Materiais exclusivos do Engenho D'Água, Ilhabela.",
};

const BASE = "/assets/engenho-CA006944";

type LinkItem = {
  title: string;
  desc: string;
  href: string;
  icon: any;
  disabled?: boolean;
};

const LINKS: LinkItem[] = [
  {
    title: "Informações do Imóvel",
    desc: "Ficha técnica completa e detalhes",
    href: "/engenho-CA006944/informacoes/index.html",
    icon: FileText,
  },
  {
    title: "Site Exclusivo",
    desc: "Página de apresentação premium",
    href: "https://exclusivo.opailhabela.com.br/engenho-CA006944",
    icon: Globe,
  },
  {
    title: "Tour Virtual",
    desc: "Visita imersiva em 3D",
    href: "https://discover.matterport.com/space/tL9pSrTiUNR",
    icon: Play,
  },
  {
    title: "Mensagens de Apoio",
    desc: "Copys e sugestões prontas",
    href: "/engenho-CA006944/mensagens-de-apoio/index.html",
    icon: FileText,
  },
  {
    title: "Materiais para Postagens",
    desc: "Em breve...",
    href: "#",
    icon: ImageIcon,
    disabled: true,
  },
];

export default function ParceriasPage() {
  return (
    <main data-app="engenho" className="w-full min-h-screen bg-bg-main relative flex flex-col items-center pb-16">
      {/* Head */}
      <section className="relative w-full h-[45vh] min-h-[350px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <picture className="block absolute inset-0 w-full h-full">
            <img
              src={`${BASE}/engenho-CA006944-varanda-piscina-vista-panoramica-mar.webp`}
              alt="Engenho D'Água"
              className="w-full h-full object-cover"
            />
          </picture>
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 px-6 w-full max-w-2xl mx-auto flex flex-col items-center text-center mt-4">
          <span className="text-white/80 uppercase tracking-[0.2em] text-[10px] sm:text-xs font-medium mb-3 block">
            Engenho D'Água · Ilhabela
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white leading-[1.1] mb-4">
            Portal do Parceiro
          </h1>
          <p className="text-sm md:text-base text-white/90 font-light max-w-lg leading-relaxed">
            Compartilhe um dos endereços mais exclusivos de Ilhabela. Acesse todos os materiais para oferecer esta joia aos seus clientes.
          </p>
        </div>
      </section>

      {/* Links Container */}
      <section className="relative z-20 w-full max-w-md mx-auto px-6 -mt-12 sm:-mt-16 flex flex-col gap-4">
        {LINKS.map((link, idx) => {
          const Icon = link.icon;
          const isDisabled = link.disabled;
          return (
            <a
              key={idx}
              href={isDisabled ? undefined : link.href}
              target={!isDisabled && link.href.startsWith("http") ? "_blank" : undefined}
              rel={!isDisabled && link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className={`group relative overflow-hidden bg-white rounded-[22px] shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-1.5 transition-all duration-300 ${
                isDisabled
                  ? "opacity-50 cursor-default grayscale-[0.3]"
                  : "hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:-translate-y-0.5"
              }`}
              style={isDisabled ? { pointerEvents: "none" } : undefined}
            >
              <div className="flex items-center gap-4 p-4">
                <div className={`w-12 h-12 shrink-0 rounded-xl bg-bg-main flex items-center justify-center text-primary-1 transition-colors duration-300 ${isDisabled ? "" : "group-hover:bg-primary-1 group-hover:text-white"}`}>
                  <Icon size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-serif font-semibold text-primary-1 leading-tight mb-1 truncate">
                    {link.title}
                  </h2>
                  <p className="text-xs text-text-sec truncate">
                    {link.desc}
                  </p>
                </div>
                {!isDisabled && (
                  <div className="w-8 h-8 shrink-0 rounded-full bg-bg-main flex items-center justify-center text-primary-2 group-hover:bg-primary-2 group-hover:text-white transition-colors duration-300">
                    <ArrowRight size={16} />
                  </div>
                )}
              </div>
            </a>
          );
        })}
      </section>
      
      {/* Footer */}
      <div className="mt-16 text-center">
        <p className="text-[10px] sm:text-xs text-text-sec uppercase tracking-[0.2em] font-medium">
          OPA Imóveis · Exclusividade
        </p>
      </div>
    </main>
  );
}
