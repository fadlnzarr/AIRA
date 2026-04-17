import React, { useRef, useEffect, useState } from 'react';
import { useAuth } from '../../src/lib/AuthContext';
import { useAdminSelectedClient } from '../../src/lib/useAdminSelectedClient';
import { Users, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ClientSelectorBar: React.FC = () => {
    const { user, clients } = useAuth();
    const { selectedClientUsername, setSelectedClientUsername } = useAdminSelectedClient();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Only show for admin
    if (user?.role !== 'admin') return null;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedClient = selectedClientUsername
        ? clients.find(c => c.username === selectedClientUsername)
        : null;

    return (
        <div className="flex items-center gap-2" ref={dropdownRef}>
            <div className="text-sm font-medium text-[#1A1A1A]/60 flex items-center gap-1.5 bg-[#1A1A1A]/5 px-3 py-1.5 rounded-lg border border-[#1A1A1A]/10">
                <Users className="w-4 h-4" />
                Viewing for:
            </div>

            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#1A1A1A]/10 rounded-lg text-sm font-medium text-[#1A1A1A] hover:bg-[#1A1A1A]/5 transition-colors shadow-sm"
                >
                    {selectedClient ? selectedClient.displayName : 'AIRA'}
                    <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-0 mt-1 w-56 bg-white border border-[#1A1A1A]/10 rounded-xl shadow-lg z-50 overflow-hidden py-1"
                        >
                            <button
                                onClick={() => {
                                    setSelectedClientUsername(null);
                                    setIsOpen(false);
                                }}
                                className="w-full text-left px-4 py-2 text-sm flex items-center justify-between hover:bg-[#1A1A1A]/5 transition-colors"
                            >
                                <span className={!selectedClientUsername ? 'font-medium text-[#1A1A1A]' : 'text-[#1A1A1A]/70'}>
                                    AIRA
                                </span>
                                {!selectedClientUsername && <Check className="w-4 h-4 text-green-600" />}
                            </button>

                            {clients.length > 0 && <div className="h-px bg-[#1A1A1A]/10 my-1 mx-2" />}

                            {clients.map(client => (
                                <button
                                    key={client.username}
                                    onClick={() => {
                                        setSelectedClientUsername(client.username);
                                        setIsOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm flex items-center justify-between hover:bg-[#1A1A1A]/5 transition-colors"
                                >
                                    <span className={selectedClientUsername === client.username ? 'font-medium text-[#1A1A1A]' : 'text-[#1A1A1A]/70'}>
                                        {client.displayName}
                                    </span>
                                    {selectedClientUsername === client.username && <Check className="w-4 h-4 text-green-600" />}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
