
import React, { useState } from 'react';
import type { WeeklyActivityDay } from '../../../src/lib/googleSheets';

interface TrendChartProps {
    data?: WeeklyActivityDay[];
    loading?: boolean;
}

export const TrendChart: React.FC<TrendChartProps> = ({ data, loading }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const chartData = data && data.length > 0 ? data : [];
    const maxValue = chartData.length > 0 ? Math.max(...chartData.map(d => d.calls), 1) : 1;

    return (
        <div className="relative p-8 bg-white/30 border border-white/50 rounded-[32px] h-[400px] overflow-hidden group hover:shadow-lg hover:shadow-black/5 transition-all">
            {/* Top Shine */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-50" />

            <div className="flex flex-col h-full">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h3 className="text-[#1A1A1A] text-lg font-light tracking-tight mb-1">Weekly Activity</h3>
                        <p className="text-[#1A1A1A]/40 text-xs font-mono">
                            {loading ? 'Loading call volume…' : 'Live call volume — last 7 days'}
                        </p>
                    </div>
                    {loading && (
                        <span className="flex items-center gap-1.5 text-xs text-[#1A1A1A]/30 font-mono animate-pulse">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A]/20 inline-block" />
                            Fetching…
                        </span>
                    )}
                </div>

                {/* Custom Bar Chart */}
                <div className="flex-1 relative" style={{ minHeight: '200px' }}>
                    <div className="absolute inset-0 flex items-end gap-2 px-2 pb-8">
                        {loading ? (
                            // Skeleton bars while loading
                            Array.from({ length: 7 }).map((_, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center" style={{ height: '100%', justifyContent: 'flex-end' }}>
                                    <div
                                        className="animate-pulse bg-[#1A1A1A]/10 rounded-[6px]"
                                        style={{ height: `${30 + Math.random() * 40}%`, width: '14px' }}
                                    />
                                    <span className="text-[10px] text-[#1A1A1A]/20 font-sans mt-2 absolute -bottom-2" style={{ whiteSpace: 'nowrap' }}>
                                        {i % 2 === 0 ? '···' : ''}
                                    </span>
                                </div>
                            ))
                        ) : chartData.length === 0 ? (
                            <div className="w-full flex items-center justify-center text-[#1A1A1A]/30 text-sm">
                                No data available
                            </div>
                        ) : (
                            chartData.map((entry, index) => {
                                const heightPercent = (entry.calls / maxValue) * 100;
                                const isMax = entry.calls === maxValue && entry.calls > 0;
                                const isHovered = hoveredIndex === index;

                                return (
                                    <div
                                        key={index}
                                        className="flex-1 flex flex-col items-center relative"
                                        style={{ height: '100%', justifyContent: 'flex-end' }}
                                        onMouseEnter={() => setHoveredIndex(index)}
                                        onMouseLeave={() => setHoveredIndex(null)}
                                    >
                                        {/* Tooltip */}
                                        {isHovered && (
                                            <div
                                                className="absolute bg-white/90 backdrop-blur-xl border border-black/5 px-3 py-2 rounded-xl shadow-xl z-10 pointer-events-none"
                                                style={{ bottom: `calc(${Math.max(heightPercent, 4)}% + 12px)`, minWidth: '80px', left: '50%', transform: 'translateX(-50%)' }}
                                            >
                                                <p className="text-[#1A1A1A]/50 text-[10px] uppercase tracking-wider mb-0.5">{entry.date}</p>
                                                <div className="flex items-baseline gap-1.5">
                                                    <p className="text-[#1A1A1A] text-lg font-light font-sans">{entry.calls}</p>
                                                    <span className="text-[#1A1A1A]/40 text-[10px] font-medium">calls</span>
                                                </div>
                                            </div>
                                        )}

                                        {/* Bar */}
                                        <div
                                            className="transition-all duration-500 cursor-default"
                                            style={{
                                                height: `${Math.max(heightPercent, entry.calls > 0 ? 2 : 0)}%`,
                                                width: '14px',
                                                backgroundColor: isMax
                                                    ? '#1A1A1A'
                                                    : isHovered
                                                    ? 'rgba(26,26,26,0.45)'
                                                    : 'rgba(26,26,26,0.2)',
                                                borderRadius: '6px',
                                            }}
                                        />

                                        {/* Label */}
                                        <span className="text-[10px] text-[#1A1A1A]/40 font-sans mt-2 absolute -bottom-2" style={{ whiteSpace: 'nowrap' }}>
                                            {index % 2 === 0 ? entry.date : ''}
                                        </span>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
