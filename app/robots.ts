import type { MetadataRoute } from "next";
import { isProduction } from "@/lib/seo";
import { site } from "@/content/site";

// Production: crawl everything. Previews and local builds: crawl nothing.
export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
