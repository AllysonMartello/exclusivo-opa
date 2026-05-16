"use client";

import { useState, useEffect } from "react";
import Preloader from "./_components/Preloader";
import CustomCursor from "./_components/CustomCursor";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import ZoomShowcase from "./_components/ZoomShowcase";
import Location from "./_components/Location";
import Investment from "./_components/Investment";
import TheHouse from "./_components/TheHouse";
import Experience from "./_components/Experience";
import VirtualTour from "./_components/VirtualTour";
import ForWho from "./_components/ForWho";
import TechnicalSpecs from "./_components/TechnicalSpecs";
import TheOPA from "./_components/TheOPA";
import MarcosView from "./_components/MarcosView";
import FinalCTA from "./_components/FinalCTA";
import Footer from "./_components/Footer";
import LeadFormModal from "./_components/LeadFormModal";

export default function MorroDaCruzPage() {
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);

  useEffect(() => {
    const handleOpenForm = () => setIsLeadFormOpen(true);
    window.addEventListener("open-lead-form", handleOpenForm);
    return () => window.removeEventListener("open-lead-form", handleOpenForm);
  }, []);

  return (
    <main data-app="morro" className="w-full min-h-screen bg-bg-main relative">
      <Preloader />
      <CustomCursor />
      <Header />
      <Hero />
      <VirtualTour />
      <ZoomShowcase />
      <Location />
      <TheHouse />
      <Investment />
      <Experience />
      <ForWho />
      <TechnicalSpecs />
      <TheOPA />
      <MarcosView />
      <FinalCTA />
      <Footer />

      <LeadFormModal isOpen={isLeadFormOpen} onClose={() => setIsLeadFormOpen(false)} />
    </main>
  );
}
