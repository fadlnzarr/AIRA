
import React from 'react';
import { Eye, MoreHorizontal, PhoneIncoming, PhoneOutgoing } from 'lucide-react';
import { StatusBadge } from '../../ui/StatusBadge';

// Mock Data Types
export interface Call {
    id: string;
    date: string;
    time: string;
    caller: string;
    intent: string;
    outcome: string;
    statusType: 'success' | 'neutral' | 'warning' | 'error';
    duration: string;
    direction: 'inbound' | 'outbound';
    service: string;
}

interface CallsTableProps {
    calls: Call[];
    onRowClick: (call: Call) => void;
}

export const CallsTable: React.FC<CallsTableProps> = ({ calls, onRowClick }) => {
    return (
        <div className="w-full overflow-x-auto rounded-xl border border-[#1A1A1A]/10 bg-white/40 backdrop-blur-md shadow-sm">
            <table className="w-full text-left border-collapse">
                <thead className="bg-[#1A1A1A]/5 text-xs uppercase tracking-wider text-[#1A1A1A]/60 font-medium">
                    <tr>
                        <th className="px-6 py-4 border-b border-[#1A1A1A]/5">Date & Time</th>
                        <th className="px-6 py-4 border-b border-[#1A1A1A]/5">Caller</th>
                        <th className="px-6 py-4 border-b border-[#1A1A1A]/5">Intent</th>
                        <th className="px-6 py-4 border-b border-[#1A1A1A]/5">Outcome</th>
                        <th className="px-6 py-4 border-b border-[#1A1A1A]/5">Duration</th>
                        <th className="px-6 py-4 border-b border-[#1A1A1A]/5 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#1A1A1A]/5 text-sm">
                    {calls.map((call) => (
                        <tr
                            key={call.id}
                            onClick={() => onRowClick(call)}
                            className="group hover:bg-[#1A1A1A]/5 transition-colors cursor-pointer"
                        >
                            <td className="px-6 py-4 whitespace-nowrap text-[#1A1A1A]/70">
                                <div className="flex flex-col">
                                    <span className="text-[#1A1A1A] font-medium">{call.date}</span>
                                    <span className="text-xs text-[#1A1A1A]/50">{call.time}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-[#1A1A1A]/5 flex items-center justify-center text-[#1A1A1A]/50">
                                        {call.direction === 'inbound' ? <PhoneIncoming className="w-4 h-4" /> : <PhoneOutgoing className="w-4 h-4" />}
                                    </div>
                                    <span className="text-[#1A1A1A]">{call.caller}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-[#1A1A1A]/80">
                                {call.intent}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <StatusBadge status={call.statusType}>
                                    {call.outcome}
                                </StatusBadge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-[#1A1A1A]/60 font-mono text-xs">
                                {call.duration}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 hover:bg-[#1A1A1A]/10 rounded-lg text-[#1A1A1A]/50 hover:text-[#1A1A1A] transition-colors">
                                        <Eye className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 hover:bg-[#1A1A1A]/10 rounded-lg text-[#1A1A1A]/50 hover:text-[#1A1A1A] transition-colors">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}

                    {calls.length === 0 && (
                        <tr>
                            <td colSpan={6} className="px-6 py-12 text-center text-[#1A1A1A]/30">
                                No calls found matching your filters.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
