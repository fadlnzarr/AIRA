
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, Download, Tag, User } from 'lucide-react';
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

                            {/* Audio Player (Mock) */}
                            <div className="bg-[#1A1A1A]/5 rounded-xl p-4 border border-[#1A1A1A]/5">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <button className="w-10 h-10 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center hover:bg-[#1A1A1A]/90 transition-colors">
                                            <Play className="w-4 h-4 fill-current ml-0.5" />
                                        </button>
                                        <span className="text-sm font-mono text-[#1A1A1A]/70">00:00 / {callData.duration}</span>
                                    </div>
                                    <button className="text-[#1A1A1A]/30 hover:text-[#1A1A1A] transition-colors">
                                        <Download className="w-4 h-4" />
                                    </button>
                                </div>
                                {/* Mock Waveform */}
                                <div className="h-8 flex items-center gap-0.5 opacity-50">
                                    {Array.from({ length: 40 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className="w-1 bg-[#1A1A1A] rounded-full transition-all duration-300 transform hover:bg-blue-600"
                                            style={{ height: `${Math.random() * 100}%` }}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* AI Summary */}
                            <div className="space-y-3">
                                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]/40">AI Summary</h3>
                                <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl text-sm leading-relaxed text-blue-900/80">
                                    caller expressed interest in <span className="text-blue-800 font-medium">Capture AI</span> for their real estate business. They were concerned about integration with HubSpot. The agent confirmed integration support and booked a demo.
                                </div>
                            </div>

                            {/* Transcript */}
                            <div className="space-y-4">
                                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]/40">Transcript</h3>
                                <div className="space-y-4 text-sm">
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 rounded-full bg-[#1A1A1A]/10 flex items-center justify-center shrink-0 text-[#1A1A1A]">
                                            <span className="font-serif italic text-xs">A</span>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-xs text-[#1A1A1A]/30">AIRA • 00:02</span>
                                            <p className="text-[#1A1A1A]/80 bg-[#1A1A1A]/5 p-3 rounded-r-xl rounded-bl-xl">
                                                Hi, thanks for calling AIRA. This is Sarah. How can I help you scale your operations today?
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 flex-row-reverse">
                                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                                            <User className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <div className="space-y-1 text-right">
                                            <span className="text-xs text-[#1A1A1A]/30">Caller • 00:08</span>
                                            <p className="text-[#1A1A1A]/80 bg-blue-500/10 p-3 rounded-l-xl rounded-br-xl text-left border border-blue-500/10">
                                                Yeah, hi. I saw your ad about the voice agents. Do they work with HubSpot?
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 rounded-full bg-[#1A1A1A]/10 flex items-center justify-center shrink-0 text-[#1A1A1A]">
                                            <span className="font-serif italic text-xs">A</span>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-xs text-[#1A1A1A]/30">AIRA • 00:15</span>
                                            <p className="text-[#1A1A1A]/80 bg-[#1A1A1A]/5 p-3 rounded-r-xl rounded-bl-xl">
                                                Absolutely. Our Capture AI seamlessly syncs leads directly into HubSpot in real-time. Would you like to see a demo of how that works?
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="space-y-3 pt-4 border-t border-[#1A1A1A]/5">
                                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]/40">Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-2.5 py-1 rounded-md bg-[#1A1A1A]/5 border border-[#1A1A1A]/5 text-xs text-[#1A1A1A]/60 flex items-center gap-1.5">
                                        <Tag className="w-3 h-3" /> Real Estate
                                    </span>
                                    <span className="px-2.5 py-1 rounded-md bg-[#1A1A1A]/5 border border-[#1A1A1A]/5 text-xs text-[#1A1A1A]/60 flex items-center gap-1.5">
                                        <Tag className="w-3 h-3" /> HubSpot User
                                    </span>
                                    <span className="px-2.5 py-1 rounded-md bg-[#1A1A1A]/5 border border-[#1A1A1A]/5 text-xs text-[#1A1A1A]/60 flex items-center gap-1.5">
                                        <Tag className="w-3 h-3" /> High Intent
                                    </span>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
