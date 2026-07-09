import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/sections/page-hero";
import { NetworkBg } from "@/components/motion/network-bg";
import { SectorCards } from "@/components/sections/sector-cards";
import { ClientsWall } from "@/components/sections/clients-wall";
import { CtaBand } from "@/components/sections/cta-band";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "industriesPage" });
  return { title: t("heading") };
}

export default async function IndustriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "industriesPage" });

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} heading={t("heading")} sub={t("sub")} />

      <section className="relative overflow-hidden py-20">
        <NetworkBg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.35]" />
        <Container className="relative">
          <SectorCards />
        </Container>
      </section>

      <ClientsWall />
      <CtaBand />
    </>
  );
}
