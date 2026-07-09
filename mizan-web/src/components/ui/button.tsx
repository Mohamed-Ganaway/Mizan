import { clsx } from "clsx";
import { Link } from "@/i18n/navigation";

type Variant = "primary" | "ghost" | "dark";

const base =
  "chamfer-sm focus-ring group relative inline-flex items-center justify-center gap-2 overflow-hidden px-7 py-3.5 font-medium text-sm transition-transform duration-200 hover:-translate-y-0.5";

const variants: Record<Variant, string> = {
  primary: "bg-bronze-600 text-white hover:bg-bronze-700",
  ghost: "border border-line-strong text-ink hover:border-bronze-500 hover:text-bronze-600",
  dark: "bg-ink text-paper hover:bg-graphite-800",
};

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = CommonProps & {
  href: string;
  onClick?: never;
  type?: never;
};

type ButtonAsButton = CommonProps & {
  href?: undefined;
  onClick?: () => void;
  type?: "button" | "submit";
};

function Sweep() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 -translate-x-[120%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[120%]"
    />
  );
}

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", className, children } = props;
  const classes = clsx(base, variants[variant], className);

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        <Sweep />
        <span className="relative">{children}</span>
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button type={buttonProps.type ?? "button"} onClick={buttonProps.onClick} className={classes}>
      <Sweep />
      <span className="relative">{children}</span>
    </button>
  );
}
