import { cn } from "@/lib/utils";

/** The 3×3 pixel "x" from the PostPixel logo. Decorative by default. */
export function PixelMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 3 3"
      shapeRendering="crispEdges"
      className={cn("inline-block fill-lime", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <rect x="0" y="0" width="1" height="1" />
      <rect x="2" y="0" width="1" height="1" />
      <rect x="1" y="1" width="1" height="1" />
      <rect x="0" y="2" width="1" height="1" />
      <rect x="2" y="2" width="1" height="1" />
    </svg>
  );
}
