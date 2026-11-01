/**
 * Microsoft Clarity for the public marketing site.
 *
 * This is the website project. The product app uses a different Clarity
 * project and must not be loaded here.
 *
 * Override with NEXT_PUBLIC_CLARITY_PROJECT_ID when the project changes.
 * The value is public by nature: it is written into the page as the tag URL.
 */
export const CLARITY_PROJECT_ID =
  process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID?.trim() || "t3r6521z6v";

const PROJECT_ID_PATTERN = /^[a-z0-9]+$/;

export function clarityTagSrc(): string {
  if (!PROJECT_ID_PATTERN.test(CLARITY_PROJECT_ID)) {
    throw new Error(
      "NEXT_PUBLIC_CLARITY_PROJECT_ID must contain only lowercase letters and digits.",
    );
  }
  return `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`;
}
