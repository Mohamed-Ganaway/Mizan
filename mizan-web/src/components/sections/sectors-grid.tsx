import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { NetworkBg } from "@/components/motion/network-bg";
import { SectorCards } from "@/components/sections/sector-cards";

export function SectorsGrid() {
  const t = useTranslations("sectors");
  const locale = useLocale() as "ar" | "en";

  return (
    <section className="relative overflow-hidden py-28">
      <NetworkBg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.35]" />

      <Container className="relative">
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow text-bronze-600">{t("kicker")}</p>
            <h2 className={`mt-4 text-balance text-h2 ${locale === "ar" ? "font-display-ar" : "font-display"}`}>
              {t("heading")}
            </h2>
            <p className="lede mt-5">{t("sub")}</p>
          </div>
        </Reveal>

        <div className="mt-12">
          <SectorCards />
        </div>
      </Container>
    </section>
  );
}
