import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useInView } from 'framer-motion';
import { AnimatedSection } from '../components/AnimatedSection';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { Search, PenTool, Mic, Zap, TestTube, TrendingUp } from 'lucide-react';
import { SplineScene } from "@/components/ui/spline-scene";
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { InteractiveHoverButton } from '../components/ui/interactive-hover-button';
import { MetallicScrollBackground } from '../components/ui/metallic-scroll-background';

const STEPS = [
    {
        title: "Business Rules & Discovery",
        desc: "We analyze your call logs and business requirements to define strict rules for the AI.",
        icon: Search
    },
    {
        title: "Conversation Logic Design",
        desc: "Our engineers design the conversation flow, ensuring the AI handles objections and edge cases.",
        icon: PenTool
    },
    {
        title: "Voice & Personality Setup",
        desc: "We clone a voice or select a premium synthetic voice that matches your brand identity.",
        icon: Mic
    },
    {
        title: "Workflow Automation",
        desc: "We connect the agent to your tech stack (CRM, Calendar, Email) via API, Zapier, or n8n.",
        icon: Zap
    },
    {
        title: "Testing & Deployment",
        desc: "Rigorous testing to ensure 100% reliability before going live on your phone lines.",
        icon: TestTube
    },
    {
        title: "Continuous Optimization",
        desc: "We monitor call logs and analytics to constantly improve the agent's performance.",
        icon: TrendingUp
    }
];

export const HowItWorks: React.FC = () => {
    const navigate = useNavigate();
    const timelineRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ["start 20%", "end 80%"]
    });

    const pathLength = useSpring(scrollYProgress, { stiffness: 50, damping: 20, restDelta: 0.001 });

    // Lazy load Spline scene only when near viewport to prevent page load lag
    const splineRef = useRef(null);
    const shouldLoadSpline = useInView(splineRef, { once: true, margin: "200px" });

    // Organic wavy path for the main timeline
    // This creates a subtle "hand-drawn" feel that weaves down the center
    const mainPathD = "M 50 0 C 50 0 55 12 50 25 C 45 37 50 50 50 50 C 50 50 55 62 50 75 C 45 87 50 100 50 100";

    return (
        <div className="min-h-screen overflow-hidden">
            <MetallicScrollBackground>
                <div className="pt-32 pb-20">
                    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

                        {/* Header with Title Removed */}
                        <div className="flex flex-col items-center justify-center mb-10 relative">
                            {/* Title removed as per user request */}
                        </div>

                        {/* Architecture Diagram Removed */}
                        <div className="mb-20"></div>

                        {/* Implementation Timeline Title */}
                        <div className="mb-20 text-center relative z-10">
                            {/* Heading: Word-by-word blur reveal */}
                            <motion.h2
                                className="text-4xl md:text-5xl font-serif italic font-light mb-4 overflow-hidden"
                                style={{ color: 'var(--metallic-text)' }}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: '-60px' }}
                            >
                                {'Implementation Process'.split(' ').map((word, i) => (
                                    <motion.span
                                        key={i}
                                        className="inline-block mr-[0.25em]"
                                        variants={{
                                            hidden: {
                                                y: 40,
                                                opacity: 0,
                                                scale: 0.9,
                                                filter: 'blur(16px)',
                                            },
                                            visible: {
                                                y: 0,
                                                opacity: 1,
                                                scale: 1,
                                                filter: 'blur(0px)',
                                                transition: {
                                                    duration: 0.7,
                                                    delay: i * 0.15,
                                                    ease: [0.22, 1, 0.36, 1],
                                                },
                                            },
                                        }}
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                            </motion.h2>

                            {/* Subtitle: Blur-to-focus with letter-spacing */}
                            <motion.p
                                className="font-sans"
                                style={{ color: 'var(--metallic-muted)' }}
                                initial={{
                                    opacity: 0,
                                    y: 20,
                                    filter: 'blur(16px)',
                                    letterSpacing: '0.12em',
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                    filter: 'blur(0px)',
                                    letterSpacing: '0em',
                                }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{
                                    duration: 0.8,
                                    delay: 0.5,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                            >
                                From discovery to deployment in 14 days.
                            </motion.p>
                        </div>

                        {/* Timeline body — fades/blurs in after heading */}
                        <motion.div
                            className="relative"
                            ref={timelineRef}
                            initial={{
                                opacity: 0,
                                filter: 'blur(10px)',
                                y: 40,
                            }}
                            whileInView={{
                                opacity: 1,
                                filter: 'blur(0px)',
                                y: 0,
                            }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{
                                duration: 0.9,
                                delay: 0.8,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >

                            {/* --- MAIN SCROLL-DRIVEN SINGLE LINE --- */}
                            {/* Background Line (Light Gray) */}
                            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 h-full z-0" style={{ backgroundColor: 'var(--metallic-border)' }} />

                            {/* Active Fill Line (Solid Black) */}
                            <motion.div
                                className="absolute left-8 md:left-1/2 top-0 w-px -translate-x-1/2 z-0 origin-top"
                                style={{
                                    height: "100%",
                                    backgroundColor: 'var(--metallic-text)',
                                    scaleY: useSpring(scrollYProgress, { stiffness: 50, damping: 20, restDelta: 0.001 })
                                }}
                            />

                            <div className="space-y-32">
                                {STEPS.map((step, index) => (
                                    <div key={index} className={`relative flex flex-col md:flex-row gap-8 md:gap-0 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

                                        {/* CENTER DOT & CONNECTOR SVG */}
                                        <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 mt-8 z-10 flex items-center justify-center overflow-visible">

                                            {/* The Central Dot */}
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                whileInView={{ scale: 1 }}
                                                transition={{ duration: 0.5, delay: 0.2 }}
                                                viewport={{ once: true, margin: "-100px" }}
                                                className="relative flex items-center justify-center w-4 h-4"
                                            >
                                                <div
                                                    className="w-3 h-3 rounded-full relative z-20 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                                                    style={{ backgroundColor: 'var(--metallic-text)', border: '2px solid var(--metallic-muted)' }}
                                                ></div>
                                            </motion.div>

                                            {/* --- CONNECTOR BRANCHES (REMOVED) --- */}

                                        </div>

                                        {/* Content */}
                                        <motion.div
                                            className={`ml-20 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-32 md:text-right' : 'md:pl-32'}`}
                                            initial="hidden"
                                            whileInView="visible"
                                            viewport={{ once: true, margin: "-20%" }}
                                            variants={{
                                                hidden: {},
                                                visible: {
                                                    transition: {
                                                        staggerChildren: 0.1,
                                                        delayChildren: 0.2
                                                    }
                                                }
                                            }}
                                        >
                                            <div className="group relative">

                                                {/* Icon Animation */}
                                                <motion.div
                                                    variants={{
                                                        hidden: { scale: 0.5, opacity: 0, rotate: -45 },
                                                        visible: { scale: 1, opacity: 1, rotate: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
                                                    }}
                                                    className={`inline-flex items-center justify-center p-4 mb-6 transition-colors duration-500 rounded-full ${index % 2 === 0 ? 'md:ml-auto' : ''}`}
                                                    style={{ border: '1px solid var(--metallic-border)', color: 'var(--metallic-text)' }}
                                                >
                                                    <step.icon className="w-6 h-6" />
                                                </motion.div>

                                                {/* Title & Number */}
                                                <div className={`flex items-baseline gap-4 mb-2 justify-start ${index % 2 === 0 ? 'md:justify-end' : ''} flex-row overflow-hidden`}>
                                                    <div className={`flex items-baseline gap-4 ${index % 2 === 0 ? 'flex-row' : 'flex-row'}`}>
                                                        <span className="text-6xl font-serif italic font-light" style={{ color: 'var(--metallic-border)' }}>{index + 1}</span>
                                                        <h3 className="text-2xl font-serif italic font-light" style={{ color: 'var(--metallic-text)' }}>{step.title}</h3>
                                                    </div>
                                                </div>

                                                {/* Description */}
                                                <p className="font-sans leading-relaxed max-w-sm" style={{ color: 'var(--metallic-muted)' }}>
                                                    {step.desc}
                                                </p>
                                            </div>
                                        </motion.div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <div className="mt-40 mb-20 max-w-4xl mx-auto px-4" onMouseMove={(e) => { /* Mouse move logic remains if handled inline or via HowItWorksContent scope */ }}>
                            <Card className="w-full min-h-[400px] bg-black/40 backdrop-blur-md relative rounded-3xl border-white/10 overflow-visible text-left shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                                <Spotlight
                                    className="-top-40 left-0 md:left-60 md:-top-20"
                                    fill="white"
                                />

                                <div className="flex flex-col md:flex-row h-full">
                                    {/* Left content */}
                                    <div className="flex-1 p-8 md:p-12 relative z-20 flex flex-col justify-center">
                                        <p className="font-sans font-bold uppercase tracking-widest text-sm mb-6 text-neutral-400">Our Guarantee</p>
                                        <h3 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-6 font-serif italic relative z-20">
                                            "The AI never invents rules."
                                        </h3>
                                        <p className="text-neutral-300 max-w-lg mb-8 font-sans text-lg leading-relaxed relative z-20">
                                            Unlike generic chatbots, AIRA agents are constrained by your business logic.
                                            They do not hallucinate prices, policies, or promises. Every action follows your defined logic.
                                        </p>
                                        <div className="relative z-20">
                                            <InteractiveHoverButton
                                                variant="primary"
                                                text="Start Building"
                                                className="px-8 py-4 text-lg min-w-[180px]"
                                                onClick={() => navigate('/demo')}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Right content - Spline Scene - Absolute Positioning to Protrude */}
                                <div ref={splineRef} className="hidden md:block absolute -top-28 -right-20 w-[50%] h-[130%] pointer-events-none z-10 overflow-visible">
                                    {shouldLoadSpline && (
                                        <SplineScene
                                            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                                            className="w-full h-full scale-180"
                                        />
                                    )}
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </MetallicScrollBackground>
        </div>
    );
};
