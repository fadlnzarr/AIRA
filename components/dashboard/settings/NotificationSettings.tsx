
import React, { useState } from 'react';
import { Mail, MessageSquare, Bell, ToggleLeft, ToggleRight } from 'lucide-react';

interface NotificationToggleProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    defaultChecked?: boolean;
}

const NotificationToggle: React.FC<NotificationToggleProps> = ({ icon, title, description, defaultChecked = false }) => {
    const [enabled, setEnabled] = useState(defaultChecked);

    return (
        <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
            <div className="flex items-center gap-3">
                <div className="text-white/40">
                    {icon}
                </div>
                <div>
                    <h4 className="text-white font-medium text-sm">{title}</h4>
                    <p className="text-white/40 text-xs">{description}</p>
                </div>
            </div>
            <button
                onClick={() => setEnabled(!enabled)}
                className={`transition-colors ${enabled ? 'text-white' : 'text-white/20'}`}
            >
                {enabled ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
            </button>
        </div>
    );
}

export const NotificationSettings: React.FC = () => {
    return (
        <div className="space-y-2">
            <NotificationToggle
                icon={<Mail className="w-4 h-4" />}
                title="Email Notifications"
                description="Receive daily summaries and critical alerts via email."
                defaultChecked
            />
            <NotificationToggle
                icon={<MessageSquare className="w-4 h-4" />}
                title="SMS Notifications"
                description="Get instant text messages for urgent escalations."
                defaultChecked
            />
            <NotificationToggle
                icon={<Bell className="w-4 h-4" />}
                title="Browser Push"
                description="Show desktop notifications when dashboard is open."
            />
            <NotificationToggle
                icon={<AlertCircle className="w-4 h-4" />} // Using AlertCircle defined implicitly, or import it if needed. Assuming parent imports usage or similar. Just reusing icon prop. Actually need to import AlertCircle here to be safe.
                title="Failed Call Alerts"
                description="Notify immediately if a call fails or disconnects abruptly."
                defaultChecked
            />
        </div>
    );
};

// Add AlertCircle to imports for the usage above
import { AlertCircle } from 'lucide-react';
