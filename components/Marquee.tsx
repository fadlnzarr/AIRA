import React from 'react';
import { motion } from 'framer-motion';

interface MarqueeProps {
  items: string[];
  direction?: 'left' | 'right';
  speed?: number;
}

export const Marquee: React.FC<MarqueeProps> = ({ items, direction = 'left', speed = 20 }) => {
  return (
    <div className="relative flex overflow-hidden py-6 border-y border-white/20 bg-black">
      <div className="flex whitespace-nowrap">
        <motion.div
          className="flex gap-16 pr-16"
          animate={{
            x: direction === 'left' ? ["0%", "-50%"] : ["-50%", "0%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: speed,
              ease: "linear",
            },
          }}
        >
          {[...items, ...items, ...items, ...items].map((item, i) => (
            <span key={i} className="text-4xl md:text-6xl font-serif italic font-light text-white uppercase tracking-tight">
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};