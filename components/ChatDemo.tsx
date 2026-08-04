"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./ui";

// Roteiro real e curto do fluxo do Prumo — o mesmo tom do WhatsApp de verdade.
type Msg = { from: "user" | "bot"; text: string; delay: number };
const ROTEIRO: Msg[] = [
  { from: "user", text: "Oi, fui negada no salário-maternidade 😔", delay: 400 },
  { from: "bot", text: "Oi! Sinto muito por isso. 💚 Me manda uma foto da carta que o INSS te enviou?", delay: 1400 },
  { from: "user", text: "📄 carta-inss.pdf", delay: 1300 },
  { from: "bot", text: "Li a sua carta! ✅ Você foi negada por *carência* — sendo MEI.", delay: 1800 },
  { from: "bot", text: "Boa notícia: o STF já derrubou essa exigência pro seu caso. Tem *alta chance* de reverter. 🎯", delay: 1500 },
];

function Bubble({ m }: { m: Msg }) {
  const isUser = m.from === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-[13.5px] leading-snug shadow-sm ${
          isUser
            ? "rounded-br-md bg-[#d9fdd3] text-[#111b21]"
            : "rounded-bl-md bg-white text-[#111b21]"
        }`}
        // negrito do WhatsApp (*assim*) vira <b>
        dangerouslySetInnerHTML={{ __html: m.text.replace(/\*([^*]+)\*/g, "<b>$1</b>") }}
      />
    </motion.div>
  );
}

function Typing() {
  return (
    <div className="flex justify-start">
      <div className="flex gap-1 rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-sm">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-neutral-400"
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </div>
  );
}

export function ChatDemo() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (!inView) return;
    let alive = true;
    (async () => {
      for (let i = 0; i < ROTEIRO.length; i++) {
        if (!alive) return;
        // "digitando" só antes das falas do bot
        if (ROTEIRO[i].from === "bot") {
          setTyping(true);
          await sleep(ROTEIRO[i].delay);
          if (!alive) return;
          setTyping(false);
        } else {
          await sleep(ROTEIRO[i].delay);
        }
        if (!alive) return;
        setShown((n) => n + 1);
      }
    })();
    return () => {
      alive = false;
    };
  }, [inView]);

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[290px]">
      {/* botões laterais (dão o "isso é um celular") */}
      <div className="absolute -left-[3px] top-[110px] h-8 w-[3px] rounded-l bg-neutral-800" />
      <div className="absolute -left-[3px] top-[156px] h-12 w-[3px] rounded-l bg-neutral-800" />
      <div className="absolute -left-[3px] top-[210px] h-12 w-[3px] rounded-l bg-neutral-800" />
      <div className="absolute -right-[3px] top-[170px] h-16 w-[3px] rounded-r bg-neutral-800" />

      {/* moldura do celular: alta e fina, borda grossa, cantos bem arredondados */}
      <div className="relative aspect-[9/19.5] rounded-[2.6rem] border-[11px] border-neutral-900 bg-neutral-900 shadow-2xl shadow-black/40 ring-1 ring-black/20">
        <div className="relative flex h-full flex-col overflow-hidden rounded-[1.8rem] bg-[#e5ddd5]">
          {/* barra de status do celular */}
          <div className="relative z-20 flex items-center justify-between bg-[#075E54] px-6 pt-2 pb-0.5 text-[11px] font-semibold text-white">
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor" aria-hidden><rect x="0" y="7" width="3" height="4" rx="0.5"/><rect x="4" y="5" width="3" height="6" rx="0.5"/><rect x="8" y="3" width="3" height="8" rx="0.5"/><rect x="12" y="1" width="3" height="10" rx="0.5"/></svg>
              <svg width="20" height="11" viewBox="0 0 24 12" fill="none" aria-hidden><rect x="1" y="1" width="20" height="10" rx="2.5" stroke="currentColor" strokeWidth="1"/><rect x="2.5" y="2.5" width="15" height="7" rx="1.2" fill="currentColor"/><rect x="22" y="4" width="1.5" height="4" rx="0.75" fill="currentColor"/></svg>
            </span>
          </div>

          {/* Dynamic Island (a "ilha" preta no topo) */}
          <div className="absolute left-1/2 top-2 z-30 h-[22px] w-[86px] -translate-x-1/2 rounded-full bg-neutral-900" />

          {/* topo do WhatsApp */}
          <div className="flex items-center gap-2.5 bg-[#075E54] px-3.5 pb-3 pt-2 text-white">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-[#0F3D2E]">
              <Logo size={20} />
            </div>
            <div>
              <div className="text-sm font-semibold leading-tight">Prumo</div>
              <div className="text-[11px] text-white/70">online</div>
            </div>
          </div>

          {/* mensagens: começam do topo e vão descendo, como num chat real */}
          <div className="flex flex-1 flex-col justify-start gap-2 overflow-hidden px-3 py-4">
            {ROTEIRO.slice(0, shown).map((m, i) => (
              <Bubble key={i} m={m} />
            ))}
            {typing && <Typing />}
          </div>

          {/* barra de gestos (risquinho embaixo, como no iPhone) */}
          <div className="flex justify-center bg-[#e5ddd5] pb-1.5 pt-1">
            <div className="h-1 w-28 rounded-full bg-neutral-500/40" />
          </div>
        </div>
      </div>
    </div>
  );
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
