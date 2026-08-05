import Link from "next/link";
import { getAllPosts } from "../../lib/blog";

export default function BlogPage(): JSX.Element {
  const posts = getAllPosts();

  return (
    <>
      <div className="section-head">
        <h2>Blog / Notas</h2>
        <p>Aprendizajes, arquitectura y experiencias en formato Markdown.</p>
      </div>
      <section className="grid">
        {posts.map((post) => (
          <article key={post.slug} className="card">
            <p className="muted">{post.date}</p>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            <div className="badges">
              {post.tags.map((tag) => (
                <span key={tag} className="badge">
                  {tag}
                </span>
              ))}
            </div>
            <div style={{ marginTop: 12 }}>
              <Link className="btn btn-ghost" href={`/blog/${post.slug}`}>
                Leer nota
              </Link>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
