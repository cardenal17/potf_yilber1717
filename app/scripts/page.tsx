"use client";

import { useMemo, useState } from "react";
import { Button } from "../../components/ui/button";import { Chip } from "../../components/ui/bento";
import { scriptCategories, scripts as allScripts } from "../../content/scripts-catalog";
import { FilterChips } from "../../components/filter-chips";

export default function ScriptsPage(): JSX.Element {
  const [activeCategory, setActiveCategory] = useState<string>("todos");

  const filtered = useMemo(() => {
    if (activeCategory === "todos") return allScripts;
    return allScripts.filter((script) => script.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="ds-page">
      <section className="ds-hero ds-hero-single">
        <div>
          <span className="ds-eyebrow">Scripts</span>
          <h1 className="ds-gradient-text">Utilidades que resuelven problemas concretos</h1>
          <p className="ds-lead ds-lead-lg">
            Python, SQL Oracle, APIs, Laravel/Angular, n8n, RPA, DevOps e IA aplicados.
          </p>
        </div>
      </section>
      <FilterChips
        options={scriptCategories}
        active={activeCategory}
        onChange={setActiveCategory}
        ariaLabel="Filtrar scripts por categoría"
      />
      {filtered.length === 0 ? (
        <p className="ds-lead">Aún no hay scripts en esta categoría.</p>
      ) : (
        <div className="ds-bento">
          {filtered.map((script, index) => (
            <article className={`ds-cell ${index % 3 === 0 ? "ds-span-lg" : "ds-span-sm"}`} key={script.slug}>
              <Chip>{script.language}</Chip>
              <h3>{script.title}</h3>
              <p>{script.description}</p>
              <div className="ds-row">
                <Button variant="primary" href={`/scripts/${script.slug}`}>Ver detalle</Button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
