import Link from "next/link";
import { ProjectGallery } from "../../components/project-gallery";

export default function ProjectsPage(): JSX.Element {
  return (
    <>
      <div className="section-head">
        <h2>Developer Project Gallery / Engineering Lab</h2>
        <p>Proyectos profesionales, personales, scripts, IA, data science, automatización y arquitectura.</p>
      </div>
      <ProjectGallery />
      <p className="muted" style={{ marginTop: 24 }}>
        ¿Buscas utilidades técnicas puntuales? Revisa la sección{" "}
        <Link href="/scripts">Scripts</Link>.
      </p>
    </>
  );
}
