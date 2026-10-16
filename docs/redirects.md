# Redirect map

Every legacy postpixel.ai URL keeps its exact path in the rebuild, so **no redirects are needed yet**.
The full list of legacy URLs and their build status is in `content/routes.ts`.

When a URL must change, add a row here **and** the entry in `content/redirects.ts`.

| Old URL | New URL | Type | Reason | Date |
|---|---|---|---|---|
| (none yet) | | | | |

Pending: reconcile `content/routes.ts` against a full crawl of the live site and a Google Search Console
"Pages" export. Any URL found there but missing from the list must be added before launch.
