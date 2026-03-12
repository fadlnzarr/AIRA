
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItemProps {
    question: string;
    answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-white/5 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between py-4 text-left group"
            >
                <span className={`font-medium transition-colors ${isOpen ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
                    {question}
                </span>
                <ChevronDown className={`w-5 h-5 text-white/40 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <p className="pb-4 text-white/50 text-sm leading-relaxed">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export const FAQAccordion: React.FC = () => {
    const faqs = [
        {
            question: "How do I update my escalation number?",
            answer: "Go to Settings > Escalation Rules. You can update the transfer number there. Make sure to save your changes."
        },
        {
            question: "Why are some calls not being recorded?",
            answer: "Call recording is enabled by default, but short calls (under 5 seconds) or dropped calls may not generate a recording. Check the specific call details in the Calls page."
        },
        {
            question: "How do I connect my Google Calendar?",
            answer: "Navigate to Settings > Integrations. Click 'Connect' on the Calendar card and follow the Google authentication prompts."
        },
        {
            question: "What happens if I miss a scheduled appointment?",
            answer: "The AI agent can attempt to reschedule if configured, or you can manually mark the appointment as 'No Show' in the Appointments page to trigger a follow-up workflow."
        }
    ];

    return (
        <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-serif italic text-white mb-6">Frequently Asked Questions</h3>
            <div>
                {faqs.map((faq, index) => (
                    <FAQItem key={index} {...faq} />
                ))}
            </div>
        </div>
    );
};
