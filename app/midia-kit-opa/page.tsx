"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const LOGO_OPA = "https://exclusivo.opailhabela.com.br/assets/logo/logo-opa.svg";

/* ── Helpers de animação ───────────────────────────────
   Movimento sutil: fade + leve slide-up, ease suave.
──────────────────────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

// Container que revela os filhos em cascata
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

// Wrapper padrão: revela ao entrar na viewport, uma única vez
function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

export default function MidiaKitOpaPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  // Parallax + zoom leve na foto do hero conforme o scroll
  const photoScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const heroFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main data-app="midia-kit-opa">
      {/* ──────────────────────────────
          SLIDE 1 · ABERTURA
      ────────────────────────────── */}
      <section className="hero" ref={heroRef}>
        <motion.img
          className="hero-photo"
          src="/midiakit/barcos-e-velas-ilhabela-opa.webp"
          alt=""
          aria-hidden="true"
          style={{ scale: photoScale, y: photoY }}
        />
        <div className="hero-bg" />
        <div className="hero-overlay" />

        <motion.div
          className="hero-content"
          style={{ opacity: heroFade }}
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.span className="hero-eyebrow" variants={fadeUp}>
            OPA · Ilhabela · 2026
          </motion.span>
          <motion.h1 variants={fadeUp}>
            A porta de entrada<br />para Ilhabela.
          </motion.h1>
          <motion.p className="hero-sub" variants={fadeUp}>
            Para quem vai viver a ilha.
          </motion.p>
          <motion.p className="hero-lead" variants={fadeUp}>
            Na OPA, a compra começa por uma conversa sobre vida. O imóvel vem depois, como
            consequência.
          </motion.p>
          <motion.p className="hero-lead hero-lead--soft" variants={fadeUp}>
            Ilhabela é vivida de muitas formas. Há quem chegue todo verão. Há quem queira escapar
            das sextas para as segundas. Há quem decida que essa será a casa do resto da vida. Cada
            uma dessas formas pede um imóvel diferente. Nenhuma começa pelo imóvel.
          </motion.p>
        </motion.div>

        <motion.div
          className="hero-scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          style={{ opacity: heroFade }}
        >
          <span className="hero-scroll-line" />
        </motion.div>
      </section>

      {/* ──────────────────────────────
          SLIDE 2 · O PROCESSO
      ────────────────────────────── */}
      <section className="secao-processo">
        <div className="processo-inner">
          <Reveal>
            <span className="s-label">O Processo</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="s-h2">
              Quatro decisões editoriais<br />que dão forma à compra.
            </h2>
          </Reveal>

          <motion.div
            className="processo-grid"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.div className="processo-card" variants={fadeUp}>
              <h3 className="processo-titulo">
                <span className="t-azul">A Conversa</span>, não o atendimento.
              </h3>
              <p className="processo-texto">
                Cada família é acompanhada de perto. O momento de vida, a forma de viver a ilha e o
                que faz sentido para os próximos anos ficam claros antes de qualquer imóvel entrar na
                pauta.
              </p>
            </motion.div>
            <motion.div className="processo-card" variants={fadeUp}>
              <h3 className="processo-titulo">
                <span className="t-azul">A Curadoria</span>, não a vitrine.
              </h3>
              <p className="processo-texto">
                Não são quinze imóveis para visitar. São os certos. O filtro acontece antes da
                agenda, porque tempo é parte do respeito por uma decisão dessa dimensão.
              </p>
            </motion.div>
            <motion.div className="processo-card" variants={fadeUp}>
              <h3 className="processo-titulo">
                <span className="t-azul">A Leitura</span>, não o passeio.
              </h3>
              <p className="processo-texto">
                Orientação solar, ventilação, conservação, documentação, riscos ambientais,
                potencial de valorização. O que não aparece na foto aparece na visita.
              </p>
            </motion.div>
            <motion.div className="processo-card" variants={fadeUp}>
              <h3 className="processo-titulo">
                <span className="t-azul">A Estrutura</span>, não a suposição.
              </h3>
              <p className="processo-texto">
                Cada negociação é construída juridicamente para proteger o patrimônio. Documentação,
                regularização, as particularidades de Ilhabela. A assinatura acontece sobre terreno
                firme.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ──────────────────────────────
          SLIDE 3 · O TEMPO
      ────────────────────────────── */}
      <section className="secao-tempo">
        <video
          className="tempo-video"
          src="/midiakit/fundo-video-opa.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className="tempo-overlay" />

        <div className="tempo-inner">
          <Reveal>
            <span className="s-label">O Tempo</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="tempo-manifesto">
              Sem pressa,<br />sem pressão.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="tempo-frase">Uma decisão que vai marcar a vida merece tempo.</p>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="s-p">
              Comprar em Ilhabela é decisão que se carrega por anos. Verões em família. Finais de
              semana de descompressão. Uma nova rotina por inteiro. Todas essas formas pedem tempo.
              Não o tempo de uma visita no sábado. O tempo de entender, visitar, sentir, decidir.
            </p>
          </Reveal>
          <Reveal delay={0.26}>
            <p className="s-p">
              O resultado é a escolha que se sustenta no longo prazo. Casa que continua fazendo
              sentido cinco, dez, vinte anos depois. Quando os filhos crescem. Quando a vida muda.
              Quando Ilhabela ainda é o lugar para onde se volta.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ──────────────────────────────
          SLIDE 4 · O TERRITÓRIO
      ────────────────────────────── */}
      <section className="secao-territorio">
        <div className="territorio-inner">
          <Reveal>
            <span className="s-label">O Território</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="s-h2">
              O que muda<br />o resultado da compra.
            </h2>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="territorio-intro">
              Ilhabela tem particularidades que só quem vive a ilha conhece.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="territorio-bloco">
              <p className="s-p">
                Área de Preservação Permanente. Restrições do Parque Estadual de Ilhabela, que ocupa
                a maior parte do território. Cessão possessória. Regularização de imóveis antigos.
                Salinidade e umidade da costa.
              </p>
            </div>
          </Reveal>

          <motion.div
            className="territorio-linha"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: EASE }}
          />

          <Reveal delay={0.05}>
            <div className="territorio-bloco">
              <p className="s-p">
                O comportamento de cada região em alta e baixa temporada. O bairro que enche em
                janeiro e esvazia em junho. A rua que vira ponto de passagem na Sailing Week. A cota
                acima da qual o sol da tarde se torna problema para quem vai morar.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="s-p" style={{ marginTop: 8 }}>
              Conhecer o terreno, a documentação, o mercado e a vida na ilha por dentro não é
              diferencial. É pré-requisito.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="territorio-assinatura">E é esse o nosso lado da mesa.</p>
          </Reveal>
        </div>
      </section>

      {/* ──────────────────────────────
          SLIDE 5 · O PRÓXIMO PASSO
      ────────────────────────────── */}
      <section className="secao-conversa">
        <motion.div
          className="conversa-azul"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.span className="conversa-label" variants={fadeUp}>
            O Próximo Passo
          </motion.span>
          <motion.h2 className="conversa-titulo" variants={fadeUp}>
            A Conversa.
          </motion.h2>
          <motion.p className="conversa-lead" variants={fadeUp}>
            O próximo passo é uma conversa.
          </motion.p>
          <motion.p className="conversa-texto" variants={fadeUp}>
            Três perguntas dão direção ao processo. Como você imagina viver Ilhabela. Em que momento
            de vida essa compra acontece. O que é inegociável e o que tem espaço para ajuste.
          </motion.p>
          <motion.p className="conversa-texto" variants={fadeUp}>
            A partir daí, o resto é conduzido com critério.
          </motion.p>
        </motion.div>

        <Reveal className="conversa-contato">
          <div className="conversa-contato-main">
            <div className="rodape-logo">
              <img src={LOGO_OPA} alt="OPA Imóveis Ilhabela" />
            </div>
            <div className="conversa-contato-info">
              <div className="cc-line cc-nome">OPA · Curadoria Imobiliária · Ilhabela</div>
              <div className="cc-line">Av. São João, 243, loja 13, Perequê</div>
              <div className="cc-line">+55 (12) 97406-8058</div>
            </div>
          </div>

          <div className="conversa-qr">
            <div className="qr-box">
              <img
                src="/midiakit/qr-code-marco-midiakit-ong.png"
                alt="QR Code para agendamento com a OPA Imóveis"
              />
            </div>
            <span className="qr-label">Agendamento</span>
          </div>

          <span className="conversa-creci">CRECI 79555</span>
        </Reveal>
      </section>
    </main>
  );
}
