"use client";

import { Instagram, Youtube, MapPin, Phone } from "lucide-react";
import { useT } from "../_i18n/LanguageContext";

const quickLinkHrefs = ["#a-casa", "#experiencia", "#tour", "#contato"];

export default function Footer() {
  const t = useT();
  return (
    <footer className="bg-primary-1 text-white/80 py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="mb-6">
              <img
                src="/assets/logo/logo-opa.svg"
                alt="OPA Imóveis"
                width={96}
                height={32}
                loading="lazy"
                decoding="async"
                style={{ height: "32px", width: "auto" }}
              />
            </div>
            <p className="text-white/60 max-w-sm mb-8 leading-relaxed">
              {t.footer.description}
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/opaimoveisilhabela/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da OPA Imóveis"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-white transition-colors duration-300"
              >
                <Instagram size={18} aria-hidden="true" />
              </a>
              <a
                href="https://www.youtube.com/@marcohenriqueilhabela"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube de Marco Henrique"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-white transition-colors duration-300"
              >
                <Youtube size={18} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-serif text-lg mb-6">{t.footer.contactTitle}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/60">
                <Phone size={18} className="mt-1 shrink-0" />
                <span>+55 (12) 97406-8058</span>
              </li>
              <li className="flex items-start gap-3 text-white/60">
                <MapPin size={18} className="mt-1 shrink-0" />
                <span>Av. São João, 243 - loja 13<br/>Perequê, Ilhabela - SP<br/>11623-036</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif text-lg mb-6">{t.footer.quickLinksTitle}</h4>
            <ul className="space-y-3">
              {t.footer.quickLinks.map((label, i) => (
                <li key={i}>
                  <a href={quickLinkHrefs[i]} className="text-white/60 hover:text-white transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
          <p>© {new Date().getFullYear()} OPA Imóveis. {t.footer.rights}</p>
          <p>CRECI 79555</p>
        </div>
      </div>
    </footer>
  );
}
