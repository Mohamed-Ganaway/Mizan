import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/sections/page-hero";
import { ServiceShowcase } from "@/components/sections/service-showcase";
import { CtaBand } from "@/components/sections/cta-band";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return { title: t("heading") };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "services" });

  return (
    <>
      <PageHero eyebrow={t("kicker")} heading={t("heading")} sub={t("sub")} />
      <section className="texture-dots py-20 sm:py-28">
        <Container>
          <ServiceShowcase />
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
