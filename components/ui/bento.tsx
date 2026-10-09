import type { ReactNode } from "react";

export function Bento({ children, className = "" }: { children: ReactNode; className?: string }): JSX.Element {
  return <div className={`ds-bento ${className}`.trim()}>{children}</div>;
}

type Span = "sm" | "md" | "lg" | "wide" | "tall" | "full";

export function BentoCell({
  children,
  span = "sm",
  glow = false,
  className = "",
  as: Tag = "article"
}: {
  children: ReactNode;
  span?: Span;
  glow?: boolean;
  className?: string;
  as?: "article" | "div" | "section";
}): JSX.Element {
  return <Tag className={`ds-cell ds-span-${span} ${glow ? "ds-glow" : ""} ${className}`.trim()}>{children}</Tag>;
}

export function Chip({ children }: { children: ReactNode }): JSX.Element {
  return <span className="ds-chip">{children}</span>;
}

export function Stat({ value, label }: { value: ReactNode; label: string }): JSX.Element {
  return (
    <div className="ds-stat">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

export function SectionHeader({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }): JSX.Element {
  return (
    <header className="ds-section-head">
      <span className="ds-eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {lead && <p>{lead}</p>}
    </header>
  );
}
