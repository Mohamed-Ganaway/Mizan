import { useLocale } from "next-intl";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

export function PageHero({
  eyebrow,
  heading,
  sub,
}: {
  eyebrow: string;
  heading: string;
  sub?: string;
}) {
  const locale = useLocale();

  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(100% 100% at 10% -20%, color-mix(in srgb, var(--bronze-500) 12%, transparent), transparent 55%)",
        }}
      />
      <Container className="relative pt-40 pb-24 sm:pt-44 lg:pb-28">
        <Reveal>
          <p className="eyebrow text-bronze-600">{eyebrow}</p>
          <h1
            className={`mt-5 max-w-3xl text-balance text-h1 ${
              locale === "ar" ? "font-display-ar" : "font-display"
            }`}
          >
            {heading}
          </h1>
          {sub && <p className="lede mt-6 max-w-2xl">{sub}</p>}
        </Reveal>
      </Container>
    </section>
  );
}
