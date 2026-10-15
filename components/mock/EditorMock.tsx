import { Image as ImageIcon, LayoutTemplate, MousePointer2, Palette, Type, Upload } from "lucide-react";
import { PixelMark } from "@/components/brand/PixelMark";
import { MockPost } from "./MockPost";
import { trades } from "@/content/trades";

/**
 * Stand-in for the hero video's final scene: late at night, a generic design
 * editor (deliberately not any real product's UI) with a post half-finished,
 * and PostPixel delivering the month of posts. Decorative.
 */
export function EditorMock() {
  const hvac = trades[0];
  return (
    <div className="relative" aria-hidden="true">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#121316] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]">
        {/* window chrome */}
        <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="ml-3 truncate text-[11px] text-white/60">Spring promo – post 3 of 30.design</span>
          <span className="ml-auto font-mono text-[11px] text-white/60">11:47 PM</span>
        </div>
        <div className="grid grid-cols-[44px_1fr] sm:grid-cols-[52px_120px_1fr_96px]">
          {/* tool rail */}
          <div className="flex flex-col items-center gap-4 border-r border-white/[0.06] py-4 text-white/40">
            <LayoutTemplate className="h-4 w-4 text-white/80" />
            <Type className="h-4 w-4" />
            <ImageIcon className="h-4 w-4" />
            <Upload className="h-4 w-4" />
            <Palette className="h-4 w-4" />
          </div>
          {/* templates */}
          <div className="hidden space-y-2 border-r border-white/[0.06] p-3 sm:block">
            <div className="h-2 w-16 rounded bg-white/15" />
            {[0, 1, 2].map((i) => (
              <div key={i} className="aspect-[4/5] rounded-md bg-white/[0.05]" />
            ))}
          </div>
          {/* canvas */}
          <div className="relative grid place-items-center bg-[#0c0d0f] p-6 sm:p-8">
            <div className="relative w-[62%] max-w-[240px] rounded-lg">
              <MockPost trade={hvac} variant="after" showSampleTag={false} className="rounded-lg opacity-90" />
              <div className="pointer-events-none absolute inset-x-[6%] bottom-[30%] h-[22%] rounded-sm border border-sky-400">
                {["-top-1 -left-1", "-top-1 -right-1", "-bottom-1 -left-1", "-bottom-1 -right-1"].map((p) => (
                  <span key={p} className={`absolute ${p} h-2 w-2 rounded-[2px] border border-sky-400 bg-white`} />
                ))}
              </div>
              <MousePointer2 className="absolute right-[2%] bottom-[24%] h-5 w-5 fill-white text-black" />
            </div>
          </div>
          {/* properties */}
          <div className="hidden space-y-3 border-l border-white/[0.06] p-3 sm:block">
            <div className="h-2 w-12 rounded bg-white/15" />
            <div className="grid grid-cols-3 gap-1.5">
              {["#1e3a5f", "#0f766e", "#ffffff", "#ccfc7d", "#0a0a0a", "#f59e0b"].map((c) => (
                <span key={c} className="aspect-square rounded" style={{ background: c }} />
              ))}
            </div>
            <div className="h-2 w-14 rounded bg-white/10" />
            <div className="h-6 rounded bg-white/[0.06]" />
            <div className="h-6 rounded bg-white/[0.06]" />
          </div>
        </div>
      </div>

      {/* PostPixel delivers */}
      <div className="absolute -bottom-6 left-4 flex items-center gap-3 rounded-2xl border border-lime/30 bg-ink-2/95 py-3 pr-5 pl-3 shadow-2xl backdrop-blur sm:-left-8">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-lime">
          <PixelMark className="h-4 w-4 fill-black" />
        </span>
        <span>
          <span className="block text-sm font-bold text-white">30 posts ready</span>
          <span className="block text-xs text-muted-dark">Scheduled through next month</span>
        </span>
      </div>
    </div>
  );
}
