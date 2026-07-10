import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/sections/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { MeanderDivider } from "@/components/motion/meander-divider";
import { Triad } from "@/components/sections/triad";
import { TeamSection } from "@/components/sections/team-section";
import { CtaBand } from "@/components/sections/cta-band";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("heading") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });
  const loc = locale as "ar" | "en";

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} heading={t("heading")} sub={t("intro")} />

      <section className="py-20">
        <Container className="grid gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="lede">{t("body1")}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lede">{t("body2")}</p>
          </Reveal>
        </Container>

        <Container className="mt-16">
          <Reveal>
            <div className="chamfer border border-bronze-500 bg-paper-raised p-8 sm:p-10">
              <span className="eyebrow text-bronze-600">{t("differentiatorTag")}</span>
              <div className="mt-5 max-w-sm">
                <MeanderDivider eager />
              </div>
              <p className={`mt-6 max-w-2xl text-h3 leading-snug ${loc === "ar" ? "font-display-ar" : "font-display"}`}>
                {t("differentiator")}
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <Triad />
      <TeamSection />
      <CtaBand />
    </>
  );
}
