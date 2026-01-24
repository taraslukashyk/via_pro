import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// No lucide-react imports needed here
import type { Project } from '../../../data/projects';

interface ClusteredMapPinProps {
    x: number;
    y: number;
    projects: Project[];
}

export const ClusteredMapPin: React.FC<ClusteredMapPinProps> = ({ x, y, projects }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div
            className="absolute"
            style={{
                top: `${y}%`,
                left: `${x}%`,
                zIndex: isExpanded ? 50 : 20
            }}
        >
            {/* Clustered Pin Point */}
            <div
                className="relative cursor-pointer -translate-x-1/2 -translate-y-1/2"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                    className="relative"
                >
                    {/* Cluster badge showing count */}
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm transition-all duration-300 ${isExpanded
                        ? 'bg-accent border-accent text-white scale-110'
                        : 'bg-background border-accent text-accent hover:bg-accent hover:text-white'
                        }`}>
                        {projects.length}
                    </div>
                    {/* Pulse Effect */}
                    <div className="absolute inset-0 rounded-full bg-accent opacity-20 animate-ping" />
                </motion.div>
            </div>

            {/* Expanded Cards Panel - positioned above the pin */}
            <AnimatePresence>
                {isExpanded && (
                    <>
                        {/* Backdrop to close */}
                        <div
                            className="fixed inset-0 z-30"
                            onClick={() => setIsExpanded(false)}
                        />

                        {/* Cards Container */}
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.9 }}
                            className={`absolute z-50 bottom-full mb-4 flex flex-row gap-4 ${x < 20 ? 'left-0' : x > 80 ? 'right-0' : 'left-1/2 -translate-x-1/2'}`}
                        >
                            {projects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl overflow-hidden border border-white/20 w-64 flex-shrink-0"
                                >
                                    <div className="h-20 overflow-hidden relative">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="object-cover w-full h-full"
                                        />
                                        <div className="absolute inset-0 bg-black/20" />
                                        <span className="absolute top-2 left-2 px-2 py-1 bg-black/50 text-white text-[10px] font-bold uppercase tracking-wider rounded backdrop-blur-sm">
                                            {project.category}
                                        </span>
                                    </div>
                                    <div className="p-3">
                                        <h4 className="font-bold text-sm text-foreground leading-snug mb-1">
                                            {project.title}
                                        </h4>
                                        <p className="text-xs text-foreground/60 line-clamp-2">
                                            {project.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Triangle pointer */}
                            <div className={`absolute bottom-[-6px] w-3 h-3 bg-white/95 rotate-45 border-b border-r border-white/20 ${x < 20 ? 'left-4' : x > 80 ? 'right-4' : 'left-1/2 -translate-x-1/2'}`} />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};
