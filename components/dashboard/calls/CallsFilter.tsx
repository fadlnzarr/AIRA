
import React from 'react';
import { Search, CheckCircle, AlertCircle, MinusCircle, ArrowRight } from 'lucide-react';
import { CustomDropdown } from '../../ui/CustomDropdown';
import { DateRangePicker, DateRange, DEFAULT_DATE_RANGE } from '../../ui/DateRangePicker';

export interface CallsFilterState {
    outcome: string;
    search: string;
    dateRange: DateRange;
}

export const DEFAULT_CALLS_FILTERS: CallsFilterState = {
    outcome: '',
    search: '',
    dateRange: DEFAULT_DATE_RANGE,
};

interface CallsFilterProps {
    filters: CallsFilterState;
    onFilterChange: (filters: CallsFilterState) => void;
    outcomeCounts?: Record<string, number>;
}

const outcomeOptions = [
    { value: 'Appointment Booked', label: 'Booked', icon: <CheckCircle className="w-3 h-3" />, description: 'Call resulted in a booking' },
    { value: 'Lead Captured', label: 'Lead Captured', icon: <AlertCircle className="w-3 h-3" />, description: 'Prospect needs follow-up' },
    { value: 'No Action', label: 'No Action', icon: <MinusCircle className="w-3 h-3" />, description: 'Cold lead, no interest' },
    { value: 'Follow Up', label: 'Follow Up', icon: <ArrowRight className="w-3 h-3" />, description: 'Warm lead, needs callback' },
];

export const CallsFilter: React.FC<CallsFilterProps> = ({ filters, onFilterChange, outcomeCounts }) => {
    const update = (key: keyof CallsFilterState, value: any) => {
        onFilterChange({ ...filters, [key]: value });
    };

    const clearAll = () => {
        onFilterChange(DEFAULT_CALLS_FILTERS);
    };

    const hasFilters = filters.outcome || filters.search || (filters.dateRange.label !== 'All Time');

    return (
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center py-4 border-b border-[#1A1A1A]/5">
            <div className="flex flex-wrap items-center gap-3">
                {/* Date Range */}
                <DateRangePicker
                    value={filters.dateRange}
                    onChange={(range) => update('dateRange', range)}
                />

                {/* Outcome Filter */}
                <CustomDropdown
                    options={outcomeOptions.map(opt => ({
                        ...opt,
                        label: outcomeCounts ? `${opt.label} (${outcomeCounts[opt.value] || 0})` : opt.label
                    }))}
                    value={filters.outcome}
                    onChange={(v) => update('outcome', v)}
                    placeholder="All Outcomes"
                />

                {hasFilters && (
                    <button
                        onClick={clearAll}
                        className="text-xs text-[#1A1A1A]/40 hover:text-[#1A1A1A] transition-colors px-2 py-1 rounded-lg hover:bg-[#1A1A1A]/5"
                    >
                        Clear Filters
                    </button>
                )}
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A1A1A]/30" />
                <input
                    type="text"
                    placeholder="Search transcripts..."
                    value={filters.search}
                    onChange={(e) => update('search', e.target.value)}
                    className="pl-9 pr-4 py-2 bg-[#1A1A1A]/5 border border-[#1A1A1A]/10 rounded-xl text-sm text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 focus:outline-none focus:border-[#1A1A1A]/30 w-full md:w-64 transition-colors"
                />
            </div>
        </div>
    );
};
