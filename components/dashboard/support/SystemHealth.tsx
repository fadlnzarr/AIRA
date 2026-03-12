
import React from 'react';
import { Activity, CheckCircle2, AlertTriangle } from 'lucide-react';

interface StatusCardProps {
    name: string;
    status: 'operational' | 'issue';
    lastChecked: string;
}

const StatusCard: React.FC<StatusCardProps> = ({ name, status, lastChecked }) => (
    <div className="p-4 bg-[#0A0A0A] border border-white/10 rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${status === 'operational' ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'}`}>
                {status === 'operational' ? <Activity className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
            </div>
            <div>
                <h4 className="text-white text-sm font-medium">{name}</h4>
                <p className="text-[10px] text-white/30 uppercase tracking-wider">{lastChecked}</p>
            </div>
        </div>
        <div className={`w-2 h-2 rounded-full ${status === 'operational' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]'}`} />
    </div>
);

export const SystemHealth: React.FC = () => {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-serif italic text-white mb-4 flex items-center gap-2">
                System Status
                <span className="text-xs font-sans not-italic font-normal text-white/30 bg-white/5 px-2 py-0.5 rounded ml-2">Live</span>
            </h3>

            <div className="grid gap-3">
                <StatusCard name="AI Voice Engine" status="operational" lastChecked="Checked 1m ago" />
                <StatusCard name="Database Sync" status="operational" lastChecked="Checked 5m ago" />
                <StatusCard name="Message Delivery" status="operational" lastChecked="Checked 2m ago" />
                <StatusCard name="CRM Integration" status="issue" lastChecked="Latency detected" />
            </div>

            <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-xs text-white/50 flex items-start gap-2 mt-4">
                <CheckCircle2 className="w-4 h-4 text-white/30 shrink-0 mt-0.5" />
                <p>
                    Most systems are fully operational. CRM latency is currently being investigated.
                </p>
            </div>
        </div>
    );
};
