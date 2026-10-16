import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { routes } from "@/content/routes";

/** Lists every built, indexable route. Unbuilt legacy routes stay out until they exist. */
export default function sitemap(): MetadataRoute.Sitemap {
  return routes
    .filter((r) => r.status === "built")
    .map((r) => ({
      url: r.path === "/" ? `${site.url}/` : `${site.url}${r.path}`,
      lastModified: r.lastModified,
      changeFrequency: r.path === "/" ? "weekly" : "monthly",
      priority: r.path === "/" ? 1 : 0.7,
    }));
}
