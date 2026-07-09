import { useLocale, useTranslations } from "next-intl";
import { sectors } from "@/content/sectors";

export function TrustMarquee() {
  const locale = useLocale() as "ar" | "en";
  const t = useTranslations("common");
  const items = sectors.map((s) => s[locale]);
  const loop = [...items, ...items];

  return (
    <div className="relative flex items-stretch border-y border-line bg-paper-sunken">
      <div className="hidden flex-none items-center border-e border-line bg-paper-raised px-6 py-5 sm:flex">
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-bronze-600">
          {t("sectorsServed")}
        </span>
      </div>
      <div
        className="group relative flex-1 overflow-hidden"
        style={{
          maskImage: "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
        }}
      >
        <div className="animate-marquee flex w-max items-center gap-12 py-5 group-hover:[animation-play-state:paused]">
          {loop.map((label, i) => (
            <span key={i} className="flex items-center gap-12 whitespace-nowrap text-[0.95rem] font-medium text-ink-soft">
              {label}
              <span className="h-1.5 w-1.5 rotate-45 bg-bronze-500/70" aria-hidden />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
