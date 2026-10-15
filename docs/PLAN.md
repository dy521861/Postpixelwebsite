# PostPixel.ai Rebuild: Plan v1 (Home Page First)

Status: **DRAFT, awaiting founder review.** No code has been written yet.
Date: 2026-10-15

---

## 0. Audit status and gaps

This container's network blocks postpixel.ai, so I could not fetch the live HTML, sitemap.xml or robots.txt directly. The inventory below comes from search-engine indexing, which means it is **partial**. Before implementation I still need:

| Need | Why | How you can provide it |
|---|---|---|
| Full `sitemap.xml` + `robots.txt` | Complete URL inventory | Paste them in, or add `postpixel.ai` to the environment's allowed hosts so I can crawl |
| Google Search Console export (Pages → top 500 by clicks/impressions, last 12 months) | Find the URLs that actually drive traffic | Export as CSV |
| Brand assets: logo SVG, favicon, brand hex codes, font names | Design tokens | Upload, or allow crawling and I'll extract them from CSS |
| Current platform (Webflow / Framer / WordPress / other?) | Affects export and redirect mechanics | Tell me |
| Real product screenshots and real generated posts per trade | The page is built on real examples | Export from the app |
| Signup / login URLs (e.g. `app.postpixel.ai/signup`) | CTA targets | Tell me |

### Known indexed URLs (preserve all paths exactly)

| URL | Indexed title | Plan |
|---|---|---|
| `/` | Social Media on Autopilot for Home Service Pros | Rebuild (phase 1) |
| `/pricing` | Simple, Affordable Pricing for Home Service Pros | Keep path |
| `/reviews` | PostPixel Reviews & Success Stories | Keep path |
| `/become-an-agency` | White-Label AI Marketing for Home Service Agencies | Keep path |
| `/pixelcards` | PixelCards | Keep path |
| `/examples/hvac` (likely also `/examples/{trade}`) | HVAC Social Media Examples… | Keep path; becomes a templated trade page |
| `/contact-us` | Contact PostPixel | Keep path |
| `/privacy-policy`, `/terms-and-conditions` | Legal | Keep path |
| `/blog` | PostPixel Blog | Keep path |
| `/blog/generate-month-of-social-media-content-for-service-business` | | MDX, same slug |
| `/blog/best-crm-for-home-services` | | MDX, same slug |
| `/blog/postpixel-vs-traditional-marketing-agencies-for-service-businesses` | | MDX, same slug |
| `/blog/postpixel-vs-hiring-social-media-manager-for-service-businesses` | | MDX, same slug |
| `/blog/psychology-of-service-business-marketing` | | MDX, same slug |
| `/blog/plumbing-social-media-post-ideas` | | MDX, same slug |
| `/blog/website-builders-vs-marketing-automation-platforms` | | MDX, same slug |
| `/blog/fire-canva-from-marketing` | | MDX, same slug (strong tie-in to the hero story) |
| `/blog/housecall-pro-vs-jobber` | | MDX, same slug |

**Redirect plan:** none needed so far, because every path is kept. Any URL the full crawl finds that we drop gets a 301 to its closest equivalent in `next.config.ts` `redirects()`, never to `/`.

### Content decisions (resolved 2026-10-15)
1. **Free trial:** **7 days** everywhere. Fix the blog post that says 14.
2. **Extra agency workspace:** **$37/mo** everywhere. Fix `/pricing`, which says $35.
3. **Legal entity:** **PostPixel, LLC** in the footer, legal pages and `Organization` schema.
4. **Customer count:** "**Hundreds of home service companies** have signed up." Drop "5,000 customers", "43% more calls" and "5.8x engagement" unless backed by data.
5. **Third-party stat:** "24% of homeowners still check a company's social media for social proof after checking its website and reviews." Source: a BrightLocal(?) study. **Needed: the exact report name, year and URL**, so the stat can be cited with a link. A quick search didn't find it.
6. **Testimonials:** the founder will collect new ones (name, business, trade, city, photo/logo, written permission). The slider uses no engagement numbers until real data exists.
7. **Hero video editor:** a **generic design editor**, not a Canva lookalike.

### Partner logos (need SVG/PNG files and permission to display)
Spellings to confirm are marked ⚠︎.

| Partner | Type |
|---|---|
| American House Cleaners Association (AHCA) ⚠︎ exact name | Cleaning trade association |
| DripJobs | CRM for contractors |
| "Allison" CRM ⚠︎ spelling? | CRM for cleaning companies |
| Business Genie ⚠︎ | |
| Saenz Global | Roofing consulting |
| Boyd Innovation Center ⚠︎ | |
| Launchpad ⚠︎ which org | |
| ZenMaid ⚠︎ (heard as "ZenMade") | Cleaning business software |
| Paradigm CRM ⚠︎ | CRM |

---

## 1. Site architecture

```
postpixel-web/
├── CLAUDE.md                     # rules for future Claude Code sessions
├── app/
│   ├── layout.tsx                # fonts, <Header/>, <Footer/>, Organization+WebSite JSON-LD
│   ├── page.tsx                  # HOME (phase 1)
│   ├── (marketing)/pricing/page.tsx, reviews/, become-an-agency/, pixelcards/, contact-us/
│   ├── examples/[trade]/page.tsx # generateStaticParams from content/trades.ts
│   ├── (legal)/privacy-policy/, terms-and-conditions/
│   ├── blog/page.tsx, blog/[slug]/page.tsx   # MDX, statically generated
│   ├── sitemap.ts                # built from routes + trades + MDX posts
│   ├── robots.ts                 # disallows everything unless VERCEL_ENV === "production"
│   ├── not-found.tsx
│   └── opengraph-image.tsx       # default OG image
├── components/
│   ├── ui/                       # shadcn primitives (button, tabs, accordion, badge, card)
│   ├── layout/                   # Header, Footer, Container, Section
│   ├── sections/                 # reusable page blocks (Hero, ExamplesStrip, ProblemSection,
│   │                             #   TradeTabs, BeforeAfterSlider, HowItWorks, Testimonials,
│   │                             #   PricingTeaser, FAQ, FinalCTA, LogoBar)
│   └── seo/JsonLd.tsx
├── content/
│   ├── site.ts                   # nav, footer links, CTA URLs, pricing (single source of truth)
│   ├── trades.ts                 # HVAC, plumbing, roofing… copy, examples, before/after images
│   ├── faq.ts, testimonials.ts
│   └── blog/*.mdx
├── lib/seo.ts                    # buildMetadata({title, description, path}) → canonical, OG, Twitter
├── public/media/                 # hero video, posters, real post examples (AVIF/WebP)
└── tests/                        # Playwright smoke + axe accessibility + SEO assertions
```

Principles:
- **All copy lives in `content/`.** You change words and prices in one typed file, not inside components.
- **New landing pages are composed from `components/sections/*`.** A new trade page means a new entry in `trades.ts`, with no new code.
- Server Components by default. Only the slider, tabs, video and mobile nav are client components.
- **Dependencies:** next, react, tailwind, shadcn (Radix), `@next/mdx` (or `next-mdx-remote`), lucide-react. No animation library unless we really need one, since CSS covers most of it.

---

## 2. Design system

### Direction: "Modern tool, built for the person in the truck"
The site should feel as sharp as a top SaaS product (dark + electric lime, crisp type, real UI), but it should **talk and look like a local business owner's world, not Silicon Valley's.**

| Modern (the product is serious) | Local and owner-friendly (it's built for me) |
|---|---|
| Near-black sections, electric lime accents, big confident type | Real jobsite photos: vans, crawlspaces, fresh-cut lawns, clean kitchens. No glossy stock models |
| Real PostPixel UI, smooth slider and tabs | Plain-spoken copy: "Snap the job. We'll post it." No "leverage AI-driven synergy" |
| Generous whitespace, rounded cards | Owner faces, business names, trades and **towns** on every testimonial |
| Subtle motion | Trade-specific everything: the tabs, examples and footer all speak HVAC, plumbing, roofing… |
| | Warm off-white paper sections (not sterile white) to break up the dark |

Rules of thumb: every section shows **a real business or a real post**; headlines read the way an owner would say them to another owner; no abstract gradient blobs, robots or "AI sparkle" icons.

### Brand assets (received 2026-10-15)
- `brand/logo-wordmark-on-black.png`: "PostPixel" wordmark, white on black, with the pixel "x". **Still needed: the wordmark as SVG** (plus a dark-on-light version) and the **font name** it's set in.
- `brand/pixel-mark.svg`: rebuilt as a crisp vector from the PNG. A 3×3 grid with the 4 corners and the center filled. Used for the favicon and app icon.

### Color tokens
Measured from the logo files. Contrast ratios are WCAG.

| Token | Hex | Use | Contrast |
|---|---|---|---|
| `--pp-lime` | `#CCFC7D` | Brand accent: CTAs, active tab, slider handle, highlights **on dark** | 17.8:1 on black ✅ |
| `--pp-lime-hover` | `#B8F25A` | CTA hover | |
| `--pp-lime-ink` | `#3F6212` | Lime-family **text/links on light** sections | 7.1:1 on white ✅ |
| `--pp-black` | `#000000` | Logo background, text on lime buttons | |
| `--pp-ink` | `#0A0A0A` | Dark section background | |
| `--pp-ink-2` | `#141414` | Cards on dark | lime 15.6:1 ✅ |
| `--pp-line-dark` | `#262626` | Borders on dark | |
| `--pp-muted-dark` | `#A3A3A3` | Secondary text on dark | 7.9:1 ✅ |
| `--pp-paper` | `#FAFAF5` | Light section background (warm, faint lime tint) | |
| `--pp-paper-2` | `#F0F2E8` | Cards on light | |
| `--pp-text` | `#0A0A0A` | Body text on light | |
| `--pp-danger` | `#F87171` | "Before" ✗ markers only | |

**Hard rule:** never set lime text on white or paper, because it measures 1.2:1 and is unreadable. On light sections lime is only a *fill* (buttons, highlight bars) with black text on it, or use `--pp-lime-ink`.

### Signature motif: the pixel
The 3×3 pixel "x" from the logo becomes the system's own detail, so the site doesn't look like a generic template:
- pixel-square bullets (✓ lists, step numbers)
- a small pixel cluster as section eyebrows (e.g. ▪ THE PROBLEM)
- the drag-slider handle (lime pill with pixel arrows)
- a 3×3 "building" loading animation where posts generate in the demo
Use it lightly: one or two moments per screen.

### Type
- **Display:** match the logo's geometric bold sans (pending your font name; a Google Font such as *Plus Jakarta Sans 800* or *Manrope 800* is the fallback). 44–72px desktop / 36–44px mobile, tight leading.
- **Body:** *Inter* or the brand's body font at 17–18px, line-height 1.6.
- **Data labels:** monospace at 13px for slider stats (`7:42 AM post time`).

### Layout and components
- **Rhythm:** dark hero → paper examples → paper trust band → dark Problem → dark trade tabs → paper How it works / proof / pricing → dark final CTA.
- **Containers:** 1200px max, 16px mobile gutter. **Radius:** 20px cards, 999px pills.
- **Buttons:** the primary is a lime fill with black text and a soft lime glow on dark, like the Taka "Start free" button. The secondary is a ghost button with a hairline border.
- **Accessibility:** WCAG 2.2 AA, visible lime focus ring (2px plus offset), keyboard-operable slider (`role="slider"`, arrow keys) and vertical tabs (Radix), and `prefers-reduced-motion` respected everywhere.

## 3. Home page: section by section

| # | Section | Content | Reference |
|---|---|---|---|
| 3.1 | **Header** | Logo · How it works · Examples · Pricing · Agencies · Blog · Log in · **Start free trial** | PostPost floating pill nav |
| 3.2 | **Hero (video)** | H1 kept close to the ranking title: *"Social media on autopilot for home service pros."* Subhead about a month of on-brand posts from your website in minutes. Primary CTA: Start free trial. Secondary: See examples. Video on the right on desktop, below the copy on mobile. | User request |
| 3.3 | **Immediate examples strip** | Directly under the hero: a horizontal row of 6–8 **real generated posts** (HVAC, plumbing, roofing, landscaping, cleaning, pest control…), each card tagged with its trade. Scrolls on mobile. | PostPost "Stay in front of customers" strip |
| 3.3b | **Trust band** | One quiet band directly under the examples strip: *"Trusted by hundreds of home service companies · Partnered with"*, followed by the partner logos. Logos are rendered in one muted monochrome tone at the same optical height (about 28px) and get their color on hover/focus. On desktop they sit in a single static row of 9 that wraps to two balanced rows if needed; on mobile they become a slow auto-scrolling marquee that stops under `prefers-reduced-motion`. No marquee on desktop, because a static row reads as more credible. Logos only link out if a partner page exists. | Classic SaaS logo bar, restrained |
| 3.4 | **The Problem** | Dark section. Headline along the lines of *"You're great at the job. Posting after the job is the hard part."* 4 pain cards (✗ + one-line pain + → PostPixel fix in brand color). Right side: a large stat card built around **"24%"**: *"of homeowners still check your social media for proof, even after seeing your website and reviews,"* with a small source citation link. A dormant page reads as "out of business". A real customer quote goes underneath once collected. | PostPost "The hardest part…" |
| 3.5 | **Trade tabs + before/after drag slider** | **Vertical tabs** on the left (HVAC, Plumbing, Roofing, Landscaping, Cleaning, Pest Control, Pressure Washing, Auto Detailing); horizontal scrolling pills on mobile. Each tab shows a **drag slider**: *Before* = owner's raw phone snap or plain post · *After* = the PostPixel-generated post from the same photo. Flanking "Before ✗ / After ✓" lists (posting time, brand voice, format), plus **real** engagement numbers only if we have them. Each tab links to `/examples/{trade}` for internal links and SEO. | Taka before/after |
| 3.6 | **How it works** | 3 steps with real UI screenshots: 1) Enter your website → brand profile (colors, logo, services) pulled automatically. 2) PostPixel writes and designs a month of posts. 3) Approve or let Autopilot publish. | PostPost "From your website to a week of posts" |
| 3.7 | **Social proof** | Verified testimonials (name, business, trade, city, photo/logo) and a link to `/reviews`. | |
| 3.8 | **Cost comparison** | "Your evenings, a freelancer, or PostPixel": hours/month and $/month. Links to the two existing comparison blog posts (internal links). | PostPost |
| 3.9 | **Pricing teaser** | Autopilot $49 · Teams $79 · Agency $99 (from `content/site.ts`) → `/pricing`. | |
| 3.10 | **Agency band** | One row: white-label for agencies → `/become-an-agency`. | |
| 3.11 | **FAQ** | 6–8 real questions (Radix Accordion, all content in server-rendered HTML). | |
| 3.12 | **Final CTA** | "Enter your website. See your first posts before you pay." Website-URL input, then the signup flow. | PostPost closing CTA |
| 3.13 | **Footer** | Product, Trades (links to all `/examples/*`), Resources (blog), Company, Legal. | |

### Hero video: production brief
**Story (≈12–15s, seamless loop, no audio):**
1. Daylight: a home-service pro steps out of a branded work van (unbranded or PostPixel-generic livery), carrying a toolbag.
2. Walks through the front door. Cut or match-dissolve as the light shifts to **night**.
3. The same person sits at a kitchen-table computer, tired, building posts in a **generic design editor** (template sidebar, canvas, color swatches).
4. *(Recommended ending)* They type their website URL into PostPixel, a grid of finished posts fills in, and they close the laptop. This resolves the pain into the product instead of ending on the pain.

**⚠️ "Canva-like UI without the logo":** I recommend a **generic editor** with PostPixel-neutral styling rather than reproducing Canva's recognizable interface. Copying Canva's distinctive layout and colors is a trade-dress risk even without the logo, and it advertises the competitor. The "fire Canva" message can still be made in copy, as the existing blog post already does.

**Sourcing options:** (a) AI video generation (Veo/Sora/Runway class) for scenes 1–3 plus a real screen recording composited for scene 4; (b) a short real shoot; (c) licensed stock footage plus a screen recording. I'll build the component so the video file can be swapped without code changes.

**Performance spec:** 1280×720 H.264 MP4 under 2.5 MB plus a WebM, a compressed AVIF **poster frame as the LCP element** (`priority`), `muted autoplay loop playsInline`, `preload="none"` on mobile/Save-Data, a paused poster under `prefers-reduced-motion`, and a pause button (WCAG 2.2.2). Captions aren't needed because there's no audio. A visually hidden description of the scene goes in the copy instead.

---

## 4. SEO requirements (implementation)

- **Rendering:** every page statically generated (SSG). No content that only appears after client JS runs.
- **Metadata:** `lib/seo.ts` helper → unique `title` (≤60 chars), `description` (≤155), absolute **canonical** (`https://www.postpixel.ai{path}`), OG and Twitter cards, per-page OG image.
- **Host:** canonical `www.postpixel.ai`, apex 301 → www, no trailing slash (match the current site; confirm in crawl).
- **`sitemap.ts`:** all indexable routes plus blog posts with `lastModified`.
- **`robots.ts`:** production allows all and points to the sitemap. **Preview/staging** (`VERCEL_ENV !== "production"`) returns `Disallow: /`, **and** middleware/headers add `X-Robots-Tag: noindex` on any `*.vercel.app` host (robots alone does not prevent indexing).
- **Structured data (JSON-LD):** `Organization` + `WebSite` (layout), `SoftwareApplication` with `Offer`s (home, pricing), `BreadcrumbList` (subpages), `BlogPosting` (posts), `FAQPage` (FAQ content). Only marks up content visible on the page.
- **Headings:** one H1 per page; logical H2/H3.
- **Internal linking:** home → every `/examples/{trade}`, `/pricing`, `/reviews`, `/become-an-agency`, top blog posts; footer links to all trades. CI check: no internal 404s.
- **Images:** `next/image`, descriptive alt text ("HVAC spring tune-up Instagram post generated by PostPixel"), AVIF/WebP.
- **Performance targets (mobile):** LCP < 2.0s, CLS < 0.05, INP < 200ms, Lighthouse ≥ 95 on all four categories.

---

## 5. Migration checklist

**Before build**
- [ ] Full crawl of the live site (Screaming Frog or a script) → URL, status, title, meta, canonical, H1, inlinks
- [ ] Export GSC top pages and queries; export backlinks to identify must-keep URLs
- [ ] Save the current HTML of the top 20 pages as a baseline
- [ ] Extract brand tokens and assets; collect real screenshots and posts
- [ ] Resolve the content inconsistencies in §0

**During build**
- [ ] Every legacy URL maps to a new route or a 301 (redirect map table in repo: `docs/redirects.md`)
- [ ] Titles/H1s on high-traffic pages kept or improved, never weakened
- [ ] Analytics (GA4/GTM or Vercel Analytics) and conversion events (CTA clicks, signup start)

**Pre-launch (on Vercel preview)**
- [ ] `npm run lint`, `tsc --noEmit`, `next build` pass
- [ ] Playwright: every legacy URL returns 200 or the expected 301; no internal broken links; one H1 per page; canonical present
- [ ] axe accessibility scan passes; Lighthouse meets targets
- [ ] Preview confirmed `noindex`; production build confirmed indexable
- [ ] Rich Results Test on home, pricing, a blog post
- [ ] **Founder approval** of the preview URL

**Launch (only with your explicit go-ahead)**
- [ ] Point the domain to Vercel; verify www/apex redirects and HTTPS
- [ ] Submit sitemap in GSC; request indexing for top pages
- [ ] Re-crawl production; diff against the baseline

**After launch (4–6 weeks)**
- [ ] Watch GSC coverage, 404s and rankings for the top queries weekly; fix gaps with 301s

---

## 6. Workflow and guardrails (goes into CLAUDE.md)

- Git: `main` = production. All work happens on feature branches, then a PR, then a Vercel **preview** deploy for review.
- **Nothing merges to `main` or deploys to production without your explicit approval.**
- Required before recommending a merge: lint, typecheck, build, Playwright + axe tests, and a Lighthouse check on the preview.
- CLAUDE.md will document: folder map, "copy lives in `content/`", how to add a trade/landing page/blog post, design tokens and do/don't rules, SEO rules (never change a slug without a 301, every page uses `buildMetadata`), and the deploy workflow.

---

## 7. Phase 1 scope (after approval)
1. Scaffold the Next.js + Tailwind + shadcn project, CLAUDE.md, the SEO plumbing (metadata, robots, sitemap, JSON-LD, preview noindex) and the test harness.
2. Design tokens and layout components (Header, Footer, Section, Container).
3. Home page sections 3.1–3.13 with placeholder media slots that clearly say what real asset goes there.
4. Lightweight stubs for the legacy routes, so links resolve on the preview. They are full rebuilds in later phases.
5. A preview deploy for your review. No production deploy.
