
import React, { useState, useEffect } from 'react';
import { Save, Loader2, Database, AlertCircle, Check } from 'lucide-react';
import { SettingsSection } from '../../components/dashboard/settings/SettingsSection';
import { BusinessHours } from '../../components/dashboard/settings/BusinessHours';
import { EscalationRules } from '../../components/dashboard/settings/EscalationRules';
import { NotificationSettings } from '../../components/dashboard/settings/NotificationSettings';
import { IntegrationStatus } from '../../components/dashboard/settings/IntegrationStatus';
import { SettingsProvider, useSettingsContext } from '../../components/dashboard/settings/SettingsContext';
import { useAuth } from '../../src/lib/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const SettingsContent: React.FC = () => {
    const [isSaving, setIsSaving] = useState(false);
    const { user, adminSettings, updateAdminSpreadsheet } = useAuth();
    const isAdmin = user?.role === 'admin';

    const [adminSheetUrl, setAdminSheetUrl] = useState(adminSettings?.spreadsheetUrl || '');
    const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const { hasChanges: hasMockSettingsChanges, settings, setSavedSettings } = useSettingsContext();

    // Sync if it changes globally (but only on mount or if external change)
    useEffect(() => {
        setAdminSheetUrl(adminSettings?.spreadsheetUrl || '');
    }, [adminSettings?.spreadsheetUrl]);

    const hasAdminSheetChanges = adminSheetUrl !== (adminSettings?.spreadsheetUrl || '');
    const hasAnyChanges = hasAdminSheetChanges || hasMockSettingsChanges;

    const handleSave = () => {
        setIsSaving(true);
        setSaveStatus(null);
        
        let successMessage = 'Settings saved successfully';
        
        if (isAdmin && hasAdminSheetChanges) {
            const result = updateAdminSpreadsheet(adminSheetUrl);
            if (!result.success) {
                setSaveStatus({ type: 'error', message: result.error || 'Failed to update AIRA Database' });
                setIsSaving(false);
                return;
            }
        }

        // Apply mock settings save
        setSavedSettings(settings);

        // Mock save delay
        setTimeout(() => {
            setIsSaving(false);
            setSaveStatus({ type: 'success', message: successMessage });
            setTimeout(() => setSaveStatus(null), 3000);
        }, 1000);
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

                <button
                    onClick={handleSave}
                    disabled={isSaving || !hasAnyChanges}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                        hasAnyChanges && !isSaving 
                            ? 'bg-[#d92514] text-white hover:bg-[#b81f10] shadow-[0_0_20px_rgba(217,37,20,0.3)] hover:shadow-[0_0_25px_rgba(217,37,20,0.4)]'
                            : 'bg-white text-black hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                    }`}
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
                {saveStatus && (
                    <AnimatePresence>
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className={`p-4 rounded-xl border flex items-center gap-3 ${
                                saveStatus.type === 'success' 
                                    ? 'bg-green-500/10 border-green-500/20 text-green-700' 
                                    : 'bg-red-500/10 border-red-500/20 text-red-700'
                            }`}
                        >
                            {saveStatus.type === 'success' ? <Check className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                            <span className="font-medium text-sm">{saveStatus.message}</span>
                        </motion.div>
                    </AnimatePresence>
                )}

                {isAdmin && (
                    <SettingsSection
                        title="AIRA Database"
                        description="Connect the master Google Sheet used for AIRA's internal data when 'AIRA' is selected."
                    >
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-white/40 uppercase tracking-wider flex items-center gap-2">
                                    <Database className="w-3.5 h-3.5" />
                                    Google Spreadsheet URL
                                </label>
                                <input
                                    type="url"
                                    value={adminSheetUrl}
                                    onChange={(e) => setAdminSheetUrl(e.target.value)}
                                    placeholder="https://docs.google.com/spreadsheets/d/..."
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/20 transition-colors"
                                />
                                <p className="text-[10px] text-white/30 pl-1">
                                    Paste the full URL of the AIRA Google Sheet. It must be published to the web. Leave blank to default to standard fallback.
                                </p>
                            </div>
                        </div>
                    </SettingsSection>
                )}

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

export const Settings: React.FC = () => {
    return (
        <SettingsProvider>
            <SettingsContent />
        </SettingsProvider>
    );
};
