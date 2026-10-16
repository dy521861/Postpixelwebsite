@AGENTS.md

# PostPixel.ai marketing site

Marketing website for PostPixel (PostPixel, LLC): AI social media for home service businesses.
The founder is not a developer and maintains this site with Claude Code. Keep things simple,
explain changes in plain language, and never surprise them in production.

## Golden rules
1. **Never deploy to production or push to `main` without the founder's explicit approval** in the current conversation.
   Work on a branch, open a PR, and share the Vercel **preview** URL for review.
2. **Never change or remove a live URL without a 301.** See "SEO rules" below.
3. **Never invent facts.** No made-up stats, customer counts, testimonials, partner names or prices.
   Approved claims: "hundreds of home service companies have signed up", the 24% homeowner stat (with source link),
   prices in `content/site.ts`. Anything else needs founder sign-off.
4. Before recommending a merge, run `npm run check` (lint, types, build, tests) and report the result honestly.

## Commands
| Command | What it does |
|---|---|
| `npm run dev` | Local dev server at http://localhost:3000 |
| `npm run check` | lint + typecheck + production build + Playwright tests. **Must pass before any PR.** |
| `npm run check:launch` | Pre-launch gate: fails while placeholders, missing sources or unbuilt legacy URLs remain |
| `npm run test` | Playwright tests only (needs a prior `npm run build`). Uses `/opt/pw-browsers/chromium` automatically in cloud sessions |

## Stack
Next.js 16 App Router (Cache Components on), TypeScript, Tailwind CSS v4, shadcn-style components
written in-repo (`components/ui`), lucide-react icons, Playwright + axe for tests, Vercel hosting.
Read `node_modules/next/dist/docs/` before using a Next.js API you're not sure about. This version has breaking changes.
Avoid new dependencies unless clearly necessary; ask first.

## Where things live
```
content/          ← ALL words, prices, links, trades, FAQ, partners, testimonials. Edit here first.
  site.ts           site facts, nav, footer, plans/prices, CTA URLs, 24% stat
  home.ts           home page copy, section by section
  trades.ts         the 8 trades (drives examples strip, trade tabs, footer links)
  faq.ts            FAQ (also emitted as FAQPage JSON-LD)
  social-proof.ts   partners + testimonials
  routes.ts         inventory of every live URL (status built | pending) → sitemap
  redirects.ts      301 redirects (keep docs/redirects.md in sync)
app/              routes. page.tsx = home; robots.ts, sitemap.ts, opengraph-image.tsx, icon.svg
components/
  ui/               primitives (button)
  layout/           Header, Footer, MobileMenu, Section/Container/Eyebrow/SectionHeading
  sections/         reusable page blocks: Hero, ExamplesStrip, TrustBand, Problem, TradeShowcase,
                    BeforeAfterSlider, HowItWorks, Testimonials, Comparison, PricingTeaser,
                    AgencyBand, Faq, FinalCta
  mock/             HTML/CSS stand-ins for real post images and UI (replace with real assets)
  brand/            Logo, PixelMark
  seo/JsonLd.tsx
lib/seo.ts        buildMetadata() + jsonLd() + isProduction
brand/            original logo files from the founder
docs/PLAN.md      approved plan: architecture, design system, migration checklist
tests/            Playwright: SEO, accessibility (axe), keyboard interactions
```

### How to…
- **Change copy or a price:** edit the file in `content/`. Don't hard-code text in components.
- **Add a trade:** add an entry to `content/trades.ts`. It appears in the strip, the tabs and the footer.
- **Build a new landing page:** create `app/<path>/page.tsx`, export `metadata = buildMetadata({...})`,
  compose sections from `components/sections`, and set its entry in `content/routes.ts` to `built`.
- **Hero animation:** `components/sections/PixelStage.tsx`. The step cards are HTML, and their text lives in `hero.steps`
  and `hero.demo` in `content/home.ts`. To swap the still Pixel for animated clips, set `hero.pixel.video`
  (see `docs/hero-video-brief.md`).
- **Add partner logos:** drop SVGs in `public/media/partners/` and set `logo` in `content/social-proof.ts`.

## Design rules
Direction: "modern tool, built for the person in the truck." Sharp SaaS polish, local owner's voice.
- Tokens live in `app/globals.css` `@theme`. Use them (`bg-ink`, `text-lime`, `bg-paper`, `text-lime-ink`…), not raw hex.
- Brand: black `#000`, white, lime `#CCFC7D`. **Never put lime text on light backgrounds** (1.2:1 contrast).
  On light sections use lime only as a fill with black text, or `text-lime-ink` (#3F6212).
- Rhythm alternates dark (`Section tone="dark"`) and warm paper sections.
- The 3×3 pixel "x" (`PixelMark`) is the signature motif: eyebrows, bullets, slider handle. Use it lightly.
- Real posts, real UI, real owners. No stock models, gradient blobs or "AI sparkle" icons.
- **Pixel** (the green-and-yellow plush robot) is the brand mascot and the only character on the site.
  Source art: `brand/pixel/`. Keep him consistent with the character sheet, and don't add other robots or mascots.
- Copy: plain-spoken and owner-to-owner. Short sentences. "You" voice. No jargon.
- Accessibility: WCAG 2.2 AA. Keyboard support for every interactive element, visible focus,
  `prefers-reduced-motion` respected, and one `<h1>` per page. Tests run axe on every page.
- Mobile first: check 390px width. 16px gutters, no horizontal page scroll.

## SEO rules
- Canonical host is `https://www.postpixel.ai`, with no trailing slashes.
- Every page uses `buildMetadata({ title, description, path })`: title ≤ 60 chars, description ≤ 155, unique per page.
- Pages must be statically rendered. Indexable content can't depend on client-only JS.
- **URLs:** every live URL is listed in `content/routes.ts`. To change or remove one, add a 301 in
  `content/redirects.ts` pointing to the closest equivalent (never blanket-redirect to `/`), and log it in `docs/redirects.md`.
- Structured data: Organization + WebSite (layout), SoftwareApplication (home), FAQPage (FAQ section).
  Add BreadcrumbList on subpages and BlogPosting on posts. Only mark up content that's visible on the page.
- **Staging protection:** only `VERCEL_ENV=production` is indexable. Every other build sends
  `X-Robots-Tag: noindex`, `<meta name="robots" content="noindex">` and a `Disallow: /` robots.txt.
  Don't weaken this.
- Internal links: link new pages from relevant sections and the footer, and link trades to `/examples/<slug>`.

## Deployment workflow
1. Create a branch (`git checkout -b feature/<name>`), make changes, run `npm run check`.
2. Push the branch and open a PR. Vercel builds a preview (noindex) automatically.
3. Send the founder the preview URL plus a plain-language summary and screenshots.
4. Merge to `main` (= production deploy) **only after explicit founder approval**.
5. Before the first production launch, `npm run check:launch` must pass and the migration checklist
   in `docs/PLAN.md` §5 must be complete.
