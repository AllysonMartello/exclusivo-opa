"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import VirtualTour from "./_components/VirtualTour";
import ZoomShowcase from "./_components/ZoomShowcase";
import Location from "./_components/Location";
import TheHouse from "./_components/TheHouse";
import Experience from "./_components/Experience";
import ForWho from "./_components/ForWho";
import TechnicalSpecs from "./_components/TechnicalSpecs";
import TheOPA from "./_components/TheOPA";
import MarcosView from "./_components/MarcosView";
import FinalCTA from "./_components/FinalCTA";
import Footer from "./_components/Footer";
import LeadFormModal from "./_components/LeadFormModal";
import CustomCursor from "./_components/CustomCursor";

function Siriuba2Inner() {
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
    <main data-app="siriuba" className="w-full min-h-screen bg-bg-main relative">
      <Header />
      <Hero />
      <VirtualTour />
      <ZoomShowcase />
      <Location />
      <TheHouse />
      <Experience />
      <ForWho />
      <TechnicalSpecs />
      <TheOPA />
      <MarcosView />
      <FinalCTA />
      <Footer />
      <CustomCursor />
      <LeadFormModal isOpen={isLeadFormOpen} onClose={() => setIsLeadFormOpen(false)} />
    </main>
  );
}

export default function Siriuba2Page() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <Siriuba2Inner />
    </Suspense>
  );
}
