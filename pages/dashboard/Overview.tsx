import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { GlassMetricCard } from '../../components/dashboard/overview/GlassMetricCard';
import { TrendChart } from '../../components/dashboard/overview/TrendChart';
import { FunnelChart } from '../../components/dashboard/overview/FunnelChart';
import { SystemStatus } from '../../components/dashboard/overview/SystemStatus';
import { Phone, Users, CheckCircle, Clock, Activity, BarChart2 } from 'lucide-react';

export const Overview: React.FC = () => {
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
            {/* Background removed (moved to DashboardLayout) */}
            {/* Header Section */}
            <div className="relative z-10 px-2 pt-4">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl font-light text-[#1A1A1A] tracking-tight mb-2">
                        Dashboard
                    </h1>
                    <p className="text-[#1A1A1A]/60 text-sm max-w-md font-medium">
                        Real-time AI performance monitoring and analytics.
                    </p>
                </motion.div>
            </div>

            {/* Section 1: Key Metrics (Scrollable/Grid) */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <GlassMetricCard
                    label="Total Calls"
                    value="1,245"
                    change="+12.5%"
                    trend="up"
                    icon={<Phone className="w-4 h-4" />}
                    delay={0.1}
                    featured
                />
                <GlassMetricCard
                    label="Active Leads"
                    value="892"
                    change="+3.2%"
                    trend="up"
                    icon={<Users className="w-4 h-4" />}
                    delay={0.2}
                />
                <GlassMetricCard
                    label="Conversion"
                    value="24.8%"
                    change="-1.1%"
                    trend="down"
                    icon={<Activity className="w-4 h-4" />}
                    delay={0.3}
                />
                <GlassMetricCard
                    label="Avg Duration"
                    value="4m 12s"
                    change="+0.8%"
                    trend="up"
                    icon={<Clock className="w-4 h-4" />}
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
                <TrendChart />
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
                    <FunnelChart />
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
