"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Pause, Play } from "lucide-react";
import { EditorMock } from "@/components/mock/EditorMock";

type Video = { src: string; webm: string; poster: string; description: string };

/**
 * Hero video with a poster frame and a pause control (WCAG 2.2.2).
 * Falls back to the editor mock until the video file exists.
 */
export function HeroMedia({ video }: { video: Video }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false);
  // null = follow the motion preference; true/false = the visitor pressed the button.
  const [userPaused, setUserPaused] = useState<boolean | null>(null);
  const playing = userPaused === null ? !reducedMotion : !userPaused;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (playing) void el.play().catch(() => {});
    else el.pause();
  }, [playing]);

  if (!video.src) {
    return (
      <figure>
        <EditorMock />
        <figcaption className="sr-only">{video.description}</figcaption>
      </figure>
    );
  }

  const toggle = () => setUserPaused(playing);

  return (
    <figure className="relative overflow-hidden rounded-2xl border border-white/10">
      <video
        ref={ref}
        className="aspect-video w-full object-cover"
        poster={video.poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-describedby="hero-video-desc"
      >
        {video.webm && <source src={video.webm} type="video/webm" />}
        <source src={video.src} type="video/mp4" />
      </video>
      <figcaption id="hero-video-desc" className="sr-only">
        {video.description}
      </figcaption>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause video" : "Play video"}
        className="absolute right-3 bottom-3 grid h-10 w-10 place-items-center rounded-full bg-black/60 text-white backdrop-blur hover:bg-black/80"
      >
        {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </button>
    </figure>
  );
}

const motionQuery = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia(motionQuery);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
function getReducedMotion() {
  return window.matchMedia(motionQuery).matches;
}
