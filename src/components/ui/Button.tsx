import Link from "next/link";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "ghost";
type Size = "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 font-sans text-sm tracking-wide uppercase transition-colors duration-200 disabled:opacity-40 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-dc-accent text-dc-white hover:bg-dc-white hover:text-dc-bg",
  outline:
    "border border-dc-white/40 text-dc-white hover:border-dc-accent hover:text-dc-accent",
  ghost: "text-dc-white hover:text-dc-accent",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-6 py-3",
  sm: "min-h-9 px-4 py-2 text-xs",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  /** When provided, the button renders as a Next.js <Link> instead of <button>. */
  href?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  type = "button",
  ...rest
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        onClick={rest.onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
