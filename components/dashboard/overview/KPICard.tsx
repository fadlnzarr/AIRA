
import React, { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface KPICardProps {
    label: string;
    value: string;
    change?: string;
    trend?: 'up' | 'down' | 'neutral';
    delay?: number;
}

export const KPICard: React.FC<KPICardProps> = ({
    label,
    value,
    change,
    trend = 'neutral',
    delay = 0
}) => {
    // Parse numeric value for animation (strips non-numeric characters)
    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
    const isPercentage = value.includes('%');

    // Spring animation for counting up
    const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
    const displayValue = useTransform(spring, (current) => {
        if (isNaN(numericValue)) return value; // Fallback for non-numeric
        const formatted = current.toLocaleString(undefined, { maximumFractionDigits: isPercentage ? 1 : 0 });
        return isPercentage ? `${formatted}%` : formatted;
    });

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!isNaN(numericValue)) {
                spring.set(numericValue);
            }
        }, delay * 1000 + 200); // Slight delay start
        return () => clearTimeout(timeout);
    }, [numericValue, delay, spring]);


    return (
        <div className="relative group p-6 rounded-2xl h-32 overflow-hidden transition-all duration-500">
            {/* Background & Glass Effect */}
            <div className="absolute inset-0 bg-[#0A0A0A]/80 backdrop-blur-md border border-white/5 rounded-2xl z-0 transition-colors duration-500 group-hover:border-white/10 group-hover:bg-[#0A0A0A]/60" />

            {/* Inner top highlight border */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-10" />

            {/* Content */}
            <div className="relative z-20 flex flex-col justify-between h-full">
                <div className="flex justify-between items-start">
                    <span className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-medium">
                        {label}
                    </span>

                    {change && (
                        <div className={`flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full border ${trend === 'up'
                            ? 'text-green-400 border-green-400/20 bg-green-400/5'
                            : trend === 'down'
                                ? 'text-red-400 border-red-400/20 bg-red-400/5'
                                : 'text-white/40 border-white/10 bg-white/5'
                            }`}>
                            {trend === 'up' && <ArrowUpRight className="w-3 h-3" />}
                            {trend === 'down' && <ArrowDownRight className="w-3 h-3" />}
                            {trend === 'neutral' && <Minus className="w-3 h-3" />}
                            <span>{change}</span>
                        </div>
                    )}
                </div>

                <div className="flex items-baseline gap-1">
                    <motion.span className="text-3xl font-light text-white font-sans tracking-tight">
                        {isNaN(numericValue) ? value : displayValue}
                    </motion.span>
                </div>
            </div>

            {/* Hover Glow Effect */}
            <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-0 group-hover:animate-shine" />
            <div className="absolute -bottom-px inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/0 to-transparent transition-all duration-500 group-hover:via-blue-500/50" />
        </div>
    );
};
