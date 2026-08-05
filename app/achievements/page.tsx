import { achievements } from "../../content/achievements";

export default function AchievementsPage(): JSX.Element {
  return (
    <>
      <div className="section-head">
        <h2>Logros</h2>
        <p>Resultados medibles en producto, arquitectura, liderazgo e innovacion.</p>
      </div>
      <section className="grid grid-2">
        {achievements.map((achievement) => (
          <article className="card" key={`${achievement.title}-${achievement.date}`}>
            <h3>{achievement.title}</h3>
            <p className="muted">{achievement.date}</p>
            <p>{achievement.description}</p>
            <div className="badges">
              {achievement.technologies.map((tech) => (
                <span className="badge" key={tech}>
                  {tech}
                </span>
              ))}
            </div>
            <p>
              <strong>Impacto:</strong> {achievement.impact}
            </p>
          </article>
        ))}
      </section>
    </>
  );
}
