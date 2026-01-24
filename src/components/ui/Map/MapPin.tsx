import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MapPinProps {
    x: number;
    y: number;
    project: any;
}

export const MapPin: React.FC<MapPinProps> = ({ x, y, project }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="absolute"
            style={{
                top: `${y}%`,
                left: `${x}%`,
                zIndex: isHovered ? 50 : 10
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Pin Point */}
            <div className="relative group cursor-pointer -translate-x-1/2 -translate-y-1/2">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + Math.random() * 0.5, type: 'spring' }}
                    className="relative"
                >
                    <div className={`w-4 h-4 rounded-full border-2 transition-colors duration-300 ${isHovered ? 'bg-accent border-accent' : 'bg-background border-foreground'}`} />
                    {/* Pulse Effect */}
                    <div className="absolute inset-0 rounded-full bg-accent opacity-20 animate-ping group-hover:opacity-40" />
                </motion.div>
            </div>

            {/* Tooltip Card */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className={`absolute z-50 bottom-full mb-4 w-64 bg-white/90 backdrop-blur-md rounded-xl shadow-xl overflow-hidden border border-white/20 ${x < 20 ? 'left-0' : x > 80 ? 'right-0' : 'left-1/2 -translate-x-1/2'}`}
                    >
                        <div className="h-24 overflow-hidden relative">
                            <img src={project.image} alt={project.title} className="object-cover w-full h-full" />
                            <div className="absolute inset-0 bg-black/20" />
                            <span className="absolute top-2 left-2 px-2 py-1 bg-black/50 text-white text-[10px] font-bold uppercase tracking-wider rounded backdrop-blur-sm">
                                {project.category}
                            </span>
                        </div>
                        <div className="p-4">
                            <h4 className="font-bold text-sm text-foreground leading-snug mb-2">{project.title}</h4>
                            <p className="text-xs text-foreground/60 mb-1 line-clamp-2">{project.description}</p>
                        </div>
                        {/* Triangle pointer */}
                        <div className={`absolute bottom-[-6px] w-3 h-3 bg-white/90 rotate-45 border-b border-r border-white/20 ${x < 20 ? 'left-4' : x > 80 ? 'right-4' : 'left-1/2 -translate-x-1/2'}`} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
