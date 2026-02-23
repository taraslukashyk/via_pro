import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, cubicBezier } from 'framer-motion';
import { MapPin, X, Maximize, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

interface ImmersiveProjectCardProps {
    project: {
        id: number;
        category: string;
        title: string;
        description: string;
        location: string;
        backgroundImage: string;
        gallery?: string[];
    };
    index: number;
    totalProjects: number;
}

export const ImmersiveProjectCard: React.FC<ImmersiveProjectCardProps> = ({ project, index, totalProjects }) => {
    const isEven = index % 2 === 0;
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    // Індекс поточного зображення в галереї
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    // Напрямок анімації: 1 — вперед (→), -1 — назад (←)
    const direction = useRef<1 | -1>(1);
    // Стан розгортання мобільної картки
    const [isCardExpanded, setIsCardExpanded] = useState(false);

    // Якщо є галерея — використовуємо її, інакше одне зображення
    const images = project.gallery && project.gallery.length > 0
        ? project.gallery
        : [project.backgroundImage];
    const hasGallery = images.length > 1;
    const currentImage = images[currentImageIndex];
    // Перше зображення залишається статичним на фоні завжди
    const staticBgImage = images[0];

    const goNext = () => {
        direction.current = 1;
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };
    const goPrev = () => {
        direction.current = -1;
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };
    const goTo = (i: number) => {
        direction.current = i > currentImageIndex ? 1 : -1;
        setCurrentImageIndex(i);
    };

    const nextImage = (e: React.MouseEvent) => { e.stopPropagation(); goNext(); };
    const prevImage = (e: React.MouseEvent) => { e.stopPropagation(); goPrev(); };

    // Варіанти анімації для слайду
    const slideVariants = {
        enter: (dir: number) => ({ x: dir * 60, opacity: 0, scale: 1.04 }),
        center: { x: 0, opacity: 1, scale: 1 },
        exit: (dir: number) => ({ x: dir * -60, opacity: 0, scale: 0.97 }),
    };
    const slideEase = cubicBezier(0.32, 0.72, 0, 1);
    const slideTransition = { duration: 0.55, ease: slideEase };

    // Обробник свайпу — визначаємо напрямок по offset і velocity
    const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
        const swipeThreshold = 50;
        if (info.offset.x < -swipeThreshold || info.velocity.x < -500) {
            goNext();
        } else if (info.offset.x > swipeThreshold || info.velocity.x > 500) {
            goPrev();
        }
    };

    return (
        <section
            id={`project-${project.id}`}
            className="immersive-section relative w-full h-screen flex items-center overflow-hidden"
            style={{ scrollSnapAlign: 'start' }}
        >
            {/* Заблюрене фонове зображення — завжди перше з галереї */}
            <motion.div
                className="absolute inset-0 z-0"
                initial={{ scale: 1.15 }}
                whileInView={{ scale: 1.1 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                viewport={{ once: false, amount: 0.3 }}
            >
                <img
                    src={staticBgImage}
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-cover project-bg-blur"
                />
            </motion.div>

            {/* Темний оверлей */}
            <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/80 via-black/40 to-black/30" />

            {/* === DESKTOP === */}
            <div className={`relative z-20 w-full h-full px-6 md:px-12 lg:px-20 hidden md:flex items-center gap-8 lg:gap-12 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>

                {/* Glass Card */}
                <motion.div
                    className="glass-card w-[480px] lg:w-[560px] xl:w-[600px] p-8 lg:p-10 shrink-0"
                    initial={{ opacity: 0, y: 60, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, y: 0, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                    viewport={{ once: false, amount: 0.5 }}
                >
                    <div className="mb-5">
                        <span className="inline-block px-4 py-2 text-xs font-semibold tracking-widest uppercase text-white/90 border border-white/30 rounded-full bg-white/5">
                            {project.category}
                        </span>
                    </div>
                    <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-5 leading-tight tracking-tight">
                        {project.title}
                    </h2>
                    <p className="text-base lg:text-lg text-white/80 leading-relaxed mb-6 font-light">
                        {project.description}
                    </p>
                    <div className="flex items-center gap-2 text-white/70">
                        <MapPin size={18} className="text-orange-400" />
                        <span className="text-sm lg:text-base font-medium">{project.location}</span>
                    </div>
                </motion.div>

                {/* Основне зображення — з перегортанням галереї */}
                <motion.div
                    className="relative flex-1 h-[65vh] max-h-[700px] rounded-2xl overflow-hidden shadow-2xl cursor-pointer group/img"
                    initial={{ opacity: 0, scale: 0.92, x: isEven ? 60 : -60 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.9, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                    viewport={{ once: false, amount: 0.3 }}
                    onClick={() => setIsLightboxOpen(true)}
                >
                    <AnimatePresence mode="popLayout" custom={direction.current}>
                        <motion.img
                            key={currentImageIndex}
                            src={currentImage}
                            alt={project.title}
                            className="w-full h-full object-cover"
                            custom={direction.current}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={slideTransition}
                            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                        />
                    </AnimatePresence>

                    {/* Стрілки галереї — тільки якщо є кілька зображень */}
                    {hasGallery && (
                        <>
                            <button
                                onClick={prevImage}
                                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white rounded-full p-2 transition-all opacity-0 group-hover/img:opacity-100"
                                aria-label="Попереднє зображення"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white rounded-full p-2 transition-all opacity-0 group-hover/img:opacity-100"
                                aria-label="Наступне зображення"
                            >
                                <ChevronRight size={20} />
                            </button>
                            {/* Індикатор поточного зображення */}
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                                {images.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={(e) => { e.stopPropagation(); goTo(i); }}
                                        className={`h-1.5 rounded-full transition-all duration-500 ease-out ${i === currentImageIndex ? 'w-6 bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]' : 'w-1.5 bg-white/40 hover:bg-white/70'}`}
                                    />
                                ))}
                            </div>
                        </>
                    )}

                    {/* Іконка розгортання — тільки ПК */}
                    <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm rounded-lg p-2 text-white/70 group-hover/img:text-white transition-colors duration-300 hidden md:block">
                        <Maximize size={18} />
                    </div>
                </motion.div>
            </div>

            {/* === MOBILE === */}
            <div className="relative z-20 w-full h-full flex md:hidden flex-col justify-end">
                <motion.div
                    className="absolute inset-x-4 top-20 bottom-36 rounded-xl overflow-hidden shadow-xl cursor-pointer touch-pan-y"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    viewport={{ once: false, amount: 0.3 }}
                    onClick={() => setIsLightboxOpen(true)}
                    // Свайп для мобільних пристроїв
                    drag={hasGallery ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.3}
                    onDragEnd={hasGallery ? handleDragEnd : undefined}
                >
                    <AnimatePresence mode="popLayout" custom={direction.current}>
                        <motion.img
                            key={currentImageIndex}
                            src={currentImage}
                            alt={project.title}
                            className="w-full h-full object-cover pointer-events-none"
                            custom={direction.current}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={slideTransition}
                            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                        />
                    </AnimatePresence>

                    {/* Стрілки галереї на мобільних */}
                    {hasGallery && (
                        <>
                            <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-1.5" aria-label="Попереднє">
                                <ChevronLeft size={16} />
                            </button>
                            <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-1.5" aria-label="Наступне">
                                <ChevronRight size={16} />
                            </button>
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                                {images.map((_, i) => (
                                    <div key={i} className={`h-1 rounded-full transition-all duration-500 ease-out ${i === currentImageIndex ? 'w-4 bg-white shadow-[0_0_6px_rgba(255,255,255,0.5)]' : 'w-1 bg-white/40'}`} />
                                ))}
                            </div>
                        </>
                    )}
                </motion.div>

                {/* Компактна картка внизу — розгортається при натисканні */}
                <motion.div
                    className="mx-4 mb-16 glass-card px-5 py-4 cursor-pointer"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: false, amount: 0.5 }}
                    onClick={() => setIsCardExpanded(!isCardExpanded)}
                    layout
                >
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <span className="inline-block px-3 py-1 text-[10px] font-semibold tracking-wider uppercase text-white/80 border border-white/20 rounded-full bg-white/5 mb-2">
                                {project.category}
                            </span>
                            <h2 className="text-lg font-bold text-white leading-snug">{project.title}</h2>
                            <div className="flex items-center gap-1.5 text-white/60 mt-1.5">
                                <MapPin size={14} className="text-orange-400" />
                                <span className="text-xs font-medium">{project.location}</span>
                            </div>
                        </div>
                        {/* Іконка розгортання */}
                        <motion.div
                            animate={{ rotate: isCardExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-white/40 mt-1 ml-2 shrink-0"
                        >
                            <ChevronDown size={20} />
                        </motion.div>
                    </div>

                    {/* Розгортуваний опис */}
                    <AnimatePresence>
                        {isCardExpanded && (
                            <motion.p
                                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className="text-sm text-white/70 leading-relaxed overflow-hidden"
                            >
                                {project.description}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Індикатор скролу (перший слайд) */}
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
            {/* Mobile: Top Left */}
            <div className="absolute top-24 left-6 z-30 md:hidden">
                <span className="text-white/40 text-sm font-medium">
                    <span className="text-white text-2xl font-bold">{String(index + 1).padStart(2, '0')}</span>
                    <span className="mx-2">/</span>
                    <span>{String(totalProjects).padStart(2, '0')}</span>
                </span>
            </div>

            {/* Desktop: Bottom Right */}
            <div className="absolute bottom-8 right-8 z-20 hidden md:block">
                <span className="text-white/40 text-sm font-medium">
                    <span className="text-white text-2xl font-bold">{String(index + 1).padStart(2, '0')}</span>
                    <span className="mx-2">/</span>
                    <span>{String(totalProjects).padStart(2, '0')}</span>
                </span>
            </div>

            {/* === LIGHTBOX === */}
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
                        <button
                            className="absolute top-6 right-6 z-[110] text-white/70 hover:text-white transition-colors bg-black/40 hover:bg-black/60 rounded-full p-2"
                            onClick={() => setIsLightboxOpen(false)}
                            aria-label="Закрити"
                        >
                            <X size={28} />
                        </button>

                        <AnimatePresence mode="popLayout" custom={direction.current}>
                            <motion.img
                                key={`lb-${currentImageIndex}`}
                                src={currentImage}
                                alt={project.title}
                                className="max-w-[95vw] max-h-[90vh] object-contain rounded-lg shadow-2xl cursor-default"
                                custom={direction.current}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
                                onClick={(e) => e.stopPropagation()}
                            />
                        </AnimatePresence>

                        {/* Стрілки в лайтбоксі */}
                        {hasGallery && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full p-3 transition-all"
                                    aria-label="Попереднє зображення"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full p-3 transition-all"
                                    aria-label="Наступне зображення"
                                >
                                    <ChevronRight size={24} />
                                </button>
                            </>
                        )}

                        <motion.div
                            className="absolute bottom-8 text-center text-white"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ delay: 0.15, duration: 0.3 }}
                        >
                            <h3 className="text-lg font-semibold">{project.title}</h3>
                            <p className="text-white/60 text-sm mt-1">
                                {project.location}
                                {hasGallery && <span className="ml-2">({currentImageIndex + 1}/{images.length})</span>}
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};
