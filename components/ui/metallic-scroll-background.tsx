import React, { useRef, useEffect, useCallback } from 'react';

/**
 * MetallicScrollBackground — Ultra-premium metallic silver → black scroll transition.
 *
 * PERFORMANCE-FIRST approach:
 * - NO framer-motion layers (avoids React re-renders on scroll).
 * - Single requestAnimationFrame scroll listener sets a CSS custom property.
 * - All transitions driven by CSS custom properties → GPU-composited opacity changes.
 * - will-change + transform: translateZ(0) for compositor promotion.
 */

interface MetallicScrollBackgroundProps {
    children: React.ReactNode;
    triggerElementId?: string;
}

export const MetallicScrollBackground: React.FC<MetallicScrollBackgroundProps> = ({ children, triggerElementId }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number>(0);
    const lightRef = useRef<HTMLDivElement>(null);

    // Lightweight scroll handler — updates CSS custom property, no React state
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let ticking = false;
        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            rafRef.current = requestAnimationFrame(() => {
                let progress = 0;

                if (triggerElementId) {
                    const triggerEl = document.getElementById(triggerElementId);
                    if (triggerEl) {
                        const triggerRect = triggerEl.getBoundingClientRect();
                        const windowHeight = window.innerHeight;
                        // Transition starts when element is 10% into the viewport (0.9 threshold)
                        // This prevents premature fade while viewing the previous section
                        // Ends when element reaches top of viewport
                        progress = Math.max(0, Math.min(1, 0.9 - (triggerRect.top / windowHeight)));
                    }
                } else {
                    // Fallback to container-based progress
                    const rect = container.getBoundingClientRect();
                    const containerTop = -rect.top;
                    const containerHeight = container.offsetHeight - window.innerHeight;
                    progress = Math.max(0, Math.min(1, containerTop / containerHeight));
                }

                // Set progress as CSS custom property — drives ALL transitions via CSS
                container.style.setProperty('--scroll-progress', String(progress));
                ticking = false;
            });
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll(); // initial
        return () => {
            window.removeEventListener('scroll', onScroll);
            cancelAnimationFrame(rafRef.current);
        };
    }, []);

    // Cursor-reactive light — mutates DOM directly, no React state
    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        const light = lightRef.current;
        const container = containerRef.current;
        if (!light || !container) return;

        const rect = container.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        light.style.setProperty('--light-x', `${x}%`);
        light.style.setProperty('--light-y', `${y}%`);
    }, []);

    return (
        <div
            ref={containerRef}
            className="metallic-scroll-container relative"
            onMouseMove={handleMouseMove}
            style={{
                // Initial value
                // @ts-ignore
                '--scroll-progress': '0',
            } as React.CSSProperties}
        >
            {/* Inline styles for the scroll-driven system — lives in the component */}
            <style>{`
                .metallic-scroll-container {
                    --scroll-progress: 0;
                    --light-x: 30%;
                    --light-y: 20%;
                }

                /* === TEXT COLOR TRANSITIONS === */
                .metallic-scroll-container {
                    /* Optimization: Simplified color-mix to reduce recalc cost */
                    --metallic-text: color-mix(in srgb, #1A1A1A calc((1 - var(--scroll-progress) * 1.6) * 100%), #F5F5F5);
                    --metallic-muted: color-mix(in srgb, rgba(26,26,26,0.55) calc((1 - var(--scroll-progress) * 1.6) * 100%), rgba(245,245,245,0.5));
                    --metallic-border: color-mix(in srgb, rgba(26,26,26,0.15) calc((1 - var(--scroll-progress) * 1.6) * 100%), rgba(255,255,255,0.1));
                }

                /* === LAYER 1: Silver Composite (Base + Specular) === */
                .metallic-silver-composite {
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                    /* Combined backgrounds to reduce layer count */
                    background:
                        radial-gradient(circle at 30% 20%, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.35) 20%, transparent 45%),
                        linear-gradient(120deg, #f5f5f5 0%, #dcdcdc 15%, #bfbfbf 30%, #f2f2f2 45%, #a6a6a6 60%, #d9d9d9 75%, #8f8f8f 100%);
                    opacity: calc(1 - var(--scroll-progress) * 1.6); /* Averaged opacity curve */
                    will-change: opacity;
                    transform: translateZ(0); /* Force GPU */
                }

                /* === LAYER 2: Cursor-Reactive Light === */
                .metallic-cursor-light {
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                    background: radial-gradient(
                        ellipse 35% 25% at var(--light-x) var(--light-y),
                        rgba(255,255,255,0.35) 0%,
                        rgba(255,255,255,0.1) 35%,
                        transparent 60%
                    );
                    opacity: calc((1 - var(--scroll-progress) * 2) * 0.6);
                    will-change: opacity, background-position;
                    transform: translateZ(0);
                    transition: --light-x 0.1s linear, --light-y 0.1s linear; /* Faster transition for smoother feel */
                }

                /* === LAYER 3: Black Composite (Overlay + Matte Depth) === */
                .metallic-black-composite {
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                    /* Combined backgrounds */
                    background:
                        linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.6) 70%, #000000 100%),
                        radial-gradient(circle at 70% 30%, rgba(255,255,255,0.05), transparent 40%),
                        linear-gradient(160deg, #1a1a1a 0%, #0e0e0e 50%, #000000 100%);
                    background-blend-mode: overlay, normal, normal;
                    opacity: calc(var(--scroll-progress) * 1.4);
                    will-change: opacity;
                    transform: translateZ(0);
                }
            `}</style>

            {/* Optimized Layers: Reduced from 5 to 3 */}
            <div className="metallic-silver-composite" />
            <div className="metallic-cursor-light" ref={lightRef} />
            <div className="metallic-black-composite" />

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};
