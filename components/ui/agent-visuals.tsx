"use client";

import { useEffect, useRef, useState } from "react";

export type AgentKind = "ventas" | "n8n" | "devops" | "bpmn";

const palettes: Record<AgentKind, [string, string]> = {
  ventas: ["#c4b5fd", "#f9a8d4"],
  n8n: ["#7dd3fc", "#86efac"],
  devops: ["#fdba74", "#f9a8d4"],
  bpmn: ["#86efac", "#c4b5fd"]
};

export function AgentAvatar({ kind = "ventas", size = 120 }: { kind?: AgentKind; size?: number }): JSX.Element {
  const [a, b] = palettes[kind];
  const id = `g-${kind}`;
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" role="img" aria-label={`Agente IA ${kind}`} className="ds-avatar">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={a} />
          <stop offset="1" stopColor={b} />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="108" height="108" rx="32" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.18)" />
      <line x1="60" y1="20" x2="60" y2="32" stroke={`url(#${id})`} strokeWidth="4" strokeLinecap="round" />
      <circle cx="60" cy="17" r="5" fill={`url(#${id})`} />
      <rect x="24" y="32" width="72" height="56" rx="22" fill={`url(#${id})`} />
      <rect x="34" y="44" width="52" height="32" rx="14" fill="#15162b" />
      <circle cx="49" cy="60" r="6" fill={a} />
      <circle cx="71" cy="60" r="6" fill={b} />
      <path d="M52 70 Q60 76 68 70" stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none" opacity=".8" />
      <rect x="40" y="94" width="40" height="8" rx="4" fill={`url(#${id})`} opacity=".5" />
    </svg>
  );
}

const script = [
  { from: "client", text: "Hola, necesito automatizar la aprobación de facturas." },
  { from: "agent", text: "¡Hola! Soy el agente de procesos. ¿Cuántas áreas intervienen hoy?" },
  { from: "client", text: "Tres: compras, finanzas y legal." },
  { from: "agent", text: "Perfecto. Lo modelo en BPMN y dejo la regla de aprobación en DMN." }
] as const;

export function ChatMock(): JSX.Element {
  const [count, setCount] = useState(1);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setCount(script.length);
      return;
    }
    const el = ref.current;
    if (!el) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !timer) {
        timer = setInterval(() => setCount((c) => (c < script.length ? c + 1 : c)), 1100);
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer) clearInterval(timer);
    };
  }, []);

  return (
    <div className="ds-mock" ref={ref} aria-label="Ejemplo de conversación con un agente">
      <div className="ds-mock-bar"><i /><i /><i /><span>Conversación · en vivo</span></div>
      <div className="ds-chat" aria-live="polite">
        {script.slice(0, count).map((m, i) => (
          <p key={i} className={`ds-msg ds-msg-${m.from}`}>{m.text}</p>
        ))}
      </div>
    </div>
  );
}

export function AttributesMock(): JSX.Element {
  const rows = [
    ["Proceso", "Aprobación de facturas"],
    ["Áreas", "Compras · Finanzas · Legal"],
    ["Urgencia", "Alta"]
  ];
  return (
    <div className="ds-mock">
      <div className="ds-mock-bar"><i /><i /><i /><span>Atributos del caso</span></div>
      <dl className="ds-attrs">
        {rows.map(([k, v], i) => (
          <div key={k} style={{ animationDelay: `${i * 0.25}s` }}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function RulesMock(): JSX.Element {
  return (
    <div className="ds-mock">
      <div className="ds-mock-bar"><i /><i /><i /><span>Reglas y prioridad</span></div>
      <div className="ds-rules">
        <div><span>Agente</span><b>Procesos IA</b></div>
        <div><span>Equipo</span><b>Arquitectura</b></div>
        <div><span>Prioridad</span><b className="ds-pill ds-pill-hot">Alta</b></div>
        <div><span>Etiquetas</span><b><span className="ds-pill">BPMN</span> <span className="ds-pill">n8n</span></b></div>
      </div>
    </div>
  );
}

export function NoteMock(): JSX.Element {
  return (
    <div className="ds-mock">
      <div className="ds-mock-bar"><i /><i /><i /><span>Nota privada</span></div>
      <div className="ds-note">
        <p><b>@equipo-arquitectura</b></p>
        <p>Cliente con flujo de facturas en tres áreas. Necesita modelo BPMN, reglas DMN y alertas por n8n. Vale la pena llamarlo hoy.</p>
      </div>
    </div>
  );
}

export function FlowMock(): JSX.Element {
  const nodes = ["Webhook", "Agente IA", "Regla DMN", "Notificación"];
  return (
    <div className="ds-mock">
      <div className="ds-mock-bar"><i /><i /><i /><span>Flujo n8n</span></div>
      <div className="ds-flow">
        {nodes.map((n, i) => (
          <div key={n} className="ds-flow-node">
            <span>{n}</span>
            {i < nodes.length - 1 && <em aria-hidden="true" />}
          </div>
        ))}
      </div>
    </div>
  );
}
