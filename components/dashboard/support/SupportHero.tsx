
import React from 'react';
import { Search } from 'lucide-react';

export const SupportHero: React.FC = () => {
    return (
        <div className="relative mb-8 p-8 md:p-12 rounded-2xl bg-gradient-to-br from-white/[0.08] to-transparent border border-white/5 overflow-hidden">
            {/* Decorative background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-2xl">
                <h2 className="text-3xl font-serif italic text-white mb-3">
                    How can we help you?
                </h2>
                <p className="text-white/60 mb-8 font-light">
                    Search our knowledge base or get in touch with our support team.
                </p>

                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                        type="text"
                        placeholder="Search for answers (e.g. 'Escalation setup', 'Billing')"
                        className="w-full pl-12 pr-4 py-4 bg-[#0A0A0A] border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none transition-all shadow-lg"
                    />
                </div>
            </div>
        </div>
    );
};
