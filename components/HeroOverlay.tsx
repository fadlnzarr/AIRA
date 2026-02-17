import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Mail, ArrowRight, User, Terminal } from 'lucide-react';
import { HeroAIOrb } from './HeroAIOrb';
import { TechHUD } from './TechHUD';
import { InteractiveHoverButton } from './ui/interactive-hover-button';

export const HeroOverlay: React.FC = () => {
    return (
        <div className="relative w-full h-[100dvh] bg-[#F2F2F0] overflow-hidden text-black">

            {/* 1. Background Vignette & Grid (Light Mode) */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0)_0%,_rgba(200,200,200,0.5)_90%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
            </div>

            {/* 2. 3D Scene Layer */}
            <div className="absolute inset-0 z-10">
                <HeroAIOrb />
            </div>

            {/* 3. Helper HUD Layer */}
            <TechHUD />

            {/* 4. Content Overlay */}
            <div className="absolute inset-0 z-20 flex flex-col justify-between p-8 md:p-12 pointer-events-none">

                {/* Top Section - Logo & Nav */}
                <div className="flex justify-between items-start">
                    {/* Logo - Handled by Navbar component usually, but adding hero-specific title here if needed */}
                    <div />

                    {/* Mobile Menu Trigger Placeholder (if needed) */}
                    <div />
                </div>

                {/* Middle Section - Hero Text */}
                <div className="relative flex flex-col justify-center h-full w-full max-w-7xl mx-auto pointer-events-none">
                    <div className="flex justify-between items-center w-full">

                        {/* Left Side Text */}
                        <motion.h1
                            initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                            className="text-4xl md:text-6xl lg:text-7xl leading-[1.1] font-bold italic font-serif tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-black via-black to-black/50 select-none max-w-xl text-left py-2"
                        >
                            Your business
                            <br />
                            never sleeps
                        </motion.h1>

                        {/* Right Side Text */}
                        <motion.h1
                            initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                            transition={{ duration: 1.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            className="text-4xl md:text-6xl lg:text-7xl leading-[1.1] font-bold italic font-serif tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-black via-black to-black/50 select-none max-w-xl text-right py-2"
                        >
                            Neither should
                            <br />
                            your phones.
                        </motion.h1>

                    </div>
                </div>

                {/* Bottom Section - Socials & Call to Action */}
                <div className="flex justify-end items-end w-full pointer-events-auto">
                    <div className="flex flex-col gap-4 items-end">

                        {/* Social Pills */}
                        <div className="flex items-center gap-3">
                            {[
                                { icon: Github, label: "Github", href: "#" },
                                { icon: Twitter, label: "Twitter", href: "#" },
                                { icon: Mail, label: "Email", href: "#" }
                            ].map((item, i) => (
                                <motion.a
                                    key={i}
                                    href={item.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 1.2 + (i * 0.1) }}
                                    whileHover={{ scale: 1.05, backgroundColor: "rgba(0,0,0,0.05)" }}
                                    className="p-3 rounded-full border border-dashed border-black/10 bg-white/50 backdrop-blur-md text-black/60 hover:text-black hover:border-black/30 transition-colors"
                                >
                                    <item.icon size={18} />
                                </motion.a>
                            ))}
                        </div>

                        {/* Primary CTA */}
                        <InteractiveHoverButton
                            text="Deploy Agent"
                            variant="primary"
                            className="mt-4"
                            icon={<ArrowRight size={20} />}
                        />

                    </div>
                </div>

            </div>

        </div>
    );
};
