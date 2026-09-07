import Link from "next/link";
import Image from "next/image";
import { highlightProjects } from "../content/projects";
import { recruiterPillars, targetSectors } from "../content/recruiter";
import { siteData, profileFallback } from "../lib/site-data";
import { resumeAssets } from "../content/resume";

function getStartYear(value: string): number | null {
  const match = value.match(/\d{4}/);
  return match ? Number(match[0]) : null;
}

function getExperienceYears(): number {
  const years = siteData.experience
    .map((item) => getStartYear((item as { startDate?: string }).startDate ?? ""))
    .filter((year): year is number => typeof year === "number");

  if (!years.length) return 7;
  const currentYear = new Date().getFullYear();
  return Math.max(currentYear - Math.min(...years), 1);
}

export default function HomePage(): JSX.Element {
  const profile = siteData.portfolio.personalInfo;
  const summary = siteData.portfolio.professionalSummary || profileFallback.tagline;
  const name = profile.fullName || profileFallback.name;
  const headline = profile.headline || profileFallback.role;
  const links = [profile.linkedin, profile.github, profile.website]
    .filter(Boolean)
    .map((url) => ({
      url,
      label: url.includes("linkedin") ? "LinkedIn" : url.includes("github") ? "GitHub" : "Website"
    }));
  const specialties = siteData.skills.length
    ? siteData.skills.slice(0, 6).map((item) => (typeof item === "string" ? item : (item as { name?: string }).name || ""))
    : profileFallback.specialties;
  const years = getExperienceYears();
  const activeProjects = Math.max(siteData.projects.length, highlightProjects.length);
  const experienceList = siteData.experience.slice(0, 3) as Array<{
    company?: string;
    title?: string;
    startDate?: string;
    endDate?: string;
    description?: string;
  }>;

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <div className="hero-left">
            <h1>{name}</h1>

          <div className="hero-text">
            <p className="hero-role">{headline}</p>
            <p className="hero-summary">{summary}</p>
          </div>

            <div className="badges">
              {specialties.filter(Boolean).map((specialty) => (
                <span key={specialty} className="badge">
                  {specialty}
                </span>
              ))}
            </div>

            <div className="cta-row">
              <Link className="btn btn-primary" href="/projects">
                Ver proyectos
              </Link>

              <Link className="btn btn-ghost" href="/contact">
                Agendar conversación
              </Link>

              {resumeAssets[0] && (
                <a className="btn btn-ghost" href={resumeAssets[0].file} download>
                  Descargar CV
                </a>
              )}
            </div>

            {links.length > 0 && (
              <div className="cta-row">
                {links.map((item) => (
                  <a
                    key={item.url}
                    className="btn btn-ghost"
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}

          
          </div>

          <div className="hero-right">
             
            <div className="hero-image">
            <Image
                className="hero-photo"
                src="/images/profile-vector.webp"
                alt={name}
                width={520}
                height={520}
                priority
              />
            </div>
            <div className="badge">
              <span className="status-dot"></span>
              Disponible para proyectos estratégicos y retos de alto impacto
            </div>
              <div className="metric-grid">
              <article className="metric-card">
                <strong>{years}+</strong>
                <span>Años liderando y construyendo software</span>
              </article>

              <article className="metric-card">
                <strong>{activeProjects}</strong>
                <span>Iniciativas de producto y automatización</span>
              </article>

              <article className="metric-card">
                <strong>{targetSectors.length}</strong>
                <span>Sectores empresariales impactados</span>
              </article>
            </div>
          </div>
        </div>
      </section>

      <div className="section-head">
        <h2>Por que es un perfil atractivo para reclutadores</h2>
        <p>Un blend raro: liderazgo tecnico, ejecucion hands-on y foco en resultados de negocio.</p>
      </div>
      <section className="grid grid-3">
        {recruiterPillars.map((pillar) => (
          <article key={pillar.title} className="card">
            <h3>{pillar.title}</h3>
            <p className="muted">{pillar.detail}</p>
          </article>
        ))}
      </section>

      <div className="section-head">
        <h2>Experiencia reciente</h2>
        <p>Rol, contexto y valor aportado en etapas clave de su trayectoria.</p>
      </div>
      <section className="grid">
        {experienceList.map((item, index) => (
          <article key={`${item.company}-${item.title}-${index}`} className="card">
            <h3>{item.title}</h3>
            <p className="muted">
              {item.company} · {item.startDate} - {item.endDate}
            </p>
            <p>{item.description}</p>
          </article>
        ))}
      </section>

      <div className="section-head">
        <h2>Proyectos con impacto</h2>
        <p>No solo codigo: solucion, resultado y aprendizaje aplicado.</p>
      </div>
      <section className="grid grid-2">
        {highlightProjects.slice(0, 2).map((project) => (
          <article key={project.name} className="card">
            <h3>{project.name}</h3>
            <p className="muted">{project.impact}</p>
            <div className="badges">
              {project.technologies.slice(0, 4).map((tech) => (
                <span key={tech} className="badge">
                  {tech}
                </span>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="card recruiter-cta">
        <h2>Buscas un lider tecnico que convierta complejidad en resultados?</h2>
        <p>
          Yilber puede impulsar tu roadmap con arquitectura moderna, automatizacion inteligente y foco en entrega de valor.
        </p>
        <div className="cta-row">
          <Link className="btn btn-primary" href="/contact">
            Contactar ahora
          </Link>
          <Link className="btn btn-ghost" href="/achievements">
            Ver logros
          </Link>
        </div>
      </section>
    </>
  );
}
