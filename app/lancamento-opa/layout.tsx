import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import Header from "./_components/Header";
import { LanguageProvider } from "./_i18n/LanguageContext";
import "./lancamento.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Lançamento OPA — Imóveis de Alto Padrão em Ilhabela",
  description:
    "Seu imóvel ou empreendimento precisa mais do que aparecer. Precisa ser lançado da forma certa.",
  alternates: { canonical: "/lancamento-opa" },
};

export default function LancamentoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${playfair.variable} ${poppins.variable} font-sans bg-[#F7F6F3] text-[#2B2B2B] antialiased`}>
      <LanguageProvider>
        <Header />
        {children}
      </LanguageProvider>
    </div>
  );
}
