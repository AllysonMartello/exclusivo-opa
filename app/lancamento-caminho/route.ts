import { NextResponse } from 'next/server';

const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>OPA , Nova fase · Plano interno</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<style>
:root{
  --azul:#236e93;
  --azul-escuro:#174b66;
  --azul-claro:#eaf5fa;
  --fundo:#f8fbfd;
  --texto:#24323a;
  --muted:#6c7b84;
  --linha:#dfe9ee;
  --branco:#fff;
}
*{box-sizing:border-box;margin:0;padding:0}
body{
  font-family:'Inter',sans-serif;
  background:
    radial-gradient(circle at top right, rgba(35,110,147,.05), transparent 28%),
    var(--fundo);
  color:var(--texto);
  -webkit-font-smoothing:antialiased;
}
.shell{width:min(1080px,calc(100% - 32px));margin:auto}

.hero{
  position:relative;
  overflow:hidden;
  background:
    linear-gradient(135deg,rgba(23,75,102,.98),rgba(35,110,147,.96)),
    radial-gradient(circle at 85% 18%,rgba(255,255,255,.12),transparent 28%);
  color:#fff;
  padding:78px 0 64px;
}
.hero:after{
  content:"";
  position:absolute;
  width:360px;height:360px;
  border-radius:50%;
  right:-120px;top:-180px;
  background:rgba(255,255,255,.05);
}
.kicker{
  font-size:10px;font-weight:700;letter-spacing:2.6px;text-transform:uppercase;
  color:rgba(255,255,255,.62);margin-bottom:14px;
}
.hero h1{
  font-size:clamp(38px,5vw,58px);
  font-weight:300;
  line-height:1.03;
  letter-spacing:-2px;
  max-width:900px;
}
.hero h1 strong{font-weight:600}
.hero p{
  margin-top:18px;
  max-width:760px;
  font-size:14px;
  line-height:1.65;
  color:rgba(255,255,255,.76);
}

.section{padding:58px 0}
.section.soft{
  background:linear-gradient(180deg,#f4f9fc 0%,#eef6fa 100%);
  border-top:1px solid #e5eef3;
  border-bottom:1px solid #e5eef3;
}
.section-head{margin-bottom:22px}
.section-kicker{
  display:block;
  font-size:10px;
  font-weight:700;
  letter-spacing:2.3px;
  text-transform:uppercase;
  color:var(--azul);
  margin-bottom:9px;
}
.section h2{
  font-size:32px;
  line-height:1.08;
  letter-spacing:-1.15px;
  font-weight:400;
}

.quote{
  position:relative;
  overflow:hidden;
  background:linear-gradient(135deg,var(--azul-escuro),#1f6687);
  color:#fff;
  border-radius:22px;
  padding:30px 32px;
  font-size:25px;
  line-height:1.32;
  letter-spacing:-.7px;
  box-shadow:0 18px 44px rgba(23,75,102,.12);
}
.quote:after{
  content:"";
  position:absolute;
  width:180px;height:180px;border-radius:50%;
  right:-60px;top:-85px;background:rgba(255,255,255,.06);
}

.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
.card{
  background:rgba(255,255,255,.96);
  border:1px solid var(--linha);
  border-radius:20px;
  padding:22px;
  box-shadow:0 10px 30px rgba(23,75,102,.055);
  transition:transform .2s ease, box-shadow .2s ease;
}
.card:hover{
  transform:translateY(-2px);
  box-shadow:0 16px 34px rgba(23,75,102,.085);
}
.card .tag{
  font-size:10px;
  text-transform:uppercase;
  letter-spacing:1.3px;
  font-weight:800;
  color:var(--azul);
}
.card h3{
  margin-top:10px;
  font-size:18px;
  line-height:1.2;
}
.card p{
  margin-top:9px;
  color:var(--muted);
  font-size:12.5px;
  line-height:1.55;
}
.meta{
  margin-top:12px;
  font-size:11px;
  font-weight:600;
  color:var(--azul-escuro);
}
.script{
  margin-top:14px;
  padding-top:14px;
  border-top:1px solid var(--linha);
  font-size:12px;
  line-height:1.65;
  color:#46545c;
}

.timeline{display:grid;gap:10px}
.step{
  display:grid;
  grid-template-columns:72px 1fr;
  gap:14px;
  background:#fff;
  border:1px solid var(--linha);
  border-radius:16px;
  padding:17px 18px;
  box-shadow:0 8px 24px rgba(23,75,102,.045);
}
.step b{color:var(--azul-escuro);font-size:12px}
.step h4{font-size:13px;font-weight:650}
.step p{margin-top:4px;color:var(--muted);font-size:12px;line-height:1.5}

.message{
  position:relative;
  background:#fff;
  border:1px solid var(--linha);
  border-radius:18px;
  padding:21px;
  box-shadow:0 10px 28px rgba(23,75,102,.05);
}
.copy-btn{
  position:absolute;
  top:16px;
  right:16px;
  border:1px solid var(--linha);
  background:var(--azul-claro);
  color:var(--azul-escuro);
  font-family:inherit;
  font-size:10px;
  font-weight:700;
  padding:7px 10px;
  border-radius:999px;
  cursor:pointer;
}
.copy-btn:hover{background:#dceff7}
.message h3{padding-right:72px;}
.message h3{font-size:14px}
.message p{
  margin-top:10px;
  white-space:pre-line;
  font-size:12px;
  line-height:1.6;
  color:#46545c;
}

.table-wrap{
  overflow-x:auto;
  border:1px solid var(--linha);
  border-radius:14px;
  background:#fff;
}
table{width:100%;border-collapse:collapse;min-width:700px}
th{
  background:#f4f9fc;
  color:var(--muted);
  font-size:10px;
  text-transform:uppercase;
  letter-spacing:1px;
  text-align:left;
  padding:12px 14px;
  border-bottom:1px solid var(--linha);
}
td{
  font-size:12px;
  padding:14px;
  border-bottom:1px solid #eef3f5;
  line-height:1.5;
  vertical-align:top;
}
tr:last-child td{border-bottom:0}

.footer{
  background:#123e55;
  color:rgba(255,255,255,.62);
  padding:28px 0;
  font-size:11px;
  border-top:1px solid rgba(255,255,255,.08);
}
.footer-inner{display:flex;justify-content:space-between;gap:20px}
.footer strong{color:#fff}

@media(max-width:760px){
  .grid{grid-template-columns:1fr}
  .hero{padding:56px 0 48px}
  .section{padding:42px 0}
  .footer-inner{flex-direction:column}
}
</style>
</head>
<body>

<header class="hero">
  <div class="shell">
    <div class="kicker">Plano interno · Nova fase OPA</div>
    <h1>A OPA está mudando.<br><strong>Nosso DNA está evoluindo.</strong></h1>
    <p>Novo site + novo escritório como sinais de uma OPA mais estruturada, sem perder a proximidade e a curadoria humana.</p>
  </div>
</header>

<section class="section">
  <div class="shell">
    <span class="section-kicker">Narrativa central</span>
    <div class="quote">“Quanto mais a OPA cresce, mais importante fica continuar sendo uma empresa de pessoas.”</div>
  </div>
</section>

<section class="section soft">
  <div class="shell">
    <div class="section-head">
      <span class="section-kicker">01 · Conteúdo</span>
      <h2>4 peças principais</h2>
    </div>

    <div class="grid">
      <article class="card">
        <span class="tag">Reel 01 · Teaser</span>
        <h3>Tem coisa mudando por aqui.</h3>
        <p>Bastidores do escritório + flashes do site. Não explicar tudo.</p>
        <div class="meta">12–18s · ritmo visual · poucos textos</div>
      </article>

      <article class="card">
        <span class="tag">Carrossel 01</span>
        <h3>A OPA cresceu. Algumas coisas precisavam crescer junto.</h3>
        <p>Mostrar: escritório, site, estrutura e evolução da experiência.</p>
        <div class="meta">5–6 slides · texto curto</div>
      </article>

      <article class="card">
        <span class="tag">Reel 02 · Principal</span>
        <h3>Marco + pessoa no escritório</h3>
        <p>Conversa natural sobre o que mudou e o que continua igual.</p>
        <div class="script">
          <strong>Pessoa:</strong> “Vocês mudaram tudo?”<br><br>
          <strong>Marco:</strong> “Não. A gente evoluiu o que precisava.”<br><br>
          Escritório novo. Site novo. Mais estrutura.<br><br>
          <strong>Fechamento:</strong> “Quanto mais a OPA cresce, mais importante fica continuar sendo uma empresa de pessoas.”
        </div>
      </article>

      <article class="card">
        <span class="tag">Reel 03 · Fechamento</span>
        <h3>Uma nova fase da OPA.</h3>
        <p>Equipe + escritório + site + Ilhabela. Consolidar a mudança como evolução da marca.</p>
        <div class="meta">20–30s · institucional, mas humano</div>
      </article>
    </div>
  </div>
</section>

<section class="section">
  <div class="shell">
    <div class="section-head">
      <span class="section-kicker">02 · Sequência</span>
      <h2>Ordem de publicação</h2>
    </div>

    <div class="timeline">
      <div class="step">
        <b>D–5</b>
        <div><h4>Reel 01</h4><p>Teaser + Stories de bastidor.</p></div>
      </div>
      <div class="step">
        <b>D–3</b>
        <div><h4>Carrossel 01</h4><p>Explicar a ideia de evolução.</p></div>
      </div>
      <div class="step">
        <b>D0</b>
        <div><h4>Reel 02 + site no ar</h4><p>Atualizar links e enviar mensagens para a base.</p></div>
      </div>
      <div class="step">
        <b>D+3</b>
        <div><h4>Reel 03</h4><p>Fechar a narrativa da nova fase.</p></div>
      </div>
    </div>
  </div>
</section>

<section class="section soft">
  <div class="shell">
    <div class="section-head">
      <span class="section-kicker">03 · Mensagens</span>
      <h2>Ativação da base</h2>
    </div>

    <div class="grid">
      <article class="message">
        <button class="copy-btn" onclick="copyMessage(this)">Copiar</button>
        <h3>Leads antigos</h3>
        <p>Olá! Tudo bem?

Aqui é da OPA Imóveis, em Ilhabela.

Estamos entrando em uma nova fase por aqui, com escritório novo e um site totalmente reformulado para facilitar a busca por imóveis e organizar melhor os conteúdos sobre a ilha.

Como já conversamos em outro momento, achei que fazia sentido compartilhar essa novidade com você.

Se Ilhabela ainda estiver nos seus planos, posso te enviar o novo site e, se quiser, também posso entender o que você está buscando hoje para direcionar melhor as opções.

opailhabela.com.br</p>
      </article>

      <article class="message">
        <button class="copy-btn" onclick="copyMessage(this)">Copiar</button>
        <h3>Clientes / proprietários</h3>
        <p>Olá! Tudo bem?

Queria compartilhar uma novidade da OPA com você.

Estamos entrando em uma nova fase, com escritório novo e um site totalmente reformulado, pensado para apresentar melhor os imóveis, organizar nossos conteúdos e tornar a experiência mais clara para quem compra, vende ou acompanha o mercado de Ilhabela.

Como você já faz parte da nossa trajetória, achei importante te mostrar essa evolução.

Se quiser, te envio o novo site para conhecer com calma.

opailhabela.com.br</p>
      </article>

      <article class="message">
        <button class="copy-btn" onclick="copyMessage(this)">Copiar</button>
        <h3>Conhecidos</h3>
        <p>Olá! Tudo bem?

Queria te contar uma novidade da OPA.

Estamos de escritório novo e acabamos de colocar no ar um site totalmente reformulado.

A ideia foi criar uma estrutura mais completa, reunindo imóveis, arquitetura, informações sobre Ilhabela e conteúdos que ajudam quem está pensando em comprar, vender ou simplesmente entender melhor o mercado da ilha.

Quando tiver um tempinho, te envio o link para conhecer.

opailhabela.com.br</p>
      </article>

      <article class="message">
        <button class="copy-btn" onclick="copyMessage(this)">Copiar</button>
        <h3>Parceiros / corretores</h3>
        <p>Olá! Tudo bem?

Queria compartilhar uma novidade da OPA com você.

Estamos entrando em uma nova fase, com escritório novo e um site totalmente reformulado para apresentar melhor os imóveis, organizar nossos conteúdos e ampliar a conexão com clientes e parceiros.

Como estamos fortalecendo cada vez mais nossa rede de relacionamento em Ilhabela, achei que fazia sentido te mostrar essa evolução.

Se quiser, te envio o novo site para conhecer e a gente conversa sobre possibilidades de parceria.

opailhabela.com.br</p>
      </article>
    </div>
  </div>
</section>



<footer class="footer">
  <div class="shell footer-inner">
    <span>Nova fase OPA · Plano interno</span>
    <span><strong>G Compass</strong> para OPA Curadoria Imobiliária</span>
  </div>
</footer>


<script>
function copyMessage(button){
  const text = button.parentElement.querySelector('p').innerText;
  navigator.clipboard.writeText(text).then(function(){
    const original = button.innerText;
    button.innerText = 'Copiado';
    setTimeout(function(){ button.innerText = original; }, 1200);
  });
}
</script>

</body>
</html>`;

export function GET() {
  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}
