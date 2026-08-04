"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { WA } from "./ui";

// Ferramenta REAL (não decorativa): a pessoa informa quando recebeu a carta e o
// simulador mostra quantos dias faltam pro prazo de 30 dias do recurso vencer.
// Gera urgência verdadeira e leva pro WhatsApp com o contexto certo.
export function Simulador() {
  const [data, setData] = useState("");
  const resultado = calcular(data);

  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-verde/12 bg-white p-8 shadow-xl shadow-verde/5">
      <label className="mb-2 block text-sm font-semibold text-verde">
        Quando você recebeu a carta de indeferimento?
      </label>
      <input
        type="date"
        value={data}
        max={hoje()}
        onChange={(e) => setData(e.target.value)}
        className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3.5 text-base text-verde outline-none transition focus:border-esmeralda focus:ring-2 focus:ring-esmeralda/25"
      />

      {resultado && (
        <motion.div
          key={resultado.tipo + resultado.dias}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mt-6"
        >
          {resultado.tipo === "no_prazo" && (
            <div className="rounded-xl bg-esmeralda/10 p-5 text-center">
              <div className="font-display text-5xl font-semibold text-esmeralda">
                {resultado.dias}
              </div>
              <div className="mt-1 text-sm font-medium text-verde/70">
                {resultado.dias === 1 ? "dia restante" : "dias restantes"} pra recorrer
              </div>
              <p className="mt-3 text-[14.5px] text-verde/70">
                Seu prazo vai até <b>{resultado.limite}</b>. Ainda dá tempo — e quanto antes começar,
                melhor.
              </p>
            </div>
          )}
          {resultado.tipo === "urgente" && (
            <div className="rounded-xl bg-amber-500/12 p-5 text-center">
              <div className="font-display text-5xl font-semibold text-amber-600">{resultado.dias}</div>
              <div className="mt-1 text-sm font-medium text-verde/70">
                {resultado.dias === 1 ? "dia restante" : "dias restantes"} — corre!
              </div>
              <p className="mt-3 text-[14.5px] text-verde/70">
                O prazo vence em <b>{resultado.limite}</b>. Está apertado, mas ainda dá — vamos agir
                hoje.
              </p>
            </div>
          )}
          {resultado.tipo === "vencido" && (
            <div className="rounded-xl bg-neutral-100 p-5 text-center">
              <div className="font-display text-2xl font-semibold text-verde">
                O prazo de 30 dias pode ter passado
              </div>
              <p className="mt-2 text-[14.5px] text-verde/70">
                Mas não é o fim: dependendo do seu caso, ainda há caminhos (novo pedido, revisão). Vale
                conversar pra ver o que dá.
              </p>
            </div>
          )}

          <a
            href={WA}
            target="_blank"
            rel="noopener"
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-esmeralda py-3.5 text-[15px] font-bold text-white transition hover:bg-esmeralda-cl"
          >
            {resultado.tipo === "vencido" ? "Ver meu caso mesmo assim" : "Analisar minha carta agora"}
          </a>
        </motion.div>
      )}

      {!resultado && (
        <p className="mt-5 text-center text-sm text-neutral-400">
          Escolha a data pra ver quanto tempo você ainda tem.
        </p>
      )}
    </div>
  );
}

function hoje() {
  return new Date().toISOString().slice(0, 10);
}

function calcular(dataStr: string) {
  if (!dataStr) return null;
  const recebida = new Date(dataStr + "T00:00:00");
  const limite = new Date(recebida);
  limite.setDate(limite.getDate() + 30);
  const agora = new Date();
  agora.setHours(0, 0, 0, 0);
  const diffMs = limite.getTime() - agora.getTime();
  const dias = Math.ceil(diffMs / 86_400_000);
  const limiteFmt = limite.toLocaleDateString("pt-BR");
  if (dias < 0) return { tipo: "vencido" as const, dias, limite: limiteFmt };
  if (dias <= 10) return { tipo: "urgente" as const, dias, limite: limiteFmt };
  return { tipo: "no_prazo" as const, dias, limite: limiteFmt };
}
