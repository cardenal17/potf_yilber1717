import { resumeAssets } from "../../content/resume";

export default function ResumePage(): JSX.Element {
  return (
    <>
      <div className="section-head">
        <h2>Curriculum / Resume</h2>
        <p>Descarga la versión en español o en inglés, siempre actualizada.</p>
      </div>
      <section className="grid grid-2">
        {resumeAssets.map((asset) => (
          <article className="card" key={asset.locale}>
            <h3>{asset.label}</h3>
            <p className="muted">Última actualización: {asset.updatedAt}</p>
            <div className="cta-row" style={{ marginTop: 12 }}>
              <a className="btn btn-primary" href={asset.file} download>
                Descargar PDF
              </a>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
