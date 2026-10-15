import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container, Section, SectionHeading } from "@/components/layout/Section";
import { testimonials } from "@/content/social-proof";

export function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <Section tone="white" labelledBy="testimonials-title">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id="testimonials-title"
            tone="light"
            eyebrow="From the owners"
            title="Owners who got their evenings back."
          />
          <Link href="/reviews" className="inline-flex items-center gap-2 font-semibold text-lime-ink hover:underline">
            Read more reviews <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <li
              key={i}
              className={cn(
                "relative flex flex-col rounded-[1.5rem] border p-7",
                t.placeholder ? "border-dashed border-black/25 bg-paper" : "border-line bg-paper",
              )}
            >
              {t.placeholder && (
                <span className="absolute -top-3 left-6 rounded-full bg-black px-2.5 py-1 text-[11px] font-bold tracking-wider text-lime uppercase">
                  Placeholder
                </span>
              )}
              <Quote className="h-6 w-6 text-lime-ink" aria-hidden="true" />
              <blockquote className="mt-4 flex-1 text-lg leading-snug font-semibold">{t.quote}</blockquote>
              <div className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-black text-sm font-bold text-lime">
                  {t.business.charAt(0)}
                </span>
                <span className="text-sm">
                  <span className="block font-bold">
                    {t.name}, {t.business}
                  </span>
                  <span className="block text-muted">
                    {t.trade} · {t.town}
                  </span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
