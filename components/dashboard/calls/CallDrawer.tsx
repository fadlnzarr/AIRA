
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Download, Tag, User } from 'lucide-react';
import { StatusBadge } from '../../ui/StatusBadge';

interface CallDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    callData: any; // Type this properly if you have a Call interface
}

export const CallDrawer: React.FC<CallDrawerProps> = ({ isOpen, onClose, callData }) => {
    if (!callData) return null;

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
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-white/95 backdrop-blur-xl border-l border-[#1A1A1A]/10 shadow-2xl z-50 flex flex-col"
                    >
                        {/* Header */}
                        <div className="px-6 py-5 border-b border-[#1A1A1A]/10 flex items-start justify-between bg-white/50">
                            <div>
                                <h2 className="text-lg font-medium text-[#1A1A1A] mb-1 flex items-center gap-2">
                                    {callData.caller}
                                    <StatusBadge status={callData.statusType}>{callData.outcome}</StatusBadge>
                                </h2>
                                <p className="text-sm text-[#1A1A1A]/50">{callData.date} • {callData.time}</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-[#1A1A1A]/10 rounded-full transition-colors text-[#1A1A1A]/50 hover:text-[#1A1A1A]"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content Scroll Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-8">

                            {/* Call Details */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-3 bg-[#1A1A1A]/5 rounded-xl border border-[#1A1A1A]/5">
                                    <span className="text-xs uppercase tracking-wider text-[#1A1A1A]/40 block mb-1">Urgency</span>
                                    <span className="text-[#1A1A1A] font-medium text-sm">{callData.urgency || '—'}</span>
                                </div>
                                <div className="p-3 bg-[#1A1A1A]/5 rounded-xl border border-[#1A1A1A]/5">
                                    <span className="text-xs uppercase tracking-wider text-[#1A1A1A]/40 block mb-1">Sentiment</span>
                                    <span className="text-[#1A1A1A] font-medium text-sm">{callData.sentiment || '—'}</span>
                                </div>
                                <div className="p-3 bg-[#1A1A1A]/5 rounded-xl border border-[#1A1A1A]/5">
                                    <span className="text-xs uppercase tracking-wider text-[#1A1A1A]/40 block mb-1">Follow-Up</span>
                                    <span className="text-[#1A1A1A] font-medium text-sm">{callData.followUp || '—'}</span>
                                </div>
                                <div className="p-3 bg-[#1A1A1A]/5 rounded-xl border border-[#1A1A1A]/5">
                                    <span className="text-xs uppercase tracking-wider text-[#1A1A1A]/40 block mb-1">Booked</span>
                                    <span className="text-[#1A1A1A] font-medium text-sm">{callData.booked || '—'}</span>
                                </div>
                            </div>

                            {/* AI Summary */}
                            <div className="space-y-3">
                                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]/40">AI Summary</h3>
                                <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl text-sm leading-relaxed text-blue-900/80">
                                    {callData.summary || 'No summary available for this call.'}
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="space-y-3 pt-4 border-t border-[#1A1A1A]/5">
                                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]/40">Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {callData.urgency && (
                                        <span className="px-2.5 py-1 rounded-md bg-[#1A1A1A]/5 border border-[#1A1A1A]/5 text-xs text-[#1A1A1A]/60 flex items-center gap-1.5">
                                            <Tag className="w-3 h-3" /> {callData.urgency} Priority
                                        </span>
                                    )}
                                    {callData.sentiment && (
                                        <span className="px-2.5 py-1 rounded-md bg-[#1A1A1A]/5 border border-[#1A1A1A]/5 text-xs text-[#1A1A1A]/60 flex items-center gap-1.5">
                                            <Tag className="w-3 h-3" /> {callData.sentiment}
                                        </span>
                                    )}
                                    {callData.outcome && (
                                        <span className="px-2.5 py-1 rounded-md bg-[#1A1A1A]/5 border border-[#1A1A1A]/5 text-xs text-[#1A1A1A]/60 flex items-center gap-1.5">
                                            <Tag className="w-3 h-3" /> {callData.outcome}
                                        </span>
                                    )}
                                </div>
                            </div>

                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
