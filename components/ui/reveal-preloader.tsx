'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { AudioWaveform } from 'lucide-react'; // Using icon as part of logo initially

interface RevealPreloaderProps {
    onLoadingComplete?: () => void;
}

export const RevealPreloader: React.FC<RevealPreloaderProps> = ({ onLoadingComplete }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time or wait for resources
        const timer = setTimeout(() => {
            setIsLoading(false);
            if (onLoadingComplete) {
                setTimeout(onLoadingComplete, 1000); // Wait for exit animation
            }
        }, 2000); // 2 seconds minimum load

        return () => clearTimeout(timer);
    }, [onLoadingComplete]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    style={{
                        background: 'linear-gradient(180deg, #160A2B 0%, #0B0713 100%)'
                    }}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
                >
                    <div className="relative flex flex-col items-center justify-center overflow-hidden">
                        {/* Background Blur Effect from Framer */}
                        <motion.div
                            className="absolute inset-0 bg-violet-500/10 blur-3xl rounded-full opacity-20"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1.5, opacity: 0.2 }}
                            transition={{ duration: 2, ease: "easeOut" }}
                        />

                        {/* Main Container */}
                        <div className="relative z-10 flex items-center gap-4 px-8 py-4 overflow-hidden">
                            {/* Logo Icon Reveal */}
                            <motion.div
                                initial={{ y: 100, opacity: 0, filter: "blur(10px)" }}
                                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="flex items-center justify-center"
                            >
                                {/* AIRA Logo Icon - Custom SVG (No Background) */}
                                <div className="w-12 h-12 flex items-center justify-center">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-full h-full text-white"
                                    >
                                        {/* Central Pillar - Bright White */}
                                        <rect x="10.5" y="3" width="3" height="18" rx="1.5" fill="currentColor" />
                                        {/* Mid Pillars - Slightly Transparent */}
                                        <rect x="5.5" y="8" width="3" height="8" rx="1.5" fill="currentColor" fillOpacity="0.7" />
                                        <rect x="15.5" y="8" width="3" height="8" rx="1.5" fill="currentColor" fillOpacity="0.7" />
                                        {/* Outer Pillars - Faded */}
                                        <rect x="0.5" y="11" width="3" height="2" rx="1" fill="currentColor" fillOpacity="0.4" />
                                        <rect x="20.5" y="11" width="3" height="2" rx="1" fill="currentColor" fillOpacity="0.4" />
                                    </svg>
                                </div>
                            </motion.div>

                            {/* Divider Line */}
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 40, opacity: 0.5 }}
                                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                                className="w-[1px] bg-white"
                            />

                            {/* Text Reveal Logic */}
                            <div className="flex flex-col items-start justify-center h-12 overflow-hidden">
                                <motion.div
                                    initial={{ y: "100%" }}
                                    animate={{ y: "0%" }}
                                    transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <span className="text-4xl font-serif italic font-bold text-white tracking-tight">
                                        AIRA
                                    </span>
                                </motion.div>
                            </div>
                        </div>

                        {/* Loading Bar at Bottom */}
                        <motion.div
                            className="absolute bottom-[-40px] left-0 right-0 h-[2px] bg-white/20 w-48 mx-auto overflow-hidden rounded-full"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        >
                            <motion.div
                                className="h-full bg-white shadow-[0_0_10px_white]"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                            />
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
