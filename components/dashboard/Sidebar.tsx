
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Phone,
    Users,
    Calendar,
    Settings,
    HelpCircle,
    ChevronLeft,
    ChevronRight,
    LogOut,
    UserPlus,
    Shield,
    Contact
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../src/lib/AuthContext';

interface SidebarProps {
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const isAdmin = user?.role === 'admin';

    const navItems = [
        { icon: LayoutDashboard, label: 'Overview', path: '/dashboard/overview' },
        { icon: Phone, label: 'Calls', path: '/dashboard/calls' },
        { icon: Users, label: 'Leads', path: '/dashboard/leads' },
        { icon: Calendar, label: 'Appointments', path: '/dashboard/appointments' },
        ...(!isAdmin ? [{ icon: Contact, label: 'Customers', path: '/dashboard/customers' }] : []),
        ...(isAdmin ? [{ icon: UserPlus, label: 'Clients', path: '/dashboard/clients' }] : []),
    ];

    const bottomItems = [
        { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
        { icon: HelpCircle, label: 'Support', path: '/dashboard/support' },
    ];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

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

            {/* Role Badge */}
            {!collapsed && user && (
                <div className="mx-3 mt-4 px-3 py-2.5 rounded-xl bg-[#1A1A1A]/[0.03] border border-[#1A1A1A]/5">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#1A1A1A]/5 border border-[#1A1A1A]/10 flex items-center justify-center text-xs font-medium text-[#1A1A1A]/60">
                            {user.displayName.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-[#1A1A1A] truncate leading-tight">{user.displayName}</p>
                            <div className="flex items-center gap-1 mt-0.5">
                                <Shield className="w-2.5 h-2.5 text-[#1A1A1A]/30" />
                                <span className="text-[10px] text-[#1A1A1A]/40 capitalize">{user.role}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

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

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl text-red-400/60 hover:text-red-500 hover:bg-red-50 transition-all"
                    title="Sign Out"
                >
                    <LogOut className="w-5 h-5 min-w-[20px]" />
                    <span className={`text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
                        Sign Out
                    </span>
                </button>

                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl text-[#1A1A1A]/40 hover:text-[#1A1A1A] hover:bg-[#1A1A1A]/5 transition-all mt-1"
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
