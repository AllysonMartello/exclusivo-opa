"use client";

import Header from "./_components/Header";
import Hero from "./_components/Hero";
import Tensao from "./_components/Tensao";
import Olhar from "./_components/Olhar";
import Metodo from "./_components/Metodo";
import Incluso from "./_components/Incluso";
import QuemSomos from "./_components/QuemSomos";
import Convite from "./_components/Convite";
import Footer from "./_components/Footer";
import CustomCursor from "./_components/CustomCursor";

export default function TesteLancamentoPage() {
  return (
    <main data-app="teste" className="w-full min-h-screen bg-bg-main relative">
      <Header />
      <Hero />
      <Tensao />
      <Olhar />
      <Metodo />
      <Incluso />
      <QuemSomos />
      <Convite />
      <Footer />
      <CustomCursor />
    </main>
  );
}
