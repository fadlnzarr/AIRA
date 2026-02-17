import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { AvatarProfile } from '../components/ui/AvatarProfile';

import { MetallicScrollBackground } from '../components/ui/metallic-scroll-background';

// --- Animation Variants ---

// --- Sophisticated Animation Variants ---

// 1. Hero: Slow Blur and Focus
// A cinematic, slow reveal that feels like coming into focus
const heroContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    }
};

const heroItemVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 1.0,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

// 2. Values: 3D "Card Deal"
// Cards slide up with a slight 3D rotation, feeling physical
const valuesContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.1
        }
    }
};

const valueCardVariants: Variants = {
    hidden: { opacity: 0, y: 40, rotateX: 15, transformPerspective: 1000 },
    visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

// 3. Mission: Weighty Slide
// A heavy, significant slide up for the main container
const missionContainerVariants: Variants = {
    hidden: { opacity: 0, y: 80 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1], // Custom "weighty" ease
            staggerChildren: 0.2
        }
    }
};

const missionItemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut"
        }
    }
};

// 4. Team: Spotlight Rise
// Clean, centered rise with a slight scale adjust
const teamContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const teamItemVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 60,
            damping: 20,
            mass: 1.2
        }
    }
};

const simpleFadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

export const About: React.FC = () => {
    return (
        <div className="min-h-screen relative selection:bg-white/20">
            <Navbar />

            <MetallicScrollBackground triggerElementId="mission-section">
                {/* Hero Section: Human Potential */}
                <motion.section
                    className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={heroContainerVariants}
                >
                    <motion.div className="flex flex-col items-center text-center relative max-w-4xl mx-auto">
                        <motion.div className="space-y-12 relative z-10 w-full">
                            {/* Title */}
                            <motion.h2
                                variants={simpleFadeUpVariants}
                                className="text-sm font-sans font-bold uppercase tracking-[0.3em] mb-12 text-center"
                                style={{ color: 'var(--metallic-muted)' }}
                            >
                                Why Are Humans Still Doing Repetitive Work?
                            </motion.h2>

                            {/* Content Blocks */}
                            <motion.div
                                className="space-y-6 text-lg md:text-xl font-light text-[var(--metallic-muted)]"
                            >
                                <motion.p
                                    variants={heroItemVariants}
                                    className="text-2xl md:text-3xl font-serif italic font-light"
                                    style={{ color: 'var(--metallic-text)' }}
                                >
                                    AIRA was founded on a simple belief: Humans shouldn't be robots.
                                </motion.p>
                                <motion.p variants={heroItemVariants}>
                                    For decades, businesses have forced talented employees to sit by phones, answering the same repetitive questions, booking appointments, and manually entering data.
                                </motion.p>
                                <motion.p variants={heroItemVariants}>
                                    It's boring, prone to error, and a waste of human potential.
                                </motion.p>
                                <motion.p variants={heroItemVariants}>
                                    We build <span className="font-serif italic font-light" style={{ color: 'var(--metallic-text)' }}>AI Voice Agents</span> that handle these tasks with superhuman reliability, allowing your team to focus on high-value, creative, and strategic work that actually moves the needle.
                                </motion.p>
                            </motion.div>
                        </motion.div>


                    </motion.div>
                </motion.section>

                {/* Values Section */}
                <motion.section
                    className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={valuesContainerVariants}
                >
                    <motion.h2
                        variants={simpleFadeUpVariants}
                        className="text-sm font-sans font-bold uppercase tracking-[0.3em] mb-12 text-center"
                        style={{ color: 'var(--metallic-muted)' }}
                    >
                        Our Values
                    </motion.h2>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16"
                    >
                        {[
                            {
                                title: "Human-First Automation",
                                desc: "Technology should amplify human ability, not diminish it."
                            },
                            {
                                title: "Relentless Precision",
                                desc: "Our systems are engineered for reliability, clarity, and measurable performance."
                            },
                            {
                                title: "Strategic Intelligence",
                                desc: "Automation without strategy is noise. Every voice agent we build aligns with business outcomes."
                            },
                            {
                                title: "Ethical AI",
                                desc: "Transparent logic. Clear boundaries. Responsible deployment."
                            }
                        ].map((value, index) => (
                            <motion.div
                                key={index}
                                variants={valueCardVariants}
                                className="space-y-4 text-center"
                            >
                                <h3
                                    className="text-2xl md:text-3xl font-serif italic font-light"
                                    style={{ color: 'var(--metallic-text)' }}
                                >
                                    {value.title}
                                </h3>
                                <p
                                    className="text-lg md:text-xl font-light leading-relaxed text-[var(--metallic-muted)]"
                                >
                                    {value.desc}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.section>

                {/* Mission Section */}
                <motion.section
                    id="mission-section"
                    className="py-32 px-6 md:px-12 max-w-5xl mx-auto text-center border-t border-white/10"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={missionContainerVariants}
                >
                    <motion.div
                        className="space-y-6 md:space-y-12"
                    >
                        <motion.h2
                            variants={simpleFadeUpVariants}
                            className="text-sm font-sans font-bold uppercase tracking-[0.3em] mb-12"
                            style={{ color: 'var(--metallic-muted)' }}
                        >
                            Our Mission
                        </motion.h2>

                        <motion.h3
                            variants={missionItemVariants}
                            className="text-4xl md:text-6xl font-serif italic font-light leading-tight"
                            style={{ color: 'var(--metallic-text)' }}
                        >
                            To eliminate wasted human potential from modern business.
                        </motion.h3>

                        <motion.p
                            variants={missionItemVariants}
                            className="text-lg md:text-xl font-light leading-relaxed text-[var(--metallic-muted)] max-w-3xl mx-auto"
                        >
                            AIRA designs Voice AI systems that operate with relentless consistency — removing bottlenecks, eliminating manual labor, and transforming how companies communicate at scale.
                        </motion.p>

                        <motion.div className="pt-0 md:pt-8 space-y-2">
                            <motion.p
                                variants={missionItemVariants}
                                className="text-lg md:text-xl font-light"
                                style={{ color: 'var(--metallic-muted)' }}
                            >
                                We are not optimizing workflows.
                            </motion.p>
                            <motion.p
                                variants={missionItemVariants}
                                className="text-3xl md:text-4xl font-serif italic"
                                style={{ color: 'var(--metallic-text)' }}
                            >
                                We are redesigning how work gets done.
                            </motion.p>
                        </motion.div>
                    </motion.div>
                </motion.section>

                {/* Minds Behind AIRA Section */}
                <motion.section
                    className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={teamContainerVariants}
                >
                    <motion.h2
                        variants={simpleFadeUpVariants}
                        className="text-sm font-sans font-bold uppercase tracking-[0.3em] mb-16 text-center"
                        style={{ color: 'var(--metallic-muted)' }}
                    >
                        Minds Behind AIRA
                    </motion.h2>

                    <motion.div
                        className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24"
                    >
                        <motion.div variants={teamItemVariants}>
                            <AvatarProfile
                                name="Fadil Nizar"
                                role="Founder"
                                image="/images/fadil-nizar-founder.jpg"
                            />
                        </motion.div>
                        <motion.div variants={teamItemVariants}>
                            <AvatarProfile
                                name="Cyril Thomas"
                                role="Lead Engineer"
                                image="/images/cyril-thomas.jpg"
                            />
                        </motion.div>
                    </motion.div>
                </motion.section>

                {/* CTA / Footer placeholder */}
                {/* CTA / Footer placeholder removed per request */}
            </MetallicScrollBackground>
        </div>
    );
};