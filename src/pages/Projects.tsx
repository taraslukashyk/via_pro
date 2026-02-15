import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ChevronUp } from 'lucide-react';
import { PROJECTS_IMMERSIVE } from '../data/projectsImmersive';
import { ImmersiveProjectCard } from '../components/ui/ImmersiveProjectCard';
import { useTranslation } from '../translations';
import { useLanguage } from '../contexts/LanguageContext';
import { TrustedByMarquee } from '../components/ui/TrustedByMarquee';

const Projects: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [showScrollTop, setShowScrollTop] = React.useState(false);
    const t = useTranslation();
    const { language } = useLanguage();

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            // Show "scroll to top" button after scrolling past first section
            setShowScrollTop(container.scrollTop > window.innerHeight * 0.5);
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToProjects = () => {
        containerRef.current?.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    };

    return (
        <div
            ref={containerRef}
            className="immersive-scroll-container"
        >
            {/* Hero Section */}
            <section
                className="immersive-section relative w-full h-screen flex items-center justify-center overflow-hidden"
            >
                {/* Animated Background */}
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0a1628] via-[#0d1f3c] to-[#1a365d]">
                    {/* Grid Pattern Overlay */}
                    <div
                        className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: `
                                linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
                            `,
                            backgroundSize: '60px 60px'
                        }}
                    />

                    {/* Animated Gradient Orbs */}
                    <motion.div
                        className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]"
                        animate={{
                            x: [0, 50, 0],
                            y: [0, -30, 0],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500/15 rounded-full blur-[100px]"
                        animate={{
                            x: [0, -40, 0],
                            y: [0, 40, 0],
                            scale: [1, 1.15, 1]
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    />
                </div>

                {/* Content */}
                <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                    <motion.span
                        className="inline-block text-orange-400 font-semibold tracking-[0.3em] uppercase text-sm md:text-base mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {t.projects.label}
                    </motion.span>

                    <motion.h1
                        className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight leading-[0.9]"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {t.projects.heading.split(' ')[0]}
                        <br />
                        <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                            {t.projects.heading.split(' ')[1]}
                        </span>
                    </motion.h1>

                    <motion.p
                        className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed mb-6"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        {t.projectsPage.description1}
                    </motion.p>

                    <motion.p
                        className="text-base md:text-lg text-white/50 max-w-xl mx-auto font-light italic mb-12"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        {t.projectsPage.description2}
                    </motion.p>

                    {/* Stats */}
                    <motion.div
                        className="flex flex-wrap justify-center gap-8 md:gap-16 mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-bold text-white mb-2">7</div>
                            <div className="text-white/50 text-sm uppercase tracking-wider">{t.projectsPage.stats.projects}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-bold text-white mb-2">3</div>
                            <div className="text-white/50 text-sm uppercase tracking-wider">{t.projectsPage.stats.regions}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-bold text-white mb-2">100%</div>
                            <div className="text-white/50 text-sm uppercase tracking-wider">{t.projectsPage.stats.success}</div>
                        </div>
                    </motion.div>

                    {/* Scroll CTA */}
                    <motion.button
                        onClick={scrollToProjects}
                        className="group flex flex-col items-center gap-3 text-white/60 hover:text-white transition-colors cursor-pointer"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.6 }}
                    >
                        <span className="text-sm uppercase tracking-widest">{t.projectsPage.viewProjects}</span>
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        >
                            <ArrowDown size={24} />
                        </motion.div>
                    </motion.button>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 to-transparent z-10" />
            </section>

            {/* Project Slides */}
            {PROJECTS_IMMERSIVE[language].map((project, index) => (
                <ImmersiveProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                />
            ))}

            {/* Final CTA Section */}
            <section
                className="immersive-section relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
            >
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0a1628] via-[#0d1f3c] to-[#1a365d]" />

                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mb-16">
                    <motion.h2
                        className="text-4xl md:text-6xl font-bold text-white mb-6"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: false }}
                    >
                        {t.projectsPage.nextProject}
                    </motion.h2>

                    <motion.p
                        className="text-lg md:text-xl text-white/60 font-light"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: false }}
                    >
                        {t.projectsPage.nextProjectSubheading}
                    </motion.p>
                </div>

                {/* Trusted Partners Marquee */}
                <div className="relative z-10 w-full">
                    <div className="mb-8 text-center">
                        <motion.h3
                            className="text-2xl md:text-3xl font-bold text-white"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            viewport={{ once: false }}
                        >
                            {t.trustedBy.partnersTitle}
                        </motion.h3>
                    </div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        viewport={{ once: false }}
                    >
                        <TrustedByMarquee showTitle={false} />
                    </motion.div>
                </div>
            </section>

            {/* Scroll to Top Button */}
            <motion.button
                onClick={scrollToTop}
                className="fixed bottom-20 right-8 z-50 w-12 h-12 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                    opacity: showScrollTop ? 1 : 0,
                    scale: showScrollTop ? 1 : 0.8,
                    pointerEvents: showScrollTop ? 'auto' : 'none'
                }}
                transition={{ duration: 0.3 }}
            >
                <ChevronUp size={24} />
            </motion.button>
        </div>
    );
};

export default Projects;
