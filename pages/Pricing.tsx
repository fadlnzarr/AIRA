
import React from 'react';
import { AnimatedSection } from '../components/AnimatedSection';
import { Button } from '../components/Button';
import { Check, ArrowUpRight, Zap, Briefcase, Globe } from 'lucide-react';
import { PRICING_TIERS } from '../constants';
import { useNavigate } from 'react-router-dom';

const TIER_ICONS = [Zap, Briefcase, Globe];

export const Pricing: React.FC = () => {
    const navigate = useNavigate();

    const handleSelectPlan = (planName: string) => {
        navigate('/contact', { 
            state: { selectedPlan: planName } 
        });
    };

    return (
        <div className="pt-32 pb-20 bg-black min-h-screen">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
                <AnimatedSection className="text-center mb-24">
                    <h1 className="text-6xl md:text-8xl font-serif italic font-light text-white mb-8">Investment</h1>
                    <p className="text-xl text-white/60 font-sans">Transparent pricing. No hidden fees.</p>
                </AnimatedSection>

                {/* Grid Container - Matches Home Page Capabilities */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/20 border border-white/10">
                    {PRICING_TIERS.map((tier, index) => {
                        const Icon = TIER_ICONS[index % TIER_ICONS.length];
                        
                        return (
                            <AnimatedSection key={tier.name} delay={index * 0.1} className="bg-black h-full relative z-0 hover:z-20 transition-all duration-300">
                                <div className="group relative h-full min-h-[700px] p-8 flex flex-col justify-between 
                                    bg-black hover:bg-white 
                                    transition-all duration-500 ease-out 
                                    hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl
                                    cursor-none overflow-hidden">
                                    
                                    {/* Background Icon - Massive & Subtle */}
                                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
                                        <Icon 
                                            strokeWidth={0.5} 
                                            className="w-[120%] h-[120%] text-white/5 group-hover:text-black/5 transition-colors duration-500 transform -rotate-12 opacity-50" 
                                        />
                                    </div>

                                    {/* Top Row: Number & Arrow */}
                                    <div className="flex justify-between items-start relative z-10 mb-8">
                                        <span className="font-sans font-bold text-white/30 text-sm group-hover:text-black/30 transition-colors duration-500">0{index + 1}</span>
                                        <ArrowUpRight className="w-8 h-8 text-white group-hover:text-black opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    </div>

                                    {/* Main Content */}
                                    <div className="relative z-10 flex flex-col h-full">
                                        
                                        <div className="mb-8">
                                            {/* Tier Icon */}
                                            <Icon className="w-12 h-12 text-white group-hover:text-black mb-6 opacity-50 group-hover:opacity-100 transition-all duration-500" />
                                            
                                            {/* Name */}
                                            <h3 className="text-4xl font-serif italic font-light mb-2 text-white group-hover:text-black group-hover:not-italic transition-all duration-300">
                                                {tier.name}
                                            </h3>
                                            
                                            {/* Price */}
                                            <div className="flex items-baseline mb-4">
                                                <span className="text-4xl font-sans font-bold text-white group-hover:text-black transition-colors duration-300 tracking-tighter">
                                                    {tier.price}
                                                </span>
                                                {tier.price !== 'Custom' && (
                                                    <span className="text-white/40 group-hover:text-black/40 ml-2 font-sans transition-colors duration-300">/mo</span>
                                                )}
                                            </div>

                                            {/* Description */}
                                            <p className="text-white/50 group-hover:text-black/60 font-sans text-sm leading-relaxed transition-colors duration-300 min-h-[40px]">
                                                {tier.description}
                                            </p>
                                        </div>

                                        {/* Features List */}
                                        <ul className="space-y-4 mb-12 flex-1">
                                            {tier.features.map((feature, i) => (
                                                <li key={i} className="flex items-start gap-3 text-white/60 group-hover:text-black/60 transition-colors duration-300 text-sm font-sans">
                                                    <Check className="w-4 h-4 mt-0.5 text-white/40 group-hover:text-black/40 flex-shrink-0 transition-colors duration-300" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* CTA Button */}
                                        <Button 
                                            variant="outline" 
                                            className="w-full border-white/20 group-hover:border-black/20 text-white group-hover:text-black group-hover:hover:bg-black group-hover:hover:text-white transition-all duration-300"
                                            onClick={() => handleSelectPlan(tier.name)}
                                        >
                                            {tier.price === 'Custom' ? 'Contact Sales' : 'Select Plan'}
                                        </Button>

                                    </div>
                                </div>
                            </AnimatedSection>
                        );
                    })}
                </div>

                <AnimatedSection className="mt-20 text-center">
                    <p className="text-white/40 font-sans">
                        Need enterprise volume? <a href="/contact" className="text-white underline underline-offset-4 hover:text-white/80">Talk to sales</a>
                    </p>
                </AnimatedSection>
            </div>
        </div>
    );
};
