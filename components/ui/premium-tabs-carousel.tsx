'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, LucideIcon } from 'lucide-react';

interface CardData {
    title: string;
    description: string;
    icon: LucideIcon;
    features?: string[];
}

interface PremiumTabsCarouselProps {
    cards: CardData[];
}

// Unique gradient palettes per card
const CARD_GRADIENTS = [
    'linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 70%, #e94560 100%)',
    'linear-gradient(135deg, #2d1b4e 0%, #1a1a2e 40%, #0d1b2a 70%, #d92514 100%)',
    'linear-gradient(135deg, #0d1b2a 0%, #1b2838 40%, #2a4066 70%, #e07a5f 100%)',
    'linear-gradient(135deg, #1b1b2f 0%, #162447 40%, #1f4068 70%, #e43f5a 100%)',
    'linear-gradient(135deg, #0f0c29 0%, #302b63 40%, #24243e 70%, #d92514 100%)',
    'linear-gradient(135deg, #1a1a2e 0%, #0a3d62 40%, #3c6382 70%, #e55039 100%)',
    'linear-gradient(135deg, #2c003e 0%, #3d0066 40%, #240046 70%, #d92514 100%)',
    'linear-gradient(135deg, #1b1b2f 0%, #1e3a5f 40%, #374f6b 70%, #e94560 100%)',
    'linear-gradient(135deg, #0d1117 0%, #161b22 40%, #21262d 70%, #d92514 100%)',
];

import {
    VoiceWaveform,
    CalendarCheck,
    FilterFunnel,
    AutomationZap,
    DataSync,
    NightMode,
    DataStructure,
    ShieldLock,
    ChartGrowth,
    VoiceSpectrumWidget,
    TimeSlotsWidget,
    FunnelParticlesWidget,
    NetworkNodesWidget,
    DatabaseStreamWidget,
    SleepModeWidget,
    SortingDataWidget,
    SecurityScanWidget,
    GrowthGraphWidget
} from './CardAnimations';

// Map animations to card indices (0-8)
const CARD_ANIMATIONS = [
    VoiceWaveform,
    CalendarCheck,
    FilterFunnel,
    AutomationZap,
    DataSync,
    NightMode,
    DataStructure,
    ShieldLock,
    ChartGrowth
];

// Map middle widgets to card indices (0-8)
const CARD_WIDGETS = [
    VoiceSpectrumWidget,
    TimeSlotsWidget,
    FunnelParticlesWidget,
    NetworkNodesWidget,
    DatabaseStreamWidget,
    SleepModeWidget,
    SortingDataWidget,
    SecurityScanWidget,
    GrowthGraphWidget
];

const VISIBLE_STACK = 3;
const CARD_HEIGHT = 520;

const AUTO_PLAY_INTERVAL = 3000;

export const PremiumTabsCarousel: React.FC<PremiumTabsCarouselProps> = ({ cards }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Auto-play effect
    useEffect(() => {
        if (isPaused) return;
        intervalRef.current = setInterval(() => {
            setDirection(1);
            setActiveIndex((prev) => (prev + 1) % cards.length);
        }, AUTO_PLAY_INTERVAL);
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isPaused, cards.length]);

    // Reset auto-play timer when user manually navigates
    const resetAutoPlay = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        // The effect will re-create the interval via isPaused toggle
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 50);
    }, []);

    const handleNext = useCallback(() => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % cards.length);
        resetAutoPlay();
    }, [cards.length, resetAutoPlay]);

    const handlePrev = useCallback(() => {
        setDirection(-1);
        setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
        resetAutoPlay();
    }, [cards.length, resetAutoPlay]);

    const getStackOrder = () => {
        const indices: number[] = [];
        for (let i = 0; i < Math.min(VISIBLE_STACK, cards.length); i++) {
            indices.push((activeIndex + i) % cards.length);
        }
        return indices;
    };

    const stackIndices = getStackOrder();


    return (
        <div
            className="relative w-full"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Card Stack Container */}
            <div
                className="relative w-full max-w-4xl mx-auto"
                style={{
                    perspective: '1400px',
                    height: `${CARD_HEIGHT + (VISIBLE_STACK - 1) * 28}px`,
                }}
            >
                <AnimatePresence initial={false} mode="popLayout">
                    {/* Render back-to-front for correct stacking */}
                    {[...stackIndices].reverse().map((cardIndex) => {
                        const stackPosition = stackIndices.indexOf(cardIndex);
                        const card = cards[cardIndex];
                        const Icon = card.icon;
                        const AnimatedIcon = CARD_ANIMATIONS[cardIndex % CARD_ANIMATIONS.length];
                        const ActiveWidget = CARD_WIDGETS[cardIndex % CARD_WIDGETS.length];
                        const gradient = CARD_GRADIENTS[cardIndex % CARD_GRADIENTS.length];
                        const isFront = stackPosition === 0;

                        // Stack transforms
                        const scale = 1 - stackPosition * 0.04;
                        const translateY = stackPosition * 28;
                        const zIdx = VISIBLE_STACK - stackPosition;

                        return (
                            <motion.div
                                key={cardIndex}
                                initial={{
                                    scale: direction === 1 ? 0.88 : 1.02,
                                    y: direction === 1 ? 80 : -30,
                                    opacity: 0,
                                }}
                                animate={{
                                    scale,
                                    y: translateY,
                                    opacity: isFront ? 1 : 0.7 - stackPosition * 0.15,
                                }}
                                exit={{
                                    scale: direction === 1 ? 1.02 : 0.88,
                                    y: direction === 1 ? -40 : 80,
                                    opacity: 0,
                                }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 280,
                                    damping: 28,
                                    mass: 0.9,
                                }}
                                className="absolute top-0 left-0 right-0 rounded-[24px] overflow-hidden border border-white/10 bg-[#161616]"
                                style={{
                                    transformOrigin: 'top center',
                                    zIndex: zIdx,
                                    height: `${CARD_HEIGHT}px`,
                                    pointerEvents: isFront ? 'auto' : 'none',
                                }}
                            >

                                {/* Inner Content Container */}
                                <div
                                    className="absolute left-4 top-4 bottom-4 z-[5] w-[55%] md:w-[50%] bg-transparent p-7 md:p-8 flex flex-col justify-between overflow-hidden"
                                >
                                    {/* Title - Maximized */}
                                    <div className="flex-1 flex flex-col justify-start">
                                        <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-serif italic text-white leading-[0.9] tracking-tight mb-4">
                                            <span className="font-sans not-italic font-bold text-white/40 block text-lg mb-2">{cardIndex + 1}.</span>
                                            {card.title}
                                        </h3>
                                    </div>

                                    <div className="mt-auto">
                                        <p className="text-base md:text-lg text-white/60 leading-relaxed font-sans font-semibold">
                                            {card.description}
                                        </p>

                                        {card.features && card.features.length > 0 && (
                                            <div className="mt-5 pt-4 border-t border-white/10 space-y-2">
                                                {card.features.map((feature, i) => (
                                                    <div key={i} className="flex items-start gap-2">
                                                        <div className="w-1 h-1 rounded-full bg-[#d92514] mt-1.5 flex-shrink-0 opacity-60" />
                                                        <span className="text-sm md:text-base text-white/50 font-sans font-medium leading-relaxed">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Icon - Static */}
                                <div className="absolute right-6 md:right-8 top-6 md:top-8 z-[5]">
                                    <div className="w-16 h-16 p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center">
                                        <Icon className="w-full h-full text-white/80" />
                                    </div>
                                </div>

                                {/* Watermark number */}
                                <div className="absolute right-6 md:right-8 bottom-6 md:bottom-8 z-[5]">
                                    <span className="text-[80px] md:text-[100px] font-serif italic font-light leading-none text-white/[0.04] select-none">
                                        0{cardIndex + 1}
                                    </span>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center justify-center gap-3 mt-8">
                <button
                    onClick={handlePrev}
                    className="group/btn flex items-center justify-center w-14 h-14 rounded-xl bg-white hover:bg-black/5 border border-black/10 transition-all duration-200 active:scale-95 shadow-sm"
                    aria-label="Previous card"
                >
                    <ChevronLeft className="w-5 h-5 text-black/70 group-hover/btn:text-black transition-colors" />
                </button>

                <div className="flex items-center gap-2 px-4">
                    <span className="font-sans text-sm font-bold text-black tabular-nums">
                        {String(activeIndex + 1).padStart(2, '0')}
                    </span>
                    <span className="text-black/20 font-sans text-sm">/</span>
                    <span className="font-sans text-sm text-black/40 tabular-nums">
                        {String(cards.length).padStart(2, '0')}
                    </span>
                </div>

                <button
                    onClick={handleNext}
                    className="group/btn flex items-center justify-center w-14 h-14 rounded-xl bg-black hover:bg-black/90 border border-black transition-all duration-200 active:scale-95 shadow-md"
                    aria-label="Next card"
                >
                    <ChevronRight className="w-5 h-5 text-white" />
                </button>
            </div>
        </div>
    );
};
