
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, MessageSquare, Tag, AlertTriangle } from 'lucide-react';

interface LeadsDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    leadData: any;
}

// ── Badge helpers (Vercel / shadcn style) ─────────────────────────────────────

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
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${urgencyBadge(leadData.urgency)}`}>
                                        {leadData.urgency?.charAt(0).toUpperCase() + leadData.urgency?.slice(1)}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-[#1A1A1A]/50">
                                    <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> {leadData.email || '—'}</span>
                                    <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> {leadData.phone || '—'}</span>
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

                            {/* Lead Reason — highlighted prominently */}
                            <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl">
                                <div className="flex items-center gap-2 mb-2">
                                    <Tag className="w-4 h-4 text-blue-500" />
                                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-500">Lead Reason</span>
                                </div>
                                <p className="text-[#1A1A1A] font-medium text-sm leading-relaxed">
                                    {leadData.service || 'No reason provided'}
                                </p>
                            </div>

                            {/* Status Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-[#1A1A1A]/5 rounded-xl border border-[#1A1A1A]/5">
                                    <span className="text-xs uppercase tracking-wider text-[#1A1A1A]/40 block mb-1.5">Lead Status</span>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge(leadData.status)}`}>
                                        {leadData.status?.charAt(0).toUpperCase() + leadData.status?.slice(1)}
                                    </span>
                                </div>

                                <div className="p-4 bg-[#1A1A1A]/5 rounded-xl border border-[#1A1A1A]/5">
                                    <span className="text-xs uppercase tracking-wider text-[#1A1A1A]/40 block mb-1.5">Urgency</span>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${urgencyBadge(leadData.urgency)}`}>
                                        {leadData.urgency?.charAt(0).toUpperCase() + leadData.urgency?.slice(1)}
                                    </span>
                                </div>

                                <div className="p-4 bg-[#1A1A1A]/5 rounded-xl border border-[#1A1A1A]/5">
                                    <span className="text-xs uppercase tracking-wider text-[#1A1A1A]/40 block mb-1.5">Sentiment</span>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${sentimentBadge(leadData.sentiment)}`}>
                                        {leadData.sentiment || 'Neutral'}
                                    </span>
                                </div>

                                <div className="p-4 bg-[#1A1A1A]/5 rounded-xl border border-[#1A1A1A]/5">
                                    <span className="text-xs uppercase tracking-wider text-[#1A1A1A]/40 block mb-1.5">Follow Up</span>
                                    {leadData.followUp ? (
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-[#1A1A1A] ring-1 ring-amber-200">
                                            <AlertTriangle className="w-3 h-3" />
                                            Yes
                                        </span>
                                    ) : (
                                        <span className="text-xs text-zinc-400">No</span>
                                    )}
                                </div>

                                <div className="p-4 bg-[#1A1A1A]/5 rounded-xl border border-[#1A1A1A]/5 col-span-2">
                                    <span className="text-xs uppercase tracking-wider text-[#1A1A1A]/40 block mb-1">Created Date</span>
                                    <span className="text-[#1A1A1A] font-medium text-sm">{leadData.createdDate || '—'}</span>
                                </div>
                            </div>

                            {/* AI Summary */}
                            <div className="space-y-3">
                                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]/40 flex items-center gap-2">
                                    <MessageSquare className="w-3.5 h-3.5" /> AI Conversation Summary
                                </h3>
                                <div className="bg-gradient-to-br from-slate-50 to-gray-50 border border-[#1A1A1A]/5 p-4 rounded-xl text-sm text-[#1A1A1A]/80 leading-relaxed">
                                    {leadData.summary || 'No summary available for this lead.'}
                                </div>
                            </div>

                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
