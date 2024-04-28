import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "flex items-center justify-center whitespace-nowrap text-sm font-medium focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-slate-950 text-white shadow hover:bg-slate-950/85",
        destructive: "bg-red-500 text-white shadow-sm hover:bg-red-500/80",
        outline:
          "border border-slate-900 bg-white shadow-sm hover:bg-slate-100",
        secondary: "bg-gray-100 text-slate-900 shadow-sm hover:bg-gray-200/80",
        ghost: "hover:bg-gray-100",
        link: "text-slate-900 underline-offset-2 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-10 px-8",
        wider: "h-10 px-10",
        wide: "h-8 md:h-10 px-4 text-xs md:px-12",
        "px-24": "h-10 px-24",
        full: "h-10 px-4 w-full",
        icon: "h-9 w-9",
      },
      rounded: {
        default: "rounded-full",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
        none: "rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "md",
    },
  }
);

type ButtonProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  children: React.ReactNode;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, rounded, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, rounded, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
