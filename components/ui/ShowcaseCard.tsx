import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ShowcaseCardProps {
    name: string;
    role: string;
    bio: string;
    image: string;
    className?: string;
}

export const ShowcaseCard: React.FC<ShowcaseCardProps> = ({
    name,
    role,
    bio,
    image,
    className = ""
}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            layout
            data-isOpen={isOpen}
            className={`relative bg-white/5 border border-white/10 overflow-hidden w-full max-w-[400px] mx-auto ${className}`}
            style={{ borderRadius: 34 }}
            initial={{ borderRadius: 34 }}
        >
            {/* Main Content Container */}
            <motion.div layout className="relative z-10">

                {/* Image Section */}
                <motion.div
                    layout
                    className="relative w-full aspect-square overflow-hidden"
                    style={{
                        borderTopLeftRadius: 34,
                        borderTopRightRadius: 34,
                        borderBottomLeftRadius: 34,
                        borderBottomRightRadius: 34
                    }}
                >
                    <motion.img
                        layoutId="image"
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover"
                    />

                    {/* Overlay Gradient for Text Readability if needed */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </motion.div>

                {/* Header Info (Always Visible) */}
                <motion.div layout className="p-6 flex items-center justify-between">
                    <motion.div layout className="space-y-1">
                        <motion.h3
                            layout
                            className="text-2xl font-serif italic text-white"
                            style={{ color: 'var(--metallic-text)' }}
                        >
                            {name}
                        </motion.h3>
                        <motion.p
                            layout
                            className="text-xs font-sans font-bold uppercase tracking-widest text-[var(--metallic-muted)]"
                        >
                            {role}
                        </motion.p>
                    </motion.div>

                    <motion.button
                        layout
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                        whileTap={{ scale: 0.95 }}
                    >
                        {isOpen ? <ChevronUp className="w-5 h-5 text-white" /> : <ChevronDown className="w-5 h-5 text-white" />}
                    </motion.button>
                </motion.div>

                {/* Expanded Content */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="px-6 pb-8"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ delay: 0.1 }}
                                className="pt-4 border-t border-white/10"
                            >
                                <p className="text-sm font-light leading-relaxed text-[var(--metallic-muted)]">
                                    {bio}
                                </p>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
};
