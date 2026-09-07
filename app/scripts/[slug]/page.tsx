import Link from "next/link";
import { notFound } from "next/navigation";
import { getScriptBySlug, scripts } from "../../../content/scripts-catalog";

export function generateStaticParams(): Array<{ slug: string }> {
  return scripts.map((script) => ({ slug: script.slug }));
}

export default function ScriptDetailPage({ params }: { params: { slug: string } }): JSX.Element {
  const script = getScriptBySlug(params.slug);

  if (!script) {
    notFound();
  }

  return (
    <article className="card">
      <div className="badges" style={{ marginBottom: 8 }}>
        <span className="badge">{script.language}</span>
      </div>
      <h1>{script.title}</h1>
      <p>{script.description}</p>

      <h2>Problema</h2>
      <p>{script.problem}</p>

      <h2>Solución</h2>
      <p>{script.solution}</p>

      <h2>Código</h2>
      <pre className="code-block">
        <code>{script.code}</code>
      </pre>

      <h2>Ejemplo de ejecución</h2>
      <pre className="code-block">
        <code>{script.executionExample}</code>
      </pre>

      <h2>Resultado</h2>
      <p>{script.result}</p>

      <div className="cta-row" style={{ marginTop: 16 }}>
        <Link className="btn btn-ghost" href="/scripts">
          Volver a Scripts
        </Link>
      </div>
    </article>
  );
}
