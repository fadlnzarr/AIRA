import React from 'react';
import { motion } from 'framer-motion';

export const ArchitectureTitle: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto mb-12 relative z-10">
      <div className="relative w-full aspect-[4/1] md:aspect-[5/1] max-h-[200px] flex items-center justify-center">
        <svg
          viewBox="0 0 1000 200"
          className="w-full h-full overflow-visible"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="20%" stopColor="rgba(0,0,0,0.1)" />
              <stop offset="50%" stopColor="rgba(0,0,0,0.6)" />
              <stop offset="80%" stopColor="rgba(0,0,0,0.1)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>

            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 1. Voice Input Waves (Left) */}
          <g transform="translate(50, 100)">
            {[0, 1, 2].map((i) => (
              <motion.path
                key={i}
                d={`M0,0 Q50,${-40 + i * 10} 100,0 T200,0`}
                fill="none"
                stroke="black"
                strokeWidth="2"
                strokeOpacity={0.1}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: 1,
                  opacity: [0.1, 0.4, 0.1],
                  d: [
                    `M0,0 Q50,${-30 + i * 10} 100,0 T200,0`,
                    `M0,0 Q50,${30 - i * 10} 100,0 T200,0`,
                    `M0,0 Q50,${-30 + i * 10} 100,0 T200,0`
                  ]
                }}
                transition={{
                  pathLength: { duration: 1.5, ease: "easeOut" },
                  opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  d: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }
                }}
              />
            ))}
            {/* Connection to Text */}
            <motion.line
              x1="200" y1="0" x2="280" y2="0"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 1 }}
            />
          </g>

          {/* 2. Main Title Text - Blur Reveal */}
          <g filter="url(#glow)">
            <motion.text
              x="50%"
              y="65%"
              textAnchor="middle"
              fontFamily="'Bodoni Moda', serif"
              fontStyle="italic"
              fontWeight="300"
              fontSize="120"
              fill="black"
              initial={{ opacity: 0, filter: "blur(20px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              Architecture
            </motion.text>
          </g>

          {/* 3. Output Network Lines (Right) */}
          <g transform="translate(720, 100)">
            {/* Main Trunk */}
            <motion.line
              x1="0" y1="0" x2="80" y2="0"
              stroke="black"
              strokeWidth="2"
              strokeOpacity={0.1}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
            />

            {/* Branch Top */}
            <motion.path
              d="M80,0 L120,-40 L200,-40"
              fill="none"
              stroke="black"
              strokeWidth="1"
              strokeOpacity={0.1}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 1.7 }}
            />
            <motion.circle cx="200" cy="-40" r="3" fill="black" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2.7 }} />

            {/* Branch Middle */}
            <motion.path
              d="M80,0 L200,0"
              fill="none"
              stroke="black"
              strokeWidth="1"
              strokeOpacity={0.1}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 1.9 }}
            />
            <motion.circle cx="200" cy="0" r="3" fill="black" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2.9 }} />

            {/* Branch Bottom */}
            <motion.path
              d="M80,0 L120,40 L200,40"
              fill="none"
              stroke="black"
              strokeWidth="1"
              strokeOpacity={0.1}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 2.1 }}
            />
            <motion.circle cx="200" cy="40" r="3" fill="black" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 3.1 }} />

            {/* Data Packets traveling on branches */}
            {[0, 1, 2].map(i => (
              <motion.circle
                key={i}
                r="2"
                fill="black"
                initial={{ opacity: 0, x: 0, y: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  x: [0, 80, 120, 200],
                  y: [0, 0, i === 0 ? -40 : i === 1 ? 0 : 40, i === 0 ? -40 : i === 1 ? 0 : 40]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 3 + (i * 0.5),
                  times: [0, 0.3, 0.5, 1]
                }}
              />
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
};