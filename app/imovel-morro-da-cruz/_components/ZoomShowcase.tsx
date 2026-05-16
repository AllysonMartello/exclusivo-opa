"use client";

import { ZoomParallax } from "./ui/zoom-parallax";

const parallaxImages = [
  {
    src: "https://smabio.com.br/wp-content/uploads/2026/04/sala-integrada-casa-alto-padrao-morro-da-cruz-ilhabela-area-externa-opa-imoveis.jpg-1.jpg",
    alt: "Sala Integrada",
  },
  {
    src: "https://smabio.com.br/wp-content/uploads/2026/04/area-externa-piscina-casa-alto-padrao-morro-da-cruz-ilhabela-opa-imoveis.jpg",
    alt: "Área Externa Piscina",
  },
  {
    src: "https://smabio.com.br/wp-content/uploads/2026/04/suite-master-casa-alto-padrao-ilhabela-acesso-area-externa-opa-imoveis.jpg",
    alt: "Suíte Master",
  },
  {
    src: "https://smabio.com.br/wp-content/uploads/2026/04/quarto-escritorio-casa-alto-padrao-ilhabela-iluminacao-natural-opa-imoveis.jpg",
    alt: "Quarto Escritório",
  },
  {
    src: "https://smabio.com.br/wp-content/uploads/2026/04/cozinha-area-gourmet-casa-luxo-ilhabela-morro-da-cruz-integrada-opa-imoveis.jpg",
    alt: "Cozinha Gourmet",
  },
  {
    src: "https://smabio.com.br/wp-content/uploads/2026/04/banheiro-duplo-closet-casa-luxo-ilhabela-morro-da-cruz-opa-imoveis.jpg",
    alt: "Banheiro Duplo",
  },
  {
    src: "https://smabio.com.br/wp-content/uploads/2026/04/quarto-vista-area-externa-casa-luxo-ilhabela-piscina-opa-imoveis.jpg",
    alt: "Quarto Vista Externa",
  },
];

export default function ZoomShowcase() {
  return (
    <section id="visao-geral" className="relative z-10">
      <ZoomParallax images={parallaxImages} />
    </section>
  );
}
