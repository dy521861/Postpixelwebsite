import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/layout/Section";
import { PixelStage } from "./PixelStage";
import { hero } from "@/content/home";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-ink text-white">
      {/* night sky: cool blue glow fading to black, a hint of lime */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 75% 20%, rgba(56,97,180,0.28), transparent 70%), radial-gradient(40% 35% at 15% 85%, rgba(204,252,125,0.08), transparent 70%)",
        }}
      />
      <Container className="relative grid items-center gap-14 pt-14 pb-24 sm:pt-20 lg:grid-cols-[1fr_1.05fr] lg:gap-12 lg:pt-24 lg:pb-32">
        <div>
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <h1 id="hero-title" className="text-[2.6rem] leading-[1.02] font-extrabold sm:text-6xl lg:text-[4.25rem]">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70 sm:text-xl">{hero.subtitle}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={site.signupUrl} size="lg">
              {hero.primaryCta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} variant="ghostDark" size="lg">
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
          <p className="mt-5 text-sm text-white/50">{hero.note}</p>
        </div>
        <PixelStage hero={hero} />
      </Container>
    </section>
  );
}
