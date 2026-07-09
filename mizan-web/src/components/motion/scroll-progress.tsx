"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import { gsap } from "@/lib/gsap";

/** A hairline meander-pattern bar that fills as the page is read — the logo's key motif doing double duty as UI chrome. */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const scaleTo = useRef<((v: number) => void) | null>(null);

  useEffect(() => {
    if (!barRef.current) return;
    scaleTo.current = gsap.quickTo(barRef.current, "scaleX", { duration: 0.2, ease: "power2" });
    barRef.current.style.transformOrigin = document.documentElement.dir === "rtl" ? "100% 0" : "0 0";
  }, []);

  useLenis((lenis) => {
    scaleTo.current?.(lenis.progress);
  });

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-line/40">
      <div
        ref={barRef}
        className="h-full w-full origin-left scale-x-0"
        style={{ background: "linear-gradient(90deg, var(--bronze-600), var(--gold-200))" }}
      />
    </div>
  );
}
