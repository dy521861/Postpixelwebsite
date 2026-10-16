import { Store } from "lucide-react";
import { cn } from "@/lib/utils";

export type Platform = "facebook" | "instagram" | "linkedin" | "google";

export const platformNames: Record<Platform, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  google: "Google Business Profile",
};

/** Simple, recognizable platform marks (decorative; the name is always shown next to them). */
export function PlatformMark({ platform, className }: { platform: Platform; className?: string }) {
  const base = cn("grid h-7 w-7 shrink-0 place-items-center rounded-lg text-white", className);
  if (platform === "facebook")
    return (
      <span aria-hidden="true" className={cn(base, "rounded-full bg-[#1877F2] text-[17px] leading-none font-extrabold")}>
        <span className="translate-y-[2px]">f</span>
      </span>
    );
  if (platform === "instagram")
    return (
      <span
        aria-hidden="true"
        className={base}
        style={{ background: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fd5949 45%, #d6249f 60%, #285AEB 90%)" }}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
        </svg>
      </span>
    );
  if (platform === "linkedin")
    return (
      <span aria-hidden="true" className={cn(base, "bg-[#0A66C2] text-[12px] font-extrabold tracking-tight")}>
        in
      </span>
    );
  return (
    <span aria-hidden="true" className={cn(base, "bg-[#4285F4]")}>
      <Store className="h-4 w-4" />
    </span>
  );
}
