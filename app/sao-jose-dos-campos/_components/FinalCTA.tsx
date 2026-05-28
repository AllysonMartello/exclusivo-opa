"use client";

import { MessageCircle, CalendarCheck } from "lucide-react";
import { t } from "../_i18n/t";

const WHATSAPP_NUMBER = "5512974068058";

export default function FinalCTA() {
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t.leadForm.whatsappMessage)}`;

  return (
    <section id="contato" className="py-20 md:py-32 bg-bg-main relative overflow-hidden">
      <div className="hidden md:block absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-30 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-2/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2 className="reveal section-title text-3xl sm:text-4xl md:text-6xl font-serif text-primary-1">
          {t.finalCTA.title}
        </h2>

        <p
          className="reveal text-text-sec text-base md:text-xl mb-8 md:mb-12 max-w-2xl mx-auto"
          style={{ animationDelay: "0.15s" }}
        >
          {t.finalCTA.subtitle}
        </p>

        <div
          className="reveal flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4"
          style={{ animationDelay: "0.3s" }}
        >
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-lead-form"))}
            className="inline-flex items-center justify-center gap-3 bg-secondary hover:bg-secondary/90 text-white px-8 md:px-10 py-4 md:py-5 rounded-full text-base md:text-lg font-medium transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 w-full sm:w-auto"
          >
            <CalendarCheck size={22} />
            {t.finalCTA.button}
          </button>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-primary-1/5 hover:bg-primary-1/10 text-primary-1 px-8 md:px-10 py-4 md:py-5 rounded-full text-base md:text-lg font-medium transition-all duration-300 w-full sm:w-auto"
          >
            <MessageCircle size={22} />
            {t.finalCTA.secondaryButton}
          </a>
        </div>

        <p className="mt-6 text-sm text-text-sec">{t.finalCTA.footer}</p>
      </div>
    </section>
  );
}
