
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, MessageSquare } from 'lucide-react';
import { StatusBadge } from '../../ui/StatusBadge';
import { UrgencyBadge } from '../../ui/UrgencyBadge';

interface LeadsDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    leadData: any; // Ideally typed
}

export const LeadsDrawer: React.FC<LeadsDrawerProps> = ({ isOpen, onClose, leadData }) => {
    if (!leadData) return null;

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
                                <div className="flex items-center gap-3 mb-2">
                                    <h2 className="text-xl font-serif italic text-[#1A1A1A]">{leadData.name}</h2>
                                    <UrgencyBadge level={leadData.urgency} />
                                </div>
                                <div className="flex items-center gap-4 text-sm text-[#1A1A1A]/50">
                                    <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> {leadData.email}</span>
                                    <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> {leadData.phone}</span>
                                </div>
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

                            {/* Service & Context */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-[#1A1A1A]/5 rounded-xl border border-[#1A1A1A]/5">
                                    <span className="text-xs uppercase tracking-wider text-[#1A1A1A]/40 block mb-1">Service Requested</span>
                                    <span className="text-[#1A1A1A] font-medium">{leadData.service}</span>
                                </div>
                                <div className="p-4 bg-[#1A1A1A]/5 rounded-xl border border-[#1A1A1A]/5">
                                    <span className="text-xs uppercase tracking-wider text-[#1A1A1A]/40 block mb-1">Created Date</span>
                                    <span className="text-[#1A1A1A] font-medium">{leadData.createdDate}</span>
                                </div>
                                <div className="p-4 bg-[#1A1A1A]/5 rounded-xl border border-[#1A1A1A]/5">
                                    <span className="text-xs uppercase tracking-wider text-[#1A1A1A]/40 block mb-1">Status</span>
                                    <StatusBadge status={leadData.statusType}>{leadData.status}</StatusBadge>
                                </div>
                                <div className="p-4 bg-[#1A1A1A]/5 rounded-xl border border-[#1A1A1A]/5">
                                    <span className="text-xs uppercase tracking-wider text-[#1A1A1A]/40 block mb-1">Assigned To</span>
                                    <span className="text-[#1A1A1A] font-medium">{leadData.assignedTo}</span>
                                </div>
                            </div>

                            {/* AI Summary */}
                            <div className="space-y-3">
                                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]/40 flex items-center gap-2">
                                    <MessageSquare className="w-3.5 h-3.5" /> AI Conversation Summary
                                </h3>
                                <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-[#1A1A1A]/5 p-4 rounded-xl text-sm text-[#1A1A1A]/80 leading-relaxed">
                                    {leadData.summary || "No summary available for this lead."}
                                </div>
                            </div>

                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
