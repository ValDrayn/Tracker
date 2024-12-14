import { ReactNode, ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";
type Props = {
  children?: ReactNode;
  isLoading?: boolean;
  variant: "primary";
};

const variants = {
  primary: "bg-white text-dark-green text-[1.25rem] font-medium",
};

export function Buttons({
  children,
  variant,
  isLoading,
  ...props
}: Props & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "flex justify-center py-[0.4rem] active:scale-[98%] items-center gap-1 active:opacity-95 text-[0.875rem] font-medium rounded-xl",
        variants[variant],
        props.className
      )}
      disabled={props.disabled}
    >
        {children}
    </button>
  );
}