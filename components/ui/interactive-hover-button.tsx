import React from "react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string;
    variant?: "primary" | "outline";
    icon?: React.ReactNode;
    isLoading?: boolean;
}

/**
 * Fluid Button — Inspired by the Framer Fluid Button effect.
 * 
 * On hover:
 *   1. White overlay rises from below (circle → rect morph)
 *   2. Text slides up, replaced by dark-colored duplicate from below
 */
const InteractiveHoverButton = React.forwardRef<
    HTMLButtonElement,
    InteractiveHoverButtonProps
>(({ text, children, icon, variant = "primary", isLoading, className, disabled, ...props }, ref) => {
    const isPrimary = variant === "primary";
    const content = text || children;

    return (
        <button
            ref={ref}
            className={cn(
                "group relative cursor-pointer rounded-full text-center font-semibold",
                "overflow-hidden",
                "transition-all duration-500 ease-[cubic-bezier(0.4,0,0,1)]",
                className,
                (disabled || isLoading) && "opacity-50 cursor-not-allowed pointer-events-none"
            )}
            style={{
                border: isPrimary
                    ? '2px solid #d92514'
                    : '2px solid rgba(228, 37, 37, 0.3)', // Red with opacity
                padding: '16px 40px',
            }}
            disabled={disabled || isLoading}
            {...props}
        >
            {/* Overlay — rises from bottom on hover */}
            <div
                className={cn(
                    "absolute inset-0 z-0",
                    "translate-y-[100%] group-hover:translate-y-0",
                    "rounded-[50%] group-hover:rounded-none",
                    "translate-y-[100%] group-hover:translate-y-0",
                    "rounded-[50%] group-hover:rounded-none",
                    "transition-all duration-500 ease-[cubic-bezier(0.4,0,0,1)]",
                    "bg-[#d92514]"
                )}
            />

            {/* Text container — clips the vertical slide */}
            <div className="relative z-10 overflow-hidden" style={{ height: '1.2em' }}>
                <div
                    className="flex flex-col items-center transition-transform duration-500 ease-[cubic-bezier(0.4,0,0,1)] group-hover:-translate-y-1/2"
                >
                    {/* Top text (default state — Red) */}
                    <span className="flex items-center gap-2 whitespace-nowrap leading-[1.2em] text-[#d92514]">
                        {isLoading && <span className="animate-spin">⟳</span>}
                        {!isLoading && icon}
                        {content}
                    </span>
                    {/* Bottom text (hover state — White) */}
                    <span className="flex items-center gap-2 whitespace-nowrap leading-[1.2em] text-white">
                        {isLoading && <span className="animate-spin">⟳</span>}
                        {!isLoading && icon}
                        {content}
                    </span>
                </div>
            </div>
        </button>
    );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };
