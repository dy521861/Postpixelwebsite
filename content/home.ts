/** Home page copy. Edit words here; layout lives in components/sections. */

export const hero = {
  eyebrow: "For HVAC, plumbing, roofing, cleaning & every home service trade",
  title: "Social media on autopilot for home service pros.",
  subtitle:
    "PostPixel reads your website, learns your brand, and posts a month of on-brand content for you, while you're out on the job.",
  primaryCta: "Start your 7-day free trial",
  secondaryCta: { label: "See real examples", href: "#examples" },
  note: "Set up in about 5 minutes. No design skills needed.",
  /**
   * Pixel, the PostPixel mascot. Today: a still cut-out with coded motion.
   * When animated Pixel clips exist (transparent WebM + HEVC .mov for Safari,
   * see docs/hero-video-brief.md), set `video` and they replace the still.
   */
  pixel: {
    image: "/media/pixel/pixel-front.webp",
    video: { webm: "", hevc: "" },
  },
  /** What Pixel does in the hero, in order. Shown in Pixel's speech bubble. */
  steps: [
    { key: "website", label: "Reading your website" },
    { key: "photos", label: "Grabbing your job photos" },
    { key: "reviews", label: "Pulling your Google reviews" },
    { key: "posts", label: "Designing your posts" },
    { key: "schedule", label: "Scheduling everywhere" },
  ],
  demo: {
    url: "northsideheating.com",
    business: "Northside Heating & Air",
    colors: ["#1e3a5f", "#0f766e", "#f59e0b", "#ffffff"],
    services: ["AC repair", "Furnace tune-ups", "Duct cleaning"],
    rating: "4.9",
    reviewCount: "212 Google reviews",
    reviews: [
      { name: "Maria G.", text: "Showed up on time and had our AC running the same day." },
      { name: "Tom R.", text: "Honest pricing. They explained everything before starting." },
    ],
    schedule: [
      { platform: "facebook", when: "Mon 7:30 AM" },
      { platform: "instagram", when: "Tue 6:00 PM" },
      { platform: "linkedin", when: "Wed 8:15 AM" },
      { platform: "google", when: "Thu 9:00 AM" },
    ],
    done: "30 posts scheduled",
  },
  description:
    "Pixel, the PostPixel robot, reads a home service company's website, picks up its logo and brand colors, grabs job site photos and Google reviews, designs a month of posts, and schedules them to Facebook, Instagram, LinkedIn and Google Business Profile.",
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
