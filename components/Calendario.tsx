"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

// Calendário customizado (nada de <input type="date"> feio): grade do mês,
// navegação com animação, dia selecionado em verde, hover nos dias, dias
// futuros bloqueados (a carta não pode ter chegado no futuro).

const MESES = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
const DIAS_SEMANA = ["D", "S", "T", "Q", "Q", "S", "S"];

function mesmaData(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export function Calendario({
  selecionada,
  onSelect,
}: {
  selecionada: Date | null;
  onSelect: (d: Date) => void;
}) {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  // abre no mês da data já escolhida (se houver); senão, no mês atual
  const inicial = selecionada ?? hoje;
  const [visto, setVisto] = useState(() => new Date(inicial.getFullYear(), inicial.getMonth(), 1));
  const [dir, setDir] = useState(1);

  const ano = visto.getFullYear();
  const mes = visto.getMonth();
  const primeiroDiaSemana = new Date(ano, mes, 1).getDay(); // 0=domingo
  const diasNoMes = new Date(ano, mes + 1, 0).getDate();
  // não deixa navegar pra meses futuros (sem sentido — a carta é do passado)
  const noMesAtual = ano === hoje.getFullYear() && mes === hoje.getMonth();

  function mudarMes(delta: number) {
    if (delta > 0 && noMesAtual) return;
    setDir(delta);
    setVisto(new Date(ano, mes + delta, 1));
  }

  const celulas: (Date | null)[] = [];
  for (let i = 0; i < primeiroDiaSemana; i++) celulas.push(null);
  for (let d = 1; d <= diasNoMes; d++) celulas.push(new Date(ano, mes, d));

  return (
    <div className="select-none">
      {/* cabeçalho: mês/ano + navegação */}
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={() => mudarMes(-1)}
          className="grid h-9 w-9 place-items-center rounded-full text-verde transition hover:bg-verde/8"
          aria-label="Mês anterior"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <div className="overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${ano}-${mes}`}
              initial={{ opacity: 0, x: dir * 14 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -14 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="text-center font-display text-lg font-semibold text-verde"
            >
              {MESES[mes]} <span className="text-tinta/60">{ano}</span>
            </motion.div>
          </AnimatePresence>
        </div>
        <button
          onClick={() => mudarMes(1)}
          disabled={noMesAtual}
          className="grid h-9 w-9 place-items-center rounded-full text-verde transition hover:bg-verde/8 disabled:cursor-not-allowed disabled:opacity-25"
          aria-label="Próximo mês"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>

      {/* dias da semana */}
      <div className="mb-2 grid grid-cols-7 text-center text-[11px] font-semibold uppercase tracking-wide text-tinta/50">
        {DIAS_SEMANA.map((d, i) => (
          <div key={i}>{d}</div>
        ))}
      </div>

      {/* grade de dias */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`grid-${ano}-${mes}`}
          initial={{ opacity: 0, x: dir * 14 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: dir * -14 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="grid grid-cols-7 gap-1"
        >
          {celulas.map((data, i) => {
            if (!data) return <div key={i} />;
            const futuro = data > hoje;
            const sel = selecionada && mesmaData(data, selecionada);
            const ehHoje = mesmaData(data, hoje);
            return (
              <button
                key={i}
                disabled={futuro}
                onClick={() => onSelect(data)}
                className={[
                  "relative mx-auto grid h-9 w-9 place-items-center rounded-full text-[14px] font-medium transition",
                  futuro ? "cursor-not-allowed text-neutral-300" : "text-verde hover:bg-esmeralda/12",
                  sel ? "!bg-esmeralda !text-white shadow-md shadow-esmeralda/30" : "",
                ].join(" ")}
              >
                {data.getDate()}
                {ehHoje && !sel && (
                  <span className="absolute bottom-1 h-1 w-1 rounded-full bg-esmeralda" />
                )}
              </button>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
