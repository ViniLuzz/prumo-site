"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendario } from "./Calendario";
import { WA } from "./ui";

// Ferramenta REAL (não decorativa): a pessoa escolhe no calendário quando recebeu
// a carta e o simulador mostra quantos dias faltam pro prazo de 30 dias vencer.
export function Simulador() {
  const [data, setData] = useState<Date | null>(null);
  const resultado = data ? calcular(data) : null;

  return (
    <div className="mx-auto grid max-w-3xl gap-5 md:grid-cols-[1fr_minmax(0,300px)]">
      {/* Card do calendário */}
      <div className="rounded-3xl border border-linha bg-white p-6 shadow-xl shadow-verde/5">
        <div className="mb-4">
          <div className="text-[13px] font-semibold uppercase tracking-wide text-esmeralda">
            Sua carta chegou quando?
          </div>
          <div className="mt-1 text-sm text-tinta">Toque no dia em que você recebeu a carta.</div>
        </div>
        <Calendario selecionada={data} onSelect={setData} />
      </div>

      {/* Painel de resultado */}
      <div className="flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {!resultado && (
            <motion.div
              key="vazio"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-3xl border border-dashed border-linha bg-white/50 p-8 text-center"
            >
              <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-esmeralda/10">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 6v6l4 2" stroke="#0DA96E" strokeWidth="2" strokeLinecap="round" /><circle cx="12" cy="12" r="9" stroke="#0DA96E" strokeWidth="2" /></svg>
              </div>
              <p className="text-[14.5px] leading-snug text-tinta">
                Escolha a data ao lado pra ver <b className="text-verde">quantos dias você ainda tem</b>.
              </p>
            </motion.div>
          )}

          {resultado && (
            <motion.div
              key={resultado.tipo + resultado.dias}
              initial={{ opacity: 0, y: 10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="rounded-3xl p-7 text-center shadow-lg"
              style={{
                background: resultado.tipo === "no_prazo" ? "#0F3D2E" : resultado.tipo === "urgente" ? "#7c4a03" : "#f3f2ee",
              }}
            >
              {resultado.tipo !== "vencido" ? (
                <>
                  <div className="font-display text-[64px] font-semibold leading-none text-white">
                    {resultado.dias}
                  </div>
                  <div className="mt-1 text-sm font-medium text-white/70">
                    {resultado.dias === 1 ? "dia restante" : "dias restantes"}
                  </div>
                  <p className="mt-4 text-[14px] leading-snug text-white/85">
                    {resultado.tipo === "urgente" ? "Tá apertado! " : ""}
                    Seu prazo vai até <b className="text-white">{resultado.limite}</b>.
                    {resultado.tipo === "urgente" ? " Vamos agir hoje." : " Quanto antes, melhor."}
                  </p>
                </>
              ) : (
                <>
                  <div className="font-display text-[22px] font-semibold leading-tight text-verde">
                    O prazo de 30 dias pode ter passado
                  </div>
                  <p className="mt-2 text-[14px] leading-snug text-tinta">
                    Mas não é o fim: dependendo do caso, ainda há caminhos (novo pedido, revisão). Vale
                    conversar.
                  </p>
                </>
              )}

              <a
                href={WA}
                target="_blank"
                rel="noopener"
                className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-[15px] font-bold transition ${
                  resultado.tipo === "vencido"
                    ? "bg-esmeralda text-white hover:bg-esmeralda-cl"
                    : "bg-white text-verde hover:bg-white/90"
                }`}
              >
                {resultado.tipo === "vencido" ? "Ver meu caso mesmo assim" : "Analisar minha carta agora"}
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function calcular(recebida: Date) {
  const limite = new Date(recebida);
  limite.setDate(limite.getDate() + 30);
  const agora = new Date();
  agora.setHours(0, 0, 0, 0);
  const dias = Math.ceil((limite.getTime() - agora.getTime()) / 86_400_000);
  const limiteFmt = limite.toLocaleDateString("pt-BR");
  if (dias < 0) return { tipo: "vencido" as const, dias, limite: limiteFmt };
  if (dias <= 10) return { tipo: "urgente" as const, dias, limite: limiteFmt };
  return { tipo: "no_prazo" as const, dias, limite: limiteFmt };
}
