import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "../../../lib/blog";

function renderMarkdown(markdown: string): JSX.Element[] {
  const lines = markdown.split(/\r?\n/);
  const elements: JSX.Element[] = [];
  let listBuffer: string[] = [];

  const flushList = (): void => {
    if (!listBuffer.length) return;
    elements.push(
      <ul key={`list-${elements.length}`}>
        {listBuffer.map((item, index) => (
          <li key={`${item}-${index}`}>{item}</li>
        ))}
      </ul>
    );
    listBuffer = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      continue;
    }

    if (trimmed.startsWith("- ")) {
      listBuffer.push(trimmed.slice(2));
      continue;
    }

    flushList();

    if (trimmed.startsWith("## ")) {
      elements.push(<h2 key={`h2-${elements.length}`}>{trimmed.slice(3)}</h2>);
      continue;
    }

    if (trimmed.startsWith("### ")) {
      elements.push(<h3 key={`h3-${elements.length}`}>{trimmed.slice(4)}</h3>);
      continue;
    }

    elements.push(<p key={`p-${elements.length}`}>{trimmed}</p>);
  }

  flushList();
  return elements;
}

export function generateStaticParams(): Array<{ slug: string }> {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }): JSX.Element {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="card post-content">
      <p className="muted">{post.date}</p>
      <h1>{post.title}</h1>
      <div>{renderMarkdown(post.content)}</div>
    </article>
  );
}
