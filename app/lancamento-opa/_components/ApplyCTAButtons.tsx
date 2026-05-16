"use client";

import { useState } from "react";
import LeadFormModal, { LeadFormVariant } from "./LeadFormModal";

interface ApplyCTAButtonsProps {
  propertyLabel?: string;
  developmentLabel?: string;
}

export default function ApplyCTAButtons({
  propertyLabel = "Quero aplicar meu imóvel",
  developmentLabel = "Quero aplicar meu empreendimento",
}: ApplyCTAButtonsProps = {}) {
  const [open, setOpen] = useState<LeadFormVariant | null>(null);

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto">
        <button
          type="button"
          onClick={() => setOpen("imovel")}
          className="group relative w-full sm:w-[320px] bg-white text-[#0F2A44] px-10 py-5 text-[12px] uppercase tracking-[0.2em] font-extrabold transition-all hover:bg-transparent hover:text-white border border-white rounded-full overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        >
          <span className="relative z-10 group-hover:text-white transition-colors duration-500">
            {propertyLabel}
          </span>
          <div className="absolute inset-0 h-full w-full bg-[#2F5D82] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
        </button>

        <button
          type="button"
          onClick={() => setOpen("empreendimento")}
          className="group relative w-full sm:w-[360px] bg-transparent text-white px-8 py-[19px] text-[12px] uppercase tracking-[0.15em] font-extrabold transition-all border border-[#2F5D82] rounded-full overflow-hidden shadow-[0_0_0_rgba(47,93,130,0)] hover:shadow-[0_0_30px_rgba(47,93,130,0.4)]"
        >
          <span className="relative z-10 transition-colors duration-500">
            {developmentLabel}
          </span>
          <div className="absolute inset-0 h-full w-full bg-[#2F5D82]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </button>
      </div>

      <LeadFormModal
        isOpen={open !== null}
        onClose={() => setOpen(null)}
        variant={open ?? "imovel"}
      />
    </>
  );
}
