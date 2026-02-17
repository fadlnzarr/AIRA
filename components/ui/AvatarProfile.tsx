import React from 'react';
import { motion } from 'framer-motion';

interface AvatarProfileProps {
    name: string;
    role: string;
    image?: string;
    className?: string;
}

export const AvatarProfile: React.FC<AvatarProfileProps> = ({ name, role, image, className = "" }) => {
    return (
        <motion.div
            className={`flex items-center gap-6 group ${className}`}
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
            {/* Avatar */}
            <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border border-white/10 group-hover:border-white/30 transition-colors duration-300 bg-neutral-900 shrink-0">
                {image ? (
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-neutral-800 text-white/50 text-xl font-mono">
                        {name.charAt(0)}
                    </div>
                )}
            </div>

            {/* Text */}
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 text-left">
                <span className="text-lg md:text-xl font-mono uppercase tracking-wider text-[var(--metallic-text)] group-hover:text-white transition-colors duration-300">
                    {name}
                </span>
                <span className="hidden md:inline text-white/30 text-lg">,</span>
                <span className="text-sm md:text-lg font-mono uppercase tracking-widest text-[var(--metallic-muted)]">
                    {role}
                </span>
            </div>
        </motion.div>
    );
};
