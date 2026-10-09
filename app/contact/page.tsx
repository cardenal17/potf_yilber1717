import { siteData } from "../../lib/site-data";
import { Bento, BentoCell } from "../../components/ui/bento";
import { Button } from "../../components/ui/button";

export default function ContactPage(): JSX.Element {
  const info = siteData.portfolio.personalInfo;
  const linkedIn = info.linkedin || "https://linkedin.com";
  const github = info.github || "https://github.com";
  const email = info.email || "contact@example.com";
  const phone = info.phone || "";
  const location = info.location || "Bucaramanga, Colombia";

  return (
    <div className="ds-page">
      <section className="ds-hero ds-hero-single">
        <div>
          <span className="ds-eyebrow">Contacto</span>
          <h1 className="ds-gradient-text">Construyamos algo juntos</h1>
          <p className="ds-lead ds-lead-lg">
            Abierto a roles de liderazgo técnico, arquitectura, automatización empresarial y asesorías en BPMN, n8n, agentes IA, DevOps y seguridad.
          </p>
        </div>
      </section>

      <Bento>
        <BentoCell span="md" glow>
          <h3>Canales profesionales</h3>
          <p>Ubicación: {location}</p>
          <p>LinkedIn: <a className="ds-link" href={linkedIn}>{linkedIn}</a></p>
          <p>GitHub: <a className="ds-link" href={github}>{github}</a></p>
          <p>Correo: <a className="ds-link" href={`mailto:${email}`}>{email}</a></p>
          {phone && <p>Teléfono: <a className="ds-link" href={`tel:${phone}`}>{phone}</a></p>}
          <div className="ds-row">
            <Button variant="primary" href={`mailto:${email}`}>Enviar propuesta</Button>
          </div>
        </BentoCell>

        <BentoCell span="md">
          <h3>Formulario</h3>
          <form className="ds-form">
            <label>
              Nombre
              <input name="name" placeholder="Tu nombre" />
            </label>
            <label>
              Correo
              <input name="email" type="email" placeholder="Tu correo" />
            </label>
            <label>
              Mensaje
              <textarea name="message" rows={5} placeholder="Tu mensaje" />
            </label>
            <button className="ds-btn ds-btn-primary" type="submit">Enviar mensaje</button>
          </form>
        </BentoCell>
      </Bento>
    </div>
  );
}
