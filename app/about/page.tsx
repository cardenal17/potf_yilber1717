import { journey } from "../../content/journey";
import { aboutNarrative, storyTimeline } from "../../content/about";

export default function AboutPage(): JSX.Element {
  return (
    <>
      <div className="section-head">
        <h2>{aboutNarrative.title}</h2>
        <p>{aboutNarrative.subtitle}</p>
      </div>

      <section className="card">
        <div className="timeline">
          {storyTimeline.map((step) => (
            <div className="timeline-item" key={step}>
              <h3>{step}</h3>
            </div>
          ))}
        </div>
      </section>

      <div className="section-head">
        <h2>Evolucion tecnica</h2>
      </div>
      <section className="grid grid-2">
        {journey.map((item) => (
          <article className="card" key={`${item.technology}-${item.date}`}>
            <h3>{item.technology}</h3>
            <p className="muted">{item.date}</p>
            <p>{item.note}</p>
          </article>
        ))}
      </section>
    </>
  );
}
