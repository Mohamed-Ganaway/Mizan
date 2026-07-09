"use client";

import { useLocale } from "next-intl";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Tilt } from "@/components/motion/tilt";
import { sectors } from "@/content/sectors";
import { sectorIcons } from "@/components/icons/sector-icons";

export function SectorCards() {
  const locale = useLocale() as "ar" | "en";

  return (
    <RevealGroup className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {sectors.map((s, i) => {
        const Icon = sectorIcons[i];
        return (
          <RevealItem key={s.en}>
            <Tilt max={6} className="h-full">
              <div
                data-cursor-hover
                className="card-accent chamfer-sm group relative flex h-full min-h-40 flex-col justify-between overflow-hidden border border-line bg-paper-raised p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-bronze-500 hover:shadow-[var(--shadow-mzn-md)]"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: "radial-gradient(120% 100% at 100% 0%, color-mix(in srgb, var(--bronze-500) 10%, transparent), transparent 60%)",
                  }}
                  aria-hidden
                />
                <div className="relative flex items-center justify-between">
                  <Icon className="h-7 w-7 text-bronze-500/70 transition-colors duration-300 group-hover:text-bronze-600" />
                  <span className="font-mono text-xs text-ink-faint">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <span className="relative text-base leading-snug text-ink transition-colors group-hover:text-bronze-700">
                  {s[locale]}
                </span>
                <span
                  className="absolute inset-x-5 bottom-0 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-bronze-500 to-transparent transition-transform duration-500 group-hover:scale-x-100"
                  aria-hidden
                />
              </div>
            </Tilt>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
