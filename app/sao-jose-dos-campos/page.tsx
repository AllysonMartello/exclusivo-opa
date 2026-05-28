"use client";

import { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import Tensao from "./_components/Tensao";
import TheHouse from "./_components/TheHouse";
import Gallery from "./_components/Gallery";
import Location from "./_components/Location";

const PredioHistoria = dynamic(() => import("./_components/PredioHistoria"));
const ForWho = dynamic(() => import("./_components/ForWho"));
const TechnicalSpecs = dynamic(() => import("./_components/TechnicalSpecs"));
const FinalCTA = dynamic(() => import("./_components/FinalCTA"));
const Footer = dynamic(() => import("./_components/Footer"));
const LeadFormModal = dynamic(() => import("./_components/LeadFormModal"), { ssr: false });
const CustomCursor = dynamic(() => import("./_components/CustomCursor"), { ssr: false });

function SJCInner() {
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleOpenForm = () => setIsLeadFormOpen(true);
    window.addEventListener("open-lead-form", handleOpenForm);
    return () => window.removeEventListener("open-lead-form", handleOpenForm);
  }, []);

  useEffect(() => {
    if (searchParams.get("openLeadForm") === "1") {
      setIsLeadFormOpen(true);
    }
  }, [searchParams]);

  return (
    <main data-app="sjc" className="w-full min-h-screen bg-bg-main relative">
      <Header />
      <Hero />
      <Tensao />
      <TheHouse />
      <Gallery />
      <Location />
      <PredioHistoria />
      <ForWho />
      <TechnicalSpecs />
      <FinalCTA />
      <Footer />
      <CustomCursor />
      <LeadFormModal isOpen={isLeadFormOpen} onClose={() => setIsLeadFormOpen(false)} />
    </main>
  );
}

export default function SJCPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <SJCInner />
    </Suspense>
  );
}
