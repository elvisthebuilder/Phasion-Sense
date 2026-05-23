import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "secondary" | "ghost" | "outline";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
    variant?: ButtonVariant;
    size?: "default" | "sm" | "lg" | "icon";
}

const buttonVariants: Record<ButtonVariant, string> = {
    // Primary: flat #E8920A background, #FFFFFF DM Sans uppercase, 2px border-radius
    default: "bg-[var(--color-amber)] text-[var(--color-surface)] hover:bg-[#d18309]",
    // Secondary: flat #1C1410 background, #F0EBE1 DM Sans uppercase, 2px border-radius
    secondary: "bg-[var(--color-espresso)] text-[var(--color-ivory)] hover:bg-[#2a1e18]",
    // Ghost: no background, #E8920A DM Sans uppercase text, no border
    ghost: "bg-transparent text-[var(--color-amber)] hover:bg-[var(--color-parchment)]",
    // Custom Outline for other needs
    outline: "border border-[var(--color-parchment)] bg-transparent text-[var(--color-espresso)] hover:bg-[var(--color-parchment)]",
};

const sizeVariants = {
    default: "h-12 px-6 py-3 text-sm tracking-[0.08em]",
    sm: "h-10 px-4 text-xs tracking-[0.08em]",
    lg: "h-14 px-8 text-base tracking-[0.08em]",
    icon: "h-12 w-12",
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
                "inline-flex items-center justify-center font-sans font-bold uppercase transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
                buttonVariants[variant],
                sizeVariants[size],
                // Force max 2px radius globally per rules
                "rounded-[2px]", 
                className,
            )}
            {...props}
        />
    );
});

Button.displayName = "Button";