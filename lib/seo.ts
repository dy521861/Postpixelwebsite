import type { Metadata } from "next";
import { site } from "@/content/site";

export const isProduction = process.env.VERCEL_ENV === "production";

/**
 * Every page builds its metadata with this helper so titles, descriptions,
 * canonicals and social cards stay consistent.
 *
 * - title: <= 60 characters, unique per page
 * - description: <= 155 characters
 * - path: the page's own URL path, e.g. "/pricing" (no trailing slash)
 */
export function buildMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
}): Metadata {
  const url = path === "/" ? `${site.url}/` : `${site.url}${path}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: site.name,
      url,
      title,
      description,
      locale: "en_US",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

/** Serialize JSON-LD safely (escapes "<" to prevent script injection). */
export function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
