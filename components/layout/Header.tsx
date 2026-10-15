import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "./Section";
import { MobileMenu } from "./MobileMenu";
import { nav, site } from "@/content/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-ink/95 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" aria-label="PostPixel home" className="shrink-0">
          <Logo />
        </Link>
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-[0.9375rem] text-white/70">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden items-center gap-5 lg:flex">
          <a href={site.loginUrl} className="text-[0.9375rem] text-white/70 transition-colors hover:text-white">
            Log in
          </a>
          <ButtonLink href={site.signupUrl} size="sm">
            Start free trial
          </ButtonLink>
        </div>
        <MobileMenu />
      </Container>
    </header>
  );
}
