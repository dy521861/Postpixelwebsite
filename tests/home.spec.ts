import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("home page", () => {
  test("SEO basics are server-rendered", async ({ request }) => {
    const res = await request.get("/");
    expect(res.status()).toBe(200);
    const html = await res.text();

    expect(html).toMatch(/<title>Social Media on Autopilot for Home Service Pros \| PostPixel<\/title>/);
    expect(html).toMatch(/<link rel="canonical" href="https:\/\/www\.postpixel\.ai\/?"/);
    expect(html).toMatch(/<meta name="description" content="[^"]{50,160}"/);
    expect(html.match(/<h1[\s>]/g)?.length).toBe(1);

    // All JSON-LD blocks parse and include the expected types.
    const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) =>
      JSON.parse(m[1]),
    );
    const types = JSON.stringify(blocks);
    for (const t of ["Organization", "WebSite", "SoftwareApplication", "FAQPage"]) {
      expect(types).toContain(`"${t}"`);
    }
  });

  test("non-production builds are not indexable", async ({ request }) => {
    const res = await request.get("/");
    expect(res.headers()["x-robots-tag"]).toContain("noindex");
    const robots = await (await request.get("/robots.txt")).text();
    expect(robots).toContain("Disallow: /");
  });

  test("sitemap lists the home page", async ({ request }) => {
    const xml = await (await request.get("/sitemap.xml")).text();
    expect(xml).toContain("<loc>https://www.postpixel.ai/</loc>");
  });

  test("has no detectable accessibility violations", async ({ page }) => {
    await page.goto("/");
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.nodes.length} node(s)`)).toEqual([]);
  });

  test("trade tabs switch with keyboard", async ({ page }) => {
    await page.goto("/");
    const first = page.getByRole("tab", { name: "HVAC" });
    await first.focus();
    await page.keyboard.press("ArrowDown");
    await expect(page.getByRole("tab", { name: "Plumbing" })).toHaveAttribute("aria-selected", "true");
    await expect(page.getByRole("tabpanel")).toContainText(/plumbing/i);
  });

  test("before/after slider moves with keyboard", async ({ page }) => {
    await page.goto("/");
    const slider = page.getByRole("slider");
    await expect(slider).toHaveAttribute("aria-valuenow", "50");
    await slider.focus();
    await page.keyboard.press("ArrowRight");
    await expect(slider).toHaveAttribute("aria-valuenow", "55");
    await page.keyboard.press("Home");
    await expect(slider).toHaveAttribute("aria-valuenow", "0");
  });
});
