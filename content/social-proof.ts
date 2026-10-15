/**
 * Partners and testimonials.
 *
 * Partners: add `logo` (path in /public/media/partners/, SVG preferred) once
 * files arrive. Until then the name is shown as a text wordmark.
 *
 * Testimonials: `placeholder: true` entries are layout stand-ins and are
 * labeled on the page. `npm run check:launch` fails while any remain.
 */

export type Partner = { name: string; logo?: string; href?: string };

// TODO(founder): confirm exact spellings and permission to display each logo.
export const partners: Partner[] = [
  { name: "American House Cleaners Association" },
  { name: "DripJobs" },
  { name: "Allison CRM" },
  { name: "Business Genie" },
  { name: "Saenz Global" },
  { name: "Boyd Innovation Center" },
  { name: "Launchpad" },
  { name: "ZenMaid" },
  { name: "Paradigm CRM" },
];

export type Testimonial = {
  quote: string;
  name: string;
  business: string;
  trade: string;
  town: string;
  photo?: string;
  placeholder?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    quote: "Customer quote goes here: the before, the change, and one specific result in their words.",
    name: "Owner name",
    business: "Business name",
    trade: "HVAC",
    town: "City, ST",
    placeholder: true,
  },
  {
    quote: "Customer quote goes here: what they used to do on nights and weekends, and what they do now.",
    name: "Owner name",
    business: "Business name",
    trade: "House Cleaning",
    town: "City, ST",
    placeholder: true,
  },
  {
    quote: "Customer quote goes here: what changed when homeowners started finding an active page.",
    name: "Owner name",
    business: "Business name",
    trade: "Roofing",
    town: "City, ST",
    placeholder: true,
  },
];
