import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { MeanderDivider } from "@/components/motion/meander-divider";
import { ContactForm } from "@/app/[locale]/contact/contact-form";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactPage" });
  return { title: t("heading") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contactPage" });
  const tCta = await getTranslations({ locale, namespace: "cta" });
  const loc = locale as "ar" | "en";

  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(100% 100% at 10% -20%, color-mix(in srgb, var(--bronze-500) 12%, transparent), transparent 55%)",
        }}
      />
      <Container className="relative grid gap-16 pt-36 pb-20 sm:pt-40 lg:grid-cols-[0.9fr_1.1fr] lg:pb-28">
        <Reveal>
          <p className="eyebrow text-bronze-600">{t("eyebrow")}</p>
          <h1 className={`mt-5 text-balance text-h1 ${loc === "ar" ? "font-display-ar" : "font-display"}`}>
            {t("heading")}
          </h1>
          <p className="lede mt-6 max-w-md">{t("sub")}</p>

          <div className="mt-8 max-w-xs">
            <MeanderDivider eager />
          </div>

          <div className="mt-8 flex flex-col gap-5 font-mono text-sm">
            <div>
              <div className="text-xs uppercase tracking-wider text-bronze-600">{tCta("phone")}</div>
              <div dir="ltr" className="mt-1 text-ink">+218-91-6594235</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-bronze-600">{tCta("email")}</div>
              <div dir="ltr" className="mt-1 text-ink">info@mizan.com.ly</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-bronze-600">{tCta("office")}</div>
              <div className="mt-1 max-w-xs text-ink-soft">
                {loc === "ar"
                  ? "شارع 23 يوليو، مبنى برج السلام، الطابق الخامس، مكتب رقم 4، بنغازي، ليبيا"
                  : "23 July Street, Borj Alsalam Building, 5th Floor, Office 4, Benghazi, Libya"}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="chamfer border border-line bg-paper-raised p-7 sm:p-9">
            <ContactForm />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
