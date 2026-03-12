
import React, { useState } from 'react';
import { Save, Loader2 } from 'lucide-react';
import { SettingsSection } from '../../components/dashboard/settings/SettingsSection';
import { BusinessHours } from '../../components/dashboard/settings/BusinessHours';
import { EscalationRules } from '../../components/dashboard/settings/EscalationRules';
import { NotificationSettings } from '../../components/dashboard/settings/NotificationSettings';
import { IntegrationStatus } from '../../components/dashboard/settings/IntegrationStatus';

export const Settings: React.FC = () => {
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        // Mock save delay
        setTimeout(() => setIsSaving(false), 1500);
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto pb-20 relative">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-serif italic text-white mb-1">
                        Settings
                    </h2>
                    <p className="text-white/50 text-sm">
                        Manage your agent's behavior, schedule, and connections.
                    </p>
                </div>

                {/* Save Button (Sticky on mobile could be added, but keeping it inline for now) */}
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-6 py-2.5 bg-white text-black rounded-lg font-medium hover:bg-white/90 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
                >
                    {isSaving ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save className="w-4 h-4" />
                            Save Changes
                        </>
                    )}
                </button>
            </div>

            <div className="grid gap-8">
                <SettingsSection
                    title="Business Hours"
                    description="Define when your AI agent should handle calls versus when to send them to voicemail or escalation."
                >
                    <BusinessHours />
                </SettingsSection>

                <SettingsSection
                    title="Escalation Rules"
                    description="Configure how and when calls should be transferred to a human agent."
                >
                    <EscalationRules />
                </SettingsSection>

                <div className="grid lg:grid-cols-2 gap-8">
                    <SettingsSection
                        title="Notifications"
                        description="Control which alerts you receive."
                    >
                        <NotificationSettings />
                    </SettingsSection>

                    <SettingsSection
                        title="Integrations"
                        description="Status of your connected tools."
                    >
                        <IntegrationStatus />
                    </SettingsSection>
                </div>
            </div>
        </div>
    );
};
