const common = {
  viewBox: "0 0 32 32",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinejoin: "miter" as const,
  strokeLinecap: "square" as const,
};

function Svg({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <svg {...common} className={className} aria-hidden>
      {children}
    </svg>
  );
}

export const sectorIcons: Array<(props: { className?: string }) => React.ReactElement> = [
  // Government institutions — columns
  ({ className }) => (
    <Svg className={className}>
      <path d="M4 27 H28 M6 27 V13 M11 27 V13 M16 27 V13 M21 27 V13 M26 27 V13 M3 13 L16 5 L29 13 Z" />
    </Svg>
  ),
  // Holding companies & investment groups — connected nodes
  ({ className }) => (
    <Svg className={className}>
      <circle cx="9" cy="9" r="4" />
      <circle cx="23" cy="9" r="4" opacity={0.6} />
      <circle cx="16" cy="24" r="4" opacity={0.8} />
      <path d="M12.5 11 L19.5 11 M11 12.5 L14 20 M21 12.5 L18 20" opacity={0.5} />
    </Svg>
  ),
  // Manufacturing & production — gear
  ({ className }) => (
    <Svg className={className}>
      <circle cx="16" cy="16" r="6" />
      <path d="M16 4 V8 M16 24 V28 M4 16 H8 M24 16 H28 M7 7 L10 10 M22 22 L25 25 M25 7 L22 10 M10 22 L7 25" />
    </Svg>
  ),
  // Oil & services — droplet
  ({ className }) => (
    <Svg className={className}>
      <path d="M16 4 L24 18 A8 8 0 1 1 8 18 Z" />
    </Svg>
  ),
  // Pharma & medical equipment — cross
  ({ className }) => (
    <Svg className={className}>
      <rect x="4" y="4" width="24" height="24" opacity={0.35} />
      <path d="M16 10 V22 M10 16 H22" strokeWidth={2} />
    </Svg>
  ),
  // Wholesale/retail/FMCG — package
  ({ className }) => (
    <Svg className={className}>
      <path d="M4 10 L16 4 L28 10 V22 L16 28 L4 22 Z" />
      <path d="M4 10 L16 16 L28 10 M16 16 V28" opacity={0.55} />
    </Svg>
  ),
  // Professional & consulting services — briefcase
  ({ className }) => (
    <Svg className={className}>
      <rect x="4" y="11" width="24" height="15" />
      <path d="M11 11 V6 H21 V11" opacity={0.7} />
      <path d="M4 17 H28" opacity={0.5} />
    </Svg>
  ),
  // Contracting & real estate — building
  ({ className }) => (
    <Svg className={className}>
      <path d="M6 28 V8 L16 3 L26 8 V28" />
      <path d="M6 28 H26" />
      <path d="M12 28 V17 H20 V28" opacity={0.6} />
      <path d="M12 12 H14 M18 12 H20" opacity={0.5} />
    </Svg>
  ),
  // Banking — columns + coin
  ({ className }) => (
    <Svg className={className}>
      <path d="M4 12 L16 5 L28 12 Z" />
      <path d="M6 12 V24 M12 12 V24 M20 12 V24 M26 12 V24" opacity={0.6} />
      <path d="M4 27 H28" />
    </Svg>
  ),
  // Aviation — wing
  ({ className }) => (
    <Svg className={className}>
      <path d="M16 4 V19 M16 4 L4 15 M16 4 L28 15 M16 19 L8 27 M16 19 L24 27" />
    </Svg>
  ),
];
