
import React from 'react';
import { Bell, Shield } from 'lucide-react';
import { useAuth } from '../../src/lib/AuthContext';

interface TopBarProps {
    title: string;
}

export const TopBar: React.FC<TopBarProps> = ({ title }) => {
    const { user } = useAuth();

    const roleBadge = user?.role === 'admin' ? 'Administrator' : 'Client';

    return (
        <header className="h-16 border-b border-[#1A1A1A]/5 bg-white/40 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-10 transition-colors duration-300">
            {/* Page Title */}
            <h1 className="text-xl font-medium text-[#1A1A1A] tracking-tight">
                {title}
            </h1>

            {/* Right Actions */}
            <div className="flex items-center gap-6">
                <button className="relative group">
                    <Bell className="w-5 h-5 text-[#1A1A1A]/50 group-hover:text-[#1A1A1A] transition-colors" />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]"></span>
                </button>

                <div className="flex items-center gap-3 pl-2">
                    <div className="text-right hidden md:block">
                        <p className="text-sm text-[#1A1A1A] font-medium leading-none">{user?.displayName || 'User'}</p>
                        <p className="text-xs text-[#1A1A1A]/40 mt-1 leading-none">{roleBadge}</p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1A1A1A]/10 to-[#1A1A1A]/5 border border-[#1A1A1A]/10 flex items-center justify-center text-[#1A1A1A] font-serif italic text-sm overflow-hidden shadow-sm">
                        {user?.role === 'admin' ? (
                            <img
                                src="/images/fadil-nizar-founder.jpg"
                                alt="Profile"
                                className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                    (e.target as HTMLImageElement).nextElementSibling?.removeAttribute('style');
                                }}
                            />
                        ) : null}
                        <span className={user?.role === 'admin' ? 'hidden' : ''}>
                            {user?.displayName?.charAt(0).toUpperCase() || 'U'}
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
};
