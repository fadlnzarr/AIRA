
import React from 'react';
import { MoreHorizontal, ArrowUpRight } from 'lucide-react';
import { StatusBadge } from '../../ui/StatusBadge';
import { UrgencyBadge } from '../../ui/UrgencyBadge';

export interface Lead {
    id: string;
    name: string;
    email: string;
    phone: string;
    service: string;
    urgency: 'high' | 'medium' | 'low';
    status: 'new' | 'contacted' | 'qualified' | 'closed';
    statusType: 'neutral' | 'warning' | 'success' | 'error'; // Mapping for badge
    assignedTo: string;
    createdDate: string;
    summary?: string;
}

interface LeadsTableProps {
    leads: Lead[];
    onRowClick: (lead: Lead) => void;
}

export const LeadsTable: React.FC<LeadsTableProps> = ({ leads, onRowClick }) => {
    return (
        <div className="w-full overflow-x-auto rounded-xl border border-[#1A1A1A]/10 bg-white/40 backdrop-blur-md shadow-sm">
            <table className="w-full text-left border-collapse">
                <thead className="bg-[#1A1A1A]/5 text-xs uppercase tracking-wider text-[#1A1A1A]/60 font-medium">
                    <tr>
                        <th className="px-6 py-4 border-b border-[#1A1A1A]/5">Name</th>
                        <th className="px-6 py-4 border-b border-[#1A1A1A]/5">Service Requested</th>
                        <th className="px-6 py-4 border-b border-[#1A1A1A]/5">Urgency</th>
                        <th className="px-6 py-4 border-b border-[#1A1A1A]/5">Status</th>
                        <th className="px-6 py-4 border-b border-[#1A1A1A]/5">Assigned To</th>
                        <th className="px-6 py-4 border-b border-[#1A1A1A]/5">Date</th>
                        <th className="px-6 py-4 border-b border-[#1A1A1A]/5 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#1A1A1A]/5 text-sm">
                    {leads.map((lead) => (
                        <tr
                            key={lead.id}
                            onClick={() => onRowClick(lead)}
                            className="group hover:bg-[#1A1A1A]/5 transition-colors cursor-pointer"
                        >
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex flex-col">
                                    <span className="text-[#1A1A1A] font-medium">{lead.name}</span>
                                    <span className="text-xs text-[#1A1A1A]/50">{lead.phone}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-[#1A1A1A]/70">
                                {lead.service}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <UrgencyBadge level={lead.urgency} />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <StatusBadge status={lead.statusType}>
                                    {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                                </StatusBadge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-[#1A1A1A]/60">
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full bg-[#1A1A1A]/10 flex items-center justify-center text-[10px] uppercase text-[#1A1A1A]">
                                        {lead.assignedTo.charAt(0)}
                                    </div>
                                    {lead.assignedTo}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-[#1A1A1A]/50 text-xs">
                                {lead.createdDate}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 hover:bg-[#1A1A1A]/10 rounded-lg text-[#1A1A1A]/50 hover:text-[#1A1A1A] transition-colors">
                                        <ArrowUpRight className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 hover:bg-[#1A1A1A]/10 rounded-lg text-[#1A1A1A]/50 hover:text-[#1A1A1A] transition-colors">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}

                    {leads.length === 0 && (
                        <tr>
                            <td colSpan={7} className="px-6 py-12 text-center text-[#1A1A1A]/30">
                                No leads found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
