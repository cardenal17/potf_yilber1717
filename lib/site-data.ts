import portfolio from "../data/portfolio.json";
import projects from "../data/projects.json";
import experience from "../data/experience.json";
import skills from "../data/skills.json";
import social from "../data/social.json";

export const siteData = {
  portfolio,
  projects,
  experience,
  skills,
  social
};

export const profileFallback = {
  name: "Tu Nombre",
  role: "Software Engineer",
  specialties: ["Arquitectura de software", "Aplicaciones empresariales", "Integracion IA"],
  tagline:
    "Software Engineer especializado en arquitectura de software, aplicaciones empresariales e integracion de inteligencia artificial."
};
