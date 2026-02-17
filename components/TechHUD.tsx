'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const TechHUD: React.FC = () => {
    const [time, setTime] = useState(new Date());
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
    const [fps, setFps] = useState(60);

    useEffect(() => {
        // Time Update
        const timer = setInterval(() => setTime(new Date()), 1000);

        // Window Resize
        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        // FPS Simulation (Simple ping-pong for effect)
        const fpsTimer = setInterval(() => {
            setFps(Math.floor(58 + Math.random() * 4));
        }, 500);

        return () => {
            clearInterval(timer);
            window.removeEventListener('resize', handleResize);
            clearInterval(fpsTimer);
        };
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour12: true,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }).toLowerCase();
    };

    return (
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden font-mono text-[10px] md:text-xs text-black/40 select-none">

            {/* Top Left - Brand Meta */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute top-8 left-8 flex flex-col gap-1"
            >
                <span className="text-black font-bold tracking-widest">AIRA SYSTEM v2.0</span>
                <span className="text-black/30">NEURAL INTERFACE: ACTIVE</span>
            </motion.div>

            {/* Top Right - Coordinates */}


            {/* Bottom Left - Detailed Stats */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute bottom-8 left-8 flex flex-col gap-4"
            >
                {/* Time Block */}
                <div>
                    <div className="text-4xl md:text-6xl font-bold tracking-tighter mb-2 font-sans flex items-baseline">
                        <span
                            className="text-transparent"
                            style={{ WebkitTextStroke: '1px #d92514' }}
                        >
                            {formatTime(time).split(' ')[0]}
                        </span>
                        <span className="text-sm md:text-lg ml-2 font-mono text-black/40 align-top">
                            {formatTime(time).split(' ')[1]}
                        </span>
                    </div>
                    <div className="h-px w-32 bg-black/10 mb-2" />
                    <div className="flex flex-col gap-0.5">
                        <span>LOCAL TIME (UTC-8:00)</span>
                        <span className="text-black">AI VOICE AUTOMATION</span>
                    </div>
                </div>

                {/* System Status Block */}
                <div className="flex gap-8 mt-4">
                    <div>
                        <span className="block text-black/30 mb-1">INTERACTION</span>
                        <span className="text-black">ENABLED</span>
                    </div>
                    <div>
                        <span className="block text-black/30 mb-1">PERFORMANCE</span>
                        <span className="text-black flex items-center gap-2">
                            {windowSize.width} x {windowSize.height}
                            <span className="text-black/30">→ {fps} FPS</span>
                        </span>
                    </div>
                </div>
            </motion.div>

            {/* Decorative Corner Lines */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-black/10" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-black/10" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-black/10" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-black/10" />

        </div>
    );
};
