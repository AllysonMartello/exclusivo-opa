"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }} // wait for preloader
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled ? "bg-bg-main/95 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <a href="#" className="flex items-center z-50 relative">
            <img 
              src="/assets/logo/logo-opa-nova.svg" 
              alt="OPA Logo" 
              className={`h-8 transition-all duration-300 ${scrolled || mobileMenuOpen ? 'brightness-0' : 'brightness-100'}`}
            />
          </a>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#a-casa" className={`text-sm font-medium hover:text-secondary transition-colors ${scrolled ? 'text-text-main' : 'text-white'}`}>A Casa</a>
            <a href="#experiencia" className={`text-sm font-medium hover:text-secondary transition-colors ${scrolled ? 'text-text-main' : 'text-white'}`}>Experiência</a>
            <a href="#tour" className={`text-sm font-medium hover:text-secondary transition-colors ${scrolled ? 'text-text-main' : 'text-white'}`}>Tour Virtual</a>
          </nav>

          <div className="hidden md:block">
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent("open-lead-form"))}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                scrolled 
                  ? "bg-secondary text-white hover:bg-blue-700" 
                  : "bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 border border-white/30"
              }`}
            >
              Agendar Visita
            </button>
          </div>

          <button 
            className={`md:hidden z-50 relative p-2 rounded-full transition-colors ${scrolled || mobileMenuOpen ? 'text-text-main hover:bg-black/5' : 'text-white hover:bg-white/10'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-bg-main pt-24 px-6 pb-8 flex flex-col md:hidden"
          >
            <nav className="flex flex-col gap-6 mt-8">
              <a href="#a-casa" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-serif text-primary-1 border-b border-border-main pb-4">A Casa</a>
              <a href="#experiencia" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-serif text-primary-1 border-b border-border-main pb-4">Experiência</a>
              <a href="#tour" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-serif text-primary-1 border-b border-border-main pb-4">Tour Virtual</a>
            </nav>
            <div className="mt-auto pb-8">
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.dispatchEvent(new CustomEvent("open-lead-form"));
                }}
                className="w-full block text-center bg-secondary text-white px-6 py-4 rounded-full text-lg font-medium"
              >
                Agendar Visita
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
