export type CertificationItem = {
  title: string;
  institution: string;
  date: string;
  description: string;
  evidence: string;
};

export const certifications: CertificationItem[] = [
  {
    title: "Diplomado en Ciencia de Datos",
    institution: "Universidad del Rosario",
    date: "2026-05 a 2026-07",
    description:
      "Formacion practica en recoleccion, limpieza, analisis y visualizacion de datos, junto con machine learning, estadistica aplicada y BI para toma de decisiones data-driven.",
    evidence:
      "https://www.linkedin.com/in/yilber-leonel-triana-miranda-249851159/details/education/edit/forms/1239415138/?locale=en"
  },
  {
    title: "Curso de Automatizaciones con n8n",
    institution: "Platzi",
    date: "2026-04",
    description: "Automatizacion de workflows y orquestacion de procesos para escenarios productivos.",
    evidence: "https://platzi.com"
  },
  {
    title: "Fundamentos de Project Management",
    institution: "Platzi",
    date: "2026-03",
    description: "Bases para gestion de proyectos, planificacion y entrega efectiva de valor.",
    evidence: "https://platzi.com"
  },
  {
    title: "Curso Avanzado de Java SE",
    institution: "Platzi",
    date: "2021-05",
    description: "Dominio de conceptos avanzados de Java para desarrollo backend de alto rendimiento.",
    evidence: "https://platzi.com"
  }
];
