"use client";

import { useRouter } from "next/navigation";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "hover:underline underline-offset-2 w-full text-left",
  {
    variants: {
      size: {
        default: "text-base",
        large: "text-lg",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

type ButtonProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  value?: string | number;
  disabled?: boolean;
  children: React.ReactNode;
};

function LogoutButton({ className, size, ...props }: ButtonProps) {
  const router = useRouter();

  const handleLogout = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onClick) {
      props.onClick(event);
    }

    if (!event.defaultPrevented) {
      const res = await fetch("/api/logout", {
        method: "POST",
      });

      if (res.ok) {
        router.refresh();
      } else {
        alert("Logout failed");
      }
    }
  };

  return (
    <button
      onClick={handleLogout}
      className={cn(buttonVariants({ size }), className)}
      {...props}
    />
  );
}

LogoutButton.displayName = "LogoutButton";

export { LogoutButton, buttonVariants };
