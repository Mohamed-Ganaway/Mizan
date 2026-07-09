/** Small geometric line icons, drawn from the emblem's angular/chamfer vocabulary rather than a generic icon set. */

const common = {
  width: 40,
  height: 40,
  viewBox: "0 0 40 40",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinejoin: "miter" as const,
  strokeLinecap: "square" as const,
};

export function IconErp(props: { className?: string }) {
  return (
    <svg {...common} className={props.className} aria-hidden>
      <path d="M6 10 L30 10 L34 14 L34 18 L6 18 Z" />
      <path d="M6 21 L30 21 L34 25 L34 29 L6 29 Z" opacity={0.55} />
      <path d="M12 14.5 h14" opacity={0.7} />
      <path d="M12 25.5 h14" opacity={0.7} />
    </svg>
  );
}

export function IconTransformation(props: { className?: string }) {
  return (
    <svg {...common} className={props.className} aria-hidden>
      <path d="M6 14 H26 L26 8 L34 16 L26 24 L26 18 H6 Z" opacity={0.85} />
      <path d="M34 26 H14 L14 32 L6 24 L14 16 L14 22 H34 Z" opacity={0.4} />
    </svg>
  );
}

export function IconOptimization(props: { className?: string }) {
  return (
    <svg {...common} className={props.className} aria-hidden>
      <rect x="5" y="17" width="7" height="7" />
      <rect x="17" y="6" width="7" height="7" opacity={0.8} />
      <rect x="17" y="28" width="7" height="7" opacity={0.8} />
      <rect x="29" y="17" width="7" height="7" opacity={0.55} />
      <path d="M12 20.5 H17 M24 9.5 H27 V17 M24 31.5 H27 V23" opacity={0.6} />
    </svg>
  );
}

export function IconConsulting(props: { className?: string }) {
  return (
    <svg {...common} className={props.className} aria-hidden>
      <path d="M20 5 L33 20 L20 35 L7 20 Z" opacity={0.4} />
      <path d="M20 13 L27 20 L20 27 L13 20 Z" />
    </svg>
  );
}

export function IconEnterprise(props: { className?: string }) {
  return (
    <svg {...common} className={props.className} aria-hidden>
      <path d="M8 34 V12 L20 5 L32 12 V34" />
      <path d="M8 34 H32" />
      <path d="M14 34 V20 H26 V34" opacity={0.6} />
      <path d="M17 26 h6 M17 30 h6" opacity={0.5} />
    </svg>
  );
}

export const capabilityIcons: Record<string, (props: { className?: string }) => React.ReactElement> = {
  erp: IconErp,
  transformation: IconTransformation,
  optimization: IconOptimization,
  consulting: IconConsulting,
  enterprise: IconEnterprise,
};
