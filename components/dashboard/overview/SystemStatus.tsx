
import React from 'react';
import { motion } from 'framer-motion';

interface StatusItemProps {
    label: string;
    status: 'operational' | 'warning' | 'error';
    message?: string;
    index: number;
}

const StatusItem: React.FC<StatusItemProps> = ({ label, status, message, index }) => {
    const getStatusColor = () => {
        switch (status) {
            case 'operational': return 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]';
            case 'warning': return 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]';
            case 'error': return 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * index, duration: 0.5, ease: 'easeOut' }}
            className="group flex items-center justify-between p-3.5 rounded-lg border border-black/5 bg-white/40 hover:bg-white/60 transition-colors"
        >
            <div className="flex items-center gap-3">
                <div className="relative flex h-2 w-2">
                    {status !== 'operational' && (
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${status === 'warning' ? 'bg-amber-500' : 'bg-red-500'}`}></span>
                    )}
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${getStatusColor()}`}></span>
                </div>
                <div>
                    <span className="text-[#1A1A1A] text-xs font-medium tracking-wide block">{label}</span>
                    {message && <span className="text-[10px] text-[#1A1A1A]/50 block mt-0.5">{message}</span>}
                </div>
            </div>

            <div className="text-[10px] text-[#1A1A1A]/30 font-mono group-hover:text-[#1A1A1A]/60 transition-colors uppercase">
                {status === 'operational' ? 'OK' : 'CHK'}
            </div>
        </motion.div>
    );
};

export const SystemStatus: React.FC = () => {
    return (
        <div className="relative p-6 bg-white/30 backdrop-blur-md border border-white/50 rounded-2xl h-full hover:shadow-lg hover:shadow-black/5 transition-all">
            <div className="flex flex-col gap-3">
                <StatusItem index={0} label="Voice Engine" status="operational" />
                <StatusItem index={1} label="Database Cluster" status="operational" />
                <StatusItem index={2} label="API Gateway" status="warning" message="High Latency (140ms)" />
                <StatusItem index={3} label="LLM Inference" status="operational" />
            </div>
        </div>
    );
};
