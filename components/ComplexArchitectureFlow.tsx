import React from 'react';
import { motion } from 'framer-motion';
import {
    Database, Zap, FileText, Cpu,
    BarChart3, Bell
} from 'lucide-react';

// --- Configuration (Strict Black & White) ---
const NODES = {
    inputs: [
        { id: 'user-data', label: 'User Data', subtext: 'PostgreSQL', icon: Database },
        { id: 'events', label: 'Events', subtext: 'Webhook', icon: Zap },
        { id: 'files', label: 'Files', subtext: 'S3 Bucket', icon: FileText },
    ],
    core: { id: 'ai-engine', label: 'AI Engine', subtext: 'Processing', icon: Cpu },
    outputs: [
        { id: 'analytics', label: 'Analytics', subtext: 'Dashboard', icon: BarChart3 },
        { id: 'notifications', label: 'Notifications', subtext: 'Slack/Email', icon: Bell },
    ]
};

export const ComplexArchitectureFlow: React.FC = () => {

    return (
        <div className="w-full relative py-20 px-4 md:px-12 flex flex-col items-center justify-center min-h-[600px] overflow-hidden bg-transparent">

            <div className="relative z-10 w-full max-w-5xl mx-auto h-[450px] md:h-[550px]">

                {/* SVG Connections Layer */}
                <svg
                    className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                >
                    <defs>
                        {/* Gradient for the flowing beam */}
                        <linearGradient id="flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="transparent" stopOpacity="0" />
                            <stop offset="20%" stopColor="transparent" stopOpacity="0" />
                            <stop offset="50%" stopColor="black" stopOpacity="0.8" />
                            <stop offset="90%" stopColor="black" stopOpacity="1" />
                            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                        </linearGradient>

                        {/* Glow Filter */}
                        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Input -> Core Connections */}
                    <ConnectionPath start={{ x: 20, y: 16 }} end={{ x: 40, y: 50 }} />
                    <ConnectionPath start={{ x: 20, y: 50 }} end={{ x: 40, y: 50 }} />
                    <ConnectionPath start={{ x: 20, y: 84 }} end={{ x: 40, y: 50 }} />

                    {/* Core -> Output Connections */}
                    <ConnectionPath start={{ x: 60, y: 50 }} end={{ x: 80, y: 30 }} />
                    <ConnectionPath start={{ x: 60, y: 50 }} end={{ x: 80, y: 70 }} />
                </svg>

                {/* Nodes Container */}
                <div className="relative w-full h-full grid grid-cols-3 gap-4">

                    {/* Left Column (Inputs) */}
                    <div className="flex flex-col justify-between items-center py-4">
                        {NODES.inputs.map((node) => (
                            <ArchitectureNode key={node.id} node={node} />
                        ))}
                    </div>

                    {/* Center Column (Core) */}
                    <div className="flex flex-col justify-center items-center">
                        <ArchitectureNode key={NODES.core.id} node={NODES.core} isCore />
                    </div>

                    {/* Right Column (Outputs) */}
                    <div className="flex flex-col justify-around items-center py-12">
                        {NODES.outputs.map((node) => (
                            <ArchitectureNode key={node.id} node={node} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Subtle Status Indicator */}
            <div className="absolute bottom-6 left-6 flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-black/50 backdrop-blur-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                    System Operational
                </span>
            </div>
        </div>
    );
};

// --- Sub-components (Minimalist) ---

const ConnectionPath = ({ start, end }: { start: { x: number, y: number }, end: { x: number, y: number } }) => {
    const cp1x = start.x + 15;
    const cp2x = end.x - 15;
    const pathD = `M ${start.x} ${start.y} C ${cp1x} ${start.y}, ${cp2x} ${end.y}, ${end.x} ${end.y}`;

    return (
        <>
            {/* Base Path (Faint Gray) */}
            <path
                d={pathD}
                fill="none"
                stroke="black"
                strokeOpacity="0.05" // Even fainter base
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
            />

            {/* Glowing Flowing Beam */}
            <motion.path
                d={pathD}
                fill="none"
                stroke="url(#flow-gradient)"
                strokeWidth="2"
                strokeLinecap="round"
                filter="url(#glow)"
                vectorEffect="non-scaling-stroke"
                initial={{ strokeDasharray: "10, 100", strokeDashoffset: 110 }}
                animate={{
                    strokeDashoffset: [-110, 0] // Move the dash along the path
                }}
                transition={{
                    duration: 2, // Faster flow
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: 0.5
                }}
            />
        </>
    );
};

const ArchitectureNode = ({ node, isCore = false }: { node: any, isCore?: boolean }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className={`
                relative flex items-center gap-4 p-5 rounded-sm border border-white/10
                bg-white/5 transition-all duration-300
                hover:border-white/30 hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]
                cursor-default
                ${isCore ? 'w-56 h-36 flex-col justify-center text-center z-20' : 'w-52 h-24 flex-row text-left z-10'}
            `}
        >
            {/* Icon (Thin Stroke) */}
            <div className={`
                p-2 text-white transition-transform duration-300
                ${isCore ? 'mb-3' : ''}
            `}>
                <node.icon strokeWidth={1.5} size={isCore ? 32 : 24} />
            </div>

            {/* Typography (Swiss Style) */}
            <div>
                <h3 className={`font-serif text-white leading-none mb-1 ${isCore ? 'text-xl' : 'text-base'}`}>
                    {node.label}
                </h3>
                <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                    {node.subtext}
                </p>
            </div>

            {/* Connecting Points (Minimalist Dots) */}
            {!isCore && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-1.5 h-1.5 bg-black rounded-full" />
            )}
            {isCore && (
                <>
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-black rounded-full" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-1.5 h-1.5 bg-black rounded-full" />
                </>
            )}
        </motion.div>
    );
};
