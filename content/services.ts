export type Service = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  tags: string[];
};

export const services: Service[] = [
  {
    slug: "bpmn",
    title: "Asesoría en BPMN y DMN",
    tagline: "Procesos de negocio modelados, ejecutables y medibles.",
    description:
      "Levantamiento, modelado y automatización de procesos con BPMN 2.0 y reglas de decisión DMN, apoyado en la experiencia evolucionando el motor de procesos de KUYN.",
    deliverables: ["Mapeo de procesos AS-IS / TO-BE", "Modelos BPMN y tablas DMN", "Estrategia de orquestación y métricas"],
    tags: ["BPMN", "DMN", "Orquestación", "Procesos"]
  },
  {
    slug: "n8n",
    title: "Desarrollo de flujos en n8n",
    tagline: "Automatizaciones robustas que sustituyen tareas manuales.",
    description:
      "Diseño e implementación de workflows con n8n, APIs REST, webhooks y notificaciones, con manejo de errores y reintentos listos para producción.",
    deliverables: ["Workflows documentados", "Nodos y conectores a medida", "Monitoreo y manejo de fallos"],
    tags: ["n8n", "Webhooks", "APIs REST", "Automatización"]
  },
  {
    slug: "agentes-ia",
    title: "Creación de agentes de IA",
    tagline: "Copilotos y agentes que ejecutan tareas reales.",
    description:
      "Agentes con herramientas, memoria y contexto de código o negocio, integrados a tus sistemas y evaluados con criterios de calidad claros.",
    deliverables: ["Arquitectura del agente", "Integración con APIs y datos", "Evaluación y guardrails"],
    tags: ["Agentes IA", "LLM", "MCP", "RAG"]
  },
  {
    slug: "devops",
    title: "Análisis y práctica DevOps",
    tagline: "Entrega continua, observabilidad y despliegues confiables.",
    description:
      "Diagnóstico de pipelines CI/CD, entornos y despliegues, con foco en reducir tiempos de entrega y riesgo operativo.",
    deliverables: ["Diagnóstico de madurez DevOps", "Pipelines CI/CD", "Plan de observabilidad y mejora"],
    tags: ["CI/CD", "Docker", "Observabilidad", "Vercel"]
  },
  {
    slug: "seguridad",
    title: "Seguridad en la plataforma",
    tagline: "Protege accesos, datos e integraciones desde el diseño.",
    description:
      "Revisión de autenticación, autorización, gestión de secretos y exposición de APIs, con recomendaciones priorizadas por riesgo.",
    deliverables: ["Revisión de superficie de ataque", "Gestión de secretos y accesos", "Plan de remediación priorizado"],
    tags: ["Seguridad", "Auth", "Secretos", "OWASP"]
  },
  {
    slug: "integraciones",
    title: "Integraciones con terceros",
    tagline: "Sistemas que conversan sin fricción.",
    description:
      "Integración de plataformas de finanzas, salud, renting y operaciones TI mediante APIs, mensajería y bases de datos, con contratos claros y trazabilidad.",
    deliverables: ["Diseño de contratos de API", "Conectores y transformaciones", "Pruebas y trazabilidad"],
    tags: ["APIs", "Java", "Node.js", "Oracle", "PostgreSQL"]
  },
  {
    slug: "liderazgo",
    title: "Liderazgo de desarrollo y tecnología",
    tagline: "Equipos y arquitectura alineados al negocio.",
    description:
      "Acompañamiento a líderes y equipos en decisiones de arquitectura, prácticas de ingeniería, roadmap técnico y selección de tecnologías.",
    deliverables: ["Roadmap técnico", "Revisiones de arquitectura", "Mentoría y prácticas de equipo"],
    tags: ["Liderazgo", "Arquitectura", "Mentoría", "Roadmap"]
  }
];
