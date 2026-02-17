import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Testimonial {
    quote: string;
    name: string;
    title: string;
    image: string;
}

interface QuoteTestimonialProps {
    testimonials: Testimonial[];
    className?: string;
}

export const QuoteTestimonial: React.FC<QuoteTestimonialProps> = ({
    testimonials,
    className
}) => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className={`w-full max-w-4xl mx-auto flex flex-col items-center text-center space-y-12 ${className}`}>
            {/* Quote Section with Blur Transition */}
            <div className="min-h-[200px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                        exit={{ opacity: 0, filter: "blur(10px)", y: -20 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="space-y-8"
                    >
                        <h3 className="text-3xl md:text-5xl font-serif text-white italic leading-tight">
                            "{testimonials[activeIndex].quote}"
                        </h3>
                        <div className="space-y-1">
                            <div className="text-lg font-medium tracking-wide text-white uppercase">
                                {testimonials[activeIndex].name}
                            </div>
                            <div className="text-sm font-light tracking-widest text-[var(--metallic-muted)] uppercase">
                                {testimonials[activeIndex].title}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Avatar Selector */}
            <div className="flex items-center justify-center gap-6">
                {testimonials.map((testimonial, index) => {
                    const isActive = index === activeIndex;
                    return (
                        <motion.button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            whileHover={{ scale: 1.2, zIndex: 10 }}
                            animate={{
                                scale: isActive ? 1.3 : 1,
                                opacity: isActive ? 1 : 0.5,
                                filter: isActive ? "grayscale(0%)" : "grayscale(100%)"
                            }}
                            transition={{ duration: 0.3 }} // Smooth expansion
                            className="relative rounded-full focus:outline-none"
                        >
                            <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 transition-colors duration-300 ${isActive ? 'border-white' : 'border-transparent'}`}>
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {isActive && (
                                <motion.div
                                    layoutId="active-glow"
                                    className="absolute inset-0 rounded-full bg-white/20 blur-md -z-10"
                                    transition={{ duration: 0.3 }}
                                />
                            )}
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
};
