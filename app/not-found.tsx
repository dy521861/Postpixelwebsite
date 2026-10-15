import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/layout/Section";
import { PixelMark } from "@/components/brand/PixelMark";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="bg-ink py-32 text-white">
      <Container className="text-center">
        <PixelMark className="mx-auto h-10 w-10" />
        <h1 className="mt-6 text-5xl font-extrabold">This page went quiet.</h1>
        <p className="mt-4 text-lg text-white/70">We couldn&apos;t find that page. Let&apos;s get you back on track.</p>
        <div className="mt-8 flex justify-center gap-3">
          <ButtonLink href="/">Go home</ButtonLink>
          <ButtonLink href="/blog" variant="ghostDark">
            Read the blog
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
