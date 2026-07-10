import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Tilt } from "@/components/motion/tilt";
import { TeamAvatar } from "@/components/ui/team-avatar";
import { team } from "@/content/team";

export function TeamSection() {
  const t = useTranslations("team");
  const locale = useLocale() as "ar" | "en";

  return (
    <section className="py-28">
      <Container>
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow text-bronze-600">{t("kicker")}</p>
            <h2 className={`mt-4 text-balance text-h2 ${locale === "ar" ? "font-display-ar" : "font-display"}`}>
              {t("heading")}
            </h2>
          </div>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {team.map((member) => (
            <RevealItem key={member.name.en}>
              <Tilt max={7} className="h-full">
                <div
                  data-cursor-hover
                  className="chamfer group relative h-full overflow-hidden border border-line bg-graphite-800 shadow-[var(--shadow-mzn-sm)] transition-shadow duration-500 hover:shadow-[0_0_0_1px_var(--bronze-500),var(--shadow-mzn-lg)]"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    <TeamAvatar photo={member.photo} name={member.name[locale]} gender={member.gender} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent transition-opacity duration-500 group-hover:from-black/90" />
                    <div
                      className="absolute inset-x-0 bottom-0 h-[2px] origin-center scale-x-0 bg-gradient-to-r from-transparent via-bronze-400 to-transparent transition-transform duration-500 group-hover:scale-x-100"
                      aria-hidden
                    />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <div className="text-sm font-semibold text-paper">{member.name[locale]}</div>
                      <div className="mt-0.5 text-xs text-gold-200">{member.role[locale]}</div>
                    </div>
                  </div>
                </div>
              </Tilt>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
