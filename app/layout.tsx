import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Navigation } from "../components/navigation";
import "./globals.css";

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
      <body>
        <Navigation />
        <main>
          <div className="container-fluid" style={{ margin: "2%" }}>{children}</div>
        </main>
      </body>
    </html>
  );
}
