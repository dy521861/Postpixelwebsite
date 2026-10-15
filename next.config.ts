import type { NextConfig } from "next";
import { legacyRedirects } from "./content/redirects";

// Only the production deployment on Vercel may be indexed.
// Preview and local builds send `X-Robots-Tag: noindex` on every response.
const isProduction = process.env.VERCEL_ENV === "production";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return legacyRedirects;
  },
  async headers() {
    if (isProduction) return [];
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
