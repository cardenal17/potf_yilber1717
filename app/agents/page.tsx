import type { ReactNode } from "react";
import { AgentAvatar, AttributesMock, ChatMock, FlowMock, NoteMock, RulesMock, type AgentKind } from "../../components/ui/agent-visuals";
import { Bento, BentoCell, Chip, SectionHeader } from "../../components/ui/bento";
import { Button } from "../../components/ui/button";

export const metadata = { title: "Agentes de IA" };

const agents: { kind: AgentKind; name: string; text: string; tags: string[] }[] = [
  { kind: "ventas", name: "Agente comercial", text: "Responde, califica y entrega oportunidades listas al equipo.", tags: ["WhatsApp", "CRM", "Calificación"] },
  { kind: "n8n", name: "Agente de automatización", text: "Ejecuta flujos n8n con herramientas, APIs y reintentos.", tags: ["n8n", "Webhooks", "APIs"] },
  { kind: "devops", name: "Agente DevOps", text: "Analiza pipelines, alerta riesgos y propone mejoras de despliegue.", tags: ["CI/CD", "Observabilidad", "Seguridad"] },
  { kind: "bpmn", name: "Agente de procesos", text: "Modela BPMN/DMN y orquesta decisiones de negocio.", tags: ["BPMN", "DMN", "Orquestación"] }
];

const steps: { title: string; text: string; points: string[]; visual: ReactNode }[] = [
  {
    title: "Responde antes de que el contexto se enfríe",
    text: "El agente toma la conversación en segundos, se presenta y empieza a hacer las preguntas que tu equipo necesita para decidir.",
    points: ["Entiende texto y audio", "Tono alineado a tu marca", "Preguntas definidas por ti"],
    visual: <ChatMock />
  },
  {
    title: "Convierte respuestas en datos",
    text: "Cada respuesta se guarda como atributo estructurado, mientras ocurre la conversación y sin digitación manual.",
    points: ["Campos a la medida", "Se llenan en tiempo real", "Visibles en el panel"],
    visual: <AttributesMock />
  },
  {
    title: "Aplica tus reglas de negocio",
    text: "Con los datos, el agente ejecuta reglas: prioriza, etiqueta y asigna según el criterio de tu operación.",
    points: ["Prioridad y etiquetas", "Bandeja ordenada por urgencia", "Historial de cada acción"],
    visual: <RulesMock />
  },
  {
    title: "Resume y pasa al equipo correcto",
    text: "Antes del traspaso deja una nota privada mencionando a la persona indicada, con la conclusión primero.",
    points: ["Mención al equipo", "Resumen accionable", "Asignación automática"],
    visual: <NoteMock />
  },
  {
    title: "Conecta con tus sistemas",
    text: "El resultado se integra con tus plataformas mediante flujos n8n, APIs y notificaciones con trazabilidad.",
    points: ["Integraciones con terceros", "Reintentos y manejo de errores", "Auditoría completa"],
    visual: <FlowMock />
  }
];

export default function AgentsPage(): JSX.Element {
  return (
    <div className="ds-page">
      <section className="ds-hero">
        <div>
          <span className="ds-eyebrow">Agentes de IA</span>
          <h1 className="ds-gradient-text">Empleados digitales que ejecutan trabajo real</h1>
          <p className="ds-lead">
            Diseño agentes con herramientas, memoria y reglas de negocio, integrados a tus sistemas y con guardrails de seguridad.
          </p>
          <div className="ds-row">
            <Button variant="primary" href="/contact">Crear mi agente</Button>
            <Button href="/services">Ver asesorías</Button>
          </div>
        </div>
        <div className="ds-avatar-stack" aria-hidden="false">
          {agents.map((a) => (
            <AgentAvatar key={a.kind} kind={a.kind} size={150} />
          ))}
        </div>
      </section>

      <SectionHeader eyebrow="Equipo" title="Agentes por especialidad" />
      <Bento>
        {agents.map((a, i) => (
          <BentoCell key={a.kind} span={i === 0 ? "lg" : "sm"} glow={i === 0}>
            <AgentAvatar kind={a.kind} size={72} />
            <h3>{a.name}</h3>
            <p>{a.text}</p>
            <div>{a.tags.map((t) => <Chip key={t}>{t}</Chip>)}</div>
          </BentoCell>
        ))}
      </Bento>

      <SectionHeader
        eyebrow="Así trabajan"
        title="Del primer mensaje al resultado entregado"
        lead="Todo caso recorre el mismo camino. A un lado, qué hace el agente; al otro, cómo se ve funcionando."
      />
      <ol className="ds-flow-steps">
        {steps.map((s, i) => (
          <li key={s.title} className="ds-flow-step">
            <div className="ds-flow-copy">
              <span className="ds-step-num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <ul className="ds-list">{s.points.map((p) => <li key={p}>{p}</li>)}</ul>
            </div>
            <div className="ds-flow-visual">{s.visual}</div>
          </li>
        ))}
      </ol>

      <Bento>
        <BentoCell as="section" span="full" glow className="ds-cta">
          <h2>¿Qué tarea quieres que haga tu agente?</h2>
          <p>Cuéntame el proceso y diseñamos el agente, sus reglas y sus integraciones.</p>
          <div className="ds-row"><Button variant="primary" href="/contact">Agendar conversación</Button></div>
        </BentoCell>
      </Bento>
    </div>
  );
}
