
import React, { useState } from 'react';
import { ToggleLeft, ToggleRight, Clock } from 'lucide-react';

interface DaySchedule {
    day: string;
    isOpen: boolean;
    start: string;
    end: string;
}

export const BusinessHours: React.FC = () => {
    const [schedule, setSchedule] = useState<DaySchedule[]>([
        { day: 'Monday', isOpen: true, start: '09:00', end: '17:00' },
        { day: 'Tuesday', isOpen: true, start: '09:00', end: '17:00' },
        { day: 'Wednesday', isOpen: true, start: '09:00', end: '17:00' },
        { day: 'Thursday', isOpen: true, start: '09:00', end: '17:00' },
        { day: 'Friday', isOpen: true, start: '09:00', end: '17:00' },
        { day: 'Saturday', isOpen: false, start: '10:00', end: '14:00' },
        { day: 'Sunday', isOpen: false, start: '10:00', end: '14:00' },
    ]);

    const toggleDay = (index: number) => {
        const newSchedule = [...schedule];
        newSchedule[index].isOpen = !newSchedule[index].isOpen;
        setSchedule(newSchedule);
    };

    const updateTime = (index: number, field: 'start' | 'end', value: string) => {
        const newSchedule = [...schedule];
        newSchedule[index] = { ...newSchedule[index], [field]: value };
        setSchedule(newSchedule);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-white/60 uppercase tracking-widest pl-2">Schedule</span>
                <span className="text-xs text-white/30 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    PST (UTC-08:00)
                </span>
            </div>
            <div className="grid gap-3">
                {schedule.map((day, index) => (
                    <div
                        key={day.day}
                        className={`flex flex-col sm:flex-row items-center gap-4 p-3 rounded-lg border transition-colors ${day.isOpen ? 'bg-white/[0.03] border-white/5' : 'bg-transparent border-transparent opacity-50 hover:opacity-80'}`}
                    >
                        {/* Day Toggle */}
                        <div className="flex items-center justify-between w-full sm:w-32">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => toggleDay(index)}
                                    className={`transition-colors text-white ${day.isOpen ? 'text-green-400' : 'text-white/20'}`}
                                >
                                    {day.isOpen ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
                                </button>
                                <span className="text-white font-medium text-sm">{day.day}</span>
                            </div>
                        </div>

                        {/* Time Inputs */}
                        <div className="flex items-center gap-2 flex-1 w-full sm:w-auto">
                            <input
                                type="time"
                                value={day.start}
                                onChange={(e) => updateTime(index, 'start', e.target.value)}
                                disabled={!day.isOpen}
                                className="bg-[#111] border border-white/10 rounded px-2 py-1.5 text-sm text-white focus:border-white/30 focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed w-full sm:w-auto"
                            />
                            <span className="text-white/30 text-xs">to</span>
                            <input
                                type="time"
                                value={day.end}
                                onChange={(e) => updateTime(index, 'end', e.target.value)}
                                disabled={!day.isOpen}
                                className="bg-[#111] border border-white/10 rounded px-2 py-1.5 text-sm text-white focus:border-white/30 focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed w-full sm:w-auto"
                            />
                        </div>

                        <div className="w-24 text-right text-xs text-white/30 hidden sm:block">
                            {day.isOpen ? 'Open' : 'Closed'}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-end pt-4">
                <button className="text-xs text-white/40 hover:text-white transition-colors underline decoration-white/20 hover:decoration-white/50">
                    Add Exception Date
                </button>
            </div>
        </div>
    );
};
