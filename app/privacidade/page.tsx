// site-novo/app/privacidade/page.tsx — Política de Privacidade.
//
// Por que existe:
//   1. LGPD (Lei 13.709/2018) — o Prumo trata dado pessoal sensível (CPF, NIT,
//      histórico contributivo, e às vezes informação de saúde na carta do INSS).
//   2. A Meta EXIGE política de privacidade publicada para aprovar o app no
//      Embedded Signup (o que destrava o Coexistence).
//
// REGRA DESTA PÁGINA: ela descreve o que o produto REALMENTE faz. Cada afirmação
// aqui foi conferida no código. Se o comportamento mudar, esta página muda junto —
// política que promete o que o software não cumpre é pior do que não ter política.
//
// ⚠️ PENDÊNCIA CONHECIDA: os prazos de retenção abaixo são os que o item I6 do
// PENDENCIAS.md ainda precisa implementar (hoje não há rotina de expurgo). Estão
// escritos como compromisso; implemente antes de publicar em produção.

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidade — Prumo",
  description:
    "Como o Prumo trata seus dados: o que coletamos, por que, com quem compartilhamos, por quanto tempo guardamos e como você pede a exclusão.",
  alternates: { canonical: "https://www.oprumoapp.com.br/privacidade" },
};

const ATUALIZACAO = "1º de setembro de 2026";
const EMAIL = "privacidade@oprumoapp.com.br";

export default function Privacidade() {
  return (
    <main className="min-h-screen bg-creme">
      {/* Cabeçalho */}
      <header className="border-b border-linha bg-white px-6 py-5">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 font-display text-lg font-bold text-verde">
            <Logo size={24} /> Prumo
          </Link>
          <Link href="/" className="text-[13.5px] font-semibold text-esmeralda hover:underline">
            ← Voltar ao início
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6 py-14">
        <p className="mb-3 flex items-center gap-2.5 text-[13px] font-semibold uppercase tracking-wide text-esmeralda">
          <span className="h-px w-6 bg-esmeralda" /> Seus dados
        </p>
        <h1 className="font-display text-4xl font-bold leading-tight text-verde sm:text-5xl">
          Política de Privacidade
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-tinta">
          Última atualização: {ATUALIZACAO}
        </p>

        {/* Resumo honesto, antes do texto formal */}
        <div className="mt-9 rounded-2xl border border-linha bg-white p-6">
          <h2 className="font-display text-lg font-bold text-verde">Em resumo, sem juridiquês</h2>
          <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-tinta">
            <Item><b>Nunca pedimos a senha do gov.br</b>, do banco ou de cartão. Se alguém pedir isso em nome do Prumo, é golpe.</Item>
            <Item>Usamos os seus documentos para <b>uma coisa só</b>: analisar o seu caso e montar o seu recurso.</Item>
            <Item><b>Não vendemos</b> os seus dados. Não fazemos publicidade com eles. Não repassamos a quem não faz parte do serviço.</Item>
            <Item>Você pode pedir <b>a qualquer momento</b> para ver, corrigir ou apagar tudo — basta escrever para nós.</Item>
            <Item>O Prumo é uma <b>empresa de tecnologia</b>. Não somos escritório de advocacia, não somos o INSS e não temos vínculo com o governo.</Item>
          </ul>
        </div>

        <Secao n="1" titulo="Quem somos">
          <P>
            O Prumo é uma ferramenta de tecnologia que ajuda pessoas a entenderem negativas de
            benefícios do INSS e a conduzirem seus próprios recursos administrativos.
          </P>
          <P>
            Para os fins da Lei Geral de Proteção de Dados (Lei 13.709/2018), somos o{" "}
            <b>controlador</b> dos dados tratados no aplicativo. Para falar sobre privacidade,
            escreva para <Mail />.
          </P>
        </Secao>

        <Secao n="2" titulo="Que dados coletamos">
          <P>Coletamos apenas o necessário para analisar o seu caso:</P>
          <Tabela
            linhas={[
              ["Seu número de WhatsApp e o nome do perfil", "É por onde a conversa acontece e como te chamamos pelo nome."],
              ["O que você escreve, fala ou envia na conversa", "É o relato do seu caso — inclusive áudios, quando você prefere falar a digitar."],
              ["A carta de indeferimento do INSS", "Dela extraímos o motivo da negativa, o número do benefício (NB), seu nome, CPF, data de nascimento, a data do pedido e a cidade."],
              ["O CNIS (extrato de contribuições)", "Dele extraímos seus vínculos, competências e indicadores — é o que permite conferir carência e tempo de contribuição."],
              ["Dados de pagamento", "Se você contratar o Plano de Ação. O pagamento é processado pelo Mercado Pago; não recebemos nem guardamos o número do seu cartão."],
            ]}
          />
          <Alerta>
            <b>Dado pessoal sensível.</b> A carta do INSS e o CNIS podem conter informação sobre a
            sua saúde (por exemplo, o resultado de uma perícia médica). Tratamos esse dado apenas
            para analisar o seu caso e montar o seu recurso, com o seu consentimento, conforme o
            art. 11, I, da LGPD. Você pode retirar o consentimento quando quiser.
          </Alerta>
          <P>
            <b>O que nunca pedimos:</b> senha do gov.br, senha de banco, dados de cartão de crédito
            ou código de verificação recebido por SMS. O Prumo não acessa a sua conta no Meu INSS.
          </P>
        </Secao>

        <Secao n="3" titulo="Por que usamos esses dados">
          <Tabela
            cabecalho={["Finalidade", "Base legal (LGPD)"]}
            linhas={[
              ["Analisar o seu caso e explicar o motivo da negativa", "Consentimento (art. 7º, I) e, quanto a dado sensível, art. 11, I"],
              ["Gerar o texto do seu recurso administrativo", "Execução do serviço que você contratou (art. 7º, V)"],
              ["Processar o pagamento e liberar o seu acesso", "Execução de contrato (art. 7º, V)"],
              ["Responder você pelo WhatsApp e acompanhar o seu caso", "Execução do serviço (art. 7º, V)"],
              ["Cumprir obrigações legais e fiscais", "Obrigação legal (art. 7º, II)"],
            ]}
          />
          <P>
            <b>Não usamos os seus dados para publicidade</b>, não criamos perfis para vender a
            terceiros e não tomamos decisões automatizadas que produzam efeito jurídico sobre você:
            a análise do Prumo é uma orientação, e quem decide protocolar o recurso é você.
          </P>
        </Secao>

        <Secao n="4" titulo="Com quem compartilhamos">
          <P>
            Não vendemos nem alugamos os seus dados. Compartilhamos apenas com quem é necessário
            para o serviço funcionar:
          </P>
          <Tabela
            cabecalho={["Quem", "Para quê"]}
            linhas={[
              ["Meta (WhatsApp)", "É o canal da conversa. As mensagens passam por lá para chegarem até você."],
              ["Supabase", "Armazena a conversa e os documentos, em servidores na nuvem."],
              ["Mercado Pago", "Processa o pagamento, quando você contrata o Plano de Ação."],
              ["Anthropic (Claude)", "Ajuda a entender mensagens escritas com as suas palavras e a ler o motivo da carta. Usado de forma limitada — a decisão sobre o seu caso é feita por regras, não por IA."],
              ["Serviço de transcrição de áudio", "Converte o seu áudio em texto, quando você manda mensagem de voz."],
              ["Serviço de OCR", "Lê o texto da carta quando você envia uma foto em vez de PDF."],
            ]}
          />
          <P>
            Alguns desses serviços operam fora do Brasil, o que implica transferência internacional
            de dados (art. 33 da LGPD). Escolhemos fornecedores que adotam salvaguardas contratuais
            e técnicas de proteção compatíveis com a legislação brasileira.
          </P>
          <P>
            <b>Se você chegou até nós pelo canal de um escritório de advocacia parceiro:</b> a sua
            análise e os documentos que você enviou são compartilhados com aquele escritório — é
            exatamente para isso que a conversa existe. Cada escritório vê apenas os casos do
            próprio canal. O Prumo não recebe comissão por indicação nem percentual de honorários.
          </P>
        </Secao>

        <Secao n="5" titulo="Por quanto tempo guardamos">
          <Tabela
            cabecalho={["O quê", "Prazo"]}
            linhas={[
              ["Conversa e dados do seu caso", "Até 12 meses após o último contato"],
              ["Documentos enviados (carta, CNIS, fotos)", "Até 12 meses após o último contato"],
              ["Histórico de mensagens", "Até 24 meses"],
              ["Registros de pagamento", "Pelo prazo exigido pela legislação fiscal"],
            ]}
          />
          <P>
            Terminado o prazo, os dados são eliminados. Você pode pedir a exclusão antes disso a
            qualquer momento — veja a seção seguinte.
          </P>
        </Secao>

        <Secao n="6" titulo="Seus direitos">
          <P>A LGPD garante a você o direito de:</P>
          <ul className="mt-3 space-y-2.5 text-[15px] leading-relaxed text-tinta">
            <Item>Saber se tratamos dados seus e <b>acessar</b> esses dados</Item>
            <Item><b>Corrigir</b> dados incompletos ou desatualizados</Item>
            <Item>Pedir a <b>eliminação</b> dos dados tratados com o seu consentimento</Item>
            <Item>Pedir a <b>portabilidade</b> dos seus dados a outro fornecedor</Item>
            <Item><b>Revogar o consentimento</b> a qualquer momento</Item>
            <Item>Saber com quem compartilhamos os seus dados</Item>
            <Item>Reclamar à <b>ANPD</b> (Autoridade Nacional de Proteção de Dados)</Item>
          </ul>
          <div className="mt-5 rounded-2xl border border-linha bg-white p-6">
            <p className="text-[15px] leading-relaxed text-tinta">
              Para exercer qualquer um deles, escreva para <Mail /> ou peça{" "}
              <b>na própria conversa do WhatsApp</b> — é o jeito mais simples. Respondemos em até{" "}
              <b>15 dias</b>.
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-tinta">
              Para apagar tudo agora, use a página{" "}
              <Link href="/excluir-dados" className="font-semibold text-esmeralda hover:underline">
                Apagar meus dados
              </Link>{" "}
              — confirmamos por um código no seu WhatsApp e eliminamos na hora.
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-tinta">
              Você também pode escrever <b>&quot;resetar conversa&quot;</b> no WhatsApp: isso
              apaga na hora a conversa e a análise do seu caso.
            </p>
          </div>
        </Secao>

        <Secao n="7" titulo="Como protegemos">
          <ul className="space-y-2.5 text-[15px] leading-relaxed text-tinta">
            <Item>Conexões cifradas (HTTPS) entre você, o WhatsApp e os nossos servidores</Item>
            <Item>Acesso ao banco de dados restrito ao servidor do aplicativo — não é público</Item>
            <Item>Acesso da equipe protegido por chave, apenas para quem precisa atender</Item>
            <Item>Nenhuma senha sua é pedida, transmitida ou armazenada</Item>
          </ul>
          <P>
            Nenhum sistema é 100% imune. Se acontecer um incidente que possa trazer risco relevante
            a você, comunicaremos você e a ANPD, como manda o art. 48 da LGPD.
          </P>
        </Secao>

        <Secao n="8" titulo="Crianças e adolescentes">
          <P>
            O Prumo é destinado a maiores de 18 anos. Não coletamos intencionalmente dados de
            crianças. Se um caso envolver dados de menor (por exemplo, a certidão de nascimento do
            bebê no salário-maternidade), tratamos essa informação apenas para a finalidade do
            benefício e no melhor interesse da criança, conforme o art. 14 da LGPD.
          </P>
        </Secao>

        <Secao n="9" titulo="Mudanças nesta política">
          <P>
            Se mudarmos esta política, atualizamos a data no topo. Se a mudança for significativa,
            avisamos você pelo WhatsApp antes de ela valer.
          </P>
        </Secao>

        <Secao n="10" titulo="Fale com a gente">
          <P>
            Dúvida, pedido ou reclamação sobre privacidade: <Mail />.
          </P>
          <P>
            Você também pode registrar reclamação diretamente na ANPD, pelo site{" "}
            <a href="https://www.gov.br/anpd" target="_blank" rel="noopener noreferrer" className="font-semibold text-esmeralda hover:underline">
              gov.br/anpd
            </a>.
          </P>
        </Secao>

        {/* Aviso final — o mesmo do rodapé do site, porque é o que mais importa */}
        <div className="mt-12 rounded-2xl border border-linha bg-white p-6 text-[14px] leading-relaxed text-tinta">
          O Prumo é uma ferramenta de tecnologia que ajuda cidadãos a entenderem negativas do INSS e
          a conduzirem seus próprios recursos administrativos. Não somos um escritório de advocacia
          e não prestamos serviços jurídicos. Não temos vínculo com o INSS nem com o governo
          federal. Não pedimos senha do gov.br e não acessamos sua conta.
        </div>
      </div>

      <footer className="border-t border-linha bg-white px-6 py-11 text-[13.5px] text-tinta">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-5">
          <Link href="/" className="flex items-center gap-2.5 font-display text-lg font-bold text-verde">
            <Logo size={24} /> Prumo
          </Link>
          <a href="https://instagram.com/prumoapp" target="_blank" rel="noopener noreferrer" className="font-semibold text-esmeralda">
            @prumoapp
          </a>
        </div>
      </footer>
    </main>
  );
}

/* ─────────────── mini-componentes ─────────────── */

function Secao({ n, titulo, children }: { n: string; titulo: string; children: React.ReactNode }) {
  return (
    <section className="mt-11">
      <h2 className="font-display text-2xl font-bold text-verde">
        <span className="text-esmeralda">{n}.</span> {titulo}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 text-[15px] leading-relaxed text-tinta">{children}</p>;
}

function Item({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="mt-1 shrink-0" aria-hidden>
        <path d="M20 6L9 17l-5-5" stroke="#0DA96E" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>{children}</span>
    </li>
  );
}

function Alerta({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 rounded-2xl border-l-[3px] border-esmeralda bg-white p-5 text-[15px] leading-relaxed text-tinta">
      {children}
    </div>
  );
}

function Tabela({ cabecalho, linhas }: { cabecalho?: [string, string]; linhas: [string, string][] }) {
  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-linha bg-white">
      <table className="w-full text-left text-[14.5px]">
        {cabecalho && (
          <thead>
            <tr className="border-b border-linha">
              {cabecalho.map((c) => (
                <th key={c} className="px-5 py-3 text-[12px] font-semibold uppercase tracking-wide text-esmeralda">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {linhas.map(([a, b], i) => (
            <tr key={a} className={i < linhas.length - 1 ? "border-b border-linha" : ""}>
              <td className="px-5 py-3.5 align-top font-semibold text-verde">{a}</td>
              <td className="px-5 py-3.5 align-top leading-relaxed text-tinta">{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Mail() {
  return (
    <a href={`mailto:${EMAIL}`} className="font-semibold text-esmeralda hover:underline">
      {EMAIL}
    </a>
  );
}

function Logo({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={(size * 80) / 60} viewBox="0 0 60 80" fill="none" aria-hidden>
      <line x1="20" y1="10" x2="20" y2="48" stroke="#0F3D2E" strokeWidth="11" strokeLinecap="round" />
      <path d="M20 10 A 14 14 0 1 1 20 34" fill="none" stroke="#0F3D2E" strokeWidth="11" strokeLinecap="round" />
      <path d="M14 46 L26 46 L29 56 L20 74 L11 56 Z" fill="#0F3D2E" />
      <circle cx="20" cy="75" r="5" fill="#2BB673" />
    </svg>
  );
}
