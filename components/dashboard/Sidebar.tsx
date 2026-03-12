
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Phone,
    Users,
    Calendar,
    Settings,
    HelpCircle,
    ChevronLeft,
    ChevronRight,
    LogOut
} from 'lucide-react';
import { motion } from 'framer-motion';

interface SidebarProps {
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
    const navItems = [
        { icon: LayoutDashboard, label: 'Overview', path: '/dashboard/overview' },
        { icon: Phone, label: 'Calls', path: '/dashboard/calls' },
        { icon: Users, label: 'Leads', path: '/dashboard/leads' },
        { icon: Calendar, label: 'Appointments', path: '/dashboard/appointments' },
    ];

    const bottomItems = [
        { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
        { icon: HelpCircle, label: 'Support', path: '/dashboard/support' },
    ];

    return (
        <motion.div
            className="h-screen bg-white/40 backdrop-blur-xl border-r border-white/20 flex flex-col z-20 relative transition-all duration-300 ease-in-out shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]"
            animate={{ width: collapsed ? 80 : 260 }}
        >
            {/* Logo Area */}
            <div className="h-16 flex items-center px-6 border-b border-[#1A1A1A]/5">
                <div className={`font-serif italic text-xl font-light text-[#1A1A1A] transition-opacity duration-200 ${collapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>
                    AIRA
                </div>
                {collapsed && (
                    <div className="w-8 h-8 rounded-full bg-[#1A1A1A]/5 flex items-center justify-center mx-auto text-[#1A1A1A] font-serif italic text-xs border border-[#1A1A1A]/10">
                        A
                    </div>
                )}
            </div>

            {/* Navigation */}
            <div className="flex-1 py-6 flex flex-col gap-2 px-3">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `
                            flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group
                            ${isActive
                                ? 'bg-[#1A1A1A]/5 text-[#1A1A1A] shadow-[0_2px_10px_-5px_rgba(0,0,0,0.1)] border border-[#1A1A1A]/10'
                                : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-[#1A1A1A]/5'
                            }
                        `}
                    >
                        <item.icon className="w-5 h-5 min-w-[20px]" />
                        <span className={`text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
                            {item.label}
                        </span>
                    </NavLink>
                ))}
            </div>

            {/* Bottom Actions */}
            <div className="p-3 border-t border-[#1A1A1A]/5 flex flex-col gap-2">
                {bottomItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `
                            flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group
                            ${isActive
                                ? 'bg-[#1A1A1A]/5 text-[#1A1A1A] shadow-[0_2px_10px_-5px_rgba(0,0,0,0.1)] border border-[#1A1A1A]/10'
                                : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-[#1A1A1A]/5'
                            }
                        `}
                    >
                        <item.icon className="w-5 h-5 min-w-[20px]" />
                        <span className={`text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
                            {item.label}
                        </span>
                    </NavLink>
                ))}

                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl text-[#1A1A1A]/40 hover:text-[#1A1A1A] hover:bg-[#1A1A1A]/5 transition-all mt-2"
                >
                    {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                    <span className={`text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
                        Collapse
                    </span>
                </button>
            </div>
        </motion.div>
    );
};
