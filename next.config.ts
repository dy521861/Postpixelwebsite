import type { NextConfig } from "next";
import { legacyRedirects } from "./content/legacy-redirects";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  skipTrailingSlashRedirect: true,
  async redirects() {
    return legacyRedirects;
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
