
import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export interface Lead {
    id: string;
    name: string;
    email: string;
    phone: string;
    service: string;       // Lead Reason (shown in drawer)
    urgency: 'high' | 'medium' | 'low';
    status: 'new' | 'contacted' | 'qualified' | 'closed';
    statusType: 'neutral' | 'warning' | 'success' | 'error';
    sentiment: string;
    followUp: boolean;
    assignedTo: string;
    createdDate: string;
    summary?: string;
}

// ── Badge helpers (Vercel / shadcn style: soft semantic tints) ──────────────

function statusBadge(status: string): string {
    switch (status) {
        case 'qualified': return 'bg-emerald-100 text-[#1A1A1A] ring-1 ring-emerald-200';
        case 'contacted': return 'bg-sky-100 text-[#1A1A1A] ring-1 ring-sky-200';
        case 'new':       return 'bg-violet-100 text-[#1A1A1A] ring-1 ring-violet-200';
        case 'closed':    return 'bg-zinc-100 text-[#1A1A1A] ring-1 ring-zinc-200';
        default:          return 'bg-zinc-100 text-[#1A1A1A] ring-1 ring-zinc-200';
    }
}

function urgencyBadge(level: string) {
    switch (level) {
        case 'high':   return 'bg-red-100 text-[#1A1A1A] ring-1 ring-red-200';
        case 'medium': return 'bg-amber-100 text-[#1A1A1A] ring-1 ring-amber-200';
        case 'low':    return 'bg-zinc-100 text-[#1A1A1A] ring-1 ring-zinc-200';
        default:       return 'bg-zinc-100 text-[#1A1A1A] ring-1 ring-zinc-200';
    }
}

function sentimentBadge(sentiment: string) {
    const s = (sentiment || '').toLowerCase();
    if (s === 'positive') return 'bg-emerald-100 text-[#1A1A1A] ring-1 ring-emerald-200';
    if (s === 'negative') return 'bg-red-100 text-[#1A1A1A] ring-1 ring-red-200';
    return 'bg-zinc-100 text-[#1A1A1A] ring-1 ring-zinc-200';
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
                        <th className="px-6 py-4 border-b border-[#1A1A1A]/5">Lead Status</th>
                        <th className="px-6 py-4 border-b border-[#1A1A1A]/5">Sentiment</th>
                        <th className="px-6 py-4 border-b border-[#1A1A1A]/5">Urgency</th>
                        <th className="px-6 py-4 border-b border-[#1A1A1A]/5">Follow Up</th>
                        <th className="px-6 py-4 border-b border-[#1A1A1A]/5">Date</th>
                        <th className="px-6 py-4 border-b border-[#1A1A1A]/5 text-right">Details</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#1A1A1A]/5 text-sm">
                    {leads.map((lead) => (
                        <tr
                            key={lead.id}
                            onClick={() => onRowClick(lead)}
                            className="group hover:bg-[#1A1A1A]/5 transition-colors cursor-pointer"
                        >
                            {/* Name + phone */}
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex flex-col">
                                    <span className="text-[#1A1A1A] font-medium">{lead.name}</span>
                                    <span className="text-xs text-[#1A1A1A]/50">{lead.phone}</span>
                                </div>
                            </td>

                            {/* Lead Status */}
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge(lead.status)}`}>
                                    {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                                </span>
                            </td>

                            {/* Sentiment */}
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${sentimentBadge(lead.sentiment)}`}>
                                    {lead.sentiment || 'Neutral'}
                                </span>
                            </td>

                            {/* Urgency */}
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${urgencyBadge(lead.urgency)}`}>
                                    {lead.urgency === 'high' ? 'High' : lead.urgency === 'medium' ? 'Medium' : 'Low'}
                                </span>
                            </td>

                            {/* Follow Up */}
                            <td className="px-6 py-4 whitespace-nowrap">
                                {lead.followUp ? (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-[#1A1A1A] ring-1 ring-amber-200">
                                        Yes
                                    </span>
                                ) : (
                                    <span className="text-xs text-zinc-400">—</span>
                                )}
                            </td>

                            {/* Date */}
                            <td className="px-6 py-4 whitespace-nowrap text-[#1A1A1A]/50 text-xs">
                                {lead.createdDate}
                            </td>

                            {/* Action */}
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-[#1A1A1A]/10 rounded-lg text-[#1A1A1A]/50 hover:text-[#1A1A1A]">
                                    <ArrowUpRight className="w-4 h-4" />
                                </button>
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
