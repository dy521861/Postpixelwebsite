/**
 * Home service trades. Drives the examples strip, the before/after tabs
 * and the footer trade links. Add a trade here and it appears everywhere.
 *
 * `sample` content is a design mock-up of a PostPixel post. Replace it with a
 * real exported post (image in /public/media/examples/) before launch.
 */

export type TradeIcon =
  | "hvac"
  | "plumbing"
  | "roofing"
  | "landscaping"
  | "cleaning"
  | "pest"
  | "pressure"
  | "detailing";

export type Trade = {
  slug: string;
  name: string;
  icon: TradeIcon;
  /** Two colors for the stand-in "job photo" gradient. */
  photo: [string, string];
  sample: {
    business: string;
    town: string;
    headline: string;
    offer: string;
    beforeCaption: string;
  };
  before: string[];
  after: string[];
};

const before = ["Posted at 11:48 PM", "No logo, no phone number", "One-line caption, no offer"];

export const trades: Trade[] = [
  {
    slug: "hvac",
    name: "HVAC",
    icon: "hvac",
    photo: ["#1e3a5f", "#0f766e"],
    sample: {
      business: "Northside Heating & Air",
      town: "Columbus, OH",
      headline: "Beat the first heat wave.",
      offer: "AC tune-ups $89 this month",
      beforeCaption: "new unit installed today",
    },
    before,
    after: ["Scheduled for 7:30 AM", "Your colors, logo & phone", "Seasonal offer + call to book"],
  },
  {
    slug: "plumbing",
    name: "Plumbing",
    icon: "plumbing",
    photo: ["#334155", "#2563eb"],
    sample: {
      business: "Rapid Flow Plumbing",
      town: "Mesa, AZ",
      headline: "That drip costs you 3,000 gallons a year.",
      offer: "Free leak check with any service",
      beforeCaption: "fixed a leak",
    },
    before,
    after: ["Scheduled for 6:45 PM", "Brand voice locked", "Helpful tip + clear offer"],
  },
  {
    slug: "roofing",
    name: "Roofing",
    icon: "roofing",
    photo: ["#44403c", "#9a3412"],
    sample: {
      business: "Summit Ridge Roofing",
      town: "Tulsa, OK",
      headline: "Storm season is coming. Is your roof ready?",
      offer: "Free 20-point roof inspection",
      beforeCaption: "roof done",
    },
    before,
    after: ["Before/after job photos", "Your colors, logo & phone", "Inspection offer + call to book"],
  },
  {
    slug: "landscaping",
    name: "Landscaping",
    icon: "landscaping",
    photo: ["#14532d", "#4d7c0f"],
    sample: {
      business: "Greenline Lawn Co.",
      town: "Raleigh, NC",
      headline: "The greenest lawn on the block starts now.",
      offer: "Spring cleanup slots are open",
      beforeCaption: "mowed",
    },
    before,
    after: ["Timed to the season", "Brand voice locked", "Booking call to action"],
  },
  {
    slug: "cleaning",
    name: "House Cleaning",
    icon: "cleaning",
    photo: ["#155e75", "#7c3aed"],
    sample: {
      business: "Spotless Nest Cleaning",
      town: "Boise, ID",
      headline: "Come home to clean. Every other Friday.",
      offer: "$40 off your first deep clean",
      beforeCaption: "cleaned a house today",
    },
    before,
    after: ["Scheduled for Sunday evening", "Your colors, logo & phone", "First-clean offer"],
  },
  {
    slug: "pest-control",
    name: "Pest Control",
    icon: "pest",
    photo: ["#3f3f46", "#a16207"],
    sample: {
      business: "Guardian Pest Pros",
      town: "Tampa, FL",
      headline: "Ants march in before the rain. Stop them at the door.",
      offer: "Quarterly plans from $39/mo",
      beforeCaption: "sprayed",
    },
    before,
    after: ["Timed to local weather", "Brand voice locked", "Plan offer + call to book"],
  },
  {
    slug: "pressure-washing",
    name: "Pressure Washing",
    icon: "pressure",
    photo: ["#1e293b", "#0891b2"],
    sample: {
      business: "Fresh Coat Exterior Wash",
      town: "Charlotte, NC",
      headline: "Same driveway. 40 minutes later.",
      offer: "House + driveway bundle $299",
      beforeCaption: "driveway",
    },
    before,
    after: ["Before/after split image", "Your colors, logo & phone", "Bundle offer"],
  },
  {
    slug: "auto-detailing",
    name: "Auto Detailing",
    icon: "detailing",
    photo: ["#18181b", "#be123c"],
    sample: {
      business: "Mirror Finish Mobile Detail",
      town: "Plano, TX",
      headline: "We come to you. Your car leaves showroom-ready.",
      offer: "Interior + exterior from $149",
      beforeCaption: "detailed a truck",
    },
    before,
    after: ["Scheduled for Saturday 9 AM", "Brand voice locked", "Mobile-service offer"],
  },
];
