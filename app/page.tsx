import Link from "next/link";
import Image from "next/image";
import { highlightProjects } from "../content/projects";
import { recruiterPillars, targetSectors } from "../content/recruiter";
import { siteData, profileFallback } from "../lib/site-data";
import { resumeAssets } from "../content/resume";
import { services } from "../content/services";
import { companies, integrations } from "../content/ecosystem";
import { CompanyLogo, LogoBadge, AiIllustration } from "../components/ui/brand-visuals";
import { Button } from "../components/ui/button";
import { Bento, BentoCell, Chip, SectionHeader, Stat } from "../components/ui/bento";

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
    <div className="ds-page">
      <section className="ds-hero">
        <div>
          <span className="ds-status">
            <i aria-hidden="true" />
            Disponible para proyectos estratégicos y retos de alto impacto
          </span>
          <h1 className="ds-gradient-text">{name}</h1>
          <p className="ds-role">{headline}</p>
          <p className="ds-lead">{summary}</p>
          <div>
            {specialties.filter(Boolean).map((specialty) => (
              <Chip key={specialty}>{specialty}</Chip>
            ))}
          </div>
          <div className="ds-row">
            <Button variant="primary" href="/projects">Ver proyectos</Button>
            <Button href="/contact">Agendar conversación</Button>
            {resumeAssets[0] && (
              <Button href={resumeAssets[0].file} download>Descargar CV</Button>
            )}
          </div>
          {links.length > 0 && (
            <div className="ds-row">
              {links.map((item) => (
                <Button key={item.url} href={item.url}>{item.label}</Button>
              ))}
            </div>
          )}
        </div>
        <div className="ds-portrait">
          <Image src="/images/profile-vector.webp" alt={name} width={520} height={520} priority />
        </div>
      </section>

      <Bento>
        <BentoCell span="sm" glow><Stat value={`${years}+`} label="Años liderando y construyendo software" /></BentoCell>
        <BentoCell span="sm"><Stat value={activeProjects} label="Iniciativas de producto y automatización" /></BentoCell>
        <BentoCell span="sm"><Stat value={targetSectors.length} label="Sectores empresariales impactados" /></BentoCell>
      </Bento>

      <SectionHeader
        eyebrow="Perfil"
        title="Por qué es un perfil atractivo para reclutadores"
        lead="Un blend raro: liderazgo técnico, ejecución hands-on y foco en resultados de negocio."
      />
      <Bento>
        {recruiterPillars.map((pillar, index) => (
          <BentoCell key={pillar.title} span={index === 0 ? "lg" : "sm"} glow={index === 0}>
            <span className="ds-index">{String(index + 1).padStart(2, "0")}</span>
            <h3>{pillar.title}</h3>
            <p>{pillar.detail}</p>
          </BentoCell>
        ))}
      </Bento>

      <SectionHeader
        eyebrow="Trayectoria"
        title="Experiencia reciente"
        lead="Rol, contexto y valor aportado en etapas clave de su trayectoria."
      />
      <Bento>
        {experienceList.map((item, index) => (
          <BentoCell key={`${item.company}-${item.title}-${index}`} span={index === 0 ? "lg" : "sm"}>
            <h3>{item.title}</h3>
            <p className="ds-meta">{item.company} · {item.startDate} - {item.endDate}</p>
            <p>{item.description}</p>
          </BentoCell>
        ))}
      </Bento>

      <SectionHeader
        eyebrow="Trabajo"
        title="Proyectos con impacto"
        lead="No solo código: solución, resultado y aprendizaje aplicado."
      />
      <Bento>
        {highlightProjects.slice(0, 2).map((project, index) => (
          <BentoCell key={project.name} span="md" glow={index === 0}>
            <h3>{project.name}</h3>
            <p>{project.impact}</p>
            <div>
              {project.technologies.slice(0, 4).map((tech) => (
                <Chip key={tech}>{tech}</Chip>
              ))}
            </div>
          </BentoCell>
        ))}
      </Bento>

      <SectionHeader
        eyebrow="Ecosistema"
        title="Empresas e integraciones"
        lead="Contáctame para conocer el detalle de cada experiencia."
      />
      <Bento>
        <BentoCell span="lg" glow>
          <ul className="ds-logo-list">
            {companies.map((c) => (
              <li key={c.name}><CompanyLogo name={c.name} logo={c.logo} size={44} /><span>{c.name}</span></li>
            ))}
          </ul>
          <ul className="ds-logo-list">
            {integrations.map((i) => (
              <li key={i.name}><LogoBadge name={i.name} size={30} /><span>{i.name}</span></li>
            ))}
          </ul>
          <div className="ds-row"><Button variant="primary" href="/ecosystem">Ver ecosistema</Button></div>
        </BentoCell>
        <BentoCell span="sm"><AiIllustration kind="network" label="Red neuronal de agentes de IA" /></BentoCell>
      </Bento>
      <SectionHeader
        eyebrow="Asesorías"
        title="En qué puedo ayudarte"
        lead="BPMN, n8n, agentes de IA, DevOps, seguridad, integraciones y liderazgo técnico."
      />
      <Bento>
        {services.slice(0, 6).map((service) => (
          <BentoCell key={service.slug} span="sm">
            <h3>{service.title}</h3>
            <p>{service.tagline}</p>
          </BentoCell>
        ))}
        <BentoCell span="full" className="ds-row-cell">
          <Button variant="primary" href="/services">Ver todas las asesorías</Button>
        </BentoCell>
      </Bento>
      <Bento>
        <BentoCell as="section" span="full" glow className="ds-cta">
          <h2>¿Buscas un líder técnico que convierta complejidad en resultados?</h2>
          <p>Yilber puede impulsar tu roadmap con arquitectura moderna, automatización inteligente y foco en entrega de valor.</p>
          <div className="ds-row">
            <Button variant="primary" href="/contact">Contactar ahora</Button>
            <Button href="/achievements">Ver logros</Button>
          </div>
        </BentoCell>
      </Bento>
    </div>
  );
}





