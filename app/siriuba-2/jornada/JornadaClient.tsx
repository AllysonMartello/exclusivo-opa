"use client";

import { useEffect, useRef, useState } from "react";

/* Fases da jornada: dia inicial, dia final, classe da celula e nome exibido no HUD. */
const FASES = [
  { ini: 1, fim: 5, c: "f1", nome: "Início" },
  { ini: 6, fim: 12, c: "f2", nome: "Captação" },
  { ini: 13, fim: 16, c: "f3", nome: "Pré-lançamento" },
  { ini: 17, fim: 20, c: "f4", nome: "Lançamento" },
  { ini: 21, fim: 50, c: "f5", nome: "Manutenção" },
] as const;

function faseDoDia(d: number) {
  return FASES.find((f) => d >= f.ini && d <= f.fim) ?? FASES[0];
}

export default function JornadaClient() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowWelcome(false), 1800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduz = matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Limpeza centralizada: cada efeito registra aqui como se desfazer.
    const limpar: Array<() => void> = [];

    /* ---------- Grade de 50 dias ---------- */
    const grid = root.querySelector<HTMLElement>("#grid58");
    if (grid) {
      grid.innerHTML = "";
      const celulas: HTMLElement[] = [];
      for (let d = 1; d <= 50; d++) {
        const f = faseDoDia(d);
        const c = document.createElement("div");
        c.className = "cell " + f.c + (d === 50 ? " venda" : "");
        c.title = d === 50 ? "Dia 50: Vendido" : "Dia " + d + ": " + f.nome;
        grid.appendChild(c);
        celulas.push(c);
      }
      if (reduz) {
        celulas.forEach((c) => c.classList.add("on"));
      } else {
        const timers = celulas.map((c, i) =>
          window.setTimeout(() => c.classList.add("on"), 620 + i * 26),
        );
        limpar.push(() => timers.forEach(clearTimeout));
      }
    }

    /* ---------- Numero gigante ---------- */
    const big = root.querySelector<HTMLElement>("#bigNum");
    if (big) {
      if (reduz) {
        big.textContent = "50";
      } else {
        let t0: number | null = null;
        let raf = 0;
        const dur = 2100;
        const passo = (t: number) => {
          if (!t0) t0 = t;
          const p = Math.min((t - t0) / dur, 1);
          big.textContent = String(Math.round((1 - Math.pow(1 - p, 4)) * 50));
          if (p < 1) raf = requestAnimationFrame(passo);
        };
        raf = requestAnimationFrame(passo);
        limpar.push(() => cancelAnimationFrame(raf));
      }
    }

    /* ---------- Contadores ---------- */
    const rafsContador: number[] = [];
    function conta(node: HTMLElement) {
      if (node.dataset.done) return;
      node.dataset.done = "1";
      const alvo = parseFloat(node.dataset.count ?? "0");
      const suf = node.dataset.suffix ?? "";
      if (reduz) {
        node.textContent = alvo + suf;
        return;
      }
      let t0: number | null = null;
      const dur = 1400;
      const passo = (t: number) => {
        if (!t0) t0 = t;
        const p = Math.min((t - t0) / dur, 1);
        node.textContent = Math.round((1 - Math.pow(1 - p, 4)) * alvo) + (p === 1 ? suf : "");
        if (p < 1) rafsContador.push(requestAnimationFrame(passo));
      };
      rafsContador.push(requestAnimationFrame(passo));
    }
    limpar.push(() => rafsContador.forEach(cancelAnimationFrame));

    /* ---------- Observer geral de reveal ---------- */
    const obs = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          el.classList.add("in");
          if (el.dataset.count) conta(el);
          el.querySelectorAll<HTMLElement>("[data-count]").forEach(conta);
          obs.unobserve(el);
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -50px 0px" },
    );
    root
      .querySelectorAll<HTMLElement>(".rv, .odo, .inv-c, .tl-step, .ratio")
      .forEach((n) => obs.observe(n));
    limpar.push(() => obs.disconnect());

    /* ---------- HUD: dia atual conforme o scroll ---------- */
    const hud = root.querySelector<HTMLElement>("#hud");
    const hudDay = root.querySelector<HTMLElement>("#hudDay");
    const hudFill = root.querySelector<HTMLElement>("#hudFill");
    const hudPhase = root.querySelector<HTMLElement>("#hudPhase");
    const marcos = Array.from(root.querySelectorAll<HTMLElement>("[data-day]"));
    const hero = root.querySelector<HTMLElement>(".hero");

    if (hud && hudDay && hudFill && hudPhase && hero) {
      let ticking = false;
      const atualizaHud = () => {
        hud.classList.toggle("on", window.scrollY > hero.offsetHeight * 0.72);
        let dia = 1;
        let fase = "Início";
        for (const m of marcos) {
          if (m.getBoundingClientRect().top <= innerHeight * 0.55) {
            dia = Number(m.dataset.day);
            fase = m.dataset.phase ?? fase;
          }
        }
        hudDay.textContent = String(dia);
        hudPhase.textContent = fase;
        hudFill.style.width = (dia / 50) * 100 + "%";
        ticking = false;
      };
      const onScroll = () => {
        if (!ticking) {
          requestAnimationFrame(atualizaHud);
          ticking = true;
        }
      };
      addEventListener("scroll", onScroll, { passive: true });
      atualizaHud();
      limpar.push(() => removeEventListener("scroll", onScroll));
    }

    /* ---------- Constelacao do hero ---------- */
    const cv = root.querySelector<HTMLCanvasElement>("#stars");
    if (cv && hero && !reduz) {
      const ctx = cv.getContext("2d");
      if (ctx) {
        let pts: Array<{ x: number; y: number; vx: number; vy: number; r: number }> = [];
        let raf: number | null = null;

        const dim = () => {
          cv.width = hero.offsetWidth;
          cv.height = hero.offsetHeight;
          const n = Math.min(64, Math.floor(cv.width / 26));
          pts = Array.from({ length: n }, () => ({
            x: Math.random() * cv.width,
            y: Math.random() * cv.height,
            vx: (Math.random() - 0.5) * 0.22,
            vy: (Math.random() - 0.5) * 0.22,
            r: Math.random() * 1.5 + 0.6,
          }));
        };

        const loop = () => {
          ctx.clearRect(0, 0, cv.width, cv.height);
          pts.forEach((p) => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > cv.width) p.vx *= -1;
            if (p.y < 0 || p.y > cv.height) p.vy *= -1;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, 6.28);
            ctx.fillStyle = "rgba(143,210,255,.55)";
            ctx.fill();
          });
          for (let i = 0; i < pts.length; i++) {
            for (let j = i + 1; j < pts.length; j++) {
              const dx = pts[i].x - pts[j].x;
              const dy = pts[i].y - pts[j].y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 128) {
                ctx.beginPath();
                ctx.moveTo(pts[i].x, pts[i].y);
                ctx.lineTo(pts[j].x, pts[j].y);
                ctx.strokeStyle = "rgba(143,210,255," + 0.13 * (1 - dist / 128) + ")";
                ctx.lineWidth = 1;
                ctx.stroke();
              }
            }
          }
          raf = requestAnimationFrame(loop);
        };

        dim();
        loop();
        addEventListener("resize", dim);

        // Pausa a animacao quando o hero sai da tela.
        const pause = new IntersectionObserver((es) => {
          es.forEach((e) => {
            if (e.isIntersecting) {
              if (!raf) loop();
            } else if (raf) {
              cancelAnimationFrame(raf);
              raf = null;
            }
          });
        });
        pause.observe(cv);

        limpar.push(() => {
          removeEventListener("resize", dim);
          pause.disconnect();
          if (raf) cancelAnimationFrame(raf);
        });
      }
    }

    return () => limpar.forEach((fn) => fn());
  }, []);

  return (
    <div data-app="jornada" ref={rootRef}>
      {/* ============ BEM-VINDO ============ */}
      <div id="welcome-overlay" className={showWelcome ? "" : "hide"}>
        <div className="welcome-text">
          Bem-vindo<span>.</span>
        </div>
      </div>

      {/* ============ HUD ============ */}
      <div className="hud" id="hud" aria-hidden="true">
        <div className="shell">
          <div className="hud-inner">
            <div className="hud-day">
              Dia <b id="hudDay">1</b> <span style={{ opacity: 0.4 }}>/ 50</span>
            </div>
            <div className="hud-bar">
              <div className="hud-fill" id="hudFill" />
            </div>
            <div className="hud-phase" id="hudPhase">
              Início
            </div>
          </div>
        </div>
      </div>

      {/* ============ HERO ============ */}
      <header className="hero">
        <canvas id="stars" aria-hidden="true" />
        <div className="shell hero-inner">
          <div className="kicker">Lançamento OPA · Siriúba 2 · Ilhabela</div>

          <div className="big-wrap">
            <div className="big">
              <div className="big-num" id="bigNum">
                0
              </div>
              <div className="big-cap">dias · 18 mai — 07 jul 2026</div>
            </div>
            <div className="big-side">
              <h1>
                Um lançamento não é um anúncio. É uma <span className="hl">novela</span>. E essa
                durou 50 capítulos.
              </h1>
              <p>
                Cada quadrado abaixo é um dia. O lançamento levou 20 dias. Os 30 seguintes foram de
                manutenção, até a casa ter dono.
              </p>
            </div>
          </div>

          <div
            className="grid58"
            id="grid58"
            role="img"
            aria-label="Grade de 50 dias, colorida por fase: início, captação, pré-lançamento e lançamento nos 20 primeiros dias; manutenção nos 30 seguintes."
          />
          <div className="grid-cap">
            <span>
              <b>20</b> dias de lançamento
            </span>
            <span>
              <b>30</b> dias de manutenção
            </span>
            <span>
              <b>26</b> peças de conteúdo
            </span>
            <span>
              <b>1</b> comprador certo
            </span>
          </div>
        </div>
        <div className="scrollcue">
          Role para percorrer
          <i />
        </div>
      </header>

      {/* ============ JORNADA (ritmo + fases) ============ */}
      <section className="dark" data-day="10" data-phase="Lançamento">
        <div className="shell">
          <div className="rv">
            <h2>20 dias de lançamento. 30 de manutenção.</h2>
            <p className="lede">
              Cada imóvel da OPA é tratado como uma narrativa. Quatro fases nos primeiros 20 dias
              constroem a história; depois, manutenção até o comprador certo aparecer.
            </p>
          </div>

          <div className="odo-grid">
            <div className="odo rv" data-d="1">
              <div className="odo-n" data-count="26">
                0
              </div>
              <div className="odo-l">Peças de conteúdo</div>
              <div className="odo-d">21 em vídeo, 5 estáticas.</div>
            </div>
            <div className="odo rv" data-d="2">
              <div className="odo-n" data-count="20">
                0
              </div>
              <div className="odo-l">Dias de lançamento</div>
              <div className="odo-d">Depois, 30 de manutenção.</div>
            </div>
            <div className="odo rv" data-d="3">
              <div className="odo-n" data-count="49">
                0
              </div>
              <div className="odo-l">Fotos profissionais</div>
              <div className="odo-d">Mais drone, tour e página.</div>
            </div>
            <div className="odo rv" data-d="4">
              <div className="odo-n" data-count="50">
                0
              </div>
              <div className="odo-l">Dias até a venda</div>
              <div className="odo-d">18 de maio a 7 de julho.</div>
            </div>
          </div>

          <div className="tl-wrap rv" id="tlWrap" style={{ marginTop: 64 }}>
            <div className="tl-track">
              <div className="tl-prog" />
            </div>
            <div className="tl-steps">
              <div className="tl-step">
                <div className="tl-d">Dia 1 a 5</div>
                <h3>Início</h3>
                <p>
                  A casa entra e a equipe se mexe. Reunião e visita de cada corretor, gravadas na
                  hora.
                </p>
              </div>

              <div className="tl-step">
                <div className="tl-d">Dia 6 a 12</div>
                <h3>Captação</h3>
                <p>Fotógrafo, drone e câmera de cinema. O making-of vira conteúdo.</p>
              </div>

              <div className="tl-step">
                <div className="tl-d">Dia 13 a 16</div>
                <h3>Pré-lançamento</h3>
                <p>
                  Página exclusiva, tour virtual e kit de parceria no ar antes do tráfego chegar.
                </p>
              </div>

              <div className="tl-step">
                <div className="tl-d">Dia 17 a 20</div>
                <h3>Lançamento</h3>
                <p>
                  Reels, carrosséis e nativos saem nos perfis da OPA, do Marco e dos parceiros.
                </p>
              </div>

              <div className="tl-step">
                <div className="tl-d">Dia 21 a 50</div>
                <h3>Manutenção</h3>
                <p>Remarketing e visibilidade constante, até o comprador certo aparecer.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ INVENTÁRIO (enxame + peças) ============ */}
      <section className="light" data-day="20" data-phase="Lançamento">
        <div className="shell">
          <div className="rv">
            <h2>26 peças que não existiam em 18 de maio.</h2>
            <p className="lede">
              Tudo se apoiou numa base de 49 fotos, drone, página exclusiva e tour virtual.
            </p>
          </div>

          <div className="inv" style={{ marginTop: 40 }}>
            <div className="inv-c rv" data-d="1">
              <h3>
                Vídeo <b data-count="21">0</b>
              </h3>
              <ul className="inv-l">
                <li>
                  Reels audiovisuais <strong>7</strong>
                </li>
                <li>
                  Reels nativos <strong>9</strong>
                </li>
                <li>
                  Remarketing vídeo <strong>4</strong>
                </li>
                <li>
                  Cinematográfico <strong>1</strong>
                </li>
              </ul>
            </div>
            <div className="inv-c rv" data-d="2">
              <h3>
                Estático <b data-count="5">0</b>
              </h3>
              <ul className="inv-l">
                <li>
                  Remarketing estático <strong>3</strong>
                </li>
                <li>
                  Carrosséis <strong>2</strong>
                </li>
              </ul>
            </div>
            <div className="inv-c rv base" data-d="3">
              <h3>A base + a rede</h3>
              <ul className="inv-l">
                <li>
                  Fotos profissionais <strong>49</strong>
                </li>
                <li>
                  Página + tour virtual <strong>Sim</strong>
                </li>
                <li>
                  Kit de parceria <strong>Completo</strong>
                </li>
              </ul>
              <p className="inv-note">
                Fora da contagem de peças, mas foi o kit que qualquer corretor parceiro usou para
                vender sem produzir nada por conta própria.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ MATERIAIS ============ */}
      <section className="dark" data-day="16" data-phase="Pré-lançamento">
        <div className="shell">
          <div className="rv">
            <h2>Veja com os próprios olhos.</h2>
            <p className="lede">
              Os três materiais que sustentaram o lançamento, prontos para acessar agora.
            </p>
          </div>

          <div className="mats-hero rv" style={{ marginTop: 44 }}>
            <a
              className="mat mat-hero"
              href="https://my.matterport.com/show/?m=tL9pSrTiUNR&play=1"
              target="_blank"
              rel="noopener"
            >
              <span className="mat-badge">Principal diferencial</span>
              <span className="mat-hero-n">Tour virtual</span>
              <span className="mat-hero-d">
                Andar pela casa inteira sem sair de casa. Morando longe, isso influenciou na venda.
              </span>
              <span className="mat-l">my.matterport.com →</span>
            </a>
            <div className="mat mat-hero">
              <span className="mat-badge">Fechou a venda</span>
              <span className="mat-hero-n">Rede de parceiros</span>
              <span className="mat-hero-d">
                Quem fechou foi o corretor parceiro. A OPA possibilitou a parceria e entregou o
                material de apoio e a matéria-prima para ele vender.
              </span>
            </div>
          </div>

          <div className="mats rv" style={{ marginTop: 16 }}>
            <a
              className="mat"
              href="https://exclusivo.opailhabela.com.br/siriuba-2"
              target="_blank"
              rel="noopener"
            >
              <span className="mat-n">Página exclusiva</span>
              <span className="mat-l">exclusivo.opailhabela.com.br/siriuba-2</span>
            </a>
            <a
              className="mat"
              href="https://www.youtube.com/watch?v=7XWgckz3SPU"
              target="_blank"
              rel="noopener"
            >
              <span className="mat-n">Vídeo cinematográfico</span>
              <span className="mat-l">youtube.com</span>
            </a>
            <a
              className="mat"
              href="https://drive.google.com/drive/folders/1nInhiljDrIETJzVKFpd2CiJTH4Zs24Ay?usp=sharing"
              target="_blank"
              rel="noopener"
            >
              <span className="mat-n">Drive para corretores</span>
              <span className="mat-l">Fotos, vídeos e kit de parceria</span>
            </a>
          </div>
        </div>
      </section>

      {/* ============ DISTRIBUIÇÃO ============ */}
      <section className="dark" data-day="30" data-phase="Manutenção">
        <div className="shell">
          <div className="rv">
            <h2 style={{ textAlign: "center", maxWidth: "none" }}>
              Produzir é metade. Fazer chegar é a outra.
            </h2>
          </div>

          <div className="ch-grid">
            <article className="ch rv" data-d="1">
              <div className="ch-n">Instagram</div>
              <strong>Reels e carrossel</strong>
              <p>OPA, Marco e corretores parceiros.</p>
            </article>
            <article className="ch rv" data-d="2">
              <div className="ch-n">Facebook</div>
              <strong>Reels</strong>
              <p>Público de 45 a 65+ anos.</p>
            </article>
            <article className="ch rv" data-d="3">
              <div className="ch-n">TikTok</div>
              <strong>Descoberta</strong>
              <p>Quem ainda não conhecia a OPA.</p>
            </article>
            <article className="ch rv" data-d="4">
              <div className="ch-n">Google Ads</div>
              <strong>Intenção ativa</strong>
              <p>Quem já procurava casa em Ilhabela.</p>
            </article>
          </div>

          <div className="reach rv">
            <div className="reach-n">
              <span data-count="1" data-suffix=",2 mi">
                0
              </span>
              <small>Views por trimestre</small>
            </div>
            <p>
              A casa entrou numa rede que soma{" "}
              <b>mais de 1,2 milhão de visualizações por trimestre</b>, cerca de{" "}
              <b>13 mil pessoas por dia</b>.
            </p>
          </div>
        </div>
      </section>

      {/* ============ TRÁFEGO ============ */}
      <section className="stage" data-day="40" data-phase="Manutenção">
        <div className="shell">
          <div className="stage-open rv">
            <h2 className="stage-h">
              Dois mil reais.
              <br />
              Ajustados <em>todo dia</em>.
            </h2>
            <p className="stage-lede">
              A verba foi pequena de propósito. O que fez diferença não foi quanto, foi o quanto se
              mexeu nela: palavra-chave e métrica revistas todo dia, por 50 dias seguidos.
            </p>
          </div>

          <div className="beat rv">
            <div className="beat-mark">01</div>
            <div className="beat-body">
              <div className="beat-when">Dia 1 ao 30 · Google Ads</div>
              <h3>Busca ativa, otimizada diariamente</h3>
              <p>
                Campanha para alcançar quem já procurava imóvel em Ilhabela, com palavras-chave e
                métricas revistas todo dia.
              </p>
              <div className="beat-tags">
                <span className="tag">Otimização diária</span>
                <span className="tag">R$ 2.000 no total</span>
              </div>
            </div>
          </div>

          <div className="beat rv">
            <div className="beat-mark">02</div>
            <div className="beat-body">
              <div className="beat-when">Após 20 a 30 dias · Rede Google</div>
              <h3>Remarketing para quem já demonstrou interesse</h3>
              <p>
                Sete criativos para reencontrar quem visitou a página exclusiva ou assistiu ao
                conteúdo e não avançou de primeira.
              </p>
              <div className="beat-tags">
                <span className="tag">3 estáticos</span>
                <span className="tag">4 em vídeo</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FECHAMENTO ============ */}
      <section className="close" data-day="50" data-phase="Vendido">
        <div className="shell">
          <h2 className="rv">
            50 dias depois,
            <br />a casa tinha <em>dono</em>.
          </h2>
          <p className="rv">
            Este é o padrão de lançamento da OPA: produção completa, narrativa contínua e uma rede
            que distribui. O Siriúba 2 foi o capítulo mais recente.
          </p>
          <div className="close-stats rv">
            <div className="cs">
              <b>26</b>
              <span>Peças</span>
            </div>
            <div className="cs">
              <b>50</b>
              <span>Dias</span>
            </div>
            <div className="cs">
              <b>4</b>
              <span>Plataformas</span>
            </div>
            <div className="cs">
              <b>1,2 mi</b>
              <span>Views/trimestre</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
