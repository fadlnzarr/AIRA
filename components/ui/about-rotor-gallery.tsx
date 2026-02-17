import React, { useState, useEffect, useRef } from 'react';
import {
    motion,
    useMotionValue,
    useSpring,
    PanInfo,
    useAnimationFrame,
    useTransform
} from 'framer-motion';

// --- TUNING PARAMETERS ---
const PERSPECTIVE = 1200;
const RADIUS = 1100;           // Slightly wider radius
const CARD_GAP_DEG = 12;       // Tighter arc
const TOTAL_CARDS_TO_RENDER = 30; // More cards for smoother look

// Physics
const SPRING_CONFIG = {
    stiffness: 100,
    damping: 20,
    mass: 1
};
const AUTO_ROTATION_SPEED = 0.05;
const DRAG_FACTOR = 0.15;

// Content
const CARDS = [
    { id: 1, label: "ABOUT", title: "Human Potential", body: "AIRA was founded on a simple belief: humans shouldn’t be robots. We automate the mundane to unleash creativity." },
    { id: 2, label: "MISSION", title: "Mission", body: "Enterprise-grade AI automation that removes communication bottlenecks. We scale conversations without losing connection." },
    { id: 3, label: "VALUES", title: "Values", body: "Reliability first. Speed as a baseline. Radical transparency. We build trust through precision." },
    { id: 4, label: "TEAM", title: "The Minds", body: "Built by operators and engineers obsessed with quality and craft. We are the architects of the new voice economy." }
];

export const AboutRotorGallery: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

    // -- MOTION --
    const rotation = useMotionValue(0);
    const smoothRotation = useSpring(rotation, SPRING_CONFIG);

    // -- STATE --
    const [isDragging, setIsDragging] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const lastDragTime = useRef<number>(0);
    const velocityRef = useRef<number>(0);

    // Resize observer to center
    useEffect(() => {
        if (!containerRef.current) return;
        const observer = new ResizeObserver((entries) => {
            setWidth(entries[0].contentRect.width);
        });
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    // -- INFINITE LOOP LOGIC --
    const displayItems = Array.from({ length: TOTAL_CARDS_TO_RENDER }).map((_, i) => {
        const originalCard = CARDS[i % CARDS.length];
        return { ...originalCard, uniqueId: `${i}-${originalCard.id}` };
    });

    // -- AUTOPILOT --
    useAnimationFrame((time, delta) => {
        if (isDragging) return;

        const timeSinceDrag = Date.now() - lastDragTime.current;

        // Autoplay if idle
        if (!isHovering && timeSinceDrag > 2000) {
            rotation.set(rotation.get() - (AUTO_ROTATION_SPEED * (delta / 16)));
        } else if (!isHovering && Math.abs(velocityRef.current) > 0.01) {
            // Inertia decay
            velocityRef.current *= 0.95;
            rotation.set(rotation.get() + velocityRef.current);
        }
    });

    // -- DRAG HANDLERS --
    const handleDragStart = () => {
        setIsDragging(true);
        velocityRef.current = 0;
    };

    const handleDragEnd = (_: any, info: PanInfo) => {
        setIsDragging(false);
        lastDragTime.current = Date.now();
        velocityRef.current = info.velocity.x * 0.05;
    };

    const handleDrag = (_: any, info: PanInfo) => {
        const current = rotation.get();
        rotation.set(current + info.delta.x * DRAG_FACTOR);
    };

    // Keyboard
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (isHovering) {
                if (e.key === 'ArrowLeft') rotation.set(rotation.get() + CARD_GAP_DEG);
                if (e.key === 'ArrowRight') rotation.set(rotation.get() - CARD_GAP_DEG);
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [isHovering, rotation]);


    return (
        <div
            className="relative w-full h-[500px] md:h-[600px] overflow-hidden flex flex-col items-center justify-center bg-transparent"
            ref={containerRef}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {/* 3D Viewport */}
            <div
                style={{ perspective: `${PERSPECTIVE}px` }}
                className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
            >
                <motion.div
                    style={{
                        rotateY: smoothRotation,
                        z: -RADIUS + 100, // Move center back so front face aligns with Z=0 (plus small offset)
                        transformStyle: 'preserve-3d',
                        width: 0, height: 0, // Center point
                    } as any}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }} // Infinite
                    dragElastic={0}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onDrag={handleDrag}
                    className="absolute flex items-center justify-center"
                >
                    {displayItems.map((item, index) => {
                        const angle = index * CARD_GAP_DEG;

                        return (
                            <RotorCard
                                key={item.uniqueId}
                                item={item}
                                angle={angle}
                                parentRotation={smoothRotation}
                                baseAngle={angle}
                                index={index}
                            />
                        );
                    })}
                </motion.div>
            </div>

            {/* Vignette / Fade */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/90 via-transparent to-black/90 z-20" />
        </div>
    );
};

// -- INDIVIDUAL CARD COMPONENT --
const RotorCard = ({ item, angle, parentRotation, baseAngle, index }: any) => {
    const [distanceFactor, setDistanceFactor] = useState(1);
    const [scaleFactor, setScaleFactor] = useState(1);

    useAnimationFrame(() => {
        const currentRot = parentRotation.get();

        // Calculate total rotation including the card's base angle
        let totalAngle = (baseAngle + currentRot) % 360;

        // Normalize to -180...180 range to find shortest distance to front (0deg)
        if (totalAngle > 180) totalAngle -= 360;
        if (totalAngle < -180) totalAngle += 360;

        // Distance (degrees) from center
        const dist = Math.abs(totalAngle);

        // Visibilty:
        // 0deg = 1.0 opacity
        // >60deg = 0.0 opacity (strict falloff for tunnel effect)
        const progress = Math.max(0, 1 - (dist / 60));

        setDistanceFactor(progress);
        // Slight scale down for non-centered items to enhance depth
        setScaleFactor(1 - (dist / 180) * 0.2);
    });

    return (
        <div
            style={{
                transform: `rotateY(${angle}deg) translateZ(${RADIUS}px) scale(${scaleFactor})`,
                opacity: distanceFactor,
                pointerEvents: distanceFactor > 0.5 ? 'auto' : 'none',
                backfaceVisibility: 'hidden',
                // Responsive Scaling
                // Mobile: Zoom out slightly to fit
                // Desktop: Default
            }}
            className="absolute flex items-center justify-center"
        >
            <div
                className={`
          relative
          w-[300px] h-[400px] md:w-[480px] md:h-[300px]
          bg-[#f8f9fa] rounded-[24px] md:rounded-[32px]
          p-6 md:p-8
          flex flex-col justify-between
          shadow-[0_20px_50px_rgba(0,0,0,0.5)]
          border border-white/40
          transition-colors duration-300
          overflow-hidden
        `}
            >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none opacity-50" />

                {/* Header */}
                <div className="flex items-center gap-3 z-10">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#d92514]" /> {/* AIRA Red Dot */}
                    <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-black/50 uppercase">
                        {item.label}
                    </span>
                </div>

                {/* Content */}
                <div className="space-y-4 z-10 mt-auto md:mt-0">
                    <h3 className="text-3xl md:text-4xl font-serif italic text-black font-medium leading-tight tracking-tight">
                        {item.title}
                    </h3>
                    <p className="text-sm md:text-base text-black/70 font-medium leading-relaxed max-w-[90%]">
                        {item.body}
                    </p>
                </div>

                {/* Decor */}
                <div className="w-full h-px bg-black/5 mt-auto z-10" />
            </div>
        </div>
    );
};
