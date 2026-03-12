
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CallsFilter } from '../../components/dashboard/calls/CallsFilter';
import { CallsTable, Call } from '../../components/dashboard/calls/CallsTable';
import { CallDrawer } from '../../components/dashboard/calls/CallDrawer';

// Mock Data
const MOCK_CALLS: Call[] = [
    {
        id: '1',
        date: 'Oct 31',
        time: '2:45 PM',
        caller: '+1 (555) 123-4567',
        intent: 'Book Demo',
        outcome: 'Appointment Booked',
        statusType: 'success',
        duration: '04:15',
        direction: 'inbound',
        service: 'Capture AI'
    },
    {
        id: '2',
        date: 'Oct 31',
        time: '1:12 PM',
        caller: '+1 (555) 987-6543',
        intent: 'Support Inquiry',
        outcome: 'Escalated to Support',
        statusType: 'warning',
        duration: '02:30',
        direction: 'inbound',
        service: 'Support Gen'
    },
    {
        id: '3',
        date: 'Oct 30',
        time: '11:20 AM',
        caller: 'Unknown',
        intent: 'Spam / Robocall',
        outcome: 'Filtered',
        statusType: 'error',
        duration: '00:12',
        direction: 'inbound',
        service: 'Capture AI'
    },
    {
        id: '4',
        date: 'Oct 30',
        time: '10:05 AM',
        caller: '+1 (555) 444-2222',
        intent: 'Pricing Question',
        outcome: 'Lead Captured',
        statusType: 'neutral',
        duration: '03:45',
        direction: 'inbound',
        service: 'Capture AI'
    },
    {
        id: '5',
        date: 'Oct 29',
        time: '4:55 PM',
        caller: '+1 (555) 777-8888',
        intent: 'Scheduling',
        outcome: 'Appointment Booked',
        statusType: 'success',
        duration: '05:10',
        direction: 'inbound',
        service: 'Capture AI'
    }
];

export const Calls: React.FC = () => {
    const [selectedCall, setSelectedCall] = useState<Call | null>(null);

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
            </div>

            <CallsFilter />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <CallsTable
                    calls={MOCK_CALLS}
                    onRowClick={(call) => setSelectedCall(call)}
                />
            </motion.div>

            <CallDrawer
                isOpen={!!selectedCall}
                onClose={() => setSelectedCall(null)}
                callData={selectedCall}
            />
        </div>
    );
};
