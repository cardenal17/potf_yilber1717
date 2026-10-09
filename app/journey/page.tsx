import { journey } from "../../content/journey";
import { Chip } from "../../components/ui/bento";

export default function JourneyPage(): JSX.Element {
  return (
    <div className="ds-page">
      <section className="ds-hero ds-hero-single">
        <div>
          <span className="ds-eyebrow">Journey</span>
          <h1 className="ds-gradient-text">Journey tecnológico</h1>
          <p className="ds-lead ds-lead-lg">Tecnologías aprendidas, fecha aproximada y proyectos donde se aplicaron.</p>
        </div>
      </section>
      <ol className="ds-timeline">
        {journey.map((step) => (
          <li className="ds-timeline-item" key={`${step.technology}-${step.date}`}>
            <span className="ds-timeline-dot" aria-hidden="true" />
            <article className="ds-cell">
              <span className="ds-index">{step.date}</span>
              <h3>{step.technology}</h3>
              <p>{step.note}</p>
              <div>
                {step.appliedIn.map((project) => (
                  <Chip key={project}>{project}</Chip>
                ))}
              </div>
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}
