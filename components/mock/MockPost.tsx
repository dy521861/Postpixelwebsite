import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { PixelMark } from "@/components/brand/PixelMark";
import { TradeIcon } from "./TradeIcon";
import type { Trade } from "@/content/trades";

/**
 * Design stand-in for a social post, drawn in HTML/CSS so the layout can be
 * reviewed before real exports exist. Sizes scale with the card (container
 * query units), so one component works from thumbnail to full size.
 *
 * TODO(launch): replace with real PostPixel-generated post images.
 */
export function MockPost({
  trade,
  variant,
  className,
  showSampleTag = true,
}: {
  trade: Trade;
  variant: "before" | "after";
  className?: string;
  showSampleTag?: boolean;
}) {
  const [c1, c2] = trade.photo;
  const photo = (
    <div
      className="absolute inset-0"
      style={{
        background: `radial-gradient(120% 80% at 80% 10%, rgba(255,255,255,0.18), transparent 55%), radial-gradient(90% 70% at 10% 100%, rgba(0,0,0,0.45), transparent 60%), linear-gradient(160deg, ${c1}, ${c2})`,
      }}
    >
      <TradeIcon
        name={trade.icon}
        strokeWidth={1.25}
        className="absolute top-[18%] left-1/2 h-[46%] w-[46%] -translate-x-1/2 text-white/[0.16]"
      />
    </div>
  );

  if (variant === "before") {
    return (
      <div
        className={cn("@container relative aspect-[4/5] overflow-hidden rounded-[inherit] bg-white", className)}
        role="img"
        aria-label={`Before: an unedited phone photo posted by a ${trade.name.toLowerCase()} business with the caption "${trade.sample.beforeCaption}"`}
      >
        <div className="absolute inset-0 [filter:saturate(0.35)_brightness(0.75)_blur(0.6px)]">
          {photo}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-[22%] bg-white px-[6cqw] pt-[4cqw] text-black">
          <p className="text-[4.2cqw] font-semibold">{trade.sample.business.toLowerCase().replace(/[^a-z]/g, "")}</p>
          <p className="mt-[1cqw] text-[4cqw] text-black/70">{trade.sample.beforeCaption}</p>
          <p className="mt-[1.5cqw] text-[3cqw] text-black/40">11:48 PM</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn("@container relative aspect-[4/5] overflow-hidden rounded-[inherit] text-white", className)}
      role="img"
      aria-label={`After: a branded ${trade.name} post by ${trade.sample.business} reading "${trade.sample.headline}" with the offer "${trade.sample.offer}"`}
    >
      {photo}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
      <div className="absolute top-[5cqw] left-[5cqw] flex items-center gap-[2cqw] rounded-full bg-white/95 py-[1.6cqw] pr-[3.5cqw] pl-[1.6cqw] text-black">
        <span className="grid h-[6cqw] w-[6cqw] place-items-center rounded-full bg-black">
          <PixelMark className="h-[2.8cqw] w-[2.8cqw]" />
        </span>
        <span className="text-[3.4cqw] font-bold">{trade.sample.business}</span>
      </div>
      {showSampleTag && (
        <span className="absolute top-[5.5cqw] right-[5cqw] rounded-full bg-black/50 px-[2.4cqw] py-[0.8cqw] text-[2.6cqw] font-semibold tracking-wider uppercase backdrop-blur">
          Sample
        </span>
      )}
      <div className="absolute inset-x-0 bottom-0 p-[6cqw]">
        <p className="text-[8.4cqw] leading-[1.02] font-extrabold tracking-[-0.03em]">{trade.sample.headline}</p>
        <p className="mt-[3.5cqw] inline-block rounded-full bg-lime px-[3.4cqw] py-[1.4cqw] text-[3.6cqw] font-bold text-black">
          {trade.sample.offer}
        </p>
        <div className="mt-[4cqw] flex items-center justify-between border-t border-white/20 pt-[3cqw] text-[3.1cqw] text-white/80">
          <span className="inline-flex items-center gap-[1.5cqw]">
            <Phone className="h-[3.2cqw] w-[3.2cqw]" aria-hidden="true" />
            (555) 012-3456
          </span>
          <span>{trade.sample.town}</span>
        </div>
      </div>
    </div>
  );
}
