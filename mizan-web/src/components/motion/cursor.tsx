"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

const HOVER_SELECTOR = 'a, button, [role="button"], input, textarea, select, [data-cursor-hover]';

/**
 * Ring-and-dot magnetic cursor. Desktop / fine-pointer only, and fully
 * skipped under reduced-motion — it's decoration, never a11y-load-bearing.
 *
 * Two effects on purpose: the first only decides *whether* the cursor should
 * exist (mounting the dot/ring elements). The second — gated on that same
 * `active` flag — runs after those elements are actually in the DOM to wire
 * up GSAP and event listeners. Doing both in one effect reads refs before
 * React has committed the elements, so nothing ever gets attached.
 *
 * The native cursor stays visible (and `cursor:none` is never applied) until
 * the first real mousemove tells us where the custom cursor should sit —
 * otherwise it renders at its default (0,0) and the page looks cursor-less
 * the instant the native one is hidden.
 */
export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [ready, setReady] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [mediaHover, setMediaHover] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (fine && !reduced) setActive(true);
  }, []);

  useEffect(() => {
    if (!active) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    const ringX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3" });
    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });

    let seen = false;
    function onMove(e: MouseEvent) {
      ringX(e.clientX);
      ringY(e.clientY);
      dotX(e.clientX);
      dotY(e.clientY);
      if (!seen) {
        seen = true;
        document.documentElement.classList.add("has-custom-cursor");
        setReady(true);
      }
    }

    function onOver(e: MouseEvent) {
      const target = e.target as Element;
      const el = target.closest(HOVER_SELECTOR);
      setHovering(!!el);
      setMediaHover(!!el?.closest("[data-cursor-media]"));
    }

    function onLeaveWindow() {
      document.documentElement.classList.remove("has-custom-cursor");
      seen = false;
      setReady(false);
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.documentElement.addEventListener("mouseleave", onLeaveWindow);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeaveWindow);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [active]);

  if (!active) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bronze-500 transition-opacity duration-200"
        style={{ opacity: ready ? (hovering ? 0 : 1) : 0 }}
        aria-hidden
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full border border-bronze-500 mix-blend-difference transition-[width,height,background-color,opacity] duration-300 ease-out"
        style={{
          width: mediaHover ? 84 : hovering ? 52 : 28,
          height: mediaHover ? 84 : hovering ? 52 : 28,
          opacity: ready ? 1 : 0,
          backgroundColor: hovering && !mediaHover ? "color-mix(in srgb, var(--bronze-500) 18%, transparent)" : "transparent",
        }}
        aria-hidden
      >
        {mediaHover && (
          <span className="flex h-full w-full items-center justify-center font-mono text-[0.6rem] uppercase tracking-wider text-bronze-500">
            {"✦"}
          </span>
        )}
      </div>
    </>
  );
}
