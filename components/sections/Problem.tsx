import { ArrowRight, X } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/layout/Section";
import { PixelMark } from "@/components/brand/PixelMark";
import { problem } from "@/content/home";
import { homeownerStat } from "@/content/site";

export function Problem() {
  return (
    <Section tone="dark" labelledBy="problem-title" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(50% 50% at 85% 30%, rgba(204,252,125,0.07), transparent 70%)" }}
      />
      <Container className="relative grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div>
          <SectionHeading id="problem-title" eyebrow={problem.eyebrow} title={problem.title} body={problem.body} />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            {problem.pains.map((item) => (
              <li key={item.pain} className="rounded-[var(--radius-card)] border border-line-dark bg-ink-2 p-6">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-danger/15 text-danger">
                  <X className="h-4 w-4" aria-hidden="true" />
                </span>
                <p className="mt-5 text-lg leading-snug font-bold">{item.pain}</p>
                <p className="mt-3 flex gap-2 text-[0.95rem] font-semibold text-lime">
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
                  {item.fix}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <figure className="relative self-start overflow-hidden rounded-[1.75rem] bg-lime p-8 text-black sm:p-10 lg:sticky lg:top-24">
          <PixelMark className="absolute top-8 right-8 h-8 w-8 fill-black/15" />
          <p className="text-[6.5rem] leading-none font-extrabold tracking-[-0.05em] sm:text-[8rem]">
            {homeownerStat.value}
          </p>
          <blockquote className="mt-4 max-w-sm text-xl leading-snug font-bold">{homeownerStat.text}</blockquote>
          <figcaption className="mt-6 text-sm text-black/60">
            Source:{" "}
            {homeownerStat.sourceUrl ? (
              <a href={homeownerStat.sourceUrl} className="underline underline-offset-2" rel="noopener">
                {homeownerStat.sourceLabel}
              </a>
            ) : (
              <span>{homeownerStat.sourceLabel} (link pending)</span>
            )}
          </figcaption>
          <p className="mt-10 border-t border-black/15 pt-6 text-2xl leading-tight font-extrabold">{problem.statFooter}</p>
        </figure>
      </Container>
    </Section>
  );
}
