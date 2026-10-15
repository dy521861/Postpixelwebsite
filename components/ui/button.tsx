import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-[background-color,box-shadow,transform] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        /** Lime fill, black text. The one primary action per view. */
        primary:
          "bg-lime text-black shadow-[0_0_40px_-8px_rgba(204,252,125,0.55)] hover:bg-lime-hover",
        /** Outline on dark backgrounds. */
        ghostDark: "border border-white/20 text-white hover:border-white/40 hover:bg-white/5",
        /** Outline on light backgrounds. */
        ghostLight: "border border-black/15 text-black hover:border-black/30 hover:bg-black/[0.03]",
        /** Black fill on light backgrounds. */
        dark: "bg-black text-white hover:bg-ink-3",
      },
      size: {
        sm: "h-10 px-4 text-sm",
        md: "h-12 px-6 text-[0.9375rem]",
        lg: "h-14 px-7 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonLinkProps = VariantProps<typeof buttonVariants> & {
  href: string;
  className?: string;
  children: React.ReactNode;
};

export function ButtonLink({ href, variant, size, className, children }: ButtonLinkProps) {
  const classes = cn(buttonVariants({ variant, size }), className);
  if (href.startsWith("http")) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
