"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CalendarDays, Check, Globe, Pause, Play, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { PixelMark } from "@/components/brand/PixelMark";
import { PlatformMark, platformNames, type Platform } from "@/components/brand/PlatformMark";
import { MockPost } from "@/components/mock/MockPost";
import { TradeIcon } from "@/components/mock/TradeIcon";
import { trades } from "@/content/trades";
import type { hero as heroContent } from "@/content/home";

type Hero = typeof heroContent;

/** How long each step stays on screen. */
const SCENE_MS = 3600;
/** Where Pixel stands for each step (percent from the left of the stage). */
const PIXEL_X = [2, 7, 2, 6, 4];

/**
 * Hero animation: Pixel walks through what PostPixel does: reads the website,
 * grabs job photos and reviews, designs posts, and schedules them.
 * Cards are real HTML (crisp, light, editable); only Pixel is an image/video.
 * Pauses on demand (WCAG 2.2.2) and shows a still final frame for reduced motion.
 */
export function PixelStage({ hero }: { hero: Hero }) {
  const reducedMotion = useReducedMotion();
  const [scene, setScene] = useState(0);
  const [paused, setPaused] = useState(false);
  const animate = !reducedMotion;
  const running = animate && !paused;
  const shown = animate ? scene : hero.steps.length - 1;

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setScene((s) => (s + 1) % hero.steps.length), SCENE_MS);
    return () => clearInterval(id);
  }, [running, hero.steps.length]);

  const step = hero.steps[shown];
  const collects = step.key === "website" || step.key === "photos" || step.key === "reviews";

  /** Staggered pop-in; "grab" steps also fly items toward Pixel at the end. */
  const item = (i: number): React.CSSProperties =>
    !running
      ? {}
      : {
          animation: [
            `pp-pop 0.45s cubic-bezier(0.2,0.9,0.3,1.2) ${300 + i * 140}ms both`,
            collects ? `pp-collect 0.55s ease-in ${SCENE_MS - 750 + i * 25}ms forwards` : "",
          ]
            .filter(Boolean)
            .join(", "),
        };
  const card: React.CSSProperties = !running
    ? {}
    : {
        animation: `pp-card-in 0.5s cubic-bezier(0.2,0.8,0.2,1) both${
          collects ? "" : `, pp-card-out 0.35s ease-in ${SCENE_MS - 380}ms forwards`
        }`,
      };

  return (
    <figure className="relative">
      <figcaption className="sr-only">{hero.description}</figcaption>
      <div
        aria-hidden="true"
        className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] sm:aspect-[6/5]"
      >
        {/* soft stage lighting */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 55% at 70% 30%, rgba(204,252,125,0.10), transparent 70%), radial-gradient(60% 50% at 20% 100%, rgba(56,97,180,0.25), transparent 70%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-[16%] bg-gradient-to-t from-white/[0.05] to-transparent" />

        {/* progress */}
        <ol className="absolute top-[4%] left-[5%] flex gap-1.5">
          {hero.steps.map((s, i) => (
            <li
              key={s.key}
              className={cn(
                "h-1.5 w-7 rounded-full transition-colors duration-500 sm:w-9",
                i <= shown ? "bg-lime" : "bg-white/15",
              )}
            />
          ))}
        </ol>

        {/* the step's card */}
        <div key={`${shown}-${running}`} className="absolute top-[10%] right-[4%] w-[92%] sm:top-[13%] sm:w-[60%]" style={card}>
          {step.key === "website" && (
            <div className="relative overflow-hidden rounded-2xl bg-white p-3 text-ink shadow-2xl sm:p-4">
              <div className="flex items-center gap-2 rounded-full bg-paper-2 px-3 py-1.5 text-[11px] sm:text-xs">
                <Globe className="h-3.5 w-3.5 text-muted" />
                <span className="font-semibold">{hero.demo.url}</span>
                <span className="ml-auto rounded-full bg-lime px-2 py-0.5 text-[10px] font-bold">Scanning</span>
              </div>
              <div className="mt-3 flex items-center gap-2.5" style={item(0)}>
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#1e3a5f] text-sm font-extrabold text-white">
                  N
                </span>
                <span className="text-[13px] leading-tight font-bold sm:text-sm">
                  {hero.demo.business}
                  <span className="block text-[11px] font-medium text-muted">Logo found</span>
                </span>
              </div>
              <p className="mt-3 text-[10px] font-bold tracking-wider text-muted uppercase">Brand colors</p>
              <div className="mt-1.5 flex gap-1.5">
                {hero.demo.colors.map((c, i) => (
                  <span
                    key={c}
                    className="h-7 w-7 rounded-lg border border-black/10 sm:h-8 sm:w-8"
                    style={{ background: c, ...item(i + 1) }}
                  />
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {hero.demo.services.map((s, i) => (
                  <span key={s} className="rounded-full bg-paper-2 px-2.5 py-1 text-[11px] font-semibold" style={item(i + 5)}>
                    {s}
                  </span>
                ))}
              </div>
              {running && (
                <span className="absolute inset-x-0 h-0.5 bg-lime/80 shadow-[0_0_12px_#ccfc7d] [animation:pp-scan_1.4s_ease-in-out_infinite_alternate]" />
              )}
            </div>
          )}

          {step.key === "photos" && (
            <div className="rounded-2xl bg-white p-3 text-ink shadow-2xl sm:p-4">
              <div className="flex items-baseline justify-between">
                <p className="text-[13px] font-bold sm:text-sm">Job site photos</p>
                <p className="text-[11px] font-semibold text-muted">48 found</p>
              </div>
              <div className="mt-2.5 grid grid-cols-3 gap-1.5">
                {trades.slice(0, 6).map((t, i) => (
                  <span
                    key={t.slug}
                    className="relative grid aspect-square place-items-center overflow-hidden rounded-lg"
                    style={{ background: `linear-gradient(150deg, ${t.photo[0]}, ${t.photo[1]})`, ...item(i) }}
                  >
                    <TradeIcon name={t.icon} className="h-1/2 w-1/2 text-white/30" strokeWidth={1.5} />
                    <span className="absolute right-1 bottom-1 grid h-4 w-4 place-items-center rounded-full bg-lime">
                      <Check className="h-2.5 w-2.5 text-black" strokeWidth={3} />
                    </span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {step.key === "reviews" && (
            <div className="rounded-2xl bg-white p-3 text-ink shadow-2xl sm:p-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-extrabold">{hero.demo.rating}</span>
                <Stars />
                <span className="text-[11px] font-semibold text-muted">{hero.demo.reviewCount}</span>
              </div>
              <ul className="mt-2.5 space-y-2">
                {hero.demo.reviews.map((r, i) => (
                  <li key={r.name} className="rounded-xl bg-paper-2 p-2.5" style={item(i)}>
                    <div className="flex items-center gap-2">
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-black text-[10px] font-bold text-lime">
                        {r.name[0]}
                      </span>
                      <span className="text-[12px] font-bold">{r.name}</span>
                      <Stars className="ml-auto" small />
                    </div>
                    <p className="mt-1.5 text-[11.5px] leading-snug text-ink/80 sm:text-[12.5px]">{r.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {step.key === "posts" && (
            <div>
              <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
                <PixelMark className="h-3 w-3" /> 30 posts, in your brand
              </p>
              <div className="relative h-[clamp(170px,30vw,250px)]">
                {[trades[0], trades[2], trades[4]].map((t, i) => (
                  <div
                    key={t.slug}
                    className="absolute top-0 w-[46%] drop-shadow-2xl"
                    style={{ left: `${i * 27}%`, zIndex: i === 1 ? 2 : 1, ...item(i) }}
                  >
                    <div style={{ transform: `rotate(${(i - 1) * 6}deg) translateY(${i === 1 ? 0 : 10}px)` }}>
                      <MockPost trade={t} variant="after" showSampleTag={false} className="rounded-xl" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step.key === "schedule" && (
            <div className="rounded-2xl bg-white p-3 text-ink shadow-2xl sm:p-4">
              <p className="flex items-center gap-2 text-[13px] font-bold sm:text-sm">
                <CalendarDays className="h-4 w-4" /> This week
              </p>
              <ul className="mt-2.5 space-y-1.5">
                {hero.demo.schedule.map((row, i) => (
                  <li key={row.platform} className="flex items-center gap-2.5 rounded-xl bg-paper-2 p-1.5 pr-2.5" style={item(i)}>
                    <PlatformMark platform={row.platform as Platform} className="h-6 w-6 sm:h-7 sm:w-7" />
                    <span className="min-w-0 flex-1 truncate text-[11.5px] font-semibold sm:text-[12.5px]">
                      {platformNames[row.platform as Platform]}
                    </span>
                    <span className="font-mono text-[10.5px] text-muted sm:text-[11px]">{row.when}</span>
                    <span className="grid h-4 w-4 place-items-center rounded-full bg-lime">
                      <Check className="h-2.5 w-2.5 text-black" strokeWidth={3} />
                    </span>
                  </li>
                ))}
              </ul>
              <p
                className="mt-2.5 inline-flex items-center gap-2 rounded-full bg-black px-3 py-1.5 text-[11px] font-bold text-lime"
                style={item(5)}
              >
                <Check className="h-3.5 w-3.5" strokeWidth={3} /> {hero.demo.done}
              </p>
            </div>
          )}
        </div>

        {/* Pixel's speech bubble: a caption beside his feet, never over the card */}
        <div
          key={`bubble-${shown}`}
          className="pp-pop absolute bottom-[8%] left-[30%] z-20 rounded-2xl rounded-bl-sm bg-white px-3 py-2 text-[12px] font-bold whitespace-nowrap text-ink shadow-xl sm:left-[36%] sm:text-[13px]"
        >
          {step.label}
          {running && <span className="ml-0.5 inline-block w-4 text-left">…</span>}
        </div>

        {/* Pixel */}
        <div
          className="absolute bottom-[3%] z-10 h-[34%] transition-[left] duration-700 ease-in-out sm:z-0 sm:h-[58%]"
          style={{ left: `${PIXEL_X[shown]}%` }}
        >
          <div
            key={`pixel-${shown}-${running}`}
            className="h-full origin-bottom"
            style={
              running
                ? { animation: "pp-walk 0.36s ease-in-out 0s 2, pp-idle 2.6s ease-in-out 0.72s infinite" }
                : undefined
            }
          >
            {hero.pixel.video.webm ? (
              <video className="h-full w-auto" autoPlay={running} muted loop playsInline>
                {hero.pixel.video.hevc && <source src={hero.pixel.video.hevc} type='video/mp4; codecs="hvc1"' />}
                <source src={hero.pixel.video.webm} type="video/webm" />
              </video>
            ) : (
              <Image
                src={hero.pixel.image}
                alt=""
                width={430}
                height={720}
                priority
                sizes="(min-width: 1024px) 220px, 35vw"
                className="h-full w-auto drop-shadow-[0_24px_30px_rgba(0,0,0,0.55)]"
              />
            )}
          </div>
          <div className="mx-auto -mt-2 h-3 w-[70%] rounded-[50%] bg-black/50 blur-md" />
        </div>
      </div>

      {animate && (
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? "Play animation" : "Pause animation"}
          className="absolute right-3 bottom-3 grid h-10 w-10 place-items-center rounded-full bg-black/60 text-white backdrop-blur hover:bg-black/80"
        >
          {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
        </button>
      )}
    </figure>
  );
}

function Stars({ className, small }: { className?: string; small?: boolean }) {
  return (
    <span className={cn("flex text-amber-400", className)}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} className={small ? "h-3 w-3" : "h-3.5 w-3.5"} fill="currentColor" strokeWidth={0} />
      ))}
    </span>
  );
}
