
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LeadsFilter } from '../../components/dashboard/leads/LeadsFilter';
import { LeadsTable, Lead } from '../../components/dashboard/leads/LeadsTable';
import { LeadsDrawer } from '../../components/dashboard/leads/LeadsDrawer';

// Mock Data
const MOCK_LEADS: Lead[] = [
    {
        id: '1',
        name: 'Michael Chen',
        email: 'm.chen@realtysolutions.com',
        phone: '+1 (415) 555-0123',
        service: 'Capture AI',
        urgency: 'high',
        status: 'new',
        statusType: 'neutral', // New = Neutral usually, or blue
        assignedTo: 'Sarah M.',
        createdDate: 'Oct 31, 2:45 PM',
        summary: 'Urgent request for AI receptionist deployment. Dealing with high volume of missed calls. Wants to start trial immediately.'
    },
    {
        id: '2',
        name: 'Emma Wilson',
        email: 'emma.w@techstart.io',
        phone: '+1 (555) 123-9876',
        service: 'Support Gen',
        urgency: 'medium',
        status: 'contacted',
        statusType: 'warning', // In progress/Contacted
        assignedTo: 'James R.',
        createdDate: 'Oct 30, 9:15 AM'
    },
    {
        id: '3',
        name: 'Robert Fox',
        email: 'r.fox@logistics.net',
        phone: '+1 (555) 456-7890',
        service: 'Capture AI',
        urgency: 'low',
        status: 'qualified',
        statusType: 'success',
        assignedTo: 'Sarah M.',
        createdDate: 'Oct 28, 4:20 PM'
    },
    {
        id: '4',
        name: 'Sarah Connor',
        email: 's.connor@cyberdyne.co',
        phone: '+1 (555) 999-0000',
        service: 'Capture AI',
        urgency: 'high',
        status: 'closed',
        statusType: 'success', // Won
        assignedTo: 'Terminator T.',
        createdDate: 'Oct 25, 11:00 AM'
    },
];

export const Leads: React.FC = () => {
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

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
            </div>

            <LeadsFilter />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <LeadsTable
                    leads={MOCK_LEADS}
                    onRowClick={(lead) => setSelectedLead(lead)}
                />
            </motion.div>

            <LeadsDrawer
                isOpen={!!selectedLead}
                onClose={() => setSelectedLead(null)}
                leadData={selectedLead}
            />
        </div>
    );
};
