"use client";

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Layers, Cog, Play, Users, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GradientNavItem {
    label: string;
    path: string;
    icon: React.ReactNode;
}

const navItems: GradientNavItem[] = [
    { label: 'Home', path: '/', icon: <Home className="w-5 h-5" /> },
    { label: 'Solutions', path: '/solutions', icon: <Layers className="w-5 h-5" /> },
    { label: 'How It Works', path: '/how-it-works', icon: <Cog className="w-5 h-5" /> },
    { label: 'Demo', path: '/demo', icon: <Play className="w-5 h-5" /> },
    { label: 'About', path: '/about', icon: <Users className="w-5 h-5" /> },
    { label: 'Contact', path: '/contact', icon: <Mail className="w-5 h-5" /> },
];

// Purple/violet gradient matching AIRA theme
const GRADIENT_FROM = '#a855f7'; // violet-500
const GRADIENT_TO = '#7c3aed';   // violet-600

interface GradientNavMenuProps {
    className?: string;
}

export function GradientNavMenu({ className }: GradientNavMenuProps) {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        // Single rounded container with liquid glass effect
        <div
            className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full",
                // Liquid glass effect
                "bg-white/5 backdrop-blur-md border border-white/10",
                "shadow-lg shadow-black/10",
                className
            )}
        >
            {navItems.map(({ label, path, icon }, index) => {
                const isActive = location.pathname === path;

                return (
                    <React.Fragment key={path}>
                        {/* Divider between items */}
                        {index > 0 && index === 3 && (
                            <div className="w-px h-6 bg-white/20 mx-2" />
                        )}

                        <button
                            onClick={() => navigate(path)}
                            style={{
                                '--gradient-from': GRADIENT_FROM,
                                '--gradient-to': GRADIENT_TO,
                            } as React.CSSProperties}
                            className={cn(
                                "relative flex items-center justify-center",
                                "w-10 h-10 rounded-full",
                                "transition-all duration-500 cursor-pointer group",
                                "hover:w-[120px]",
                                // Hover/active states
                                isActive
                                    ? "bg-white/15 shadow-inner shadow-violet-500/20"
                                    : "hover:bg-white/10"
                            )}
                        >
                            {/* Gradient overlay on hover */}
                            <span className="absolute inset-0 rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] opacity-0 transition-all duration-500 group-hover:opacity-15" />

                            {/* Icon */}
                            <span className={cn(
                                "relative z-10 transition-all duration-500",
                                "group-hover:scale-0 group-hover:opacity-0",
                                isActive ? "text-white" : "text-white/60 group-hover:text-white"
                            )}>
                                {icon}
                            </span>

                            {/* Title - appears on hover */}
                            <span className={cn(
                                "absolute z-10 text-white uppercase tracking-wider text-[10px] font-medium",
                                "transition-all duration-500 scale-0 opacity-0",
                                "group-hover:scale-100 group-hover:opacity-100"
                            )}>
                                {label}
                            </span>
                        </button>
                    </React.Fragment>
                );
            })}
        </div>
    );
}

export default GradientNavMenu;
