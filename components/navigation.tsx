import Link from "next/link";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/about", label: "Mi historia" },
  { href: "/achievements", label: "Logros" },
  { href: "/projects", label: "Proyectos" },
  { href: "/scripts", label: "Scripts" },
  { href: "/journey", label: "Journey" },
  { href: "/lab", label: "Lab IA" },
  { href: "/certifications", label: "Certificaciones" },
  { href: "/blog", label: "Blog" },
  { href: "/resume", label: "CV / Resume" },
  { href: "/contact", label: "Contacto" }
];

export function Navigation(): JSX.Element {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand-mark" aria-label="Ir al inicio">
          <span className="brand-dot" />
          <span>Developer Journey</span>
        </Link>
        <nav className="main-nav" aria-label="Navegacion principal">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
