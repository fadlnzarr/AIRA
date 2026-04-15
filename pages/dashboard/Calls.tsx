
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CallsFilter, CallsFilterState, DEFAULT_CALLS_FILTERS } from '../../components/dashboard/calls/CallsFilter';
import { CallsTable, Call } from '../../components/dashboard/calls/CallsTable';
import { CallDrawer } from '../../components/dashboard/calls/CallDrawer';
import { DataStatusBar } from '../../components/dashboard/DataStatusBar';
import { useGoogleSheets } from '../../src/lib/useGoogleSheets';
import { fetchCalls } from '../../src/lib/googleSheets';
import { Loader2 } from 'lucide-react';

function parseDate(dateStr: string): Date | null {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? null : d;
}

export const Calls: React.FC = () => {
    const [selectedCall, setSelectedCall] = useState<Call | null>(null);
    const [filters, setFilters] = useState<CallsFilterState>(DEFAULT_CALLS_FILTERS);

    const { data: calls, loading, error, lastUpdated, refresh } = useGoogleSheets(fetchCalls);

    const outcomeCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        if (calls) {
            calls.forEach(call => {
                const outcome = call.outcome;
                counts[outcome] = (counts[outcome] || 0) + 1;
            });
        }
        return counts;
    }, [calls]);

    const filteredCalls = useMemo(() => {
        if (!calls) return [];
        return calls.filter(call => {
            if (filters.outcome && call.outcome !== filters.outcome) return false;
            if (filters.search) {
                const q = filters.search.toLowerCase();
                const searchable = `${call.caller} ${call.intent} ${call.outcome} ${call.date}`.toLowerCase();
                if (!searchable.includes(q)) return false;
            }
            if (filters.dateRange.from && filters.dateRange.to) {
                const d = parseDate(call.date);
                if (d && (d < filters.dateRange.from || d > filters.dateRange.to)) return false;
            }
            return true;
        });
    }, [calls, filters]);

    return (
        <div className="space-y-6">
            <div className="flex items-end justify-between">
                <div>
                    <h2 className="text-2xl font-serif italic text-[#1A1A1A] mb-1">
                        Call Logs
                    </h2>
                    <p className="text-[#1A1A1A]/60 text-sm">
                        View and manage your AI agent's conversations.
                    </p>
                </div>
                <DataStatusBar loading={loading} error={error} lastUpdated={lastUpdated} onRefresh={refresh} />
            </div>

            <CallsFilter filters={filters} onFilterChange={setFilters} outcomeCounts={outcomeCounts} />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                {loading && !calls ? (
                    <div className="flex items-center justify-center py-20 text-[#1A1A1A]/40">
                        <Loader2 className="w-6 h-6 animate-spin mr-2" />
                        Loading call logs...
                    </div>
                ) : (
                    <CallsTable
                        calls={filteredCalls}
                        onRowClick={(call) => setSelectedCall(call)}
                    />
                )}
            </motion.div>

            <CallDrawer
                isOpen={!!selectedCall}
                onClose={() => setSelectedCall(null)}
                callData={selectedCall}
            />
        </div>
    );
};
