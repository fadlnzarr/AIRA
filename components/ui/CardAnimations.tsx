import React from 'react';
import { motion } from 'framer-motion';

// 1. AI Voice Receptionist - Audio Waveform (Static)
export const VoiceWaveform = ({ className }: { className?: string }) => (
    <div className={`relative flex items-center justify-center gap-1 ${className}`}>
        {[0.4, 0.7, 1, 0.6, 0.3].map((h, i) => (
            <div
                key={i}
                className="w-1 bg-current rounded-full"
                style={{ height: `${h * 100}%`, opacity: 0.8 }}
            />
        ))}
    </div>
);

// 2. Appointment Booking - Calendar Check (Static)
export const CalendarCheck = ({ className }: { className?: string }) => (
    <div className={`relative ${className}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
            <path
                d="M8 16 L11 19 L16 13"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    </div>
);

// 3. Lead Qualification - Filter Funnel (Static)
export const FilterFunnel = ({ className }: { className?: string }) => (
    <div className={`relative ${className}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            <circle cx="12" cy="15" r="1.5" fill="currentColor" stroke="none" opacity="0.8" />
            <circle cx="10" cy="8" r="1.5" fill="currentColor" stroke="none" opacity="0.6" />
            <circle cx="14" cy="8" r="1.5" fill="currentColor" stroke="none" opacity="0.6" />
        </svg>
    </div>
);

// 4. Workflow Automation - Static Zap
export const AutomationZap = ({ className }: { className?: string }) => (
    <div className={`relative ${className}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
            <polygon
                points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"
                fill="currentColor"
                fillOpacity="0.2"
            />
        </svg>
    </div>
);

// 5. CRM Sync - Data Flow (Static)
export const DataSync = ({ className }: { className?: string }) => (
    <div className={`relative ${className}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
            <path
                d="M12 8 V16"
                strokeDasharray="4 4"
                strokeOpacity={0.5}
            />
            <path d="M9 13l3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </div>
);

// 6. After-Hours Handling - Night Mode (Static)
export const NightMode = ({ className }: { className?: string }) => (
    <div className={`relative ${className}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            <g opacity="0.7">
                <path d="M19 4 L19 6 M18 5 L20 5" strokeWidth="1" />
                <path d="M16 2 L16 4 M15 3 L17 3" strokeWidth="1" />
            </g>
        </svg>
    </div>
);

// 7. Conversation -> Clean Data - Structure (Static)
export const DataStructure = ({ className }: { className?: string }) => (
    <div className={`relative ${className}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
            <rect x="3" y="3" width="18" height="18" rx="2" strokeOpacity={0.3} />
            <line x1="3" y1="9" x2="21" y2="9" strokeOpacity={0.5} />
            <line x1="3" y1="15" x2="21" y2="15" strokeOpacity={0.5} />
            <line x1="12" y1="3" x2="12" y2="21" strokeOpacity={0.5} />
        </svg>
    </div>
);

// 8. Trust & Safety - Shield Lock (Static)
export const ShieldLock = ({ className }: { className?: string }) => (
    <div className={`relative ${className}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M12 8v4" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="14" r="1.5" fill="currentColor" />
        </svg>
    </div>
);

// 9. Daily Brief - Chart Growth (Static)
export const ChartGrowth = ({ className }: { className?: string }) => (
    <div className={`relative ${className}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
            <line x1="3" y1="21" x2="21" y2="21" strokeOpacity={0.5} />
            <line x1="3" y1="21" x2="3" y2="3" strokeOpacity={0.5} />
            <polyline points="3 16 9 10 15 14 21 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </div>
);

// --- Middle Widgets (Large Center Animations) - FROZEN ---

// 1. Voice Spectrum Widget (Static)
export const VoiceSpectrumWidget = ({ className }: { className?: string }) => (
    <div className={`w-full h-full flex items-end justify-center gap-1 ${className}`}>
        {Array.from({ length: 24 }).map((_, i) => {
            // Create a fake static waveform pattern
            const height = 20 + Math.sin(i * 0.5) * 40 + Math.random() * 20;
            return (
                <div
                    key={i}
                    className="w-1.5 bg-white/20 rounded-t-full"
                    style={{ height: `${height}%`, opacity: 0.6 }}
                />
            );
        })}
    </div>
);

// 2. Time Slots Widget (Static)
export const TimeSlotsWidget = ({ className }: { className?: string }) => (
    <div className={`w-full h-full flex flex-col justify-center gap-3 ${className} opacity-50`}>
        {[0.6, 0.4, 0.8].map((w, i) => (
            <div key={i} className="flex gap-2">
                <div className="w-16 h-2 bg-white/10 rounded-full" />
                <div
                    className="h-2 bg-white/30 rounded-full"
                    style={{ width: `${w * 100}%` }}
                />
            </div>
        ))}
    </div>
);

// 3. Funnel Particles Widget (Static)
export const FunnelParticlesWidget = ({ className }: { className?: string }) => (
    <div className={`w-full h-full flex items-center justify-center ${className}`}>
        <svg viewBox="0 0 200 100" className="w-full h-full opacity-40">
            <path d="M20 10 L180 10 L120 90 L80 90 Z" fill="none" stroke="currentColor" strokeWidth="1" />
            {/* Static Particles */}
            <circle cx="60" cy="30" r="2" fill="currentColor" opacity="0.6" />
            <circle cx="140" cy="30" r="2" fill="currentColor" opacity="0.6" />
            <circle cx="90" cy="50" r="2" fill="currentColor" opacity="0.8" />
            <circle cx="110" cy="60" r="2" fill="currentColor" opacity="0.8" />
            <circle cx="100" cy="80" r="2" fill="currentColor" opacity="1" />
        </svg>
    </div>
);

// 4. Network Nodes Widget (Static)
export const NetworkNodesWidget = ({ className }: { className?: string }) => (
    <div className={`w-full h-full ${className}`}>
        <svg viewBox="0 0 200 100" className="w-full h-full opacity-40">
            <path d="M40 50 L100 20 L160 50 L100 80 Z" stroke="currentColor" strokeWidth="0.5" fill="none" />
            <path d="M40 50 L160 50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
            <circle cx="40" cy="50" r="4" fill="currentColor" opacity="0.8" />
            <circle cx="100" cy="20" r="4" fill="currentColor" opacity="0.8" />
            <circle cx="160" cy="50" r="4" fill="currentColor" opacity="0.8" />
            <circle cx="100" cy="80" r="4" fill="currentColor" opacity="0.8" />
            <circle cx="100" cy="50" r="6" fill="currentColor" />
        </svg>
    </div>
);

// 5. Database Stream Widget (Static)
export const DatabaseStreamWidget = ({ className }: { className?: string }) => (
    <div className={`w-full h-full flex flex-col justify-center items-center gap-2 ${className}`}>
        {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-48 h-1 bg-white/5 rounded-full overflow-hidden relative">
                <div
                    className="absolute h-full bg-white/40 w-1/3 rounded-full"
                    style={{ left: `${(i * 20) + 10}%` }}
                />
            </div>
        ))}
    </div>
);

// 6. Sleep Mode Widget (Static)
export const SleepModeWidget = ({ className }: { className?: string }) => (
    <div className={`w-full h-full flex items-center justify-center ${className}`}>
        <div className="w-24 h-24 rounded-full border border-white/10 flex items-center justify-center opacity-60">
            <div className="w-16 h-16 rounded-full bg-white/5" />
        </div>
    </div>
);

// 7. Sorting Data Widget (Static)
export const SortingDataWidget = ({ className }: { className?: string }) => (
    <div className={`w-full h-full flex items-end justify-center gap-2 ${className} opacity-50`}>
        {[30, 60, 40, 80, 20, 70].sort((a, b) => a - b).map((h, i) => (
            <div
                key={i}
                className="w-4 bg-white/20 rounded-md"
                style={{ height: `${h}%` }}
            />
        ))}
    </div>
);

// 8. Security Scan Widget (Static)
export const SecurityScanWidget = ({ className }: { className?: string }) => (
    <div className={`w-full h-full flex items-center justify-center ${className}`}>
        <div className="w-48 h-32 border-2 border-white/10 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 grid grid-cols-4 grid-rows-2 gap-2 p-2">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="bg-white/5 rounded-sm" />
                ))}
            </div>
            {/* Static Scan Line */}
            <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white/50 box-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
        </div>
    </div>
);

// 9. Growth Graph Widget (Static)
export const GrowthGraphWidget = ({ className }: { className?: string }) => (
    <div className={`w-full h-full flex items-end justify-center px-12 pb-4 ${className} opacity-60`}>
        <svg viewBox="0 0 200 100" className="w-full h-full overflow-visible">
            <path
                d="M0 100 C 50 80, 100 60, 200 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            />
            <linearGradient id="static-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="white" stopOpacity="0.2" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <path
                d="M0 100 C 50 80, 100 60, 200 10 V 100 H 0 Z"
                fill="url(#static-gradient)"
            />
        </svg>
    </div>
);
