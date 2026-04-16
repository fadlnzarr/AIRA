import React, { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { GlassMetricCard } from '../../components/dashboard/overview/GlassMetricCard';
import { TrendChart } from '../../components/dashboard/overview/TrendChart';
import { FunnelChart } from '../../components/dashboard/overview/FunnelChart';
import { SystemStatus } from '../../components/dashboard/overview/SystemStatus';
import { DataStatusBar } from '../../components/dashboard/DataStatusBar';
import { useGoogleSheets } from '../../src/lib/useGoogleSheets';
import { fetchDashboardStats, fetchWeeklyActivity, fetchFunnelData } from '../../src/lib/googleSheets';
import { useClientSheetId } from '../../src/lib/useClientSheetId';
import { Phone, Users, CheckCircle, Activity, BarChart2, Calendar } from 'lucide-react';

export const Overview: React.FC = () => {
    const sheetId = useClientSheetId();
    const statsFetcher = useCallback(() => fetchDashboardStats(sheetId), [sheetId]);
    const weeklyFetcher = useCallback(() => fetchWeeklyActivity(sheetId), [sheetId]);
    const funnelFetcher = useCallback(() => fetchFunnelData(sheetId), [sheetId]);

    const { data: stats, loading, error, lastUpdated, refresh } = useGoogleSheets(statsFetcher, [sheetId]);
    const { data: weeklyData, loading: weeklyLoading } = useGoogleSheets(weeklyFetcher, [sheetId]);
    const { data: funnelData, loading: funnelLoading } = useGoogleSheets(funnelFetcher, [sheetId]);

    // Light Ref for the metallic effect
    const lightRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!lightRef.current || !containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            lightRef.current.style.setProperty('--light-x', `${x}%`);
            lightRef.current.style.setProperty('--light-y', `${y}%`);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div ref={containerRef} className="relative min-h-screen space-y-12 pb-20 overflow-hidden">
            {/* Header Section */}
            <div className="relative z-10 px-2 pt-4">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex items-end justify-between"
                >
                    <div>
                        <h1 className="text-4xl font-light text-[#1A1A1A] tracking-tight mb-2">
                            Dashboard
                        </h1>
                        <p className="text-[#1A1A1A]/60 text-sm max-w-md font-medium">
                            Real-time AI performance monitoring and analytics.
                        </p>
                    </div>
                    <DataStatusBar loading={loading} error={error} lastUpdated={lastUpdated} onRefresh={refresh} />
                </motion.div>
            </div>

            {/* Section 1: Key Metrics */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <GlassMetricCard
                    label="Total Calls"
                    value={stats ? String(stats.totalCalls) : '—'}
                    change=""
                    trend="up"
                    icon={<Phone className="w-4 h-4" />}
                    delay={0.1}
                    featured
                />
                <GlassMetricCard
                    label="Active Leads"
                    value={stats ? String(stats.activeLeads) : '—'}
                    change=""
                    trend="up"
                    icon={<Users className="w-4 h-4" />}
                    delay={0.2}
                />
                <GlassMetricCard
                    label="Appointments"
                    value={stats ? String(stats.totalAppointments) : '—'}
                    change=""
                    trend="up"
                    icon={<Calendar className="w-4 h-4" />}
                    delay={0.3}
                />
                <GlassMetricCard
                    label="Conversion"
                    value={stats ? `${stats.conversionRate}%` : '—'}
                    change=""
                    trend="up"
                    icon={<Activity className="w-4 h-4" />}
                    delay={0.4}
                />
            </div>

            {/* Section 2: Main Visualization */}
            <motion.div
                className="relative z-10"
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
            >
                <TrendChart data={weeklyData ?? undefined} loading={weeklyLoading} />
            </motion.div>

            {/* Section 3: Detailed Analytics Grid */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <motion.div
                    className="lg:col-span-2 space-y-6"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-[#1A1A1A]/5 border border-[#1A1A1A]/10">
                            <BarChart2 className="w-4 h-4 text-[#1A1A1A]/70" />
                        </div>
                        <h3 className="text-lg font-light text-[#1A1A1A]">Conversion Funnel</h3>
                    </div>
                    <FunnelChart data={funnelData ?? undefined} loading={funnelLoading} />
                </motion.div>

                <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-[#1A1A1A]/5 border border-[#1A1A1A]/10">
                            <CheckCircle className="w-4 h-4 text-[#1A1A1A]/70" />
                        </div>
                        <h3 className="text-lg font-light text-[#1A1A1A]">System Status</h3>
                    </div>
                    <SystemStatus />
                </motion.div>
            </div>
        </div>
    );
};
