"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface GooeyTextProps {
    texts: string[];
    morphTime?: number;
    cooldownTime?: number;
    className?: string;
    textClassName?: string;
}

interface GooeyTextWithSubtitleProps {
    items: { value: string; label: string }[];
    morphTime?: number;
    cooldownTime?: number;
    className?: string;
    valueClassName?: string;
    labelClassName?: string;
}

export function GooeyText({
    texts,
    morphTime = 1,
    cooldownTime = 0.25,
    className,
    textClassName
}: GooeyTextProps) {
    const text1Ref = React.useRef<HTMLSpanElement>(null);
    const text2Ref = React.useRef<HTMLSpanElement>(null);

    React.useEffect(() => {
        let textIndex = texts.length - 1;
        let time = new Date();
        let morph = 0;
        let cooldown = cooldownTime;

        const setMorph = (fraction: number) => {
            if (text1Ref.current && text2Ref.current) {
                text2Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
                text2Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

                fraction = 1 - fraction;
                text1Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
                text1Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
            }
        };

        const doCooldown = () => {
            morph = 0;
            if (text1Ref.current && text2Ref.current) {
                text2Ref.current.style.filter = "";
                text2Ref.current.style.opacity = "100%";
                text1Ref.current.style.filter = "";
                text1Ref.current.style.opacity = "0%";
            }
        };

        const doMorph = () => {
            morph -= cooldown;
            cooldown = 0;
            let fraction = morph / morphTime;

            if (fraction > 1) {
                cooldown = cooldownTime;
                fraction = 1;
            }

            setMorph(fraction);
        };

        function animate() {
            requestAnimationFrame(animate);
            const newTime = new Date();
            const shouldIncrementIndex = cooldown > 0;
            const dt = (newTime.getTime() - time.getTime()) / 1000;
            time = newTime;

            cooldown -= dt;

            if (cooldown <= 0) {
                if (shouldIncrementIndex) {
                    textIndex = (textIndex + 1) % texts.length;
                    if (text1Ref.current && text2Ref.current) {
                        text1Ref.current.textContent = texts[textIndex % texts.length];
                        text2Ref.current.textContent = texts[(textIndex + 1) % texts.length];
                    }
                }
                doMorph();
            } else {
                doCooldown();
            }
        }

        animate();

        return () => {
            // Cleanup function if needed
        };
    }, [texts, morphTime, cooldownTime]);

    return (
        <div className={cn("relative", className)}>
            <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
                <defs>
                    <filter id="threshold">
                        <feColorMatrix
                            in="SourceGraphic"
                            type="matrix"
                            values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
                        />
                    </filter>
                </defs>
            </svg>

            <div
                className="flex items-center justify-center"
                style={{ filter: "url(#threshold)" }}
            >
                <span
                    ref={text1Ref}
                    className={cn(
                        "absolute inline-block select-none text-center text-6xl md:text-[60pt]",
                        "text-foreground",
                        textClassName
                    )}
                />
                <span
                    ref={text2Ref}
                    className={cn(
                        "absolute inline-block select-none text-center text-6xl md:text-[60pt]",
                        "text-foreground",
                        textClassName
                    )}
                />
            </div>
        </div>
    );
}

// Enhanced version with synchronized subtitle - both value and label have gooey effect
export function GooeyTextWithSubtitle({
    items,
    morphTime = 1,
    cooldownTime = 0.25,
    className,
    valueClassName,
    labelClassName
}: GooeyTextWithSubtitleProps) {
    const value1Ref = React.useRef<HTMLSpanElement>(null);
    const value2Ref = React.useRef<HTMLSpanElement>(null);
    const label1Ref = React.useRef<HTMLSpanElement>(null);
    const label2Ref = React.useRef<HTMLSpanElement>(null);

    React.useEffect(() => {
        let textIndex = items.length - 1;
        let time = new Date();
        let morph = 0;
        let cooldown = cooldownTime;

        const setMorph = (fraction: number) => {
            // Apply gooey effect to values
            if (value1Ref.current && value2Ref.current) {
                value2Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
                value2Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

                const inverseFraction = 1 - fraction;
                value1Ref.current.style.filter = `blur(${Math.min(8 / inverseFraction - 8, 100)}px)`;
                value1Ref.current.style.opacity = `${Math.pow(inverseFraction, 0.4) * 100}%`;
            }

            // Apply same gooey effect to labels
            if (label1Ref.current && label2Ref.current) {
                label2Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
                label2Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

                const inverseFraction = 1 - fraction;
                label1Ref.current.style.filter = `blur(${Math.min(8 / inverseFraction - 8, 100)}px)`;
                label1Ref.current.style.opacity = `${Math.pow(inverseFraction, 0.4) * 100}%`;
            }
        };

        const doCooldown = () => {
            morph = 0;
            if (value1Ref.current && value2Ref.current) {
                value2Ref.current.style.filter = "";
                value2Ref.current.style.opacity = "100%";
                value1Ref.current.style.filter = "";
                value1Ref.current.style.opacity = "0%";
            }
            if (label1Ref.current && label2Ref.current) {
                label2Ref.current.style.filter = "";
                label2Ref.current.style.opacity = "100%";
                label1Ref.current.style.filter = "";
                label1Ref.current.style.opacity = "0%";
            }
        };

        const doMorph = () => {
            morph -= cooldown;
            cooldown = 0;
            let fraction = morph / morphTime;

            if (fraction > 1) {
                cooldown = cooldownTime;
                fraction = 1;
            }

            setMorph(fraction);
        };

        function animate() {
            requestAnimationFrame(animate);
            const newTime = new Date();
            const shouldIncrementIndex = cooldown > 0;
            const dt = (newTime.getTime() - time.getTime()) / 1000;
            time = newTime;

            cooldown -= dt;

            if (cooldown <= 0) {
                if (shouldIncrementIndex) {
                    textIndex = (textIndex + 1) % items.length;
                    const currentIndex = textIndex % items.length;
                    const nextIndex = (textIndex + 1) % items.length;

                    if (value1Ref.current && value2Ref.current) {
                        value1Ref.current.textContent = items[currentIndex].value;
                        value2Ref.current.textContent = items[nextIndex].value;
                    }
                    if (label1Ref.current && label2Ref.current) {
                        label1Ref.current.textContent = items[currentIndex].label;
                        label2Ref.current.textContent = items[nextIndex].label;
                    }
                }
                doMorph();
            } else {
                doCooldown();
            }
        }

        animate();

        return () => {
            // Cleanup
        };
    }, [items, morphTime, cooldownTime]);

    return (
        <div className={cn("relative flex flex-col items-center justify-center", className)}>
            <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
                <defs>
                    <filter id="threshold-stats">
                        <feColorMatrix
                            in="SourceGraphic"
                            type="matrix"
                            values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
                        />
                    </filter>
                </defs>
            </svg>

            {/* Value text with gooey filter */}
            <div
                className="relative flex items-center justify-center w-full h-24 md:h-32"
                style={{ filter: "url(#threshold-stats)" }}
            >
                <span
                    ref={value1Ref}
                    className={cn(
                        "absolute inline-block select-none text-center",
                        valueClassName
                    )}
                />
                <span
                    ref={value2Ref}
                    className={cn(
                        "absolute inline-block select-none text-center",
                        valueClassName
                    )}
                />
            </div>

            {/* Label text with gooey filter */}
            <div
                className="relative flex items-center justify-center w-full h-8 mt-4"
                style={{ filter: "url(#threshold-stats)" }}
            >
                <span
                    ref={label1Ref}
                    className={cn(
                        "absolute inline-block select-none text-center whitespace-nowrap",
                        labelClassName
                    )}
                />
                <span
                    ref={label2Ref}
                    className={cn(
                        "absolute inline-block select-none text-center whitespace-nowrap",
                        labelClassName
                    )}
                />
            </div>
        </div>
    );
}
