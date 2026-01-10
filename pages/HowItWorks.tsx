import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { AnimatedSection } from '../components/AnimatedSection';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { Search, PenTool, Mic, Zap, TestTube, TrendingUp } from 'lucide-react';
import { WorkflowDiagram } from '../components/WorkflowDiagram';
import { ArchitectureTitle } from '../components/ArchitectureTitle';

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

    // Organic wavy path for the main timeline
    // This creates a subtle "hand-drawn" feel that weaves down the center
    const mainPathD = "M 50 0 C 50 0 55 12 50 25 C 45 37 50 50 50 50 C 50 50 55 62 50 75 C 45 87 50 100 50 100";

    return (
        <div className="pt-32 pb-20 bg-black min-h-screen overflow-hidden">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header with Animated SVG Architecture Title */}
                <div className="flex flex-col items-center justify-center mb-10 relative">
                    <div className="w-full flex justify-center">
                        <ArchitectureTitle />
                    </div>
                </div>

                {/* Interactive Workflow Visualization */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(20px)" }}
                    whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-40"
                >
                    <WorkflowDiagram />
                </motion.div>

                {/* Implementation Timeline Title */}
                <AnimatedSection className="mb-20 text-center relative z-10">
                     <h2 className="text-4xl md:text-5xl font-serif italic font-light text-white mb-4">Implementation Process</h2>
                     <p className="text-white/50 font-sans">From discovery to deployment in 14 days.</p>
                </AnimatedSection>

                <div className="relative" ref={timelineRef}>
                    
                    {/* --- MAIN SCROLL-DRIVEN SVG TIMELINE --- */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-32 -translate-x-1/2 h-full z-0 hidden md:block pointer-events-none">
                        <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                            <defs>
                                <linearGradient id="timeline-gradient" x1="0" y1="0" x2="0" y2="1" gradientUnits="userSpaceOnUse">
                                    <stop offset="0%" stopColor="#fff" stopOpacity="0" />
                                    <stop offset="5%" stopColor="#fff" stopOpacity="0.5" />
                                    <stop offset="95%" stopColor="#fff" stopOpacity="0.5" />
                                    <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                                </linearGradient>
                                <filter id="glow-line" x="-50%" y="-50%" width="200%" height="200%">
                                    <feGaussianBlur stdDeviation="1" result="coloredBlur" />
                                    <feMerge>
                                        <feMergeNode in="coloredBlur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>
                            
                            {/* Background Track (Dashed) */}
                            <path 
                                d={mainPathD} 
                                stroke="white" 
                                strokeOpacity="0.1" 
                                strokeWidth="1" 
                                strokeDasharray="3 3" 
                                vectorEffect="non-scaling-stroke" 
                                fill="none"
                            />
                            
                            {/* Active Scroll Path */}
                            <motion.path 
                                d={mainPathD} 
                                stroke="url(#timeline-gradient)" 
                                strokeWidth="2" 
                                vectorEffect="non-scaling-stroke"
                                style={{ pathLength }}
                                filter="url(#glow-line)"
                                fill="none"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>

                    {/* Mobile Timeline Line (Simplified) */}
                    <div className="absolute left-8 top-0 bottom-0 w-px bg-white/10 md:hidden z-0">
                         <motion.div 
                            className="absolute top-0 left-0 w-full bg-white shadow-[0_0_15px_white]"
                            style={{ height: useSpring(useScroll({ target: timelineRef }).scrollYProgress, { stiffness: 50, damping: 20 }).get() * 100 + "%" }}
                         />
                    </div>

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
                                        <div className="w-3 h-3 bg-black border-2 border-white rounded-full relative z-20 shadow-[0_0_15px_rgba(255,255,255,0.8)]"></div>
                                    </motion.div>

                                    {/* --- CONNECTOR BRANCHES --- */}
                                    {/* Desktop Connector: Organic curve from center OUT to the content */}
                                    <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 pointer-events-none ${index % 2 === 0 ? 'left-2' : 'right-2'}`}>
                                         <svg width="120" height="40" className={`overflow-visible ${index % 2 !== 0 ? 'transform rotate-180' : ''}`}>
                                             <motion.path
                                                // Curve: Starts at (0, 20), curves up/down to (100, 20)
                                                d="M 0 20 C 30 20 50 5 100 20"
                                                fill="none"
                                                stroke="white"
                                                strokeWidth="1"
                                                strokeOpacity="0.4"
                                                initial={{ pathLength: 0, opacity: 0 }}
                                                whileInView={{ pathLength: 1, opacity: 1 }}
                                                viewport={{ once: true, margin: "-150px" }}
                                                transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                                             />
                                             <motion.circle 
                                                cx="100" cy="20" r="2" fill="white"
                                                initial={{ scale: 0 }}
                                                whileInView={{ scale: 1 }}
                                                transition={{ delay: 1.2 }}
                                             />
                                         </svg>
                                    </div>
                                    
                                    {/* Mobile Connector: Draws from Left line to Content */}
                                    <div className="md:hidden absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none">
                                         <svg width="60" height="20" className="overflow-visible">
                                             <motion.path
                                                d="M 0 10 Q 30 10 50 10"
                                                fill="none"
                                                stroke="white"
                                                strokeWidth="1"
                                                strokeOpacity="0.3"
                                                initial={{ pathLength: 0 }}
                                                whileInView={{ pathLength: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.5, delay: 0.2 }}
                                             />
                                         </svg>
                                    </div>

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
                                            className={`inline-flex items-center justify-center p-4 border border-white/20 mb-6 group-hover:bg-white group-hover:text-black transition-colors duration-500 rounded-full ${index % 2 === 0 ? 'md:ml-auto' : ''}`}
                                        >
                                            <step.icon className="w-6 h-6" />
                                        </motion.div>

                                        {/* Title & Number */}
                                        <div className={`flex items-baseline gap-4 mb-2 justify-start ${index % 2 === 0 ? 'md:justify-end' : ''} flex-row overflow-hidden`}>
                                            <motion.span 
                                                variants={{
                                                    hidden: { x: index % 2 === 0 ? 20 : -20, opacity: 0 },
                                                    visible: { x: 0, opacity: 1, transition: { duration: 0.6 } }
                                                }}
                                                className={`font-sans font-bold text-4xl text-white/20 order-1 ${index % 2 === 0 ? 'md:order-2' : ''}`}
                                            >
                                                0{index+1}
                                            </motion.span>
                                            
                                            <motion.h3 
                                                variants={{
                                                    hidden: { y: 20, opacity: 0, filter: "blur(5px)" },
                                                    visible: { y: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 0.6 } }
                                                }}
                                                className={`text-3xl font-serif italic font-light text-white order-2 ${index % 2 === 0 ? 'md:order-1' : ''}`}
                                            >
                                                {step.title}
                                            </motion.h3>
                                        </div>

                                        {/* Description */}
                                        <motion.p 
                                            variants={{
                                                hidden: { opacity: 0 },
                                                visible: { opacity: 1, transition: { duration: 0.8 } }
                                            }}
                                            className="text-white/60 font-sans leading-relaxed"
                                        >
                                            {step.desc}
                                        </motion.p>
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>

                <AnimatedSection className="mt-40 text-center bg-white text-black p-12 md:p-20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 border-l border-b border-black/10"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 border-r border-t border-black/10"></div>
                    
                    <p className="font-sans font-bold uppercase tracking-widest text-sm mb-6 relative z-10">Our Guarantee</p>
                    <h3 className="text-4xl md:text-6xl font-serif italic font-light mb-8 relative z-10">"The AI never invents rules."</h3>
                    <p className="text-black/70 max-w-2xl mx-auto mb-10 font-sans text-lg relative z-10">
                        Unlike generic chatbots, AIRA agents are constrained by your business logic. 
                        They do not hallucinate prices, policies, or promises. Every action follows your defined logic.
                    </p>
                    <Button variant="secondary" onClick={() => navigate('/demo')}>Start Building</Button>
                </AnimatedSection>
            </div>
        </div>
    );
};
