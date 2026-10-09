import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Navigation } from "../components/navigation";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import "./design-system.css";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display-var", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-body-var", display: "swap" });

export const metadata: Metadata = {
  title: "Developer Journey Portfolio",
  description:
    "Historia profesional, proyectos, logros y evolucion tecnologica de un Software Engineer.",
  openGraph: {
    title: "Developer Journey Portfolio",
    description:
      "Trayectoria, innovacion y aprendizaje continuo en ingenieria de software.",
    type: "website"
  },
  metadataBase: new URL("https://example.vercel.app")
};

export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <html lang="es">
      <body className={`${display.variable} ${body.variable}`}>
        <Navigation />
        <main>
          <div className="container-fluid" style={{ margin: "2%" }}>{children}</div>
        </main>
      </body>
    </html>
  );
}

