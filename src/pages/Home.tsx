import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COMPANY_INFO } from '../data/companyInfo';
import { PROJECTS_IMMERSIVE } from '../data/projectsImmersive';
import { Button } from '../components/ui/Button';
import { TransformingConsultationButton } from '../components/ui/TransformingConsultationButton';
import { Section } from '../components/ui/Section';
import { MapSection } from '../components/ui/Map/MapSection';
import { StatsCounter } from '../components/ui/StatsCounter';
import { FadeIn, FadeInStagger } from '../components/ui/FadeIn';
import { ServiceCard } from '../components/ui/ServiceCard';
import { TelegramIcon, WhatsAppIcon } from '../components/ui/SocialIcons';
import { Carousel } from '../components/ui/Carousel';
import { InteractiveHeroBackground } from '../components/ui/InteractiveHeroBackground';
import { TrustedByMarquee } from '../components/ui/TrustedByMarquee';
import aboutImage from '../assets/images/VIA_PRO_about.jpg';
import { useTranslation } from '../translations';
import { useLanguage } from '../contexts/LanguageContext';

const Home: React.FC = () => {
    const t = useTranslation();
    const { language } = useLanguage();
    const targetRef = useRef<HTMLDivElement>(null);
    const isHeroInView = useInView(targetRef, { margin: "-100px" });
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

    return (
        <main className="bg-background min-h-screen text-foreground overflow-hidden">

            {/* HERO SECTION */}
            <section ref={targetRef} className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
                {/* Interactive Background */}
                <InteractiveHeroBackground />

                <motion.div style={{ opacity, scale }} className="z-10 max-w-5xl mx-auto space-y-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="text-[20vw] md:text-[12vw] leading-none font-bold tracking-tighter text-accent"
                    >
                        VIA PRO
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-xl md:text-2xl text-foreground/60 max-w-2xl mx-auto font-light"
                    >
                        {t.hero.tagline}
                    </motion.p>
                </motion.div>

                {/* Button placed outside the scaled/fading container to prevent fixed positioning issues */}
                <div className="z-20 mt-8 h-24 w-full flex items-center justify-center">
                    <TransformingConsultationButton isHeroVisible={isHeroInView} />
                </div>

                {/* Trusted By Marquee */}
                <div className="absolute bottom-0 left-0 right-0 z-10">
                    <TrustedByMarquee />
                </div>

                {/* Abstract Background Element */}
                <div className="absolute inset-0 -z-10 opacity-10">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0 100 C 20 0 50 0 100 100 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    </svg>
                </div>
            </section>

            {/* STATS SECTION */}
            <Section className="bg-foreground text-background py-16 relative overflow-hidden">
                {/* Decorative background grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]"></div>

                <FadeInStagger className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative z-10 items-center justify-center">
                    <motion.div variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }}>
                        <StatsCounter value={COMPANY_INFO.stats.years} suffix="+" label={t.stats.yearsLabel} />
                    </motion.div>

                    <motion.div variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }}>
                        <StatsCounter value={COMPANY_INFO.stats.projects} suffix="+" label={t.stats.projectsLabel} />
                    </motion.div>

                    <motion.div variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }}>
                        <StatsCounter value={30} suffix="%" label={t.stats.growthLabel} />
                    </motion.div>
                </FadeInStagger>
            </Section>

            {/* ABOUT SECTION */}
            <Section id="about" className="py-32" noAnimation>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto items-center">
                    <FadeIn direction="right" className="h-full flex flex-col justify-center">
                        <div>
                            <span className="text-accent font-medium tracking-widest uppercase mb-4 block">{t.about.label}</span>
                            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                                {t.about.heading}
                            </h2>
                            <p className="text-lg text-foreground/70 mb-6">
                                {t.about.description}
                            </p>
                            <div className="flex items-center gap-4 border-l-4 border-accent pl-6 py-2 bg-muted/30 rounded-r-lg">
                                <div>
                                    <p className="font-bold text-lg">{t.about.directorName}</p>
                                    <p className="text-sm text-foreground/60">{t.about.founderRole}</p>
                                </div>
                            </div>
                            <Link to="/career">
                                <Button
                                    variant="outline"
                                    className="mt-8 self-start border-accent text-accent hover:bg-accent hover:text-white"
                                >
                                    {t.about.joinTeamBtn}
                                </Button>
                            </Link>
                        </div>
                    </FadeIn>
                    <FadeIn direction="left" delay={0.2} className="h-full flex items-center">
                        <div className="relative h-auto w-full max-w-lg aspect-[4/5] max-h-full bg-gray-200 rounded-2xl overflow-hidden shadow-2xl mx-auto lg:mx-0 lg:ml-auto">
                            {/* Placeholder for Director or Team photo */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-foreground/20 to-transparent z-10"></div>
                            <img src={aboutImage} alt="Construction Management" className="object-cover w-full h-full hover:scale-105 transition-transform duration-700" />
                        </div>
                    </FadeIn>
                </div>
            </Section>

            {/* SERVICES SECTION */}
            <Section id="services" className="bg-white py-32 rounded-3xl mx-4 my-8" noAnimation>
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <FadeIn>
                        <span className="text-accent font-medium tracking-widest uppercase mb-4 block">{t.services.label}</span>
                        <h2 className="text-4xl md:text-5xl font-bold">{t.services.heading}</h2>
                    </FadeIn>
                </div>

                <div className="px-4">
                    <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
                        {COMPANY_INFO.services[language].map((service, index) => (
                            <ServiceCard
                                key={service.id}
                                index={index}
                                title={service.title}
                                intro={service.intro}
                                details={service.details}
                            />
                        ))}
                    </FadeInStagger>
                </div>
            </Section>

            {/* PROJECTS SECTION */}
            <Section id="projects" className="py-24 overflow-visible" noAnimation>
                <div className="container mx-auto px-4 mb-12">
                    <FadeIn className="w-full">
                        <div className="flex flex-col md:flex-row justify-between items-end w-full">
                            <div>
                                <span className="text-accent font-medium tracking-widest uppercase mb-4 block">{t.projects.label}</span>
                                <h2 className="text-4xl md:text-5xl font-bold">{t.projects.heading}</h2>
                            </div>
                            <Link to="/projects">
                                <Button variant="outline" className="mt-8 md:mt-0 hidden md:flex">{t.projects.allProjectsBtn}</Button>
                            </Link>
                        </div>
                    </FadeIn>
                </div>

                <Carousel className="w-full">
                    {PROJECTS_IMMERSIVE[language].map((project) => (
                        <Link
                            key={project.id}
                            to={`/projects#project-${project.id}`}
                            className="block"
                            draggable={false}
                        >
                            <div
                                className="relative group aspect-[3/4] md:aspect-square overflow-hidden rounded-3xl border border-white/10 cursor-pointer"
                            >
                                <img
                                    src={project.backgroundImage}
                                    alt={project.title}
                                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                                    draggable={false}
                                />
                                {/* ПК: повний overlay з описом */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 md:p-12 hidden md:flex flex-col justify-end text-white">
                                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <span className="text-white/70 font-medium tracking-wider text-sm md:text-base mb-3 block">{project.category}</span>
                                        <h3 className="text-2xl md:text-4xl font-bold mb-3">{project.title}</h3>
                                        <p className="text-white/80 text-base md:text-lg line-clamp-2 max-w-xl mb-6">{project.description}</p>
                                        <div className="flex items-center gap-2 text-sm text-white/60">
                                            <MapPin size={16} />
                                            {project.location}
                                        </div>
                                    </div>
                                </div>
                                {/* Мобільний: компактний overlay тільки з назвою внизу */}
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3 md:hidden text-white">
                                    <h3 className="text-sm font-bold leading-tight">{project.title}</h3>
                                    <div className="flex items-center gap-1 text-[11px] text-white/60 mt-1">
                                        <MapPin size={12} />
                                        {project.location}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </Carousel>

                <div className="px-4 mt-8 md:hidden text-center">
                    <Link to="/projects">
                        <Button variant="outline" className="w-full">{t.projects.allProjectsBtn}</Button>
                    </Link>
                </div>
            </Section>

            {/* MAP SECTION */}
            <MapSection />

            {/* CONTACT CTA */}
            <Section id="contacts" className="py-32 bg-foreground text-background text-center rounded-t-[3rem] mx-4 mt-12 mb-0" noAnimation>
                <FadeIn>
                    <div className="max-w-4xl mx-auto space-y-8">
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">{t.contact.heading}</h2>
                        <p className="text-xl text-white/60">{t.contact.subheading}</p>
                        <div className="flex flex-col md:flex-row gap-4 justify-center pt-8">
                            <Button
                                className="bg-white text-foreground hover:bg-gray-200 gap-2"
                                onClick={() => window.open('https://t.me/me_ppo', '_blank')}
                            >
                                <TelegramIcon className="w-5 h-5 text-[#2AABEE]" />
                                {t.contact.consultationBtn}
                            </Button>
                            <Button
                                variant="outline"
                                className="border-white text-white hover:bg-white hover:text-foreground gap-2"
                                onClick={() => window.open('https://wa.me/380634535983', '_blank')}
                            >
                                <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
                                {t.contact.whatsappBtn}
                            </Button>
                        </div>
                    </div>
                </FadeIn>
            </Section>

        </main >
    );
};

export default Home;
