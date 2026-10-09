import Image from "next/image";
import { statusLabels, type Project } from "../content/project-catalog";
import { Button } from "./ui/button";
import { Chip } from "./ui/bento";

export function ProjectCard({ project }: { project: Project }): JSX.Element {
  return (
    <article className="ds-cell ds-project">
      <Image className="ds-project-media" src={project.coverImage} alt={project.name} width={1400} height={788} />
      <div>
        <Chip>{statusLabels[project.status]}</Chip>
        {project.confidential && <Chip>Confidencial</Chip>}
      </div>
      <h3>{project.name}</h3>
      <p>{project.summary}</p>
      <div>
        {project.technologies.slice(0, 5).map((tech) => (
          <Chip key={tech}>{tech}</Chip>
        ))}
      </div>
      <div className="ds-row">
        <Button variant="primary" href={`/projects/${project.slug}`}>Ver detalle</Button>
        {!project.confidential && project.github && <Button href={project.github}>GitHub</Button>}
        {project.demo && <Button href={project.demo}>Demo</Button>}
      </div>
    </article>
  );
}
