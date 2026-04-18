
import React from 'react';
import { Search, Flame, UserCheck, Award, XCircle } from 'lucide-react';
import { CustomDropdown } from '../../ui/CustomDropdown';
import { DateRangePicker, DateRange, DEFAULT_DATE_RANGE } from '../../ui/DateRangePicker';

export interface LeadsFilterState {
    status: string;
    urgency: string;
    search: string;
    dateRange: DateRange;
}

export const DEFAULT_LEADS_FILTERS: LeadsFilterState = {
    status: '',
    urgency: '',
    search: '',
    dateRange: DEFAULT_DATE_RANGE,
};

interface LeadsFilterProps {
    filters: LeadsFilterState;
    onFilterChange: (filters: LeadsFilterState) => void;
    statusCounts?: Record<string, number>;
    urgencyCounts?: Record<string, number>;
}

const statusOptions = [
    { value: 'new', label: 'New Lead', icon: <Flame className="w-3 h-3" /> },
    { value: 'contacted', label: 'Contacted', icon: <UserCheck className="w-3 h-3" /> },
    { value: 'qualified', label: 'Qualified', icon: <Award className="w-3 h-3" /> },
    { value: 'closed', label: 'Closed', icon: <XCircle className="w-3 h-3" /> },
];

const urgencyOptions = [
    { value: 'high', label: 'High Priority', description: 'Needs immediate attention' },
    { value: 'medium', label: 'Medium', description: 'Follow up within 24h' },
    { value: 'low', label: 'Low', description: 'Non-urgent inquiry' },
];

export const LeadsFilter: React.FC<LeadsFilterProps> = ({ filters, onFilterChange, statusCounts, urgencyCounts }) => {
    const update = (key: keyof LeadsFilterState, value: any) => {
        onFilterChange({ ...filters, [key]: value });
    };

    const clearAll = () => {
        onFilterChange(DEFAULT_LEADS_FILTERS);
    };

    const hasFilters = filters.status || filters.urgency || filters.search || (filters.dateRange.label !== 'All Time');

    return (
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center py-4 border-b border-[#1A1A1A]/5">
            <div className="flex flex-wrap items-center gap-3">
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

                {/* Urgency Filter */}
                <CustomDropdown
                    options={urgencyOptions.map(opt => ({
                        ...opt,
                        label: urgencyCounts ? `${opt.label} (${urgencyCounts[opt.value] || 0})` : opt.label
                    }))}
                    value={filters.urgency}
                    onChange={(v) => update('urgency', v)}
                    placeholder="All Priorities"
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

            {/* Actions */}
            <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:flex-none">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A1A1A]/30" />
                    <input
                        type="text"
                        placeholder="Search leads..."
                        value={filters.search}
                        onChange={(e) => update('search', e.target.value)}
                        className="pl-9 pr-4 py-2 bg-[#1A1A1A]/5 border border-[#1A1A1A]/10 rounded-xl text-sm text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 focus:outline-none focus:border-[#1A1A1A]/30 w-full md:w-64 transition-colors"
                    />
                </div>

            </div>
        </div>
    );
};
