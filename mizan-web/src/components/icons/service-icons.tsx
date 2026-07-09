const common = {
  viewBox: "0 0 40 40",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinejoin: "miter" as const,
  strokeLinecap: "square" as const,
};

export function IconOdooErp(props: { className?: string }) {
  return (
    <svg {...common} className={props.className} aria-hidden>
      <circle cx="14" cy="14" r="7" />
      <circle cx="27" cy="24" r="9" opacity={0.5} />
      <path d="M18.5 17.5 L23 21" opacity={0.6} />
    </svg>
  );
}

export function IconFinancial(props: { className?: string }) {
  return (
    <svg {...common} className={props.className} aria-hidden>
      <path d="M7 33 V21 M17 33 V13 M27 33 V25 M34 33 V8" />
      <path d="M6 8 L15 17 L21 11 L34 24" opacity={0.5} />
    </svg>
  );
}

export function IconInstitutional(props: { className?: string }) {
  return (
    <svg {...common} className={props.className} aria-hidden>
      <rect x="15" y="5" width="10" height="8" />
      <rect x="4" y="27" width="10" height="8" opacity={0.6} />
      <rect x="26" y="27" width="10" height="8" opacity={0.6} />
      <path d="M20 13 V20 H9 V27 M20 20 H31 V27" opacity={0.6} />
    </svg>
  );
}

export function IconTraining(props: { className?: string }) {
  return (
    <svg {...common} className={props.className} aria-hidden>
      <path d="M4 13 L20 6 L36 13 L20 20 Z" />
      <path d="M11 16.5 V26 Q20 32 29 26 V16.5" opacity={0.55} />
      <path d="M36 13 V23" opacity={0.4} />
    </svg>
  );
}

export const serviceIcons: Record<string, (props: { className?: string }) => React.ReactElement> = {
  "odoo-erp": IconOdooErp,
  "financial-consulting": IconFinancial,
  "institutional-development": IconInstitutional,
  training: IconTraining,
};
