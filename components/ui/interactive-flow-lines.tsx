"use client";

import React, { useRef, useEffect } from "react";

interface InteractiveFlowLinesProps {
    className?: string;
    style?: React.CSSProperties;
    orientation?: "vertical" | "horizontal";
    interactionMode?: "local" | "global";
    enableScroll?: boolean;
    direction?: "forward" | "backward";
    alignment?: "top" | "center" | "bottom";
    speed?: number;
    useSteps?: boolean;
    stepCount?: number;
    baseHeight?: number; // percent
    maxHeight?: number; // percent
    lineWidth?: number;
    gap?: number;
    influenceSize?: number;
    capStyle?: "round" | "square" | "soft";
    defaultColor?: string;
    hoverColor?: string;
}

export default function InteractiveFlowLines(props: InteractiveFlowLinesProps) {
    const {
        orientation = "vertical",
        interactionMode = "global",
        enableScroll = true,
        direction = "forward",
        alignment = "center",
        speed = 1,
        useSteps = true,
        stepCount = 5,
        baseHeight = 30,
        maxHeight = 80,
        lineWidth = 6,
        gap = 8,
        influenceSize = 150,
        capStyle = "round",
        defaultColor = "rgba(224, 224, 224, 1)",
        hoverColor = "rgba(255, 85, 0, 1)",
        className,
        style
    } = props;

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // State refs
    const globalRawX = useRef(-1000);
    const globalRawY = useRef(-1000);
    const mousePos = useRef(-1000);
    const isHovering = useRef(false);
    const scrollOffset = useRef(0);
    const masterIntensity = useRef(0);
    const animationRef = useRef<number>();
    const colorStartRef = useRef([0, 0, 0, 1]);
    const colorEndRef = useRef([0, 0, 0, 1]);

    const parseColor = (colorStr: string) => {
        if (typeof window === "undefined") return [0, 0, 0, 1];
        const div = document.createElement("div");
        div.style.color = colorStr;
        document.body.appendChild(div);
        const style = window.getComputedStyle(div).color;
        document.body.removeChild(div);
        const match = style.match(/[\d\.]+/g);
        if (!match) return [0, 0, 0, 1];
        const values = match.map(Number);
        return values.length === 3 ? [...values, 1] : values;
    };

    const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

    useEffect(() => {
        colorStartRef.current = parseColor(defaultColor);
        colorEndRef.current = parseColor(hoverColor);
    }, [defaultColor, hoverColor]);

    useEffect(() => {
        if (!enableScroll || speed === 0) {
            scrollOffset.current = 0;
            return;
        }

        let lastTime = performance.now();
        const totalSize = lineWidth + gap;

        const updateScroll = (time: number) => {
            const delta = time - lastTime;
            lastTime = time;
            const safeDelta = Math.min(delta, 100);
            const timeScale = safeDelta / 16.67;

            if (direction === "forward") {
                scrollOffset.current -= speed * timeScale;
            } else {
                scrollOffset.current += speed * timeScale;
            }

            if (scrollOffset.current < 0) {
                scrollOffset.current = (scrollOffset.current % totalSize) + totalSize;
            } else {
                scrollOffset.current = scrollOffset.current % totalSize;
            }

            animationRef.current = requestAnimationFrame(updateScroll);
        };

        animationRef.current = requestAnimationFrame(updateScroll);
        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [enableScroll, speed, lineWidth, gap, direction]);

    useEffect(() => {
        const handleWindowMove = (e: MouseEvent) => {
            globalRawX.current = e.clientX;
            globalRawY.current = e.clientY;
            if (interactionMode === "global") {
                isHovering.current = true;
            }
        };

        const handleWindowLeave = () => {
            if (interactionMode === "global") {
                isHovering.current = false;
            }
        };

        if (interactionMode === "global") {
            window.addEventListener("mousemove", handleWindowMove);
            document.addEventListener("mouseleave", handleWindowLeave);
        }

        return () => {
            window.removeEventListener("mousemove", handleWindowMove);
            document.removeEventListener("mouseleave", handleWindowLeave);
        };
    }, [interactionMode]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;

        let renderLoopId: number;

        const render = () => {
            if (!containerRef.current) return;

            const width = containerRef.current.offsetWidth;
            const height = containerRef.current.offsetHeight;
            const dpr = window.devicePixelRatio || 1;

            if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
                canvas.width = width * dpr;
                canvas.height = height * dpr;
                canvas.style.width = `${width}px`;
                canvas.style.height = `${height}px`;
                ctx.scale(dpr, dpr);
            }

            const rect = containerRef.current.getBoundingClientRect();
            const isVertical = orientation === "vertical";

            if (interactionMode === "global") {
                if (isVertical) {
                    mousePos.current = globalRawX.current - rect.left;
                } else {
                    mousePos.current = globalRawY.current - rect.top;
                }
            }

            ctx.clearRect(0, 0, width, height);

            const targetIntensity = isHovering.current ? 1 : 0;
            masterIntensity.current = lerp(masterIntensity.current, targetIntensity, 0.1);

            const totalItemSize = lineWidth + gap;
            const currentScroll = enableScroll ? scrollOffset.current : 0;
            const primaryDim = isVertical ? width : height;
            const secondaryDim = isVertical ? height : width;

            const lineCount = Math.ceil(primaryDim / totalItemSize) + 2;
            const idealIndex = Math.round((mousePos.current - lineWidth / 2 - currentScroll) / totalItemSize);

            for (let i = -1; i < lineCount; i++) {
                const linePos = i * totalItemSize + lineWidth / 2 + currentScroll;

                if (linePos < -lineWidth - totalItemSize || linePos > primaryDim + lineWidth + totalItemSize) continue;

                const dist = Math.abs(mousePos.current - linePos);
                const sigma = influenceSize / 5;
                let shapeIntensity = Math.exp(-Math.pow(dist, 2) / (2 * Math.pow(sigma, 2)));

                if (useSteps && stepCount > 0) {
                    if (i === idealIndex) {
                        shapeIntensity = 1;
                    } else {
                        shapeIntensity = Math.floor(shapeIntensity * stepCount) / stepCount;
                    }
                }

                const finalIntensity = shapeIntensity * masterIntensity.current;
                const currentSizePct = baseHeight + (maxHeight - baseHeight) * finalIntensity;
                const currentSize = (currentSizePct / 100) * secondaryDim;

                const r = Math.round(lerp(colorStartRef.current[0], colorEndRef.current[0], finalIntensity));
                const g = Math.round(lerp(colorStartRef.current[1], colorEndRef.current[1], finalIntensity));
                const b = Math.round(lerp(colorStartRef.current[2], colorEndRef.current[2], finalIntensity));
                const a = lerp(colorStartRef.current[3], colorEndRef.current[3], finalIntensity);

                ctx.fillStyle = `rgba(${r},${g},${b},${a})`;

                let x, y, w, h;
                if (isVertical) {
                    x = linePos - lineWidth / 2;
                    w = lineWidth;
                    h = currentSize;
                    if (alignment === "top") y = 0;
                    else if (alignment === "bottom") y = height - currentSize;
                    else y = (height - currentSize) / 2;
                } else {
                    y = linePos - lineWidth / 2;
                    h = lineWidth;
                    w = currentSize;
                    if (alignment === "top") x = 0;
                    else if (alignment === "bottom") x = width - currentSize;
                    else x = (width - currentSize) / 2;
                }

                if (capStyle === "round") {
                    ctx.beginPath();
                    // @ts-ignore
                    if (ctx.roundRect) {
                        // @ts-ignore
                        ctx.roundRect(x, y, w, h, 999);
                        ctx.fill();
                    } else {
                        ctx.fillRect(x, y, w, h);
                    }
                } else if (capStyle === "soft") {
                    ctx.beginPath();
                    // @ts-ignore
                    if (ctx.roundRect) {
                        // @ts-ignore
                        ctx.roundRect(x, y, w, h, 4);
                        ctx.fill();
                    } else {
                        ctx.fillRect(x, y, w, h);
                    }
                } else {
                    ctx.fillRect(x, y, w, h);
                }
            }

            renderLoopId = requestAnimationFrame(render);
        };

        render();
        return () => cancelAnimationFrame(renderLoopId);
    }, [props]);

    const handleLocalMouseMove = (e: React.MouseEvent) => {
        if (interactionMode === "local" && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            if (orientation === "vertical") {
                mousePos.current = e.clientX - rect.left;
            } else {
                mousePos.current = e.clientY - rect.top;
            }
            isHovering.current = true;
        }
    };

    const handleLocalMouseLeave = () => {
        if (interactionMode === "local") {
            isHovering.current = false;
        }
    };

    return (
        <div
            ref={containerRef}
            className={className}
            style={{ width: "100%", height: "100%", background: "transparent", ...style }}
            onMouseMove={handleLocalMouseMove}
            onMouseLeave={handleLocalMouseLeave}
            onMouseEnter={() => {
                if (interactionMode === "local") isHovering.current = true;
            }}
        >
            <canvas ref={canvasRef} style={{ display: "block" }} />
        </div>
    );
}
