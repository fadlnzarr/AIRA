
import React from 'react';
import { motion } from 'framer-motion';

interface SettingsSectionProps {
    title: string;
    description?: string;
    children: React.ReactNode;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({ title, description, children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0A0A0A] border border-white/10 rounded-xl p-6 md:p-8"
        >
            <div className="mb-6">
                <h3 className="text-lg font-medium text-white mb-1 font-serif italic">{title}</h3>
                {description && (
                    <p className="text-white/40 text-sm max-w-2xl">
                        {description}
                    </p>
                )}
            </div>
            <div className="space-y-6">
                {children}
            </div>
        </motion.div>
    );
};
