"use client";

import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-primary-1 text-white/80 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr] gap-12">
          <div>
            <div className="font-serif text-2xl tracking-[0.28em] text-white">OPA</div>
            <p className="mt-6 text-white/55 text-sm leading-[1.8] max-w-sm">
              Captação e lançamento de imóveis de alto padrão em Ilhabela.
              Nascidos na ilha. Lendo o mercado há vinte anos.
            </p>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[0.32em] text-primary-2 font-semibold mb-5">
              Contato
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://wa.me/5512997654321"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp · +55 12 99765-4321
                </a>
              </li>
              <li>
                <a
                  href="mailto:contato@opailhabela.com.br"
                  className="hover:text-white transition-colors"
                >
                  contato@opailhabela.com.br
                </a>
              </li>
              <li className="text-white/45">Ilhabela · SP</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[0.32em] text-primary-2 font-semibold mb-5">
              Institucional
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/politica-de-privacidade"
                  className="hover:text-white transition-colors"
                >
                  Política de privacidade
                </Link>
              </li>
              <li>
                <a
                  href="#convite"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("convite")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Apresentar imóvel
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-[11px] uppercase tracking-[0.28em] text-white/35">
          <span>© {year} OPA Ilhabela</span>
          <span>Captação Exclusiva</span>
        </div>
      </div>
    </footer>
  );
}
