import type { Config } from "tailwindcss";

// Paleta da marca Prumo — a mesma do app e do carrossel.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        verde: "#0F3D2E",       // fundo principal (verde profundo)
        "verde-esc": "#0A2E22", // seções mais fundas
        "verde-mid": "#16523d", // cards
        creme: "#F5F0E6",       // texto/fundo claro (papel)
        "creme-dim": "#c9d4cc", // texto claro secundário
        esmeralda: "#2BB673",   // acento
        "esmeralda-cl": "#3fd389",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
