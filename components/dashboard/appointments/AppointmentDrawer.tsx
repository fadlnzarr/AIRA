
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, MapPin, User, Mail, Phone, FileText } from 'lucide-react';
import { StatusBadge } from '../../ui/StatusBadge';

interface AppointmentDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    appointmentData: any; // Ideally typed
}

export const AppointmentDrawer: React.FC<AppointmentDrawerProps> = ({ isOpen, onClose, appointmentData }) => {
    if (!appointmentData) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 bottom-0 w-full max-w-xl bg-white/95 backdrop-blur-xl border-l border-[#1A1A1A]/10 shadow-2xl z-50 flex flex-col"
                    >
                        {/* Header */}
                        <div className="px-6 py-5 border-b border-[#1A1A1A]/10 flex items-start justify-between">
                            <div>
                                <h2 className="text-xl font-serif italic text-[#1A1A1A] mb-2">Appointment Details</h2>
                                <StatusBadge status={appointmentData.statusType}>
                                    {appointmentData.status.charAt(0).toUpperCase() + appointmentData.status.slice(1)}
                                </StatusBadge>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-[#1A1A1A]/5 rounded-full transition-colors text-[#1A1A1A]/40 hover:text-[#1A1A1A]"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-8">

                            {/* Time & Date */}
                            <div className="flex gap-4">
                                <div className="flex-1 p-4 bg-[#1A1A1A]/5 rounded-xl border border-[#1A1A1A]/5 flex items-center gap-3">
                                    <Calendar className="w-5 h-5 text-[#1A1A1A]/40" />
                                    <div>
                                        <span className="text-xs uppercase tracking-wider text-[#1A1A1A]/40 block">Date</span>
                                        <span className="text-[#1A1A1A] font-medium">{appointmentData.date}</span>
                                    </div>
                                </div>
                                <div className="flex-1 p-4 bg-[#1A1A1A]/5 rounded-xl border border-[#1A1A1A]/5 flex items-center gap-3">
                                    <Clock className="w-5 h-5 text-[#1A1A1A]/40" />
                                    <div>
                                        <span className="text-xs uppercase tracking-wider text-[#1A1A1A]/40 block">Time</span>
                                        <span className="text-[#1A1A1A] font-medium">{appointmentData.time}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Client Info */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium text-[#1A1A1A] flex items-center gap-2">
                                    <User className="w-4 h-4 text-[#1A1A1A]/40" /> Client Information
                                </h3>
                                <div className="bg-white border border-[#1A1A1A]/10 rounded-xl p-4 space-y-3 shadow-sm">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[#1A1A1A] font-medium text-lg">{appointmentData.clientName}</span>
                                        <span className="text-xs text-[#1A1A1A]/50 px-2 py-1 bg-[#1A1A1A]/5 rounded-full border border-[#1A1A1A]/5">
                                            {appointmentData.source === 'ai' ? 'Booked by AI' : 'Manual Booking'}
                                        </span>
                                    </div>
                                    <div className="space-y-2 pt-2 border-t border-[#1A1A1A]/5">
                                        <div className="flex items-center gap-3 text-sm text-[#1A1A1A]/60">
                                            <Mail className="w-4 h-4 opacity-50" />
                                            {appointmentData.email || "—"}
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-[#1A1A1A]/60">
                                            <Phone className="w-4 h-4 opacity-50" />
                                            {appointmentData.phone || "—"}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Service Context */}
                            <div className="space-y-2">
                                <h3 className="text-sm font-medium text-[#1A1A1A] flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-[#1A1A1A]/40" /> Service
                                </h3>
                                <div className="p-3 bg-[#1A1A1A]/5 border border-[#1A1A1A]/5 rounded-lg text-[#1A1A1A]/80 text-sm">
                                    {appointmentData.service}
                                </div>
                            </div>

                            {/* Staff */}
                            {appointmentData.staff && (
                                <div className="space-y-2">
                                    <h3 className="text-sm font-medium text-[#1A1A1A]">Assigned Staff</h3>
                                    <div className="flex items-center gap-3 p-3 bg-[#1A1A1A]/5 border border-[#1A1A1A]/5 rounded-lg">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium border border-blue-200">
                                            {appointmentData.staff.charAt(0)}
                                        </div>
                                        <span className="text-sm text-[#1A1A1A]">{appointmentData.staff}</span>
                                    </div>
                                </div>
                            )}

                            {/* Notes (read-only) */}
                            {appointmentData.notes && (
                                <div className="space-y-2">
                                    <h3 className="text-sm font-medium text-[#1A1A1A]">Notes</h3>
                                    <div className="p-3 bg-[#1A1A1A]/5 border border-[#1A1A1A]/5 rounded-lg text-[#1A1A1A]/70 text-sm leading-relaxed">
                                        {appointmentData.notes}
                                    </div>
                                </div>
                            )}

                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
