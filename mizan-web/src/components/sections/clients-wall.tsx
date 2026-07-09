import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { clients } from "@/content/clients";

function LogoTile({ client }: { client: (typeof clients)[number] }) {
  return (
    <div
      data-cursor-hover
      className="group/tile chamfer-sm relative flex h-24 w-48 flex-none items-center justify-center overflow-hidden border border-line bg-paper-raised transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:border-bronze-400/60 hover:shadow-[var(--shadow-mzn-md)]"
    >
      {/* Sheen — a quiet top-down glint, only visible on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/tile:opacity-100"
        style={{
          background: "linear-gradient(180deg, color-mix(in srgb, var(--gold-200) 10%, transparent), transparent 65%)",
        }}
      />
      {/* Every logo is a plain white silhouette mask (see src/content/clients.ts) —
          the only thing that varies between clients is shape, never color or
          background treatment, which is what makes the wall read as one system. */}
      <span
        aria-hidden
        className="relative block h-9 w-32 bg-ink-faint opacity-80 transition-[background-color,opacity] duration-300 group-hover/tile:bg-bronze-600 group-hover/tile:opacity-100"
        style={{
          maskImage: `url(${client.mask.src})`,
          WebkitMaskImage: `url(${client.mask.src})`,
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
        }}
      />
      <span className="sr-only">{client.name}</span>
    </div>
  );
}

function MarqueeRow() {
  // Two copies is the whole trick: translateX cycles 0 → -50% (exactly one
  // copy's width) on a linear timing function, so the frame where it resets
  // is pixel-identical to the frame before — no jump, no pause, ever. The
  // row never listens to hover at all (previously it paused on hover, which
  // is what read as "stopping" — richness now lives entirely on each tile).
  const loop = [...clients, ...clients];
  return (
    <div className="overflow-hidden">
      <div className="animate-marquee flex w-max gap-5 [will-change:transform]">
        {loop.map((c, i) => (
          <LogoTile key={`${c.name}-${i}`} client={c} />
        ))}
      </div>
    </div>
  );
}

export function ClientsWall() {
  const t = useTranslations("clients");
  const locale = useLocale();

  return (
    <section className="texture-dots relative overflow-hidden py-28">
      <Container>
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow text-bronze-600">{t("kicker")}</p>
            <h2 className={`mt-4 text-balance text-h2 ${locale === "ar" ? "font-display-ar" : "font-display"}`}>
              {t("heading")}
            </h2>
          </div>
        </Reveal>
      </Container>

      <Reveal delay={0.1}>
        <div
          className="mt-12"
          style={{
            maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <MarqueeRow />
        </div>
      </Reveal>
    </section>
  );
}
