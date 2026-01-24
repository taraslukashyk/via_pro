import React, { useEffect, useRef } from 'react';
import { useScroll, useTransform, useSpring } from 'framer-motion';

interface StatsCounterProps {
    value: number; // The target number to count to
    suffix?: string; // Optional suffix like "+" or "%"
    label: string;
    duration?: number;
}

export const StatsCounter: React.FC<StatsCounterProps> = ({ value, suffix = '', label }) => {
    const ref = useRef<HTMLDivElement>(null);

    // Track scroll progress of this element relative to viewport
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"] // Start 0 when top enters bottom, End 1 when center reaches center
    });

    // Map 0-1 progress to 0-value
    const rawValue = useTransform(scrollYProgress, [0, 1], [0, value]);

    // Smooth out the value updates so scrubbing feels nice but not jittery
    const smoothValue = useSpring(rawValue, {
        damping: 50,
        stiffness: 200,
        mass: 1
    });

    // Ref specifically for the number display
    const numberRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const unsubscribe = smoothValue.on("change", (latest) => {
            if (numberRef.current) {
                // Clamp value between 0 and target to avoid negative or overflow during bounce
                const clamped = Math.min(Math.max(latest, 0), value);
                numberRef.current.textContent = Math.floor(clamped).toFixed(0);
            }
        });
        return () => unsubscribe();
    }, [smoothValue, value]);

    return (
        <div ref={ref} className="space-y-2">
            <div className="flex items-baseline justify-center">
                <span ref={numberRef} className="text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
                    0
                </span>
                {suffix && <span className="text-4xl md:text-5xl font-bold text-white/70 ml-1">{suffix}</span>}
            </div>
            <span className="text-sm uppercase tracking-widest opacity-60 block">{label}</span>
        </div>
    );
};
