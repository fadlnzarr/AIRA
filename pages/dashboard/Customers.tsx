
import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { CustomersFilter, CustomersFilterState, DEFAULT_CUSTOMERS_FILTERS } from '../../components/dashboard/customers/CustomersFilter';
import { CustomersTable } from '../../components/dashboard/customers/CustomersTable';
import { CustomerDrawer } from '../../components/dashboard/customers/CustomerDrawer';
import { DataStatusBar } from '../../components/dashboard/DataStatusBar';
import { useGoogleSheets } from '../../src/lib/useGoogleSheets';
import { fetchCustomersList } from '../../src/lib/googleSheets';
import { useClientSheetId } from '../../src/lib/useClientSheetId';
import type { Customer } from '../../src/lib/googleSheets';
import { Loader2 } from 'lucide-react';

export const Customers: React.FC = () => {
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [filters, setFilters] = useState<CustomersFilterState>(DEFAULT_CUSTOMERS_FILTERS);

    const sheetId = useClientSheetId();
    const customersFetcher = useCallback(() => fetchCustomersList(sheetId), [sheetId]);
    const { data: customers, loading, error, lastUpdated, refresh } = useGoogleSheets(customersFetcher, [sheetId]);

    const statusCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        if (customers) {
            customers.forEach(c => {
                counts[c.status] = (counts[c.status] || 0) + 1;
            });
        }
        return counts;
    }, [customers]);

    const typeCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        if (customers) {
            customers.forEach(c => {
                if (c.type && c.type !== '—') {
                    counts[c.type] = (counts[c.type] || 0) + 1;
                }
            });
        }
        return counts;
    }, [customers]);

    const filteredCustomers = useMemo(() => {
        if (!customers) return [];
        return customers.filter(customer => {
            if (filters.status && customer.status !== filters.status) return false;
            if (filters.type && customer.type !== filters.type) return false;
            if (filters.search) {
                const q = filters.search.toLowerCase();
                const searchable = `${customer.name} ${customer.email} ${customer.phone} ${customer.type} ${customer.address}`.toLowerCase();
                if (!searchable.includes(q)) return false;
            }
            return true;
        });
    }, [customers, filters]);

    return (
        <div className="space-y-6">
            <div className="flex items-end justify-between">
                <div>
                    <h2 className="text-2xl font-serif italic text-[#1A1A1A] mb-1">
                        Customers
                    </h2>
                    <p className="text-[#1A1A1A]/60 text-sm">
                        View your customer directory.
                    </p>
                </div>
                <DataStatusBar loading={loading} error={error} lastUpdated={lastUpdated} onRefresh={refresh} />
            </div>

            <CustomersFilter
                filters={filters}
                onFilterChange={setFilters}
                statusCounts={statusCounts}
                typeCounts={typeCounts}
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                {loading && !customers ? (
                    <div className="flex items-center justify-center py-20 text-[#1A1A1A]/40">
                        <Loader2 className="w-6 h-6 animate-spin mr-2" />
                        Loading customers...
                    </div>
                ) : (
                    <CustomersTable
                        customers={filteredCustomers}
                        onRowClick={(customer) => setSelectedCustomer(customer)}
                    />
                )}
            </motion.div>

            <CustomerDrawer
                isOpen={!!selectedCustomer}
                onClose={() => setSelectedCustomer(null)}
                customerData={selectedCustomer}
            />
        </div>
    );
};
