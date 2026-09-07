"use client";

import { useMemo, useState } from "react";
import { projectCategories, projects as allProjects } from "../content/project-catalog";
import { FilterChips } from "./filter-chips";
import { ProjectCard } from "./project-card";

export function ProjectGallery(): JSX.Element {
  const [activeCategory, setActiveCategory] = useState<string>("todos");

  const filtered = useMemo(() => {
    if (activeCategory === "todos") return allProjects;
    return allProjects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      <FilterChips
        options={projectCategories}
        active={activeCategory}
        onChange={setActiveCategory}
        ariaLabel="Filtrar proyectos por categoría"
      />
      {filtered.length === 0 ? (
        <p className="muted">Aún no hay proyectos en esta categoría.</p>
      ) : (
        <section className="grid grid-3">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </section>
      )}
    </>
  );
}
