'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface MaskTextProps {
    children: string | string[];
    className?: string;
    delay?: number;
    stagger?: number;
    duration?: number;
}

/**
 * MaskText Component
 * Replicates the "Mask-Line-Text" effect from Framer.
 * Wraps text in overflow-hidden containers and animates them upwards.
 */
export const MaskText: React.FC<MaskTextProps> = ({
    children,
    className = "",
    delay = 0,
    stagger = 0.1,
    duration = 1
}) => {
    // If children is a string, we treat it as a single line or split by newlines
    // If it's an array, each element is a line
    const lines = Array.isArray(children)
        ? children
        : children.split('\n').filter(line => line.trim() !== "");

    return (
        <div className={`flex flex-col ${className}`}>
            {lines.map((line, index) => (
                <div key={index} className="overflow-hidden py-[0.1em] -my-[0.1em]">
                    <motion.div
                        initial={{ y: "115%", opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: duration,
                            delay: delay + (index * stagger),
                            ease: [0.52, 0.02, 0.18, 1.01]
                        }}
                    >
                        {line}
                    </motion.div>
                </div>
            ))}
        </div>
    );
};
