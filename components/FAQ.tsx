"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Reveal } from "./ui";

const PERGUNTAS = [
  {
    q: "Isso é golpe? Como sei que posso confiar?",
    a: "Pergunta justa — golpe de INSS é comum. Por isso a gente nunca pede sua senha do gov.br, nunca acessa sua conta e cobra um valor fixo e transparente, nunca uma porcentagem do seu benefício. Você faz tudo na sua própria conta; a gente só mostra o caminho.",
  },
  {
    q: "Preciso mesmo de advogado pra recorrer?",
    a: "Para a maioria das negativas administrativas, não. O recurso ao INSS é gratuito, feito na sua conta do Meu INSS, e não exige advogado. O Prumo te entrega o recurso pronto e te guia no passo a passo. Se o seu caso for daqueles que realmente precisam ir à Justiça, a gente te diz com honestidade.",
  },
  {
    q: "Quanto custa e quando eu pago?",
    a: "A análise da sua negativa é gratuita. Se o seu caso tiver solução e você quiser o recurso pronto com o passo a passo, o Plano de Ação custa R$79 — pagamento único, sem mensalidade. Você só paga depois de saber que vale a pena.",
  },
  {
    q: "Funciona só para salário-maternidade?",
    a: "Não. O Prumo analisa negativas de vários benefícios: salário-maternidade, auxílio-doença, BPC/LOAS, pensão por morte e auxílio-acidente. Manda a sua carta que a gente identifica o caso.",
  },
  {
    q: "E se eu seguir tudo e mesmo assim for negada de novo?",
    a: "A gente não te abandona na primeira tentativa. Se o INSS indeferir o recurso do seu caso, revisamos junto e vemos o próximo passo possível — sempre com honestidade sobre o que dá e o que não dá pra fazer.",
  },
];

export function FAQ() {
  const [aberta, setAberta] = useState<number | null>(0);
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <div className="mb-4 flex items-center gap-2.5 text-[13px] font-semibold uppercase tracking-wide text-esmeralda">
            <span className="h-px w-6 bg-esmeralda" /> Perguntas frequentes
          </div>
          <h2 className="font-display text-[clamp(30px,4vw,44px)] tracking-tight">
            O que todo mundo pergunta antes de começar.
          </h2>
        </Reveal>
        <div className="mt-12">
          {PERGUNTAS.map((item, i) => {
            const open = aberta === i;
            return (
              <Reveal key={item.q} delay={i * 0.04}>
                <div className="border-b border-creme/10">
                  <button
                    onClick={() => setAberta(open ? null : i)}
                    className="flex w-full items-center justify-between gap-5 py-6 text-left"
                  >
                    <span className="font-display text-xl font-medium text-creme">{item.q}</span>
                    <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }} className="relative h-6 w-6 shrink-0">
                      <span className="absolute left-1/2 top-1/2 h-0.5 w-3.5 -translate-x-1/2 -translate-y-1/2 bg-esmeralda" />
                      <span className="absolute left-1/2 top-1/2 h-3.5 w-0.5 -translate-x-1/2 -translate-y-1/2 bg-esmeralda" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-6 text-base text-creme-dim">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
