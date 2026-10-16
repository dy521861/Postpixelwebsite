/**
 * Single source of truth for site-wide facts: names, links, prices, CTAs.
 * Change copy and prices here, not inside components.
 */

export const site = {
  name: "PostPixel",
  legalName: "PostPixel, LLC",
  url: "https://www.postpixel.ai",
  email: "hello@postpixel.ai",
  description:
    "PostPixel writes, designs and schedules a month of on-brand social media posts for home service businesses, so your page stays active while you're out on the job.",
  trialDays: 7,
  copyrightYear: 2026,
  // TODO(founder): confirm the real app URLs.
  signupUrl: "https://app.postpixel.ai/signup",
  loginUrl: "https://app.postpixel.ai/login",
} as const;

export const nav = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Examples", href: "/#examples" },
  { label: "Pricing", href: "/pricing" },
  { label: "Agencies", href: "/become-an-agency" },
  { label: "Blog", href: "/blog" },
] as const;

export type Plan = {
  name: string;
  price: number | null;
  blurb: string;
  features: string[];
  featured?: boolean;
};

export const plans: Plan[] = [
  {
    name: "Autopilot",
    price: 49,
    blurb: "For owner-operators who want their page handled.",
    features: [
      "Unlimited posts",
      "Automatic content generation",
      "Auto-scheduling",
      "Cross-platform posting",
    ],
    featured: true,
  },
  {
    name: "Teams",
    price: 79,
    blurb: "For crews where more than one person touches marketing.",
    features: [
      "Everything in Autopilot",
      "Team members & role-based access",
      "Review management",
      "Shared content calendar",
    ],
  },
  {
    name: "Agency",
    price: 99,
    blurb: "For agencies managing home service clients.",
    features: [
      "3 client workspaces included",
      "Extra workspaces $37/mo each",
      "Client approval workflows",
      "White-label options",
    ],
  },
];

export const enterprise = {
  name: "Enterprise",
  blurb: "50+ locations? We'll build a custom plan.",
  href: "/contact-us",
};

/** Third-party stat used in the Problem section. */
export const homeownerStat = {
  value: "24%",
  text: "of homeowners still check your social media for proof, even after they've seen your website and reviews.",
  // TODO(founder): exact report name, year and URL. Do not launch without a real source.
  sourceLabel: "BrightLocal consumer survey",
  sourceUrl: "",
};

export const footer = [
  {
    title: "Product",
    links: [
      { label: "How it works", href: "/#how-it-works" },
      { label: "Examples", href: "/#examples" },
      { label: "Pricing", href: "/pricing" },
      { label: "Reviews", href: "/reviews" },
      { label: "PixelCards", href: "/pixelcards" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      {
        label: "PostPixel vs. a social media manager",
        href: "/blog/postpixel-vs-hiring-social-media-manager-for-service-businesses",
      },
      {
        label: "PostPixel vs. marketing agencies",
        href: "/blog/postpixel-vs-traditional-marketing-agencies-for-service-businesses",
      },
      { label: "35 plumbing post ideas", href: "/blog/plumbing-social-media-post-ideas" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Become an agency", href: "/become-an-agency" },
      { label: "Contact", href: "/contact-us" },
      { label: "Privacy policy", href: "/privacy-policy" },
      { label: "Terms of service", href: "/terms-and-conditions" },
    ],
  },
] as const;
