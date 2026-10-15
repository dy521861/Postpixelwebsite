import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/layout/Section";
import { enterprise, plans, site } from "@/content/site";

export function PricingTeaser() {
  return (
    <Section tone="white" labelledBy="pricing-title">
      <Container>
        <SectionHeading
          id="pricing-title"
          tone="light"
          align="center"
          eyebrow="Pricing"
          title="Posts every week, from $49 a month."
          body={`Every plan starts with a ${site.trialDays}-day free trial.`}
        />
        <ul className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
          {plans.map((plan) => (
            <li
              key={plan.name}
              className={cn(
                "relative flex flex-col rounded-[1.5rem] p-7",
                plan.featured ? "bg-ink text-white" : "border border-line bg-paper",
              )}
            >
              {plan.featured && (
                <span className="absolute -top-3 right-6 rounded-full bg-lime px-3 py-1 text-xs font-bold text-black">
                  Most popular
                </span>
              )}
              <h3 className="text-lg font-extrabold">{plan.name}</h3>
              <p className={cn("mt-1 text-sm", plan.featured ? "text-muted-dark" : "text-muted")}>{plan.blurb}</p>
              <p className="mt-6">
                <span className="text-5xl font-extrabold tracking-[-0.04em]">${plan.price}</span>
                <span className={cn("ml-1 text-sm", plan.featured ? "text-muted-dark" : "text-muted")}>/month</span>
              </p>
              <ul className="mt-6 flex-1 space-y-2.5 text-[0.95rem]">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2.5">
                    <Check
                      className={cn("mt-0.5 h-4 w-4 shrink-0", plan.featured ? "text-lime" : "text-lime-ink")}
                      aria-hidden="true"
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <ButtonLink
                href={site.signupUrl}
                variant={plan.featured ? "primary" : "dark"}
                className="mt-8 w-full"
              >
                Start free trial
              </ButtonLink>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-center text-sm text-muted">
          {enterprise.blurb}{" "}
          <Link href={enterprise.href} className="font-semibold text-lime-ink hover:underline">
            Talk to us
          </Link>
          {" · "}
          <Link href="/pricing" className="inline-flex items-center gap-1 font-semibold text-lime-ink hover:underline">
            Compare all plans <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </p>
      </Container>
    </Section>
  );
}
