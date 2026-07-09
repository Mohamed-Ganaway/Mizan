import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { StackedServices } from "@/components/sections/stacked-services";

export function ServicesGrid() {
  const t = useTranslations("services");
  const locale = useLocale();

  return (
    <section className="relative py-24 lg:py-0">
      <Container className="lg:pt-14">
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow text-bronze-600">{t("kicker")}</p>
            <h2 className={`mt-4 text-balance text-h2 ${locale === "ar" ? "font-display-ar" : "font-display"}`}>
              {t("heading")}
            </h2>
            <p className="lede mt-5">{t("sub")}</p>
          </div>
        </Reveal>
      </Container>

      <div className="mt-12 lg:mt-0">
        <StackedServices />
      </div>
    </section>
  );
}
