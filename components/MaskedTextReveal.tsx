import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface MaskedTextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'left' | 'right' | 'top' | 'bottom';
  ease?: string;
}

export const MaskedTextReveal: React.FC<MaskedTextRevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 1.2,
  direction = 'left',
  ease = 'power3.out'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !maskRef.current) return;

    // Calculate initial and final clip-path values based on direction
    const getInitialClipPath = () => {
      switch (direction) {
        case 'left':
          return 'inset(0 100% 0 0)';
        case 'right':
          return 'inset(0 0 0 100%)';
        case 'top':
          return 'inset(100% 0 0 0)';
        case 'bottom':
          return 'inset(0 0 100% 0)';
        default:
          return 'inset(0 100% 0 0)';
      }
    };

    const initialClipPath = getInitialClipPath();
    const finalClipPath = 'inset(0 0 0 0)';

    // Set initial state
    gsap.set(maskRef.current, {
      clipPath: initialClipPath,
      opacity: 1
    });

    // Animate the reveal
    gsap.to(maskRef.current, {
      clipPath: finalClipPath,
      duration: duration,
      delay: delay,
      ease: ease
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      <div
        ref={maskRef}
        className="relative"
      >
        {children}
      </div>
    </div>
  );
};
