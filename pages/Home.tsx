
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Globe, Zap, Shield } from 'lucide-react';
import { Button } from '../components/Button';
import { InteractiveHoverButton } from '../components/ui/interactive-hover-button';
import { AnimatedSection } from '../components/AnimatedSection';
import { Marquee } from '../components/Marquee';
import { SERVICES } from '../constants';
import { AppleDock, DockItem } from '../components/ui/apple-dock';
import AnimatedNumber from '../components/ui/animated-number';
import AnimatedLiquidBackground from '../components/ui/animated-liquid-background';
import { PremiumTabsCarousel } from '../components/ui/premium-tabs-carousel';
import { ScrollStackCards } from '../components/ui/scroll-stack-cards';
import { HeroOverlay } from '../components/HeroOverlay';
import { MetallicScrollBackground } from '../components/ui/metallic-scroll-background';


// Integration partners for the dock
const INTEGRATION_ITEMS: DockItem[] = [
    { title: 'Salesforce', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/salesforce/salesforce-original.svg', link: 'https://salesforce.com' },
    { title: 'HubSpot', image: 'https://cdn.simpleicons.org/hubspot', link: 'https://hubspot.com' },
    { title: 'Calendly', image: 'https://cdn.simpleicons.org/calendly', link: 'https://calendly.com' },
    { title: 'Slack', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg', link: 'https://slack.com' },
    { title: 'OpenAI', image: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg', link: 'https://openai.com' },
    { title: 'Google', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg', link: 'https://google.com' },
    { title: 'LinkedIn', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg', link: 'https://linkedin.com' },
    { title: 'Stripe', image: 'https://cdn.simpleicons.org/stripe', link: 'https://stripe.com' },
];


export const Home: React.FC = () => {
    const navigate = useNavigate();
    const { scrollY } = useScroll();

    // Transforms for animations
    const rotate = useTransform(scrollY, [0, 1000], [0, 45]);
    const yBg = useTransform(scrollY, [0, 1000], [0, 200]);

    return (
        <div className="relative">

            {/* Hero Section — keeps its own dark background */}
            <HeroOverlay />

            {/* Marquee — sits between hero and metallic zone */}
            <section className="bg-black text-white py-2 overflow-hidden z-20 relative">
                <Marquee items={["Revenue Capture", "—", "24/7 Availability", "—", "Instant Scale", "—", "Seamless Integration", "—"]} speed={40} />
            </section>

            {/* === METALLIC SCROLL SYSTEM === */}
            {/* Wraps all post-hero content: Silver → Transition → Black */}
            <MetallicScrollBackground triggerElementId="enterprise-grade">

                {/* SECTION A — METALLIC SILVER ZONE */}
                {/* Intro Stats */}
                <section className="py-32 relative z-10" style={{ borderBottom: '1px solid var(--metallic-border)' }}>
                    <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
                            <div>
                                <AnimatedSection>
                                    <h2
                                        className="text-5xl md:text-7xl font-serif italic font-light leading-tight"
                                        style={{ color: 'var(--metallic-text)' }}
                                    >
                                        Replacing <br />
                                        missed calls <br />
                                        with <span className="font-sans font-bold not-italic">Revenue.</span>
                                    </h2>
                                </AnimatedSection>
                            </div>
                            <div className="space-y-12">
                                <AnimatedSection delay={0.2}>
                                    <p
                                        className="text-xl font-light leading-relaxed font-sans"
                                        style={{ color: 'var(--metallic-muted)' }}
                                    >
                                        The traditional front desk is broken. Customers demand instant answers.
                                        AIRA is the always-on, infinite-scale receptionist for the modern enterprise.
                                    </p>
                                </AnimatedSection>

                                <div className="grid grid-cols-2 gap-y-12 gap-x-8">
                                    {[
                                        {
                                            val: <AnimatedNumber end={400} prefix="< " suffix="ms" />,
                                            label: "Response Latency"
                                        },
                                        {
                                            val: <AnimatedNumber end={24} suffix="/7" />,
                                            label: "Operation Time"
                                        },
                                        {
                                            val: <AnimatedNumber end={100} suffix="%" />,
                                            label: "Script Adherence"
                                        },
                                        {
                                            val: "Infinite",
                                            label: "Concurrent Calls"
                                        }
                                    ].map((stat, i) => (
                                        <AnimatedSection key={i} delay={0.3 + (i * 0.1)}>
                                            <div style={{ borderTop: '1px solid var(--metallic-border)' }} className="pt-4">
                                                <div
                                                    className="text-3xl font-serif italic font-light mb-1 flex items-center"
                                                    style={{ color: 'var(--metallic-text)' }}
                                                >
                                                    {stat.val}
                                                </div>
                                                <div
                                                    className="text-xs font-sans font-bold uppercase tracking-widest"
                                                    style={{ color: 'var(--metallic-muted)' }}
                                                >
                                                    {stat.label}
                                                </div>
                                            </div>
                                        </AnimatedSection>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Capabilities */}
                <section className="py-32 relative">
                    <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
                        <div className="text-center mb-16 pb-12" style={{ borderBottom: '1px solid var(--metallic-border)' }}>
                            {/* Heading: Character-by-character stagger reveal */}
                            <motion.h2
                                className="text-6xl md:text-8xl font-serif italic font-light tracking-tight mb-6 overflow-hidden"
                                style={{ color: 'var(--metallic-text)' }}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: '-80px' }}
                            >
                                {'Capabilities'.split('').map((char, i) => (
                                    <motion.span
                                        key={i}
                                        className="inline-block"
                                        variants={{
                                            hidden: {
                                                y: '100%',
                                                opacity: 0,
                                                rotateX: 90,
                                                filter: 'blur(8px)',
                                            },
                                            visible: {
                                                y: 0,
                                                opacity: 1,
                                                rotateX: 0,
                                                filter: 'blur(0px)',
                                                transition: {
                                                    duration: 0.6,
                                                    delay: i * 0.04,
                                                    ease: [0.22, 1, 0.36, 1],
                                                },
                                            },
                                        }}
                                        style={{ transformOrigin: 'bottom center' }}
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                            </motion.h2>

                            {/* Subtitle: Cinematic blur-to-focus with letter-spacing expansion */}
                            <motion.p
                                className="text-xl md:text-2xl font-sans max-w-3xl mx-auto leading-relaxed"
                                style={{ color: 'var(--metallic-muted)' }}
                                initial={{
                                    opacity: 0,
                                    y: 30,
                                    filter: 'blur(12px)',
                                    letterSpacing: '0.15em',
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                    filter: 'blur(0px)',
                                    letterSpacing: '0em',
                                }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{
                                    duration: 0.9,
                                    delay: 0.5,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                            >
                                Autonomous agents engineered for zero-latency execution.
                            </motion.p>
                        </div>

                        {/* Scroll-Triggered Card Stack */}
                        <div className="mt-20">
                            <ScrollStackCards cards={SERVICES} />
                        </div>
                    </div>
                </section>

                {/* SECTION B — TRANSITION ZONE */}
                {/* Integrations - Apple Dock */}
                <section className="relative py-32 overflow-hidden">
                    <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
                        {/* Custom Staggered Entrance for Integrations Header */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-10%" }}
                            variants={{
                                visible: { transition: { staggerChildren: 0.1 } }
                            }}
                            className="text-center mb-16"
                        >
                            {/* Eyebrow - Tracking Expansion */}
                            <motion.h2
                                variants={{
                                    hidden: { opacity: 0, letterSpacing: "-0.05em" },
                                    visible: { opacity: 1, letterSpacing: "0.3em", transition: { duration: 1, ease: "easeOut" } }
                                }}
                                className="text-sm font-sans font-bold uppercase mb-6 inline-block"
                                style={{ color: 'var(--metallic-muted)' }}
                            >
                                Integrations
                            </motion.h2>

                            {/* Heading - Word Reveal */}
                            <div
                                className="text-3xl md:text-5xl font-serif italic font-light mb-4 overflow-hidden"
                                style={{ color: 'var(--metallic-text)', opacity: 0.9 }}
                            >
                                {"Connects to your".split(" ").map((word, i) => (
                                    <motion.span
                                        key={i}
                                        variants={{
                                            hidden: { y: "100%", opacity: 0 },
                                            visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
                                        }}
                                        className="inline-block mr-[0.25em]"
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                                <motion.span
                                    variants={{
                                        hidden: { y: "100%", opacity: 0 },
                                        visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
                                    }}
                                    className="font-sans font-bold not-italic inline-block"
                                >
                                    entire stack
                                </motion.span>
                            </div>

                            {/* Description - Fade Up */}
                            <motion.p
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                                }}
                                className="font-sans text-lg max-w-xl mx-auto"
                                style={{ color: 'var(--metallic-muted)' }}
                            >
                                AIRA plugs into the tools you already use — CRMs, calendars, messaging, and more.
                            </motion.p>
                        </motion.div>
                        <AppleDock
                            items={INTEGRATION_ITEMS}
                            baseSize={70}
                            magnification={1.7}
                            distance={220}
                            gap={14}
                            borderRadius={18}
                        />
                    </div>
                </section >

                {/* SECTION C — MATTE BLACK ZONE */}
                {/* Enterprise Grade */}
                <section id="enterprise-grade" className="relative py-40 overflow-hidden">
                    <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
                        <AnimatedSection>
                            <h2
                                className="text-sm font-sans font-bold uppercase tracking-[0.3em] mb-12"
                                style={{ color: 'var(--metallic-muted)' }}
                            >
                                Enterprise Grade
                            </h2>
                        </AnimatedSection>

                        <div className="space-y-0">
                            {[
                                { title: "SOC2-compliant vendors", icon: Shield },
                                { title: "Custom LLM Training", icon: Zap },
                                { title: "Multi-Language Support", icon: Globe }
                            ].map((feature, i) => (
                                <AnimatedSection key={i} delay={i * 0.1}>
                                    <div
                                        className="group relative py-12 flex items-center justify-between cursor-pointer hover:pl-8 transition-all duration-500 ease-out"
                                        style={{ borderTop: '1px solid var(--metallic-border)' }}
                                    >
                                        <h3
                                            className="text-5xl md:text-7xl font-serif italic font-light group-hover:not-italic transition-all duration-500"
                                            style={{ color: 'var(--metallic-text)', opacity: 0.9 }}
                                        >
                                            {feature.title}
                                        </h3>
                                        <feature.icon
                                            className="w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            style={{ color: 'var(--metallic-muted)' }}
                                        />
                                    </div>
                                </AnimatedSection>
                            ))}
                            <div style={{ borderTop: '1px solid var(--metallic-border)' }}></div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-24 relative overflow-hidden">
                    <div className="max-w-[1200px] mx-auto px-4 text-center relative z-10">
                        <AnimatedSection>
                            <h2
                                className="text-[8vw] font-serif italic font-light leading-none mb-12"
                                style={{ color: 'var(--metallic-text)' }}
                            >
                                Ready to <span className="font-sans font-bold not-italic">Scale?</span>
                            </h2>
                            <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                                <InteractiveHoverButton
                                    variant="primary"
                                    text="Book a Demo"
                                    className="px-12 py-6 text-xl min-w-[240px]"
                                    onClick={() => navigate('/demo')}
                                />
                                <InteractiveHoverButton
                                    variant="outline"
                                    text="Contact Sales"
                                    className="px-12 py-6 text-xl min-w-[240px]"
                                    onClick={() => navigate('/contact')}
                                />
                            </div>
                        </AnimatedSection>
                    </div>
                </section>

            </MetallicScrollBackground>

        </div >
    );
};
