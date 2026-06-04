import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  fullWidth?: boolean;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[#0054FD] text-white hover:bg-[#0047D6] focus-visible:ring-[#0054FD]/40 disabled:bg-slate-300 disabled:text-slate-500",
  secondary:
    "border border-slate-200 bg-white text-[#0054FD] hover:bg-slate-50 focus-visible:ring-[#0054FD]/25 disabled:border-slate-200 disabled:text-slate-400",
};

export function Button({
  variant = "primary",
  fullWidth = false,
  className = "",
  type = "button",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={[
        "inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed",
        variantClasses[variant],
        fullWidth ? "w-full" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
