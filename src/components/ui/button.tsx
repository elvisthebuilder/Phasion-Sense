import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "outline" | "secondary" | "ghost";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
    variant?: ButtonVariant;
    size?: "default" | "sm" | "lg" | "icon";
}

const buttonVariants: Record<ButtonVariant, string> = {
    default: "bg-slate-950 text-white shadow-sm hover:bg-slate-800 hover:shadow-md",
    outline: "border border-slate-200 bg-white text-slate-900 shadow-sm hover:border-slate-300 hover:bg-slate-50",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
    ghost: "bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-950",
};

const sizeVariants = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-xl px-6",
    icon: "h-10 w-10",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
    { className, variant = "default", size = "default", asChild = false, ...props },
    ref,
) {
    const Comp = asChild ? Slot : "button";

    return (
        <Comp
            ref={ref}
            className={cn(
                "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:pointer-events-none disabled:opacity-50",
                buttonVariants[variant],
                sizeVariants[size],
                className,
            )}
            {...props}
        />
    );
});

Button.displayName = "Button";