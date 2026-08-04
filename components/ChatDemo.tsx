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
    <div ref={ref} className="relative mx-auto w-full max-w-[340px]">
      {/* moldura do celular */}
      <div className="rounded-[2.2rem] border-[10px] border-neutral-900 bg-neutral-900 shadow-2xl shadow-black/40">
        <div className="overflow-hidden rounded-[1.5rem] bg-[#e5ddd5]">
          {/* topo do WhatsApp */}
          <div className="flex items-center gap-2.5 bg-[#075E54] px-3.5 py-3 text-white">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-[#0F3D2E]">
              <Logo size={20} />
            </div>
            <div>
              <div className="text-sm font-semibold leading-tight">Prumo</div>
              <div className="text-[11px] text-white/70">online</div>
            </div>
          </div>
          {/* mensagens */}
          <div className="flex min-h-[380px] flex-col justify-end gap-2 px-3 py-4">
            {ROTEIRO.slice(0, shown).map((m, i) => (
              <Bubble key={i} m={m} />
            ))}
            {typing && <Typing />}
          </div>
        </div>
      </div>
    </div>
  );
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
