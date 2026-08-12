import { NextResponse } from 'next/server';

const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>50 dias: a jornada do Siriúba 2 | OPA</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
:root{
  --azul-vivo:#0071C6;
  --azul-petroleo:#156187;
  --azul-profundo:#0B3D57;
  --azul-abissal:#06283A;
  --azul-claro:#E8F4F8;
  --azul-nevoa:#F4F9FC;
  --ciano:#8FD2FF;
  --texto:#24323A;
  --texto-suave:#5A6B75;
  --linha:#DFE9EE;
  --branco:#FFF;
  --fundo:#FAFBFC;
  --positivo:#2F7A5C;
  --raio-card:18px;
}

*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}

body{
  font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
  background:var(--azul-abissal);color:var(--texto);
  line-height:1.7;font-size:16px;-webkit-font-smoothing:antialiased;
  overflow-x:hidden;
}

.shell{width:min(1180px,calc(100% - 96px));margin:0 auto}
.narrow{width:min(900px,calc(100% - 96px));margin:0 auto}

a:focus-visible,button:focus-visible{outline:2px solid var(--ciano);outline-offset:3px}

/* ============ HUD FIXO ============ */
.hud{
  position:fixed;top:0;left:0;right:0;z-index:60;
  padding:14px 0;pointer-events:none;
  opacity:0;transition:opacity .5s ease;
}
.hud.on{opacity:1}
.hud-inner{
  display:flex;align-items:center;gap:16px;
  background:rgba(6,40,58,.82);backdrop-filter:blur(18px);
  border:1px solid rgba(143,210,255,.18);
  border-radius:99px;padding:9px 20px;
}
.hud-day{
  font-size:13px;font-weight:700;color:#fff;
  font-variant-numeric:tabular-nums;white-space:nowrap;
}
.hud-day b{color:var(--ciano);font-size:16px}
.hud-bar{
  flex:1;height:3px;background:rgba(255,255,255,.14);
  border-radius:99px;overflow:hidden;
}
.hud-fill{
  height:100%;width:0;border-radius:99px;
  background:linear-gradient(90deg,var(--azul-vivo),var(--ciano));
}
.hud-phase{
  font-size:9.5px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;
  color:var(--ciano);white-space:nowrap;
}

/* ============ HERO ============ */
.hero{
  position:relative;min-height:100vh;
  display:flex;align-items:center;justify-content:center;
  padding:96px 0 60px;color:#fff;overflow:hidden;
  background:
    radial-gradient(ellipse 70% 55% at 78% 12%, rgba(0,113,198,.42), transparent 60%),
    radial-gradient(ellipse 60% 50% at 12% 88%, rgba(21,97,135,.5), transparent 62%),
    linear-gradient(160deg,#06283A 0%,#0B3D57 52%,#0d4d6b 100%);
}
/* Constelação de partículas */
#stars{position:absolute;inset:0;z-index:1;opacity:.5}

/* .shell é flex-item aqui: precisa de largura e centragem próprias */
.hero-inner{position:relative;z-index:3;width:min(1180px,calc(100% - 34px));margin-inline:auto;flex:0 1 auto;text-align:center}
.kicker{
  font-size:10px;font-weight:700;letter-spacing:3.4px;text-transform:uppercase;
  color:rgba(143,210,255,.85);margin-bottom:26px;
  opacity:0;transform:translateY(14px);
  animation:up .9s cubic-bezier(.22,1,.36,1) .15s forwards;
}
@keyframes up{to{opacity:1;transform:none}}

.big-wrap{display:flex;flex-direction:column;align-items:center;gap:clamp(10px,2vw,18px)}

/* Número gigante com grade interna */
.big{position:relative}
.big-num{
  font-size:clamp(120px,25vw,290px);font-weight:700;letter-spacing:-10px;
  line-height:.8;font-variant-numeric:tabular-nums;
  background:linear-gradient(165deg,#fff 20%,var(--ciano) 78%);
  -webkit-background-clip:text;background-clip:text;color:transparent;
  filter:drop-shadow(0 10px 40px rgba(0,113,198,.4));
}
.big-cap{
  font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;
  color:rgba(143,210,255,.75);margin-top:6px;
}

.big-side{flex:1;max-width:640px;margin-inline:auto}
.big-side h1{
  font-size:clamp(27px,3.7vw,46px);font-weight:600;letter-spacing:-2px;
  line-height:1.12;
}
.big-side h1 .hl{
  position:relative;display:inline-block;color:var(--ciano);
}
.big-side h1 .hl:after{
  content:"";position:absolute;left:0;right:0;bottom:.1em;height:.09em;
  background:var(--ciano);transform:scaleX(0);transform-origin:left;
  animation:swipe 1s cubic-bezier(.22,1,.36,1) 1.5s forwards;
}
@keyframes swipe{to{transform:scaleX(1)}}
.big-side p{
  margin:20px auto 0;font-size:15px;line-height:1.75;
  color:rgba(255,255,255,.72);max-width:440px;
}

/* Grade de 50 dias no hero */
.grid58{
  margin:clamp(38px,6vw,64px) auto 0;
  display:grid;grid-template-columns:repeat(25,1fr);gap:5px;
  max-width:720px;
}
.cell{
  aspect-ratio:1;border-radius:3px;
  background:rgba(255,255,255,.09);
  transform:scale(0);
  transition:transform .42s cubic-bezier(.34,1.56,.64,1),background .5s ease,box-shadow .5s ease;
}
.cell.on{transform:scale(1)}
.cell.f1{background:rgba(143,210,255,.34)}
.cell.f2{background:var(--azul-vivo);box-shadow:0 0 12px rgba(0,113,198,.65)}
.cell.f3{background:rgba(143,210,255,.5)}
.cell.f4{background:var(--ciano);box-shadow:0 0 14px rgba(143,210,255,.75)}
/* manutenção: tom mais contido, o lançamento é que concentra o brilho */
.cell.f5{background:rgba(143,210,255,.22)}
/* dia 50: a venda */
.cell.venda{background:#fff;box-shadow:0 0 20px rgba(255,255,255,.95)}
.grid-cap{
  margin-top:14px;font-size:11.5px;color:rgba(255,255,255,.5);
  display:flex;gap:20px;flex-wrap:wrap;justify-content:center;
}
.grid-cap b{color:var(--ciano);font-weight:600}

/* ============ SEÇÕES ESCURAS ============ */
/* padding-top generoso: o HUD fixo (~62px) nunca cobre o título da seção */
.dark,.light{scroll-margin-top:84px}
.dark{background:var(--azul-abissal);color:#fff;position:relative;padding:124px 0 100px}
.sec-k{
  display:inline-flex;align-items:center;gap:9px;
  font-size:10px;font-weight:700;letter-spacing:2.7px;text-transform:uppercase;
  color:var(--ciano);margin-bottom:16px;
}
.sec-k:before{content:"";width:26px;height:1px;background:var(--ciano)}
.dark h2{
  font-size:clamp(30px,4.4vw,52px);line-height:1.08;
  letter-spacing:-2px;font-weight:600;max-width:840px;
}
.dark .lede{
  font-size:15.5px;line-height:1.78;color:rgba(255,255,255,.68);
  margin-top:20px;max-width:640px;
}

/* Reveal */
.rv{opacity:0;transform:translateY(30px);transition:opacity .8s cubic-bezier(.22,1,.36,1),transform .8s cubic-bezier(.22,1,.36,1)}
.rv.in{opacity:1;transform:none}
.rv[data-d="1"]{transition-delay:.07s}
.rv[data-d="2"]{transition-delay:.14s}
.rv[data-d="3"]{transition-delay:.21s}
.rv[data-d="4"]{transition-delay:.28s}

/* ============ CONTADOR ODÔMETRO ============ */
.odo-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;margin-top:44px;background:rgba(143,210,255,.16)}
.odo{
  background:var(--azul-abissal);padding:34px 26px;
  position:relative;overflow:hidden;
}
.odo:before{
  content:"";position:absolute;left:0;bottom:0;height:2px;width:0;
  background:linear-gradient(90deg,var(--azul-vivo),var(--ciano));
  transition:width 1.3s cubic-bezier(.22,1,.36,1) .2s;
}
.odo.in:before{width:100%}
.odo-n{
  font-size:clamp(38px,5.2vw,62px);font-weight:700;letter-spacing:-3px;
  line-height:1;font-variant-numeric:tabular-nums;color:#fff;
  display:flex;align-items:baseline;
  /* "R\$ 2 mil" não pode quebrar em duas linhas e desalinhar a fileira */
  white-space:nowrap;
}
.odo-n .suf{font-size:.42em;letter-spacing:-1px;color:var(--ciano);margin-left:3px}
/* valor com prefixo/sufixo ("R\$ 2 mil") é mais longo: corpo menor para caber */
.odo-n:has([data-prefix]){font-size:clamp(30px,3.9vw,46px);letter-spacing:-2px}
/* altura travada na linha do maior corpo: mantém os rótulos alinhados
   mesmo com o "R\$ 2 mil" em tamanho menor */
.odo-n{min-height:clamp(38px,5.2vw,62px);align-items:flex-end}
.odo-l{
  font-size:10px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;
  color:var(--ciano);margin-top:16px;
}
.odo-d{font-size:12.5px;line-height:1.6;color:rgba(255,255,255,.55);margin-top:9px}

/* ============ TIMELINE HORIZONTAL ============ */
.tl-wrap{margin-top:54px;position:relative}
.tl-track{
  position:relative;height:2px;background:rgba(143,210,255,.2);
  margin:0 0 0 0;border-radius:99px;
}
.tl-prog{
  position:absolute;inset:0;width:0;border-radius:99px;
  background:linear-gradient(90deg,var(--azul-vivo),var(--ciano),#fff);
  transition:width 1.8s cubic-bezier(.22,1,.36,1);
}
.tl-wrap.in .tl-prog{width:100%}

.tl-steps{
  display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin-top:0;
}
/* coluna flex: empurra o número para a base, alinhando todos os cinco */
.tl-step{position:relative;padding-top:34px;display:flex;flex-direction:column}
.tl-step:before{
  content:"";position:absolute;top:-5px;left:0;width:12px;height:12px;
  border-radius:50%;background:var(--azul-abissal);
  border:2px solid var(--ciano);transform:scale(0);
  transition:transform .5s cubic-bezier(.34,1.56,.64,1);
}
.tl-step.in:before{transform:scale(1)}
/* a 4ª fase encerra o lançamento: é ela que ganha o destaque */
.tl-step:nth-child(4):before{background:var(--ciano);border-color:var(--ciano);box-shadow:0 0 14px rgba(143,210,255,.7)}
.tl-step:last-child:before{background:#fff;border-color:#fff;box-shadow:0 0 16px rgba(255,255,255,.85)}
.tl-d{
  font-size:9.5px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;
  color:var(--ciano);
}
.tl-step h3{font-size:17px;font-weight:600;letter-spacing:-.6px;margin-top:7px;color:#fff}
.tl-step p{font-size:12.5px;line-height:1.62;color:rgba(255,255,255,.6);margin-top:8px}
.tl-n{
  font-size:26px;font-weight:700;letter-spacing:-1.4px;color:#fff;
  margin-top:auto;padding-top:16px;font-variant-numeric:tabular-nums;
}
.tl-n span{font-size:11px;font-weight:600;color:var(--ciano);letter-spacing:0;margin-left:5px}

/* ============ INVENTÁRIO CLARO ============ */
.light{background:var(--fundo);color:var(--texto);padding:124px 0 100px}
.light .sec-k{color:var(--azul-vivo)}
.light .sec-k:before{background:var(--azul-vivo)}
.light h2{
  font-size:clamp(30px,4.4vw,52px);line-height:1.08;
  letter-spacing:-2px;font-weight:600;max-width:820px;
}
.light .lede{font-size:15.5px;line-height:1.78;color:var(--texto-suave);margin-top:20px;max-width:640px}

.inv{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:44px}
.inv-c{
  background:#fff;border:1px solid var(--linha);border-radius:var(--raio-card);
  padding:28px;position:relative;overflow:hidden;
  transition:transform .35s cubic-bezier(.22,1,.36,1),box-shadow .35s;
}
.inv-c:hover{transform:translateY(-5px);box-shadow:0 20px 44px rgba(21,97,135,.13)}
.inv-c:after{
  content:"";position:absolute;top:0;left:0;right:0;height:3px;
  background:linear-gradient(90deg,var(--azul-petroleo),var(--azul-vivo));
  transform:scaleX(0);transform-origin:left;transition:transform .7s cubic-bezier(.22,1,.36,1);
}
.inv-c.in:after{transform:scaleX(1)}
.inv-c h3{
  display:flex;justify-content:space-between;align-items:baseline;
  font-size:15px;font-weight:600;margin-bottom:20px;
}
.inv-c h3 b{
  font-size:38px;font-weight:700;letter-spacing:-2px;color:var(--azul-vivo);
  font-variant-numeric:tabular-nums;
}
.inv-l{list-style:none;display:flex;flex-direction:column;gap:10px}
.inv-l li{
  display:flex;justify-content:space-between;gap:12px;align-items:baseline;
  font-size:13px;color:var(--texto-suave);
  padding-bottom:10px;border-bottom:1px dashed var(--linha);
}
.inv-l li:last-child{border-bottom:0;padding-bottom:0}
/* card da base: material de apoio, fora da contagem de peças */
.inv-c.base{background:var(--azul-claro);border-color:#CFE6F1}
.inv-c.base:after{background:linear-gradient(90deg,#8FA9B8,#B7CCD6)}
.inv-note{
  margin-top:18px;padding-top:16px;border-top:1px dashed #CFE6F1;
  font-size:12px;line-height:1.6;color:var(--texto-suave);
}
.inv-l li strong{color:var(--texto);font-weight:600;font-variant-numeric:tabular-nums;flex-shrink:0}

/* ============ MATERIAIS (acesso rápido) ============ */
.mats-hero{display:grid;grid-template-columns:1fr 1fr;gap:16px;align-items:stretch}
.mats{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.mat{
  display:flex;flex-direction:column;gap:6px;
  background:rgba(255,255,255,.04);border:1px solid rgba(143,210,255,.18);border-radius:var(--raio-card);
  padding:22px 24px;
}
.mat-n{font-size:15px;font-weight:600;color:#fff}
.mat-l{font-size:12px;color:rgba(255,255,255,.5)}

/* card hero: destaca o tour como principal diferencial */
.mat-hero{
  position:relative;justify-content:center;gap:14px;padding:48px 44px;
  background:
    radial-gradient(ellipse 90% 90% at 100% 0%, rgba(0,113,198,.32), transparent 65%),
    linear-gradient(155deg,rgba(143,210,255,.1),rgba(255,255,255,.03));
  border:1px solid rgba(143,210,255,.32);
  overflow:hidden;
}
.mat-hero:before{
  content:"";position:absolute;inset:0;border-radius:inherit;padding:1px;
  background:linear-gradient(135deg,var(--ciano),transparent 40%);
  -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
  -webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none;
}
.mat-badge{
  align-self:flex-start;font-size:10px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;
  color:var(--azul-abissal);background:var(--ciano);padding:6px 12px;border-radius:999px;
}
.mat-hero-n{font-size:clamp(26px,3.4vw,38px);font-weight:700;letter-spacing:-1.4px;color:#fff}
.mat-hero-d{font-size:14.5px;line-height:1.7;color:rgba(255,255,255,.72);max-width:440px}
.mat-hero .mat-l{margin-top:8px;color:var(--ciano);font-weight:600}

/* ============ CANAIS ============ */
.ch-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;margin-top:44px;background:rgba(143,210,255,.16)}
.ch{background:var(--azul-abissal);padding:30px 24px;transition:background .4s}
.ch:hover{background:#0a3550}
.ch-n{font-size:10px;font-weight:700;letter-spacing:1.7px;text-transform:uppercase;color:var(--ciano)}
.ch strong{display:block;margin-top:16px;font-size:22px;font-weight:600;letter-spacing:-1px;color:#fff}
.ch p{margin-top:10px;font-size:12.5px;line-height:1.62;color:rgba(255,255,255,.58)}

.reach{
  margin-top:38px;padding:44px;border-radius:var(--raio-card);
  background:linear-gradient(135deg,rgba(0,113,198,.22),rgba(143,210,255,.07));
  border:1px solid rgba(143,210,255,.24);
  display:grid;grid-template-columns:auto 1fr;gap:44px;align-items:center;
}
.reach-n{
  font-size:clamp(52px,9vw,104px);font-weight:700;letter-spacing:-4px;
  line-height:.9;color:#fff;font-variant-numeric:tabular-nums;
}
.reach-n small{
  display:block;font-size:11px;font-weight:700;letter-spacing:2px;
  text-transform:uppercase;color:var(--ciano);margin-top:14px;letter-spacing:2px;
}
.reach p{font-size:15px;line-height:1.78;color:rgba(255,255,255,.75)}
.reach p b{color:#fff;font-weight:600}

/* ============ VERBA ============ */
/* ============ TRÁFEGO (registro amplo) ============ */
.stage{
  background:linear-gradient(180deg,#06283A 0%,#092F45 55%,#06283A 100%);
  color:#fff;padding:150px 0 140px;scroll-margin-top:84px;
}
.stage-open{max-width:860px;margin-bottom:112px}
.stage-h{
  font-size:clamp(38px,6.4vw,86px);font-weight:700;
  letter-spacing:-3px;line-height:1.02;
}
.stage-h em{font-style:normal;color:var(--ciano)}
.stage-lede{
  margin-top:28px;max-width:600px;font-size:17px;
  line-height:1.72;color:rgba(255,255,255,.66);
}

/* Momentos */
.beat{
  display:grid;grid-template-columns:96px 1fr;gap:36px;
  padding:52px 0;border-top:1px solid rgba(143,210,255,.16);
}
.beat-mark{
  font-size:15px;font-weight:700;color:var(--ciano);
  font-variant-numeric:tabular-nums;letter-spacing:1px;padding-top:6px;
}
.beat-when{
  font-size:10px;font-weight:700;letter-spacing:2.2px;
  text-transform:uppercase;color:rgba(143,210,255,.8);
}
.beat-body h3{
  font-size:clamp(23px,2.9vw,36px);font-weight:600;
  letter-spacing:-1.4px;line-height:1.14;margin-top:14px;
}
.beat-body p{
  margin-top:18px;max-width:640px;font-size:15.5px;
  line-height:1.76;color:rgba(255,255,255,.66);
}
.beat-tags{display:flex;flex-wrap:wrap;gap:9px;margin-top:24px}
.tag{
  font-size:11.5px;font-weight:600;padding:8px 14px;border-radius:999px;
  border:1px solid rgba(143,210,255,.26);
  background:rgba(143,210,255,.07);color:var(--ciano);
}

/* Proporção final */
.ratio{
  margin-top:104px;padding-top:64px;
  border-top:1px solid rgba(143,210,255,.16);text-align:center;
}
.ratio-line{
  display:flex;align-items:center;justify-content:center;
  gap:clamp(18px,4vw,46px);flex-wrap:wrap;
}
.ratio-a,.ratio-b{
  font-weight:700;letter-spacing:-3px;line-height:1;
  font-variant-numeric:tabular-nums;
}
.ratio-a{font-size:clamp(34px,5vw,64px);color:rgba(255,255,255,.42)}
.ratio-b{
  font-size:clamp(48px,9.4vw,124px);
  background:linear-gradient(170deg,#fff 22%,var(--ciano) 80%);
  -webkit-background-clip:text;background-clip:text;color:transparent;
}
.ratio-arrow{
  width:clamp(40px,7vw,96px);height:2px;position:relative;flex-shrink:0;
  background:linear-gradient(90deg,rgba(143,210,255,.28),var(--ciano));
  transform:scaleX(0);transform-origin:left;
  transition:transform 1s cubic-bezier(.22,1,.36,1) .35s;
}
.ratio.in .ratio-arrow{transform:scaleX(1)}
.ratio-arrow:after{
  content:"";position:absolute;right:-1px;top:50%;
  width:9px;height:9px;border-right:2px solid var(--ciano);
  border-top:2px solid var(--ciano);transform:translateY(-50%) rotate(45deg);
}
.ratio p{
  margin:36px auto 0;max-width:600px;font-size:15px;
  line-height:1.76;color:rgba(255,255,255,.6);
}

.spend{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:44px}
.spend-c{
  background:#fff;border:1px solid var(--linha);
  border-radius:var(--raio-card);padding:32px;
}
.spend-c.blue{background:var(--azul-claro);border-color:#CFE6F1}
.spend-c h3{font-size:16px;font-weight:600;margin-bottom:10px}
.spend-big{
  font-size:52px;font-weight:700;letter-spacing:-2.6px;line-height:1;
  margin:8px 0 14px;color:var(--azul-petroleo);font-variant-numeric:tabular-nums;
}
.spend-c p{font-size:13.5px;line-height:1.72;color:var(--texto-suave)}

/* ============ FECHAMENTO ============ */
.close{
  position:relative;overflow:hidden;text-align:center;color:#fff;
  padding:120px 0;
  background:
    radial-gradient(ellipse 60% 60% at 50% 0%, rgba(0,113,198,.4), transparent 62%),
    linear-gradient(180deg,#06283A,#0B3D57);
}
.close h2{
  font-size:clamp(32px,5.6vw,68px);font-weight:700;letter-spacing:-3px;
  line-height:1.02;max-width:900px;margin:0 auto;
}
.close h2 em{font-style:normal;color:var(--ciano)}
.close p{margin:26px auto 0;max-width:540px;font-size:15px;line-height:1.78;color:rgba(255,255,255,.72)}
/* inline-flex: o fundo acompanha só os cards, sem sobra nas laterais */
.close-stats{
  display:inline-flex;justify-content:center;flex-wrap:wrap;gap:1px;
  margin-top:52px;background:rgba(143,210,255,.2);
  border-radius:14px;overflow:hidden;
}
.cs{background:#08304a;padding:24px 34px;min-width:148px}
.cs b{display:block;font-size:34px;font-weight:700;letter-spacing:-1.8px;font-variant-numeric:tabular-nums}
.cs span{display:block;font-size:9.5px;letter-spacing:1.7px;text-transform:uppercase;color:var(--ciano);font-weight:700;margin-top:8px}

.footer{background:#041B28;color:#fff;padding:34px 0}
.footer-inner{display:flex;justify-content:space-between;gap:20px;font-size:12px;color:rgba(255,255,255,.5);flex-wrap:wrap}
.footer strong{color:#fff}

/* ============ RESPONSIVO ============ */
@media(max-width:980px){
  .odo-grid,.ch-grid{grid-template-columns:repeat(2,1fr)}
  .inv,.spend,.mats{grid-template-columns:1fr}
  .mats-hero{grid-template-columns:1fr}
  .mat-hero{padding:36px 30px}
  .stage{padding:110px 0 100px}
  .stage-open{margin-bottom:76px}
  .beat{grid-template-columns:1fr;gap:14px;padding:42px 0}
  .ratio{margin-top:72px;padding-top:52px}
  .reach{grid-template-columns:1fr;gap:24px}
  .tl-steps{grid-template-columns:repeat(2,1fr);gap:26px}
  .tl-track{display:none}
  .tl-step:before{display:none}
  .tl-step{padding-top:0;border-left:2px solid rgba(143,210,255,.3);padding-left:18px}
}
@media(max-width:640px){
  .shell,.narrow{width:min(1180px,calc(100% - 40px))}
  .hero{min-height:auto;padding:88px 0 24px;flex-direction:column;justify-content:flex-start}
  .big-num{letter-spacing:-6px}
  .grid58{grid-template-columns:repeat(10,1fr);gap:5px}
  .odo-grid,.ch-grid,.tl-steps,.mats{grid-template-columns:1fr}
  .dark,.light{padding:64px 0}
  .stage{padding:78px 0 70px}
  .ratio-line{gap:14px}
  .ratio-arrow{width:100%;max-width:180px}
  .close{padding:80px 0}
  .cs{padding:18px 22px;min-width:120px}
  .reach{padding:28px}
  .hud-phase{display:none}
  .footer-inner{flex-direction:column}
}

@media(prefers-reduced-motion:reduce){
  html{scroll-behavior:auto}
  .rv{opacity:1;transform:none;transition:none}
  .cell,.dot,.tl-step:before{transform:none !important;transition:none}
  .tl-prog,.odo:before,.inv-c:after,.ratio-arrow{transition:none}
  .ratio-arrow{transform:scaleX(1)}
  .tl-wrap .tl-prog{width:100%}
  .odo:before{width:100%}
  .inv-c:after{transform:scaleX(1)}
  .kicker,.big-side h1 .hl:after{animation:none;opacity:1;transform:none}
  #stars{display:none}
  *{animation-duration:.01ms !important}
}

@media print{
  body,.dark,.close{background:#fff !important;color:#000 !important}
  .hud,#stars{display:none}
  .rv{opacity:1;transform:none}
}

/* ============ BEM-VINDO ============ */
#welcome-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: var(--azul-abissal);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 1s cubic-bezier(.22,1,.36,1), visibility 1s;
}
#welcome-overlay.hide {
  opacity: 0;
  visibility: hidden;
}
.welcome-text {
  font-size: clamp(38px, 6vw, 64px);
  font-weight: 700;
  letter-spacing: -2px;
  color: #fff;
  opacity: 0;
  transform: translateY(20px);
  animation: welcomeUp 1s cubic-bezier(.22,1,.36,1) 0.3s forwards;
}
.welcome-text span {
  color: var(--ciano);
}
@keyframes welcomeUp {
  to { opacity: 1; transform: none; }
}

</style>
</head>
<body>

<!-- ============ BEM-VINDO ============ -->
<div id="welcome-overlay">
  <div class="welcome-text">Bem-vindo<span>.</span></div>
</div>


<!-- ============ HUD ============ -->
<div class="hud" id="hud" aria-hidden="true">
  <div class="shell">
    <div class="hud-inner">
      <div class="hud-day">Dia <b id="hudDay">1</b> <span style="opacity:.4">/ 50</span></div>
      <div class="hud-bar"><div class="hud-fill" id="hudFill"></div></div>
      <div class="hud-phase" id="hudPhase">Início</div>
    </div>
  </div>
</div>


<!-- ============ HERO ============ -->
<header class="hero">
  <canvas id="stars" aria-hidden="true"></canvas>
  <div class="shell hero-inner">
    <div class="kicker">Lançamento OPA · Siriúba 2 · Ilhabela</div>

    <div class="big-wrap">
      <div class="big">
        <div class="big-num" id="bigNum">0</div>
        <div class="big-cap">dias · 18 mai → 07 jul 2026</div>
      </div>
      <div class="big-side">
        <h1>Um lançamento não é um anúncio. É uma <span class="hl">novela</span>. E essa durou 50 capítulos.</h1>
        <p>Cada quadrado abaixo é um dia. O lançamento levou 20 dias. Os 30 seguintes foram de manutenção, até a casa ter dono.</p>
      </div>
    </div>

    <div class="grid58" id="grid58" role="img" aria-label="Grade de 50 dias, colorida por fase: início, captação, pré-lançamento e lançamento nos 20 primeiros dias; manutenção nos 30 seguintes."></div>
    <div class="grid-cap">
      <span><b>20</b> dias de lançamento</span>
      <span><b>30</b> dias de manutenção</span>
      <span><b>26</b> peças de conteúdo</span>
      <span><b>1</b> comprador certo</span>
    </div>
  </div>
</header>


<!-- ============ JORNADA (ritmo + fases) ============ -->
<section class="dark" data-day="10" data-phase="Lançamento">
  <div class="shell">
    <div class="rv">
      <h2>20 dias de lançamento. 30 de manutenção.</h2>
      <p class="lede">Cada imóvel da OPA é tratado como uma narrativa. Quatro fases nos primeiros 20 dias constroem a história; depois, manutenção até o comprador certo aparecer.</p>
    </div>

    <div class="odo-grid">
      <div class="odo rv" data-d="1">
        <div class="odo-n" data-count="26">0</div>
        <div class="odo-l">Peças de conteúdo</div>
        <div class="odo-d">21 em vídeo, 5 estáticas.</div>
      </div>
      <div class="odo rv" data-d="2">
        <div class="odo-n" data-count="20">0</div>
        <div class="odo-l">Dias de lançamento</div>
        <div class="odo-d">Depois, 30 de manutenção.</div>
      </div>
      <div class="odo rv" data-d="3">
        <div class="odo-n" data-count="49">0</div>
        <div class="odo-l">Fotos profissionais</div>
        <div class="odo-d">Mais drone, tour e página.</div>
      </div>
      <div class="odo rv" data-d="4">
        <div class="odo-n"><span data-count="2" data-prefix="R\$ " data-suffix=" mil">0</span></div>
        <div class="odo-l">Investimento em tráfego</div>
        <div class="odo-d">Total dos 50 dias.</div>
      </div>
    </div>

    <div class="tl-wrap rv" id="tlWrap" style="margin-top:64px">
      <div class="tl-track"><div class="tl-prog"></div></div>
      <div class="tl-steps">

        <div class="tl-step">
          <div class="tl-d">Dia 1 a 5</div>
          <h3>Início</h3>
          <p>A casa entra e a equipe se mexe. Reunião e visita de cada corretor, gravadas na hora.</p>
        </div>

        <div class="tl-step">
          <div class="tl-d">Dia 6 a 12</div>
          <h3>Captação</h3>
          <p>Fotógrafo, drone e câmera de cinema. O making-of vira conteúdo.</p>
        </div>

        <div class="tl-step">
          <div class="tl-d">Dia 13 a 16</div>
          <h3>Pré-lançamento</h3>
          <p>Página exclusiva, tour virtual e kit de parceria no ar antes do tráfego chegar.</p>
        </div>

        <div class="tl-step">
          <div class="tl-d">Dia 17 a 20</div>
          <h3>Lançamento</h3>
          <p>Reels, carrosséis e nativos saem nos perfis da OPA, do Marco e dos parceiros.</p>
        </div>

        <div class="tl-step">
          <div class="tl-d">Dia 21 a 50</div>
          <h3>Manutenção</h3>
          <p>Remarketing e visibilidade constante, até o comprador certo aparecer.</p>
        </div>

      </div>
    </div>
  </div>
</section>


<!-- ============ INVENTÁRIO (enxame + peças) ============ -->
<section class="light" data-day="20" data-phase="Lançamento">
  <div class="shell">
    <div class="rv">
      <h2>26 peças que não existiam em 18 de maio.</h2>
      <p class="lede">Tudo se apoiou numa base de 49 fotos, drone, página exclusiva e tour virtual.</p>
    </div>

    <div class="inv" style="margin-top:40px">
      <div class="inv-c rv" data-d="1">
        <h3>Vídeo <b data-count="21">0</b></h3>
        <ul class="inv-l">
          <li>Reels audiovisuais <strong>7</strong></li>
          <li>Reels nativos <strong>9</strong></li>
          <li>Remarketing vídeo <strong>4</strong></li>
          <li>Cinematográfico <strong>1</strong></li>
        </ul>
      </div>
      <div class="inv-c rv" data-d="2">
        <h3>Estático <b data-count="5">0</b></h3>
        <ul class="inv-l">
          <li>Remarketing estático <strong>3</strong></li>
          <li>Carrosséis <strong>2</strong></li>
        </ul>
      </div>
      <div class="inv-c rv base" data-d="3">
        <h3>A base + a rede</h3>
        <ul class="inv-l">
          <li>Fotos profissionais <strong>49</strong></li>
          <li>Página + tour virtual <strong>Sim</strong></li>
          <li>Kit de parceria <strong>Completo</strong></li>
        </ul>
        <p class="inv-note">Fora da contagem de peças, mas foi o kit que qualquer corretor parceiro usou para vender sem produzir nada por conta própria.</p>
      </div>
    </div>

  </div>
</section>


<!-- ============ MATERIAIS ============ -->
<section class="dark" data-day="16" data-phase="Pré-lançamento">
  <div class="shell">
    <div class="rv">
      <h2>O que sustentou o lançamento.</h2>
      <p class="lede">A base de materiais produzida antes de qualquer anúncio entrar no ar.</p>
    </div>

    <div class="mats-hero rv" style="margin-top:44px">
      <div class="mat mat-hero">
        <span class="mat-badge">Principal diferencial</span>
        <span class="mat-hero-n">Tour virtual</span>
        <span class="mat-hero-d">Andar pela casa inteira sem sair de casa. Morando longe, isso influenciou na venda.</span>
      </div>
      <div class="mat mat-hero">
        <span class="mat-badge">Fechou a venda</span>
        <span class="mat-hero-n">Rede de parceiros</span>
        <span class="mat-hero-d">Quem fechou foi o corretor parceiro. A OPA possibilitou a parceria e entregou o material de apoio e a matéria-prima para ele vender.</span>
      </div>
    </div>

    <div class="mats rv" style="margin-top:16px">
      <div class="mat">
        <span class="mat-n">Página exclusiva</span>
        <span class="mat-l">Endereço próprio, só da casa</span>
      </div>
      <div class="mat">
        <span class="mat-n">Vídeo cinematográfico</span>
        <span class="mat-l">Câmera de cinema e drone</span>
      </div>
      <div class="mat">
        <span class="mat-n">Drive para corretores</span>
        <span class="mat-l">Fotos, vídeos e kit de parceria</span>
      </div>
    </div>
  </div>
</section>


<!-- ============ DISTRIBUIÇÃO ============ -->
<section class="dark" data-day="30" data-phase="Manutenção">
  <div class="shell">
    <div class="rv">
      <h2 style="text-align:center;max-width:none">Produzir é metade. Fazer chegar é a outra.</h2>
    </div>

    <div class="ch-grid">
      <article class="ch rv" data-d="1">
        <div class="ch-n">Instagram</div>
        <strong>Reels e carrossel</strong>
        <p>OPA, Marco e corretores parceiros.</p>
      </article>
      <article class="ch rv" data-d="2">
        <div class="ch-n">Facebook</div>
        <strong>Reels</strong>
        <p>Público de 45 a 65+ anos.</p>
      </article>
      <article class="ch rv" data-d="3">
        <div class="ch-n">TikTok</div>
        <strong>Descoberta</strong>
        <p>Quem ainda não conhecia a OPA.</p>
      </article>
      <article class="ch rv" data-d="4">
        <div class="ch-n">Google Ads</div>
        <strong>Intenção ativa</strong>
        <p>Quem já procurava casa em Ilhabela.</p>
      </article>
    </div>

    <div class="reach rv">
      <div class="reach-n"><span data-count="1" data-suffix=",2 mi">0</span>
        <small>Views por trimestre</small>
      </div>
      <p>A casa entrou numa rede que soma <b>mais de 1,2 milhão de visualizações por trimestre</b>, cerca de <b>13 mil pessoas por dia</b>.</p>
    </div>
  </div>
</section>


<!-- ============ TRÁFEGO ============ -->
<section class="stage" data-day="40" data-phase="Manutenção">
  <div class="shell">

    <div class="stage-open rv">
      <h2 class="stage-h">Dois mil reais.<br>Ajustados <em>todo dia</em>.</h2>
      <p class="stage-lede">A verba foi pequena de propósito. O que fez diferença não foi quanto, foi o quanto se mexeu nela: palavra-chave e métrica revistas todo dia, por 50 dias seguidos.</p>
    </div>

    <div class="beat rv">
      <div class="beat-mark">01</div>
      <div class="beat-body">
        <div class="beat-when">Dia 1 ao 30 · Google Ads</div>
        <h3>Busca ativa, otimizada diariamente</h3>
        <p>Campanha para alcançar quem já procurava imóvel em Ilhabela, com palavras-chave e métricas revistas todo dia.</p>
        <div class="beat-tags">
          <span class="tag">Otimização diária</span>
          <span class="tag">R\$ 2.000 no total</span>
        </div>
      </div>
    </div>

    <div class="beat rv">
      <div class="beat-mark">02</div>
      <div class="beat-body">
        <div class="beat-when">Após 20 a 30 dias · Rede Google</div>
        <h3>Remarketing para quem já demonstrou interesse</h3>
        <p>Sete criativos para reencontrar quem visitou a página exclusiva ou assistiu ao conteúdo e não avançou de primeira.</p>
        <div class="beat-tags">
          <span class="tag">3 estáticos</span>
          <span class="tag">4 em vídeo</span>
        </div>
      </div>
    </div>

  </div>
</section>


<!-- ============ FECHAMENTO ============ -->
<section class="close" data-day="50" data-phase="Vendido">
  <div class="shell">
    <h2 class="rv">50 dias depois,<br>a casa tinha <em>dono</em>.</h2>
    <p class="rv">Este é o padrão de lançamento da OPA: produção completa, narrativa contínua e uma rede que distribui. O Siriúba 2 foi o capítulo mais recente.</p>
    <div class="close-stats rv">
      <div class="cs"><b>26</b><span>Peças</span></div>
      <div class="cs"><b>50</b><span>Dias</span></div>
      <div class="cs"><b>4</b><span>Plataformas</span></div>
      <div class="cs"><b>1,2 mi</b><span>Views/trimestre</span></div>
      <div class="cs"><b>R\$ 2 mil</b><span>Tráfego total</span></div>
    </div>
  </div>
</section>


<script>
(function(){
  var reduz = matchMedia('(prefers-reduced-motion: reduce)').matches;

  
  /* ---------- Bem-vindo ---------- */
  setTimeout(function(){
    var w = document.getElementById('welcome-overlay');
    if(w) w.classList.add('hide');
  }, 1800);

  /* ---------- Fases (dia inicial, dia final, classe) ---------- */
  var FASES = [
    {ini:1,  fim:5,  c:'f1', nome:'Início'},
    {ini:6,  fim:12, c:'f2', nome:'Captação'},
    {ini:13, fim:16, c:'f3', nome:'Pré-lançamento'},
    {ini:17, fim:20, c:'f4', nome:'Lançamento'},
    {ini:21, fim:50, c:'f5', nome:'Manutenção'}
  ];
  function faseDoDia(d){
    for (var i=0;i<FASES.length;i++) if (d>=FASES[i].ini && d<=FASES[i].fim) return FASES[i];
    return FASES[0];
  }

  /* ---------- Grade de 50 dias ---------- */
  var grid = document.getElementById('grid58');
  var celulas = [];
  for (var d=1; d<=50; d++){
    var f = faseDoDia(d);
    var c = document.createElement('div');
    c.className = 'cell ' + f.c + (d === 50 ? ' venda' : '');
    c.title = d === 50 ? 'Dia 50: Vendido' : 'Dia ' + d + ': ' + f.nome;
    grid.appendChild(c);
    celulas.push(c);
  }
  if (reduz) {
    celulas.forEach(function(c){ c.classList.add('on'); });
  } else {
    celulas.forEach(function(c,i){
      setTimeout(function(){ c.classList.add('on'); }, 620 + i*26);
    });
  }

  /* ---------- Número gigante ---------- */
  var big = document.getElementById('bigNum');
  if (reduz) { big.textContent = '50'; }
  else {
    var t0=null, dur=2100;
    requestAnimationFrame(function passo(t){
      if(!t0) t0=t;
      var p = Math.min((t-t0)/dur,1);
      big.textContent = Math.round((1-Math.pow(1-p,4))*50);
      if(p<1) requestAnimationFrame(passo);
    });
  }

  /* ---------- Contadores ---------- */
  function conta(node){
    if (node.dataset.done) return;
    node.dataset.done = '1';
    var alvo = parseFloat(node.dataset.count),
        suf  = node.dataset.suffix || '',
        pre  = node.dataset.prefix || '';
    if (reduz) { node.textContent = pre + alvo + suf; return; }
    var t0=null, dur=1400;
    requestAnimationFrame(function passo(t){
      if(!t0) t0=t;
      var p = Math.min((t-t0)/dur,1);
      node.textContent = pre + Math.round((1-Math.pow(1-p,4))*alvo) + (p===1 ? suf : '');
      if(p<1) requestAnimationFrame(passo);
    });
  }

  /* ---------- Observer geral ---------- */
  var obs = new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(!e.isIntersecting) return;
      var el = e.target;
      el.classList.add('in');

      if (el.dataset.count) conta(el);
      el.querySelectorAll && el.querySelectorAll('[data-count]').forEach(conta);
      obs.unobserve(el);
    });
  }, {threshold:.18, rootMargin:'0px 0px -50px 0px'});

  document.querySelectorAll('.rv, .odo, .inv-c, .tl-step, .ratio').forEach(function(n){ obs.observe(n); });

  /* ---------- HUD: dia atual conforme o scroll ---------- */
  var hud = document.getElementById('hud'),
      hudDay = document.getElementById('hudDay'),
      hudFill = document.getElementById('hudFill'),
      hudPhase = document.getElementById('hudPhase'),
      marcos = [].slice.call(document.querySelectorAll('[data-day]')),
      heroH = document.querySelector('.hero').offsetHeight,
      ticking = false;

  function atualizaHud(){
    var y = window.scrollY;
    hud.classList.toggle('on', y > heroH * 0.72);

    var dia = 1, fase = 'Início';
    for (var i=0;i<marcos.length;i++){
      var r = marcos[i].getBoundingClientRect();
      if (r.top <= innerHeight * 0.55) {
        dia = +marcos[i].dataset.day;
        fase = marcos[i].dataset.phase;
      }
    }
    hudDay.textContent = dia;
    hudPhase.textContent = fase;
    hudFill.style.width = (dia/50*100) + '%';
    ticking = false;
  }

  addEventListener('scroll', function(){
    if (!ticking) { requestAnimationFrame(atualizaHud); ticking = true; }
  }, {passive:true});
  atualizaHud();

  /* ---------- Constelação do hero ---------- */
  var cv = document.getElementById('stars');
  if (cv && !reduz) {
    var ctx = cv.getContext('2d'), pts = [], raf;
    function dim(){
      var h = document.querySelector('.hero');
      cv.width = h.offsetWidth; cv.height = h.offsetHeight;
      var n = Math.min(64, Math.floor(cv.width/26));
      pts = [];
      for (var i=0;i<n;i++) pts.push({
        x: Math.random()*cv.width,
        y: Math.random()*cv.height,
        vx: (Math.random()-.5)*.22,
        vy: (Math.random()-.5)*.22,
        r: Math.random()*1.5+.6
      });
    }
    function loop(){
      ctx.clearRect(0,0,cv.width,cv.height);
      pts.forEach(function(p){
        p.x += p.vx; p.y += p.vy;
        if (p.x<0||p.x>cv.width) p.vx*=-1;
        if (p.y<0||p.y>cv.height) p.vy*=-1;
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,6.28);
        ctx.fillStyle = 'rgba(143,210,255,.55)';
        ctx.fill();
      });
      for (var i=0;i<pts.length;i++)
        for (var j=i+1;j<pts.length;j++){
          var dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y,
              dist=Math.sqrt(dx*dx+dy*dy);
          if (dist<128){
            ctx.beginPath();
            ctx.moveTo(pts[i].x,pts[i].y);
            ctx.lineTo(pts[j].x,pts[j].y);
            ctx.strokeStyle = 'rgba(143,210,255,' + (.13*(1-dist/128)) + ')';
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      raf = requestAnimationFrame(loop);
    }
    dim(); loop();
    addEventListener('resize', dim);
    // pausa fora da tela
    new IntersectionObserver(function(es){
      es.forEach(function(e){
        if (e.isIntersecting) { if(!raf) loop(); }
        else { cancelAnimationFrame(raf); raf = null; }
      });
    }).observe(cv);
  }
})();
</script>

</body>
</html>
`;

export async function GET() {
  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}
