"use client";

import { Instagram, Youtube, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary-1 text-white/80 py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="text-3xl font-serif font-bold tracking-widest text-white mb-6">OPA</div>
            <p className="text-white/60 max-w-sm mb-8 leading-relaxed">
              Curadoria de imóveis com alma, design e propósito. Transformando a maneira como você encontra o seu próximo refúgio.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/opaimoveisilhabela/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-white transition-colors duration-300">
                <Instagram size={18} />
              </a>
              <a href="https://www.youtube.com/@marcohenriqueilhabela" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-white transition-colors duration-300">
                <Youtube size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-serif text-lg mb-6">Contato</h4>
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
            <h4 className="text-white font-serif text-lg mb-6">Links Rápidos</h4>
            <ul className="space-y-3">
              <li><a href="#a-casa" className="text-white/60 hover:text-white transition-colors">A Casa</a></li>
              <li><a href="#experiencia" className="text-white/60 hover:text-white transition-colors">Experiência</a></li>
              <li><a href="#tour" className="text-white/60 hover:text-white transition-colors">Tour Virtual</a></li>
              <li><a href="#contato" className="text-white/60 hover:text-white transition-colors">Agendar Visita</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
          <p>© {new Date().getFullYear()} OPA Imóveis. Todos os direitos reservados.</p>
          <p>CRECI 79555</p>
        </div>
      </div>
    </footer>
  );
}
