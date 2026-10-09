import { journey } from "../../content/journey";
import { aboutNarrative, storyTimeline } from "../../content/about";
import { Bento, BentoCell, Chip, SectionHeader, Stat } from "../../components/ui/bento";
import { Button } from "../../components/ui/button";

export default function AboutPage(): JSX.Element {
  return (
    <div className="ds-page">
      <section className="ds-hero ds-hero-single">
        <div>
          <span className="ds-eyebrow">Sobre mí</span>
          <h1 className="ds-gradient-text">{aboutNarrative.title}</h1>
          <p className="ds-lead ds-lead-lg">{aboutNarrative.subtitle}</p>
          <div className="ds-row">
            <Button variant="primary" href="/contact">Hablemos</Button>
            <Button href="/projects">Ver proyectos</Button>
          </div>
        </div>
      </section>

      <Bento>
        <BentoCell span="sm" glow><Stat value={storyTimeline.length} label="Etapas clave de carrera" /></BentoCell>
        <BentoCell span="sm"><Stat value={journey.length} label="Tecnologías en evolución" /></BentoCell>
        <BentoCell span="sm"><Stat value="∞" label="Curiosidad y aprendizaje continuo" /></BentoCell>
      </Bento>

      <SectionHeader eyebrow="Camino" title="Cómo llegué hasta aquí" />
      <ol className="ds-steps">
        {storyTimeline.map((step, index) => (
          <li key={step} className="ds-step">
            <span className="ds-step-num">{String(index + 1).padStart(2, "0")}</span>
            <h3>{step}</h3>
          </li>
        ))}
      </ol>

      <SectionHeader eyebrow="Stack" title="Evolución técnica" lead="Las herramientas que fui incorporando y por qué." />
      <Bento>
        {journey.map((item, index) => (
          <BentoCell key={`${item.technology}-${item.date}`} span={index % 5 === 0 ? "lg" : "sm"} glow={index === 0}>
            <Chip>{item.date}</Chip>
            <h3>{item.technology}</h3>
            <p>{item.note}</p>
          </BentoCell>
        ))}
      </Bento>
    </div>
  );
}
