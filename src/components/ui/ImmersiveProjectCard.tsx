import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X, Maximize } from 'lucide-react';

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
    // Стейт для відкриття зображення у повноекранному режимі (лайтбокс)
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    return (
        <section
            id={`project-${project.id}`}
            className="immersive-section relative w-full h-screen flex items-center overflow-hidden"
            style={{ scrollSnapAlign: 'start' }}
        >
            {/* Заблюрене фонове зображення — декоративний ефект для глибини */}
            <motion.div
                className="absolute inset-0 z-0"
                initial={{ scale: 1.15 }}
                whileInView={{ scale: 1.1 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                viewport={{ once: false, amount: 0.3 }}
            >
                <img
                    src={project.backgroundImage}
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-cover project-bg-blur"
                />
            </motion.div>

            {/* Темний оверлей поверх заблюреного фону */}
            <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/80 via-black/40 to-black/30" />

            {/* === DESKTOP: Горизонтальний лейаут (картка + зображення) === */}
            <div className={`relative z-20 w-full h-full px-6 md:px-12 lg:px-20 hidden md:flex items-center gap-8 lg:gap-12 ${isEven ? 'flex-row' : 'flex-row-reverse'
                }`}>

                {/* Glass Card — збільшена для десктопу */}
                <motion.div
                    className="glass-card w-[480px] lg:w-[560px] xl:w-[600px] p-8 lg:p-10 shrink-0"
                    initial={{
                        opacity: 0,
                        y: 60,
                        x: isEven ? -40 : 40
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
                    {/* Категорія */}
                    <div className="mb-5">
                        <span className="inline-block px-4 py-2 text-xs font-semibold tracking-widest uppercase text-white/90 border border-white/30 rounded-full bg-white/5">
                            {project.category}
                        </span>
                    </div>

                    {/* Назва */}
                    <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-5 leading-tight tracking-tight">
                        {project.title}
                    </h2>

                    {/* Опис */}
                    <p className="text-base lg:text-lg text-white/80 leading-relaxed mb-6 font-light">
                        {project.description}
                    </p>

                    {/* Локація */}
                    <div className="flex items-center gap-2 text-white/70">
                        <MapPin size={18} className="text-orange-400" />
                        <span className="text-sm lg:text-base font-medium">
                            {project.location}
                        </span>
                    </div>
                </motion.div>

                {/* Основне зображення проєкту — клікабельне для відкриття */}
                <motion.div
                    className="relative flex-1 h-[65vh] max-h-[700px] rounded-2xl overflow-hidden shadow-2xl cursor-pointer group/img"
                    initial={{
                        opacity: 0,
                        scale: 0.92,
                        x: isEven ? 60 : -60
                    }}
                    whileInView={{
                        opacity: 1,
                        scale: 1,
                        x: 0
                    }}
                    transition={{
                        duration: 0.9,
                        delay: 0.35,
                        ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    viewport={{ once: false, amount: 0.3 }}
                    onClick={() => setIsLightboxOpen(true)}
                >
                    <img
                        src={project.backgroundImage}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                    />
                    {/* Іконка розгортання внизу справа — тільки ПК */}
                    <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm rounded-lg p-2 text-white/70 group-hover/img:text-white transition-colors duration-300 hidden md:block">
                        <Maximize size={18} />
                    </div>
                </motion.div>
            </div>

            {/* === MOBILE: Вертикальний лейаут (зображення зверху, компактна картка внизу) === */}
            <div className="relative z-20 w-full h-full flex md:hidden flex-col justify-end">

                {/* Основне зображення — клікабельне */}
                <motion.div
                    className="absolute inset-x-4 top-20 bottom-36 rounded-xl overflow-hidden shadow-xl cursor-pointer"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    viewport={{ once: false, amount: 0.3 }}
                    onClick={() => setIsLightboxOpen(true)}
                >
                    <img
                        src={project.backgroundImage}
                        alt={project.title}
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                {/* Компактна картка внизу — тільки назва, не затуляє фото */}
                <motion.div
                    className="mx-4 mb-16 glass-card px-5 py-4"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: false, amount: 0.5 }}
                >
                    {/* Категорія — маленька */}
                    <span className="inline-block px-3 py-1 text-[10px] font-semibold tracking-wider uppercase text-white/80 border border-white/20 rounded-full bg-white/5 mb-2">
                        {project.category}
                    </span>

                    {/* Назва проєкту */}
                    <h2 className="text-lg font-bold text-white leading-snug">
                        {project.title}
                    </h2>

                    {/* Локація */}
                    <div className="flex items-center gap-1.5 text-white/60 mt-1.5">
                        <MapPin size={14} className="text-orange-400" />
                        <span className="text-xs font-medium">
                            {project.location}
                        </span>
                    </div>
                </motion.div>
            </div>

            {/* Індикатор скролу (тільки на першому слайді) */}
            {index === 0 && (
                <motion.div
                    className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-2 hidden md:flex"
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

            {/* Лічильник проєктів */}
            <div className="absolute bottom-8 right-8 z-20 hidden md:block">
                <span className="text-white/40 text-sm font-medium">
                    <span className="text-white text-2xl font-bold">{String(index + 1).padStart(2, '0')}</span>
                    <span className="mx-2">/</span>
                    <span>{String(totalProjects).padStart(2, '0')}</span>
                </span>
            </div>

            {/* === LIGHTBOX: Повноекранний перегляд зображення === */}
            <AnimatePresence>
                {isLightboxOpen && (
                    <motion.div
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm cursor-zoom-out"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setIsLightboxOpen(false)}
                    >
                        {/* Кнопка закриття */}
                        <button
                            className="absolute top-6 right-6 z-[110] text-white/70 hover:text-white transition-colors bg-black/40 hover:bg-black/60 rounded-full p-2"
                            onClick={() => setIsLightboxOpen(false)}
                            aria-label="Закрити"
                        >
                            <X size={28} />
                        </button>

                        {/* Зображення */}
                        <motion.img
                            src={project.backgroundImage}
                            alt={project.title}
                            className="max-w-[95vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.85, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            onClick={(e) => e.stopPropagation()}
                        />

                        {/* Назва проєкту під зображенням */}
                        <motion.div
                            className="absolute bottom-8 text-center text-white"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ delay: 0.15, duration: 0.3 }}
                        >
                            <h3 className="text-lg font-semibold">{project.title}</h3>
                            <p className="text-white/60 text-sm mt-1">{project.location}</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};
