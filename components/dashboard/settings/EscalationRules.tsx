
import React, { useState } from 'react';
import { Phone, PhoneForwarded, AlertCircle, ToggleRight, ToggleLeft } from 'lucide-react';

export const EscalationRules: React.FC = () => {
    const [enabled, setEnabled] = useState(true);

    return (
        <div className="space-y-6">
            {/* Master Toggle */}
            <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                        <PhoneForwarded className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="text-white font-medium text-sm">Human Escalation</h4>
                        <p className="text-white/40 text-xs">Transfer calls to a human agent when needed.</p>
                    </div>
                </div>
                <button
                    onClick={() => setEnabled(!enabled)}
                    className={`transition-colors ${enabled ? 'text-purple-400' : 'text-white/20'}`}
                >
                    {enabled ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
                </button>
            </div>

            {/* Inputs */}
            <div className={`space-y-4 transition-opacity ${enabled ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-xs text-white/50 uppercase tracking-widest pl-1">Transfer Number</label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                            <input
                                type="tel"
                                defaultValue="+1 (555) 123-4567"
                                className="w-full pl-9 pr-4 py-2.5 bg-[#111] border border-white/10 rounded-lg text-sm text-white focus:border-white/30 focus:outline-none placeholder:text-white/20"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs text-white/50 uppercase tracking-widest pl-1">Fallback Number</label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                            <input
                                type="tel"
                                placeholder="Optional backup number"
                                className="w-full pl-9 pr-4 py-2.5 bg-[#111] border border-white/10 rounded-lg text-sm text-white focus:border-white/30 focus:outline-none placeholder:text-white/20"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs text-white/50 uppercase tracking-widest pl-1">Trigger Conditions</label>
                    <div className="p-4 bg-[#111] border border-white/10 rounded-lg space-y-3">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-white/20 bg-transparent checked:bg-purple-500 checked:border-purple-500 transition-colors" />
                            <span className="text-sm text-white/80 group-hover:text-white transition-colors">User explicitly requests a human agent</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-white/20 bg-transparent checked:bg-purple-500 checked:border-purple-500 transition-colors" />
                            <span className="text-sm text-white/80 group-hover:text-white transition-colors">AI detects high frustration or anger</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-transparent checked:bg-purple-500 checked:border-purple-500 transition-colors" />
                            <span className="text-sm text-white/80 group-hover:text-white transition-colors">Unknown user intent after 2 attempts</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-transparent checked:bg-purple-500 checked:border-purple-500 transition-colors" />
                            <span className="text-sm text-white/80 group-hover:text-white transition-colors">Lead is qualified as "High Value"</span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="flex items-start gap-2 p-3 bg-amber-500/10 border border-amber-500/10 rounded-lg">
                <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <p className="text-xs text-amber-200/80 leading-relaxed">
                    Calls outside of business hours will always be handled by the AI unless "After-hours Escalation" is enabled in Advanced Settings.
                </p>
            </div>
        </div>
    );
};
