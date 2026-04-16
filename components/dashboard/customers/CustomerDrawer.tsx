
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, MapPin, User, Tag } from 'lucide-react';
import { StatusBadge } from '../../ui/StatusBadge';
import type { Customer } from '../../../src/lib/googleSheets';

interface CustomerDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    customerData: Customer | null;
}

export const CustomerDrawer: React.FC<CustomerDrawerProps> = ({ isOpen, onClose, customerData }) => {
    if (!customerData) return null;

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
                                    <div className="w-12 h-12 rounded-xl bg-[#1A1A1A]/5 border border-[#1A1A1A]/10 flex items-center justify-center text-lg font-medium text-[#1A1A1A]/60">
                                        {customerData.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-serif italic text-[#1A1A1A]">{customerData.name}</h2>
                                        <StatusBadge status={customerData.statusType}>
                                            {customerData.status.charAt(0).toUpperCase() + customerData.status.slice(1)}
                                        </StatusBadge>
                                    </div>
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
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">

                            {/* Contact Info */}
                            <div className="space-y-3">
                                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]/40 flex items-center gap-2">
                                    <User className="w-3.5 h-3.5" /> Contact Information
                                </h3>
                                <div className="bg-white border border-[#1A1A1A]/10 rounded-xl p-4 space-y-3 shadow-sm">
                                    <div className="flex items-center gap-3 text-sm text-[#1A1A1A]/70">
                                        <Phone className="w-4 h-4 text-[#1A1A1A]/30" />
                                        {customerData.phone}
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-[#1A1A1A]/70">
                                        <Mail className="w-4 h-4 text-[#1A1A1A]/30" />
                                        {customerData.email}
                                    </div>
                                    <div className="flex items-start gap-3 text-sm text-[#1A1A1A]/70">
                                        <MapPin className="w-4 h-4 text-[#1A1A1A]/30 mt-0.5" />
                                        {customerData.address}
                                    </div>
                                </div>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-[#1A1A1A]/5 rounded-xl border border-[#1A1A1A]/5">
                                    <span className="text-xs uppercase tracking-wider text-[#1A1A1A]/40 block mb-1">Customer Type</span>
                                    <span className="text-[#1A1A1A] font-medium flex items-center gap-1.5">
                                        <Tag className="w-3.5 h-3.5 text-[#1A1A1A]/30" />
                                        {customerData.type}
                                    </span>
                                </div>
                                <div className="p-4 bg-[#1A1A1A]/5 rounded-xl border border-[#1A1A1A]/5">
                                    <span className="text-xs uppercase tracking-wider text-[#1A1A1A]/40 block mb-1">Status</span>
                                    <StatusBadge status={customerData.statusType}>
                                        {customerData.status.charAt(0).toUpperCase() + customerData.status.slice(1)}
                                    </StatusBadge>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
