"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";

export function LocaleSwitch({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const next = locale === "ar" ? "en" : "ar";

  return (
    <button
      type="button"
      onClick={() =>
        router.replace(
          // @ts-expect-error -- pathname is dynamically typed by next-intl per route
          { pathname, params },
          { locale: next }
        )
      }
      className={className}
      aria-label={next === "ar" ? "التبديل إلى العربية" : "Switch to English"}
    >
      {next === "ar" ? "AR" : "EN"}
    </button>
  );
}
