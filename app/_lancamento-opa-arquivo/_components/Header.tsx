"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useT } from '../_i18n/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const t = useT();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-[100] transition-all duration-500">
      <div className={cn(
        "mx-auto transition-all duration-500 flex items-center justify-between",
        isScrolled
          ? "max-w-[1200px] mt-4 px-6 md:px-8 py-3 bg-white/80 backdrop-blur-md rounded-full border border-[#D9D9D9]/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mx-4 md:mx-auto"
          : "max-w-full px-6 md:px-12 py-8 bg-transparent"
      )}>
        {/* LOGO */}
        <a href="/" className="flex items-center group">
          <img
            src="/assets/logo/logo-opa-nova.svg"
            alt={t.footer.logoAlt}
            className={cn(
              "transition-all duration-500",
              isScrolled ? "h-8 brightness-0" : "h-12 brightness-100"
            )}
          />
        </a>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-6">
          {t.header.nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "text-[11px] uppercase tracking-[0.2em] font-bold transition-colors duration-300 hover:text-[#2F5D82]",
                isScrolled ? "text-[#0F2A44]/70" : "text-white/80"
              )}
            >
              {link.name}
            </a>
          ))}
          <LanguageSwitcher variant={isScrolled ? "header-dark" : "header-light"} />
          <a
            href="#apply"
            className={cn(
              "px-6 py-2.5 rounded-full text-[11px] uppercase tracking-[0.2em] font-bold transition-all duration-500",
              isScrolled
                ? "bg-[#0F2A44] text-white hover:bg-[#2F5D82]"
                : "bg-white text-[#0F2A44] hover:bg-[#F2F2F2]"
            )}
          >
            {t.header.cta}
          </a>
        </nav>

        {/* MOBILE TOGGLE */}
        <button
          className={cn(
            "md:hidden p-2 transition-colors",
            isScrolled ? "text-[#0F2A44]" : "text-white"
          )}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white border-t border-[#F2F2F2] shadow-xl p-8 flex flex-col gap-6 md:hidden"
          >
            {t.header.nav.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm uppercase tracking-widest font-bold text-[#0F2A44]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="self-start">
              <LanguageSwitcher variant="mobile" />
            </div>
            <a
              href="#apply"
              className="bg-[#0F2A44] text-white text-center py-4 rounded-xl text-[12px] uppercase tracking-[0.2em] font-bold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.header.cta}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
