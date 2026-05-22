"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleCta = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("convite");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-[background,padding,box-shadow] duration-500 ${
        scrolled
          ? "bg-bg-main/90 backdrop-blur-md py-3 shadow-[0_1px_0_rgba(0,0,0,0.04)]"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between">
        <Link href="/captacao-exclusiva" aria-label="OPA Ilhabela" className="flex items-center">
          <img
            src="/assets/logo/logo-opa.svg"
            alt="OPA Ilhabela"
            width={88}
            height={28}
            loading="eager"
            decoding="async"
            style={{ height: "28px", width: "auto" }}
            className={`transition-[filter] duration-500 ${scrolled ? "invert" : ""}`}
          />
        </Link>

        <a
          href="#convite"
          onClick={handleCta}
          className={`hidden sm:inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.28em] px-5 py-2.5 rounded-full transition-all duration-500 ${
            scrolled
              ? "bg-primary-1 text-white hover:bg-secondary"
              : "border border-white/40 text-white hover:bg-white hover:text-primary-1"
          }`}
        >
          Conversar sobre meu imóvel
        </a>
      </div>
    </header>
  );
}
