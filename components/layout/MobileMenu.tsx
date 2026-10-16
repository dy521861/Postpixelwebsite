"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { nav, site } from "@/content/site";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="grid h-10 w-10 place-items-center rounded-full text-white hover:bg-white/10"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
      {open && (
        <div id="mobile-menu" className="absolute inset-x-0 top-16 border-b border-white/10 bg-ink px-4 pb-6">
          <nav aria-label="Mobile">
            <ul className="flex flex-col py-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-white/[0.06] py-4 text-lg text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href={site.loginUrl} className="block py-4 text-lg text-white/70">
                  Log in
                </a>
              </li>
            </ul>
          </nav>
          <ButtonLink href={site.signupUrl} className="w-full">
            Start your {site.trialDays}-day free trial
          </ButtonLink>
        </div>
      )}
    </div>
  );
}
