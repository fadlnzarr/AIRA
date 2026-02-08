
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Globe, Zap, Shield } from 'lucide-react';
import { Button } from '../components/Button';
import { AnimatedSection } from '../components/AnimatedSection';
import { TextReveal } from '../components/TextReveal';
import { Marquee } from '../components/Marquee';
import { SERVICES } from '../constants';


export const Home: React.FC = () => {
    const navigate = useNavigate();
    const { scrollY } = useScroll();

    // Transforms for animations
    const rotate = useTransform(scrollY, [0, 1000], [0, 45]);
    const yBg = useTransform(scrollY, [0, 1000], [0, 200]);

    return (
        <div className="text-white">

            {/* Hero Section */}
            <section className="relative h-screen flex flex-col items-center justify-center border-b border-white/10 overflow-hidden">


                {/* Hero Accent Gradient - Violet Theme */}
                <div className="absolute inset-0 z-0 overflow-hidden" style={{ contain: 'strict' }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        style={{ width: '100%', height: '100%', position: 'relative' }}
                    >
                        {/* Primary Glow - Electric Purple */}
                        <div
                            className="absolute inset-[-25%] w-[150%] h-[150%]"
                            style={{
                                background: `
                                    radial-gradient(ellipse 60% 50% at 30% 30%, rgba(91, 45, 255, 0.4) 0%, transparent 60%),
                                    radial-gradient(ellipse 50% 40% at 70% 20%, rgba(91, 45, 255, 0.3) 0%, transparent 55%)
                                `,
                                animation: 'meshFlow1 15s ease-in-out infinite',
                                willChange: 'transform',
                                transform: 'translateZ(0)',
                            }}
                        />
                        {/* Secondary Glow - Soft Lavender */}
                        <div
                            className="absolute inset-[-25%] w-[150%] h-[150%]"
                            style={{
                                background: `
                                    radial-gradient(ellipse 45% 55% at 65% 55%, rgba(155, 140, 255, 0.25) 0%, transparent 60%),
                                    radial-gradient(ellipse 50% 45% at 20% 60%, rgba(155, 140, 255, 0.2) 0%, transparent 55%)
                                `,
                                animation: 'meshFlow2 18s ease-in-out infinite',
                                willChange: 'transform',
                                transform: 'translateZ(0)',
                            }}
                        />
                        {/* Deep Accent - Royal Violet */}
                        <div
                            className="absolute inset-[-25%] w-[150%] h-[150%]"
                            style={{
                                background: `
                                    radial-gradient(ellipse 55% 45% at 80% 70%, rgba(42, 15, 92, 0.5) 0%, transparent 65%),
                                    radial-gradient(ellipse 40% 50% at 10% 40%, rgba(42, 15, 92, 0.4) 0%, transparent 60%)
                                `,
                                animation: 'meshFlow3 20s ease-in-out infinite',
                                willChange: 'transform',
                                transform: 'translateZ(0)',
                            }}
                        />
                        {/* Vignette overlay for depth */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background: `radial-gradient(ellipse 80% 80% at 50% 50%, transparent 20%, rgba(11, 7, 19, 0.7) 100%)`,
                            }}
                        />
                    </motion.div>
                </div>

                {/* Gradient Animation Keyframes */}
                <style>{`
                    @keyframes meshFlow1 {
                        0%, 100% {
                            transform: translate(0%, 0%) rotate(0deg) scale(1);
                        }
                        33% {
                            transform: translate(15%, -10%) rotate(8deg) scale(1.1);
                        }
                        66% {
                            transform: translate(-10%, 15%) rotate(-5deg) scale(0.95);
                        }
                    }
                    @keyframes meshFlow2 {
                        0%, 100% {
                            transform: translate(0%, 0%) rotate(0deg) scale(1);
                        }
                        33% {
                            transform: translate(-12%, 8%) rotate(-6deg) scale(1.05);
                        }
                        66% {
                            transform: translate(10%, -12%) rotate(10deg) scale(1.12);
                        }
                    }
                    @keyframes meshFlow3 {
                        0%, 100% {
                            transform: translate(0%, 0%) rotate(0deg) scale(1);
                        }
                        33% {
                            transform: translate(8%, 12%) rotate(5deg) scale(1.08);
                        }
                        66% {
                            transform: translate(-15%, -8%) rotate(-8deg) scale(0.92);
                        }
                    }
                    @keyframes meshFlow4 {
                        0%, 100% {
                            transform: translate(0%, 0%) rotate(0deg);
                        }
                        50% {
                            transform: translate(-15%, 10%) rotate(8deg);
                        }
                    }
                    @keyframes spin {
                        from { transform: translate(-50%, -50%) rotate(0deg); }
                        to { transform: translate(-50%, -50%) rotate(360deg); }
                    }
                    @keyframes pulse {
                        0%, 100% { transform: scale(1); opacity: 0.03; }
                        50% { transform: scale(1.15); opacity: 0.05; }
                    }
                `}</style>

                {/* Abstract Background Animation - Always Visible */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                    {/* Spinning Rings - Reduced for performance */}
                    <div className="opacity-15">
                        <div
                            className="w-[70vw] h-[70vw] md:w-[500px] md:h-[500px] border border-white/15 rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                            style={{
                                animation: 'spin 80s linear infinite',
                                willChange: 'transform',
                            }}
                        />
                        <div
                            className="w-[85vw] h-[85vw] md:w-[650px] md:h-[650px] border border-white/5 rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed"
                            style={{
                                animation: 'spin 100s linear infinite reverse',
                                willChange: 'transform',
                            }}
                        />
                    </div>

                    {/* Pulse Center - Simplified */}
                    <div
                        className="w-[35vw] h-[35vw] md:w-[280px] md:h-[280px] bg-white/3 rounded-full absolute"
                        style={{
                            animation: 'pulse 12s ease-in-out infinite',
                        }}
                    />
                </div>

                {/* Gradient Overlay for Text Readability */}
                <div
                    className="absolute inset-0 pointer-events-none z-0"
                    style={{
                        background: 'linear-gradient(to top, rgba(11, 7, 19, 0.95) 0%, rgba(11, 7, 19, 0.4) 40%, rgba(11, 7, 19, 0.8) 100%)'
                    }}
                />

                {/* Noise Texture */}
                <div className="absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>

                {/* Content Container */}
                <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 w-full flex flex-col items-center justify-center h-full text-center">

                    {/* Decorative line */}
                    <AnimatedSection>
                        <div className="flex justify-center mb-12">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "100px" }}
                                transition={{ delay: 0.5, duration: 1 }}
                                className="h-1 bg-white"
                            />
                        </div>
                    </AnimatedSection>

                    {/* Main Headline - Replaced with the Quote */}
                    <AnimatedSection delay={0.1} className="mb-10 w-full">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl leading-tight tracking-tight text-white max-w-6xl mx-auto">
                            <span className="block font-serif italic font-light mb-2 md:mb-4">"Your business never sleeps.</span>
                            <span className="block font-serif italic font-light text-white/90">Neither should your phones."</span>
                        </h1>
                    </AnimatedSection>

                    {/* Subtext */}
                    <AnimatedSection delay={0.3} className="mb-12 max-w-2xl mx-auto">
                        <p className="text-base md:text-xl text-white/50 font-sans leading-relaxed uppercase tracking-wider">
                            Deploy AI receptionists that sound human, capture 100% of leads, and integrate directly with your CRM.
                        </p>
                    </AnimatedSection>

                    {/* Buttons */}
                    <AnimatedSection delay={0.5} className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full">
                        <Button size="lg" className="min-w-[200px]" onClick={() => navigate('/demo')}>
                            Deploy Agent
                        </Button>
                        <Button variant="outline" size="lg" className="min-w-[200px]" onClick={() => navigate('/how-it-works')} icon={<ArrowRight className="w-4 h-4" />}>
                            Methodology
                        </Button>
                    </AnimatedSection>

                </div>
            </section>

            {/* Marquee */}
            <section className="bg-white text-black py-2 overflow-hidden z-20 relative">
                <Marquee items={["Revenue Capture", "—", "24/7 Availability", "—", "Instant Scale", "—", "Seamless Integration", "—"]} speed={40} />
            </section>

            {/* Intro Stats */}
            <section className="py-32 relative z-10 border-b border-white/10">
                <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
                        <div>
                            <AnimatedSection>
                                <h2 className="text-5xl md:text-7xl font-serif italic font-light leading-tight">
                                    Replacing <br />
                                    missed calls <br />
                                    with <span className="font-sans font-bold not-italic">Revenue.</span>
                                </h2>
                            </AnimatedSection>
                        </div>
                        <div className="space-y-12">
                            <AnimatedSection delay={0.2}>
                                <p className="text-xl font-light leading-relaxed text-white/60 font-sans">
                                    The traditional front desk is broken. Customers demand instant answers.
                                    AIRA is the always-on, infinite-scale receptionist for the modern enterprise.
                                </p>
                            </AnimatedSection>

                            <div className="grid grid-cols-2 gap-y-12 gap-x-8">
                                {[
                                    { val: "< 400ms", label: "Response Latency" },
                                    { val: "24/7", label: "Operation Time" },
                                    { val: "100%", label: "Script Adherence" },
                                    { val: "Infinite", label: "Concurrent Calls" }
                                ].map((stat, i) => (
                                    <AnimatedSection key={i} delay={0.3 + (i * 0.1)}>
                                        <div className="border-t border-white/30 pt-4">
                                            <div className="text-3xl font-serif italic font-light text-white mb-1">{stat.val}</div>
                                            <div className="text-xs font-sans font-bold uppercase tracking-widest text-white/40">{stat.label}</div>
                                        </div>
                                    </AnimatedSection>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Capabilities */}
            <section className="py-32 relative overflow-hidden">
                {/* Bottom darkening scrim for seamless transition to Enterprise section */}
                <div
                    className="absolute left-0 right-0 bottom-0 h-[220px] pointer-events-none z-[5]"
                    style={{
                        background: 'linear-gradient(180deg, rgba(11,7,19,0.0) 0%, rgba(11,7,19,0.55) 55%, rgba(11,7,19,0.95) 100%)'
                    }}
                />
                <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-white/10 pb-8">
                        <h2 className="text-6xl md:text-8xl font-serif italic font-light text-white tracking-tight">
                            Capabilities
                        </h2>
                        <div className="mb-4">
                            <Button variant="outline" onClick={() => navigate('/solutions')}>Explore All Features</Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {SERVICES.slice(0, 3).map((item, i) => (
                            <AnimatedSection key={i} delay={i * 0.1} className="h-full relative z-0 hover:z-20 transition-all duration-300">
                                <div
                                    className="group relative h-[600px] p-8 flex flex-col justify-between 
                                        rounded-2xl backdrop-blur-md
                                        transition-all duration-300 ease-out 
                                        hover:-translate-y-2 hover:scale-[1.01]
                                        cursor-none overflow-hidden"
                                    style={{
                                        background: 'rgba(91, 45, 255, 0.06)',
                                        border: '1px solid rgba(155, 140, 255, 0.18)',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'rgba(155, 140, 255, 0.14)';
                                        e.currentTarget.style.border = '1px solid rgba(155, 140, 255, 0.35)';
                                        e.currentTarget.style.boxShadow = '0 20px 40px rgba(91, 45, 255, 0.15)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'rgba(91, 45, 255, 0.06)';
                                        e.currentTarget.style.border = '1px solid rgba(155, 140, 255, 0.18)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                >

                                    {/* Background Icon - Massive & Subtle */}
                                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
                                        <item.icon
                                            strokeWidth={0.5}
                                            className="w-[120%] h-[120%] text-white/5 group-hover:text-white/8 transition-colors duration-500 transform -rotate-12 opacity-50"
                                        />
                                    </div>

                                    {/* Top Row: Number & Arrow */}
                                    <div className="flex justify-between items-start relative z-10">
                                        <span className="font-sans font-bold text-white/40 text-sm transition-colors duration-300">0{i + 1}</span>
                                        <ArrowUpRight className="w-8 h-8 text-white/60 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10">
                                        <item.icon className="w-12 h-12 text-white/60 mb-8 group-hover:text-white/80 transition-all duration-300" />
                                        <h3 className="text-4xl font-serif italic font-light mb-4 text-white/95 transition-all duration-300">{item.title}</h3>
                                        <p className="text-white/60 font-sans text-lg leading-relaxed group-hover:text-white/72 transition-colors duration-300">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Feature List - Enterprise Grade */}
            <section
                className="relative py-40 overflow-hidden"
                style={{
                    background: 'linear-gradient(180deg, #160A2B 0%, #0B0713 100%)'
                }}
            >
                {/* Top deepening scrim for seamless transition from Capabilities section */}
                <div
                    className="absolute left-0 right-0 top-0 h-[220px] pointer-events-none z-[5]"
                    style={{
                        background: 'linear-gradient(180deg, rgba(11,7,19,0.95) 0%, rgba(11,7,19,0.55) 45%, rgba(11,7,19,0.0) 100%)'
                    }}
                />
                <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
                    <AnimatedSection>
                        <h2 className="text-sm font-sans font-bold uppercase tracking-[0.3em] mb-12 text-white/40">Enterprise Grade</h2>
                    </AnimatedSection>

                    <div className="space-y-0">
                        {[
                            { title: "SOC2-compliant vendors", icon: Shield },
                            { title: "Custom LLM Training", icon: Zap },
                            { title: "Multi-Language Support", icon: Globe }
                        ].map((feature, i) => (
                            <AnimatedSection key={i} delay={i * 0.1}>
                                <div className="group relative border-t border-white/10 py-12 flex items-center justify-between cursor-pointer hover:pl-8 transition-all duration-500 ease-out">
                                    <h3 className="text-5xl md:text-7xl font-serif italic font-light text-white/90 group-hover:text-white group-hover:not-italic transition-all duration-500">
                                        {feature.title}
                                    </h3>
                                    <feature.icon className="w-12 h-12 text-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                            </AnimatedSection>
                        ))}
                        <div className="border-t border-white/10"></div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 relative overflow-hidden">
                {/* Top scrim - blends from Enterprise section */}
                <div
                    className="absolute left-0 right-0 top-0 h-[160px] pointer-events-none z-[5]"
                    style={{
                        background: 'linear-gradient(180deg, rgba(11,7,19,0.95) 0%, rgba(11,7,19,0.55) 45%, rgba(11,7,19,0.0) 100%)'
                    }}
                />
                {/* Bottom scrim - blends CTA into Footer */}
                <div
                    className="absolute left-0 right-0 bottom-0 h-[120px] pointer-events-none z-[5]"
                    style={{
                        background: 'linear-gradient(180deg, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.98) 100%)'
                    }}
                />
                <div className="max-w-[1200px] mx-auto px-4 text-center relative z-10">
                    <AnimatedSection>
                        <h2 className="text-[8vw] font-serif italic font-light leading-none mb-12 text-white">
                            Ready to <span className="font-sans font-bold not-italic">Scale?</span>
                        </h2>
                        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                            <Button variant="primary" size="lg" className="px-12 py-6 text-xl" onClick={() => navigate('/demo')}>
                                Book a Demo
                            </Button>
                            <Button variant="outline" size="lg" className="px-12 py-6 text-xl" onClick={() => navigate('/contact')}>
                                Contact Sales
                            </Button>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

        </div>
    );
};
