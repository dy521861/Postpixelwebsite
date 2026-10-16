import Link from "next/link";
import { Container } from "@/components/layout/Section";
import { MockPost } from "@/components/mock/MockPost";
import { TradeIcon } from "@/components/mock/TradeIcon";
import { trades } from "@/content/trades";

/** Real-looking posts right under the hero: proof before any explanation. */
export function ExamplesStrip() {
  return (
    <section aria-labelledby="examples-strip-title" className="on-light bg-paper pt-16 pb-6 sm:pt-20">
      <Container className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-end">
        <h2 id="examples-strip-title" className="text-2xl font-extrabold sm:text-3xl">
          Posts PostPixel made this week.
        </h2>
        <p className="text-sm text-muted">Written, designed and scheduled. No one opened a design app.</p>
      </Container>
      <div className="mt-8 overflow-x-auto pb-6 [scrollbar-width:thin]">
        <ul className="flex w-max gap-4 px-4 sm:px-6 xl:mx-auto xl:max-w-[1200px] xl:w-auto xl:overflow-visible">
          {trades.map((trade) => (
            <li key={trade.slug} className="w-56 shrink-0 sm:w-60">
              <Link href={`/examples/${trade.slug}`} className="group block">
                <MockPost
                  trade={trade}
                  variant="after"
                  className="rounded-2xl shadow-[0_20px_40px_-24px_rgba(0,0,0,0.5)] transition-transform group-hover:-translate-y-1"
                />
                <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold">
                  <TradeIcon name={trade.icon} className="h-4 w-4 text-lime-ink" />
                  {trade.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
