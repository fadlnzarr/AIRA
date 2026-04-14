
import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

export interface DateRange {
    label: string;
    from: Date | null;
    to: Date | null;
}

interface DateRangePickerProps {
    value: DateRange;
    onChange: (range: DateRange) => void;
}

const PRESETS: { label: string; getRange: () => { from: Date; to: Date } }[] = [
    {
        label: 'Today',
        getRange: () => {
            const now = new Date();
            const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            return { from: start, to: now };
        },
    },
    {
        label: 'Last 7 Days',
        getRange: () => {
            const now = new Date();
            const start = new Date(now);
            start.setDate(start.getDate() - 7);
            return { from: start, to: now };
        },
    },
    {
        label: 'Last 30 Days',
        getRange: () => {
            const now = new Date();
            const start = new Date(now);
            start.setDate(start.getDate() - 30);
            return { from: start, to: now };
        },
    },
    {
        label: 'This Month',
        getRange: () => {
            const now = new Date();
            const start = new Date(now.getFullYear(), now.getMonth(), 1);
            return { from: start, to: now };
        },
    },
    {
        label: 'Last Month',
        getRange: () => {
            const now = new Date();
            const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            const end = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);
            return { from: start, to: end };
        },
    },
    {
        label: 'All Time',
        getRange: () => {
            return { from: new Date(2020, 0, 1), to: new Date() };
        },
    },
];

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function getDaysInMonth(year: number, month: number): Date[] {
    const days: Date[] = [];
    const date = new Date(year, month, 1);
    while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return days;
}

function isSameDay(a: Date, b: Date): boolean {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function isInRange(day: Date, from: Date | null, to: Date | null): boolean {
    if (!from || !to) return false;
    return day >= from && day <= to;
}

export const DEFAULT_DATE_RANGE: DateRange = { label: 'All Time', from: null, to: null };

export const DateRangePicker: React.FC<DateRangePickerProps> = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [viewMonth, setViewMonth] = useState(new Date().getMonth());
    const [viewYear, setViewYear] = useState(new Date().getFullYear());
    const [selectingFrom, setSelectingFrom] = useState<Date | null>(null);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
        };
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
        };
        document.addEventListener('mousedown', handleClick);
        document.addEventListener('keydown', handleKey);
        return () => {
            document.removeEventListener('mousedown', handleClick);
            document.removeEventListener('keydown', handleKey);
        };
    }, []);

    const days = getDaysInMonth(viewYear, viewMonth);
    const firstDayOfWeek = days[0].getDay();
    const monthLabel = new Date(viewYear, viewMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    const prevMonth = () => {
        if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
        else setViewMonth(viewMonth - 1);
    };

    const nextMonth = () => {
        if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
        else setViewMonth(viewMonth + 1);
    };

    const handleDayClick = (day: Date) => {
        if (!selectingFrom) {
            setSelectingFrom(day);
        } else {
            const from = selectingFrom < day ? selectingFrom : day;
            const to = selectingFrom < day ? day : selectingFrom;
            const label = `${from.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${to.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
            onChange({ label, from, to });
            setSelectingFrom(null);
            setIsOpen(false);
        }
    };

    const handlePreset = (preset: typeof PRESETS[0]) => {
        const { from, to } = preset.getRange();
        onChange({ label: preset.label, from, to });
        setIsOpen(false);
        setSelectingFrom(null);
    };

    return (
        <div ref={ref} className="relative">
            {/* Trigger */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium border transition-all duration-200
                    ${isOpen
                        ? 'bg-white border-[#1A1A1A]/20 shadow-lg shadow-black/5 text-[#1A1A1A]'
                        : 'bg-[#1A1A1A]/5 border-[#1A1A1A]/10 text-[#1A1A1A]/70 hover:bg-[#1A1A1A]/8 hover:border-[#1A1A1A]/15 hover:text-[#1A1A1A]'
                    }
                `}
            >
                <Calendar className="w-4 h-4" />
                <span>{value.label}</span>
            </button>

            {/* Dropdown Panel */}
            {isOpen && (
                <div
                    className="absolute top-full left-0 mt-2 z-50"
                    style={{ animation: 'dropdown-enter 0.2s cubic-bezier(0.16, 1, 0.3, 1)' }}
                >
                    <div className="bg-white/95 backdrop-blur-xl border border-[#1A1A1A]/10 rounded-2xl shadow-2xl shadow-black/10 overflow-hidden flex">
                        {/* Presets */}
                        <div className="w-[140px] border-r border-[#1A1A1A]/5 py-2">
                            {PRESETS.map((preset) => (
                                <button
                                    key={preset.label}
                                    onClick={() => handlePreset(preset)}
                                    className={`
                                        w-full text-left px-4 py-2 text-sm transition-all duration-150
                                        ${value.label === preset.label
                                            ? 'bg-[#1A1A1A]/5 text-[#1A1A1A] font-medium'
                                            : 'text-[#1A1A1A]/50 hover:bg-[#1A1A1A]/3 hover:text-[#1A1A1A]'
                                        }
                                    `}
                                >
                                    {preset.label}
                                </button>
                            ))}
                        </div>

                        {/* Calendar */}
                        <div className="p-4 w-[280px]">
                            {/* Month Navigation */}
                            <div className="flex items-center justify-between mb-3">
                                <button onClick={prevMonth} className="p-1 rounded-lg hover:bg-[#1A1A1A]/5 transition-colors text-[#1A1A1A]/50 hover:text-[#1A1A1A]">
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <span className="text-sm font-medium text-[#1A1A1A]">{monthLabel}</span>
                                <button onClick={nextMonth} className="p-1 rounded-lg hover:bg-[#1A1A1A]/5 transition-colors text-[#1A1A1A]/50 hover:text-[#1A1A1A]">
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Day Headers */}
                            <div className="grid grid-cols-7 mb-1">
                                {DAYS.map(d => (
                                    <div key={d} className="text-center text-[10px] font-medium text-[#1A1A1A]/30 py-1">{d}</div>
                                ))}
                            </div>

                            {/* Days Grid */}
                            <div className="grid grid-cols-7">
                                {/* Empty cells for offset */}
                                {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                                    <div key={`empty-${i}`} />
                                ))}

                                {days.map((day) => {
                                    const isFrom = selectingFrom && isSameDay(day, selectingFrom);
                                    const isSelected = (value.from && isSameDay(day, value.from)) || (value.to && isSameDay(day, value.to));
                                    const inRange = isInRange(day, value.from, value.to);
                                    const isToday = isSameDay(day, new Date());

                                    return (
                                        <button
                                            key={day.toISOString()}
                                            onClick={() => handleDayClick(day)}
                                            className={`
                                                relative w-9 h-8 text-xs rounded-lg transition-all duration-150 font-medium
                                                ${isFrom || isSelected
                                                    ? 'bg-[#1A1A1A] text-white'
                                                    : inRange
                                                        ? 'bg-[#1A1A1A]/10 text-[#1A1A1A]'
                                                        : isToday
                                                            ? 'text-[#1A1A1A] font-bold ring-1 ring-[#1A1A1A]/20'
                                                            : 'text-[#1A1A1A]/60 hover:bg-[#1A1A1A]/5 hover:text-[#1A1A1A]'
                                                }
                                            `}
                                        >
                                            {day.getDate()}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Hint */}
                            {selectingFrom && (
                                <p className="text-[10px] text-[#1A1A1A]/40 text-center mt-3 animate-pulse">
                                    Select end date…
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes dropdown-enter {
                    0% { opacity: 0; transform: translateY(-4px) scale(0.97); }
                    100% { opacity: 1; transform: translateY(0) scale(1); }
                }
            `}</style>
        </div>
    );
};
