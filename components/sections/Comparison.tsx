import Link from "next/link";
import { ArrowRight, Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container, Section, SectionHeading } from "@/components/layout/Section";
import { comparison } from "@/content/home";

export function Comparison() {
  return (
    <Section tone="paper" labelledBy="comparison-title">
      <Container>
        <SectionHeading id="comparison-title" tone="light" eyebrow={comparison.eyebrow} title={comparison.title} />
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {comparison.options.map((o) => (
            <li
              key={o.name}
              className={cn(
                "rounded-[1.5rem] p-7",
                o.featured ? "bg-ink text-white ring-2 ring-lime" : "border border-line bg-white",
              )}
            >
              <h3 className={cn("font-bold", o.featured ? "text-lime" : "text-muted")}>{o.name}</h3>
              <p className="mt-4 text-5xl font-extrabold tracking-[-0.04em]">{o.cost}</p>
              <p className={cn("mt-1 text-sm", o.featured ? "text-muted-dark" : "text-muted")}>{o.unit}</p>
              <ul className="mt-6 space-y-2.5 text-[0.95rem]">
                {o.points.map((p) => (
                  <li key={p} className="flex gap-2.5">
                    {o.featured ? (
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-lime" aria-hidden="true" />
                    ) : (
                      <Minus className="mt-0.5 h-4 w-4 shrink-0 text-black/40" aria-hidden="true" />
                    )}
                    {p}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-col gap-3 text-sm sm:flex-row sm:gap-8">
          {comparison.links.map((l) => (
            <Link key={l.href} href={l.href} className="inline-flex items-center gap-2 font-semibold text-lime-ink hover:underline">
              {l.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
