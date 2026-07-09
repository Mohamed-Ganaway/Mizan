"use client";

import { motion } from "framer-motion";

/** The emblem's Greek-key band, drawn as a self-tracing line when it enters view. */
export function MeanderDivider({ className }: { className?: string }) {
  const path =
    "M0 8 H20 V2 H40 V8 H60 V2 H80 V8 H100 V2 H120 V8 H140 V2 H160 V8 H180 V2 H200 V8 H220 V2 H240 V8 H260 V2 H280 V8 H300 V2 H320 V8";

  return (
    <svg
      className={className}
      viewBox="0 0 320 10"
      preserveAspectRatio="none"
      style={{ width: "100%", height: "10px" }}
      aria-hidden
    >
      <motion.path
        d={path}
        fill="none"
        stroke="var(--bronze-500)"
        strokeWidth="1.4"
        initial={{ pathLength: 0, opacity: 0.55 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: "easeInOut" }}
      />
    </svg>
  );
}
