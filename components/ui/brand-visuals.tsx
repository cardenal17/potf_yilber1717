const palette = [
  ["#c4b5fd", "#f9a8d4"],
  ["#7dd3fc", "#86efac"],
  ["#fdba74", "#f9a8d4"],
  ["#86efac", "#c4b5fd"],
  ["#f9a8d4", "#7dd3fc"]
];

function hash(value: string): number {
  return Array.from(value).reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) >>> 0, 7);
}

export function initials(name: string): string {
  const words = name.split(/\s+/).filter(Boolean);
  return (words.length > 1 ? words[0][0] + words[1][0] : name.slice(0, 2)).toUpperCase();
}

// Monogram tile: avoids shipping third-party trademarked logos.
export function LogoBadge({ name, size = 56 }: { name: string; size?: number }): JSX.Element {
  const [a, b] = palette[hash(name) % palette.length];
  const id = `lb-${name.replace(/\W/g, "")}`;
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" role="img" aria-label={name} className="ds-logo">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={a} />
          <stop offset="1" stopColor={b} />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="54" height="54" rx="16" fill={`url(#${id})`} />
      <text x="28" y="35" textAnchor="middle" fontSize="20" fontWeight="700" fill="#1b1535" fontFamily="inherit">
        {initials(name)}
      </text>
    </svg>
  );
}

// Uses the real logo when available, otherwise a monogram badge.
export function CompanyLogo({ name, logo, size = 56 }: { name: string; logo?: string; size?: number }): JSX.Element {
  if (!logo) return <LogoBadge name={name} size={size} />;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={logo} alt={name} width={size} height={size} loading="lazy" decoding="async" className="ds-company-logo" style={{ width: size, height: size }} />
  );
}

export type IllustrationKind = "network" | "orbit" | "pipeline";

export function AiIllustration({ kind = "network", label }: { kind?: IllustrationKind; label: string }): JSX.Element {
  return (
    <svg viewBox="0 0 400 300" role="img" aria-label={label} className="ds-illustration">
      <defs>
        <linearGradient id={`ai-${kind}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c4b5fd" />
          <stop offset="0.55" stopColor="#f9a8d4" />
          <stop offset="1" stopColor="#fdba74" />
        </linearGradient>
        <radialGradient id={`ai-glow-${kind}`}>
          <stop offset="0" stopColor="#c4b5fd" stopOpacity=".35" />
          <stop offset="1" stopColor="#c4b5fd" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" rx="26" fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.14)" />
      <circle cx="200" cy="150" r="130" fill={`url(#ai-glow-${kind})`} />
      {kind === "network" && (
        <g stroke={`url(#ai-${kind})`} strokeWidth="1.6" fill="none" opacity=".9">
          {[60, 140, 220].flatMap((y1) => [70, 150, 230].map((y2) => <line key={`a${y1}-${y2}`} x1="90" y1={y1 + 20} x2="200" y2={y2 + 10} />))}
          {[70, 150, 230].flatMap((y1) => [100, 200].map((y2) => <line key={`b${y1}-${y2}`} x1="200" y1={y1 + 10} x2="310" y2={y2 + 20} />))}
        </g>
      )}
      {kind === "network" && (
        <g>
          {[80, 160, 240].map((y) => <circle key={`l${y}`} cx="90" cy={y} r="11" fill="#c4b5fd" />)}
          {[80, 160, 240].map((y) => <circle key={`m${y}`} cx="200" cy={y} r="13" fill={`url(#ai-${kind})`} className="ds-pulse-node" />)}
          {[120, 220].map((y) => <circle key={`r${y}`} cx="310" cy={y} r="11" fill="#86efac" />)}
        </g>
      )}
      {kind === "orbit" && (
        <g fill="none" stroke="rgba(255,255,255,.2)">
          <ellipse cx="200" cy="150" rx="140" ry="52" transform="rotate(-20 200 150)" />
          <ellipse cx="200" cy="150" rx="140" ry="52" transform="rotate(35 200 150)" />
          <circle cx="200" cy="150" r="40" fill={`url(#ai-${kind})`} stroke="none" />
          <circle cx="76" cy="120" r="10" fill="#7dd3fc" stroke="none" />
          <circle cx="320" cy="190" r="10" fill="#86efac" stroke="none" />
          <circle cx="250" cy="70" r="8" fill="#fdba74" stroke="none" />
        </g>
      )}
      {kind === "pipeline" && (
        <g>
          {[40, 140, 240].map((x, i) => (
            <rect key={x} x={x + 20} y={i % 2 ? 100 : 150} width="80" height="54" rx="14" fill={i === 1 ? `url(#ai-${kind})` : "rgba(196,181,253,.2)"} stroke="rgba(196,181,253,.6)" />
          ))}
          <path d="M120 177 L160 127 M220 127 L260 177" stroke="#f9a8d4" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="4 6" />
        </g>
      )}
    </svg>
  );
}

