
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface GlassMetricCardProps {
    label: string;
    value: string;
    change?: string;
    trend?: 'up' | 'down' | 'neutral';
    icon?: React.ReactNode;
    delay?: number;
    featured?: boolean;
}

export const GlassMetricCard: React.FC<GlassMetricCardProps> = ({
    label,
    value,
    change,
    trend = 'neutral',
    icon,
    delay = 0,
    featured = false
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className={`relative group p-6 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-lg hover:shadow-black/5 ${featured ? 'bg-white/40 border-white/60' : 'bg-white/30 border-white/40'}`}
        >
            {/* Glossy Backdrop */}
            <div className="absolute inset-0 backdrop-blur-md z-0" />

            {/* Soft Metallic Border */}
            <div className={`absolute inset-0 rounded-3xl border border-white/40 z-10`} />

            {/* Inner Content */}
            <div className="relative z-20 flex flex-col justify-between h-full space-y-4">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                        {icon && (
                            <div className="p-2 rounded-xl bg-[#1A1A1A]/5 border border-[#1A1A1A]/5 text-[#1A1A1A]/70">
                                {icon}
                            </div>
                        )}
                        <span className="text-[#1A1A1A]/50 text-xs font-medium tracking-wider uppercase">
                            {label}
                        </span>
                    </div>
                </div>

                <div className="flex items-end justify-between">
                    <div className="space-y-1">
                        <h3 className={`text-[#1A1A1A] font-light tracking-tight ${featured ? 'text-4xl' : 'text-3xl'}`}>
                            {value}
                        </h3>
                    </div>

                    {change && (
                        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border backdrop-blur-md text-xs font-medium ${trend === 'up' ? 'bg-green-500/10 border-green-500/20 text-green-700' :
                                trend === 'down' ? 'bg-red-500/10 border-red-500/20 text-red-700' :
                                    'bg-black/5 border-black/10 text-black/60'
                            }`}>
                            {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> :
                                trend === 'down' ? <ArrowDownRight className="w-3 h-3" /> :
                                    <Minus className="w-3 h-3" />}
                            {change}
                        </div>
                    )}
                </div>
            </div>

            {/* Hover Shine (Subtle white overlay) */}
            <div className="absolute inset-0 z-10 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        </motion.div>
    );
};
