
import React from 'react';
import { HelpCircle } from 'lucide-react';

export const TroubleshootingChecklist: React.FC = () => {
    return (
        <div className="mt-8 bg-[#0A0A0A] border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
                <HelpCircle className="w-5 h-5 text-white/40" />
                <h3 className="text-lg font-serif italic text-white">Quick Troubleshooting</h3>
            </div>

            <ul className="space-y-3">
                {[
                    "Is your microphone enabled for browser calls?",
                    "Are your business hours set correctly in Settings?",
                    "Has the escalation phone number been verified?",
                    "Is the CRM integration token still valid?",
                    "Do you have credits remaining in your account?"
                ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/60 group">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/20 mt-1.5 group-hover:bg-white/60 transition-colors" />
                        <span className="group-hover:text-white/80 transition-colors">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};
