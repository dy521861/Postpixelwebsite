/**
 * URL inventory: every known URL on the live postpixel.ai site.
 * Source: search-engine index, 2026-10-15. TODO: reconcile with a full crawl + GSC export.
 *
 * status:
 *  - "built"   = exists in this app; included in sitemap.xml
 *  - "pending" = live on the old site, not rebuilt yet. MUST be built or 301'd before launch.
 *
 * Rule: never drop a URL from this list. Change status, or add a redirect in content/redirects.ts.
 */
export type RouteEntry = { path: string; status: "built" | "pending"; lastModified?: string };

export const routes: RouteEntry[] = [
  { path: "/", status: "built", lastModified: "2026-10-15" },
  { path: "/pricing", status: "pending" },
  { path: "/reviews", status: "pending" },
  { path: "/become-an-agency", status: "pending" },
  { path: "/pixelcards", status: "pending" },
  { path: "/contact-us", status: "pending" },
  { path: "/privacy-policy", status: "pending" },
  { path: "/terms-and-conditions", status: "pending" },
  { path: "/examples/hvac", status: "pending" },
  { path: "/blog", status: "pending" },
  { path: "/blog/generate-month-of-social-media-content-for-service-business", status: "pending" },
  { path: "/blog/best-crm-for-home-services", status: "pending" },
  { path: "/blog/postpixel-vs-traditional-marketing-agencies-for-service-businesses", status: "pending" },
  { path: "/blog/postpixel-vs-hiring-social-media-manager-for-service-businesses", status: "pending" },
  { path: "/blog/psychology-of-service-business-marketing", status: "pending" },
  { path: "/blog/plumbing-social-media-post-ideas", status: "pending" },
  { path: "/blog/website-builders-vs-marketing-automation-platforms", status: "pending" },
  { path: "/blog/fire-canva-from-marketing", status: "pending" },
  { path: "/blog/housecall-pro-vs-jobber", status: "pending" },
];
