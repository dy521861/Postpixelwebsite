/**
 * Permanent redirects for old Framer URLs from the 2026-11-01 indexing report.
 * Destinations are the article paths that exist on www.postpixel.ai.
 * statusCode 301 is used instead of `permanent` so clients receive 301, not 308.
 */

export type LegacyRedirect = {
  source: string;
  destination: string;
  statusCode: 301;
};

export const blogRedirects: [oldSlug: string, newSlug: string][] = [
  [
    "10-ways-ai-can-transform-marketing-for-home-service-businesses-in-2025",
    "ways-ai-can-transform-marketing-for-home-service-businesses",
  ],
  [
    "5-minute-marketing-a-service-business-owner-s-guide",
    "5-minute-marketing-service-business-owner-guide",
  ],
  [
    "best-crm-for-home-services-expert-guide-to-top-solutions-2025-comparison",
    "best-crm-for-home-services",
  ],
  [
    "don-t-let-ai-tools-become-your-latest-time-sink-why-service-businesses-need-smarter-solutions",
    "why-service-businesses-need-smarter-solutions",
  ],
  [
    "housecall-pro-vs-jobber-the-ultimate-2025-review-for-service-businesses",
    "housecall-pro-vs-jobber",
  ],
  [
    "how-to-build-your-service-business-s-online-presence-in-2024-the-ai-powered-approach",
    "how-to-build-service-business-online-presence-ai",
  ],
  [
    "how-to-generate-a-month-of-social-media-content-for-your-service-business-in-just-5-minutes",
    "generate-month-of-social-media-content-for-service-business",
  ],
  [
    "plumbing-social-media-35-engaging-post-ideas-to-grow-your-business-(-expert-tips)",
    "plumbing-social-media-post-ideas",
  ],
  [
    "postpixel-vs-canva-for-social-media-the-ultimate-comparison-for-service-businesses",
    "postpixel-vs-canva-for-social-media-service-businesses",
  ],
  [
    "postpixels-approach-to-local-seo-a-guide-for-home-service-businesses",
    "approach-to-local-seo-for-home-service-businesses",
  ],
  [
    "the-complete-guide-to-social-media-content-planning-for-service-businesses",
    "social-media-content-planning-for-service-businesses",
  ],
  [
    "the-psychology-of-service-business-marketing-what-makes-customers-call-you-first",
    "psychology-of-service-business-marketing",
  ],
  [
    "website-builders-vs-marketing-automation-platforms-which-is-right-for-your-service-business",
    "website-builders-vs-marketing-automation-platforms",
  ],
  [
    "what-if-you-could-fire-canva-from-your-marketing",
    "fire-canva-from-marketing",
  ],
  [
    "why-posting-on-social-media-feels-like-a-second-job-(and-how-to-fix-it)",
    "why-posting-on-social-media-feels-like-second-job",
  ],
  [
    "why-your-service-business-website-isn-t-generating-leads-(and-how-to-fix-it)",
    "why-service-business-website-not-generating-leads-fix",
  ],
  [
    "you-didn-t-start-a-cleaning-business-to-become-a-designer-here-s-why-canva-is-wasting-your-time",
    "why-canva-is-wasting-your-time",
  ],
  [
    "your-complete-guide-to-automated-growth-(2025)",
    "guide-to-automated-growth",
  ],
];

/** Fake case studies. These return 410 instead of redirecting. */
export const goneCaseStudyPaths = [
  "/blog/breaking-through-the-seasonal-barrier-green-dreams-landscaping",
  "/blog/from-side-hustle-to-cleaning-empire-spotless-sisters",
  "/blog/from-side-jobs-to-six-figures-thompson-pressure-washing",
  "/blog/modernizing-a-family-legacy-rodriguez-hvac",
] as const;

function escapePath(path: string) {
  return path.replace(/[()]/g, (char) => `\\${char}`);
}

function redirect(source: string, destination: string): LegacyRedirect {
  return { source, destination, statusCode: 301 };
}

export const legacyRedirects: LegacyRedirect[] = [
  ...blogRedirects.map(([oldSlug, newSlug]) =>
    redirect(escapePath(`/blog/${oldSlug}`), `/blog/${newSlug}`),
  ),
  redirect("/free-tools", "/"),
  redirect("/pixelcards", "/"),
];
