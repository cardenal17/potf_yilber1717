import type { MetadataRoute } from "next";

const routes = [
  "",
  "/about",
  "/achievements",
  "/projects",
  "/journey",
  "/lab",
  "/certifications",
  "/blog",
  "/contact"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://example.vercel.app";
  const now = new Date();

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7
  }));
}
