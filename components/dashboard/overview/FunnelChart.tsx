
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import type { FunnelData } from '../../../src/lib/googleSheets';

interface FunnelStepProps {
    label: string;
    count: number;
    dropoff?: string;
    isLast?: boolean;
    delay?: number;
    loading?: boolean;
}

const FunnelStep: React.FC<FunnelStepProps> = ({ label, count, dropoff, isLast, delay = 0, loading }) => (
    <div className="relative flex flex-1 items-center">
        {/* Step Content */}
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: delay, ease: [0.22, 1, 0.36, 1] }}
            className={`relative flex-1 p-4 rounded-xl border ${isLast ? 'bg-[#1A1A1A]/5 border-[#1A1A1A]/10' : 'bg-white/30 border-white/50'} group transition-all hover:bg-white/50`}
        >
            <div className="flex flex-col">
                <span className="text-[#1A1A1A]/50 text-[10px] uppercase tracking-widest mb-1">{label}</span>
                {loading ? (
                    <div className="h-8 w-16 bg-[#1A1A1A]/10 rounded animate-pulse" />
                ) : (
                    <div className="flex items-baseline gap-2">
                        <span className="text-[#1A1A1A] font-light text-2xl font-sans">{count.toLocaleString()}</span>
                        {dropoff && (
                            <span className="text-xs text-[#1A1A1A]/40 font-medium">-{dropoff}</span>
                        )}
                    </div>
                )}
            </div>
        </motion.div>

        {/* Connector */}
        {!isLast && (
            <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.4, delay: delay + 0.2 }}
                className="mx-2 text-[#1A1A1A]/20 hidden md:flex items-center justify-center"
            >
                <div className="h-px w-4 bg-[#1A1A1A]/10" />
                <ChevronRight className="w-4 h-4 text-[#1A1A1A]/20 -ml-1" />
            </motion.div>
        )}
    </div>
);

interface FunnelChartProps {
    data?: FunnelData;
    loading?: boolean;
}

export const FunnelChart: React.FC<FunnelChartProps> = ({ data, loading }) => {
    // Compute drop-off percentages from live data
    const calls = data?.calls ?? 0;
    const qualified = data?.qualified ?? 0;
    const booked = data?.booked ?? 0;
    const escalated = data?.escalated ?? 0;

    const qualifiedDropoff = calls > 0 ? `${Math.round(((calls - qualified) / calls) * 100)}%` : undefined;
    const bookedDropoff = qualified > 0 ? `${Math.round(((qualified - booked) / qualified) * 100)}%` : undefined;

    return (
        <div className="relative p-6 bg-white/30 backdrop-blur-md border border-white/50 rounded-2xl h-full overflow-hidden hover:shadow-lg hover:shadow-black/5 transition-all">
            {/* Background Grid Texture */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)', backgroundSize: '24px 24px' }}
            />

            <h3 className="relative z-10 text-[#1A1A1A] font-medium text-sm mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                Conversion Progression
            </h3>

            <div className="relative z-10 flex flex-col md:flex-row gap-4 md:gap-0 justify-between">
                <FunnelStep label="Calls" count={calls} dropoff={qualifiedDropoff} delay={0.1} loading={loading} />
                <FunnelStep label="Qualified" count={qualified} dropoff={bookedDropoff} delay={0.2} loading={loading} />
                <FunnelStep label="Booked" count={booked} delay={0.3} loading={loading} />
                <FunnelStep label="Follow-Up" count={escalated} isLast delay={0.4} loading={loading} />
            </div>
        </div>
    );
};
