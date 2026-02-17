'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    features?: string[];
    index: number;
}

// Unique gradient palettes per card for visual variety
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

export const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon: Icon, features, index }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Mouse tracking for the gradient spotlight effect
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    // Transform mouse position into a radial gradient position
    const spotlightX = useTransform(mouseX, [0, 1], ['0%', '100%']);
    const spotlightY = useTransform(mouseY, [0, 1], ['0%', '100%']);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width);
        mouseY.set((e.clientY - rect.top) / rect.height);
    };

    const gradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length];

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="group relative rounded-[20px] overflow-hidden cursor-pointer"
            style={{
                background: gradient,
                minHeight: '420px',
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Noise texture overlay for premium feel */}
            <div
                className="absolute inset-0 opacity-[0.08] pointer-events-none z-[1]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
                    backgroundSize: '128px 128px',
                }}
            />

            {/* Interactive spotlight gradient overlay */}
            <motion.div
                className="absolute inset-0 z-[2] pointer-events-none transition-opacity duration-500"
                style={{
                    background: useTransform(
                        [spotlightX, spotlightY],
                        ([x, y]) => `radial-gradient(600px circle at ${x} ${y}, rgba(255,255,255,0.08) 0%, transparent 60%)`
                    ),
                    opacity: isHovered ? 1 : 0,
                }}
            />

            {/* Subtle shimmer line at top */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-[3]" />

            {/* Inner White Content Card - Overlaid on the left */}
            <motion.div
                className="absolute left-4 top-4 bottom-4 z-[5] w-[55%] md:w-[48%] bg-[#f7f7f7] rounded-[14px] p-6 md:p-7 flex flex-col justify-between overflow-hidden"
                style={{
                    boxShadow: '0px 1.3px 0.7px -0.6px rgba(0,0,0,0.06), 0px 3.2px 1.6px -1.3px rgba(0,0,0,0.06), 0px 5.8px 2.9px -1.9px rgba(0,0,0,0.06), 0px 9.7px 4.8px -2.5px rgba(0,0,0,0.05), 0px 15.6px 7.8px -3.1px rgba(0,0,0,0.05), 0px 25.5px 12.8px -3.8px rgba(0,0,0,0.04)',
                }}
                animate={{
                    y: isHovered ? -2 : 0,
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
            >
                {/* Title Section */}
                <div>
                    <h3 className="text-xl md:text-2xl font-serif italic text-white leading-tight mb-1">
                        <span className="font-sans not-italic font-bold">{index + 1}.</span>{' '}{title}
                    </h3>
                </div>

                {/* Description & Features */}
                <div className="mt-auto">
                    <p className="text-xs md:text-sm text-white/60 leading-relaxed font-sans">
                        {description}
                    </p>

                    {features && features.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-black/8 space-y-1.5">
                            {features.map((feature, i) => (
                                <div key={i} className="flex items-start gap-2">
                                    <div className="w-1 h-1 rounded-full bg-[#d92514] mt-1.5 flex-shrink-0 opacity-60" />
                                    <span className="text-[11px] text-white/45 font-sans leading-relaxed">{feature}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Right side: Icon floating on the gradient background */}
            <div className="absolute right-6 md:right-8 top-6 md:top-8 z-[5]">
                <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 group-hover:bg-white/15 group-hover:border-white/20 transition-all duration-300">
                    <Icon className="w-6 h-6 text-white/80 group-hover:text-white transition-colors" />
                </div>
            </div>

            {/* Bottom-right card number for visual depth */}
            <div className="absolute right-6 md:right-8 bottom-6 md:bottom-8 z-[5]">
                <span className="text-[80px] md:text-[100px] font-serif italic font-light leading-none text-white/[0.04] group-hover:text-white/[0.08] transition-colors duration-500 select-none">
                    0{index + 1}
                </span>
            </div>
        </motion.div>
    );
};
