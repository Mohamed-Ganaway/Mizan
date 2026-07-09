"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Tilt } from "@/components/motion/tilt";
import { Spotlight } from "@/components/motion/spotlight";
import { FloatingOrbs } from "@/components/motion/floating-orbs";
import { gsap, ScrollTrigger, SplitText, ensureGsapPlugins } from "@/lib/gsap";
import { capabilities } from "@/content/odoo-capabilities";
import { capabilityIcons } from "@/components/icons/capability-icons";
import odooBadge from "@/assets/brand/odoo-silver-partner.png";

const steps = ["discover", "design", "deploy", "train", "support"] as const;
const versions = ["13", "14", "15", "16", "17", "18", "19"];

const orbs = [
  { size: 460, top: "-14%", left: "-10%", color: "radial-gradient(circle, var(--bronze-600), transparent 70%)", driftX: 60, driftY: 40, duration: 17 },
  { size: 380, top: "35%", left: "84%", color: "radial-gradient(circle, var(--gold-200), transparent 70%)", driftX: -50, driftY: 50, duration: 20 },
  { size: 300, top: "78%", left: "10%", color: "radial-gradient(circle, var(--graphite-400), transparent 70%)", driftX: 40, driftY: -30, duration: 22 },
];

export function OdooSpotlight() {
  const t = useTranslations("odoo");
  const locale = useLocale() as "ar" | "en";

  const sectionRef = useRef<HTMLElement>(null);
  const orbLayerRef = useRef<HTMLDivElement>(null);
  const textureLayerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const badgeOuterRef = useRef<HTMLDivElement>(null);

  const railRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const methodDotRef = useRef<HTMLDivElement>(null);

  const versionRailRef = useRef<HTMLDivElement>(null);
  const versionLineRef = useRef<SVGLineElement>(null);
  const versionNodeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const versionDotRef = useRef<HTMLDivElement>(null);

  const [finePointer, setFinePointer] = useState(false);
  const rafRef = useRef<number | null>(null);
  const pointerPos = useRef({ x: "50%", y: "30%" });

  useEffect(() => {
    setFinePointer(
      window matchMedia("(pointer: fine)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Cursor spotlight — a soft light that follows the pointer across the whole
  // section, throttled to one write per animation frame via a direct style
  // mutation (no React state) so it never triggers a re-render.
  function handlePointerMove(e: React.MouseEvent<HTMLElement>) {
    if (!finePointer || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    pointerPos.current = { x: `${e.clientX - rect.left}px`, y: `${e.clientY - rect.top}px` };
    if (rafRef.current == null) {
      rafRef.current = requestAnimationFrame(() => {
        sectionRef.current?.style.setProperty("--spot-x", pointerPos.current.x);
        sectionRef.current?.style.setProperty("--spot-y", pointerPos.current.y);
        rafRef.current = null;
      });
    }
  }

  // Two-layer parallax across the section's own scroll range — orbs drift
  // further than the dot texture, a cheap depth cue from two transform-only layers.
  useEffect(() => {
    ensureGsapPlugins();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !sectionRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom top",
      scrub: 0.6,
      onUpdate: (self) => {
        const p = (self.progress - 0.5) * 2;
        gsap.set(orbLayerRef.current, { yPercent: p * 10 });
        gsap.set(textureLayerRef.current, { yPercent: p * 4 });
      },
    });
    return () => trigger.kill();
  }, []);

  // Kinetic heading reveal — same locale-conditional SplitText strategy as the
  // Hero headline (Arabic breaks cursive letter-joining if split into chars).
  useEffect(() => {
    ensureGsapPlugins();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!headingRef.current) return;

    if (reduced) {
      gsap.set(headingRef.current, { opacity: 1 });
      return;
    }

    const isArabic = locale === "ar";
    const split = new SplitText(
      headingRef.current,
      isArabic ? { type: "words", mask: "words" } : { type: "words,chars", mask: "chars" }
    );
    const targets = isArabic ? split.words : split.chars;
    gsap.set(headingRef.current, { opacity: 1 });
    gsap.set(targets, { yPercent: 115, opacity: 0 });

    const trigger = ScrollTrigger.create({
      trigger: headingRef.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(targets, {
          yPercent: 0,
          opacity: 1,
          duration: isArabic ? 0.75 : 0.8,
          ease: "power4.out",
          stagger: isArabic ? 0.05 : 0.016,
        });
      },
    });

    return () => {
      trigger.kill();
      split.revert();
    };
  }, [locale]);

  // The badge's dramatic, one-time entrance — everything after this (float,
  // tilt, hover) lives on separate nested elements so nothing fights this
  // tween's transform/filter once it settles.
  useEffect(() => {
    ensureGsapPlugins();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = badgeOuterRef.current;
    if (!el) return;

    if (reduced) {
      gsap.set(el, { opacity: 1 });
      return;
    }

    gsap.set(el, { opacity: 0, scale: 0.72, y: 46, filter: "blur(18px)" });
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 82%",
      once: true,
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.3,
          ease: "back.out(1.5)",
        });
      },
    });

    return () => trigger.kill();
  }, []);

  // Methodology — connecting line draws in, each step lifts + glows as the
  // scroll progress passes it, and a traveling marker rides the line's tip.
  useEffect(() => {
    ensureGsapPlugins();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const line = lineRef.current;
    if (line) {
      gsap.set(line, { drawSVG: "0%" });
      const marks = stepRefs.current.filter(Boolean) as HTMLDivElement[];
      gsap.set(marks, { y: 10 });

      const trigger = ScrollTrigger.create({
        trigger: railRef.current,
        start: "top 75%",
        end: "bottom 60%",
        scrub: 0.5,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(line, { drawSVG: `0% ${p * 100}%` });
          if (methodDotRef.current) {
            gsap.set(methodDotRef.current, {
              left: locale === "ar" ? `${(1 - p) * 100}%` : `${p * 100}%`,
              opacity: p > 0.01 && p < 0.99 ? 1 : 0,
            });
          }
          marks.forEach((el, i) => {
            const threshold = i / (marks.length - 1);
            const active = p >= threshold - 0.03;
            gsap.set(el, {
              y: active ? 0 : 10,
              boxShadow: active
                ? "0 0 0 1px var(--bronze-500), 0 16px 32px -16px rgba(0,0,0,0.5)"
                : "0 0 0 0 transparent",
            });
          });
        },
      });

      return () => trigger.kill();
    }
  }, [locale]);

  // Version coverage — same drawn-line + traveling-marker treatment, plus
  // each node scales up as the line reaches it.
  useEffect(() => {
    ensureGsapPlugins();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const line = versionLineRef.current;
    if (reduced || !line) return;

    gsap.set(line, { drawSVG: "0%" });
    const nodes = versionNodeRefs.current.filter(Boolean) as HTMLSpanElement[];
    gsap.set(nodes, { scale: 0.7, opacity: 0.45 });

    const trigger = ScrollTrigger.create({
      trigger: versionRailRef.current,
      start: "top 80%",
      end: "bottom 65%",
      scrub: 0.5,
      onUpdate: (self) => {
        const p = self.progress;
        gsap.set(line, { drawSVG: `0% ${p * 100}%` });
        if (versionDotRef.current) {
          gsap.set(versionDotRef.current, {
            left: locale === "ar" ? `${(1 - p) * 100}%` : `${p * 100}%`,
            opacity: p > 0.01 && p < 0.99 ? 1 : 0,
          });
        }
        nodes.forEach((el, i) => {
          const threshold = i / (nodes.length - 1);
          const active = p >= threshold - 0.02;
          gsap.set(el, { scale: active ? 1 : 0.7, opacity: active ? 1 : 0.45 });
        });
      },
    });
    return () => trigger.kill();
  }, [locale]);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handlePointerMove}
      className="relative overflow-hidden border-y border-line bg-graphite-800 py-28 text-paper lg:py-32"
    >
      <div ref={orbLayerRef} className="pointer-events-none absolute inset-0">
        <FloatingOrbs orbs={orbs} />
      </div>
      <div ref={textureLayerRef} className="texture-dots-light pointer-events-none absolute inset-0 opacity-25" />
      {finePointer && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(480px circle at var(--spot-x, 50%) var(--spot-y, 30%), color-mix(in srgb, var(--gold-200) 9%, transparent), transparent 70%)",
          }}
        />
      )}

      <Container className="relative">
        {/* Opening beat — expertise, stated, then proven by the badge beside it */}
        <div className="flex flex-col gap-14 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow text-gold-200">{t("kicker")}</p>
            </Reveal>
            <h2
              ref={headingRef}
              className={`mt-4 text-balance text-h2 opacity-0 ${locale === "ar" ? "font-display-ar" : "font-display"}`}
            >
              {t("heading")}
            </h2>
            <Reveal delay={0.15}>
              <p className="lede mt-5 text-graphite-200">{t("sub")}</p>
            </Reveal>
          </div>

          {/* The badge — the section's centerpiece: dramatic entrance, idle
              float+breathe, and a cursor-tilt + glow-intensify hover. Each
              effect lives on its own nested element so none of them fight
              over the same transform. */}
          <div ref={badgeOuterRef} className="group relative mx-auto w-full max-w-[300px] lg:mx-0">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 rounded-full opacity-60 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in srgb, var(--gold-200) 40%, transparent), transparent 70%)",
              }}
            />

            <div className="badge-float relative">
              <Tilt max={10}>
                <div className="glass-panel chamfer relative flex flex-col items-center gap-5 overflow-hidden px-9 py-9 text-center shadow-[var(--shadow-mzn-lg)] transition-[transform,box-shadow] duration-500 hover:scale-[1.03] hover:shadow-[0_32px_64px_-20px_rgba(0,0,0,0.55)] sm:px-10 sm:py-10">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(120% 100% at 50% 0%, color-mix(in srgb, var(--gold-200) 20%, transparent), transparent 60%)",
                    }}
                  />
                  <Image
                    src={odooBadge}
                    alt="Odoo Silver Partner"
                    className="relative h-20 w-auto object-contain sm:h-24"
                  />
                  <div className="relative h-px w-14 bg-white/15" aria-hidden />
                  <div className="relative">
                    <div className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-gold-200">
                      {locale === "ar" ? "شريك معتمد" : "Certified Partner"}
                    </div>
                    <div className="mt-1.5 text-xl font-semibold text-paper">Odoo Silver Partner</div>
                    <div className="mt-2 font-mono text-[0.7rem] text-graphite-200">
                      {locale === "ar" ? "الإصدارات 13–19" : "Versions 13–19"}
                    </div>
                  </div>
                </div>
              </Tilt>
            </div>
          </div>
        </div>

        {/* Capabilities — the pillars that make Mizan an implementation partner, not just a vendor */}
        <RevealGroup className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.12}>
          {capabilities.map((c, i) => {
            const Icon = capabilityIcons[c.key];
            return (
              <RevealItem key={c.key}>
                <Tilt max={6} className="h-full">
                  <Spotlight
                    color="var(--bronze-500)"
                    className="group glass-panel chamfer h-full overflow-hidden p-7 transition-colors duration-300 hover:border-bronze-400/50"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center border border-white/15 text-gold-200 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="font-mono text-xs text-graphite-400">0{i + 1}</span>
                    </div>
                    <h3 className={`mt-5 text-lg font-semibold text-paper ${locale === "ar" ? "font-display-ar" : ""}`}>
                      {c.title[locale]}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-graphite-200">{c.description[locale]}</p>
                    <span
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-bronze-500 to-gold-200 transition-transform duration-500 group-hover:scale-x-100 rtl:origin-right"
                    />
                  </Spotlight>
                </Tilt>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* Version coverage — a connected timeline rather than a flat list of chips */}
        <div ref={versionRailRef} className="relative mt-20">
          <p className="eyebrow text-graphite-200">{locale === "ar" ? "تغطية الإصدارات" : "Version coverage"}</p>
          <div className="relative mt-8 pb-2">
            <svg className="absolute left-0 top-[15px] h-[2px] w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 2">
              <line x1="0" y1="1" x2="100" y2="1" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
              <line
                ref={versionLineRef}
                x1={locale === "ar" ? "100" : "0"}
                y1="1"
                x2={locale === "ar" ? "0" : "100"}
                y2="1"
                stroke="var(--bronze-500)"
                strokeWidth="2"
              />
            </svg>
            <div
              ref={versionDotRef}
              aria-hidden
              className="pointer-events-none absolute top-[10.5px] h-[11px] w-[11px] -translate-x-1/2 rounded-full opacity-0"
              style={{ background: "var(--gold-200)", boxShadow: "0 0 12px 3px color-mix(in srgb, var(--gold-200) 65%, transparent)" }}
            />
            <div className="relative flex justify-between">
              {versions.map((v, i) => (
                <div
                  key={v}
                  className="group/version flex flex-col items-center gap-3"
                  title={
                    v === "13"
                      ? locale === "ar" ? "أقدم إصدار مدعوم" : "Earliest supported"
                      : v === "19"
                        ? locale === "ar" ? "أحدث إصدار" : "Latest version"
                        : undefined
                  }
                >
                  <span
                    ref={(el) => {
                      versionNodeRefs.current[i] = el;
                    }}
                    className="block h-[9px] w-[9px] rotate-45 bg-bronze-500 shadow-[0_0_0_0_transparent] transition-shadow duration-300 group-hover/version:shadow-[0_0_0_6px_color-mix(in_srgb,var(--bronze-500)_25%,transparent)]"
                    aria-hidden
                  />
                  <span className="font-mono text-sm text-graphite-200 transition-colors duration-300 group-hover/version:text-gold-200">
                    {v}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Methodology */}
        <div ref={railRef} className="relative mt-20 pt-10">
          <p className="eyebrow mb-8 text-graphite-200">{locale === "ar" ? "منهجيتنا" : "Our methodology"}</p>
          <svg
            className="absolute left-0 top-[42px] h-[2px] w-full overflow-visible"
            preserveAspectRatio="none"
            viewBox="0 0 100 2"
            style={locale === "ar" ? { transform: "scaleX(-1)" } : undefined}
          >
            <line x1="0" y1="1" x2="100" y2="1" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
            <line ref={lineRef} x1="0" y1="1" x2="100" y2="1" stroke="var(--bronze-500)" strokeWidth="2" />
          </svg>
          <div
            ref={methodDotRef}
            aria-hidden
            className="pointer-events-none absolute top-[37px] h-3 w-3 -translate-x-1/2 rounded-full opacity-0"
            style={{ background: "var(--gold-200)", boxShadow: "0 0 14px 4px color-mix(in srgb, var(--gold-200) 60%, transparent)" }}
          />

          <RevealGroup className="grid gap-4 sm:grid-cols-5" stagger={0.1}>
            {steps.map((step, i) => (
              <RevealItem key={step}>
                <Tilt max={6}>
                  <Spotlight
                    ref={(el) => {
                      stepRefs.current[i] = el;
                    }}
                    color="var(--gold-200)"
                    size={160}
                    className="glass-panel chamfer-sm h-full overflow-hidden p-5 transition-[opacity,transform] duration-300"
                  >
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute -bottom-4 text-[4.5rem] leading-none text-white/[0.05] select-none ${
                        locale === "ar" ? "font-display-ar" : "font-display"
                      }`}
                      style={{ insetInlineEnd: "0.25rem" }}
                    >
                      0{i + 1}
                    </span>
                    <span className="relative font-mono text-xs text-gold-200">0{i + 1}</span>
                    <div className="relative mt-1.5 text-lg font-medium">{t(`steps.${step}`)}</div>
                    <div className="relative mt-1 text-sm text-graphite-200">{t(`steps.${step}Desc`)}</div>
                  </Spotlight>
                </Tilt>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {/* Closing beat — the payoff, bridging into the industries section that follows */}
        <Reveal delay={0.1}>
          <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-10 sm:flex-row sm:items-center">
            <p className="max-w-xl text-[1.05rem] leading-relaxed text-graphite-200">{t("outcome")}</p>
            <Link
              href="/industries"
              data-cursor-hover
              className="group/link inline-flex flex-none items-center gap-2 font-mono text-xs uppercase tracking-wider text-gold-200 transition-colors hover:text-paper"
            >
              {t("outcomeLink")}
              <span
                className="transition-transform group-hover/link:translate-x-1 rtl:group-hover/link:-translate-x-1"
                aria-hidden
              >
                {locale === "ar" ? "←" : "→"}
              </span>
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
