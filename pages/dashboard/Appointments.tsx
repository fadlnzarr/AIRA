
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AppointmentsFilter } from '../../components/dashboard/appointments/AppointmentsFilter';
import { AppointmentsList, Appointment } from '../../components/dashboard/appointments/AppointmentsList';
import { AppointmentsCalendar } from '../../components/dashboard/appointments/AppointmentsCalendar';
import { AppointmentDrawer } from '../../components/dashboard/appointments/AppointmentDrawer';

// Mock Data
const MOCK_APPOINTMENTS: Appointment[] = [
    {
        id: '1',
        date: 'Nov 14, 2024',
        time: '2:00 PM',
        clientName: 'Alice Freeman',
        service: 'Capture AI Demo',
        staff: 'Fadil N.',
        status: 'confirmed',
        statusType: 'success',
        source: 'ai',
        notes: 'Client is very interested in the multi-lingual support.'
    },
    {
        id: '2',
        date: 'Nov 14, 2024',
        time: '4:30 PM',
        clientName: 'TechCorp Inc.',
        service: 'Consultation',
        staff: 'Sarah M.',
        status: 'pending',
        statusType: 'warning',
        source: 'manual'
    },
    {
        id: '3',
        date: 'Nov 15, 2024',
        time: '10:00 AM',
        clientName: 'John Doe',
        service: 'Troubleshooting',
        staff: 'Support Team',
        status: 'cancelled',
        statusType: 'error',
        source: 'ai'
    },
    {
        id: '4',
        date: 'Nov 16, 2024',
        time: '1:00 PM',
        clientName: 'Real Estate Pros',
        service: 'Setup Call',
        staff: 'Fadil N.',
        status: 'confirmed',
        statusType: 'success',
        source: 'manual'
    }
];

export const Appointments: React.FC = () => {
    const [view, setView] = useState<'list' | 'calendar'>('list');
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

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
            </div>

            <AppointmentsFilter view={view} onViewChange={setView} />

            <motion.div
                key={view}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
            >
                {view === 'list' ? (
                    <AppointmentsList
                        appointments={MOCK_APPOINTMENTS}
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
