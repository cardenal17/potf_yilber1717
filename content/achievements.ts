export type Achievement = {
  title: string;
  description: string;
  date: string;
  technologies: string[];
  impact: string;
};

export const achievements: Achievement[] = [
  {
    title: "Diplomado en Ciencia de Datos - Universidad del Rosario",
    description:
      "Finalizacion de diplomado intensivo en Data Processing con enfoque practico en analisis, machine learning, SQL y visualizacion para decisiones basadas en datos.",
    date: "2026-07",
    technologies: ["Python", "SQL", "Machine Learning", "Data Visualization", "Predictive Analytics"],
    impact: "Fortalecimiento de capacidades para disenar soluciones data-driven y resolver problemas de negocio con evidencia cuantitativa." 
  },
  {
    title: "Evolucion del motor de procesos de KUYN",
    description:
      "Liderazgo tecnico y contribucion directa en arquitectura, integraciones y escalabilidad de la plataforma.",
    date: "2022-11 a Actualidad",
    technologies: ["Python", "Node.js", "BPMN", "DMN", "PostgreSQL"],
    impact: "Mayor eficiencia operativa y capacidad de evolucion continua en procesos empresariales." 
  },
  {
    title: "Automatizacion de workflows con n8n",
    description:
      "Diseno de flujos automatizados para procesos de negocio y operaciones de TI.",
    date: "2024-2026",
    technologies: ["n8n", "Node.js", "APIs REST"],
    impact: "Reduccion de tareas manuales y mayor control sobre ciclos operativos." 
  },
  {
    title: "Integraciones empresariales multi-sector",
    description:
      "Implementacion de integraciones robustas para finanzas, salud, renting y operaciones TI.",
    date: "2020-2025",
    technologies: ["Java", "Spring Boot", "Node.js", "Oracle", "PostgreSQL"],
    impact: "Mejor sincronizacion de sistemas y reduccion de friccion operativa." 
  },
  {
    title: "Modelado de procesos con BPMN y DMN",
    description:
      "Estandarizacion de decisiones de negocio y orquestacion de flujos para soluciones escalables.",
    date: "2022-2026",
    technologies: ["BPMN", "DMN", "Arquitectura de Software"],
    impact: "Procesos mas auditables, mantenibles y adaptables al crecimiento." 
  },
  {
    title: "RPA con Robot Framework",
    description:
      "Automatizacion de tareas repetitivas para elevar eficiencia y reducir errores manuales.",
    date: "2023-2026",
    technologies: ["Robot Framework", "Python", "Testing Automatizado"],
    impact: "Mejora del control operativo y del tiempo de ejecucion de procesos clave." 
  },
  {
    title: "Desarrollo de agentes de IA por prompt engineering",
    description:
      "Diseno de agentes para asistencia y automatizacion inteligente en escenarios productivos.",
    date: "2025-2026",
    technologies: ["Prompt Engineering", "LLMs", "Automation"],
    impact: "Mayor velocidad en toma de decisiones y soporte tecnico con mejor contexto." 
  }
];
