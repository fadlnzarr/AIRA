import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { Appointment } from './AppointmentsList';

interface AppointmentsCalendarProps {
    appointments: Appointment[];
    onSelect: (apt: Appointment) => void;
}

const statusColors: Record<Appointment['statusType'], string> = {
    success: 'bg-green-500/10 text-green-700 border-green-500/20',
    warning: 'bg-amber-500/10 text-amber-700 border-amber-500/20',
    error: 'bg-red-500/10 text-red-700 border-red-500/20',
    neutral: 'bg-[#1A1A1A]/5 text-[#1A1A1A]/70 border-[#1A1A1A]/10',
};

export const AppointmentsCalendar: React.FC<AppointmentsCalendarProps> = ({ appointments, onSelect }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDate = new Date(monthStart);
    startDate.setDate(startDate.getDate() - startDate.getDay()); // Start on Sunday
    const endDate = new Date(monthEnd);
    if (endDate.getDay() !== 6) {
        endDate.setDate(endDate.getDate() + (6 - endDate.getDay())); // End on Saturday
    }

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    // Calculate days grid
    const calendarDays: Date[] = [];
    let d = new Date(startDate);
    while (d <= endDate) {
        calendarDays.push(new Date(d));
        d.setDate(d.getDate() + 1);
    }

    // Map appointments to date strings (YYYY-MM-DD local)
    const appointmentsByDate = useMemo(() => {
        const map = new Map<string, Appointment[]>();
        appointments.forEach(apt => {
            const rawD = new Date(apt.date);
            if (!isNaN(rawD.getTime())) {
                // Formatting to match local parsing without timezone shift issues
                const dateKey = `${rawD.getFullYear()}-${String(rawD.getMonth() + 1).padStart(2, '0')}-${String(rawD.getDate()).padStart(2, '0')}`;
                if (!map.has(dateKey)) map.set(dateKey, []);
                map.get(dateKey)!.push(apt);
            }
        });
        return map;
    }, [appointments]);

    const todayStr = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`;

    return (
        <div className="bg-white/40 backdrop-blur-md border border-[#1A1A1A]/10 rounded-xl overflow-hidden shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#1A1A1A]/10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#1A1A1A]/5 border border-[#1A1A1A]/10 flex items-center justify-center">
                        <CalendarIcon className="w-5 h-5 text-[#1A1A1A]/60" />
                    </div>
                    <div>
                        <h3 className="text-[#1A1A1A] font-medium text-lg">
                            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </h3>
                        <p className="text-xs text-[#1A1A1A]/50">
                            {appointments.length} appointment{appointments.length === 1 ? '' : 's'} across the month
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <button onClick={prevMonth} className="p-2 hover:bg-[#1A1A1A]/5 rounded-lg text-[#1A1A1A]/50 hover:text-[#1A1A1A] transition-colors border border-transparent hover:border-[#1A1A1A]/10">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button onClick={() => setCurrentDate(new Date())} className="px-3 py-1.5 hover:bg-[#1A1A1A]/5 rounded-lg text-sm text-[#1A1A1A]/70 hover:text-[#1A1A1A] transition-colors font-medium border border-transparent hover:border-[#1A1A1A]/10">
                        Today
                    </button>
                    <button onClick={nextMonth} className="p-2 hover:bg-[#1A1A1A]/5 rounded-lg text-[#1A1A1A]/50 hover:text-[#1A1A1A] transition-colors border border-transparent hover:border-[#1A1A1A]/10">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Grid Header */}
            <div className="grid grid-cols-7 border-b border-[#1A1A1A]/5">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="py-2.5 text-center text-[10px] sm:text-xs uppercase text-[#1A1A1A]/40 font-semibold tracking-wider">
                        {day}
                    </div>
                ))}
            </div>

            {/* Grid Body */}
            <div className="grid grid-cols-7 auto-rows-fr">
                {calendarDays.map((day, i) => {
                    const isCurrentMonth = day.getMonth() === currentDate.getMonth();
                    const dayKey = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
                    const dayEvents = appointmentsByDate.get(dayKey) || [];
                    const isToday = dayKey === todayStr;

                    return (
                        <div
                            key={i}
                            className={`min-h-[120px] border-b border-r border-[#1A1A1A]/5 p-1.5 sm:p-2.5 transition-colors ${!isCurrentMonth ? 'bg-[#1A1A1A]/[0.02]' : 'hover:bg-white/40'}`}
                        >
                            <div className="flex flex-col h-full">
                                <span className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full mb-1 sm:mb-2 ${isToday ? 'bg-[#1A1A1A] text-white shadow-md' : isCurrentMonth ? 'text-[#1A1A1A]/70' : 'text-[#1A1A1A]/30'}`}>
                                    {day.getDate()}
                                </span>

                                {/* Events */}
                                <div className="flex-1 space-y-1.5 overflow-hidden">
                                    {dayEvents.map(apt => (
                                        <button
                                            key={apt.id}
                                            onClick={() => onSelect(apt)}
                                            className={`w-full text-left text-[10px] sm:text-xs px-2 py-1.5 rounded-lg border transition-all hover:scale-[1.02] shadow-sm ${statusColors[apt.statusType]} truncate flex flex-col gap-0.5 group`}
                                            title={`${apt.time} - ${apt.clientName}`}
                                        >
                                            <span className="font-semibold block truncate leading-tight group-hover:text-black/80">{apt.time}</span>
                                            <span className="opacity-80 block truncate leading-tight">{apt.clientName}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
