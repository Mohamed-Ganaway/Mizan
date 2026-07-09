"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Subtle pointer-driven 3D tilt for cards — desktop/fine-pointer only.
 * Wrap a single block-level child; the child itself receives the transform.
 */
export function Tilt({
  children,
  className,
  max = 7,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const enabled = useRef(false);
  const setX = useRef<((v: number) => void) | null>(null);
  const setY = useRef<((v: number) => void) | null>(null);

  function ensureQuickSetters() {
    if (!innerRef.current || setX.current) return;
    setX.current = gsap.quickTo(innerRef.current, "rotateX", { duration: 0.4, ease: "power3" });
    setY.current = gsap.quickTo(innerRef.current, "rotateY", { duration: 0.4, ease: "power3" });
  }

  function handleEnter() {
    enabled.current =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (enabled.current) ensureQuickSetters();
  }

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!enabled.current || !wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setY.current?.(px * max * 2);
    setX.current?.(-py * max * 2);
  }

  function handleLeave() {
    setX.current?.(0);
    setY.current?.(0);
  }

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{ perspective: 800 }}
      onMouseEnter={handleEnter}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div ref={innerRef} className="h-full [transform-style:preserve-3d]">
        {children}
      </div>
    </div>
  );
}
