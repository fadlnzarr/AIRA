import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  isLoading?: boolean;
}

/**
 * Fluid Button Implementation
 * Replaces previous Framer Motion button with the new vertical-slide + rising overlay effect.
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  icon,
  isLoading,
  disabled,
  ...props
}) => {
  // Styles for different variants
  // Styles for different variants (Matre Theme: Red + Black)
  const variants = {
    primary: "bg-[#d92514] text-white border-transparent hover:bg-black",
    secondary: "border-white/30 text-white hover:border-white",
    outline: "border-[#d92514] text-[#d92514] hover:bg-[#d92514] hover:text-white",
    ghost: "border-transparent text-[#d92514] hover:bg-[#d92514]/10"
  };

  // Styles for different sizes (Padding affecting ONLY the button container)
  const sizes = {
    sm: "px-6 py-2.5 text-xs",
    md: "px-8 py-3.5 text-sm",
    lg: "px-10 py-5 text-base"
  };

  const isGhost = variant === 'ghost';

  // Ghost buttons might skip the overlay effect if desired, but for consistency we apply it.
  // For ghost, we might want a subtle background instead of full white.
  // Overlay is used for the "rising ink" effect.
  // For Primary (Red), overlay is Black.
  // For Outline (Red Text), overlay is Red.
  const overlayColor = variant === 'primary' ? 'bg-black' : (variant === 'outline' ? 'bg-[#d92514]' : 'bg-black/5');

  // Text color on hover:
  // Primary: White (on Black overlay)
  // Outline: White (on Red overlay)
  const textColorHover = 'text-white';

  return (
    <button
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-full font-sans font-bold uppercase tracking-tight transition-all duration-500 ease-[cubic-bezier(0.4,0,0,1)]",
        "border", // All buttons have border capability
        variants[variant],
        sizes[size],
        className,
        (disabled || isLoading) && "opacity-50 cursor-not-allowed pointer-events-none"
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Overlay — rises from bottom */}
      {!isGhost && (
        <div
          className={cn(
            "absolute inset-0 z-0",
            "translate-y-[100%] group-hover:translate-y-0",
            "rounded-[50%] group-hover:rounded-none",
            "transition-all duration-500 ease-[cubic-bezier(0.4,0,0,1)]",
            overlayColor
          )}
        />
      )}

      {/* Content Container — clips the vertical slide */}
      <div className="relative z-10 overflow-hidden" style={{ height: '1.2em' }}>
        <div
          className="flex flex-col items-center transition-transform duration-500 ease-[cubic-bezier(0.4,0,0,1)] group-hover:-translate-y-1/2"
        >
          {/* Top Content (Default State) */}
          <span className="flex items-center gap-2 whitespace-nowrap leading-[1.2em]">
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : icon}
            {children}
          </span>

          {/* Bottom Content (Hover State) */}
          <span className={cn(
            "flex items-center gap-2 whitespace-nowrap leading-[1.2em]",
            textColorHover
          )}>
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : icon}
            {children}
          </span>
        </div>
      </div>
    </button>
  );
};