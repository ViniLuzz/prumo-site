import Image from "next/image";
import { ChatDemo } from "@/components/ChatDemo";
import { Reveal, Counter, MagneticButton, Logo, Arrow, WA } from "@/components/ui";
import { FAQ } from "@/components/FAQ";

export default function Home() {
  return (
    <main className="grain relative overflow-x-hidden">
      <Nav />
      <Hero />
      <Strip />
      <Problema />
      <Como />
      <Fundador />
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
    <nav className="sticky top-0 z-50 border-b border-creme/10 bg-verde/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2.5 font-display text-[22px] font-bold tracking-tight">
          <Logo /> Prumo
        </div>
        <a
          href={WA}
          target="_blank"
          rel="noopener"
          className="rounded-full bg-esmeralda px-4.5 py-2.5 text-sm font-semibold text-verde transition hover:bg-esmeralda-cl hover:-translate-y-0.5"
        >
          Analisar minha carta
        </a>
      </div>
    </nav>
  );
}

/* ─────────────── HERO ─────────────── */
function Hero() {
  return (
    <header className="relative px-6 pb-20 pt-20">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <Reveal>
            <span className="mb-5 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wide text-esmeralda">
              <span className="h-px w-6 bg-esmeralda" /> Benefício do INSS negado
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-display text-[clamp(38px,5.4vw,62px)] font-semibold leading-[1.05] tracking-tight">
              A negativa do INSS <em className="font-medium not-italic text-esmeralda">não é</em> a
              palavra final.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-lg text-[19px] leading-relaxed text-creme-dim">
              Boa parte das negativas está errada — cálculo equivocado, cadastro desatualizado, uma
              regra que já caiu. Descubra o motivo real da sua <strong className="text-creme">de graça</strong> e
              veja se dá pra reverter. Sem advogado. Sem abrir mão de nada.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <MagneticButton
                href={WA}
                className="inline-flex items-center gap-2.5 rounded-full bg-esmeralda px-7 py-4 text-base font-bold text-verde shadow-lg shadow-esmeralda/30 transition hover:bg-esmeralda-cl"
              >
                Descobrir por que fui negada <Arrow />
              </MagneticButton>
              <a href="#como" className="px-1.5 py-4 text-[15px] font-semibold text-creme/85 transition hover:text-esmeralda">
                Ver como funciona →
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap gap-6 text-[13.5px] text-creme-dim">
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
        <path d="M12 2l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V5l7-3z" stroke="#2BB673" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" stroke="#2BB673" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {texto}
    </span>
  );
}

/* ─────────────── STRIP (números animados) ─────────────── */
function Strip() {
  return (
    <div className="border-y border-creme/10 bg-verde-esc py-8">
      <div className="mx-auto grid max-w-6xl gap-6 px-6 text-center sm:grid-cols-3">
        <Reveal>
          <Num valor={<><Counter to={2} />&nbsp;mi</>} label="benefícios negados por ano pelo INSS" />
        </Reveal>
        <Reveal delay={0.1}>
          <Num valor={<><Counter to={30} />&nbsp;dias</>} label="é o prazo pra recorrer de uma negativa" />
        </Reveal>
        <Reveal delay={0.2}>
          <Num valor={<>R$&nbsp;0</>} label="pra descobrir se o seu caso tem solução" />
        </Reveal>
      </div>
    </div>
  );
}
function Num({ valor, label }: { valor: React.ReactNode; label: string }) {
  return (
    <div>
      <div className="font-display text-[38px] font-semibold leading-none text-esmeralda">{valor}</div>
      <div className="mt-2 text-[13.5px] text-creme-dim">{label}</div>
    </div>
  );
}

/* ─────────────── PROBLEMA ─────────────── */
function Problema() {
  const cards = [
    { t: "Cadastro com erro", d: "Uma contribuição que não aparece no CNIS, uma data trocada — e o sistema nega como se você não tivesse direito." },
    { t: "Regra que já caiu", d: "O INSS aplica exigências que a Justiça já derrubou. A negativa vem automática, mesmo com a lei do seu lado." },
    { t: "Documento mal enviado", d: "Faltou uma comprovação, uma exigência passou batida. Problemas de forma que escondem um direito real." },
  ];
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Eyebrow>Por que isso acontece</Eyebrow>
          <h2 className="max-w-2xl font-display text-[clamp(30px,4vw,44px)] tracking-tight">
            Você provavelmente tem direito. O sistema é que falhou.
          </h2>
          <p className="mt-4 max-w-xl text-lg text-creme-dim">
            A análise do INSS é cada vez mais automática. O sistema cruza dados em segundos e nega no
            menor sinal de divergência — sem entender o seu caso.
          </p>
        </Reveal>
        <div className="mt-13 grid gap-5 md:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={c.t} delay={i * 0.08}>
              <div className="group h-full rounded-2xl border border-creme/10 bg-verde-mid p-7 transition hover:-translate-y-1 hover:border-esmeralda/40">
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-esmeralda/15 text-esmeralda">
                  <IconDoc />
                </div>
                <h3 className="mb-2 font-display text-xl font-semibold">{c.t}</h3>
                <p className="text-[15px] text-creme-dim">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── COMO FUNCIONA ─────────────── */
function Como() {
  const passos = [
    { n: 1, t: "Você envia a carta do INSS", d: "Manda a carta de indeferimento pelo WhatsApp — o mesmo lugar onde você já conversa todo dia. Uma foto ou o PDF basta.", free: false },
    { n: 2, t: "Descobre o motivo real da negativa", d: "Em minutos, a gente traduz o motivo da recusa em português de gente e diz, com honestidade, se o seu caso tem chance de ser revertido.", free: true },
    { n: 3, t: "Recebe o recurso pronto e o passo a passo", d: "Se quiser seguir, o recurso chega escrito e fundamentado com o seu caso. A gente te guia, clique a clique, até você protocolar sozinha no Meu INSS.", free: false },
    { n: 4, t: "Acompanha até o fim", d: "A gente lembra dos prazos e fica com você até o número de protocolo. Se o INSS pedir algo, você não vai estar sozinha.", free: false },
  ];
  return (
    <section id="como" className="bg-verde-esc px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Eyebrow>Como funciona</Eyebrow>
          <h2 className="max-w-2xl font-display text-[clamp(30px,4vw,44px)] tracking-tight">
            Do &quot;não entendi nada&quot; ao recurso protocolado.
          </h2>
        </Reveal>
        <div className="mt-13">
          {passos.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.06}>
              <div className="grid grid-cols-[56px_1fr] items-start gap-6 border-t border-creme/10 py-8 last:border-b">
                <div className="grid h-14 w-14 place-items-center rounded-full border-[1.5px] border-esmeralda/40 font-display text-[30px] font-semibold text-esmeralda">
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

/* ─────────────── FUNDADOR (foto + nome + frase) ─────────────── */
function Fundador() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-[minmax(0,340px)_1fr]">
        <Reveal y={30}>
          <div className="relative">
            <div className="absolute -inset-3 rounded-[1.8rem] bg-esmeralda/20 blur-2xl" />
            <Image
              src="/fundador.png"
              alt="Fundador do Prumo"
              width={680}
              height={1020}
              className="relative rounded-[1.5rem] object-cover shadow-2xl shadow-black/50"
              priority={false}
            />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <Eyebrow>Quem está por trás</Eyebrow>
          <blockquote className="font-display text-[clamp(24px,3.2vw,34px)] font-medium leading-snug tracking-tight">
            &ldquo;Vi de perto como é humilhante receber um &lsquo;não&rsquo; do INSS sem entender o
            porquê. O Prumo nasceu pra virar esse jogo — colocar a informação do lado de quem mais
            precisa dela.&rdquo;
          </blockquote>
          <div className="mt-6 flex items-center gap-3">
            <div>
              <div className="font-semibold text-creme">Vinícius Luz</div>
              <div className="text-sm text-creme-dim">Fundador do Prumo</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────── CONFIANÇA / ANTI-GOLPE ─────────────── */
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
          <h2 className="max-w-2xl font-display text-[clamp(30px,4vw,44px)] tracking-tight">
            Feito pra ser o oposto de um golpe.
          </h2>
          <p className="mt-4 max-w-xl text-lg text-creme-dim">
            No mundo do INSS existe muita cilada. Por isso a transparência está no centro de tudo.
          </p>
        </Reveal>
        <div className="mt-13 grid gap-4 md:grid-cols-2">
          {itens.map((c, i) => (
            <Reveal key={c.t} delay={i * 0.06}>
              <div className="flex gap-4 rounded-2xl border border-creme/10 bg-verde-mid p-6">
                <div className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-esmeralda">
                  <Check />
                </div>
                <div>
                  <h3 className="mb-1 font-display text-[17.5px] font-semibold">{c.t}</h3>
                  <p className="text-[14.5px] text-creme-dim">{c.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── COMPARAÇÃO ─────────────── */
function Comparacao() {
  return (
    <section className="bg-verde-esc px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Eyebrow>Prumo x o caminho de sempre</Eyebrow>
          <h2 className="max-w-2xl font-display text-[clamp(30px,4vw,44px)] tracking-tight">
            O mesmo direito. Sem entregar um pedaço dele.
          </h2>
        </Reveal>
        <div className="mt-13 grid gap-5 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-creme/10 bg-verde-mid p-8">
              <h3 className="mb-5 text-[13px] font-bold uppercase tracking-wider text-creme-dim">O caminho de sempre</h3>
              <ul className="space-y-0">
                {["Até 30% do seu benefício vai embora", "Você desiste por achar que não tem jeito", "Ninguém te explica o que aconteceu", "Risco de cair num golpe de ‘facilitador’"].map((t) => (
                  <li key={t} className="flex items-start gap-3 border-b border-creme/10 py-3 text-[15.5px] text-creme-dim last:border-0">
                    <XIcon /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative h-full rounded-2xl border-[1.5px] border-esmeralda bg-gradient-to-br from-[#17604a] to-[#124a38] p-8">
              <span className="absolute -top-3 right-6 rounded-full bg-esmeralda px-4 py-1 text-xs font-bold text-verde">Com o Prumo</span>
              <h3 className="mb-5 text-[13px] font-bold uppercase tracking-wider text-esmeralda">Com o Prumo</h3>
              <ul className="space-y-0">
                {["O benefício fica 100% com você", "Você entende exatamente por que foi negada", "Recurso pronto e guiado, no seu WhatsApp", "Transparência total, sua senha nunca sai de você"].map((t) => (
                  <li key={t} className="flex items-start gap-3 border-b border-creme/10 py-3 text-[15.5px] last:border-0">
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

/* ─────────────── PREÇO ─────────────── */
function Preco() {
  return (
    <section id="comecar" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="text-center">
            <Eyebrow center>Comece agora</Eyebrow>
            <h2 className="mx-auto max-w-2xl font-display text-[clamp(30px,4vw,44px)] tracking-tight">
              Ver o problema é grátis. Resolver é a sua escolha.
            </h2>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mx-auto mt-13 max-w-lg rounded-3xl border-[1.5px] border-esmeralda/35 bg-verde-mid p-10 text-center">
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
            <a href={WA} target="_blank" rel="noopener" className="flex w-full items-center justify-center gap-2.5 rounded-full bg-esmeralda py-4 text-base font-bold text-verde transition hover:bg-esmeralda-cl">
              Analisar minha carta de graça <Arrow />
            </a>
            <p className="mt-4 text-[13.5px] italic text-creme-dim">Você só paga se o seu caso tiver solução e você quiser seguir.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────── FINAL CTA ─────────────── */
function FinalCta() {
  return (
    <section className="bg-verde-esc px-6 py-24 text-center">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="mx-auto max-w-3xl font-display text-[clamp(32px,4.5vw,52px)] tracking-tight">
            Seu prazo de 30 dias já está correndo.
          </h2>
          <p className="mx-auto mb-9 mt-5 max-w-xl text-[19px] text-creme-dim">
            Descobrir se a sua negativa tem solução leva poucos minutos e não custa nada. Não deixe o
            tempo decidir por você.
          </p>
          <MagneticButton href={WA} className="inline-flex items-center gap-2.5 rounded-full bg-esmeralda px-8 py-4 text-base font-bold text-verde shadow-lg shadow-esmeralda/30 transition hover:bg-esmeralda-cl">
            Analisar minha carta agora <Arrow />
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────── FOOTER ─────────────── */
function Footer() {
  return (
    <footer className="border-t border-creme/10 bg-verde-esc px-6 py-11 text-[13.5px] text-creme-dim">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5">
        <div className="flex items-center gap-2.5 font-display text-lg font-bold text-creme">
          <Logo size={24} /> Prumo
        </div>
        <p className="max-w-xl leading-relaxed">
          O Prumo é uma ferramenta de tecnologia que ajuda cidadãos a entenderem negativas do INSS e a
          conduzirem seus próprios recursos administrativos. Não somos um escritório de advocacia e não
          prestamos serviços jurídicos. Não pedimos senha do gov.br e não acessamos sua conta.
        </p>
        <a href="https://instagram.com/prumoapp" target="_blank" rel="noopener" className="font-semibold text-esmeralda">
          @prumoapp
        </a>
      </div>
    </footer>
  );
}

/* ─────────────── mini-componentes visuais ─────────────── */
function Eyebrow({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return (
    <div className={`mb-4 flex items-center gap-2.5 text-[13px] font-semibold uppercase tracking-wide text-esmeralda ${center ? "justify-center" : ""}`}>
      <span className="h-px w-6 bg-esmeralda" /> {children}
    </div>
  );
}
function IconDoc() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 3v18h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M7 14l4-4 3 3 5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function Check() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M20 6L9 17l-5-5" stroke="#0F3D2E" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function CheckSmall() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0" aria-hidden><path d="M20 6L9 17l-5-5" stroke="#2BB673" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function XIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0" aria-hidden><circle cx="12" cy="12" r="9" stroke="#8fa89c" strokeWidth="1.6" /><path d="M15 9l-6 6M9 9l6 6" stroke="#8fa89c" strokeWidth="1.6" strokeLinecap="round" /></svg>;
}
