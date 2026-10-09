import { companies, integrations } from "../../content/ecosystem";
import { AiIllustration, CompanyLogo, LogoBadge } from "../../components/ui/brand-visuals";
import { Bento, BentoCell, SectionHeader } from "../../components/ui/bento";
import { Button } from "../../components/ui/button";

export const metadata = { title: "Empresas e integraciones" };

const groups = Array.from(new Set(integrations.map((i) => i.group)));

export default function EcosystemPage(): JSX.Element {
  return (
    <div className="ds-page">
      <section className="ds-hero">
        <div>
          <span className="ds-eyebrow">Ecosistema</span>
          <h1 className="ds-gradient-text">Empresas y plataformas de mi ecosistema</h1>
          <p className="ds-lead">
            Organizaciones y plataformas con las que he tenido contacto en mi trayectoria. Contáctame para conocer el detalle de cada experiencia.
          </p>
          <div className="ds-row">
            <Button variant="primary" href="/contact">Hablemos</Button>
            <Button href="/projects">Ver proyectos</Button>
          </div>
        </div>
        <AiIllustration kind="orbit" label="Ilustración de ecosistema conectado por IA" />
      </section>

      <SectionHeader eyebrow="Empresas" title="Organizaciones" lead="¿Quieres saber más de cada una? Contáctame y te cuento el detalle." />
      <Bento>
        {companies.map((company) => (
          <BentoCell key={company.name} span="sm">
            <div className="ds-company">
              <CompanyLogo name={company.name} logo={company.logo} size={72} />
              <div>
                <h3>{company.name}</h3>
                <a className="ds-link ds-more" href="/contact">Contáctame para más detalle</a>
              </div>
            </div>
          </BentoCell>
        ))}
      </Bento>

      <SectionHeader eyebrow="Integraciones" title="Plataformas e integraciones" lead="Contáctame para conocer el alcance y el detalle de cada una." />
      <Bento>
        {groups.map((group, index) => (
          <BentoCell key={group} span={index === 0 ? "lg" : "sm"} glow={index === 0}>
            <h3>{group}</h3>
            <ul className="ds-logo-list">
              {integrations.filter((i) => i.group === group).map((i) => (
                <li key={i.name}>
                  <LogoBadge name={i.name} size={36} />
                  <span>{i.name}</span>
                </li>
              ))}
            </ul>
          </BentoCell>
        ))}
        <BentoCell span="md"><AiIllustration kind="network" label="Red neuronal que representa agentes de IA" /></BentoCell>
        <BentoCell span="md"><AiIllustration kind="pipeline" label="Pipeline de automatización con IA" /></BentoCell>
      </Bento>
    </div>
  );
}


