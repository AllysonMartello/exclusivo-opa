"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import CadastroImovelForm from "./_components/CadastroImovelForm";

function CadastroImovelInner() {
  const searchParams = useSearchParams();
  const initialAnunciante = {
    nome: searchParams.get("nome") ?? undefined,
    telefone: searchParams.get("telefone") ?? undefined,
    email: searchParams.get("email") ?? undefined,
  };
  return <CadastroImovelForm initialAnunciante={initialAnunciante} />;
}

export default function CadastroImovelPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F4F7F7]" />}>
      <CadastroImovelInner />
    </Suspense>
  );
}
