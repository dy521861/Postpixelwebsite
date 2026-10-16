import Image from "next/image";
import { Container } from "@/components/layout/Section";
import { partners, type Partner } from "@/content/social-proof";

function PartnerMark({ partner }: { partner: Partner }) {
  const mark = partner.logo ? (
    <Image
      src={partner.logo}
      alt={partner.name}
      width={140}
      height={28}
      className="h-7 w-auto opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0"
    />
  ) : (
    // Text wordmark until the logo file arrives.
    <span className="text-[0.95rem] font-bold tracking-tight whitespace-nowrap text-black/60 transition-colors hover:text-black/90">
      {partner.name}
    </span>
  );
  return partner.href ? <a href={partner.href}>{mark}</a> : mark;
}

/** Customer count + partner logos. Static row on desktop, gentle marquee on mobile. */
export function TrustBand() {
  return (
    <section aria-labelledby="trust-title" className="on-light border-y border-line bg-paper py-10">
      <Container>
        <h2 id="trust-title" className="text-center text-sm font-semibold text-muted">
          Trusted by <span className="text-ink">hundreds of home service companies</span>. Partnered with:
        </h2>
        {/* desktop: static, wraps into balanced rows */}
        <ul className="mt-7 hidden flex-wrap items-center justify-center gap-x-10 gap-y-5 md:flex">
          {partners.map((p) => (
            <li key={p.name}>
              <PartnerMark partner={p} />
            </li>
          ))}
        </ul>
      </Container>
      {/* mobile: marquee (stops for reduced-motion users via globals.css) */}
      <div className="mt-6 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)] md:hidden">
        <ul className="flex w-max animate-marquee items-center gap-10 motion-reduce:animate-none">
          {[...partners, ...partners].map((p, i) => (
            <li key={`${p.name}-${i}`} aria-hidden={i >= partners.length ? true : undefined}>
              <PartnerMark partner={p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
