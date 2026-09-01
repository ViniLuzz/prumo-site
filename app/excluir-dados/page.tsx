// site-novo/app/excluir-dados/page.tsx — Exclusão de dados a pedido do titular.
//
// Por que existe:
//   1. LGPD art. 18, VI — direito à eliminação dos dados tratados com consentimento.
//   2. A Meta EXIGE uma "Data Deletion URL" pública para aprovar o app.
//
// COMO FUNCIONA: a pessoa informa o WhatsApp, recebe um código de 6 dígitos NAQUELE
// número, e digita o código aqui. Sem isso, qualquer um apagaria os dados de qualquer
// pessoa sabendo só o telefone.
//
// ⚠️ O código é gerado por nós e digitado AQUI pelo próprio dono — nunca pedimos ele
// por mensagem. A página diz isso na cara, porque o público é justamente o alvo do
// golpe do "me manda o código que chegou aí".

"use client";

import { useState } from "react";
import Link from "next/link";

const API = "https://axuljqwybktjwrpeekhr.supabase.co/functions/v1/excluir-dados";
const EMAIL = "privacidade@oprumoapp.com.br";

type Etapa = "telefone" | "codigo" | "pronto";

export default function ExcluirDados() {
  const [etapa, setEtapa] = useState<Etapa>("telefone");
  const [telefone, setTelefone] = useState("");
  const [codigo, setCodigo] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function pedirCodigo(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    if (telefone.replace(/\D/g, "").length < 10) return setErro("Digite o número com DDD.");
    setCarregando(true);
    try {
      const r = await fetch(API, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ telefone }),
      });
      const j = await r.json();
      if (j.erro) throw new Error(mensagemErro(j.erro));
      setEtapa("codigo");
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Não consegui enviar o código. Tente de novo.");
    } finally {
      setCarregando(false);
    }
  }

  async function confirmar(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setCarregando(true);
    try {
      const r = await fetch(API, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ telefone, codigo }),
      });
      const j = await r.json();
      if (j.erro) throw new Error(mensagemErro(j.erro, j.restam));
      setEtapa("pronto");
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Não consegui apagar agora. Tente de novo.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="min-h-screen bg-creme">
      <header className="border-b border-linha bg-white px-6 py-5">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 font-display text-lg font-bold text-verde">
            <Logo size={24} /> Prumo
          </Link>
          <Link href="/" className="text-[13.5px] font-semibold text-esmeralda hover:underline">
            ← Voltar ao início
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-6 py-14">
        <p className="mb-3 flex items-center gap-2.5 text-[13px] font-semibold uppercase tracking-wide text-esmeralda">
          <span className="h-px w-6 bg-esmeralda" /> Seus dados
        </p>
        <h1 className="font-display text-4xl font-bold leading-tight text-verde sm:text-[42px]">
          Apagar meus dados
        </h1>
        <p className="mt-4 text-[15.5px] leading-relaxed text-tinta">
          Você pode pedir a qualquer momento que a gente apague tudo o que guardamos sobre você.
          É um direito seu (art. 18 da LGPD) e não precisa justificar o motivo.
        </p>

        {/* ── Passo 1 ── */}
        {etapa === "telefone" && (
          <>
            <Cartao>
              <h2 className="font-display text-lg font-bold text-verde">O que vai ser apagado</h2>
              <ul className="mt-4 space-y-2.5 text-[15px] leading-relaxed text-tinta">
                <Item>Toda a conversa que você teve com o Prumo</Item>
                <Item>Os documentos que você enviou (carta do INSS, CNIS, fotos, áudios)</Item>
                <Item>A análise do seu caso e o recurso gerado</Item>
                <Item>Seu nome, CPF e número de benefício</Item>
              </ul>
              <p className="mt-5 border-t border-linha pt-4 text-[14px] leading-relaxed text-tinta">
                <b>O que a lei nos obriga a manter:</b> se você comprou o Plano de Ação, o registro
                da transação fica pelo prazo fiscal — mas apagamos os dados do seu caso que estavam
                junto dele.
              </p>
            </Cartao>

            <form onSubmit={pedirCodigo} className="mt-6">
              <label htmlFor="tel" className="block text-[15px] font-semibold text-verde">
                Qual o WhatsApp que você usou para falar com o Prumo?
              </label>
              <input
                id="tel"
                type="tel"
                inputMode="tel"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                placeholder="(11) 91234-5678"
                className="mt-3 w-full rounded-xl border-[1.5px] border-linha bg-white px-4 py-3.5 text-[16px] text-verde outline-none focus:border-esmeralda"
              />
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-tinta">
                Vamos mandar um código nesse número para confirmar que é você.
              </p>
              {erro && <Erro>{erro}</Erro>}
              <Botao carregando={carregando}>
                {carregando ? "Enviando…" : "Enviar código"}
              </Botao>
            </form>
          </>
        )}

        {/* ── Passo 2 ── */}
        {etapa === "codigo" && (
          <>
            <Cartao>
              <p className="text-[15px] leading-relaxed text-tinta">
                Se esse número tiver dados com a gente, você vai receber um{" "}
                <b>código de 6 dígitos no WhatsApp</b>. Ele vale por 15 minutos.
              </p>
            </Cartao>

            <form onSubmit={confirmar} className="mt-6">
              <label htmlFor="cod" className="block text-[15px] font-semibold text-verde">
                Digite o código que chegou
              </label>
              <input
                id="cod"
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={codigo}
                onChange={(e) => setCodigo(e.target.value.replace(/\D/g, ""))}
                placeholder="000000"
                className="mt-3 w-full rounded-xl border-[1.5px] border-linha bg-white px-4 py-3.5 text-center font-mono text-[26px] tracking-[0.4em] text-verde outline-none focus:border-esmeralda"
              />
              {erro && <Erro>{erro}</Erro>}

              <div className="mt-5 rounded-2xl border-l-[3px] border-[#C8901B] bg-white p-5 text-[14.5px] leading-relaxed text-tinta">
                <b>Isto não tem volta.</b> Depois de confirmar, a conversa, os documentos e a
                análise do seu caso são apagados de vez. Se você ainda precisa do seu recurso,
                baixe ou salve antes de continuar.
              </div>

              <button
                type="submit"
                disabled={carregando || codigo.length !== 6}
                className="mt-5 w-full rounded-xl bg-[#B4453C] px-6 py-4 text-[15.5px] font-bold text-white transition disabled:opacity-40"
              >
                {carregando ? "Apagando…" : "Apagar tudo definitivamente"}
              </button>
              <button
                type="button"
                onClick={() => { setEtapa("telefone"); setErro(""); setCodigo(""); }}
                className="mt-3 w-full rounded-xl border-[1.5px] border-linha bg-white px-6 py-3 text-[14.5px] font-semibold text-tinta"
              >
                Voltar
              </button>
            </form>
          </>
        )}

        {/* ── Pronto ── */}
        {etapa === "pronto" && (
          <div className="mt-8 rounded-2xl border border-linha bg-white p-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-esmeralda">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M20 6L9 17l-5-5" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="mt-5 font-display text-2xl font-bold text-verde">Pronto, apagamos tudo</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-tinta">
              A sua conversa, os seus documentos e a análise do seu caso foram eliminados dos
              nossos sistemas.
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-tinta">
              Se um dia precisar da gente de novo, é só mandar um <b>oi</b> no WhatsApp — a
              conversa recomeça do zero, como da primeira vez. 💚
            </p>
            <Link href="/" className="mt-6 inline-block rounded-xl bg-verde px-7 py-3.5 text-[15px] font-bold text-white">
              Voltar ao início
            </Link>
          </div>
        )}

        {/* Antifraude — o público daqui é alvo do golpe do "me manda o código" */}
        <div className="mt-10 rounded-2xl border-l-[3px] border-esmeralda bg-white p-6 text-[14.5px] leading-relaxed text-tinta">
          <b>Cuidado com golpe.</b> O código que a gente manda serve só para apagar os seus dados,
          e você digita ele <b>aqui nesta página</b>. O Prumo <b>nunca</b> vai te pedir esse código
          por mensagem, nunca pede senha do gov.br e nunca pede dados de cartão. Se alguém pedir
          isso em nome do Prumo, é golpe — não repasse.
        </div>

        <p className="mt-8 text-center text-[14px] leading-relaxed text-tinta">
          Prefere fazer por e-mail, ou quer só <b>ver</b> ou <b>corrigir</b> seus dados em vez de
          apagar? Escreva para{" "}
          <a href={`mailto:${EMAIL}`} className="font-semibold text-esmeralda hover:underline">
            {EMAIL}
          </a>{" "}
          — respondemos em até 15 dias.
          <br />
          Veja também a{" "}
          <Link href="/privacidade" className="font-semibold text-esmeralda hover:underline">
            Política de Privacidade
          </Link>.
        </p>
      </div>
    </main>
  );
}

/* ─────────────── mini-componentes ─────────────── */

function mensagemErro(cod: string, restam?: number): string {
  return ({
    telefone_invalido: "Esse número não parece válido. Confira o DDD.",
    codigo_invalido: restam !== undefined
      ? `Código errado. Você ainda pode tentar ${restam} vez(es).`
      : "Código errado ou já usado. Peça um novo.",
    codigo_expirado: "Esse código passou dos 15 minutos. Peça um novo.",
    tentativas_excedidas: "Muitas tentativas. Espere um pouco e peça um código novo.",
  } as Record<string, string>)[cod] ?? "Algo deu errado. Tente de novo em instantes.";
}

function Cartao({ children }: { children: React.ReactNode }) {
  return <div className="mt-8 rounded-2xl border border-linha bg-white p-6">{children}</div>;
}

function Erro({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 rounded-xl bg-[#FBEDEC] px-4 py-3 text-[14px] font-medium text-[#8C332C]">
      {children}
    </p>
  );
}

function Botao({ children, carregando }: { children: React.ReactNode; carregando: boolean }) {
  return (
    <button
      type="submit"
      disabled={carregando}
      className="mt-5 w-full rounded-xl bg-verde px-6 py-4 text-[15.5px] font-bold text-white transition disabled:opacity-40"
    >
      {children}
    </button>
  );
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
