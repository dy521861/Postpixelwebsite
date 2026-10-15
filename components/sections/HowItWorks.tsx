import { CalendarCheck, Check, Globe } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/layout/Section";
import { MockPost } from "@/components/mock/MockPost";
import { howItWorks } from "@/content/home";
import { trades } from "@/content/trades";

/** Step visuals: small UI stand-ins. TODO(launch): swap for real product screenshots. */
function StepVisual({ step }: { step: number }) {
  if (step === 0) {
    return (
      <div className="rounded-2xl border border-line bg-white p-5" aria-hidden="true">
        <div className="flex items-center gap-2 rounded-xl border border-line bg-paper px-3 py-2.5 text-sm">
          <Globe className="h-4 w-4 text-muted" />
          <span className="font-medium">northsideheating.com</span>
          <span className="ml-auto rounded-full bg-lime px-2.5 py-0.5 text-xs font-bold">Scanning</span>
        </div>
        <p className="mt-4 text-xs font-bold tracking-wider text-muted uppercase">Brand found</p>
        <div className="mt-2 flex gap-1.5">
          {["#1e3a5f", "#0f766e", "#f59e0b", "#ffffff"].map((c) => (
            <span key={c} className="h-7 w-7 rounded-md border border-black/10" style={{ background: c }} />
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-1.5 text-xs font-semibold">
          {["AC repair", "Furnace tune-ups", "Duct cleaning", "Columbus, OH"].map((s) => (
            <span key={s} className="rounded-full bg-paper-2 px-2.5 py-1">
              {s}
            </span>
          ))}
        </div>
      </div>
    );
  }
  if (step === 1) {
    return (
      <div className="grid grid-cols-3 gap-2 rounded-2xl border border-line bg-white p-3" aria-hidden="true">
        {trades.slice(0, 6).map((t) => (
          <MockPost key={t.slug} trade={t} variant="after" showSampleTag={false} className="rounded-lg" />
        ))}
      </div>
    );
  }
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return (
    <div className="rounded-2xl border border-line bg-white p-5" aria-hidden="true">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-sm font-bold">
          <CalendarCheck className="h-4 w-4" /> This week
        </span>
        <span className="rounded-full bg-black px-2.5 py-1 text-xs font-bold text-lime">Autopilot on</span>
      </div>
      <ul className="mt-4 grid grid-cols-7 gap-1.5 text-center text-[11px] font-semibold text-muted">
        {days.map((d, i) => (
          <li key={d}>
            {d}
            <span
              className={`mt-1.5 grid aspect-square place-items-center rounded-md ${i % 2 === 0 ? "bg-lime text-black" : "bg-paper-2"}`}
            >
              {i % 2 === 0 && <Check className="h-3.5 w-3.5" />}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function HowItWorks() {
  return (
    <Section id="how-it-works" tone="paper" labelledBy="how-title">
      <Container>
        <SectionHeading id="how-title" tone="light" eyebrow={howItWorks.eyebrow} title={howItWorks.title} />
        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {howItWorks.steps.map((step, i) => (
            <li key={step.title} className="flex flex-col rounded-[1.5rem] bg-paper-2 p-6">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-black text-sm font-extrabold text-lime">
                {i + 1}
              </span>
              <h3 className="mt-5 text-xl font-extrabold">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{step.body}</p>
              <div className="mt-6 flex-1 content-end">
                <StepVisual step={i} />
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
