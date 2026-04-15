
import React from 'react';
import { Search, LayoutList, CalendarDays, CheckCircle2, Clock, XCircle, RotateCcw } from 'lucide-react';
import { CustomDropdown } from '../../ui/CustomDropdown';
import { DateRangePicker, DateRange, DEFAULT_DATE_RANGE } from '../../ui/DateRangePicker';

export interface AppointmentsFilterState {
    status: string;
    search: string;
    dateRange: DateRange;
}

export const DEFAULT_APPOINTMENTS_FILTERS: AppointmentsFilterState = {
    status: '',
    search: '',
    dateRange: DEFAULT_DATE_RANGE,
};

interface AppointmentsFilterProps {
    view: 'list' | 'calendar';
    onViewChange: (view: 'list' | 'calendar') => void;
    filters: AppointmentsFilterState;
    onFilterChange: (filters: AppointmentsFilterState) => void;
    statusCounts?: Record<string, number>;
}

const statusOptions = [
    { value: 'confirmed', label: 'Confirmed', icon: <CheckCircle2 className="w-3 h-3" /> },
    { value: 'pending', label: 'Pending', icon: <Clock className="w-3 h-3" /> },
    { value: 'cancelled', label: 'Cancelled', icon: <XCircle className="w-3 h-3" /> },
    { value: 'rescheduled', label: 'Rescheduled', icon: <RotateCcw className="w-3 h-3" /> },
];

export const AppointmentsFilter: React.FC<AppointmentsFilterProps> = ({ view, onViewChange, filters, onFilterChange, statusCounts }) => {
    const update = (key: keyof AppointmentsFilterState, value: any) => {
        onFilterChange({ ...filters, [key]: value });
    };

    const clearAll = () => {
        onFilterChange(DEFAULT_APPOINTMENTS_FILTERS);
    };

    const hasFilters = filters.status || filters.search || (filters.dateRange.label !== 'All Time');

    return (
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center py-4 border-b border-[#1A1A1A]/5">
            <div className="flex flex-wrap items-center gap-3">
                {/* View Toggle */}
                <div className="flex bg-[#1A1A1A]/5 border border-[#1A1A1A]/10 rounded-xl p-1">
                    <button
                        onClick={() => onViewChange('list')}
                        className={`p-1.5 rounded-lg transition-all ${view === 'list' ? 'bg-white shadow-sm text-[#1A1A1A]' : 'text-[#1A1A1A]/40 hover:text-[#1A1A1A] hover:bg-[#1A1A1A]/5'}`}
                        title="List View"
                    >
                        <LayoutList className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onViewChange('calendar')}
                        className={`p-1.5 rounded-lg transition-all ${view === 'calendar' ? 'bg-white shadow-sm text-[#1A1A1A]' : 'text-[#1A1A1A]/40 hover:text-[#1A1A1A] hover:bg-[#1A1A1A]/5'}`}
                        title="Calendar View"
                    >
                        <CalendarDays className="w-4 h-4" />
                    </button>
                </div>

                {/* Date Range */}
                <DateRangePicker
                    value={filters.dateRange}
                    onChange={(range) => update('dateRange', range)}
                />

                {/* Status Filter */}
                <CustomDropdown
                    options={statusOptions.map(opt => ({
                        ...opt,
                        label: statusCounts ? `${opt.label} (${statusCounts[opt.value] || 0})` : opt.label
                    }))}
                    value={filters.status}
                    onChange={(v) => update('status', v)}
                    placeholder="All Statuses"
                />

                {hasFilters && (
                    <button
                        onClick={clearAll}
                        className="text-xs text-[#1A1A1A]/40 hover:text-[#1A1A1A] transition-colors px-2 py-1 rounded-lg hover:bg-[#1A1A1A]/5"
                    >
                        Clear
                    </button>
                )}
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A1A1A]/30" />
                <input
                    type="text"
                    placeholder="Search appointments..."
                    value={filters.search}
                    onChange={(e) => update('search', e.target.value)}
                    className="pl-9 pr-4 py-2 bg-[#1A1A1A]/5 border border-[#1A1A1A]/10 rounded-xl text-sm text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 focus:outline-none focus:border-[#1A1A1A]/30 w-full md:w-64 transition-colors"
                />
            </div>
        </div>
    );
};
