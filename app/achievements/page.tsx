import { achievements } from "../../content/achievements";
import { Bento, BentoCell, Chip, SectionHeader, Stat } from "../../components/ui/bento";
import { Button } from "../../components/ui/button";

export default function AchievementsPage(): JSX.Element {
  const techs = new Set(achievements.flatMap((a) => a.technologies));

  return (
    <div className="ds-page">
      <section className="ds-hero ds-hero-single">
        <div>
          <span className="ds-eyebrow">Logros</span>
          <h1 className="ds-gradient-text">Resultados que se pueden medir</h1>
          <p className="ds-lead ds-lead-lg">
            Impacto real en producto, arquitectura, liderazgo e innovación.
          </p>
        </div>
      </section>

      <Bento>
        <BentoCell span="sm" glow><Stat value={achievements.length} label="Hitos destacados" /></BentoCell>
        <BentoCell span="sm"><Stat value={`${techs.size}+`} label="Tecnologías aplicadas" /></BentoCell>
        <BentoCell span="sm"><Stat value="100%" label="Foco en impacto de negocio" /></BentoCell>
      </Bento>

      <SectionHeader eyebrow="Hitos" title="Trayectoria de impacto" />
      <Bento>
        {achievements.map((achievement, index) => (
          <BentoCell
            key={`${achievement.title}-${achievement.date}`}
            span={index % 3 === 0 ? "lg" : "sm"}
            glow={index === 0}
          >
            <span className="ds-index">{achievement.date}</span>
            <h3>{achievement.title}</h3>
            <p>{achievement.description}</p>
            <div>
              {achievement.technologies.map((tech) => (
                <Chip key={tech}>{tech}</Chip>
              ))}
            </div>
            <p className="ds-impact"><strong>Impacto:</strong> {achievement.impact}</p>
          </BentoCell>
        ))}
      </Bento>

      <Bento>
        <BentoCell as="section" span="full" glow className="ds-cta">
          <h2>¿Quieres resultados como estos en tu equipo?</h2>
          <div className="ds-row">
            <Button variant="primary" href="/contact">Contactar ahora</Button>
            <Button href="/projects">Ver proyectos</Button>
          </div>
        </BentoCell>
      </Bento>
    </div>
  );
}
