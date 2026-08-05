import { siteData } from "../../lib/site-data";

export default function ContactPage(): JSX.Element {
  const info = siteData.portfolio.personalInfo;
  const linkedIn = info.linkedin || "https://linkedin.com";
  const github = info.github || "https://github.com";
  const email = info.email || "contact@example.com";
  const phone = info.phone || "";
  const location = info.location || "Bucaramanga, Colombia";

  return (
    <>
      <div className="section-head">
        <h2>Contacto</h2>
        <p>Abierto a roles de liderazgo tecnico, arquitectura y automatizacion empresarial.</p>
      </div>

      <section className="grid grid-2">
        <article className="card">
          <h3>Canales profesionales</h3>
          <p className="muted">Ubicacion: {location}</p>
          <p>
            LinkedIn: <a href={linkedIn}>{linkedIn}</a>
          </p>
          <p>
            GitHub: <a href={github}>{github}</a>
          </p>
          <p>
            Correo: <a href={`mailto:${email}`}>{email}</a>
          </p>
          {phone && (
            <p>
              Telefono: <a href={`tel:${phone}`}>{phone}</a>
            </p>
          )}
          <div className="cta-row" style={{ marginTop: 10 }}>
            <a className="btn btn-primary" href={`mailto:${email}`}>
              Enviar propuesta
            </a>
          </div>
        </article>

        <article className="card">
          <h3>Formulario</h3>
          <form className="contact-form">
            <input name="name" placeholder="Tu nombre" />
            <input name="email" type="email" placeholder="Tu correo" />
            <textarea name="message" rows={6} placeholder="Tu mensaje" />
            <button className="btn btn-primary" type="submit">
              Enviar mensaje
            </button>
          </form>
        </article>
      </section>
    </>
  );
}
