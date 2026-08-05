import Image from "next/image";
import { highlightProjects } from "../../content/projects";

export default function ProjectsPage(): JSX.Element {
  return (
    <>
      <div className="section-head">
        <h2>Proyectos</h2>
        <p>Problema, solucion, impacto y aprendizajes en cada iniciativa.</p>
      </div>
      <section className="grid">
        {highlightProjects.map((project) => (
          <article className="card" key={project.name}>
            <h3>{project.name}</h3>
            <Image
              className="project-media"
              src={project.image}
              alt={project.name}
              width={1400}
              height={788}
            />
            <p>
              <strong>Problema:</strong> {project.problem}
            </p>
            <p>
              <strong>Solucion:</strong> {project.solution}
            </p>
            <p>
              <strong>Impacto:</strong> {project.impact}
            </p>
            <div className="badges">
              {project.technologies.map((tech) => (
                <span key={tech} className="badge">
                  {tech}
                </span>
              ))}
            </div>
            <div className="cta-row" style={{ marginTop: 12 }}>
              {project.links.map((link) => (
                <a key={link.label} className="btn btn-ghost" href={link.url}>
                  {link.label}
                </a>
              ))}
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
