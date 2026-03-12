
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface FunnelStepProps {
    label: string;
    count: number;
    dropoff?: string;
    isLast?: boolean;
    delay?: number;
}

const FunnelStep: React.FC<FunnelStepProps> = ({ label, count, dropoff, isLast, delay = 0 }) => (
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
                <div className="flex items-baseline gap-2">
                    <span className="text-[#1A1A1A] font-light text-2xl font-sans">{count.toLocaleString()}</span>
                    {dropoff && (
                        <span className="text-xs text-[#1A1A1A]/40 font-medium">-{dropoff}</span>
                    )}
                </div>
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

export const FunnelChart: React.FC = () => {
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
                <FunnelStep label="Calls" count={1245} dropoff="12%" delay={0.1} />
                <FunnelStep label="Qualified" count={892} dropoff="35%" delay={0.2} />
                <FunnelStep label="Booked" count={410} dropoff="5%" delay={0.3} />
                <FunnelStep label="Escalated" count={45} isLast delay={0.4} />
            </div>
        </div>
    );
};
