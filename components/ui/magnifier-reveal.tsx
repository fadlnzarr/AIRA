'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface MagnifierRevealProps {
    children: React.ReactNode;
    /** Duration of the reveal animation in seconds */
    duration?: number;
    /** Delay before the reveal starts in seconds */
    delay?: number;
}

/**
 * MagnifierReveal — A circular lens opening effect inspired by the Framer Magnifier+.
 * Wraps site content and reveals it through an expanding circular clip-path
 * with a subtle scale + blur effect for a dramatic site-opening feel.
 */
export const MagnifierReveal: React.FC<MagnifierRevealProps> = ({
    children,
    duration = 1.4,
    delay = 0.1,
}) => {
    const [phase, setPhase] = useState<'hidden' | 'revealing' | 'done'>('hidden');

    useEffect(() => {
        // Start reveal after delay
        const startTimer = setTimeout(() => {
            setPhase('revealing');
        }, delay * 1000);

        // Mark done after reveal completes
        const doneTimer = setTimeout(() => {
            setPhase('done');
        }, (delay + duration + 0.2) * 1000);

        return () => {
            clearTimeout(startTimer);
            clearTimeout(doneTimer);
        };
    }, [delay, duration]);

    if (phase === 'done') {
        // No wrapper overhead once animation is complete
        return <>{children}</>;
    }

    return (
        <motion.div
            style={{
                width: '100%',
                minHeight: '100vh',
                position: 'relative',
                overflow: 'hidden',
            }}
            initial={{
                clipPath: 'circle(0% at 50% 50%)',
                scale: 1.15,
                filter: 'blur(8px) brightness(1.3)',
            }}
            animate={
                phase === 'revealing'
                    ? {
                        clipPath: 'circle(150% at 50% 50%)',
                        scale: 1,
                        filter: 'blur(0px) brightness(1)',
                    }
                    : undefined
            }
            transition={{
                clipPath: {
                    duration: duration,
                    ease: [0.16, 1, 0.3, 1], // easeOutExpo
                },
                scale: {
                    duration: duration * 0.9,
                    ease: [0.16, 1, 0.3, 1],
                },
                filter: {
                    duration: duration * 0.6,
                    ease: 'easeOut',
                },
            }}
        >
            {children}
        </motion.div>
    );
};
