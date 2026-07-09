"use client";

import { useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { Tilt } from "@/components/motion/tilt";
import { gsap, ScrollTrigger, ensureGsapPlugins } from "@/lib/gsap";

const items = [
  {
    tagKey: "visionTag",
    numeral: "I",
    ar: "أن تكون ميزان الخيار الأول للمؤسسات التي تبحث عن شريك يجمع بين الخبرة المالية، الفهم الإداري، والقدرة على تنفيذ حلول رقمية عملية تدعم النمو المستدام.",
    en: "To be the first choice for organizations seeking a partner who combines financial expertise, administrative insight, and the ability to deliver practical digital solutions for sustainable growth.",
  },
  {
    tagKey: "missionTag",
    numeral: "II",
    ar: "أن نكون شريكًا فاعلًا في نجاح عملائنا من خلال تبادل الخبرات، نقل المعرفة، وبناء القدرات، وتقديم حلول استشارية وتدريبية ورقمية عملية تساعد المؤسسات على تنمية أعمالها ورفع كفاءتها.",
    en: "An active partner in our clients' success — exchanging expertise, transferring knowledge, building capacity, and delivering practical consulting, training and digital solutions that grow their business and raise efficiency.",
  },
  {
    tagKey: "purposeTag",
    numeral: "III",
    ar: "أن نساهم في بناء مؤسسات أكثر تنظيمًا وكفاءة واستدامة، من خلال نقل الخبرة، تطوير الإجراءات، تمكين فرق العمل، وتطبيق حلول رقمية تساعد الإدارة على الرقابة واتخاذ قرارات أفضل.",
    en: "To help build more organized, efficient, and sustainable institutions — by transferring expertise, refining procedures, empowering teams, and applying digital solutions that strengthen oversight and decision-making.",
  },
] as const;

export function Triad() {
  const t = useTranslations("triad");
  const locale = useLocale() as "ar" | "en";
  const railRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    ensureGsapPlugins();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const line = lineRef.current;
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      if (reduced || !line) return;

      gsap.set(line, { drawSVG: "0%" });
      gsap.set(cards, { opacity: 0.5, scale: 0.96 });

      const trigger = ScrollTrigger.create({
        trigger: railRef.current,
        start: "top 78%",
        end: "bottom 55%",
        scrub: 0.5,
        onUpdate: (self) => {
          gsap.set(line, { drawSVG: `0% ${self.progress * 100}%` });
          cards.forEach((el, i) => {
            const threshold = i / (cards.length - 1);
            const active = self.progress >= threshold - 0.05;
            gsap.set(el, { opacity: active ? 1 : 0.5, scale: active ? 1 : 0.96 });
          });
        },
      });

      return () => trigger.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="texture-dots relative overflow-hidden py-28">
      <Container className="relative">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-bronze-600">{t("kicker")}</p>
            <h2 className={`mt-4 text-balance text-h2 ${locale === "ar" ? "font-display-ar" : "font-display"}`}>
              {t("heading")}
            </h2>
          </div>
        </Reveal>

        <div ref={railRef} className="relative mt-16">
          <svg
            className="pointer-events-none absolute left-0 top-9 hidden h-[2px] w-full overflow-visible md:block"
            preserveAspectRatio="none"
            viewBox="0 0 100 2"
            style={locale === "ar" ? { transform: "scaleX(-1)" } : undefined}
          >
            <line x1="0" y1="1" x2="100" y2="1" stroke="var(--line-strong)" strokeWidth="2" />
            <line ref={lineRef} x1="0" y1="1" x2="100" y2="1" stroke="var(--bronze-500)" strokeWidth="2" />
          </svg>

          <div className="grid gap-6 md:grid-cols-3">
            {items.map((item, i) => (
              <div
                key={item.tagKey}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
              >
                <Tilt className="h-full" max={6}>
                  <div className="glass-panel-light card-accent chamfer relative h-full overflow-hidden p-8 shadow-[var(--shadow-mzn-sm)]">
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -top-4 text-8xl font-display text-bronze-500/10 select-none"
                      style={{ insetInlineEnd: "0.5rem" }}
                    >
                      {item.numeral}
                    </span>
                    <span className="eyebrow relative text-bronze-600">{t(item.tagKey)}</span>
                    <p className="relative mt-5 text-[0.95rem] leading-relaxed text-ink-soft">{item[locale]}</p>
                  </div>
                </Tilt>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
