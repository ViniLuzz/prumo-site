"use client";

import { motion, useInView, useMotionValue, useSpring, animate, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// ── WhatsApp CTA único (todos os botões vão pro mesmo lugar, com msg pré-pronta) ──
export const WA =
  "https://wa.me/553584782795?text=" +
  encodeURIComponent("Olá! Vim pelo site e quero a análise gratuita do meu benefício do INSS");

// ── Logo do Prumo (o P que vira prumo de obra) ──
export function Logo({ size = 34, tone = "#F5F0E6" }: { size?: number; tone?: string }) {
  return (
    <svg width={(size * 60) / 80} height={size} viewBox="0 0 60 80" fill="none" aria-hidden>
      <line x1="20" y1="10" x2="20" y2="48" stroke={tone} strokeWidth="9" strokeLinecap="round" />
      <path d="M20 10 A 14 14 0 1 1 20 34" fill="none" stroke={tone} strokeWidth="9" strokeLinecap="round" />
      <path d="M14 46 L26 46 L29 56 L20 74 L11 56 Z" fill={tone} />
      <circle cx="20" cy="75" r="4" fill="#2BB673" />
    </svg>
  );
}

// ── Reveal on scroll: aparece de baixo pra cima quando entra na viewport ──
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Antes do JS montar (SSR) OU com movimento reduzido: renderiza VISÍVEL.
  // Isso evita conteúdo "preso" invisível se o JS falhar/atrasar e mata o
  // mismatch de hidratação (server e primeiro paint do client são iguais).
  const animar = mounted && !reduce;
  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={animar ? (inView ? { opacity: 1, y: 0 } : { opacity: 0, y }) : { opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Contador que anima de 0 até o valor quando entra na tela ──
export function Counter({
  to,
  suffix = "",
  prefix = "",
  duration = 1.4,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to, duration]);
  return (
    <span ref={ref}>
      {prefix}
      {Math.round(val).toLocaleString("pt-BR")}
      {suffix}
    </span>
  );
}

// ── Botão magnético: "puxa" levemente na direção do cursor (interação 21st.dev-like) ──
export function MagneticButton({
  children,
  href,
  className = "",
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 15 });
  const sy = useSpring(y, { stiffness: 150, damping: 15 });

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener"
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

// ── Seta pra frente (usada nos CTAs) ──
export function Arrow({ color = "#0F3D2E" }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
