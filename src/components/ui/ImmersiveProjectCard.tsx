import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

interface ImmersiveProjectCardProps {
    project: {
        id: number;
        category: string;
        title: string;
        description: string;
        location: string;
        backgroundImage: string;
    };
    index: number;
    totalProjects: number;
}

export const ImmersiveProjectCard: React.FC<ImmersiveProjectCardProps> = ({ project, index, totalProjects }) => {
    const isEven = index % 2 === 0;

    return (
        <section
            className="immersive-section relative w-full h-screen flex items-center overflow-hidden"
            style={{ scrollSnapAlign: 'start' }}
        >
            {/* ... (rest of the code unchanged until the counter) ... */}

            {/* Background Image with Scale Animation */}
            <motion.div
                className="absolute inset-0 z-0"
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                viewport={{ once: false, amount: 0.3 }}
            >
                <img
                    src={project.backgroundImage}
                    alt={project.title}
                    className="w-full h-full object-cover"
                />
            </motion.div>

            {/* Dark Overlay Gradient */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />

            {/* Additional side gradient for card readability */}
            <div
                className={`absolute inset-0 z-10 ${isEven
                    ? 'bg-gradient-to-l from-black/50 via-transparent to-transparent'
                    : 'bg-gradient-to-r from-black/50 via-transparent to-transparent'
                    }`}
            />

            {/* Glass Card Container */}
            <div className={`relative z-20 w-full px-6 md:px-12 lg:px-20 flex ${isEven ? 'justify-end' : 'justify-start'
                } md:items-center items-end pb-20 md:pb-0`}>

                {/* Glass Card with Fade In + Slide Animation */}
                <motion.div
                    className="glass-card w-full md:w-[480px] lg:w-[520px] p-8 md:p-10"
                    initial={{
                        opacity: 0,
                        y: 60,
                        x: isEven ? 40 : -40
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                        x: 0
                    }}
                    transition={{
                        duration: 0.8,
                        delay: 0.2,
                        ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    viewport={{ once: false, amount: 0.5 }}
                >
                    {/* Category Tag */}
                    <div className="mb-5">
                        <span className="inline-block px-4 py-2 text-xs font-semibold tracking-widest uppercase text-white/90 border border-white/30 rounded-full bg-white/5">
                            {project.category}
                        </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight tracking-tight">
                        {project.title}
                    </h2>

                    {/* Description */}
                    <p className="text-base md:text-lg text-white/80 leading-relaxed mb-6 font-light">
                        {project.description}
                    </p>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-white/70">
                        <MapPin size={18} className="text-orange-400" />
                        <span className="text-sm md:text-base font-medium">
                            {project.location}
                        </span>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator (only on first slide) - positioned above counter */}
            {index === 0 && (
                <motion.div
                    className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.6 }}
                >
                    <span className="text-white/50 text-xs uppercase tracking-widest">Гортай</span>
                    <motion.div
                        className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
                        animate={{ y: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                        <motion.div
                            className="w-1.5 h-1.5 bg-white/70 rounded-full"
                            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        />
                    </motion.div>
                </motion.div>
            )}

            {/* Project Counter */}
            <div className="absolute bottom-8 right-8 z-20 hidden md:block">
                <span className="text-white/40 text-sm font-medium">
                    <span className="text-white text-2xl font-bold">{String(index + 1).padStart(2, '0')}</span>
                    <span className="mx-2">/</span>
                    <span>{String(totalProjects).padStart(2, '0')}</span>
                </span>
            </div>
        </section>
    );
};
