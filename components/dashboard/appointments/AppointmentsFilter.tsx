
import React from 'react';
import { Search, Calendar, Filter, LayoutList, CalendarDays } from 'lucide-react';

interface AppointmentsFilterProps {
    view: 'list' | 'calendar';
    onViewChange: (view: 'list' | 'calendar') => void;
}

export const AppointmentsFilter: React.FC<AppointmentsFilterProps> = ({ view, onViewChange }) => {
    return (
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center py-4 border-b border-[#1A1A1A]/5">
            <div className="flex flex-wrap items-center gap-3">
                {/* View Toggle */}
                <div className="flex bg-[#1A1A1A]/5 border border-[#1A1A1A]/10 rounded-lg p-1">
                    <button
                        onClick={() => onViewChange('list')}
                        className={`p-1.5 rounded-md transition-all ${view === 'list' ? 'bg-white shadow-sm text-[#1A1A1A]' : 'text-[#1A1A1A]/40 hover:text-[#1A1A1A] hover:bg-[#1A1A1A]/5'}`}
                        title="List View"
                    >
                        <LayoutList className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onViewChange('calendar')}
                        className={`p-1.5 rounded-md transition-all ${view === 'calendar' ? 'bg-white shadow-sm text-[#1A1A1A]' : 'text-[#1A1A1A]/40 hover:text-[#1A1A1A] hover:bg-[#1A1A1A]/5'}`}
                        title="Calendar View"
                    >
                        <CalendarDays className="w-4 h-4" />
                    </button>
                </div>

                {/* Date Filter */}
                <button className="flex items-center gap-2 px-3 py-2 bg-[#1A1A1A]/5 border border-[#1A1A1A]/10 rounded-lg text-sm text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:border-[#1A1A1A]/20 transition-colors">
                    <Calendar className="w-4 h-4" />
                    <span>This Month</span>
                </button>

                {/* Status Filter */}
                <select className="px-3 py-2 bg-[#1A1A1A]/5 border border-[#1A1A1A]/10 rounded-lg text-sm text-[#1A1A1A]/70 hover:border-[#1A1A1A]/20 transition-colors outline-none focus:ring-1 focus:ring-[#1A1A1A]/20">
                    <option value="">All Statuses</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="pending">Pending</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="rescheduled">Rescheduled</option>
                </select>

                <button className="text-xs text-[#1A1A1A]/40 hover:text-[#1A1A1A] transition-colors px-2">
                    Clear
                </button>
            </div>

            {/* Actions */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A1A1A]/30" />
                <input
                    type="text"
                    placeholder="Search appointments..."
                    className="pl-9 pr-4 py-2 bg-[#1A1A1A]/5 border border-[#1A1A1A]/10 rounded-lg text-sm text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 focus:outline-none focus:border-[#1A1A1A]/30 w-full md:w-64 transition-colors"
                />
            </div>
        </div>
    );
};
