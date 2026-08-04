// Fundo VERDE TEXTURIZADO (o "material" premium, estilo Clairis) — não é cor
// chapada. Três camadas empilhadas dão profundidade:
//   1. gradiente diagonal entre dois tons de verde
//   2. glows radiais (manchas de luz suave) que dão dimensão e brilho
//   3. textura de ruído fina por cima (o "grão" que tira a chapa lisa)
// Uso: <section className="relative ..."> <VerdeTextura/> <conteúdo/> </section>
// (o conteúdo precisa de `relative z-10` pra ficar acima das camadas).

export function VerdeTextura({ forte = false }: { forte?: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* 1. base + gradiente diagonal (verde profundo → verde levemente mais claro) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A2E22] via-[#0F3D2E] to-[#134736]" />

      {/* 2. glows radiais — luz suave vindo de dois cantos, dá dimensão */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 78% 12%, rgba(13,169,110,0.18), transparent 60%)," +
            "radial-gradient(50% 50% at 12% 88%, rgba(13,169,110,0.10), transparent 65%)",
        }}
      />
      {forte && (
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(40% 40% at 50% 0%, rgba(63,211,137,0.14), transparent 70%)",
          }}
        />
      )}

      {/* 3. textura de ruído fina (SVG feTurbulence) — o "grão" do material */}
      <div
        className="absolute inset-0 opacity-[0.055] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "160px 160px",
        }}
      />
    </div>
  );
}
