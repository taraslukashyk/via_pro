import React from 'react';
import { motion } from 'framer-motion';

interface FadeInProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
    viewportMargin?: string;
    fullWidth?: boolean;
}

export const FadeIn: React.FC<FadeInProps> = ({
    children,
    className = "",
    delay = 0,
    direction = 'up',
    viewportMargin = "-10%",
    fullWidth = false
}) => {
    const directions = {
        up: { y: 40 },
        down: { y: -40 },
        left: { x: 40 },
        right: { x: -40 }
    };

    const initial = { opacity: 0, ...directions[direction] };
    const animate = { opacity: 1, x: 0, y: 0 };

    return (
        <motion.div
            initial={initial}
            whileInView={animate}
            viewport={{ once: false, margin: viewportMargin }}
            transition={{
                duration: 0.7,
                delay: delay,
                ease: [0.21, 0.45, 0.27, 0.9] // Smooth cubic bezier
            }}
            className={`${className} ${fullWidth ? 'w-full' : ''}`}
        >
            {children}
        </motion.div>
    );
};

export const FadeInStagger: React.FC<{
    children: React.ReactNode;
    className?: string;
    faster?: boolean;
}> = ({ children, className = "", faster = false }) => {
    return (
        <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: false, margin: "-10%" }}
            className={className}
        >
            {React.Children.map(children, (child, index) => {
                return (
                    <motion.div
                        variants={{
                            initial: { opacity: 0, y: 20 },
                            animate: { opacity: 1, y: 0 }
                        }}
                        transition={{
                            duration: 0.5,
                            delay: index * (faster ? 0.1 : 0.2),
                            ease: "easeOut"
                        }}
                    >
                        {child}
                    </motion.div>
                );
            })}
        </motion.div>
    );
};
