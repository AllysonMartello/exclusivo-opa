"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import FichaResumida from "./_components/FichaResumida";
import TheHouse from "./_components/TheHouse";
import ALeitura from "./_components/ALeitura";
import ImageAccordion from "./_components/ImageAccordion";
import Galeria from "./_components/Galeria";
import VirtualTour from "./_components/VirtualTour";
import Location from "./_components/Location";
import AEstrutura from "./_components/AEstrutura";
import AConversa from "./_components/AConversa";
import LeadFormModal from "./_components/LeadFormModal";
import CustomCursor from "./_components/CustomCursor";

function EngenhoInner() {
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
    <main data-app="engenho" className="w-full min-h-screen bg-bg-main relative">
      <Header />
      <Hero />
      <VirtualTour />
      <FichaResumida />
      <TheHouse />
      <ALeitura />
      <Galeria />
      <Location />
      <AEstrutura />
      <AConversa />
      <CustomCursor />
      <LeadFormModal isOpen={isLeadFormOpen} onClose={() => setIsLeadFormOpen(false)} />
    </main>
  );
}

export default function EngenhoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <EngenhoInner />
    </Suspense>
  );
}
