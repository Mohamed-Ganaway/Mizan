"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useLenis } from "lenis/react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { CountUp } from "@/components/motion/count-up";
import { HeroVideoBackground } from "@/components/sections/hero-mark";
import { gsap, ScrollTrigger, SplitText, ensureGsapPlugins } from "@/lib/gsap";

export function Hero() {
  const t = useTranslations("hero");
  const tCommon = useTranslations("common");
  const locale = useLocale();

  const sectionRef = useRef<HTMLElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Kinetic headline reveal
  useEffect(() => {
    ensureGsapPlugins();
    if (!headlineRef.current) return;

    if (reduced) {
      gsap.set(headlineRef.current, { opacity: 1 });
      return;
    }

    // Arabic letterforms are shaped by their neighbors (initial/medial/final/isolated) —
    // splitting into individual characters breaks that cursive joining, so Arabic gets a
    // word-level reveal instead; Latin script keeps the finer per-character stagger.
    const isArabic = locale === "ar";
    const split = new SplitText(
      headlineRef.current,
      isArabic ? { type: "words", mask: "words" } : { type: "words,chars", mask: "chars" }
    );
    gsap.set(headlineRef.current, { opacity: 1 });
    const tl = gsap.timeline({ delay: 0.15 });
    tl.from(isArabic ? split.words : split.chars, {
      yPercent: 130,
      rotate: isArabic ? 0 : 6,
      opacity: 0,
      duration: isArabic ? 0.85 : 0.9,
      ease: "power4.out",
      stagger: isArabic ? 0.06 : 0.018,
    });

    return () => {
      tl.kill();
      split.revert();
    };
  }, [reduced, locale]);

  // Scroll depth: background drifts/zooms slower than the foreground text fades —
  // a simple two-layer parallax that reads as "alive" without ever being pinned.
  useEffect(() => {
    ensureGsapPlugins();
    if (reduced || !videoWrapRef.current || !contentRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom top",
      scrub: 0.6,
      onUpdate: (self) => {
        const p = self.progress;
        gsap.set(videoWrapRef.current, {
          scale: 1 + p * 0.18,
          yPercent: p * 12,
          opacity: 1 - p * 0.65,
        });
        gsap.set(contentRef.current, {
          yPercent: -p * 22,
          opacity: 1 - p * 1.1,
        });
      },
    });

    return () => trigger.kill();
  }, [reduced]);

  // Velocity skew — a fast flick of the scroll gives the backdrop a brief,
  // physical-feeling shear that eases back to flat. A signature move on
  // high-energy agency sites, kept subtle and confined to the background
  // layer so foreground text never distorts.
  const skewTo = useRef<((v: number) => void) | null>(null);
  useEffect(() => {
    ensureGsapPlugins();
    if (reduced || !videoWrapRef.current) return;
    skewTo.current = gsap.quickTo(videoWrapRef.current, "skewY", { duration: 0.8, ease: "power3.out" });
  }, [reduced]);

  useLenis((lenis) => {
    if (!skewTo.current) return;
    const skew = gsap.utils.clamp(-2.4, 2.4, lenis.velocity * 0.09);
    skewTo.current(skew);
  });

  return (
    <section ref={sectionRef} className="relative min-h-[calc(100svh+5rem)] overflow-hidden bg-ink">
      <div ref={videoWrapRef} className="absolute inset-0">
        {!reduced && <HeroVideoBackground ref={videoRef} />}
        {/* Warm bronze tint so the raw footage reads as part of the palette — kept light so the
            animation itself stays visible, not a muddy backdrop. */}
        <div
          className="absolute inset-0 opacity-55 mix-blend-color"
          style={{ backgroundColor: "var(--bronze-700)" }}
        />
        <div className="texture-dots-light absolute inset-0 opacity-25" />
      </div>

      {/* Legibility scrim concentrated behind the content block (bottom) — the video stays
          clearly visible through the top two-thirds instead of a flat wash over the whole frame. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[78%] bg-gradient-to-t from-ink via-ink/55 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/50 to-transparent sm:h-40" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 8%, color-mix(in srgb, var(--gold-200) 18%, transparent), transparent 70%)",
        }}
      />

      <div ref={contentRef} className="absolute inset-0">
        <Container className="relative flex h-full flex-col pb-16 pt-36 sm:pb-20 sm:pt-40 lg:pb-24 lg:pt-44">
          {/* mt-auto/mb-auto (not justify-center) so the block centers in the safe zone when
              there's room, but always falls back to sitting flush after pt — never overflowing
              back up into the nav's reserved clearance — on short viewports. */}
          <p className="mt-auto font-mono text-xs uppercase tracking-[0.16em] text-gold-200">{t("eyebrow")}</p>

          <h1
            ref={headlineRef}
            className={`mt-6 max-w-4xl text-balance text-hero text-paper opacity-0 ${
              locale === "ar" ? "font-display-ar" : "font-display"
            }`}
          >
            {t("headline")}
          </h1>

          <p className="lede mt-6 max-w-xl !text-graphite-200">{t("sub")}</p>

          <div className="mt-8 flex flex-wrap items-center gap-4 sm:mt-10">
            <Magnetic>
              <Button href="/contact" variant="primary">
                {tCommon("bookConsultation")}
              </Button>
            </Magnetic>
            <Button
              href="/services/odoo-erp"
              variant="ghost"
              className="!border-white/25 !text-paper hover:!border-bronze-400 hover:!text-bronze-300"
            >
              {tCommon("exploreOdoo")}
            </Button>
          </div>

          <div className="mb-auto mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-white/15 pt-6 sm:mt-16">
            <div>
              <div className="font-display text-stat text-gold-200">
                <CountUp value={22} suffix="+" />
              </div>
              <div className="mt-1 text-xs text-graphite-200">{t("statYears")}</div>
            </div>
            <div>
              <div dir="ltr" className="text-start font-display text-stat text-gold-200">
                13–19
              </div>
              <div className="mt-1 text-xs text-graphite-200">{t("statOdoo")}</div>
            </div>
            <div>
              <div className="font-display text-stat text-gold-200">
                <CountUp value={10} />
              </div>
              <div className="mt-1 text-xs text-graphite-200">{t("statSectors")}</div>
            </div>
          </div>
        </Container>
      </div>

      {/* Decorative only — steps aside on short viewports rather than overlapping the
          stats row, since it's a hint, not content. */}
      <div className="absolute inset-x-0 bottom-4 hidden flex-col items-center gap-2 text-graphite-200 [@media(min-height:760px)]:flex">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em]">{t("scrollCue")}</span>
        <span className="h-9 w-px animate-pulse bg-gradient-to-b from-bronze-400 to-transparent" />
      </div>
    </section>
  );
}
