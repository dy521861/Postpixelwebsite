import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container, Section, SectionHeading } from "@/components/layout/Section";
import { Hero } from "@/components/sections/Hero";
import { ExamplesStrip } from "@/components/sections/ExamplesStrip";
import { TrustBand } from "@/components/sections/TrustBand";
import { Problem } from "@/components/sections/Problem";
import { TradeShowcase } from "@/components/sections/TradeShowcase";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";
import { Comparison } from "@/components/sections/Comparison";
import { PricingTeaser } from "@/components/sections/PricingTeaser";
import { AgencyBand } from "@/components/sections/AgencyBand";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { showcase } from "@/content/home";
import { faq } from "@/content/faq";
import { plans, site } from "@/content/site";
import { trades } from "@/content/trades";

export const metadata = buildMetadata({
  // Keeps the live site's ranking title.
  title: "Social Media on Autopilot for Home Service Pros | PostPixel",
  absoluteTitle: true,
  description:
    "PostPixel writes, designs and schedules on-brand social posts for HVAC, plumbing, roofing, cleaning and other home service pros. Try it free for 7 days.",
  path: "/",
});

const software = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: site.name,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: site.url,
  description: site.description,
  publisher: { "@id": `${site.url}/#organization` },
  offers: plans.map((p) => ({
    "@type": "Offer",
    name: p.name,
    price: p.price,
    priceCurrency: "USD",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: p.price,
      priceCurrency: "USD",
      unitCode: "MON",
    },
  })),
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={software} />
      <Hero />
      <ExamplesStrip />
      <TrustBand />
      <Problem />
      <Section id="examples" tone="dark" labelledBy="showcase-title" className="border-t border-white/[0.06]">
        <Container>
          <SectionHeading
            id="showcase-title"
            eyebrow={showcase.eyebrow}
            title={showcase.title}
            body={showcase.body}
            className="mb-14"
          />
          <TradeShowcase trades={trades} />
        </Container>
      </Section>
      <HowItWorks />
      <Testimonials />
      <Comparison />
      <PricingTeaser />
      <AgencyBand />
      <Faq items={faq} />
      <FinalCta />
    </>
  );
}
