import { resumeAssets } from "../../content/resume";
import { Bento, BentoCell } from "../../components/ui/bento";
import { Button } from "../../components/ui/button";

export default function ResumePage(): JSX.Element {
  return (
    <div className="ds-page">
      <section className="ds-hero ds-hero-single">
        <div>
          <span className="ds-eyebrow">Currículum</span>
          <h1 className="ds-gradient-text">Curriculum / Resume</h1>
          <p className="ds-lead ds-lead-lg">Descarga la versión en español o en inglés, siempre actualizada.</p>
        </div>
      </section>
      <Bento>
        {resumeAssets.map((asset, index) => (
          <BentoCell key={asset.locale} span="md" glow={index === 0}>
            <span className="ds-index">{asset.locale.toUpperCase()}</span>
            <h3>{asset.label}</h3>
            <p>Última actualización: {asset.updatedAt}</p>
            <div className="ds-row">
              <Button variant="primary" href={asset.file} download>Descargar PDF</Button>
            </div>
          </BentoCell>
        ))}
      </Bento>
    </div>
  );
}
