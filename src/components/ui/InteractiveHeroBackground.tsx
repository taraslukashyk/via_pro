import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const InteractiveHeroBackground: React.FC = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for cursor following
    const springConfig = { damping: 25, stiffness: 150 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    // Transform to rotation values for 3D tilt (-5 to 5 degrees)
    const rotateX = useTransform(smoothY, [-1, 1], [5, -5]);
    const rotateY = useTransform(smoothX, [-1, 1], [-5, 5]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Normalize to -1 to 1 range
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;

            mouseX.set(x);
            mouseY.set(y);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <>
            {/* 3D tilt effect on the entire section */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                    rotateX,
                    rotateY,
                    transformPerspective: 1000,
                    transformStyle: 'preserve-3d',
                }}
            >
                {/* Gradient shadow that follows cursor */}
                <motion.div
                    className="absolute inset-0"
                    style={{
                        background: useTransform(
                            [smoothX, smoothY],
                            ([x, y]: number[]) => {
                                const posX = ((x + 1) / 2) * 100;
                                const posY = ((y + 1) / 2) * 100;
                                return `radial-gradient(circle 600px at ${posX}% ${posY}%, 
                                    rgba(24, 76, 113, 0.15) 0%, 
                                    rgba(24, 76, 113, 0.08) 40%, 
                                    transparent 70%)`;
                            }
                        ),
                        filter: 'blur(40px)',
                    }}
                />

                {/* Subtle grid overlay for depth */}
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, #184c71 1px, transparent 1px),
                            linear-gradient(to bottom, #184c71 1px, transparent 1px)
                        `,
                        backgroundSize: '50px 50px',
                    }}
                />
            </motion.div>
        </>
    );
};
