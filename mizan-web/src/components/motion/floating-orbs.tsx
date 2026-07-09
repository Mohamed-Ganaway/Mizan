"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

type Orb = {
  size: number;
  top: string;
  left: string;
  color: string;
  driftX?: number;
  driftY?: number;
  duration?: number;
};

/** Slow-drifting blurred gradient orbs — cheap ambient depth for dark sections. */
export function FloatingOrbs({ orbs }: { orbs: Orb[] }) {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const tweens = refs.current.map((el, i) => {
      if (!el) return null;
      const o = orbs[i];
      return gsap.to(el, {
        x: o.driftX ?? 40,
        y: o.driftY ?? 30,
        duration: o.duration ?? 14,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    });

    return () => tweens.forEach((t) => t?.kill());
  }, [orbs]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {orbs.map((o, i) => (
        <div
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          className="orb"
          style={{
            width: o.size,
            height: o.size,
            top: o.top,
            left: o.left,
            background: o.color,
          }}
        />
      ))}
    </div>
  );
}
