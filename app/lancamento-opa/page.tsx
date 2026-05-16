import Image from "next/image";
import FadeIn from "./_components/FadeIn";
import ApplyCTAButtons from "./_components/ApplyCTAButtons";
import ScrollytellingImpact from "./_components/ui/ScrollytellingImpact";
import {
  Eye,
  Target,
  Zap,
  Smartphone,
  FileText,
  MousePointerClick,
  Search,
  Sparkles,
  Users2,
  Presentation,
  ShieldCheck,
  TrendingUp,
  Clock,
  Lock,
} from "lucide-react";
import {
  CinematicVideoVisual,
  VirtualTourVisual,
  ExclusiveSiteVisual,
  SegmentedCampaignVisual,
} from "./_components/ui/PremiumVisuals";

export default function LancamentoOpaPage() {
  return (
    <main className="min-h-screen relative selection:bg-[#2F5D82]/30 overflow-x-hidden">
      <div className="absolute top-0 right-[35%] w-px h-full bg-[#D9D9D9] opacity-[0.15] hidden lg:block z-0 pointer-events-none" />

      {/* HERO */}
      <section className="relative min-h-[100svh] w-full flex items-center pt-[200px] pb-[200px] overflow-hidden">
        <Image
          src="/assets/images/ilhabela-foto-de-cima-drone-opa-ilhabela.jpg"
          alt="Vista aérea de Ilhabela"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#0F2A44]/35" />

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-16 xl:px-24 flex flex-col items-start justify-center text-white">
          <FadeIn className="max-w-[1000px]">
            <h2 className="font-sans text-[38px] md:text-[44px] leading-[1.1] font-extrabold tracking-tight text-white drop-shadow-md break-words sm:break-normal hyphens-auto">
              Seu imóvel ou empreendimento{" "}<br className="hidden xl:block" />
              precisa mais do que aparecer.<br />
              <span className="opacity-95 italic font-light">Precisa ser lançado da forma certa.</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.2} className="max-w-2xl">
            <p className="mt-10 text-[18px] tracking-wide font-normal leading-[1.8] opacity-100 drop-shadow-sm">
              Anunciar não é lançar. Divulgar não é posicionar. Expor imóveis e empreendimentos de alto padrão sem estratégia não acelera a venda.{" "}<br className="hidden md:block" />
              Desgasta, perde tração, não vende.
            </p>
          </FadeIn>

          <FadeIn delay={0.4} className="mt-16 pointer-events-auto">
            <a href="#metodo" className="group inline-flex items-center justify-center bg-[#2F5D82] text-white text-[13px] uppercase tracking-[0.3em] px-10 py-5 rounded-full hover:bg-[#0F2A44] transition-all duration-500 shadow-xl">
              Quero entender como funciona
              <span className="ml-3 transform transition-transform group-hover:translate-x-1">→</span>
            </a>
          </FadeIn>
        </div>
      </section>

      {/* O PROBLEMA */}
      <section id="problema" className="py-[140px] bg-white px-6 w-full relative z-10 border-b border-[#D9D9D9]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <h3 className="text-xs uppercase tracking-widest font-extrabold mb-4 text-[#2F5D82]">O Problema</h3>
              <h2 className="font-sans text-3xl md:text-5xl text-[#0F2A44] leading-[1.1] mb-8 font-bold">
                Veja o que normalmente é feito com imóveis.
              </h2>
              <p className="text-[#2B2B2B]/90 font-normal text-base leading-relaxed max-w-md">
                Esse é o processo padrão. E ele funciona para imóvel comum, em mercado de volume. Não para um imóvel de alto padrão como os que trabalhamos em Ilhabela.
                <br /><br />
                Seu imóvel não está sem vender por falta de divulgação. Ele apenas nunca foi apresentado ao mercado da forma correta. O comprador qualificado não age por impulso. Ele pesquisa, compara e precisa sentir o estilo de vida antes de agendar visita.
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: "Foto de celular", icon: <Smartphone size={14} /> },
                  { title: "Descrição genérica", icon: <FileText size={14} /> },
                  { title: "Preço jogado no portal", icon: <MousePointerClick size={14} /> },
                  { title: "Espera", icon: <Clock size={14} /> },
                ].map((item, i) => (
                  <div key={i} className="p-8 bg-white border border-[#F2F2F2] hover:border-[#2F5D82]/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.03)] transition-all duration-700 group rounded-3xl">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-10 h-10 rounded-full bg-[#F7F6F3] flex items-center justify-center text-[#2F5D82] opacity-40 group-hover:opacity-100 group-hover:bg-[#2F5D82]/10 transition-all duration-500">
                        {item.icon}
                      </div>
                      <span className="text-[10px] uppercase tracking-widest font-bold text-[#2F5D82] opacity-30 group-hover:opacity-60">
                        0{i + 1}
                      </span>
                    </div>
                    <h4 className="text-[17px] font-bold text-[#0F2A44] mb-3 uppercase tracking-tighter">{item.title}</h4>
                  </div>
                ))}
              </div>
              <div className="mt-12 pt-8 border-t border-[#F2F2F2]">
                <p className="font-semibold tracking-wider uppercase text-[12px] text-[#0F2A44]">
                  O problema não é falta de exposição. É uma exposição errada.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <ScrollytellingImpact />

      {/* O OLHAR */}
      <section id="olhar" className="py-[140px] px-6 w-full max-w-[1200px] mx-auto relative z-10">
        <div className="flex flex-col gap-16 lg:gap-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 lg:gap-24 items-center">
            <div>
              <FadeIn>
                <h3 className="text-xs uppercase tracking-widest font-extrabold mb-4 text-[#2F5D82]">O Olhar</h3>
                <h2 className="font-sans text-3xl md:text-5xl text-[#0F2A44] leading-[1.2] mb-8 font-bold">
                  Há 20 anos lendo o que o mercado não enxerga.
                </h2>
              </FadeIn>

              <FadeIn delay={0.2} className="space-y-6 text-[#2B2B2B]/90 font-normal text-base leading-relaxed">
                <p className="text-lg">A OPA foi construída para resolver o que a divulgação sozinha nunca resolve.</p>
                <p>Reunimos arquitetura, mercado imobiliário e conhecimento profundo de Ilhabela em um único processo. Não lemos um imóvel somente como corretores. Lemos como quem conhece cada bairro, cada encosta, cada orientação solar da ilha, e sabe exatamente o que aquilo vale para o comprador certo.</p>
              </FadeIn>
            </div>

            <FadeIn delay={0.3} className="relative aspect-[16/10] lg:aspect-square w-full rounded-[32px] border border-[#D9D9D9] p-3 bg-white shadow-sm overflow-hidden">
              <Image
                src="/assets/images/ilhabela-foto-de-cima-drone-opa-ilhabela.jpg"
                alt="Sobre a OPA Imóveis"
                fill
                className="object-cover rounded-[24px]"
                priority
              />
            </FadeIn>
          </div>

          <div className="w-full">
            <FadeIn>
              <p className="tracking-wider uppercase text-[12px] text-[#0F2A44] font-extrabold mb-10 flex items-center gap-4">
                <span className="w-12 h-px bg-[#0F2A44]/20" />
                Nosso trabalho começa antes da divulgação
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { title: "Leitura técnica do ativo", icon: <Search size={20} /> },
                { title: "Vocação e potencial oculto", icon: <Sparkles size={20} /> },
                { title: "Público ideal para aquela propriedade", icon: <Users2 size={20} /> },
                { title: "Narrativa correta", icon: <Presentation size={20} /> },
                { title: "Estratégia comercial", icon: <TrendingUp size={20} /> },
              ].map((item, i) => (
                <FadeIn key={i} delay={0.1 * i} className="group p-6 bg-white rounded-[24px] border border-[#F2F2F2] hover:border-[#2F5D82]/30 hover:shadow-[0_30px_60px_rgba(0,0,0,0.03)] transition-all duration-700 flex flex-col items-start justify-between min-h-[160px]">
                  <div className="w-12 h-12 rounded-2xl bg-[#F7F6F3] flex items-center justify-center text-[#2F5D82] mb-6 group-hover:bg-[#2F5D82] group-hover:text-white group-hover:scale-110 transition-all duration-700">
                    {item.icon}
                  </div>
                  <h4 className="text-[12px] font-bold uppercase tracking-widest text-[#0F2A44] leading-relaxed">{item.title}</h4>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* O MÉTODO */}
      <section id="metodo" className="py-[140px] bg-white border-y border-[#D9D9D9] px-6 w-full relative z-10">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn className="text-center mb-20 max-w-[700px] mx-auto">
            <h3 className="text-xs uppercase tracking-[0.3em] font-extrabold mb-4 text-[#2F5D82]">O Método</h3>
            <h2 className="font-sans text-4xl text-[#0F2A44] leading-[1.2] mb-6 font-bold">O Lançamento OPA</h2>
            <p className="font-light text-base text-[#2B2B2B]/80 leading-relaxed">
              Não trabalhamos com divulgação. Trabalhamos com posicionamento de ativos. Revelamos atributos que o mercado ignorou. Construímos a narrativa certa.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {[
              { letter: "O", title: "Olhar", icon: <Eye size={20} />, desc: "Antes de qualquer ação, o ativo é interpretado. Arquitetura, orientação solar, vocação do terreno, comportamento do mercado local, perfil real do comprador." },
              { letter: "P", title: "Posicionamento", icon: <Target size={20} />, desc: "Com a interpretação feita, definimos qual história esse imóvel conta, para qual perfil e em qual canal esse encontro acontece." },
              { letter: "A", title: "Ação", icon: <Zap size={20} />, desc: "O lançamento acontece em frentes simultâneas, com acompanhamento constante e relatórios quinzenais." },
            ].map((item, i) => (
              <FadeIn key={i} delay={0.1 * (i + 1)} className="bg-white p-10 lg:p-12 border border-[#F2F2F2] hover:border-[#2F5D82]/20 hover:shadow-[0_30px_60px_rgba(0,0,0,0.04)] transition-all duration-700 group rounded-[32px]">
                <div className="flex justify-between items-start mb-10">
                  <div className="text-[64px] font-sans text-[#0F2A44] font-black leading-none tracking-tighter opacity-10 group-hover:opacity-100 group-hover:text-[#2F5D82] transition-all duration-700">
                    {item.letter}
                  </div>
                  <div className="w-12 h-12 rounded-full border border-[#D9D9D9] flex items-center justify-center text-[#0F2A44] opacity-20 group-hover:opacity-100 group-hover:border-[#2F5D82]/30 group-hover:bg-[#2F5D82]/5 transition-all duration-700">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-[13px] leading-tight font-extrabold uppercase tracking-[0.3em] text-[#0F2A44] mb-4">{item.title}</h3>
                <p className="font-light text-[#2B2B2B]/60 leading-relaxed text-[15px]">{item.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACTO REAL */}
      <section className="py-[180px] bg-[#0F2A44] text-white px-6 w-full relative z-10 border-b border-white/10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2F5D82]/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#2F5D82]/5 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-16 lg:gap-32 items-start">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <FadeIn>
                <h3 className="text-xs uppercase tracking-widest font-extrabold mb-8 text-[#2F5D82] flex items-center gap-3">
                  <span className="w-8 h-px bg-[#2F5D82]" />
                  Impacto Real
                </h3>
                <h2 className="font-sans text-4xl md:text-6xl leading-[1.1] font-bold max-w-[500px] tracking-tight">
                  O que muda quando um imóvel é lançado da forma certa.
                </h2>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
              {[
                { title: "Segurança de precificação", desc: "O ativo chega ao mercado no preço certo, para o comprador certo.", icon: <ShieldCheck size={24} className="text-[#2F5D82]" /> },
                { title: "Percepção de valor real", desc: "Imóveis chegam ao comprador já posicionados como produto. O desejo está construído antes da visita.", icon: <TrendingUp size={24} className="text-[#2F5D82]" /> },
                { title: "Redução de tempo no mercado", desc: "Comprador qualificado não precisa ser convencido do valor. Isso encurta o ciclo de negociação.", icon: <Clock size={24} className="text-[#2F5D82]" /> },
                { title: "Liquidez sem exposição desnecessária", desc: "O proprietário não abre o ativo para curiosos. Apenas compradores com intenção compatível chegam ao imóvel.", icon: <Lock size={24} className="text-[#2F5D82]" /> },
              ].map((item, i) => (
                <FadeIn key={i} delay={0.1 * i} className="group relative">
                  <div className="h-full bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-[40px] hover:bg-white/[0.08] hover:border-[#2F5D82]/30 transition-all duration-700 hover:-translate-y-2">
                    <div className="mb-8 w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#2F5D82]/10 transition-all duration-700">
                      {item.icon}
                    </div>
                    <h3 className="text-[15px] tracking-widest uppercase font-bold mb-5 text-[#F7F6F3] group-hover:text-white transition-colors">{item.title}</h3>
                    <p className="font-light text-white/50 leading-relaxed text-[16px] group-hover:text-white/80 transition-colors">{item.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DISTRIBUIÇÃO */}
      <section className="py-[160px] bg-[#F7F6F3] px-6 w-full relative z-10 border-b border-[#D9D9D9]">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn className="text-center mb-[100px] max-w-[700px] mx-auto">
            <h3 className="text-xs uppercase tracking-[0.3em] font-extrabold mb-4 text-[#2F5D82]">Distribuição</h3>
            <h2 className="font-sans text-3xl md:text-5xl text-[#0F2A44] leading-[1.2] font-bold">Como isso chega ao comprador</h2>
          </FadeIn>

          <div className="space-y-8 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FadeIn className="bg-white p-8 md:p-10 rounded-[40px] border border-[#F2F2F2] flex flex-col shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-[18px] md:text-[20px] uppercase tracking-[0.15em] font-bold text-[#0F2A44] mb-4 border-b border-[#D9D9D9] pb-3 inline-block self-start">Vídeo cinematográfico</h3>
                <p className="text-[16px] md:text-[17px] font-normal text-[#2B2B2B]/90 leading-relaxed mb-8">
                  Narrativa que desperta desejo antes da visita e cria convicção em quem já está considerando.
                </p>
                <div className="mt-auto relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-[#D9D9D9] p-1 bg-[#0F2A44] shadow-sm">
                  <CinematicVideoVisual />
                </div>
              </FadeIn>

              <FadeIn className="bg-white p-8 md:p-10 rounded-[40px] border border-[#F2F2F2] flex flex-col shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-[18px] md:text-[20px] uppercase tracking-[0.15em] font-bold text-[#0F2A44] mb-4 border-b border-[#D9D9D9] pb-3 inline-block self-start">Tour virtual</h3>
                <p className="text-[16px] md:text-[17px] font-normal text-[#2B2B2B]/90 leading-relaxed mb-8">
                  O comprador percorre cada cômodo antes de agendar visita presencial. Quem chega, chega para comprar.
                </p>
                <div className="mt-auto relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-[#D9D9D9] p-1 bg-[#F7F6F3] shadow-sm">
                  <VirtualTourVisual />
                </div>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FadeIn className="bg-white p-8 md:p-10 rounded-[40px] border border-[#F2F2F2] flex flex-col shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-[18px] md:text-[20px] uppercase tracking-[0.15em] font-bold text-[#0F2A44] mb-4 border-b border-[#D9D9D9] pb-3 inline-block self-start">Site exclusivo</h3>
                <p className="text-[16px] md:text-[17px] font-normal text-[#2B2B2B]/90 leading-relaxed mb-8">
                  Um endereço digital dedicado, com narrativa completa, à altura do que está sendo oferecido.
                </p>
                <div className="mt-auto relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-[#D9D9D9] p-1 bg-white shadow-sm">
                  <ExclusiveSiteVisual />
                </div>
              </FadeIn>

              <FadeIn className="bg-white p-8 md:p-10 rounded-[40px] border border-[#F2F2F2] flex flex-col shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-[18px] md:text-[20px] uppercase tracking-[0.15em] font-bold text-[#0F2A44] mb-4 border-b border-[#D9D9D9] pb-3 inline-block self-start">Campanha segmentada</h3>
                <p className="text-[16px] md:text-[17px] font-normal text-[#2B2B2B]/90 leading-relaxed mb-8">
                  Distribuição paga para o perfil certo de renda e intenção de compra. Onde o comprador está, nós aparecemos.
                </p>
                <div className="mt-auto relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-[#D9D9D9] p-1 bg-[#F7F6F3] shadow-sm">
                  <SegmentedCampaignVisual />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="apply" className="py-[160px] md:py-[200px] bg-[#0F2A44] w-full text-center text-white relative z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#2F5D82]/20 blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-[1000px] mx-auto relative z-10 px-6">
          <FadeIn>
            <div className="flex items-center justify-center gap-6 mb-12">
              <span className="w-16 h-px bg-gradient-to-r from-transparent to-[#2F5D82]" />
              <span className="text-[11px] md:text-[13px] uppercase tracking-[0.4em] font-extrabold text-[#2F5D82]">O Último Passo</span>
              <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#2F5D82]" />
            </div>

            <h2 className="font-sans text-4xl md:text-5xl lg:text-[72px] text-white leading-[1.05] mb-12 font-bold tracking-tighter drop-shadow-lg">
              Se o imóvel não vende, o problema não é o imóvel.
            </h2>
          </FadeIn>

          <FadeIn delay={0.4} className="flex flex-col items-center gap-6">
            <ApplyCTAButtons />

            <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mt-6 flex items-center justify-center gap-2 font-medium">
              <Lock size={12} className="text-[#2F5D82]" /> Confidencialidade Absoluta em Análises Pretéritas
            </p>
          </FadeIn>
        </div>
      </section>

      <footer className="bg-[#0A1D30] py-24 border-t border-white/5 text-white relative z-10">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="pt-8 flex justify-center">
            <p className="text-[10px] text-white/20 uppercase tracking-[0.3em] text-center">
              © {new Date().getFullYear()} OPA Ilhabela. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
