"use client";

import { forwardRef, useRef } from "react";

/**
 * A soft radial glow that tracks the cursor within its own bounds, revealed on
 * hover. Position is written straight to a CSS custom property (no React
 * state) so tracking never triggers a re-render. Forwards its ref so callers
 * that already animate the same node (e.g. via GSAP) can share one element.
 */
export const Spotlight = forwardRef<
  HTMLDivElement,
  {
    children: React.ReactNode;
    className?: string;
    color?: string;
    size?: number;
  }
>(function Spotlight({ children, className, color = "var(--bronze-500)", size = 220 }, forwardedRef) {
  const innerRef = useRef<HTMLDivElement>(null);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = innerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      ref={(node) => {
        innerRef.current = node;
        if (typeof forwardedRef === "function") forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      }}
      onMouseMove={handleMove}
      className={`group/spot relative ${className ?? ""}`}
    >
      {/* Painted first so it sits beneath children in normal stacking order —
          no z-index needed, and absolutely-positioned children (e.g. an accent
          bar meant to bleed to the card's true edge) stay anchored to this
          root exactly as if Spotlight weren't there. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background: `radial-gradient(${size}px circle at var(--spot-x, 50%) var(--spot-y, 50%), color-mix(in srgb, ${color} 18%, transparent), transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
});
