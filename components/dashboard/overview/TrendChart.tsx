
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
    { date: 'Mon', calls: 120 },
    { date: 'Tue', calls: 185 },
    { date: 'Wed', calls: 154 },
    { date: 'Thu', calls: 210 },
    { date: 'Fri', calls: 190 },
    { date: 'Sat', calls: 230 },
    { date: 'Sun', calls: 125 },
    { date: 'Mon ', calls: 160 },
    { date: 'Tue ', calls: 140 },
    { date: 'Wed ', calls: 200 },
    { date: 'Thu ', calls: 245 },
    { date: 'Fri ', calls: 220 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white/90 backdrop-blur-xl border border-black/5 p-3 rounded-xl shadow-xl">
                <p className="text-[#1A1A1A]/50 text-[10px] uppercase tracking-wider mb-1">{label}</p>
                <div className="flex items-baseline gap-2">
                    <p className="text-[#1A1A1A] text-xl font-light font-sans">
                        {payload[0].value}
                    </p>
                    <span className="text-[#1A1A1A]/40 text-xs font-medium">calls</span>
                </div>
            </div>
        );
    }
    return null;
};

export const TrendChart: React.FC = () => {
    // Determine max value for simple dynamic coloring/scaling if needed
    const maxValue = Math.max(...data.map(d => d.calls));

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

                <div className="flex-1 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} margin={{ top: 10, right: 0, left: -25, bottom: 0 }} barSize={12}>
                            <XAxis
                                dataKey="date"
                                stroke="transparent"
                                tick={{ fill: 'rgba(26,26,26,0.4)', fontSize: 11, fontFamily: 'sans-serif' }}
                                tickLine={false}
                                axisLine={false}
                                dy={10}
                                interval={1} // Show every other label to avoid clutter if needed
                            />
                            <YAxis
                                stroke="transparent"
                                tick={{ fill: 'rgba(26,26,26,0.3)', fontSize: 11, fontFamily: 'sans-serif' }}
                                tickLine={false}
                                axisLine={false}
                            />
                            <Tooltip
                                content={<CustomTooltip />}
                                cursor={{ fill: 'rgba(26,26,26,0.05)', radius: 6 }}
                            />
                            <Bar
                                dataKey="calls"
                                radius={[6, 6, 6, 6]} // Capsule shape
                                animationDuration={1500}
                                animationBegin={200}
                            >
                                {data.map((entry, index) => {
                                    // Gradient logic or specific color for max value
                                    return (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.calls === maxValue ? '#1A1A1A' : 'rgba(26,26,26,0.2)'}
                                            className="transition-all duration-300 hover:opacity-80"
                                        />
                                    );
                                })}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};
