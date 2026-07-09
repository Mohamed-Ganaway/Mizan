"use client";

import { useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/reveal";
import { Tilt } from "@/components/motion/tilt";
import { gsap, ScrollTrigger, ensureGsapPlugins } from "@/lib/gsap";
import { services } from "@/content/services";
import { serviceIcons } from "@/components/icons/service-icons";

const tints = [
  "linear-gradient(135deg, color-mix(in srgb, var(--bronze-500) 14%, var(--paper-raised)), var(--paper-raised) 65%)",
  "linear-gradient(135deg, color-mix(in srgb, var(--graphite-600) 12%, var(--paper-raised)), var(--paper-raised) 65%)",
  "linear-gradient(135deg, color-mix(in srgb, var(--bronze-500) 14%, var(--paper-raised)), var(--paper-raised) 65%)",
  "linear-gradient(135deg, color-mix(in srgb, var(--graphite-600) 12%, var(--paper-raised)), var(--paper-raised) 65%)",
];

export function ServiceShowcase() {
  const tCommon = useTranslations("common");
  const locale = useLocale() as "ar" | "en";
  const railRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    ensureGsapPlugins();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const progress = progressRef.current;
    if (reduced || !progress) return;

    const nodes = nodeRefs.current.filter(Boolean) as HTMLDivElement[];
    gsap.set(progress, { scaleY: 0 });
    gsap.set(nodes, { scale: 0.65, opacity: 0.4, borderColor: "var(--line-strong)" });

    const trigger = ScrollTrigger.create({
      trigger: railRef.current,
      start: "top 65%",
      end: "bottom 75%",
      scrub: 0.5,
      onUpdate: (self) => {
        gsap.set(progress, { scaleY: self.progress });
        nodes.forEach((el, i) => {
          const threshold = i / Math.max(1, nodes.length - 1);
          const active = self.progress >= threshold - 0.04;
          gsap.set(el, {
            scale: active ? 1 : 0.65,
            opacity: active ? 1 : 0.4,
            borderColor: active ? "var(--bronze-500)" : "var(--line-strong)",
          });
        });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <div ref={railRef} className="relative">
      {/* connecting spine — draws down as you scroll through the services */}
      <div
        className="pointer-events-none absolute top-0 hidden h-full w-px bg-line sm:block"
        style={{ insetInlineStart: "27px" }}
        aria-hidden
      />
      <div
        ref={progressRef}
        className="pointer-events-none absolute top-0 hidden h-full w-px origin-top bg-bronze-500 sm:block"
        style={{ insetInlineStart: "27px" }}
        aria-hidden
      />

      <div className="flex flex-col gap-20 sm:gap-28">
        {services.map((s, i) => {
          const Icon = serviceIcons[s.slug];
          const reverse = i % 2 === 1;
          return (
            <div key={s.slug} className="relative">
              <div
                ref={(el) => {
                  nodeRefs.current[i] = el;
                }}
                className="chamfer-sm absolute top-1 hidden h-14 w-14 items-center justify-center border-2 bg-paper text-bronze-600 sm:flex"
                style={{ insetInlineStart: 0 }}
              >
                <span className="font-mono text-sm">{String(i + 1).padStart(2, "0")}</span>
              </div>

              <Reveal>
                <div
                  className={`grid gap-8 sm:ps-24 lg:grid-cols-2 lg:items-center lg:gap-16 ${
                    reverse ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div>
                    <div className="mb-5 flex h-14 w-14 items-center justify-center border border-bronze-500/30 bg-paper-sunken text-bronze-600 sm:hidden">
                      <Icon className="h-7 w-7" />
                    </div>
                    <span className="font-mono text-xs text-ink-faint sm:hidden">
                      {String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                    </span>
                    <h3
                      className={`mt-2 text-h2 sm:mt-0 ${locale === "ar" ? "font-display-ar" : "font-display"}`}
                    >
                      {s.title[locale]}
                    </h3>
                    <p className="lede mt-4">{s.description[locale]}</p>
                    <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                      {s.bullets.map((b) => (
                        <li key={b.en} className="group/bullet flex items-start gap-2.5 text-sm text-ink-soft">
                          <span
                            className="mt-1.5 h-1.5 w-1.5 flex-none rotate-45 bg-bronze-500 transition-transform duration-300 group-hover/bullet:scale-150"
                            aria-hidden
                          />
                          {b[locale]}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/services/${s.slug}`}
                      data-cursor-hover
                      className="group/link mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-bronze-600"
                    >
                      {tCommon("learnMore")}
                      <span
                        className="transition-transform group-hover/link:translate-x-1 rtl:group-hover/link:-translate-x-1"
                        aria-hidden
                      >
                        {locale === "ar" ? "←" : "→"}
                      </span>
                    </Link>
                  </div>

                  <Tilt max={5} className="h-full">
                    <Link
                      href={`/services/${s.slug}`}
                      data-cursor-hover
                      data-cursor-media
                      className="chamfer group relative block aspect-[4/3] overflow-hidden border border-line shadow-[var(--shadow-mzn-sm)] transition-shadow duration-300 hover:shadow-[var(--shadow-mzn-md)]"
                      style={{ background: tints[i % tints.length] }}
                    >
                      <span
                        aria-hidden
                        className={`pointer-events-none absolute -bottom-8 text-[10rem] leading-none text-bronze-500/[0.09] select-none ${
                          locale === "ar" ? "font-display-ar" : "font-display"
                        }`}
                        style={{ insetInlineStart: "-0.5rem" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="relative flex h-full items-center justify-center p-8">
                        <div className="flex h-20 w-20 items-center justify-center border border-bronze-500/30 bg-paper-raised/70 text-bronze-600 shadow-[var(--shadow-mzn-sm)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                          <Icon className="h-10 w-10" />
                        </div>
                      </div>
                    </Link>
                  </Tilt>
                </div>
              </Reveal>
            </div>
          );
        })}
      </div>
    </div>
  );
}
