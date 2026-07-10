import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { services } from "@/content/services";
import mizanLogo from "@/assets/brand/mizan-logo.png";
import odooBadge from "@/assets/brand/odoo-silver-partner.png";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale() as "ar" | "en";

  return (
    <footer className="border-t border-line bg-paper-sunken">
      <Container className="py-16">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 flex flex-col gap-4 lg:col-span-2">
            <Link href="/" className="focus-ring flex items-center gap-3">
              <Image src={mizanLogo} alt="Mizan" width={34} height={34} className="h-8 w-8 object-contain" />
              <span className={locale === "ar" ? "font-display-ar text-base" : "font-display text-base"}>
                {locale === "ar" ? "ميزان" : "Mizan"}
              </span>
            </Link>
            <p className="max-w-xs text-sm text-ink-soft">{t("tagline")}</p>
            <p className="max-w-xs text-xs text-ink-faint">{t("address")}</p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-mono text-xs uppercase tracking-wider text-ink-faint">
              {t("servicesHeading")}
            </h3>
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="focus-ring -my-2 py-2 text-sm text-ink-soft hover:text-bronze-600"
              >
                {s.title[locale]}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-mono text-xs uppercase tracking-wider text-ink-faint">
              {t("companyHeading")}
            </h3>
            <Link href="/about" className="focus-ring -my-2 py-2 text-sm text-ink-soft hover:text-bronze-600">
              {tNav("about")}
            </Link>
            <Link href="/industries" className="focus-ring -my-2 py-2 text-sm text-ink-soft hover:text-bronze-600">
              {tNav("industries")}
            </Link>
            <Link href="/careers" className="focus-ring -my-2 py-2 text-sm text-ink-soft hover:text-bronze-600">
              {tNav("careers")}
            </Link>
            <Link href="/contact" className="focus-ring -my-2 py-2 text-sm text-ink-soft hover:text-bronze-600">
              {tNav("contact")}
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-mono text-xs uppercase tracking-wider text-ink-faint">
              {t("resourcesHeading")}
            </h3>
            <Image src={odooBadge} alt="Odoo Silver Partner" className="h-8 w-auto object-contain" />
            <span className="text-sm text-ink-soft">{t("credentialSince")}</span>
            <span className="text-sm text-ink-soft">{t("credentialSectors")}</span>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <span>&copy; {new Date().getFullYear()} Mizan Consulting &amp; Training — {t("rights")}</span>
          <span className="font-mono">+218-91-6594235 · info@mizan.com.ly</span>
        </div>
      </Container>
    </footer>
  );
}
