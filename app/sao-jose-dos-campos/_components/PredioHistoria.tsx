import { Building2, Info } from "lucide-react";
import { t } from "../_i18n/t";

export default function PredioHistoria() {
  return (
    <section id="predio" className="py-16 md:py-24 lg:py-32 bg-bg-main relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-2/20 to-transparent" />
      <div className="hidden md:block absolute -left-20 top-1/2 -translate-y-1/2 w-64 h-64 bg-primary-1/5 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="reveal">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="h-[1px] w-12 bg-primary-2" />
            <span className="text-primary-2 uppercase tracking-[0.3em] text-[10px] font-black">
              {t.predioHistoria.eyebrow}
            </span>
          </div>

          <h2 className="section-title text-3xl sm:text-4xl md:text-5xl font-serif text-primary-1 leading-[1.1]">
            {t.predioHistoria.title}
          </h2>

          <div className="space-y-6 md:space-y-8 mb-10">
            {t.predioHistoria.paragraphs.map((p, i) => (
              <p key={i} className="text-text-sec text-lg leading-relaxed font-light max-w-3xl">
                {p}
              </p>
            ))}
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-sm flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-primary-2/10 flex items-center justify-center text-primary-2 shrink-0">
              <Info size={18} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-primary-2 mb-1">
                {t.predioHistoria.realityCheckLabel}
              </p>
              <p className="text-text-main text-base md:text-lg leading-relaxed font-light">
                {t.predioHistoria.realityCheckText}
              </p>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="hidden lg:flex absolute top-12 right-12 w-32 h-32 rounded-full bg-primary-1/5 items-center justify-center text-primary-1/40 opacity-60"
        >
          <Building2 size={56} strokeWidth={1.2} />
        </div>
      </div>
    </section>
  );
}
