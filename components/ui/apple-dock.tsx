'use client';

import React, { useRef, useState, memo } from 'react';
import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    AnimatePresence,
} from 'framer-motion';

// --- Types ---

export interface DockItem {
    title: string;
    image: string;
    link?: string;
}

export interface AppleDockProps {
    items: DockItem[];
    baseSize?: number;
    magnification?: number;
    distance?: number;
    gap?: number;
    borderRadius?: number;
    backgroundColor?: string;
    className?: string;
}

// --- Dock Icon ---

const DockIcon = memo(function DockIcon({
    mouseX,
    item,
    baseSize,
    magnification,
    distance,
    borderRadius,
    backgroundColor,
}: {
    mouseX: ReturnType<typeof useMotionValue<number>>;
    item: DockItem;
    baseSize: number;
    magnification: number;
    distance: number;
    borderRadius: number;
    backgroundColor: string;
}) {
    const ref = useRef<HTMLAnchorElement>(null);
    const [isHovered, setHovered] = useState(false);

    const distanceCalc = useTransform(mouseX, (val: number) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    const widthSync = useTransform(
        distanceCalc,
        [-distance, 0, distance],
        [baseSize, baseSize * magnification, baseSize]
    );

    const width = useSpring(widthSync, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });

    return (
        <motion.li
            variants={{
                hidden: { scale: 0, opacity: 0, y: 30 },
                visible: {
                    scale: 1,
                    opacity: 1,
                    y: 0,
                    transition: { type: "spring", mass: 0.5, damping: 10, stiffness: 200 }
                }
            }}
            role="none"
            style={{ display: 'flex', alignItems: 'flex-end', listStyle: 'none' }}
        >
            <motion.a
                ref={ref}
                href={item.link || '#'}
                target="_blank"
                rel="noopener noreferrer"
                role="menuitem"
                aria-label={item.title}
                tabIndex={0}
                whileTap={{ scale: 0.85 }}
                style={{
                    width: width,
                    height: width,
                    borderRadius: borderRadius,
                    backgroundColor: backgroundColor,
                    cursor: 'pointer',
                    display: 'block',
                    position: 'relative',
                    willChange: 'transform',
                    transform: 'translateZ(0)',
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {/* Tooltip */}
                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                role="tooltip"
                                initial={{ opacity: 0, y: 0, x: '-50%' }}
                                animate={{ opacity: 1, y: -15, x: '-50%' }}
                                exit={{ opacity: 0, y: 0, x: '-50%' }}
                                transition={{ duration: 0.15 }}
                                style={{
                                    position: 'absolute',
                                    top: -40,
                                    left: '50%',
                                    background: 'rgba(139, 92, 246, 0.85)',
                                    color: 'rgba(255, 255, 255, 0.95)',
                                    padding: '6px 12px',
                                    borderRadius: '8px',
                                    fontSize: 13,
                                    fontWeight: 500,
                                    whiteSpace: 'nowrap',
                                    pointerEvents: 'none',
                                    zIndex: 10,
                                    fontFamily: 'sans-serif',
                                    backdropFilter: 'blur(8px)',
                                    boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
                                    border: '1px solid rgba(255, 255, 255, 0.15)',
                                }}
                            >
                                {item.title}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Icon Image */}
                    <img
                        src={item.image}
                        alt={item.title}
                        style={{
                            width: '65%',
                            height: '65%',
                            objectFit: 'contain',
                            display: 'block',
                            pointerEvents: 'none',
                            position: 'relative',
                            zIndex: 2,
                            // filter: 'brightness(0) invert(1)', // Removed to show original colors
                            opacity: isHovered ? 1 : 0.7,
                            transition: 'opacity 0.2s ease',
                        }}
                    />
                </div>
            </motion.a>
        </motion.li>
    );
});

// --- Main Dock ---

export function AppleDock({
    items,
    baseSize = 70,
    magnification = 1.6,
    distance = 200,
    gap = 12,
    borderRadius = 18,
    backgroundColor = 'rgba(255, 255, 255, 0.05)',
    className,
}: AppleDockProps) {
    const mouseX = useMotionValue(Infinity);

    return (
        <motion.nav
            aria-label="Integrations Dock"
            role="menubar"
            className={className}
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                height: baseSize * magnification + 30,
                paddingBottom: 10,
                width: 'fit-content',
                margin: '0 auto',
            }}
        >
            <motion.ul
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10%" }}
                variants={{
                    visible: { transition: { staggerChildren: 0.1 } }
                }}
                style={{
                    display: 'flex',
                    margin: 0,
                    padding: '12px 20px',
                    listStyle: 'none',
                    gap: gap,
                    alignItems: 'flex-end',
                    zIndex: 1,
                    position: 'relative',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: borderRadius + 10,
                    backdropFilter: 'blur(12px)',
                }}
            >
                {items.map((item, index) => (
                    <DockIcon
                        key={index}
                        mouseX={mouseX}
                        item={item}
                        baseSize={baseSize}
                        magnification={magnification}
                        distance={distance}
                        borderRadius={borderRadius}
                        backgroundColor={backgroundColor}
                    />
                ))}
            </motion.ul>
        </motion.nav>
    );
}
