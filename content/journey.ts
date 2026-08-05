export type JourneyStep = {
  technology: string;
  date: string;
  appliedIn: string[];
  note: string;
};

export const journey: JourneyStep[] = [
  {
    technology: "PHP / Laravel / Symfony / CodeIgniter",
    date: "2018",
    appliedIn: ["Sistemas administrativos", "Aplicaciones de negocio"],
    note: "Base solida en backend y buenas practicas de desarrollo mantenible." 
  },
  {
    technology: "Angular",
    date: "2019",
    appliedIn: ["Dashboards operativos", "Frontends empresariales"],
    note: "Interfaces enfocadas en productividad y flujos de trabajo reales." 
  },
  {
    technology: "Node.js / Java (Spring Boot)",
    date: "2020",
    appliedIn: ["Integraciones empresariales", "Servicios de negocio"],
    note: "Construccion de APIs robustas para conectar sistemas criticos." 
  },
  {
    technology: "Testing y monitoreo de datos",
    date: "2021",
    appliedIn: ["Control de calidad", "Analitica operativa"],
    note: "Mayor confiabilidad de entregas y deteccion temprana de fallos." 
  },
  {
    technology: "BPMN / DMN y arquitectura escalable",
    date: "2022",
    appliedIn: ["KUYN", "Motores de procesos"],
    note: "Modelado de procesos y decisiones para plataformas de alto impacto." 
  },
  {
    technology: "n8n / Robot Framework",
    date: "2023-2026",
    appliedIn: ["Automatizacion empresarial", "RPA"],
    note: "Automatizacion de workflows y procesos repetitivos con foco en eficiencia." 
  },
  {
    technology: "IA aplicada y Prompt Engineering",
    date: "2025-2026",
    appliedIn: ["Agentes IA", "Asistencia tecnica", "Orquestacion inteligente"],
    note: "Uso de IA para acelerar decisiones tecnicas y evolucion de producto." 
  }
];
