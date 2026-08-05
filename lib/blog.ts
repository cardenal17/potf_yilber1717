import { readFileSync, readdirSync } from "node:fs";
import { join, resolve, sep } from "node:path";

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  content: string;
};

const postsDir = join(process.cwd(), "content", "posts");
const safePostsDir = resolve(postsDir);

function parseFrontmatter(markdown: string): { meta: Record<string, string>; body: string } {
  if (!markdown.startsWith("---")) {
    return { meta: {}, body: markdown };
  }

  const end = markdown.indexOf("\n---", 3);
  if (end === -1) {
    return { meta: {}, body: markdown };
  }

  const raw = markdown.slice(3, end).trim();
  const body = markdown.slice(end + 4).trim();
  const meta: Record<string, string> = {};

  for (const line of raw.split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    meta[key] = value;
  }

  return { meta, body };
}

function safeJoinPosts(fileName: string): string {
  const resolved = resolve(safePostsDir, fileName);
  const rootWithSep = safePostsDir.endsWith(sep) ? safePostsDir : `${safePostsDir}${sep}`;

  if (resolved === safePostsDir || resolved.startsWith(rootWithSep)) {
    return resolved;
  }

  throw new Error("Ruta de post invalida");
}

export function getAllPosts(): BlogPost[] {
  const files = readdirSync(safePostsDir).filter((file) => file.endsWith(".md"));

  return files
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const content = readFileSync(safeJoinPosts(file), "utf8");
      const { meta, body } = parseFrontmatter(content);
      const tags = meta.tags ? meta.tags.split(",").map((tag) => tag.trim()) : [];

      return {
        slug,
        title: meta.title ?? slug,
        date: meta.date ?? "",
        excerpt: meta.excerpt ?? "",
        tags,
        content: body
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}
