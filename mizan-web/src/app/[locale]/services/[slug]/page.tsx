import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { MeanderDivider } from "@/components/motion/meander-divider";
import { CtaBand } from "@/components/sections/cta-band";
import { Link } from "@/i18n/navigation";
import { services, getServiceBySlug } from "@/content/services";
import { serviceIcons } from "@/components/icons/service-icons";

type Locale = "ar" | "en";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug);
  return { title: service?.title[locale as Locale] ?? "Service" };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;
  const service = getServiceBySlug(slug);
  const tCommon = await getTranslations({ locale, namespace: "common" });

  if (!service) notFound();

  const others = services.filter((s) => s.slug !== slug);
  const Icon = serviceIcons[service.slug];
  const index = services.findIndex((s) => s.slug === slug);

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(100% 100% at 10% -20%, color-mix(in srgb, var(--bronze-500) 12%, transparent), transparent 55%)",
          }}
        />
        <Container className="relative pt-36 pb-20 sm:pt-40 lg:pb-24">
          <Reveal>
            <Link href="/services" className="focus-ring font-mono text-xs uppercase tracking-wider text-ink-faint hover:text-bronze-600">
              {loc === "ar" ? "→" : "←"} {tCommon("backToServices")}
            </Link>
            <div className="mt-6 flex items-start gap-5">
              <div className="hidden h-16 w-16 flex-none items-center justify-center border border-bronze-500/30 bg-paper-raised text-bronze-600 shadow-[var(--shadow-mzn-sm)] sm:flex">
                {Icon && <Icon className="h-8 w-8" />}
              </div>
              <div>
                <span className="font-mono text-xs text-ink-faint">
                  {String(index + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                </span>
                <h1 className={`mt-2 max-w-3xl text-balance text-h1 ${loc === "ar" ? "font-display-ar" : "font-display"}`}>
                  {service.title[loc]}
                </h1>
              </div>
            </div>
            <p className="lede mt-6 max-w-2xl">{service.description[loc]}</p>
          </Reveal>
        </Container>
      </section>

      <section className="py-20">
        <Container className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <h2 className={`text-h3 ${loc === "ar" ? "font-display-ar" : "font-display"}`}>
              {loc === "ar" ? "ما تحصل عليه" : "What's included"}
            </h2>
            <div className="mt-6 max-w-md">
              <MeanderDivider />
            </div>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {service.bullets.map((b) => (
                <li key={b.en} className="flex items-start gap-3 text-ink-soft">
                  <span
                    className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center border border-bronze-500/40 bg-paper-sunken text-bronze-600"
                    aria-hidden
                  >
                    <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M2.5 6.2 L5 8.7 L9.5 3.5" strokeLinecap="square" strokeLinejoin="miter" />
                    </svg>
                  </span>
                  <span className="text-[0.95rem] leading-relaxed">{b[loc]}</span>
                </li>
              ))}
            </ul>
            <Button href="/contact" variant="primary" className="mt-10">
              {tCommon("bookConsultation")}
            </Button>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="chamfer border border-line bg-paper-raised p-7">
              <h3 className="font-mono text-xs uppercase tracking-wider text-ink-faint">
                {loc === "ar" ? "خدمات أخرى" : "Other services"}
              </h3>
              <div className="mt-5 flex flex-col gap-4">
                {others.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="focus-ring border-t border-line pt-4 first:border-t-0 first:pt-0"
                  >
                    <div className={`text-base ${loc === "ar" ? "font-display-ar" : "font-display"}`}>
                      {s.title[loc]}
                    </div>
                    <div className="mt-1 text-sm text-ink-faint">{s.summary[loc]}</div>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
