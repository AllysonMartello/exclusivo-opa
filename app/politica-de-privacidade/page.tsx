import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Política de Privacidade | OPA Imóveis Ilhabela",
  description:
    "Como a OPA Imóveis Ilhabela coleta, usa e protege os seus dados ao navegar pelo nosso site de imóveis exclusivos.",
  path: "/politica-de-privacidade",
});

export default function PoliticaDePrivacidadePage() {
  return (
    <main className="min-h-screen bg-bg-main text-text-main">
      <div className="max-w-3xl mx-auto px-6 py-20 md:py-28">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-text-sec hover:text-white text-sm mb-10 transition-colors"
        >
          <span>←</span> Voltar para o início
        </Link>

        <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
          Política de Privacidade
        </h1>
        <p className="text-text-sec text-sm mb-12">
          Última atualização: 16 de maio de 2026
        </p>

        <div className="space-y-10 text-text-sec leading-relaxed">
          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">Nosso site</h2>
            <p>
              Este site é o <strong className="text-white">Exclusivo OPA Ilhabela</strong>,
              acessível em{" "}
              <a
                href="https://exclusivo.opailhabela.com.br"
                className="text-secondary hover:underline"
              >
                https://exclusivo.opailhabela.com.br
              </a>
              . Ele reúne nossos lançamentos e imóveis exclusivos em Ilhabela. O site
              institucional principal da OPA Imóveis está em{" "}
              <a
                href="https://opailhabela.com.br"
                target="_blank"
                rel="noopener"
                className="text-secondary hover:underline"
              >
                opailhabela.com.br
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">
              Coleta de dados
            </h2>
            <p>
              Quando os visitantes nos enviam dados através dos formulários contidos em nosso
              site (formulários de contato, diagnóstico de imóvel, aplicação de lançamento),
              coletamos os dados informados — nome, telefone/WhatsApp, e-mail, cidade e
              respostas das perguntas — além do endereço de IP, para nos auxiliar na
              detecção de spam.
            </p>
            <p className="mt-3">
              Estes dados são enviados diretamente para a equipe da OPA Imóveis Ilhabela por
              e-mail. Não armazenamos os dados dos formulários em banco de dados próprio.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">Cookies</h2>
            <p>
              Ao acessar este site, um cookie temporário será criado para determinar se seu
              navegador aceita cookies. Ele não contém dados pessoais e será descartado
              quando você fechar seu navegador.
            </p>
            <p className="mt-3">
              Também utilizamos cookies para registrar a sua decisão sobre o aviso de
              cookies (LGPD), para preservar o idioma escolhido (português ou inglês) em
              algumas landings e para permitir que ferramentas de análise meçam o seu uso
              do site.
            </p>
            <p className="mt-3">
              Utilizamos as seguintes ferramentas, que podem instalar cookies próprios:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>
                <strong className="text-white">Google Tag Manager</strong> — orquestração
                de tags de medição
              </li>
              <li>
                <strong className="text-white">Google Analytics 4</strong> — análise de
                tráfego e comportamento
              </li>
              <li>
                <strong className="text-white">Google Ads</strong> — mensuração de
                conversões de anúncios
              </li>
              <li>
                <strong className="text-white">Meta Pixel</strong> — mensuração de
                conversões de anúncios no Facebook e Instagram
              </li>
              <li>
                <strong className="text-white">Microsoft Clarity</strong> — gravação de
                sessões e mapas de calor para entender a experiência do visitante
              </li>
            </ul>
            <p className="mt-3">
              Implementamos o <strong className="text-white">Consent Mode v2</strong> do
              Google: até você aceitar o uso de cookies, as ferramentas acima operam em
              modo restrito e não armazenam identificadores de publicidade.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">
              Imagens e mídia incorporada
            </h2>
            <p>
              Caso você nos envie imagens, evite arquivos que contenham dados de
              localização incorporados (EXIF GPS) — assim você protege os dados de
              localização atrelados às imagens.
            </p>
            <p className="mt-3">
              Nosso site pode incluir conteúdo incorporado de outros sites, como vídeos,
              tours virtuais (Matterport e similares), imagens e artigos. Estes conteúdos
              se comportam exatamente como se você estivesse visitando o site de origem
              — podem coletar dados sobre você, usar cookies próprios, incorporar
              rastreamento adicional de terceiros e monitorar sua interação com o
              conteúdo incorporado, inclusive caso você esteja conectado a uma conta no
              serviço de origem.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">
              Com quem partilhamos seus dados
            </h2>
            <p>
              Os dados dos formulários são utilizados internamente pela equipe da OPA
              Imóveis Ilhabela para retornar o contato e dar andamento ao atendimento.
              Não vendemos nem cedemos seus dados pessoais a terceiros.
            </p>
            <p className="mt-3">
              Compartilhamos informações estatísticas e agregadas (sem identificar
              indivíduos) com nossos parceiros de publicidade e analítica (Google, Meta,
              Microsoft) para mensurar a eficácia das campanhas e melhorar a experiência
              do site.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">
              Quais os seus direitos sobre seus dados
            </h2>
            <p>
              Para os dados pessoais que mantemos sobre você — inclusive quaisquer dados
              que nos tenha fornecido pelos formulários — você pode solicitar acesso,
              correção ou remoção. Isso não inclui dados que somos obrigados a manter
              para propósitos administrativos, legais ou de segurança.
            </p>
            <p className="mt-3">
              Para exercer esses direitos, entre em contato pelo e-mail{" "}
              <a
                href="mailto:contato@opailhabela.com.br"
                className="text-secondary hover:underline"
              >
                contato@opailhabela.com.br
              </a>{" "}
              ou pelo nosso WhatsApp{" "}
              <a
                href="https://wa.me/5512974068058"
                target="_blank"
                rel="noopener"
                className="text-secondary hover:underline"
              >
                +55 (12) 97406-8058
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">
              Alterações nesta política
            </h2>
            <p>
              Podemos atualizar esta política para refletir mudanças nas ferramentas que
              utilizamos ou exigências legais. A data da última atualização sempre estará
              no topo da página.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
