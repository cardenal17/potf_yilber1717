// Modelo de datos independiente de la UI para el Developer Project Gallery / Engineering Lab.
// Agregar un proyecto nuevo = agregar un objeto a `projects`. Ver docs/CONTENT_GUIDE.md.

export type ProjectCategory =
  | "profesional"
  | "software"
  | "automatizacion"
  | "ia"
  | "data-science"
  | "scripts"
  | "arquitectura"
  | "labs";

export type ProjectStatus = "produccion" | "en-progreso" | "prototipo" | "archivado";

export type GalleryImage = {
  src: string;
  alt: string;
};

export type ProjectImageSource =
  | { type: "upload"; images: GalleryImage[] }
  | { type: "drive"; driveFolderId: string };

export type Project = {
  slug: string;
  name: string;
  category: ProjectCategory;
  status: ProjectStatus;
  summary: string;
  coverImage: string;
  technologies: string[];
  confidential?: boolean;
  problem: string;
  solution: string;
  responsibilities: string[];
  architecture: string;
  results: string[];
  learnings: string[];
  github?: string;
  demo?: string;
  imageSource: ProjectImageSource;
};

export const projectCategories: { value: "todos" | ProjectCategory; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "profesional", label: "Profesionales" },
  { value: "software", label: "Software" },
  { value: "automatizacion", label: "Automatización" },
  { value: "ia", label: "IA" },
  { value: "data-science", label: "Data Science" },
  { value: "scripts", label: "Scripts" },
  { value: "arquitectura", label: "Arquitectura" },
  { value: "labs", label: "Labs" }
];

export const statusLabels: Record<ProjectStatus, string> = {
  produccion: "En producción",
  "en-progreso": "En progreso",
  prototipo: "Prototipo",
  archivado: "Archivado"
};

export const projects: Project[] = [
  {
    slug: "kuyn-automatizacion-empresarial",
    name: "KUYN - Automatización de Procesos Empresariales",
    category: "profesional",
    status: "produccion",
    summary: "Motor de procesos empresariales con BPMN/DMN para operaciones robustas y trazables.",
    coverImage: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1400&q=80",
    technologies: ["Python", "Node.js", "BPMN", "DMN", "PostgreSQL"],
    confidential: true,
    problem: "Empresas con procesos manuales, baja trazabilidad y poca escalabilidad operativa.",
    solution:
      "Evolución de un motor de procesos, integraciones entre sistemas y una arquitectura pensada para operaciones empresariales críticas.",
    responsibilities: [
      "Diseño de arquitectura del motor de procesos",
      "Definición de contratos de integración entre sistemas",
      "Liderazgo técnico del equipo de evolución del producto"
    ],
    architecture: "Arquitectura orientada a servicios con motor BPMN/DMN, colas de integración y persistencia en PostgreSQL.",
    results: ["Mejora medible de eficiencia operativa", "Mayor trazabilidad de procesos críticos"],
    learnings: [
      "El modelado de procesos bien definido acelera la evolución del producto.",
      "La integración entre sistemas es clave para escalar operaciones."
    ],
    imageSource: { type: "drive", driveFolderId: "KUYN_DRIVE_FOLDER_ID" }
  },
  {
    slug: "codegraph-motor-contexto",
    name: "CodeGraph - Motor de Contexto para IA",
    category: "arquitectura",
    status: "en-progreso",
    summary: "Grafo de código para indexar proyectos y entregar contexto reducido a agentes LLM.",
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
    technologies: ["TypeScript", "Node.js", "Graph DB", "LLM tooling"],
    problem: "Los agentes de IA pierden precisión y consumen tokens excesivos sin contexto estructurado del código.",
    solution:
      "Indexación de proyectos en un grafo de símbolos y relaciones, con recuperación de contexto curado para reducir tokens y mejorar precisión.",
    responsibilities: ["Diseño del modelo de grafo", "Estrategia de indexación y recuperación de contexto"],
    architecture: "Pipeline: indexar → construir grafo → recuperar contexto → reducir tokens → integrar con LLM.",
    results: ["Reducción de tokens en flujos de agentes", "Recuperación de contexto más precisa que búsqueda manual"],
    learnings: ["MVP primero evita construir componentes que no se necesitan aún."],
    github: "https://github.com/",
    imageSource: { type: "upload", images: [] }
  },
  {
    slug: "ai-agent-copiloto-ingenieria",
    name: "AI Agent - Copiloto de Ingeniería",
    category: "ia",
    status: "prototipo",
    summary: "Agente de IA con contexto técnico controlado para acelerar tareas de desarrollo.",
    coverImage: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1400&q=80",
    technologies: ["Python", "LLM", "RAG", "MCP"],
    problem: "El desarrollo asistido por IA sin contexto curado genera respuestas imprecisas y alto costo en tokens.",
    solution: "Agente con recuperación de contexto (RAG) y herramientas MCP integradas al flujo real de desarrollo.",
    responsibilities: ["Diseño del pipeline de recuperación", "Integración de herramientas MCP"],
    architecture: "RAG sobre documentación y código + orquestación de herramientas vía protocolo MCP.",
    results: ["Menor fricción en tareas repetitivas de desarrollo"],
    learnings: ["La calidad del contexto recuperado importa más que el tamaño del modelo."],
    imageSource: { type: "upload", images: [] }
  },
  {
    slug: "automatizacion-n8n-rpa",
    name: "Automatización Inteligente con n8n y RPA",
    category: "automatizacion",
    status: "produccion",
    summary: "Workflows automatizados y bots RPA para ejecución consistente de procesos repetitivos.",
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
    technologies: ["n8n", "Robot Framework", "Python", "APIs"],
    problem: "Carga manual alta en tareas repetitivas y poca estandarización entre equipos.",
    solution: "Implementación de workflows automatizados y bots RPA para ejecución consistente de procesos.",
    responsibilities: ["Diseño de flujos n8n", "Desarrollo de bots RPA", "Definición de observabilidad de flujo"],
    architecture: "Orquestación de workflows n8n disparando bots RPA con observabilidad centralizada.",
    results: ["Reducción de esfuerzo operativo", "Mejor tiempo de respuesta interna"],
    learnings: [
      "Automatizar bien requiere entender el proceso antes que la herramienta.",
      "La observabilidad del flujo evita cuellos de botella ocultos."
    ],
    imageSource: { type: "drive", driveFolderId: "AUTOMATION_DRIVE_FOLDER_ID" }
  },
  {
    slug: "data-lab-analytics",
    name: "Data Lab - Analítica y Ciencia de Datos",
    category: "data-science",
    status: "en-progreso",
    summary: "Laboratorio de análisis de datos y modelos para soportar decisiones de negocio.",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
    technologies: ["Python", "Pandas", "SQL", "Jupyter"],
    problem: "Datos dispersos y falta de visibilidad analítica para decisiones basadas en evidencia.",
    solution: "Pipelines de limpieza, exploración y modelos analíticos reproducibles.",
    responsibilities: ["Diseño de pipelines de datos", "Análisis exploratorio y modelado"],
    architecture: "Ingesta → limpieza → almacenamiento analítico → notebooks reproducibles → reporting.",
    results: ["Mayor visibilidad de métricas clave de negocio"],
    learnings: ["Reproducibilidad del análisis es tan importante como el resultado."],
    imageSource: { type: "drive", driveFolderId: "DATA_LAB_DRIVE_FOLDER_ID" }
  },
  {
    slug: "developer-journey-portfolio",
    name: "Developer Journey - Portafolio Data-Driven",
    category: "software",
    status: "produccion",
    summary: "Portafolio profesional en Next.js con contenido desacoplado de la interfaz.",
    coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=80",
    technologies: ["Next.js", "TypeScript", "React"],
    problem: "Necesidad de un portafolio mantenible, escalable y fácil de actualizar sin tocar componentes.",
    solution: "Arquitectura App Router con modelos de datos independientes de la UI y componentes reutilizables.",
    responsibilities: ["Arquitectura del proyecto", "Diseño del sistema de contenido"],
    architecture: "Next.js App Router + módulos de contenido en TypeScript/JSON + componentes de presentación reutilizables.",
    results: ["Portafolio fácil de extender sin rehacer secciones existentes"],
    learnings: ["Separar datos de presentación simplifica el crecimiento del proyecto."],
    github: "https://github.com/",
    demo: "https://example.vercel.app",
    imageSource: { type: "upload", images: [] }
  },
  {
    slug: "laboratorio-experimental-ia",
    name: "Laboratorio Experimental de IA",
    category: "labs",
    status: "prototipo",
    summary: "Espacio de experimentación con agentes, RAG y knowledge graphs.",
    coverImage: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?auto=format&fit=crop&w=1400&q=80",
    technologies: ["Python", "LLM", "Knowledge Graphs"],
    problem: "Validar ideas de IA aplicada antes de llevarlas a producción.",
    solution: "Experimentos medibles con métricas claras de éxito o descarte temprano.",
    responsibilities: ["Diseño y ejecución de experimentos"],
    architecture: "Notebooks y prototipos aislados con métricas de evaluación por experimento.",
    results: ["Decisiones más rápidas sobre qué llevar a producción"],
    learnings: ["Descartar rápido una idea es tan valioso como validarla."],
    imageSource: { type: "upload", images: [] }
  },
  {
    slug: "scripts-y-utilidades-tecnicas",
    name: "Scripts y Utilidades Técnicas",
    category: "scripts",
    status: "produccion",
    summary: "Colección de scripts y utilidades para tareas técnicas puntuales. Ver detalle en la sección Scripts.",
    coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=80",
    technologies: ["Python", "SQL", "APIs", "n8n"],
    problem: "Tareas técnicas puntuales que no ameritan un proyecto completo pero sí documentación reutilizable.",
    solution: "Publicación de scripts individuales con problema, solución, código y resultado en /scripts.",
    responsibilities: ["Documentación y mantenimiento de la colección de scripts"],
    architecture: "Catálogo independiente de scripts, cada uno con su propio detalle técnico.",
    results: ["Reutilización rápida de soluciones ya probadas"],
    learnings: ["Documentar el porqué de un script ahorra tiempo futuro."],
    imageSource: { type: "upload", images: [] }
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
