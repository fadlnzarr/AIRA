
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
        <div className="bg-black text-white">

            {/* Hero Section */}
            <section className="relative h-screen flex flex-col items-center justify-center border-b border-white/10 overflow-hidden">

                {/* Abstract Background Animation - Always Visible */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                    {/* Spinning Rings - Reduced Opacity for Subtlety */}
                    <div className="opacity-20">
                        <motion.div
                            style={{ rotate, y: yBg }}
                            className="w-[80vw] h-[80vw] md:w-[600px] md:h-[600px] border border-white/20 rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                            style={{ y: yBg }}
                            className="w-[70vw] h-[70vw] md:w-[500px] md:h-[500px] border border-white/10 rounded-full absolute border-dashed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                        />
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                            style={{ y: yBg }}
                            className="w-[90vw] h-[90vw] md:w-[700px] md:h-[700px] border border-white/5 rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                        />
                    </div>

                    {/* Pulse Center - Slower, subtler breathing */}
                    <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [0.05, 0.15, 0.05] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        className="w-[40vw] h-[40vw] md:w-[300px] md:h-[300px] bg-white rounded-full blur-[100px] absolute"
                    />
                </div>

                {/* Pulsing Gradient Overlay for Text Readability */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/90 pointer-events-none z-0"
                    animate={{ opacity: [0.7, 0.9, 0.7] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
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
            <section className="py-32 relative z-10 border-b border-white/10 bg-black">
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
            <section className="py-32 bg-black">
                <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-white/10 pb-8">
                        <h2 className="text-6xl md:text-8xl font-serif italic font-light text-white tracking-tight">
                            Capabilities
                        </h2>
                        <div className="mb-4">
                            <Button variant="outline" onClick={() => navigate('/solutions')}>Explore All Features</Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/20 border border-white/10">
                        {SERVICES.slice(0, 3).map((item, i) => (
                            <AnimatedSection key={i} delay={i * 0.1} className="bg-black h-full relative z-0 hover:z-20 transition-all duration-300">
                                <div className="group relative h-[600px] p-8 flex flex-col justify-between 
                         bg-black hover:bg-white 
                         transition-all duration-500 ease-out 
                         hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl
                         cursor-none overflow-hidden">

                                    {/* Background Icon - Massive & Subtle */}
                                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
                                        <item.icon
                                            strokeWidth={0.5}
                                            className="w-[120%] h-[120%] text-white/5 group-hover:text-black/5 transition-colors duration-500 transform -rotate-12 opacity-50"
                                        />
                                    </div>

                                    {/* Top Row: Number & Arrow */}
                                    <div className="flex justify-between items-start relative z-10">
                                        <span className="font-sans font-bold text-white/30 text-sm group-hover:text-black/30 transition-colors duration-500">0{i + 1}</span>
                                        <ArrowUpRight className="w-8 h-8 text-white group-hover:text-black opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10">
                                        <item.icon className="w-12 h-12 text-white group-hover:text-black mb-8 opacity-50 group-hover:opacity-100 transition-all duration-500" />
                                        <h3 className="text-4xl font-serif italic font-light mb-4 text-white group-hover:text-black group-hover:not-italic transition-all duration-300">{item.title}</h3>
                                        <p className="text-white/50 group-hover:text-black/60 font-sans text-lg leading-relaxed transition-colors duration-300">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Feature List */}
            <section className="relative py-40 overflow-hidden bg-white text-black">
                <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
                    <AnimatedSection>
                        <h2 className="text-sm font-sans font-bold uppercase tracking-[0.3em] mb-12 text-black/40">Enterprise Grade</h2>
                    </AnimatedSection>

                    <div className="space-y-0">
                        {[
                            { title: "SOC2-compliant vendors", icon: Shield },
                            { title: "Custom LLM Training", icon: Zap },
                            { title: "Multi-Language Support", icon: Globe }
                        ].map((feature, i) => (
                            <AnimatedSection key={i} delay={i * 0.1}>
                                <div className="group relative border-t border-black/10 py-12 flex items-center justify-between cursor-pointer hover:pl-8 transition-all duration-500 ease-out">
                                    <h3 className="text-5xl md:text-7xl font-serif italic font-light group-hover:not-italic transition-all duration-500">
                                        {feature.title}
                                    </h3>
                                    <feature.icon className="w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                            </AnimatedSection>
                        ))}
                        <div className="border-t border-black/10"></div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-48 bg-black relative border-t border-white/10">
                <div className="max-w-[1200px] mx-auto px-4 text-center">
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
