import Link from "next/link";
import { ProjectGallery } from "../../components/project-gallery";
import { SectionHeader } from "../../components/ui/bento";

export default function ProjectsPage(): JSX.Element {
  return (
    <div className="ds-page">
      <section className="ds-hero ds-hero-single">
        <div>
          <span className="ds-eyebrow">Proyectos</span>
          <h1 className="ds-gradient-text">Engineering Lab</h1>
          <p className="ds-lead ds-lead-lg">
            Proyectos profesionales, personales, scripts, IA, data science, automatización y arquitectura.
          </p>
        </div>
      </section>
      <ProjectGallery />
      <SectionHeader eyebrow="Más" title="¿Buscas utilidades técnicas puntuales?" lead="Revisa la sección de scripts." />
      <p><Link className="ds-btn ds-btn-ghost" href="/scripts">Ir a Scripts</Link></p>
    </div>
  );
}
