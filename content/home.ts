/** Home page copy. Edit words here; layout lives in components/sections. */

export const hero = {
  eyebrow: "For HVAC, plumbing, roofing, cleaning & every home service trade",
  title: "Social media on autopilot for home service pros.",
  subtitle:
    "PostPixel reads your website, learns your brand, and posts a month of on-brand content for you, while you're out on the job.",
  primaryCta: "Start your 7-day free trial",
  secondaryCta: { label: "See real examples", href: "#examples" },
  note: "Set up in about 5 minutes. No design skills needed.",
  /** Set `src` once the hero video exists in /public/media. */
  video: {
    src: "",
    webm: "",
    poster: "",
    description:
      "A home service owner climbs out of a work van, walks into the house, and the day turns to night. They sit at the kitchen table designing social posts in an editor, then PostPixel fills in a month of finished posts.",
  },
};

export const problem = {
  eyebrow: "The problem",
  title: "You're great at the work. Posting about it is the hard part.",
  body: "You post for a couple of weeks, then busy season hits and the page goes quiet. Homeowners checking you out see a business that looks closed, and they call the next company.",
  pains: [
    {
      pain: "Your best jobs die in your camera roll.",
      fix: "Snap the photo. PostPixel writes and designs the post.",
    },
    {
      pain: "Designing posts at 10 PM after a full day.",
      fix: "A month of on-brand posts, designed for you.",
    },
    {
      pain: "No idea what to post this week.",
      fix: "It plans around your services and the season.",
    },
    {
      pain: "Your page looks abandoned.",
      fix: "Autopilot keeps posting, even in busy season.",
    },
  ],
  statFooter: "A quiet page reads as “out of business.”",
};

export const showcase = {
  eyebrow: "Before & after",
  title: "Same job photo. A post that actually gets calls.",
  body: "Pick your trade and drag the slider to compare a typical phone post with what PostPixel makes from the same photo.",
};

export const howItWorks = {
  eyebrow: "How it works",
  title: "From your website to a month of posts.",
  steps: [
    {
      title: "Enter your website.",
      body: "PostPixel pulls your logo, colors, services and service area. No forms, no brand kit to build.",
    },
    {
      title: "Get a month of posts.",
      body: "Written and designed for your trade, your season and your town, in your brand.",
    },
    {
      title: "Approve them, or let Autopilot post.",
      body: "Review from your phone in a few taps, or let PostPixel publish on schedule.",
    },
  ],
};

export const comparison = {
  eyebrow: "The math",
  title: "Your evenings, a freelancer, or PostPixel.",
  options: [
    {
      name: "Doing it yourself",
      cost: "4–6 hrs",
      unit: "of your week",
      points: ["Design apps after a long day", "Posting stops in busy season"],
    },
    {
      name: "Freelancer or agency",
      cost: "$500+",
      unit: "per month, typical",
      points: ["Back-and-forth on every post", "Long contracts"],
    },
    {
      name: "PostPixel",
      cost: "$49",
      unit: "per month",
      points: ["Minutes a week to review", "Posts even when you're slammed"],
      featured: true,
    },
  ],
  links: [
    {
      label: "PostPixel vs. hiring a social media manager",
      href: "/blog/postpixel-vs-hiring-social-media-manager-for-service-businesses",
    },
    {
      label: "PostPixel vs. traditional marketing agencies",
      href: "/blog/postpixel-vs-traditional-marketing-agencies-for-service-businesses",
    },
  ],
};

export const finalCta = {
  title: "Enter your website. See your first posts before you pay.",
  body: "Your brand, your trade, your town. Ready in minutes.",
  button: "Show me my posts",
};
