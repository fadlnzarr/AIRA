
import React from 'react';
import { CheckCircle2, XCircle, RefreshCw } from 'lucide-react';

interface IntegrationCardProps {
    name: string;
    type: string;
    status: 'connected' | 'disconnected' | 'syncing';
    lastSync?: string;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({ name, type, status, lastSync }) => {
    return (
        <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between group hover:border-white/20 transition-colors">
            <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${status === 'connected' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-red-500'}`} />
                <div>
                    <h4 className="text-white font-medium text-sm">{name}</h4>
                    <p className="text-white/40 text-xs uppercase tracking-wider">{type}</p>
                </div>
            </div>

            <div className="text-right">
                {status === 'connected' ? (
                    <div className="flex items-center gap-1.5 text-xs text-white/30">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Synced {lastSync}</span>
                    </div>
                ) : (
                    <button className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors bg-white/5 px-2 py-1 rounded">
                        <RefreshCw className="w-3 h-3" />
                        Reconnect
                    </button>
                )}
            </div>
        </div>
    );
};

export const IntegrationStatus: React.FC = () => {
    return (
        <div className="grid md:grid-cols-2 gap-4">
            <IntegrationCard
                name="Google Calendar"
                type="Calendar"
                status="connected"
                lastSync="2m ago"
            />
            <IntegrationCard
                name="Fadil's CRM"
                type="CRM"
                status="connected"
                lastSync="15m ago"
            />
            <IntegrationCard
                name="Twilio Voice"
                type="Telephony"
                status="connected"
                lastSync="Live"
            />
            <IntegrationCard
                name="Make.com"
                type="Webhooks"
                status="disconnected"
            />
        </div>
    );
};
