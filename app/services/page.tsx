import { services } from "../../content/services";
import { Bento, BentoCell, Chip, SectionHeader } from "../../components/ui/bento";
import { Button } from "../../components/ui/button";

export const metadata = { title: "Asesorías y servicios" };

export default function ServicesPage(): JSX.Element {
  return (
    <div className="ds-page">
      <section className="ds-hero ds-hero-single">
        <div>
          <span className="ds-eyebrow">Asesorías</span>
          <h1 className="ds-gradient-text">Tecnología que convierte complejidad en resultados</h1>
          <p className="ds-lead ds-lead-lg">
            Asesoría y desarrollo en BPMN, n8n, agentes de IA, DevOps, seguridad, integraciones con terceros y liderazgo técnico.
          </p>
          <div className="ds-row">
            <Button variant="primary" href="/contact">Solicitar asesoría</Button>
            <Button href="/projects">Ver casos reales</Button>
          </div>
        </div>
      </section>

      <SectionHeader eyebrow="Qué hago" title="Siete frentes donde puedo aportar" />
      <Bento>
        {services.map((service, index) => (
          <BentoCell key={service.slug} span={index === 0 || index === 3 ? "lg" : "sm"} glow={index === 0}>
            <span className="ds-index">{String(index + 1).padStart(2, "0")}</span>
            <h3>{service.title}</h3>
            <p className="ds-meta">{service.tagline}</p>
            <p>{service.description}</p>
            <ul className="ds-list">
              {service.deliverables.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div>
              {service.tags.map((tag) => (
                <Chip key={tag}>{tag}</Chip>
              ))}
            </div>
          </BentoCell>
        ))}
      </Bento>

      <Bento>
        <BentoCell as="section" span="full" glow className="ds-cta">
          <h2>¿Tienes un reto en mente?</h2>
          <p>Cuéntame el contexto y definimos juntos el alcance de la asesoría.</p>
          <div className="ds-row">
            <Button variant="primary" href="/contact">Agendar conversación</Button>
          </div>
        </BentoCell>
      </Bento>
    </div>
  );
}
