import { journey } from "../../content/journey";

export default function JourneyPage(): JSX.Element {
  return (
    <>
      <div className="section-head">
        <h2>Journey tecnologico</h2>
        <p>Tecnologias aprendidas, fecha aproximada y proyectos donde se aplicaron.</p>
      </div>
      <section className="card">
        <div className="timeline">
          {journey.map((step) => (
            <article className="timeline-item" key={`${step.technology}-${step.date}`}>
              <h3>{step.technology}</h3>
              <p className="muted">{step.date}</p>
              <p>{step.note}</p>
              <div className="badges">
                {step.appliedIn.map((project) => (
                  <span className="badge" key={project}>
                    {project}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
