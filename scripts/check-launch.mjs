// Pre-launch gate: fails while placeholder content or unbuilt legacy URLs remain.
// Run: npm run check:launch
import { readFileSync } from "node:fs";

const problems = [];
const read = (f) => readFileSync(new URL(`../${f}`, import.meta.url), "utf8");

const proof = read("content/social-proof.ts");
const placeholders = (proof.match(/placeholder: true,/g) ?? []).length;
if (placeholders) problems.push(`${placeholders} placeholder testimonial(s) in content/social-proof.ts`);

const site = read("content/site.ts");
if (/sourceUrl: ""/.test(site)) problems.push("homeownerStat.sourceUrl is empty in content/site.ts");

const pending = (read("content/routes.ts").match(/status: "pending"/g) ?? []).length;
if (pending) problems.push(`${pending} legacy URL(s) still "pending" in content/routes.ts (build or 301 them)`);

const homeContent = read("content/home.ts");
if (/src: ""/.test(homeContent)) problems.push("hero video not set in content/home.ts (editor mock is showing)");

const todos = ["content/site.ts", "content/faq.ts", "content/social-proof.ts"].filter((f) => read(f).includes("TODO(founder)"));
for (const f of todos) problems.push(`unresolved TODO(founder) in ${f}`);

if (problems.length) {
  console.error("Not ready to launch:\n" + problems.map((p) => `  - ${p}`).join("\n"));
  process.exit(1);
}
console.log("Launch checks passed.");
