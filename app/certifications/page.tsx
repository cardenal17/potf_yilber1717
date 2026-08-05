import { certifications } from "../../content/certifications";

export default function CertificationsPage(): JSX.Element {
  return (
    <>
      <div className="section-head">
        <h2>Certificaciones</h2>
        <p>Diplomados, cursos y evidencias de aprendizaje aplicado.</p>
      </div>
      <section className="grid grid-3">
        {certifications.map((cert) => (
          <article key={`${cert.title}-${cert.date}`} className="card">
            <h3>{cert.title}</h3>
            <p className="muted">{cert.institution}</p>
            <p className="muted">{cert.date}</p>
            <p>{cert.description}</p>
            <a className="btn btn-ghost" href={cert.evidence}>
              Ver evidencia
            </a>
          </article>
        ))}
      </section>
    </>
  );
}
