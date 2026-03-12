
import React from 'react';
import { Bell, Search, Calendar as CalendarIcon } from 'lucide-react';

interface TopBarProps {
    title: string;
}

export const TopBar: React.FC<TopBarProps> = ({ title }) => {
    return (
        <header className="h-16 border-b border-[#1A1A1A]/5 bg-white/40 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-10 transition-colors duration-300">
            {/* Page Title */}
            <h1 className="text-xl font-medium text-[#1A1A1A] tracking-tight">
                {title}
            </h1>

            {/* Right Actions */}
            <div className="flex items-center gap-6">
                {/* Date Selector (Mock) */}
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#1A1A1A]/5 rounded-lg border border-[#1A1A1A]/10 text-xs text-[#1A1A1A]/70 hover:bg-[#1A1A1A]/10 transition-colors cursor-pointer">
                    <CalendarIcon className="w-3.5 h-3.5" />
                    <span>Oct 24 - Oct 31</span>
                </div>

                <div className="w-px h-6 bg-[#1A1A1A]/10 hidden md:block" />

                <button className="relative group">
                    <Bell className="w-5 h-5 text-[#1A1A1A]/50 group-hover:text-[#1A1A1A] transition-colors" />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]"></span>
                </button>

                <div className="flex items-center gap-3 pl-2">
                    <div className="text-right hidden md:block">
                        <p className="text-sm text-[#1A1A1A] font-medium leading-none">Fadil Nizar</p>
                        <p className="text-xs text-[#1A1A1A]/40 mt-1 leading-none">Administrator</p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1A1A1A]/10 to-[#1A1A1A]/5 border border-[#1A1A1A]/10 flex items-center justify-center text-[#1A1A1A] font-serif italic text-sm overflow-hidden shadow-sm">
                        <img
                            src="/images/fadil-nizar-founder.jpg"
                            alt="Profile"
                            className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                            onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                            }}
                        />
                        <span className="absolute" style={{ display: 'none' }}>FN</span>
                    </div>
                </div>
            </div>
        </header>
    );
};
