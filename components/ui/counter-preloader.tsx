'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useSpring, useTransform, animate } from 'framer-motion';
import { LogoIcon } from '../Navbar';
import { cn } from '@/lib/utils';

interface CounterPreloaderProps {
    onLoadingComplete?: () => void;
}

export const CounterPreloader: React.FC<CounterPreloaderProps> = ({ onLoadingComplete }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [count, setCount] = useState(0);

    useEffect(() => {
        // Counter Animation
        const controls = animate(0, 100, {
            duration: 2.5,
            ease: "easeInOut",
            onUpdate: (value) => setCount(Math.floor(value)),
            onComplete: () => {
                setCount(100);
                // Short pause at 100
                setTimeout(() => {
                    setIsLoading(false);
                    if (onLoadingComplete) {
                        setTimeout(onLoadingComplete, 800); // Wait for exit animation
                    }
                }, 500);
            }
        });

        return () => controls.stop();
    }, [onLoadingComplete]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black overflow-hidden cursor-none"
                    initial={{ opacity: 1 }}
                    exit={{
                        y: "-100%", // Slide up reveal
                        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
                    }}
                >
                    {/* Vertical Fill Animation (Off-White filling up) */}
                    <motion.div
                        className="absolute bottom-0 left-0 w-full bg-[#f5f5f7] z-0"
                        initial={{ height: "0%" }}
                        animate={{ height: `${count}%` }}
                        transition={{ duration: 0.1, ease: "linear" }}
                    />

                    {/* Bottom Left: Logo & Text */}
                    <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 flex items-center gap-4 z-10 mix-blend-difference">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            {/* Logo set to white so it inverts to black on the white fill */}
                            <LogoIcon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                        </motion.div>

                        <div className="bg-white w-px h-8 hidden md:block" />

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            <span className="text-white font-serif italic text-xl md:text-2xl font-bold tracking-tight">
                                AIRA
                            </span>
                        </motion.div>
                    </div>

                    {/* Bottom Right: Huge Counter */}
                    <div className="absolute bottom-4 right-8 md:bottom-2 md:right-12 z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex items-baseline"
                        >
                            <span className="text-[80px] md:text-[160px] font-serif italic font-bold tracking-tighter text-[#d92514] leading-none tabular-nums">
                                {count}
                            </span>
                        </motion.div>
                    </div>

                </motion.div>
            )}
        </AnimatePresence>
    );
};
