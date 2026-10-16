import { ArrowRight, Globe } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/layout/Section";
import { PixelMark } from "@/components/brand/PixelMark";
import { finalCta } from "@/content/home";
import { site } from "@/content/site";

/** Closing CTA: website field submits straight into signup (GET ?website=). */
export function FinalCta() {
  return (
    <section aria-labelledby="final-cta-title" className="relative overflow-hidden bg-ink py-24 text-white sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(50% 60% at 50% 100%, rgba(204,252,125,0.16), transparent 70%)" }}
      />
      <Container className="relative text-center">
        <PixelMark className="mx-auto h-8 w-8" />
        <h2 id="final-cta-title" className="mx-auto mt-6 max-w-3xl text-4xl leading-[1.05] font-extrabold sm:text-6xl">
          {finalCta.title}
        </h2>
        <p className="mt-5 text-lg text-white/70">{finalCta.body}</p>
        <form
          action={site.signupUrl}
          method="get"
          className="mx-auto mt-10 flex max-w-xl flex-col gap-3 rounded-[1.75rem] border border-white/10 bg-ink-2 p-2 sm:flex-row sm:rounded-full"
        >
          <label htmlFor="cta-website" className="sr-only">
            Your business website
          </label>
          <div className="flex flex-1 items-center gap-3 px-4">
            <Globe className="h-5 w-5 shrink-0 text-white/40" aria-hidden="true" />
            <input
              id="cta-website"
              name="website"
              type="text"
              inputMode="url"
              autoComplete="url"
              placeholder="yourbusiness.com"
              required
              className="h-12 w-full bg-transparent text-white placeholder:text-white/40 focus:outline-none"
            />
          </div>
          <button type="submit" className={buttonVariants({ size: "md" })}>
            {finalCta.button} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </form>
        <p className="mt-5 text-sm text-white/50">{site.trialDays}-day free trial. Hundreds of home service companies have signed up.</p>
      </Container>
    </section>
  );
}
