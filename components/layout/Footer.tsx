import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Container } from "./Section";
import { footer, site } from "@/content/site";
import { trades } from "@/content/trades";

export function Footer() {
  const columns = [
    footer[0],
    {
      title: "Trades",
      links: trades.map((t) => ({ label: `${t.name} examples`, href: `/examples/${t.slug}` })),
    },
    ...footer.slice(1),
  ];

  return (
    <footer className="border-t border-white/[0.06] bg-ink text-white">
      <Container className="grid gap-12 py-16 lg:grid-cols-[1.2fr_repeat(4,1fr)]">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted-dark">
            Social media on autopilot for home service pros.
          </p>
        </div>
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="text-sm font-bold text-white">{col.title}</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted-dark">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>
      <Container className="flex flex-col gap-2 border-t border-white/[0.06] py-6 text-xs text-muted-dark sm:flex-row sm:justify-between">
        <p>
          © {site.copyrightYear} {site.legalName}. All rights reserved.
        </p>
        <a href={`mailto:${site.email}`} className="hover:text-white">
          {site.email}
        </a>
      </Container>
    </footer>
  );
}
