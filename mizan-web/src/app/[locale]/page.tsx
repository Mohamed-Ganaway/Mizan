import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { TrustMarquee } from "@/components/sections/trust-marquee";
import { Thesis } from "@/components/sections/thesis";
import { ServicesGrid } from "@/components/sections/services-grid";
import { OdooSpotlight } from "@/components/sections/odoo-spotlight";
import { SectorsGrid } from "@/components/sections/sectors-grid";
import { Triad } from "@/components/sections/triad";
import { ClientsWall } from "@/components/sections/clients-wall";
import { TeamSection } from "@/components/sections/team-section";
import { CtaBand } from "@/components/sections/cta-band";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <TrustMarquee />
      <Thesis />
      <ServicesGrid />
      <OdooSpotlight />
      <SectorsGrid />
      <Triad />
      <ClientsWall />
      <TeamSection />
      <CtaBand />
    </>
  );
}
