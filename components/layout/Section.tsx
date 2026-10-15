import { cn } from "@/lib/utils";
import { PixelMark } from "@/components/brand/PixelMark";

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1200px] px-4 sm:px-6", className)}>{children}</div>;
}

/** Page band. `dark` = night sections, `paper` = warm light sections. */
export function Section({
  id,
  tone = "paper",
  className,
  children,
  labelledBy,
}: {
  id?: string;
  tone?: "dark" | "paper" | "white";
  className?: string;
  children: React.ReactNode;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "py-20 sm:py-28",
        tone === "dark" && "bg-ink text-white",
        tone === "paper" && "on-light bg-paper text-ink",
        tone === "white" && "on-light bg-white text-ink",
        className,
      )}
    >
      {children}
    </section>
  );
}

/** Small uppercase label above a heading, with the pixel motif. */
export function Eyebrow({ children, tone = "dark" }: { children: React.ReactNode; tone?: "dark" | "light" }) {
  return (
    <p
      className={cn(
        "mb-4 inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] uppercase",
        tone === "dark" ? "text-lime" : "text-lime-ink",
      )}
    >
      <PixelMark className={cn("h-2.5 w-2.5", tone === "light" && "fill-lime-ink")} />
      {children}
    </p>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  body,
  tone = "dark",
  align = "left",
  className,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  body?: string;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2 id={id} className="text-4xl leading-[1.05] font-extrabold sm:text-5xl">
        {title}
      </h2>
      {body && (
        <p className={cn("mt-5 text-lg leading-relaxed", tone === "dark" ? "text-muted-dark" : "text-muted")}>
          {body}
        </p>
      )}
    </div>
  );
}
