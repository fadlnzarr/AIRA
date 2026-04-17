
import React from 'react';
import { Search, CheckCircle, XCircle, Clock } from 'lucide-react';
import { CustomDropdown } from '../../ui/CustomDropdown';

export interface CustomersFilterState {
    status: string;
    type: string;
    search: string;
}

export const DEFAULT_CUSTOMERS_FILTERS: CustomersFilterState = {
    status: '',
    type: '',
    search: '',
};

interface CustomersFilterProps {
    filters: CustomersFilterState;
    onFilterChange: (filters: CustomersFilterState) => void;
    statusCounts?: Record<string, number>;
    typeCounts?: Record<string, number>;
}

const statusOptions = [
    { value: 'active', label: 'Active', icon: <CheckCircle className="w-3 h-3" /> },
    { value: 'inactive', label: 'Inactive', icon: <XCircle className="w-3 h-3" /> },
    { value: 'pending', label: 'Pending', icon: <Clock className="w-3 h-3" /> },
];

export const CustomersFilter: React.FC<CustomersFilterProps> = ({ filters, onFilterChange, statusCounts, typeCounts }) => {
    const update = (key: keyof CustomersFilterState, value: any) => {
        onFilterChange({ ...filters, [key]: value });
    };

    const clearAll = () => {
        onFilterChange(DEFAULT_CUSTOMERS_FILTERS);
    };

    const hasFilters = filters.status || filters.type || filters.search;

    // Build type options dynamically from data
    const typeOptions = typeCounts
        ? Object.keys(typeCounts).map(t => ({
              value: t,
              label: `${t} (${typeCounts[t]})`,
          }))
        : [];

    return (
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center py-4 border-b border-[#1A1A1A]/5">
            <div className="flex flex-wrap items-center gap-3">
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

                {/* Type Filter */}
                {typeOptions.length > 0 && (
                    <CustomDropdown
                        options={typeOptions}
                        value={filters.type}
                        onChange={(v) => update('type', v)}
                        placeholder="All Types"
                    />
                )}

                {hasFilters && (
                    <button
                        onClick={clearAll}
                        className="text-xs text-[#1A1A1A]/40 hover:text-[#1A1A1A] transition-colors px-2 py-1 rounded-lg hover:bg-[#1A1A1A]/5"
                    >
                        Clear Filters
                    </button>
                )}
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:flex-none">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A1A1A]/30" />
                    <input
                        type="text"
                        placeholder="Search customers..."
                        value={filters.search}
                        onChange={(e) => update('search', e.target.value)}
                        className="pl-9 pr-4 py-2 bg-[#1A1A1A]/5 border border-[#1A1A1A]/10 rounded-xl text-sm text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 focus:outline-none focus:border-[#1A1A1A]/30 w-full md:w-64 transition-colors"
                    />
                </div>
            </div>
        </div>
    );
};
