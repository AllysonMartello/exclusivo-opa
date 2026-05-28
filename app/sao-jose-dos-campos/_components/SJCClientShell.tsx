"use client";

import { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";

const LeadFormModal = dynamic(() => import("./LeadFormModal"), { ssr: false });
const CustomCursor = dynamic(() => import("./CustomCursor"), { ssr: false });

function ShellInner() {
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
    <>
      <CustomCursor />
      <LeadFormModal isOpen={isLeadFormOpen} onClose={() => setIsLeadFormOpen(false)} />
    </>
  );
}

export default function SJCClientShell() {
  return (
    <Suspense fallback={null}>
      <ShellInner />
    </Suspense>
  );
}
