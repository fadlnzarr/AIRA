'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogoIcon } from '../Navbar'; // Importing existing LogoIcon
import { cn } from '@/lib/utils';

interface FramerPreloaderProps {
    onLoadingComplete?: () => void;
}

export const FramerPreloader: React.FC<FramerPreloaderProps> = ({ onLoadingComplete }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time
        const timer = setTimeout(() => {
            setIsLoading(false);
            if (onLoadingComplete) {
                setTimeout(onLoadingComplete, 1000); // Wait for exit animation
            }
        }, 2500); // 2.5 seconds total load time matching the Framer delay

        return () => clearTimeout(timer);
    }, [onLoadingComplete]);

    // Animation Variants matches the "Framer" feel
    // Entrance: Spring/Ease coming from bottom
    // Exit: Blur and fade

    const containerVariants = {
        initial: {},
        animate: {
            transition: {
                staggerChildren: 0.1,
            }
        },
        exit: {
            opacity: 0,
            filter: "blur(10px)",
            transition: { duration: 0.8, ease: "easeInOut" }
        }
    };

    const itemVariants = {
        initial: { y: 400, opacity: 0, scale: 0.8 },
        animate: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 50,
                damping: 20,
                mass: 1
            }
        },
        exit: {
            y: -100,
            opacity: 0,
            transition: { duration: 0.5 }
        }
    };

    // Rotations for the scattered "photos" look
    const rotations = [-10, -5, 5, 10, 0];

    // Positions (approximate percentage-based to be responsive)
    const positions = [
        { top: '20%', left: '20%' },  // Top Left
        { top: '60%', left: '15%' },  // Bottom Left
        { top: '50%', left: '50%' },  // Center (Main)
        { top: '15%', left: '70%' },  // Top Right
        { top: '65%', left: '75%' },  // Bottom Right
    ];

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-black overflow-hidden"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={containerVariants}
                >
                    {/* Scattered Logos (Replacing Photos) */}
                    {positions.map((pos, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-32 h-48 md:w-48 md:h-64 bg-[#F5F5F7] rounded-xl shadow-2xl border border-black/5 flex items-center justify-center overflow-hidden"
                            style={{
                                top: pos.top,
                                left: pos.left,
                                transform: 'translate(-50%, -50%)', // Centering based on pos
                                rotate: rotations[i],
                                zIndex: i === 2 ? 10 : 1 // Center item on top
                            }}
                            variants={itemVariants}
                            custom={i}
                        >
                            {/* Inner content of the "Card" */}
                            <div className="relative w-full h-full p-4 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
                                <LogoIcon className="w-16 h-16 md:w-24 md:h-24 text-[#d92514] opacity-90" />
                                {i === 2 && (
                                    <div className="absolute bottom-4 text-center">
                                        <span className="text-white/50 text-xs font-sans uppercase tracking-widest">AIRA</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}

                    {/* Main Text Reveal (Overlapping or below center) */}
                    <motion.div
                        className="absolute z-20 pointer-events-none mix-blend-difference text-white"
                        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                        variants={{
                            initial: { opacity: 0, scale: 1.5, filter: "blur(10px)" },
                            animate: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { delay: 0.5, duration: 1 } },
                            exit: { opacity: 0, scale: 2, filter: "blur(20px)" }
                        }}
                    >
                        {/* Optional: Large Text overlay if needed, but the cards might be enough. 
                             The Framer example had "Pre Studio". Let's add "AIRA" large.
                         */}
                        <h1 className="text-6xl md:text-9xl font-serif italic font-bold tracking-tighter text-white opacity-0">
                            AIRA
                        </h1>
                    </motion.div>

                </motion.div>
            )}
        </AnimatePresence>
    );
};
