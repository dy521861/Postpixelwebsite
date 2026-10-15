import { Plus } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/layout/Section";
import { JsonLd } from "@/components/seo/JsonLd";

type Item = { q: string; a: string };

/** FAQ using native <details>: fully server-rendered, no JavaScript needed. */
export function Faq({ items }: { items: Item[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };

  return (
    <Section tone="paper" labelledBy="faq-title">
      <JsonLd data={schema} />
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
        <SectionHeading
          id="faq-title"
          tone="light"
          eyebrow="FAQ"
          title="Questions owners ask us."
          body="Something else on your mind? Email hello@postpixel.ai and a real person will answer."
        />
        <div className="divide-y divide-line border-y border-line">
          {items.map((item) => (
            <details key={item.q} className="group py-1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-bold [&::-webkit-details-marker]:hidden">
                {item.q}
                <Plus
                  className="h-5 w-5 shrink-0 text-lime-ink transition-transform group-open:rotate-45"
                  aria-hidden="true"
                />
              </summary>
              <p className="pb-6 leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}
