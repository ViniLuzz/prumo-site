import type { Config } from "tailwindcss";

// Paleta da marca Prumo — a mesma do app e do carrossel.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        verde: "#0F3D2E",       // verde profundo (texto no claro; fundo nas seções escuras)
        "verde-esc": "#0A2E22", // seções escuras mais fundas
        "verde-mid": "#16523d", // cards nas seções escuras
        creme: "#FBFAF7",       // base clara quase branca (off-white sóbrio)
        "creme-dim": "#c9d4cc", // texto claro secundário (usado sobre verde)
        tinta: "#243c33",       // texto secundário sobre a base clara
        linha: "#E6E7E1",       // bordas suaves no claro
        esmeralda: "#0DA96E",   // acento (verde mais fechado, sério)
        "esmeralda-cl": "#0fbd7c",
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
