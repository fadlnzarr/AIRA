
import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

export const DashboardLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    // Auto-collapse on mobile
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setCollapsed(true);
            }
        };

        // Initial check
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const location = useLocation();

    // Determine title based on path
    const getPageTitle = () => {
        const path = location.pathname.split('/').pop();
        if (!path) return 'Overview';
        return path.charAt(0).toUpperCase() + path.slice(1);
    };

    return (
        <div className="flex h-screen overflow-hidden relative">
            {/* Global Metallic Silver Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <style>{`
                    .metallic-silver-static {
                        background:
                            radial-gradient(circle at 30% 20%, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.35) 20%, transparent 45%),
                            linear-gradient(120deg, #f5f5f5 0%, #dcdcdc 15%, #bfbfbf 30%, #f2f2f2 45%, #a6a6a6 60%, #d9d9d9 75%, #8f8f8f 100%);
                    }
                 `}</style>
                <div className="absolute inset-0 metallic-silver-static" />
                <div className="absolute inset-0 bg-white/10 mix-blend-overlay" />
            </div>

            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

            <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 relative z-10">
                <TopBar title={getPageTitle()} />

                <main className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-black/10 hover:scrollbar-thumb-black/20">
                    <div className="max-w-7xl mx-auto w-full">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};
