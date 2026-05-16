import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">404</h1>
      <p className="text-text-sec mb-8 max-w-md">
        A página que você procura não existe ou foi movida.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/80 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
      >
        Voltar para o início
      </Link>
    </main>
  );
}
