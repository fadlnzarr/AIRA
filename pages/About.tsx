import React from 'react';
import { AnimatedSection } from '../components/AnimatedSection';

export const About: React.FC = () => {
    return (
        <div className="pt-32 pb-20 bg-black min-h-screen">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Title with initial transition */}
                <AnimatedSection className="mb-16">
                    <h1 className="text-6xl md:text-9xl font-serif italic font-light text-white leading-[0.9]">
                        Human <br/> Potential.
                    </h1>
                </AnimatedSection>

                {/* Intro Text with delayed transition */}
                <AnimatedSection delay={0.2} className="flex flex-col md:flex-row gap-12 md:gap-24 border-t border-white/20 pt-12 mb-32">
                    <div className="flex-1">
                        <p className="text-xl md:text-2xl text-white font-serif italic leading-relaxed">
                            AIRA was founded on a simple belief: <br/>
                            Humans shouldn't be robots.
                        </p>
                    </div>
                    <div className="flex-1 space-y-8">
                        <p className="text-lg text-white/60 font-sans leading-relaxed">
                            For decades, businesses have forced talented employees to sit by phones, answering the same repetitive questions, booking appointments, and manually entering data. It's boring, prone to error, and a waste of human potential.
                        </p>
                        <p className="text-lg text-white/60 font-sans leading-relaxed">
                            We build <strong className="text-white font-serif italic text-2xl">AI Voice Agents</strong> that handle these tasks with superhuman reliability, allowing your team to focus on high-value, creative, and strategic work that actually moves the needle.
                        </p>
                    </div>
                </AnimatedSection>

                {/* Mission & Values with further delayed transition */}
                <AnimatedSection delay={0.4} className="grid grid-cols-1 md:grid-cols-2 border-t border-white/20">
                    <div className="p-12 md:p-24 border-b md:border-b-0 md:border-r border-white/20">
                        <h3 className="text-4xl font-serif italic font-light text-white mb-8">Mission</h3>
                        <p className="text-white/60 font-sans leading-relaxed">To democratize access to enterprise-grade AI automation for businesses of all sizes, eliminating communication bottlenecks forever.</p>
                    </div>
                    <div className="p-12 md:p-24">
                        <h3 className="text-4xl font-serif italic font-light text-white mb-8">Values</h3>
                        <ul className="space-y-6 text-white/60 font-sans">
                            <li className="flex flex-col">
                                <strong className="text-white font-serif italic text-xl mb-1">Reliability First</strong>
                                <span>No hallucinations. No guessing. Logic is law.</span>
                            </li>
                            <li className="flex flex-col">
                                <strong className="text-white font-serif italic text-xl mb-1">Absolute Speed</strong>
                                <span>Latency under 500ms is non-negotiable.</span>
                            </li>
                            <li className="flex flex-col">
                                <strong className="text-white font-serif italic text-xl mb-1">Radical Transparency</strong>
                                <span>You own your data, your logic, and your customers.</span>
                            </li>
                        </ul>
                    </div>
                </AnimatedSection>
            </div>
        </div>
    );
};