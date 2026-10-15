/**
 * 301 redirects for legacy URLs that change in the rebuild.
 * Every entry must point to the closest matching page, never to "/" by default.
 * Keep docs/redirects.md in sync with this list.
 */
export const legacyRedirects: { source: string; destination: string; permanent: true }[] = [
  // Example:
  // { source: "/old-page", destination: "/new-page", permanent: true },
];
