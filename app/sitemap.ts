import type { MetadataRoute } from "next";
import { projects } from "../content/project-catalog";
import { scripts } from "../content/scripts-catalog";

const routes = [
  "",
  "/about",
  "/achievements",
  "/projects",
  "/scripts",
  "/journey",
  "/lab",
  "/certifications",
  "/blog",
  "/resume",
  "/contact"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://example.vercel.app";
  const now = new Date();

  const staticRoutes = routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.7
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${base}/projects/${project.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6
  }));

  const scriptRoutes = scripts.map((script) => ({
    url: `${base}/scripts/${script.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5
  }));

  return [...staticRoutes, ...projectRoutes, ...scriptRoutes];
}
