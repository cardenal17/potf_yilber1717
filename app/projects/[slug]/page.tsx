import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects, statusLabels } from "../../../content/project-catalog";
import { DriveGallery } from "../../../components/drive-gallery";

export function generateStaticParams(): Array<{ slug: string }> {
  return projects.map((project) => ({ slug: project.slug }));
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }): JSX.Element {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="card project-detail">
      <div className="badges" style={{ marginBottom: 8 }}>
        <span className="badge status-badge">{statusLabels[project.status]}</span>
        {project.confidential && <span className="badge confidential-badge">Confidencial</span>}
      </div>
      <h1>{project.name}</h1>
      <Image
        className="project-media"
        src={project.coverImage}
        alt={project.name}
        width={1400}
        height={788}
        priority
      />

      <p>{project.summary}</p>

      <h2>Problema</h2>
      <p>{project.problem}</p>

      <h2>Solución</h2>
      <p>{project.solution}</p>

      <h2>Responsabilidades</h2>
      <ul>
        {project.responsibilities.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2>Arquitectura</h2>
      <p>{project.architecture}</p>

      <h2>Tecnologías</h2>
      <div className="badges">
        {project.technologies.map((tech) => (
          <span key={tech} className="badge">
            {tech}
          </span>
        ))}
      </div>

      <h2>Capturas y evidencias</h2>
      {project.imageSource.type === "drive" ? (
        <DriveGallery folderId={project.imageSource.driveFolderId} />
      ) : project.imageSource.images.length ? (
        <div className="drive-gallery">
          {project.imageSource.images.map((image) => (
            <Image key={image.src} src={image.src} alt={image.alt} width={480} height={320} className="drive-gallery-img" />
          ))}
        </div>
      ) : (
        <p className="muted">Aún no hay capturas cargadas para este proyecto.</p>
      )}

      <h2>Resultados</h2>
      <ul>
        {project.results.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2>Aprendizajes</h2>
      <ul>
        {project.learnings.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      {project.confidential && (
        <p className="muted">
          Proyecto confidencial: el código fuente no se expone públicamente. Se muestra solo información técnica,
          arquitectura y evidencias visuales.
        </p>
      )}

      <div className="cta-row" style={{ marginTop: 16 }}>
        {!project.confidential && project.github && (
          <a className="btn btn-ghost" href={project.github} target="_blank" rel="noreferrer">
            Ver en GitHub
          </a>
        )}
        {project.demo && (
          <a className="btn btn-primary" href={project.demo} target="_blank" rel="noreferrer">
            Ver Demo
          </a>
        )}
        <Link className="btn btn-ghost" href="/projects">
          Volver a Proyectos
        </Link>
      </div>
    </article>
  );
}
