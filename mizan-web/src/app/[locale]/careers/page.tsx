import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Tilt } from "@/components/motion/tilt";
import { CtaBand } from "@/components/sections/cta-band";
import { careerValues } from "@/content/career-values";
import { IconConsulting, IconOptimization, IconTransformation } from "@/components/icons/capability-icons";
import { IconTraining } from "@/components/icons/service-icons";

const valueIcons = {
  understand: IconConsulting,
  learn: IconTraining,
  measure: IconOptimization,
  digital: IconTransformation,
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "careers" });
  return { title: t("heading") };
}

export default async function CareersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "careers" });
  const loc = locale as "ar" | "en";

  return (
    <>
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(100% 100% at 10% -20%, color-mix(in srgb, var(--bronze-500) 12%, transparent), transparent 55%)",
          }}
        />
        <Container className="relative pt-36 pb-20 sm:pt-40 lg:pb-28">
          <Reveal>
            <div className="max-w-2xl">
              <p className="eyebrow text-bronze-600">{t("eyebrow")}</p>
              <h1 className={`mt-5 text-balance text-h1 ${loc === "ar" ? "font-display-ar" : "font-display"}`}>
                {t("heading")}
              </h1>
              <p className="lede mt-6">{t("sub")}</p>
              <Magnetic>
                <Button href="/contact" variant="primary" className="mt-9">
                  {t("cta")}
                </Button>
              </Magnetic>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="texture-dots relative overflow-hidden py-20 lg:py-28">
        <Container className="relative">
          <Reveal>
            <div className="max-w-2xl">
              <p className="eyebrow text-bronze-600">{t("valuesKicker")}</p>
              <h2 className={`mt-4 text-balance text-h2 ${loc === "ar" ? "font-display-ar" : "font-display"}`}>
                {t("valuesHeading")}
              </h2>
              <p className="lede mt-5">{t("valuesSub")}</p>
            </div>
          </Reveal>

          <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2">
            {careerValues.map((v) => {
              const Icon = valueIcons[v.key];
              return (
                <RevealItem key={v.key}>
                  <Tilt max={6} className="h-full">
                    <div
                      data-cursor-hover
                      className="card-accent chamfer group relative h-full overflow-hidden border border-line bg-paper-raised p-8 transition-all duration-300 hover:border-bronze-500 hover:shadow-[var(--shadow-mzn-md)]"
                    >
                      <div className="flex h-14 w-14 items-center justify-center border border-bronze-500/30 bg-paper-sunken text-bronze-600 transition-colors duration-300 group-hover:text-bronze-700">
                        <Icon className="h-7 w-7" />
                      </div>
                      <h3
                        className={`mt-6 text-h3 ${loc === "ar" ? "font-display-ar" : "font-display"}`}
                      >
                        {t(`values.${v.key}.title`)}
                      </h3>
                      <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">
                        {t(`values.${v.key}.desc`)}
                      </p>
                    </div>
                  </Tilt>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
