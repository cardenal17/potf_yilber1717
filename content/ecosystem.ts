export type Company = { name: string; logo?: string };
export type Integration = { name: string; group: "Mensajería" | "IA" | "Automatización" | "Datos y riesgo" | "Seguridad" | "Procesos" };

export const companies: Company[] = [
  { name: "Davivienda", logo: "/logos/davivienda.png" },
  { name: "Foscal", logo: "/logos/foscal.png" },
  { name: "Inklusiva", logo: "/logos/inklusiva.png" },
  { name: "Rentandes", logo: "/logos/rentandes.png" },
  { name: "Gexterra" },
  { name: "Gexterraone" },
  { name: "Nuwwe" },
  { name: "Metatelco", logo: "/logos/metatelco.png" },
  { name: "JFK", logo: "/logos/jfk.png" },
];
export const integrations: Integration[] = [
  { name: "Gmail", group: "Mensajería" },
  { name: "WhatsApp", group: "Mensajería" },
  { name: "Mailjet", group: "Mensajería" },
  { name: "n8n", group: "Automatización" },
  { name: "Robot Framework", group: "Automatización" },
  { name: "BPMN", group: "Procesos" },
  { name: "Gemini", group: "IA" },
  { name: "ChatGPT", group: "IA" },
  { name: "Claude", group: "IA" },
  { name: "Superintendencia", group: "Datos y riesgo" },
  { name: "Tusdatos", group: "Datos y riesgo" },
  { name: "Experian", group: "Datos y riesgo" },
  { name: "SIGO", group: "Datos y riesgo" },
  { name: "Aikido", group: "Seguridad" }
];

