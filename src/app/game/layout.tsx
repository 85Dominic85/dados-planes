import type { Metadata, Viewport } from "next"

export const metadata: Metadata = {
  title: "Dados & Planes",
  description:
    "El juego de toma de decisiones para parejas con dados D12. Deja que el azar decida tu plan perfecto.",
  keywords: ["juego de dados", "pareja", "plan", "D12", "decisiones"],
}

// Viewport separado (Next.js 16 requiere que no esté en metadata)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  // Habilita colores de tema para la barra de estado del navegador
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
    { media: "(prefers-color-scheme: light)", color: "#020617" },
  ],
}

export default function GameLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
