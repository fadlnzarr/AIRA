import React, { useState } from 'react';
import { motion, useSpring, useTransform, useMotionValue, AnimatePresence } from 'framer-motion';

interface AvatarItem {
    name: string;
    designation: string;
    image: string;
    imageStyle?: React.CSSProperties;
    statement?: string;
}

interface AvatarPopProps {
    items: AvatarItem[];
    gap?: number;
    overlap?: number;
    imageSize?: number;
    borderColor?: string;
    popBackground?: string;
    popTextColor?: string;
    designationColor?: string;
    className?: string;
    style?: React.CSSProperties;
}

export const AvatarPop: React.FC<AvatarPopProps> = ({
    items = [],
    gap = 8,
    overlap = 16,
    imageSize = 56,
    borderColor = "#FFFFFF",
    popBackground = "rgba(0,0,0,0.9)", // Darker background for AIRA theme
    popTextColor = "#FFFFFF",
    designationColor = "#A0A0A0",
    style,
    className
}) => {
    const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);

    return (
        <div
            className={className}
            style={{
                ...style,
                display: "flex",
                alignItems: "center",
                gap: `${gap}px`
            }}
        >
            {items.map((item, index) => {
                const uniqueId = `${item.name.toLowerCase().replace(/\s+/g, "-")}-${index}`;
                const x = useMotionValue(0);
                const springConfig = { stiffness: 100, damping: 5 };
                const rotate = useSpring(useTransform(x, [-100, 100], [-45, 45]), springConfig);
                const translateX = useSpring(useTransform(x, [-100, 100], [-50, 50]), springConfig);

                const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
                    const target = event.currentTarget;
                    const halfWidth = target.offsetWidth / 2;
                    x.set(event.nativeEvent.offsetX - halfWidth);
                };

                const hasStatement = !!item.statement;
                const isHovered = hoveredIndex === uniqueId;

                return (
                    <div
                        key={uniqueId}
                        style={{
                            position: "relative",
                            display: "flex", // Needed for side-by-side layout
                            alignItems: "center", // Align statement vertically
                            marginRight: index < items.length - 1 ? `-${overlap}px` : "0"
                        }}
                        onMouseEnter={() => setHoveredIndex(uniqueId)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <AnimatePresence mode="popLayout">
                            {isHovered && !hasStatement && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20, scale: 0.6 }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                        transition: { type: "spring", stiffness: 260, damping: 10 }
                                    }}
                                    exit={{ opacity: 0, y: 20, scale: 0.6 }}
                                    style={{
                                        position: "absolute",
                                        top: "-100px", // Adjusted to be higher
                                        left: "50%",
                                        x: translateX,
                                        rotateZ: rotate,
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: "12px",
                                        backgroundColor: popBackground,
                                        zIndex: 50,
                                        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
                                        padding: "12px 20px",
                                        whiteSpace: "nowrap",
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        backdropFilter: 'blur(10px)'
                                    }}
                                >
                                    {/* Decoration Lines */}
                                    <div style={{
                                        position: "absolute",
                                        left: "30%",
                                        right: "30%",
                                        zIndex: 30,
                                        bottom: "-1px",
                                        height: "1px",
                                        background: "linear-gradient(to right, transparent, #d92514, transparent)"
                                    }} />

                                    <div style={{
                                        fontWeight: "bold",
                                        color: popTextColor,
                                        position: "relative",
                                        zIndex: 30,
                                        fontSize: "16px",
                                        fontFamily: 'serif',
                                        fontStyle: 'italic'
                                    }}>
                                        {item.name}
                                    </div>
                                    <div style={{
                                        color: designationColor,
                                        fontSize: "12px",
                                        fontFamily: 'sans-serif',
                                        marginTop: '4px'
                                    }}>
                                        {item.designation}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.div
                            // @ts-ignore
                            onMouseMove={handleMouseMove}
                            animate={hasStatement ? {
                                x: isHovered ? -400 : 0 // Slide even further left to visually center the group
                            } : {}}
                            transition={{
                                type: "tween",
                                ease: "easeInOut",
                                duration: 0.4
                            }}
                            style={{
                                width: `${imageSize}px`,
                                height: `${imageSize}px`,
                                borderRadius: "50%",
                                border: `${2}px solid ${borderColor}`,
                                position: "relative",
                                cursor: "pointer",
                                overflow: 'hidden',
                                zIndex: 40 // Keep above statement
                            }}
                            whileHover={{ scale: 1.05, zIndex: 50 }}
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: "cover",
                                    objectPosition: "top",
                                    backgroundColor: '#1a1a1a',
                                    ...item.imageStyle
                                }}
                            />
                        </motion.div>

                        <AnimatePresence>
                            {hasStatement && isHovered && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{
                                        type: "tween",
                                        ease: "easeInOut",
                                        duration: 0.4,
                                        delay: 0.1 // Slight delay for stagger effect
                                    }}
                                    style={{
                                        position: "absolute",
                                        left: "100%", // Start right after the avatar
                                        marginLeft: "-260px", // Pull back significantly to center text relative to moved avatar
                                        width: "650px", // Wider width for 2-liner look
                                        color: "#fff",
                                        fontFamily: "serif",
                                        fontStyle: "italic",
                                        fontSize: "1.2rem",
                                        lineHeight: "1.5",
                                        textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                                        pointerEvents: "none", // Let clicks pass through
                                        zIndex: 30
                                    }}
                                >
                                    "{item.statement}"
                                    <div style={{
                                        marginTop: "8px",
                                        fontFamily: "sans-serif",
                                        fontStyle: "normal",
                                        fontSize: "0.85rem",
                                        color: designationColor,
                                        fontWeight: 600,
                                        letterSpacing: "0.05em",
                                        textTransform: "uppercase"
                                    }}>
                                        — {item.name}, {item.designation}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
}
