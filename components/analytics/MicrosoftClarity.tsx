import Script from "next/script";
import { clarityTagSrc, CLARITY_PROJECT_ID } from "@/lib/analytics";
import { isProduction } from "@/lib/seo";

/**
 * Standard Clarity bootstrap, loaded once for the whole site.
 *
 * `afterInteractive` waits until after hydration so the tag does not compete
 * with first paint. The root layout is the only layout, so every route —
 * including pages added later — gets this single tag.
 *
 * Rendered only when VERCEL_ENV is "production" (see lib/seo.ts). Preview,
 * staging, and local builds leave it out so test traffic stays out of Clarity.
 */
export function MicrosoftClarity() {
  if (!isProduction) return null;

  const src = clarityTagSrc();

  return (
    <Script id="microsoft-clarity" strategy="afterInteractive">
      {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="${src}";
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");`}
    </Script>
  );
}
