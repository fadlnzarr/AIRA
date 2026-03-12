
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface AppointmentsCalendarProps {
    // In a real app, you'd pass data mapped to dates
}

export const AppointmentsCalendar: React.FC<AppointmentsCalendarProps> = () => {
    // Generate mock days for a calendar month view (e.g., Nov 2024)
    const days = Array.from({ length: 35 }, (_, i) => i + 1); // Mock 35 days (5 weeks)

    // Mock generic appointments scatter
    const hasAppointment = (day: number) => [5, 12, 15, 22, 24, 28].includes(day);

    return (
        <div className="bg-white/40 backdrop-blur-md border border-[#1A1A1A]/10 rounded-xl overflow-hidden shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#1A1A1A]/10">
                <h3 className="text-[#1A1A1A] font-medium">November 2024</h3>
                <div className="flex items-center gap-1">
                    <button className="p-1 hover:bg-[#1A1A1A]/5 rounded text-[#1A1A1A]/50 hover:text-[#1A1A1A] transition-colors">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button className="p-1 hover:bg-[#1A1A1A]/5 rounded text-[#1A1A1A]/50 hover:text-[#1A1A1A] transition-colors">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Grid Header */}
            <div className="grid grid-cols-7 border-b border-[#1A1A1A]/5">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="py-2 text-center text-xs uppercase text-[#1A1A1A]/40 font-medium">
                        {day}
                    </div>
                ))}
            </div>

            {/* Grid Body */}
            <div className="grid grid-cols-7 auto-rows-fr">
                {days.map((day, i) => {
                    const currentDay = i >= 3 && i <= 32 ? (i - 2) : null; // Mock offset
                    const isToday = currentDay === 14; // Mock today

                    return (
                        <div
                            key={i}
                            className={`min-h-[100px] border-b border-r border-[#1A1A1A]/5 p-2 relative hover:bg-[#1A1A1A]/5 transition-colors ${!currentDay ? 'bg-[#1A1A1A]/[0.01]' : ''}`}
                        >
                            {currentDay && (
                                <>
                                    <span className={`text-sm font-medium ${isToday ? 'bg-[#1A1A1A] text-white w-6 h-6 rounded-full flex items-center justify-center' : 'text-[#1A1A1A]/50'}`}>
                                        {currentDay}
                                    </span>

                                    {/* Mock Events */}
                                    {hasAppointment(currentDay) && (
                                        <div className="mt-2 space-y-1">
                                            <div className="text-[10px] bg-[#1A1A1A]/10 text-[#1A1A1A]/80 px-1.5 py-0.5 rounded border border-[#1A1A1A]/5 truncate">
                                                2:00 PM - Demo
                                            </div>
                                            {currentDay % 2 === 0 && (
                                                <div className="text-[10px] bg-blue-500/10 text-blue-700 px-1.5 py-0.5 rounded border border-blue-500/10 truncate">
                                                    4:30 PM - Consult
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
