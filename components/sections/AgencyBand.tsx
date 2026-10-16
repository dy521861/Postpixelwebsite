import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/layout/Section";
import { PixelMark } from "@/components/brand/PixelMark";

export function AgencyBand() {
  return (
    <section aria-labelledby="agency-title" className="on-light bg-white pb-20 sm:pb-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 rounded-[1.5rem] bg-paper-2 p-8 sm:p-10 md:flex-row md:items-center">
          <div className="flex items-start gap-5">
            <span className="hidden h-14 w-14 shrink-0 place-items-center rounded-2xl bg-black sm:grid">
              <PixelMark className="h-6 w-6" />
            </span>
            <div>
              <h2 id="agency-title" className="text-2xl font-extrabold">
                Run an agency? Put PostPixel under your brand.
              </h2>
              <p className="mt-2 max-w-xl text-muted">
                White-label social media for your home service clients. 3 workspaces included for $99/month.
              </p>
            </div>
          </div>
          <ButtonLink href="/become-an-agency" variant="dark">
            Become an agency partner <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
