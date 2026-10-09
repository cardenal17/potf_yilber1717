import { getAllPosts } from "../../lib/blog";
import { Bento, BentoCell, Chip } from "../../components/ui/bento";
import { Button } from "../../components/ui/button";

export default function BlogPage(): JSX.Element {
  const posts = getAllPosts();

  return (
    <div className="ds-page">
      <section className="ds-hero ds-hero-single">
        <div>
          <span className="ds-eyebrow">Blog</span>
          <h1 className="ds-gradient-text">Notas de ingeniería</h1>
          <p className="ds-lead ds-lead-lg">Aprendizajes, arquitectura y experiencias en formato Markdown.</p>
        </div>
      </section>
      <Bento>
        {posts.map((post, index) => (
          <BentoCell key={post.slug} span={index === 0 ? "lg" : "sm"} glow={index === 0}>
            <span className="ds-index">{post.date}</span>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            <div>
              {post.tags.map((tag) => (
                <Chip key={tag}>{tag}</Chip>
              ))}
            </div>
            <div className="ds-row">
              <Button href={`/blog/${post.slug}`}>Leer nota</Button>
            </div>
          </BentoCell>
        ))}
      </Bento>
    </div>
  );
}
