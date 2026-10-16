"use client";

import { useCallback, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Drag-to-compare slider. Left of the handle shows `before`, right shows `after`.
 * Works with mouse, touch and keyboard (arrow keys, Home, End).
 */
export function BeforeAfterSlider({
  before,
  after,
  label,
  className,
}: {
  before: React.ReactNode;
  after: React.ReactNode;
  label: string;
  className?: string;
}) {
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const rect = box.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 20 : 5;
    const next =
      e.key === "ArrowLeft" || e.key === "ArrowDown"
        ? pos - step
        : e.key === "ArrowRight" || e.key === "ArrowUp"
          ? pos + step
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? 100
              : null;
    if (next === null) return;
    e.preventDefault();
    setPos(Math.min(100, Math.max(0, next)));
  };

  return (
    <div
      ref={box}
      className={cn("relative touch-pan-y overflow-hidden rounded-[1.25rem] select-none", className)}
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        setFromClientX(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && setFromClientX(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <div className="rounded-[inherit]">{before}</div>
      <div className="absolute inset-0 rounded-[inherit]" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
        {after}
      </div>

      <span className="pointer-events-none absolute top-3 left-3 rounded-full bg-black/70 px-3 py-1 text-xs font-bold text-white">
        Before
      </span>
      <span className="pointer-events-none absolute top-3 right-3 rounded-full bg-lime px-3 py-1 text-xs font-bold text-black">
        After
      </span>

      <div className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white/90" style={{ left: `${pos}%` }} />
      <div
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        aria-valuetext={`${Math.round(100 - pos)}% of the after version showing`}
        onKeyDown={onKeyDown}
        className="absolute top-1/2 flex h-11 w-[4.5rem] -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center gap-1 rounded-full bg-lime text-black shadow-[0_0_30px_rgba(204,252,125,0.6)] focus-visible:outline-white"
        style={{ left: `${pos}%` }}
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </div>
    </div>
  );
}
