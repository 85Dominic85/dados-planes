import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata, Viewport } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dados & Planes",
  description:
    "El juego de toma de decisiones para parejas con dados D12. Deja que el azar decida tu plan perfecto.",
  keywords: ["juego de dados", "pareja", "plan", "D12", "decisiones"],
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Dados & Planes",
    title: "Dados & Planes",
    description:
      "El juego de toma de decisiones para parejas con dados D12. Deja que el azar decida tu plan perfecto.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dados & Planes",
    description:
      "El juego de toma de decisiones para parejas con dados D12.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
    { media: "(prefers-color-scheme: light)", color: "#020617" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
