"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useLenis } from "lenis/react";
import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { LocaleSwitch } from "@/components/layout/locale-switch";
import { FloatingOrbs } from "@/components/motion/floating-orbs";
import mizanLogo from "@/assets/brand/mizan-logo.png";
import odooBadge from "@/assets/brand/odoo-silver-partner.png";

const links = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/services", key: "services" },
  { href: "/industries", key: "industries" },
  { href: "/careers", key: "careers" },
  { href: "/contact", key: "contact" },
] as const;

const orbs = [
  { size: 420, top: "-10%", left: "70%", color: "radial-gradient(circle, var(--bronze-600), transparent 70%)", driftX: -50, driftY: 40, duration: 18 },
  { size: 340, top: "65%", left: "-5%", color: "radial-gradient(circle, var(--gold-200), transparent 70%)", driftX: 40, driftY: -30, duration: 21 },
];

// The exact cut used by every button and card on the site (see .chamfer /
// .chamfer-sm in globals.css) — a single top-right corner, mirrored to
// top-left in RTL. Parametrized here only because the navbar's elements
// span a much wider size range (the bar itself vs. the small active-link
// pill) than the two fixed CSS sizes cover.
const navClip = (cut: number, rtl: boolean) =>
  rtl
    ? `polygon(${cut}px 0, 100% 0, 100% 100%, 0 100%, 0 ${cut}px)`
    : `polygon(0 0, calc(100% - ${cut}px) 0, 100% ${cut}px, 100% 100%, 0 100%)`;

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale() as "ar" | "en";
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const activeIndex = (() => {
    const exact = links.findIndex((l) => l.href === pathname);
    if (exact !== -1) return exact;
    const prefix = links.findIndex((l) => l.href !== "/" && pathname.startsWith(l.href));
    return prefix !== -1 ? prefix : 0;
  })();
  const shownIndex = hoverIndex ?? activeIndex;

  useLenis((lenis) => {
    setScrolled(lenis.scroll > 24);
  });

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className={`transition-opacity duration-500 ease-out ${scrolled ? "opacity-80" : "opacity-100"}`}>
        <Container className={`flex justify-center transition-[padding] duration-400 ease-out ${scrolled ? "pt-3 sm:pt-4" : "pt-5 sm:pt-7"}`}>
          <div className="relative flex w-full max-w-6xl justify-center">
            {/* Ambient glow — the bar's own soft light source */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-10 -inset-y-6 -z-10 opacity-70 blur-2xl"
              style={{ background: "radial-gradient(60% 100% at 50% 30%, color-mix(in srgb, var(--gold-200) 22%, transparent), transparent 75%)" }}
            />

            <div
              className="glass-nav flex w-full items-center gap-2 py-2 ps-4 pe-4 transition-[padding] duration-400 ease-out sm:gap-3 sm:py-2.5 sm:ps-5 sm:pe-5"
              style={{ clipPath: navClip(24, locale === "ar") }}
            >
              {/* Logo — the bar's anchor, deliberately oversized */}
              <Link href="/" aria-label="Mizan" className="focus-ring group flex flex-none items-center" onClick={() => setOpen(false)}>
                <span
                  className={`block transition-[height,width,transform] duration-500 ease-out group-hover:rotate-[8deg] ${
                    scrolled ? "h-12 w-12 sm:h-14 sm:w-14" : "h-14 w-14 sm:h-16 sm:w-16"
                  }`}
                >
                  <Image src={mizanLogo} alt="Mizan" width={64} height={64} className="h-full w-full object-contain" priority />
                </span>
              </Link>

              <span className="h-8 w-px flex-none bg-line-strong/60 sm:h-9" aria-hidden />

              {/* Links — always visible, no toggle required */}
              <nav className="hidden flex-1 items-center justify-center gap-0.5 lg:flex" aria-label="Primary">
                {links.map((l, i) => {
                  const active = i === activeIndex;
                  return (
                    <Link
                      key={l.href}
                      href={l.href}
                      data-cursor-hover
                      className={`focus-ring group relative px-3.5 py-2.5 text-[1.02rem] font-semibold tracking-tight whitespace-nowrap transition-colors xl:px-4 ${
                        active ? "text-paper" : "text-ink-soft hover:text-ink"
                      }`}
                    >
                      <span
                        className={`absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${active ? "!opacity-0" : ""}`}
                        style={{ clipPath: navClip(8, locale === "ar"), background: "color-mix(in srgb, var(--bronze-500) 10%, transparent)" }}
                        aria-hidden
                      />
                      {active && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0"
                          style={{
                            clipPath: navClip(8, locale === "ar"),
                            background: "linear-gradient(135deg, var(--bronze-600), var(--bronze-500))",
                            boxShadow: "0 8px 18px -8px color-mix(in srgb, var(--bronze-700) 60%, transparent)",
                          }}
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className="relative">{t(l.key)}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Actions */}
              <div className="ms-auto flex flex-none items-center gap-2.5 sm:gap-3">
                <LocaleSwitch className="focus-ring hidden font-mono text-xs tracking-wide text-ink-faint transition-colors hover:text-bronze-600 lg:inline-flex" />
                <Button href="/contact" variant="primary" className="hidden text-[0.92rem] lg:inline-flex">
                  {t("bookConsultation")}
                </Button>

                {/* Mobile / tablet trigger — same plaque geometry, smaller scale */}
                <button
                  type="button"
                  data-cursor-hover
                  className="chamfer-sm flex h-11 items-center gap-2.5 border border-line-strong px-3 transition-colors duration-300 hover:border-bronze-500 lg:hidden"
                  aria-label={open ? t("close") : t("menu")}
                  aria-expanded={open}
                  onClick={() => setOpen((v) => !v)}
                >
                  <span className="font-mono text-[0.7rem] text-ink-faint">
                    {String(activeIndex + 1).padStart(2, "0")}/{String(links.length).padStart(2, "0")}
                  </span>
                  <span className="relative block h-3 w-5">
                    <span
                      className={`absolute left-0 h-[1.5px] w-full bg-ink transition-all duration-300 ${open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"}`}
                    />
                    <span
                      className={`absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 bg-ink transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`}
                    />
                    <span
                      className={`absolute left-0 h-[1.5px] w-full bg-ink transition-all duration-300 ${open ? "top-1/2 -translate-y-1/2 -rotate-45" : "top-full"}`}
                    />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Full-screen menu — mobile / tablet only, richer than a plain list */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: locale === "ar" ? "top left" : "top right" }}
            className="fixed inset-0 z-[100] overflow-hidden bg-graphite-800 text-paper lg:hidden"
          >
            <FloatingOrbs orbs={orbs} />
            <div className="texture-dots-light pointer-events-none absolute inset-0 opacity-20" aria-hidden />
            <div
              aria-hidden
              className={`pointer-events-none absolute inset-x-0 bottom-[-6vw] select-none text-center text-[26vw] font-display leading-none text-white/[0.03] ${
                locale === "ar" ? "font-display-ar" : "font-display"
              }`}
            >
              {locale === "ar" ? "ميزان" : "MIZAN"}
            </div>

            <Container className="relative flex h-full flex-col pt-24 pb-8 sm:pt-28">
              <nav aria-label="Primary" onMouseLeave={() => setHoverIndex(null)} className="flex-1">
                <ul className="flex flex-col">
                  {links.map((l, i) => {
                    const active = i === activeIndex;
                    return (
                      <motion.li
                        key={l.href}
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.05 * i, ease: [0.16, 1, 0.3, 1] }}
                        className="border-b border-white/10 first:border-t"
                        onMouseEnter={() => setHoverIndex(i)}
                      >
                        <Link
                          href={l.href}
                          onClick={() => setOpen(false)}
                          data-cursor-hover
                          className="group/link flex items-center gap-4 py-3.5 sm:gap-6"
                        >
                          <span className="font-mono text-xs text-graphite-200">{String(i + 1).padStart(2, "0")}</span>
                          <span
                            className="h-px w-6 flex-none origin-left bg-graphite-400 transition-all duration-500 group-hover/link:w-10 group-hover/link:-rotate-6 group-hover/link:bg-bronze-500 rtl:origin-right rtl:group-hover/link:rotate-6"
                            aria-hidden
                          />
                          <span
                            className={`text-[clamp(1.7rem,7vw,2.75rem)] leading-none transition-colors duration-300 ${
                              active ? "text-gold-200" : "text-paper group-hover/link:text-gold-200"
                            } ${locale === "ar" ? "font-display-ar" : "font-display"}`}
                          >
                            {t(l.key)}
                          </span>
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-5">
                <Image src={odooBadge} alt="Odoo Silver Partner" className="h-6 w-auto object-contain opacity-80" />
                <span aria-hidden className="font-mono text-[0.65rem] text-graphite-200">
                  {String(shownIndex + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="mt-5 flex items-center justify-between">
                <LocaleSwitch className="focus-ring font-mono text-xs tracking-wide text-graphite-200 hover:text-gold-200" />
                <Button href="/contact" variant="primary">
                  {t("bookConsultation")}
                </Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
