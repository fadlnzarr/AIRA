'use client';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

/* ── Types ─────────────────────────────────────────────── */
interface CardData {
    title: string;
    description: string;
    icon: LucideIcon;
    features?: string[];
}

interface ScrollStackCardsProps {
    cards: CardData[];
}

/* ── Individual Card ───────────────────────────────────── */
function Card({
    i,
    card,
    progress,
    range,
    targetScale,
}: {
    i: number;
    card: CardData;
    progress: MotionValue<number>;
    range: [number, number];
    targetScale: number;
}) {
    const Icon = card.icon;

    // Scale: card starts at 1 and shrinks as later cards arrive
    const scale = useTransform(progress, [range[0], 1], [1, targetScale]);

    return (
        <div
            style={{
                position: 'sticky',
                top: 0,
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: `${i * 20}px`, // slight vertical stagger for stacking feel
            }}
        >
            <motion.div
                style={{
                    scale,
                    transformOrigin: 'top center',
                }}
                className="w-full max-w-5xl h-[500px] md:h-[550px] rounded-[24px] border border-white/10 bg-[#161616] overflow-hidden relative"
            >
                {/* Left content area */}
                <div className="absolute left-4 top-4 bottom-4 z-[5] w-[55%] md:w-[60%] p-6 md:p-10 flex flex-col justify-between">
                    {/* Title */}
                    <div className="flex-1 flex flex-col justify-start">
                        <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-serif italic text-white leading-[0.9] tracking-tight mb-4">
                            <span className="font-sans not-italic font-bold text-white/40 block text-lg mb-2">
                                {String(i + 1).padStart(2, '0')}.
                            </span>
                            {card.title}
                        </h3>
                    </div>

                    {/* Description + features */}
                    <div className="mt-auto">
                        <p className="text-lg md:text-xl text-white/60 leading-relaxed font-sans font-semibold max-w-lg">
                            {card.description}
                        </p>

                        {card.features && card.features.length > 0 && (
                            <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                                {card.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#d92514] mt-2 flex-shrink-0 opacity-80" />
                                        <span className="text-base text-white/50 font-sans font-medium leading-relaxed">
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Icon */}
                <div className="absolute right-6 md:right-10 top-6 md:top-10 z-[5]">
                    <div className="w-20 h-20 p-5 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center">
                        <Icon className="w-full h-full text-white/80" />
                    </div>
                </div>

                {/* Watermark number */}
                <div className="absolute right-6 md:right-10 bottom-6 md:bottom-10 z-[1]">
                    <span className="text-[120px] md:text-[180px] font-serif italic font-light leading-none text-white/[0.03] select-none">
                        {String(i + 1).padStart(2, '0')}
                    </span>
                </div>
            </motion.div>
        </div>
    );
}

/* ── Main Component ────────────────────────────────────── */
export const ScrollStackCards: React.FC<ScrollStackCardsProps> = ({ cards }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    return (
        <div ref={containerRef} className="relative">
            {cards.map((card, i) => {
                const targetScale = 1 - (cards.length - i) * 0.03;
                const start = i / cards.length;

                return (
                    <Card
                        key={i}
                        i={i}
                        card={card}
                        progress={scrollYProgress}
                        range={[start, 1]}
                        targetScale={targetScale}
                    />
                );
            })}
        </div>
    );
};
