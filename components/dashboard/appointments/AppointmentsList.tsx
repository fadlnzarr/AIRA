
import React from 'react';
import { MoreHorizontal, ArrowUpRight, Zap, User } from 'lucide-react';
import { StatusBadge } from '../../ui/StatusBadge';

export interface Appointment {
    id: string;
    date: string;
    time: string;
    clientName: string;
    service: string;
    staff: string;
    status: 'confirmed' | 'pending' | 'cancelled' | 'rescheduled' | 'completed';
    statusType: 'success' | 'warning' | 'error' | 'neutral';
    source: 'ai' | 'manual';
    email?: string;
    phone?: string;
    notes?: string;
}

interface AppointmentsListProps {
    appointments: Appointment[];
    onRowClick: (apt: Appointment) => void;
}

export const AppointmentsList: React.FC<AppointmentsListProps> = ({ appointments, onRowClick }) => {
    return (
        <div className="w-full overflow-x-auto rounded-xl border border-[#1A1A1A]/10 bg-white/40 backdrop-blur-md shadow-sm">
            <table className="w-full text-left border-collapse">
                <thead className="bg-[#1A1A1A]/5 text-xs uppercase tracking-wider text-[#1A1A1A]/60 font-medium">
                    <tr>
                        <th className="px-6 py-4 border-b border-[#1A1A1A]/5">Date & Time</th>
                        <th className="px-6 py-4 border-b border-[#1A1A1A]/5">Client</th>
                        <th className="px-6 py-4 border-b border-[#1A1A1A]/5">Service</th>
                        <th className="px-6 py-4 border-b border-[#1A1A1A]/5">Assigned Staff</th>
                        <th className="px-6 py-4 border-b border-[#1A1A1A]/5">Status</th>
                        <th className="px-6 py-4 border-b border-[#1A1A1A]/5">Source</th>
                        <th className="px-6 py-4 border-b border-[#1A1A1A]/5 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#1A1A1A]/5 text-sm">
                    {appointments.map((apt) => (
                        <tr
                            key={apt.id}
                            onClick={() => onRowClick(apt)}
                            className="group hover:bg-[#1A1A1A]/5 transition-colors cursor-pointer"
                        >
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex flex-col">
                                    <span className="text-[#1A1A1A] font-medium">{apt.date}</span>
                                    <span className="text-xs text-[#1A1A1A]/50">{apt.time}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1A1A1A]/10 to-[#1A1A1A]/5 flex items-center justify-center text-xs font-semibold text-[#1A1A1A]/70">
                                        {apt.clientName.charAt(0)}
                                    </div>
                                    <span className="text-[#1A1A1A]/80">{apt.clientName}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-[#1A1A1A]/70">
                                {apt.service}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-[#1A1A1A]/60">
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full bg-[#1A1A1A]/10 flex items-center justify-center text-[10px] uppercase text-[#1A1A1A]">
                                        {apt.staff.charAt(0)}
                                    </div>
                                    {apt.staff}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <StatusBadge status={apt.statusType}>
                                    {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                                </StatusBadge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {apt.source === 'ai' ? (
                                    <span className="inline-flex items-center gap-1 text-xs text-purple-600 bg-purple-100 px-2 py-0.5 rounded border border-purple-200">
                                        <Zap className="w-3 h-3" /> AI
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1 text-xs text-[#1A1A1A]/50 bg-[#1A1A1A]/5 px-2 py-0.5 rounded border border-[#1A1A1A]/10">
                                        <User className="w-3 h-3" /> Manual
                                    </span>
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                <button className="p-2 hover:bg-[#1A1A1A]/10 rounded-lg text-[#1A1A1A]/50 hover:text-[#1A1A1A] transition-colors">
                                    <ArrowUpRight className="w-4 h-4" />
                                </button>
                            </td>
                        </tr>
                    ))}
                    {appointments.length === 0 && (
                        <tr>
                            <td colSpan={7} className="px-6 py-12 text-center text-[#1A1A1A]/30">
                                No appointments found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
