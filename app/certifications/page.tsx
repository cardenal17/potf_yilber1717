import { certifications } from "../../content/certifications";
import { Bento, BentoCell } from "../../components/ui/bento";
import { Button } from "../../components/ui/button";

export default function CertificationsPage(): JSX.Element {
  return (
    <div className="ds-page">
      <section className="ds-hero ds-hero-single">
        <div>
          <span className="ds-eyebrow">Certificaciones</span>
          <h1 className="ds-gradient-text">Aprendizaje con evidencia</h1>
          <p className="ds-lead ds-lead-lg">Diplomados, cursos y evidencias de aprendizaje aplicado.</p>
        </div>
      </section>
      <Bento>
        {certifications.map((cert, index) => (
          <BentoCell key={`${cert.title}-${cert.date}`} span="md" glow={index === 0}>
            <span className="ds-index">{cert.date}</span>
            <h3>{cert.title}</h3>
            <p className="ds-meta">{cert.institution}</p>
            <p>{cert.description}</p>
            <Button href={cert.evidence}>Ver evidencia</Button>
          </BentoCell>
        ))}
      </Bento>
    </div>
  );
}
