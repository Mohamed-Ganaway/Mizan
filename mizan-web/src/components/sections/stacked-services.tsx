"use client";

import { useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { gsap, ScrollTrigger, ensureGsapPlugins } from "@/lib/gsap";
import { services } from "@/content/services";
import { serviceIcons } from "@/components/icons/service-icons";

const tints = [
  "linear-gradient(135deg, color-mix(in srgb, var(--bronze-500) 12%, var(--paper-raised)), var(--paper-raised) 65%)",
  "linear-gradient(135deg, color-mix(in srgb, var(--graphite-600) 10%, var(--paper-raised)), var(--paper-raised) 65%)",
  "linear-gradient(135deg, color-mix(in srgb, var(--bronze-500) 12%, var(--paper-raised)), var(--paper-raised) 65%)",
  "linear-gradient(135deg, color-mix(in srgb, var(--graphite-600) 10%, var(--paper-raised)), var(--paper-raised) 65%)",
];

// Extra pinned scroll distance (in "card units") reserved so the last card
// gets a proper exit instead of the pin releasing the instant it settles —
// the wrapper height and the scroll-progress math below must both use this
// same value or the last card's exit will be cut off before it completes.
const TAIL_UNITS = 0.6;

/** Desktop-only pinned "stacking deck": each service takes the stage, then recedes as the next arrives. */
function StackedDeck() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bridgeRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ensureGsapPlugins();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const n = services.length;
      const easeEnter = gsap.parseEase("power2.out");
      const easeExit = gsap.parseEase("power1.in");
      const easeBridge = gsap.parseEase("power2.in");

      const trigger = ScrollTrigger.create({
        trigger: wrapRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        onUpdate: (self) => {
          const p = self.progress * (n + TAIL_UNITS);
          cardRefs.current.forEach((el, i) => {
            if (!el) return;
            // The first card is already on stage the moment the deck locks in —
            // no dead scroll before there's something to read. Cards after it
            // keep a slower crossfade, now eased rather than linear so each
            // handoff swells in and settles instead of moving at a constant rate.
            const enterT = i === 0 ? 1 : gsap.utils.clamp(0, 1, p - i);
            const exitT = gsap.utils.clamp(0, 1, (p - (i + 1)) / 0.5);
            const enter = i === 0 ? 1 : easeEnter(enterT);
            const exit = easeExit(exitT);
            gsap.set(el, {
              opacity: enter * (1 - exit),
              scale: 0.92 + enter * 0.08 - exit * 0.1,
              y: (1 - enter) * 80 - exit * 40,
              zIndex: i,
            });
          });

          // The pin stays locked to the viewport for its full scroll budget
          // even after the last card has finished fading — without this, that
          // remainder plays out as a static, contentless frame (which is what
          // actually read as "the page stopped"). Washing the pinned frame
          // toward the next section's own dark tone during exactly that
          // stretch turns it into a visible handoff instead of a void.
          const lastExitT = gsap.utils.clamp(0, 1, (p - n) / 0.5);
          const bridge = easeBridge(lastExitT);
          gsap.set(bridgeRef.current, { opacity: bridge });
          gsap.set(cueRef.current, { opacity: bridge, y: (1 - bridge) * 16 });
        },
      });
      return () => trigger.kill();
    });

    return () => mm.revert();
  }, []);

  const tCommon = useTranslations("common");
  const locale = useLocale() as "ar" | "en";

  return (
    <div ref={wrapRef} style={{ height: `${(services.length + TAIL_UNITS) * 100}vh` }} className="relative hidden lg:block">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {services.map((s, i) => {
          const Icon = serviceIcons[s.slug];
          return (
            <div
              key={s.slug}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="absolute inset-x-0 mx-auto w-full max-w-6xl px-6"
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              <Link
                href={`/services/${s.slug}`}
                data-cursor-hover
                data-cursor-media
                className="chamfer focus-ring group relative grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-center gap-14 overflow-hidden border border-line p-14 shadow-[var(--shadow-mzn-lg)] xl:p-20"
                style={{ background: tints[i % tints.length] }}
              >
                <span
                  aria-hidden
                  className={`pointer-events-none absolute -bottom-10 text-[16rem] leading-none text-bronze-500/[0.07] select-none ${locale === "ar" ? "font-display-ar" : "font-display"}`}
                  style={{ insetInlineStart: "-1rem" }}
                >
                  0{i + 1}
                </span>

                <div className="relative flex flex-col items-start gap-10">
                  <div className="relative flex h-24 w-24 items-center justify-center border border-bronze-500/30 bg-paper-raised/70 text-bronze-600 shadow-[var(--shadow-mzn-sm)]">
                    <span className="pointer-events-none absolute -inset-2.5 border border-bronze-500/15" aria-hidden />
                    <Icon className="h-11 w-11" />
                  </div>

                  {/* Vertical progress rail — where this service sits among the four */}
                  <div className="relative flex flex-col items-start">
                    {services.map((svc, idx) => (
                      <div key={svc.slug} className="relative flex items-center gap-3 py-2">
                        {idx < services.length - 1 && (
                          <span className="absolute top-[20px] h-[22px] w-px bg-line" style={{ insetInlineStart: "5px" }} aria-hidden />
                        )}
                        <span
                          className={`relative z-10 h-[11px] w-[11px] flex-none border transition-all duration-500 ${
                            idx === i ? "scale-125 border-bronze-500 bg-bronze-500" : "border-line-strong bg-paper-raised"
                          }`}
                          aria-hidden
                        />
                        <span
                          className={`font-mono text-xs transition-colors duration-500 ${
                            idx === i ? "text-bronze-600" : "text-ink-faint"
                          }`}
                        >
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <h3 className={`text-h1 ${locale === "ar" ? "font-display-ar" : "font-display"}`}>
                    {s.title[locale]}
                  </h3>
                  <p className="lede mt-5 max-w-lg">{s.summary[locale]}</p>
                  <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
                    {s.bullets.map((b) => (
                      <li key={b.en} className="flex items-start gap-2.5 text-sm text-ink-soft">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-none rotate-45 bg-bronze-500" aria-hidden />
                        {b[locale]}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-bronze-600">
                    {tCommon("learnMore")}
                    <span className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" aria-hidden>
                      {locale === "ar" ? "←" : "→"}
                    </span>
                  </span>
                </div>
              </Link>
            </div>
          );
        })}

        {/* Bridges the pin's unavoidable trailing scroll budget into the next
            section's own tone, so that stretch reads as an intentional
            handoff rather than a blank hold once the last card is gone. */}
        <div
          ref={bridgeRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0"
          style={{ zIndex: 10, background: "var(--graphite-800)" }}
        />
        <div
          ref={cueRef}
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-10 flex flex-col items-center gap-2 opacity-0 text-graphite-200"
          style={{ zIndex: 11 }}
        >
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em]">{tCommon("keepScrolling")}</span>
          <span className="h-9 w-px animate-pulse bg-gradient-to-b from-bronze-400 to-transparent" />
        </div>
      </div>
    </div>
  );
}

function SimpleList() {
  const tCommon = useTranslations("common");
  const locale = useLocale() as "ar" | "en";

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-6 sm:px-8 lg:hidden">
      {services.map((s, i) => {
        const Icon = serviceIcons[s.slug];
        return (
          <Link
            key={s.slug}
            href={`/services/${s.slug}`}
            data-cursor-hover
            className="card-accent chamfer focus-ring group block border border-line bg-paper-raised p-7 transition-colors duration-300 hover:border-bronze-400 sm:p-9"
          >
            <div className="flex items-start gap-5">
              <div className="flex h-14 w-14 flex-none items-center justify-center border border-bronze-500/30 bg-paper-sunken text-bronze-600">
                <Icon className="h-7 w-7" />
              </div>
              <div>
                <span className="font-mono text-xs text-ink-faint">0{i + 1}</span>
                <h3 className={`mt-1 text-h3 ${locale === "ar" ? "font-display-ar" : "font-display"}`}>
                  {s.title[locale]}
                </h3>
              </div>
            </div>
            <p className="mt-4 text-[0.95rem] text-ink-soft">{s.summary[locale]}</p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-bronze-600">
              {tCommon("learnMore")}
              <span className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" aria-hidden>
                {locale === "ar" ? "←" : "→"}
              </span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}

export function StackedServices() {
  return (
    <>
      <StackedDeck />
      <SimpleList />
    </>
  );
}
