"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { MockPost } from "@/components/mock/MockPost";
import { TradeIcon } from "@/components/mock/TradeIcon";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import type { Trade } from "@/content/trades";

/** Vertical trade tabs (horizontal pills on mobile), each with a before/after slider. */
export function TradeShowcase({ trades }: { trades: Trade[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const trade = trades[active];

  const focusTab = (i: number) => {
    const next = (i + trades.length) % trades.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const keys: Record<string, number> = {
      ArrowDown: active + 1,
      ArrowRight: active + 1,
      ArrowUp: active - 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: trades.length - 1,
    };
    if (!(e.key in keys)) return;
    e.preventDefault();
    focusTab(keys[e.key]);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:gap-12">
      <div
        role="tablist"
        aria-label="Choose your trade"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
      >
        {trades.map((t, i) => {
          const selected = i === active;
          return (
            <button
              key={t.slug}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              id={`tab-${t.slug}`}
              aria-selected={selected}
              aria-controls={`panel-${t.slug}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={cn(
                "flex shrink-0 items-center gap-3 rounded-full px-4 py-2.5 text-left text-[0.95rem] font-semibold whitespace-nowrap transition-colors lg:rounded-xl lg:px-4 lg:py-3.5",
                selected
                  ? "bg-lime text-black"
                  : "bg-ink-2 text-white/70 hover:bg-ink-3 hover:text-white lg:bg-transparent",
              )}
            >
              <TradeIcon name={t.icon} className="h-[18px] w-[18px]" />
              {t.name}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`panel-${trade.slug}`}
        aria-labelledby={`tab-${trade.slug}`}
        className="grid items-center gap-8 md:grid-cols-[1fr_minmax(0,360px)_1fr] lg:gap-6 xl:gap-10"
      >
        <ResultList kind="before" items={trade.before} className="order-2 md:order-1" />
        <div className="order-1 mx-auto w-full max-w-[360px] md:order-2">
          <BeforeAfterSlider
            key={trade.slug}
            label={`Compare ${trade.name} post before and after PostPixel`}
            before={<MockPost trade={trade} variant="before" />}
            after={<MockPost trade={trade} variant="after" showSampleTag={false} />}
            className="shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]"
          />
          <Link
            href={`/examples/${trade.slug}`}
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-lime hover:underline"
          >
            More {trade.name} post examples
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <ResultList kind="after" items={trade.after} className="order-3" />
      </div>
    </div>
  );
}

function ResultList({ kind, items, className }: { kind: "before" | "after"; items: string[]; className?: string }) {
  const after = kind === "after";
  return (
    <div className={className}>
      <h3 className={cn("text-2xl font-extrabold", after ? "text-lime" : "text-danger")}>
        {after ? "With PostPixel" : "Phone post"}
      </h3>
      <ul className="mt-5 space-y-2.5">
        {items.map((item) => (
          <li
            key={item}
            className={cn(
              "flex items-center gap-3 rounded-lg border px-3 py-2.5 font-mono text-[13px]",
              after ? "border-lime/20 bg-lime/[0.06] text-white" : "border-danger/20 bg-danger/[0.06] text-white/80",
            )}
          >
            <span
              className={cn(
                "grid h-5 w-5 shrink-0 place-items-center rounded",
                after ? "bg-lime text-black" : "bg-danger/20 text-danger",
              )}
            >
              {after ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <X className="h-3.5 w-3.5" aria-hidden="true" />}
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
