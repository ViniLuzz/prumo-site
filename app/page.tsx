import { ChatDemo } from "@/components/ChatDemo";
import { Simulador } from "@/components/Simulador";
import { VerdeTextura } from "@/components/VerdeTextura";
import { Reveal, Counter, Logo, Arrow, WA } from "@/components/ui";
import { FAQ } from "@/components/FAQ";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <Nav />
      <Hero />
      <Prova />
      <Beneficios />
      <Como />
      <SimuladorSecao />
      <Confianca />
      <Comparacao />
      <Preco />
      <FAQ />
      <FinalCta />
      <Footer />
    </main>
  );
}

/* ─────────────── NAV ─────────────── */
function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-linha bg-creme/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2.5 font-display text-[22px] font-bold tracking-tight text-verde">
          <Logo tone="#0F3D2E" /> Prumo
        </div>
        <a
          href={WA}
          target="_blank"
          rel="noopener"
          className="rounded-lg bg-verde px-4.5 py-2.5 text-sm font-semibold text-creme transition hover:bg-verde-esc"
        >
          Analisar minha carta
        </a>
      </div>
    </nav>
  );
}

/* ─────────────── HERO (base clara) ─────────────── */
function Hero() {
  return (
    <header className="relative px-6 pb-16 pt-16 sm:pt-20">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <Reveal>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-linha bg-white px-3 py-1.5 text-[13px] font-medium text-tinta">
              <span className="h-1.5 w-1.5 rounded-full bg-esmeralda" /> Benefício do INSS negado?
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-display text-[clamp(38px,5.6vw,64px)] font-semibold leading-[1.03] tracking-tight text-verde">
              A negativa do INSS <span className="text-esmeralda">não é</span> a palavra final.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-lg text-[19px] leading-relaxed text-tinta">
              Boa parte das negativas está errada — cálculo equivocado, cadastro desatualizado, uma
              regra que já caiu. Descubra o motivo real da sua <strong className="text-verde">de graça</strong> e
              veja se dá pra reverter. Sem advogado. Sem abrir mão de nada.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href={WA}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2.5 rounded-xl bg-esmeralda px-7 py-4 text-base font-bold text-white shadow-lg shadow-esmeralda/20 transition hover:-translate-y-0.5 hover:bg-esmeralda-cl"
              >
                Descobrir por que fui negada <Arrow color="#fff" />
              </a>
              <a href="#como" className="px-1.5 py-4 text-[15px] font-semibold text-verde/70 transition hover:text-verde">
                Ver como funciona →
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[13.5px] text-tinta">
              <Selo texto="Nunca pedimos sua senha" />
              <Selo texto="Preço fixo, nunca % do benefício" />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} y={30}>
          <ChatDemo />
        </Reveal>
      </div>
    </header>
  );
}

function Selo({ texto }: { texto: string }) {
  return (
    <span className="flex items-center gap-2">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 2l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V5l7-3z" stroke="#0DA96E" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" stroke="#0DA96E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {texto}
    </span>
  );
}

/* ─────────────── PROVA (dados reais, seção ESCURA) ─────────────── */
function Prova() {
  return (
    <section className="relative px-6 py-16 text-creme">
      <VerdeTextura />
      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-10 text-center text-[15px] text-creme-dim">
            O sistema do INSS nega em escala — e boa parte dessas negativas está errada.
          </p>
        </Reveal>
        <div className="grid gap-8 sm:grid-cols-3">
          <Reveal>
            <Stat numero={<><Counter to={668} />&nbsp;mil</>} label="pedidos negados por mês em 2026" fonte="Previdenciarista, dados INSS" />
          </Reveal>
          <Reveal delay={0.1}>
            <Stat numero={<><Counter to={51} />%</>} label="dos pedidos avaliados pelo sistema foram rejeitados" fonte="Auditoria, 1º semestre 2025" />
          </Reveal>
          <Reveal delay={0.2}>
            <Stat numero={<><Counter to={30} />&nbsp;dias</>} label="é todo o prazo que você tem pra recorrer" fonte="Lei 8.213/91" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
function Stat({ numero, label, fonte }: { numero: React.ReactNode; label: string; fonte: string }) {
  return (
    <div className="text-center">
      <div className="font-display text-[46px] font-semibold leading-none text-esmeralda">{numero}</div>
      <div className="mx-auto mt-3 max-w-[240px] text-[15px] leading-snug text-creme">{label}</div>
      <div className="mt-2 text-[11.5px] uppercase tracking-wide text-creme-dim/70">{fonte}</div>
    </div>
  );
}

/* ─────────────── BENEFÍCIOS COBERTOS (concreto, claro) ─────────────── */
function Beneficios() {
  const itens = [
    "Salário-maternidade",
    "Auxílio-doença",
    "BPC / LOAS",
    "Pensão por morte",
    "Auxílio-acidente",
  ];
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] px-8 py-14 text-creme sm:px-14">
            <VerdeTextura forte />
            <div className="relative z-10">
              <Eyebrow>Benefícios que a gente analisa</Eyebrow>
              <h2 className="max-w-2xl font-display text-[clamp(30px,4vw,44px)] tracking-tight">
                Você manda a carta. A gente já sabe do que se trata.
              </h2>
              <p className="mt-4 max-w-xl text-lg text-creme-dim">
                Nosso sistema reconhece o benefício e o motivo da negativa direto na carta do INSS — e
                monta o recurso certo pro seu caso.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                {itens.map((b) => (
                  <div
                    key={b}
                    className="flex items-center gap-2.5 rounded-xl border border-creme/15 bg-creme/5 px-5 py-3.5 text-[15.5px] font-medium text-creme backdrop-blur-sm"
                  >
                    <CheckSmall /> {b}
                  </div>
                ))}
              </div>
              <p className="mt-6 text-[14px] text-creme-dim">
                Não achou o seu? Manda a carta mesmo assim — se a gente ainda não cobre, uma pessoa da
                equipe olha o seu caso.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────── COMO FUNCIONA (seção ESCURA) ─────────────── */
function Como() {
  const passos = [
    { n: 1, t: "Você envia a carta do INSS", d: "Manda a carta de indeferimento pelo WhatsApp — o mesmo lugar onde você já conversa todo dia. Uma foto ou o PDF basta.", free: false },
    { n: 2, t: "Descobre o motivo real da negativa", d: "Em minutos, a gente traduz o motivo da recusa em português de gente e diz, com honestidade, se o seu caso tem chance de ser revertido.", free: true },
    { n: 3, t: "Recebe o recurso pronto e o passo a passo", d: "Se quiser seguir, o recurso chega escrito e fundamentado com o seu caso. A gente te guia, clique a clique, até você protocolar sozinha no Meu INSS.", free: false },
    { n: 4, t: "Acompanha até o fim", d: "A gente lembra dos prazos e fica com você até o número de protocolo. Se o INSS pedir algo, você não vai estar sozinha.", free: false },
  ];
  return (
    <section id="como" className="relative px-6 py-24 text-creme">
      <VerdeTextura />
      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal>
          <EyebrowDark>Como funciona</EyebrowDark>
          <h2 className="max-w-2xl font-display text-[clamp(30px,4vw,44px)] tracking-tight">
            Do &quot;não entendi nada&quot; ao recurso protocolado.
          </h2>
        </Reveal>
        <div className="mt-13">
          {passos.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.06}>
              <div className="grid grid-cols-[56px_1fr] items-start gap-6 border-t border-creme/12 py-8 last:border-b">
                <div className="grid h-14 w-14 place-items-center rounded-full border-[1.5px] border-esmeralda/50 font-display text-[30px] font-semibold text-esmeralda">
                  {p.n}
                </div>
                <div>
                  <h3 className="mb-1.5 font-display text-[23px] font-semibold">{p.t}</h3>
                  <p className="max-w-2xl text-base text-creme-dim">{p.d}</p>
                  {p.free && (
                    <span className="mt-2.5 inline-block rounded-full bg-esmeralda/15 px-3 py-1 text-[13px] font-semibold text-esmeralda">
                      Essa parte é gratuita
                    </span>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── SIMULADOR (ferramenta interativa, base clara) ─────────────── */
function SimuladorSecao() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="text-center">
            <Eyebrow center>Seu prazo está correndo</Eyebrow>
            <h2 className="mx-auto max-w-2xl font-display text-[clamp(30px,4vw,44px)] tracking-tight text-verde">
              Descubra quantos dias você ainda tem pra recorrer.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-lg text-tinta">
              O prazo do recurso é de 30 dias a partir do dia em que você recebeu a carta. Veja o seu
              agora — é grátis.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-11">
            <Simulador />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────── CONFIANÇA (base clara) ─────────────── */
function Confianca() {
  const itens = [
    { t: "Nunca pedimos sua senha do gov.br", d: "Quem pede sua senha não está te ajudando. Você faz tudo na sua própria conta — a gente só mostra o caminho." },
    { t: "Preço fixo, nunca porcentagem", d: "Advogado costuma cobrar 30% do que você receber. Aqui o valor é único e fixo. O benefício fica 100% seu." },
    { t: "Ver o problema é grátis", d: "Você só decide pagar depois de saber se o seu caso tem solução. Sem surpresa, sem pegadinha." },
    { t: "A gente não promete milagre", d: "Se o seu caso não tiver saída, a gente diz na hora. Honestidade vale mais que uma venda." },
  ];
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Eyebrow>Por que você pode confiar</Eyebrow>
          <h2 className="max-w-2xl font-display text-[clamp(30px,4vw,44px)] tracking-tight text-verde">
            Feito pra ser o oposto de um golpe.
          </h2>
        </Reveal>
        <div className="mt-13 grid gap-4 md:grid-cols-2">
          {itens.map((c, i) => (
            <Reveal key={c.t} delay={i * 0.06}>
              <div className="flex gap-4 rounded-2xl border border-linha bg-white p-6 shadow-sm">
                <div className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-esmeralda">
                  <Check />
                </div>
                <div>
                  <h3 className="mb-1 font-display text-[17.5px] font-semibold text-verde">{c.t}</h3>
                  <p className="text-[14.5px] text-tinta">{c.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── COMPARAÇÃO (base clara) ─────────────── */
function Comparacao() {
  return (
    <section className="px-6 pb-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Eyebrow>Prumo x o caminho de sempre</Eyebrow>
          <h2 className="max-w-2xl font-display text-[clamp(30px,4vw,44px)] tracking-tight text-verde">
            O mesmo direito. Sem entregar um pedaço dele.
          </h2>
        </Reveal>
        <div className="mt-13 grid gap-5 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-linha bg-white p-8">
              <h3 className="mb-5 text-[13px] font-bold uppercase tracking-wider text-tinta/60">O caminho de sempre</h3>
              <ul>
                {["Até 30% do seu benefício vai embora", "Você desiste por achar que não tem jeito", "Ninguém te explica o que aconteceu", "Risco de cair num golpe de ‘facilitador’"].map((t) => (
                  <li key={t} className="flex items-start gap-3 border-b border-linha py-3 text-[15.5px] text-tinta last:border-0">
                    <XIcon /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative h-full overflow-hidden rounded-2xl border-[1.5px] border-esmeralda p-8 text-creme">
              <VerdeTextura />
              <span className="absolute -top-3 right-6 z-10 rounded-full bg-esmeralda px-4 py-1 text-xs font-bold text-white">Com o Prumo</span>
              <h3 className="relative z-10 mb-5 text-[13px] font-bold uppercase tracking-wider text-esmeralda">Com o Prumo</h3>
              <ul className="relative z-10">
                {["O benefício fica 100% com você", "Você entende exatamente por que foi negada", "Recurso pronto e guiado, no seu WhatsApp", "Transparência total, sua senha nunca sai de você"].map((t) => (
                  <li key={t} className="flex items-start gap-3 border-b border-creme/12 py-3 text-[15.5px] last:border-0">
                    <CheckSmall /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── PREÇO (seção ESCURA) ─────────────── */
function Preco() {
  return (
    <section id="comecar" className="relative px-6 py-24 text-creme">
      <VerdeTextura forte />
      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal>
          <div className="text-center">
            <EyebrowDark center>Comece agora</EyebrowDark>
            <h2 className="mx-auto max-w-2xl font-display text-[clamp(30px,4vw,44px)] tracking-tight">
              Ver o problema é grátis. Resolver é a sua escolha.
            </h2>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mx-auto mt-13 max-w-lg rounded-3xl border border-esmeralda/25 bg-[#134736]/70 p-10 text-center shadow-2xl shadow-black/30 backdrop-blur-sm">
            <div className="mb-3 text-sm font-semibold uppercase tracking-wide text-esmeralda">Plano de Ação</div>
            <div className="font-display text-[64px] font-semibold leading-none">
              <span className="text-2xl font-normal text-creme-dim">R$</span>79
            </div>
            <div className="mt-2.5 text-[15px] text-creme-dim">pagamento único · sem mensalidade · nunca % do benefício</div>
            <ul className="my-8 space-y-3 text-left">
              {["Diagnóstico do motivo real da sua negativa — grátis, antes de pagar", "Recurso escrito e fundamentado com o seu caso, pronto pra anexar", "Passo a passo guiado até você protocolar no Meu INSS", "Lembretes de prazo e acompanhamento até a resposta"].map((t) => (
                <li key={t} className="flex items-start gap-3 text-[15.5px]">
                  <CheckSmall /> {t}
                </li>
              ))}
            </ul>
            <a href={WA} target="_blank" rel="noopener" className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-esmeralda py-4 text-base font-bold text-white transition hover:bg-esmeralda-cl">
              Analisar minha carta de graça <Arrow color="#fff" />
            </a>
            <p className="mt-4 text-[13.5px] italic text-creme-dim">Você só paga se o seu caso tiver solução e você quiser seguir.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────── FINAL CTA (base clara) ─────────────── */
function FinalCta() {
  return (
    <section className="px-6 py-24 text-center">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="mx-auto max-w-3xl font-display text-[clamp(32px,4.5vw,52px)] tracking-tight text-verde">
            Seu prazo de 30 dias já está correndo.
          </h2>
          <p className="mx-auto mb-9 mt-5 max-w-xl text-[19px] text-tinta">
            Descobrir se a sua negativa tem solução leva poucos minutos e não custa nada. Não deixe o
            tempo decidir por você.
          </p>
          <a href={WA} target="_blank" rel="noopener" className="inline-flex items-center gap-2.5 rounded-xl bg-esmeralda px-8 py-4 text-base font-bold text-white shadow-lg shadow-esmeralda/20 transition hover:-translate-y-0.5 hover:bg-esmeralda-cl">
            Analisar minha carta agora <Arrow color="#fff" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────── FOOTER ─────────────── */
function Footer() {
  return (
    <footer className="border-t border-linha bg-white px-6 py-11 text-[13.5px] text-tinta">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5">
        <div className="flex items-center gap-2.5 font-display text-lg font-bold text-verde">
          <Logo size={24} tone="#0F3D2E" /> Prumo
        </div>
        <p className="max-w-xl leading-relaxed">
          O Prumo é uma ferramenta de tecnologia que ajuda cidadãos a entenderem negativas do INSS e a
          conduzirem seus próprios recursos administrativos. Não somos um escritório de advocacia e não
          prestamos serviços jurídicos. Não pedimos senha do gov.br e não acessamos sua conta.
        </p>
        <div className="flex items-center gap-5">
          <a href="/privacidade" className="font-semibold text-esmeralda hover:underline">
            Política de Privacidade
          </a>
          <a href="/excluir-dados" className="font-semibold text-esmeralda hover:underline">
            Apagar meus dados
          </a>
          <a href="https://instagram.com/prumoapp" target="_blank" rel="noopener" className="font-semibold text-esmeralda">
            @prumoapp
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────── mini-componentes ─────────────── */
function Eyebrow({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return (
    <div className={`mb-4 flex items-center gap-2.5 text-[13px] font-semibold uppercase tracking-wide text-esmeralda ${center ? "justify-center" : ""}`}>
      <span className="h-px w-6 bg-esmeralda" /> {children}
    </div>
  );
}
function EyebrowDark({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return (
    <div className={`mb-4 flex items-center gap-2.5 text-[13px] font-semibold uppercase tracking-wide text-esmeralda ${center ? "justify-center" : ""}`}>
      <span className="h-px w-6 bg-esmeralda" /> {children}
    </div>
  );
}
function Check() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M20 6L9 17l-5-5" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function CheckSmall() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0" aria-hidden><path d="M20 6L9 17l-5-5" stroke="#0DA96E" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function CheckMini() {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" className="shrink-0" aria-hidden><path d="M20 6L9 17l-5-5" stroke="#0DA96E" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function XIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0" aria-hidden><circle cx="12" cy="12" r="9" stroke="#c0c7c2" strokeWidth="1.6" /><path d="M15 9l-6 6M9 9l6 6" stroke="#c0c7c2" strokeWidth="1.6" strokeLinecap="round" /></svg>;
}
