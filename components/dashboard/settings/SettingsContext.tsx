import React, { createContext, useContext, useState } from 'react';

export interface DaySchedule {
    day: string;
    isOpen: boolean;
    start: string;
    end: string;
}

export interface EscalationSettings {
    enabled: boolean;
    transferNumber: string;
    fallbackNumber: string;
    requestHuman: boolean;
    highFrustration: boolean;
    unknownIntent: boolean;
    highValueLead: boolean;
}

export interface NotificationSettingsState {
    email: boolean;
    sms: boolean;
    browser: boolean;
    failedCalls: boolean;
}

export interface AppSettings {
    businessHours: DaySchedule[];
    escalation: EscalationSettings;
    notifications: NotificationSettingsState;
}

export const defaultSettings: AppSettings = {
    businessHours: [
        { day: 'Monday', isOpen: true, start: '09:00', end: '17:00' },
        { day: 'Tuesday', isOpen: true, start: '09:00', end: '17:00' },
        { day: 'Wednesday', isOpen: true, start: '09:00', end: '17:00' },
        { day: 'Thursday', isOpen: true, start: '09:00', end: '17:00' },
        { day: 'Friday', isOpen: true, start: '09:00', end: '17:00' },
        { day: 'Saturday', isOpen: false, start: '10:00', end: '14:00' },
        { day: 'Sunday', isOpen: false, start: '10:00', end: '14:00' },
    ],
    escalation: {
        enabled: true,
        transferNumber: '+1 (555) 123-4567',
        fallbackNumber: '',
        requestHuman: true,
        highFrustration: true,
        unknownIntent: false,
        highValueLead: false,
    },
    notifications: {
        email: true,
        sms: true,
        browser: false,
        failedCalls: true,
    }
};

interface SettingsContextType {
    settings: AppSettings;
    setSettings: React.Dispatch<React.SetStateAction<AppSettings>>;
    savedSettings: AppSettings;
    setSavedSettings: React.Dispatch<React.SetStateAction<AppSettings>>;
    hasChanges: boolean;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

export const useSettingsContext = () => {
    const ctx = useContext(SettingsContext);
    if (!ctx) throw new Error('useSettingsContext must be used within SettingsProvider');
    return ctx;
};

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [savedSettings, setSavedSettings] = useState<AppSettings>(defaultSettings);
    const [settings, setSettings] = useState<AppSettings>(defaultSettings);

    const hasChanges = JSON.stringify(settings) !== JSON.stringify(savedSettings);

    return (
        <SettingsContext.Provider value={{ settings, setSettings, savedSettings, setSavedSettings, hasChanges }}>
            {children}
        </SettingsContext.Provider>
    );
};
