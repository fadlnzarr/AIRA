
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { LeadsFilter, LeadsFilterState, DEFAULT_LEADS_FILTERS } from '../../components/dashboard/leads/LeadsFilter';
import { LeadsTable, Lead } from '../../components/dashboard/leads/LeadsTable';
import { LeadsDrawer } from '../../components/dashboard/leads/LeadsDrawer';
import { DataStatusBar } from '../../components/dashboard/DataStatusBar';
import { useGoogleSheets } from '../../src/lib/useGoogleSheets';
import { fetchLeads } from '../../src/lib/googleSheets';
import { Loader2 } from 'lucide-react';

function parseDate(dateStr: string): Date | null {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? null : d;
}

export const Leads: React.FC = () => {
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [filters, setFilters] = useState<LeadsFilterState>(DEFAULT_LEADS_FILTERS);

    const { data: leads, loading, error, lastUpdated, refresh } = useGoogleSheets(fetchLeads);

    const filteredLeads = useMemo(() => {
        if (!leads) return [];
        return leads.filter(lead => {
            if (filters.status && lead.status !== filters.status) return false;
            if (filters.urgency && lead.urgency !== filters.urgency) return false;
            if (filters.search) {
                const q = filters.search.toLowerCase();
                const searchable = `${lead.name} ${lead.email} ${lead.phone} ${lead.summary || ''}`.toLowerCase();
                if (!searchable.includes(q)) return false;
            }
            if (filters.dateRange.from && filters.dateRange.to) {
                const d = parseDate(lead.createdDate);
                if (d && (d < filters.dateRange.from || d > filters.dateRange.to)) return false;
            }
            return true;
        });
    }, [leads, filters]);

    return (
        <div className="space-y-6">
            <div className="flex items-end justify-between">
                <div>
                    <h2 className="text-2xl font-serif italic text-[#1A1A1A] mb-1">
                        Leads Management
                    </h2>
                    <p className="text-[#1A1A1A]/60 text-sm">
                        Track, assign, and convert incoming leads.
                    </p>
                </div>
                <DataStatusBar loading={loading} error={error} lastUpdated={lastUpdated} onRefresh={refresh} />
            </div>

            <LeadsFilter filters={filters} onFilterChange={setFilters} />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                {loading && !leads ? (
                    <div className="flex items-center justify-center py-20 text-[#1A1A1A]/40">
                        <Loader2 className="w-6 h-6 animate-spin mr-2" />
                        Loading leads...
                    </div>
                ) : (
                    <LeadsTable
                        leads={filteredLeads}
                        onRowClick={(lead) => setSelectedLead(lead)}
                    />
                )}
            </motion.div>

            <LeadsDrawer
                isOpen={!!selectedLead}
                onClose={() => setSelectedLead(null)}
                leadData={selectedLead}
            />
        </div>
    );
};
