
import React, { useState } from 'react';

const data = [
    { date: 'Mon', calls: 120 },
    { date: 'Tue', calls: 185 },
    { date: 'Wed', calls: 154 },
    { date: 'Thu', calls: 210 },
    { date: 'Fri', calls: 190 },
    { date: 'Sat', calls: 230 },
    { date: 'Sun', calls: 125 },
    { date: 'Mon', calls: 160 },
    { date: 'Tue', calls: 140 },
    { date: 'Wed', calls: 200 },
    { date: 'Thu', calls: 245 },
    { date: 'Fri', calls: 220 },
];

const maxValue = Math.max(...data.map(d => d.calls));

export const TrendChart: React.FC = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className="relative p-8 bg-white/30 border border-white/50 rounded-[32px] h-[400px] overflow-hidden group hover:shadow-lg hover:shadow-black/5 transition-all">
            {/* Top Shine */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-50" />

            <div className="flex flex-col h-full">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h3 className="text-[#1A1A1A] text-lg font-light tracking-tight mb-1">Weekly Activity</h3>
                        <p className="text-[#1A1A1A]/40 text-xs font-mono">Overview of call volume</p>
                    </div>
                </div>

                {/* Custom Bar Chart */}
                <div className="flex-1 relative" style={{ minHeight: '200px' }}>
                    <div className="absolute inset-0 flex items-end gap-2 px-2 pb-8">
                        {data.map((entry, index) => {
                            const heightPercent = (entry.calls / maxValue) * 100;
                            const isMax = entry.calls === maxValue;
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
                                            style={{ bottom: `calc(${heightPercent}% + 12px)`, minWidth: '80px', left: '50%', transform: 'translateX(-50%)' }}
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
                                        className="transition-all duration-500 cursor-pointer"
                                        style={{
                                            height: `${heightPercent}%`,
                                            width: '14px',
                                            backgroundColor: isMax ? '#1A1A1A' : isHovered ? 'rgba(26,26,26,0.45)' : 'rgba(26,26,26,0.2)',
                                            borderRadius: '6px',
                                        }}
                                    />

                                    {/* Label */}
                                    <span className="text-[10px] text-[#1A1A1A]/40 font-sans mt-2 absolute -bottom-2" style={{ whiteSpace: 'nowrap' }}>
                                        {index % 2 === 0 ? entry.date : ''}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
