"use client";

import { motion } from "framer-motion";

/**
 * The emblem's Greek-key band, drawn as a self-tracing line when it enters view.
 *
 * `eager`: skip the independent viewport check and animate on mount instead.
 * Use this whenever the divider already sits inside another whileInView
 * element (e.g. a Reveal) — two nested IntersectionObserver-driven
 * animations on the same collapsing subtree is unreliable in practice (the
 * outer element can settle at opacity:0 with the inner one never firing,
 * leaving a full-height invisible gap). Standalone usage (not nested in
 * another scroll-triggered reveal) should leave this off so the line still
 * draws in as the user scrolls to it.
 */
export function MeanderDivider({ className, eager = false }: { className?: string; eager?: boolean }) {
  const path =
    "M0 8 H20 V2 H40 V8 H60 V2 H80 V8 H100 V2 H120 V8 H140 V2 H160 V8 H180 V2 H200 V8 H220 V2 H240 V8 H260 V2 H280 V8 H300 V2 H320 V8";

  const pathProps = {
    d: path,
    fill: "none",
    stroke: "var(--bronze-500)",
    strokeWidth: "1.4",
    initial: { pathLength: 0, opacity: 0.55 },
    transition: { duration: 1.1, ease: "easeInOut" as const },
  };

  return (
    <svg
      className={className}
      viewBox="0 0 320 10"
      preserveAspectRatio="none"
      style={{ width: "100%", height: "10px" }}
      aria-hidden
    >
      {eager ? (
        <motion.path {...pathProps} animate={{ pathLength: 1 }} />
      ) : (
        <motion.path {...pathProps} whileInView={{ pathLength: 1 }} viewport={{ once: true }} />
      )}
    </svg>
  );
}
