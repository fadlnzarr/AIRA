
import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { AppointmentsFilter, AppointmentsFilterState, DEFAULT_APPOINTMENTS_FILTERS } from '../../components/dashboard/appointments/AppointmentsFilter';
import { AppointmentsList, Appointment } from '../../components/dashboard/appointments/AppointmentsList';
import { AppointmentsCalendar } from '../../components/dashboard/appointments/AppointmentsCalendar';
import { AppointmentDrawer } from '../../components/dashboard/appointments/AppointmentDrawer';
import { DataStatusBar } from '../../components/dashboard/DataStatusBar';
import { useGoogleSheets } from '../../src/lib/useGoogleSheets';
import { fetchAppointments } from '../../src/lib/googleSheets';
import { useClientSheetId } from '../../src/lib/useClientSheetId';
import { Loader2 } from 'lucide-react';

function parseDate(dateStr: string): Date | null {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? null : d;
}

export const Appointments: React.FC = () => {
    const [view, setView] = useState<'list' | 'calendar'>('list');
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
    const [filters, setFilters] = useState<AppointmentsFilterState>(DEFAULT_APPOINTMENTS_FILTERS);

    const sheetId = useClientSheetId();
    const appointmentsFetcher = useCallback(() => fetchAppointments(sheetId), [sheetId]);
    const { data: appointments, loading, error, lastUpdated, refresh } = useGoogleSheets(appointmentsFetcher, [sheetId]);

    const statusCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        if (appointments) {
            appointments.forEach(apt => {
                const status = apt.status;
                counts[status] = (counts[status] || 0) + 1;
            });
        }
        return counts;
    }, [appointments]);

    const filteredAppointments = useMemo(() => {
        if (!appointments) return [];
        return appointments.filter(apt => {
            if (filters.status && apt.status !== filters.status) return false;
            if (filters.search) {
                const q = filters.search.toLowerCase();
                const searchable = `${apt.clientName} ${apt.service} ${apt.staff} ${apt.date}`.toLowerCase();
                if (!searchable.includes(q)) return false;
            }
            if (filters.dateRange.from && filters.dateRange.to) {
                const d = parseDate(apt.date);
                if (d && (d < filters.dateRange.from || d > filters.dateRange.to)) return false;
            }
            return true;
        });
    }, [appointments, filters]);

    return (
        <div className="space-y-6">
            <div className="flex items-end justify-between">
                <div>
                    <h2 className="text-2xl font-serif italic text-[#1A1A1A] mb-1">
                        Appointments
                    </h2>
                    <p className="text-[#1A1A1A]/60 text-sm">
                        Manage your upcoming bookings and schedule.
                    </p>
                </div>
                <DataStatusBar loading={loading} error={error} lastUpdated={lastUpdated} onRefresh={refresh} />
            </div>

            <AppointmentsFilter view={view} onViewChange={setView} filters={filters} onFilterChange={setFilters} statusCounts={statusCounts} />

            <motion.div
                key={view}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
            >
                {loading && !appointments ? (
                    <div className="flex items-center justify-center py-20 text-[#1A1A1A]/40">
                        <Loader2 className="w-6 h-6 animate-spin mr-2" />
                        Loading appointments...
                    </div>
                ) : view === 'list' ? (
                    <AppointmentsList
                        appointments={filteredAppointments}
                        onRowClick={(apt) => setSelectedAppointment(apt)}
                    />
                ) : (
                    <AppointmentsCalendar />
                )}
            </motion.div>

            <AppointmentDrawer
                isOpen={!!selectedAppointment}
                onClose={() => setSelectedAppointment(null)}
                appointmentData={selectedAppointment}
            />
        </div>
    );
};
