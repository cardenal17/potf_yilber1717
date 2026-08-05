import { labItems } from "../../content/lab";

export default function LabPage(): JSX.Element {
  return (
    <>
      <div className="section-head">
        
        <h2>Laboratorio IA</h2>
        <p>Un espacio vivo para experimentar, medir y llevar ideas a produccion.</p>
      </div>
      <section className="grid grid-2">
        {labItems.map((item) => (
          <article className="card" key={item.title}>
            <h3>{item.title}</h3>
            <p className="muted">{item.description}</p>
          </article>
        ))}
      </section>
    </>
  );
}
