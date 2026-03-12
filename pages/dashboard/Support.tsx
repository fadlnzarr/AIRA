
import React from 'react';
import { motion } from 'framer-motion';
import { SupportHero } from '../../components/dashboard/support/SupportHero';
import { FAQAccordion } from '../../components/dashboard/support/FAQAccordion';
import { ContactForm } from '../../components/dashboard/support/ContactForm';
import { SystemHealth } from '../../components/dashboard/support/SystemHealth';
import { TroubleshootingChecklist } from '../../components/dashboard/support/TroubleshootingChecklist';

export const Support: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto pb-12">
            <SupportHero />

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column - FAQ & Contact (2/3 width) */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="lg:col-span-2 space-y-8"
                >
                    <FAQAccordion />
                    <ContactForm />
                </motion.div>

                {/* Right Column - Status & Checks (1/3 width) */}
                <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-8"
                >
                    <SystemHealth />
                    <TroubleshootingChecklist />
                </motion.div>
            </div>
        </div>
    );
};
