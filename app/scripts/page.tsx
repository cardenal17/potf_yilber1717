"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { scriptCategories, scripts as allScripts } from "../../content/scripts-catalog";
import { FilterChips } from "../../components/filter-chips";

export default function ScriptsPage(): JSX.Element {
  const [activeCategory, setActiveCategory] = useState<string>("todos");

  const filtered = useMemo(() => {
    if (activeCategory === "todos") return allScripts;
    return allScripts.filter((script) => script.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      <div className="section-head">
        <h2>Scripts</h2>
        <p>Python, SQL Oracle, APIs, Laravel/Angular, n8n, RPA, DevOps e IA aplicados a problemas concretos.</p>
      </div>
      <FilterChips
        options={scriptCategories}
        active={activeCategory}
        onChange={setActiveCategory}
        ariaLabel="Filtrar scripts por categoría"
      />
      {filtered.length === 0 ? (
        <p className="muted">Aún no hay scripts en esta categoría.</p>
      ) : (
        <section className="grid grid-2">
          {filtered.map((script) => (
            <article className="card" key={script.slug}>
              <h3>{script.title}</h3>
              <p className="muted">{script.description}</p>
              <div className="badges">
                <span className="badge">{script.language}</span>
              </div>
              <div className="cta-row" style={{ marginTop: 12 }}>
                <Link className="btn btn-primary" href={`/scripts/${script.slug}`}>
                  Ver detalle
                </Link>
              </div>
            </article>
          ))}
        </section>
      )}
    </>
  );
}
