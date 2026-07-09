"use client";

import { useEffect, useRef } from "react";
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import { MotionConfig } from "framer-motion";
import { gsap, ScrollTrigger, ensureGsapPlugins } from "@/lib/gsap";

/**
 * Drives the whole site's scroll through Lenis (inertia smoothing) and keeps
 * GSAP's ScrollTrigger perfectly in sync with it, per GSAP's recommended
 * Lenis integration: ScrollTrigger listens to Lenis's own scroll events, and
 * Lenis is stepped from GSAP's ticker so both stay on the same frame clock.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);
  const reducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    ensureGsapPlugins();

    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  useLenis((lenis) => {
    ScrollTrigger.update();
    if (process.env.NODE_ENV !== "production") {
      (window as unknown as { __lenis?: typeof lenis }).__lenis = lenis;
    }
  });

  return (
    <MotionConfig reducedMotion="user">
      <ReactLenis
        root
        ref={lenisRef}
        options={{
          lerp: reducedMotion ? 1 : 0.1,
          duration: reducedMotion ? 0 : 1.2,
          smoothWheel: !reducedMotion,
          syncTouch: false,
          autoRaf: false,
        }}
      >
        {children}
      </ReactLenis>
    </MotionConfig>
  );
}
