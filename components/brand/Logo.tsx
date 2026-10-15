import { cn } from "@/lib/utils";
import { PixelMark } from "./PixelMark";

/**
 * Text wordmark that mirrors the logo: "PostPi" + pixel x + "el".
 * TODO: swap for the official SVG wordmark once supplied.
 */
export function Logo({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline text-[1.375rem] leading-none font-extrabold tracking-[-0.03em]",
        tone === "light" ? "text-white" : "text-black",
        className,
      )}
    >
      <span aria-hidden="true">PostPi</span>
      <PixelMark className="mx-[0.03em] h-[0.5em] w-[0.5em] self-baseline" />
      <span aria-hidden="true">el</span>
      <span className="sr-only">PostPixel</span>
    </span>
  );
}
