import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { FloatingOrbs } from "@/components/motion/floating-orbs";

const orbs = [
  { size: 380, top: "-20%", left: "70%", color: "radial-gradient(circle, var(--bronze-600), transparent 70%)", driftX: -40, driftY: 30, duration: 15 },
];

export function CtaBand() {
  const t = useTranslations("cta");
  const tCommon = useTranslations("common");
  const locale = useLocale();

  return (
    <section className="relative overflow-hidden bg-ink py-24 text-paper">
      <FloatingOrbs orbs={orbs} />
      <Container>
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
            <div className="max-w-xl">
              <h2 className={`text-balance text-h2 ${locale === "ar" ? "font-display-ar" : "font-display"}`}>
                {t("heading")}
              </h2>
              <p className="lede mt-5 text-graphite-200">{t("sub")}</p>
              <Magnetic>
                <Button href="/contact" variant="primary" className="mt-8">
                  {tCommon("bookConsultation")}
                </Button>
              </Magnetic>
            </div>

            <div className="grid gap-5 font-mono text-sm text-graphite-200">
              <div>
                <div className="text-xs uppercase tracking-wider text-gold-200">{t("phone")}</div>
                <div dir="ltr" className="mt-1">+218-91-6594235</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-gold-200">{t("email")}</div>
                <div dir="ltr" className="mt-1">info@mizan.com.ly</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-gold-200">{t("office")}</div>
                <div className="mt-1 max-w-xs">
                  {locale === "ar"
                    ? "شارع 23 يوليو، مبنى برج السلام، بنغازي"
                    : "23 July Street, Borj Alsalam Building, Benghazi"}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
