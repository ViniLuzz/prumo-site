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
//
// NOTA DE IMPLEMENTAÇÃO: esta página é um SERVER component e a interatividade vive
// num <script> de JS puro, em vez de "use client" + useState. Motivo prático: com
// "use client" o build do Vercel concluía como "success" mas NÃO emitia esta rota
// (404 em produção, enquanto /privacidade — server component — subia normal). Sem a
// diretiva, ela fica estruturalmente igual à página que funciona. O comportamento
// para o usuário é idêntico, e é o mesmo JS já validado em web/excluir-dados.html.

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Apagar meus dados — Prumo",
  description:
    "Peça a exclusão de tudo o que o Prumo guarda sobre você. Confirmamos por um código no seu WhatsApp e apagamos na hora.",
  alternates: { canonical: "https://www.oprumoapp.com.br/excluir-dados" },
};

const API = "https://axuljqwybktjwrpeekhr.supabase.co/functions/v1/excluir-dados";
const EMAIL = "privacidade@oprumoapp.com.br";

export default function ExcluirDados() {
  return (
    <main className="min-h-screen bg-creme">
      <header className="border-b border-linha bg-white px-6 py-5">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 font-display text-lg font-bold text-verde">
            <Logo /> Prumo
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

        {/* ── Passo 1: telefone ── */}
        <div id="passo-telefone">
          <div className="mt-8 rounded-2xl border border-linha bg-white p-6">
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
          </div>

          <form id="form-telefone" className="mt-6">
            <label htmlFor="telefone" className="block text-[15px] font-semibold text-verde">
              Qual o WhatsApp que você usou para falar com o Prumo?
            </label>
            <input
              id="telefone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="(11) 91234-5678"
              className="mt-3 w-full rounded-xl border-[1.5px] border-linha bg-white px-4 py-3.5 text-[16px] text-verde outline-none focus:border-esmeralda"
            />
            <p className="mt-2.5 text-[13.5px] leading-relaxed text-tinta">
              Vamos mandar um código nesse número para confirmar que é você.
            </p>
            <p id="erro-telefone" className="mt-3 hidden rounded-xl bg-[#FBEDEC] px-4 py-3 text-[14px] font-medium text-[#8C332C]" />
            <button
              type="submit"
              id="btn-enviar"
              className="mt-5 w-full rounded-xl bg-verde px-6 py-4 text-[15.5px] font-bold text-white disabled:opacity-40"
            >
              Enviar código
            </button>
          </form>
        </div>

        {/* ── Passo 2: código ── */}
        <div id="passo-codigo" className="hidden">
          <div className="mt-8 rounded-2xl border border-linha bg-white p-6">
            <p className="text-[15px] leading-relaxed text-tinta">
              Se esse número tiver dados com a gente, você vai receber um{" "}
              <b>código de 6 dígitos no WhatsApp</b>. Ele vale por 15 minutos.
            </p>
          </div>

          <form id="form-codigo" className="mt-6">
            <label htmlFor="codigo" className="block text-[15px] font-semibold text-verde">
              Digite o código que chegou
            </label>
            <input
              id="codigo"
              type="text"
              inputMode="numeric"
              maxLength={6}
              autoComplete="one-time-code"
              placeholder="000000"
              className="mt-3 w-full rounded-xl border-[1.5px] border-linha bg-white px-4 py-3.5 text-center font-mono text-[26px] tracking-[0.4em] text-verde outline-none focus:border-esmeralda"
            />
            <p id="erro-codigo" className="mt-3 hidden rounded-xl bg-[#FBEDEC] px-4 py-3 text-[14px] font-medium text-[#8C332C]" />

            <div className="mt-5 rounded-2xl border-l-[3px] border-[#C8901B] bg-white p-5 text-[14.5px] leading-relaxed text-tinta">
              <b>Isto não tem volta.</b> Depois de confirmar, a conversa, os documentos e a
              análise do seu caso são apagados de vez. Se você ainda precisa do seu recurso,
              baixe ou salve antes de continuar.
            </div>

            <button
              type="submit"
              id="btn-apagar"
              disabled
              className="mt-5 w-full rounded-xl bg-[#B4453C] px-6 py-4 text-[15.5px] font-bold text-white disabled:opacity-40"
            >
              Apagar tudo definitivamente
            </button>
            <button
              type="button"
              id="btn-voltar"
              className="mt-3 w-full rounded-xl border-[1.5px] border-linha bg-white px-6 py-3 text-[14.5px] font-semibold text-tinta"
            >
              Voltar
            </button>
          </form>
        </div>

        {/* ── Pronto ── */}
        <div id="passo-pronto" className="hidden">
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
        </div>

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

      {/* Interatividade em JS puro (ver nota no topo do arquivo). */}
      <script dangerouslySetInnerHTML={{ __html: `
(function () {
  var API = ${JSON.stringify(API)};
  var $ = function (id) { return document.getElementById(id); };
  var telefone = "";

  function erro(el, msg) { el.textContent = msg; el.classList.remove("hidden"); }
  function limpa(el) { el.classList.add("hidden"); }

  function msgErro(cod, restam) {
    if (cod === "codigo_invalido")
      return restam !== undefined
        ? "Código errado. Você ainda pode tentar " + restam + " vez(es)."
        : "Código errado ou já usado. Peça um novo.";
    var m = {
      telefone_invalido: "Esse número não parece válido. Confira o DDD.",
      codigo_expirado: "Esse código passou dos 15 minutos. Peça um novo.",
      tentativas_excedidas: "Muitas tentativas. Espere um pouco e peça um código novo."
    };
    return m[cod] || "Algo deu errado. Tente de novo em instantes.";
  }

  $("form-telefone").addEventListener("submit", function (e) {
    e.preventDefault();
    limpa($("erro-telefone"));
    telefone = $("telefone").value;
    if (telefone.replace(/\\D/g, "").length < 10)
      return erro($("erro-telefone"), "Digite o número com DDD.");

    var btn = $("btn-enviar");
    btn.disabled = true; btn.textContent = "Enviando…";
    fetch(API, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ telefone: telefone }) })
      .then(function (r) { return r.json(); })
      .then(function (j) {
        if (j.erro) throw new Error(msgErro(j.erro));
        $("passo-telefone").classList.add("hidden");
        $("passo-codigo").classList.remove("hidden");
        $("codigo").focus();
      })
      .catch(function (err) { erro($("erro-telefone"), err.message || "Não consegui enviar o código. Tente de novo."); })
      .then(function () { btn.disabled = false; btn.textContent = "Enviar código"; });
  });

  $("codigo").addEventListener("input", function (e) {
    e.target.value = e.target.value.replace(/\\D/g, "");
    $("btn-apagar").disabled = e.target.value.length !== 6;
  });

  $("form-codigo").addEventListener("submit", function (e) {
    e.preventDefault();
    limpa($("erro-codigo"));
    var btn = $("btn-apagar");
    btn.disabled = true; btn.textContent = "Apagando…";
    fetch(API, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ telefone: telefone, codigo: $("codigo").value }) })
      .then(function (r) { return r.json(); })
      .then(function (j) {
        if (j.erro) throw new Error(msgErro(j.erro, j.restam));
        $("passo-codigo").classList.add("hidden");
        $("passo-pronto").classList.remove("hidden");
      })
      .catch(function (err) { erro($("erro-codigo"), err.message || "Não consegui apagar agora. Tente de novo."); btn.disabled = false; })
      .then(function () { btn.textContent = "Apagar tudo definitivamente"; });
  });

  $("btn-voltar").addEventListener("click", function () {
    $("passo-codigo").classList.add("hidden");
    $("passo-telefone").classList.remove("hidden");
    $("codigo").value = ""; $("btn-apagar").disabled = true;
    limpa($("erro-codigo"));
  });
})();
      ` }} />
    </main>
  );
}

/* ─────────────── mini-componentes ─────────────── */

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

function Logo() {
  return (
    <svg width={24} height={32} viewBox="0 0 60 80" fill="none" aria-hidden>
      <line x1="20" y1="10" x2="20" y2="48" stroke="#0F3D2E" strokeWidth="11" strokeLinecap="round" />
      <path d="M20 10 A 14 14 0 1 1 20 34" fill="none" stroke="#0F3D2E" strokeWidth="11" strokeLinecap="round" />
      <path d="M14 46 L26 46 L29 56 L20 74 L11 56 Z" fill="#0F3D2E" />
      <circle cx="20" cy="75" r="5" fill="#2BB673" />
    </svg>
  );
}
