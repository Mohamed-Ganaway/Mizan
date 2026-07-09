"use client";

import { useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { MeanderDivider } from "@/components/motion/meander-divider";
import { gsap, ScrollTrigger, ensureGsapPlugins } from "@/lib/gsap";
import { IconFinancial } from "@/components/icons/service-icons";
import { IconTransformation } from "@/components/icons/capability-icons";

const REST_ANGLE = -8;

export function Thesis() {
  const t = useTranslations("thesis");
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const rigRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);
  const panARef = useRef<HTMLDivElement>(null);
  const panBRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef({ scroll: REST_ANGLE, hover: 0 });

  useEffect(() => {
    ensureGsapPlugins();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.matchMedia();
    ctx.add("(min-width: 640px)", () => {
      const beam = beamRef.current;
      const panA = panARef.current;
      const panB = panBRef.current;
      if (!beam || !panA || !panB) return;

      const apply = () => {
        const total = angleRef.current.scroll + angleRef.current.hover;
        gsap.set(beam, { rotate: total });
        gsap.set([panA, panB], { rotate: -total });
      };

      gsap.set(glowRef.current, { opacity: 0.3 });
      apply();

      // Idle breathing — the whole rig drifts gently even at rest, so it never
      // reads as a static illustration.
      const idle = gsap.to(rigRef.current, {
        y: 9,
        duration: 3.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 85%",
        end: "top 30%",
        scrub: 0.6,
        onUpdate: (self) => {
          angleRef.current.scroll = gsap.utils.interpolate(REST_ANGLE, 0, self.progress);
          gsap.set(glowRef.current, { opacity: 0.3 + self.progress * 0.5 });
          apply();
        },
      });

      return () => {
        trigger.kill();
        idle.kill();
      };
    });

    return () => ctx.revert();
  }, []);

  const tiltTo = (hover: number, glowBoost = false) => {
    gsap.to(angleRef.current, {
      hover,
      duration: 0.6,
      ease: "elastic.out(1, 0.55)",
      onUpdate: () => {
        const total = angleRef.current.scroll + angleRef.current.hover;
        gsap.set(beamRef.current, { rotate: total });
        gsap.set([panARef.current, panBRef.current], { rotate: -total });
      },
    });
    gsap.to(glowRef.current, { opacity: glowBoost ? 0.85 : 0.3, duration: 0.5 });
  };

  const tickBg =
    "repeating-linear-gradient(90deg, transparent, transparent 12px, rgba(28,23,18,0.16) 12px, rgba(28,23,18,0.16) 13px), linear-gradient(90deg, var(--bronze-900), var(--gold-200) 50%, var(--bronze-900))";

  return (
    <section ref={sectionRef} className="texture-dots relative overflow-hidden bg-paper-sunken py-16 sm:py-24">
      {/* massive faint wordmark — decorative depth, echoes the emblem's own name */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center text-[22vw] leading-none text-bronze-500/[0.06] ${
          locale === "ar" ? "font-display-ar" : "font-display"
        }`}
      >
        {locale === "ar" ? "ميزان" : "MIZAN"}
      </div>

      <Container className="relative">
        <Reveal>
          <p className="eyebrow text-center text-bronze-600">{t("kicker")}</p>
          <h2
            className={`mt-3 text-balance text-center text-h2 ${locale === "ar" ? "font-display-ar" : "font-display"}`}
          >
            {t("heading")}
          </h2>
        </Reveal>

        <div ref={rigRef} className="relative mx-auto mt-14 h-64 w-full max-w-2xl sm:h-80 md:h-[22rem]">
          {/* soft light source at the fulcrum, brightening as the beam settles / on hover */}
          <div
            ref={glowRef}
            className="orb left-1/2 top-[52%] h-48 w-48 -translate-x-1/2 -translate-y-1/2 transition-[width,height] duration-500"
            style={{ background: "radial-gradient(circle, var(--gold-200), transparent 70%)" }}
            aria-hidden
          />

          {/* support post + base */}
          <div className="absolute left-1/2 top-[54%] h-16 w-[3px] -translate-x-1/2 bg-gradient-to-b from-bronze-600 to-bronze-900" aria-hidden />
          <div className="absolute left-1/2 top-[calc(54%+3.9rem)] h-[3px] w-20 -translate-x-1/2 bg-bronze-900" aria-hidden />
          <div className="absolute left-1/2 top-[calc(54%+4.15rem)] h-[2px] w-28 -translate-x-1/2 bg-bronze-900/40" aria-hidden />

          {/* fulcrum — two offset triangles for a faceted, dimensional pivot */}
          <div
            className="absolute left-1/2 top-[calc(50%+2px)] h-0 w-0 -translate-x-1/2 translate-x-[2px] border-x-[12px] border-t-[20px] border-x-transparent border-t-bronze-900/70"
            aria-hidden
          />
          <div
            className="absolute left-1/2 top-[calc(50%+2px)] h-0 w-0 -translate-x-1/2 border-x-[12px] border-t-[20px] border-x-transparent border-t-bronze-600 drop-shadow-[0_2px_4px_rgba(61,44,24,0.35)]"
            aria-hidden
          />

          {/* beam — a graduated instrument bar, not a plain rule */}
          <div
            ref={beamRef}
            className="absolute left-1/2 top-1/2 h-[5px] w-44 -translate-x-1/2 -translate-y-1/2 shadow-[0_1px_3px_rgba(61,44,24,0.45)] sm:w-72 md:w-96 lg:w-[26rem]"
            style={{ transformOrigin: "50% 50%", background: tickBg }}
          >
            <div
              ref={panARef}
              data-cursor-hover
              className="focus-ring absolute left-0 top-0 flex -translate-x-1/2 flex-col items-center rounded-sm"
              style={{ transformOrigin: "50% 0%" }}
              tabIndex={0}
              onMouseEnter={() => tiltTo(-6, true)}
              onMouseLeave={() => tiltTo(0)}
              onFocus={() => tiltTo(-6, true)}
              onBlur={() => tiltTo(0)}
            >
              <span className="h-1.5 w-1.5 -translate-y-1 rotate-45 bg-bronze-700 shadow-sm sm:h-2 sm:w-2" aria-hidden />
              <div className="flex gap-4 sm:gap-9">
                <span className="h-7 w-px origin-top -rotate-[8deg] bg-gradient-to-b from-line-strong to-bronze-500/50 sm:h-12" aria-hidden />
                <span className="h-7 w-px origin-top rotate-[8deg] bg-gradient-to-b from-line-strong to-bronze-500/50 sm:h-12" aria-hidden />
              </div>
              <span className="-mt-px h-[3px] w-12 bg-bronze-800/70 sm:w-24" aria-hidden />
              <div className="group glass-panel-light chamfer-sm -mt-px flex w-28 cursor-pointer flex-col items-center gap-1.5 p-3 text-center shadow-[var(--shadow-mzn-md)] transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.06] sm:w-40 sm:gap-2.5 sm:p-5 lg:w-48">
                <IconFinancial className="h-5 w-5 text-bronze-600 transition-transform duration-300 group-hover:scale-110 sm:h-8 sm:w-8" />
                <div className={`text-xs leading-tight sm:text-base ${locale === "ar" ? "font-display-ar" : "font-display"}`}>{t("panA")}</div>
              </div>
            </div>
            <div
              ref={panBRef}
              data-cursor-hover
              className="focus-ring absolute left-full top-0 flex -translate-x-1/2 flex-col items-center rounded-sm"
              style={{ transformOrigin: "50% 0%" }}
              tabIndex={0}
              onMouseEnter={() => tiltTo(6, true)}
              onMouseLeave={() => tiltTo(0)}
              onFocus={() => tiltTo(6, true)}
              onBlur={() => tiltTo(0)}
            >
              <span className="h-1.5 w-1.5 -translate-y-1 rotate-45 bg-bronze-700 shadow-sm sm:h-2 sm:w-2" aria-hidden />
              <div className="flex gap-4 sm:gap-9">
                <span className="h-7 w-px origin-top -rotate-[8deg] bg-gradient-to-b from-line-strong to-graphite-500/50 sm:h-12" aria-hidden />
                <span className="h-7 w-px origin-top rotate-[8deg] bg-gradient-to-b from-line-strong to-graphite-500/50 sm:h-12" aria-hidden />
              </div>
              <span className="-mt-px h-[3px] w-12 bg-graphite-600/70 sm:w-24" aria-hidden />
              <div className="group glass-panel-light chamfer-sm -mt-px flex w-28 cursor-pointer flex-col items-center gap-1.5 p-3 text-center shadow-[var(--shadow-mzn-md)] transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.06] sm:w-40 sm:gap-2.5 sm:p-5 lg:w-48">
                <IconTransformation className="h-5 w-5 text-graphite-600 transition-transform duration-300 group-hover:scale-110 sm:h-8 sm:w-8" />
                <div className={`text-xs leading-tight sm:text-base ${locale === "ar" ? "font-display-ar" : "font-display"}`}>{t("panB")}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-xl">
          <MeanderDivider />
        </div>

        <Reveal delay={0.12}>
          <div className="relative mx-auto mt-8 max-w-2xl border border-line px-8 py-8 sm:px-10">
            <span className="eyebrow absolute -top-2.5 left-6 bg-paper-sunken px-2 text-ink-faint">
              {t("label")}
            </span>
            <p className="lede text-balance text-center">{t("body")}</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
