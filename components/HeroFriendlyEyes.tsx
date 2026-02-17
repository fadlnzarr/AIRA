import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const HeroFriendlyEyes: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isBlinking, setIsBlinking] = useState(false);

    // Tracking Logic
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                // Calculate position relative to center
                const relativeX = e.clientX - centerX;
                const relativeY = e.clientY - centerY;

                // Constraints for pupil movement
                const maxX = 12; // Wider range for more expressiveness
                const maxY = 8;

                const angle = Math.atan2(relativeY, relativeX);
                const distance = Math.min(Math.sqrt(relativeX * relativeX + relativeY * relativeY), 150);

                const moveX = Math.cos(angle) * Math.min(distance / 6, maxX);
                const moveY = Math.sin(angle) * Math.min(distance / 6, maxY);

                setMousePosition({ x: moveX, y: moveY });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Blinking Logic
    useEffect(() => {
        const blinkLoop = () => {
            setIsBlinking(true);
            setTimeout(() => {
                setIsBlinking(false);
                // Random next blink between 2s and 6s
                const nextBlink = Math.random() * 4000 + 2000;
                setTimeout(blinkLoop, nextBlink);
            }, 150); // Blink duration
        };

        const initialTimeout = setTimeout(blinkLoop, 3000);
        return () => clearTimeout(initialTimeout);
    }, []);

    // Styles
    // Container for both eyes
    const containerStyle = "flex gap-[16px] items-center justify-center filter drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]";

    // Eye Shape: Large vertical ovals, slightly rotated for cuteness
    const eyeStyle = `relative w-[40px] h-[55px] bg-[#fff] rounded-[48%] overflow-hidden flex items-center justify-center transition-all duration-100 ease-in-out`;

    // Pupil: Large, friendly, dark
    const pupilStyle = "w-[24px] h-[28px] bg-[#1a1a1a] rounded-full relative shadow-inner";

    // Highlight: Essential for "cute" factor (anime style highlight)
    const highlightStyle = "absolute top-[4px] right-[4px] w-[8px] h-[8px] bg-white rounded-full opacity-90";
    const subHighlightStyle = "absolute bottom-[6px] left-[6px] w-[4px] h-[4px] bg-white rounded-full opacity-60";

    const blinkVariants = {
        open: { scaleY: 1 },
        closed: { scaleY: 0.1 }
    };

    return (
        <div ref={containerRef} className={containerStyle}>
            {/* Left Eye */}
            <motion.div
                className={eyeStyle}
                animate={isBlinking ? "closed" : "open"}
                variants={blinkVariants}
            >
                <motion.div
                    className={pupilStyle}
                    animate={{ x: mousePosition.x, y: mousePosition.y }}
                    transition={{ type: "spring", stiffness: 120, damping: 15 }}
                >
                    <div className={highlightStyle} />
                    <div className={subHighlightStyle} />
                </motion.div>
            </motion.div>

            {/* Right Eye */}
            <motion.div
                className={eyeStyle}
                animate={isBlinking ? "closed" : "open"}
                variants={blinkVariants}
            >
                <motion.div
                    className={pupilStyle}
                    animate={{ x: mousePosition.x, y: mousePosition.y }}
                    transition={{ type: "spring", stiffness: 120, damping: 15 }}
                >
                    <div className={highlightStyle} />
                    <div className={subHighlightStyle} />
                </motion.div>
            </motion.div>
        </div>
    );
};
