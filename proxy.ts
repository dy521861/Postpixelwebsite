import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const gonePaths = new Set([
  "/blog/breaking-through-the-seasonal-barrier-green-dreams-landscaping",
  "/blog/from-side-hustle-to-cleaning-empire-spotless-sisters",
  "/blog/from-side-jobs-to-six-figures-thompson-pressure-washing",
  "/blog/modernizing-a-family-legacy-rodriguez-hvac",
]);

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname.replace(/\/+$/, "") || "/";
  if (!gonePaths.has(pathname)) {
    return NextResponse.next();
  }

  return new NextResponse(null, {
    status: 410,
    headers: {
      "X-Robots-Tag": "noindex",
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}

export const config = {
  matcher: [
    "/blog/breaking-through-the-seasonal-barrier-green-dreams-landscaping",
    "/blog/breaking-through-the-seasonal-barrier-green-dreams-landscaping/",
    "/blog/from-side-hustle-to-cleaning-empire-spotless-sisters",
    "/blog/from-side-hustle-to-cleaning-empire-spotless-sisters/",
    "/blog/from-side-jobs-to-six-figures-thompson-pressure-washing",
    "/blog/from-side-jobs-to-six-figures-thompson-pressure-washing/",
    "/blog/modernizing-a-family-legacy-rodriguez-hvac",
    "/blog/modernizing-a-family-legacy-rodriguez-hvac/",
  ],
};
