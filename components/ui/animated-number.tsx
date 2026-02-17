import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

interface AnimatedNumberProps {
    start?: number;
    end?: number;
    decimals?: number;
    className?: string;
    suffix?: string;
    prefix?: string;
}

export default function AnimatedNumber({
    start = 0,
    end = 100,
    decimals = 0,
    className = "",
    suffix = "",
    prefix = ""
}: AnimatedNumberProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const value = useMotionValue(start);
    const spring = useSpring(value, { damping: 30, stiffness: 100 });

    const display = useTransform(spring, (num) => {
        const n = Number(num);
        const fixed = n.toFixed(decimals);
        const formatted = n >= 1000 ? Number(fixed).toLocaleString() : fixed;
        return `${prefix}${formatted}${suffix}`;
    });

    useEffect(() => {
        if (isInView) {
            value.set(end);
        }
    }, [end, isInView, value]);

    return (
        <motion.span ref={ref} className={className}>
            {display}
        </motion.span>
    );
}
