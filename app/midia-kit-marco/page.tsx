const LOGO_OPA = "https://exclusivo.opailhabela.com.br/assets/logo/logo-opa.svg";

export default function MidiaKitMarcoPage() {
  return (
    <main data-app="midia-kit-marco">
      {/* ──────────────────────────────
          PÁGINA 1 · CAPA
      ────────────────────────────── */}
      <section className="hero">
        <img className="hero-photo" src="/midiakit/barcos-e-velas-ilhabela-opa.webp" alt="" aria-hidden="true" />
        <div className="hero-bg" />
        <div className="hero-overlay" />

        <div className="hero-content">
          <span className="hero-eyebrow">Mídia Kit · 2026</span>
          <h1>
            Marco<br />Henrique<span>Markito</span>
          </h1>
          <p className="hero-sub">Empresário. Corretor. Arquiteto. Ilhabela.</p>
          <p className="hero-specs">
            OPA Imóveis Ilhabela &nbsp;·&nbsp; Duas décadas no mercado &nbsp;·&nbsp; Alto padrão
            &nbsp;·&nbsp; Lifestyle
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-num">20 anos</div>
              <div className="hero-stat-label">No mercado</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">Alto padrão</div>
              <div className="hero-stat-label">Posicionamento</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">Ilhabela</div>
              <div className="hero-stat-label">Território</div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────
          PÁGINA 2 · QUEM É MARCO HENRIQUE
      ────────────────────────────── */}
      <section className="split">
        <div className="split-content">
          <span className="s-label">Quem é Marco Henrique</span>
          <h2 className="s-h2">Vinte anos dentro do lugar certo</h2>
          <p className="s-p">
            Marco Henrique é arquiteto, corretor e empresário. Cresceu em Ilhabela, de família
            caiçara, e há vinte anos atua no mercado imobiliário de alto padrão da ilha.
          </p>
          <p className="s-p">
            Foi um dos primeiros a tratar o digital como ferramenta séria do setor em Ilhabela. Hoje
            é sócio da OPA Imóveis e uma das vozes consultadas antes da decisão de compra.
          </p>
        </div>
        <div className="split-image">
          <img src="/midiakit/marco-foto.webp" alt="Marco Henrique · OPA Imóveis Ilhabela" />
        </div>
      </section>

      {/* Bloco do público — fundo azul */}
      <section className="secao-publico">
        <div className="publico-inner">
          <div>
            <span className="s-label">O Público</span>
            <h2 className="s-h2">O luxo sem excesso, a qualidade sem barulho</h2>
            <p className="s-p">
              Quem vem para Ilhabela quer uma vida sofisticada que não precise se anunciar. Tem
              entre 25 e 54 anos, vem de São Paulo, São José dos Campos e Campinas, e trata tempo
              como bem mais valioso.
            </p>
            <p className="s-p">
              É o mesmo perfil que consome náutica, automóveis, relógios, arquitetura, hotelaria,
              moda, gastronomia, aviação executiva e wellness.
            </p>
            <p className="s-p">
              Ilhabela tem um estilo de vida próprio. As marcas que se associam a ele se conectam a
              um público que escolhe o melhor no que consome, sem precisar gritar.
            </p>
          </div>
          <div>
            <span className="s-label" style={{ color: "rgba(255,255,255,0.35)" }}>
              Segmentos de consumo
            </span>
            <div className="publico-marcas">
              <div className="publico-marca-item">Náutica &amp; Esportes aquáticos</div>
              <div className="publico-marca-item">Automóveis &amp; Mobilidade premium</div>
              <div className="publico-marca-item">Relógios &amp; Acessórios</div>
              <div className="publico-marca-item">Arquitetura &amp; Decoração</div>
              <div className="publico-marca-item">Hotelaria &amp; Turismo de experiência</div>
              <div className="publico-marca-item">Moda &amp; Lifestyle</div>
              <div className="publico-marca-item">Gastronomia &amp; Vinhos</div>
              <div className="publico-marca-item">Aviação executiva</div>
              <div className="publico-marca-item">Wellness &amp; Longevidade</div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────
          PÁGINA 3 · ALCANCE E AUDIÊNCIA
      ────────────────────────────── */}
      <section className="secao-alcance">
        <div className="alcance-inner">
          <span className="s-label">Alcance e Audiência</span>
          <h2 className="s-h2">
            Uma audiência que acompanha,<br />salva e volta
          </h2>

          <div className="metricas-top">
            <div className="metrica-item">
              <div className="metrica-num">1,2MM+</div>
              <div className="metrica-label">Visualizações nos últimos 90 dias</div>
            </div>
            <div className="metrica-item">
              <div className="metrica-num">80k+</div>
              <div className="metrica-label">Pessoas únicas alcançadas no trimestre</div>
            </div>
            <div className="metrica-item">
              <div className="metrica-num">17,5k+</div>
              <div className="metrica-label">Seguidores com alto índice de recorrência</div>
            </div>
          </div>

          <div className="perfil-cols">
            <div className="perfil-col">
              <span className="perfil-col-label">Faixa etária</span>
              <div className="perfil-row">
                <span className="perfil-key">25–34 anos</span>
                <span className="perfil-val">38%</span>
              </div>
              <div className="perfil-row">
                <span className="perfil-key">35–44 anos</span>
                <span className="perfil-val">30%</span>
              </div>
              <div className="perfil-row">
                <span className="perfil-key">45–54 anos</span>
                <span className="perfil-val">12%</span>
              </div>
              <div className="perfil-row" style={{ borderBottom: "none", paddingBottom: 0 }}>
                <span className="perfil-key" style={{ color: "var(--azul)", fontWeight: 500 }}>
                  25–54 anos (total)
                </span>
                <span className="perfil-val" style={{ color: "var(--azul)", fontSize: 17 }}>
                  78%
                </span>
              </div>
            </div>
            <div className="perfil-col">
              <span className="perfil-col-label">Origem geográfica</span>
              <div className="perfil-row">
                <span className="perfil-key">São Paulo</span>
                <span className="perfil-val">55%</span>
              </div>
              <div className="perfil-row">
                <span className="perfil-key">Ilhabela</span>
                <span className="perfil-val">18%</span>
              </div>
              <div className="perfil-row">
                <span className="perfil-key">SJC / Campinas</span>
                <span className="perfil-val">14%</span>
              </div>
              <div className="perfil-row" style={{ borderBottom: "none", paddingBottom: 0 }}>
                <span className="perfil-key">Outros</span>
                <span className="perfil-val">13%</span>
              </div>
            </div>
          </div>

          <p className="alcance-conclusao">
            <strong>78% do público entre 25 e 54 anos.</strong> As mesmas origens dos compradores de
            alto padrão em Ilhabela. A audiência online e o público real coincidem.
          </p>
        </div>
      </section>

      {/* Barra de destaque de qualidade de audiência */}
      <div className="alcance-bar">
        <div className="alcance-bar-inner">
          <div className="ab-item">
            <span className="ab-label">Origem das interações</span>
            <span className="ab-valor">75% da base fixa</span>
          </div>
          <div className="ab-sep" />
          <div className="ab-item">
            <span className="ab-label">Impulsionamento</span>
            <span className="ab-valor">Não depende</span>
          </div>
          <div className="ab-sep" />
          <div className="ab-item">
            <span className="ab-label">Audiência online vs. real</span>
            <span className="ab-valor">Perfis coincidem</span>
          </div>
          <div className="ab-sep" />
          <div className="ab-item">
            <span className="ab-label">Comportamento</span>
            <span className="ab-valor">Acompanha, salva e volta</span>
          </div>
        </div>
      </div>

      {/* ──────────────────────────────
          PÁGINA 4 · PARCERIA E CONTATO
      ────────────────────────────── */}
      <section className="secao-formatos">
        <div className="formatos-inner">
          <span className="s-label">Formatos de Parceria</span>
          <h2 className="s-h2">
            A marca entra no cotidiano,<br />não na interrupção
          </h2>

          <div className="formatos-grid">
            <div className="formato-card">
              <span className="formato-num">01</span>
              <div className="formato-titulo">Reels e Stories do dia a dia</div>
              <p className="formato-texto">
                Presença orgânica no conteúdo cotidiano, integrada à rotina real de Ilhabela. A
                marca aparece onde a vida acontece.
              </p>
            </div>
            <div className="formato-card">
              <span className="formato-num">02</span>
              <div className="formato-titulo">Eventos privados em imóveis OPA</div>
              <p className="formato-texto">
                Coquetéis e jantares com público selecionado, em ambiente real. Experiência dentro
                do território.
              </p>
            </div>
            <div className="formato-card">
              <span className="formato-num">03</span>
              <div className="formato-titulo">Calendário da ilha</div>
              <p className="formato-texto">
                Sailing Week, regatas, alta temporada, feriados estratégicos. Presença planejada no
                ritmo de Ilhabela.
              </p>
            </div>
          </div>

          <div className="parceria-nota">
            <p>
              Toda parceria opera em <strong>ciclo mínimo definido em contrato</strong>, para que a
              associação entre marca e território se fixe na memória do público. Parcerias são
              construídas com conversa. Se faz sentido para a sua marca estar em Ilhabela, o próximo
              passo é simples: entre em contato.
            </p>
            <div className="parceria-cta">
              <span className="cta-label">Contato</span>
              <div className="cta-nome">Marco Henrique</div>
              <div className="cta-handle">@marcohenriqueilhabela</div>
              <div className="cta-divider" />
              <div className="cta-line">OPA Imóveis Ilhabela</div>
              <div className="cta-line">Av. São João, 243, loja 13, Perequê</div>
              <div className="cta-line">Ilhabela, SP — Brasil</div>
              <div className="cta-line">+55 (12) 97406-8058</div>
              <div className="cta-divider" style={{ marginTop: 12 }} />
              <div
                className="cta-line"
                style={{ fontStyle: "italic", color: "var(--cinza-leve)", opacity: 0.7 }}
              >
                A próxima reunião não é por chamada.<br />É aqui, dentro do território.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────
          RODAPÉ
      ────────────────────────────── */}
      <section className="rodape">
        <div className="rodape-logo">
          <img src={LOGO_OPA} alt="OPA Imóveis Ilhabela" />
        </div>

        <div className="rodape-divider" />

        <div className="rodape-qr">
          <div className="qr-box">
            <img src="/midiakit/qr-code-marco-midiakit-ong.png" alt="QR Code para agendamento com Marco Henrique" />
          </div>
          <span className="qr-label">Agendamento</span>
        </div>

        <div className="rodape-divider" />

        <div className="rodape-info">
          <span className="r-nome">Marco Henrique · @marcohenriqueilhabela</span>
          <span className="r-detalhe">
            OPA Imóveis Ilhabela · Av. São João, 243, loja 13, Perequê · +55 (12) 97406-8058
          </span>
          <span
            className="r-detalhe"
            style={{
              marginTop: 4,
              letterSpacing: 2,
              fontSize: 10,
              opacity: 0.5,
              textTransform: "uppercase",
            }}
          >
            Mídia Kit 2026 · Versão Executiva
          </span>
        </div>
      </section>
    </main>
  );
}
