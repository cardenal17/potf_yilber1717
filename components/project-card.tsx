import Image from "next/image";
import Link from "next/link";
import { statusLabels, type Project } from "../content/project-catalog";

export function ProjectCard({ project }: { project: Project }): JSX.Element {
  return (
    <article className="card project-card">
      <Image
        className="project-media"
        src={project.coverImage}
        alt={project.name}
        width={1400}
        height={788}
      />
      <div className="badges" style={{ marginBottom: 8 }}>
        <span className="badge status-badge">{statusLabels[project.status]}</span>
        {project.confidential && <span className="badge confidential-badge">Confidencial</span>}
      </div>
      <h3>{project.name}</h3>
      <p className="muted">{project.summary}</p>
      <div className="badges">
        {project.technologies.slice(0, 5).map((tech) => (
          <span key={tech} className="badge">
            {tech}
          </span>
        ))}
      </div>
      <div className="cta-row" style={{ marginTop: 12 }}>
        <Link className="btn btn-primary" href={`/projects/${project.slug}`}>
          Ver detalle
        </Link>
        {!project.confidential && project.github && (
          <a className="btn btn-ghost" href={project.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        )}
        {project.demo && (
          <a className="btn btn-ghost" href={project.demo} target="_blank" rel="noreferrer">
            Demo
          </a>
        )}
      </div>
    </article>
  );
}
