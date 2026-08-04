import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Prumo — A negativa do INSS não é a palavra final",
  description:
    "Benefício negado pelo INSS? O Prumo lê sua carta de indeferimento no WhatsApp, explica o motivo real de graça e, se tiver solução, entrega o recurso pronto com passo a passo. Sem senha, preço fixo.",
  metadataBase: new URL("https://www.oprumoapp.com.br"),
  openGraph: {
    title: "Prumo — a negativa do INSS não é a palavra final",
    description:
      "Descubra de graça por que seu benefício foi negado e veja se dá pra reverter. Análise no WhatsApp, sem pedir senha, preço fixo.",
    type: "website",
    url: "https://www.oprumoapp.com.br",
  },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 80'%3E%3Cline x1='20' y1='10' x2='20' y2='48' stroke='%230F3D2E' stroke-width='11' stroke-linecap='round'/%3E%3Cpath d='M20 10 A 14 14 0 1 1 20 34' fill='none' stroke='%230F3D2E' stroke-width='11' stroke-linecap='round'/%3E%3Cpath d='M14 46 L26 46 L29 56 L20 74 L11 56 Z' fill='%230F3D2E'/%3E%3Ccircle cx='20' cy='75' r='5' fill='%232BB673'/%3E%3C/svg%3E",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="bg-verde font-sans text-creme antialiased">{children}</body>
    </html>
  );
}
