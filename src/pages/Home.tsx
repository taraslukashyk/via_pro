import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COMPANY_INFO } from '../data/companyInfo';
import { PROJECTS } from '../data/projects';
import { Button } from '../components/ui/Button';
import { Section } from '../components/ui/Section';
import { MapSection } from '../components/ui/Map/MapSection';
import { StatsCounter } from '../components/ui/StatsCounter';
import { FadeIn, FadeInStagger } from '../components/ui/FadeIn';
import { ServiceCard } from '../components/ui/ServiceCard';
import { TelegramIcon, WhatsAppIcon } from '../components/ui/SocialIcons';
import { Carousel } from '../components/ui/Carousel';

const Home: React.FC = () => {
    const targetRef = useRef<HTMLDivElement>(null);
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
                <motion.div style={{ opacity, scale }} className="z-10 max-w-5xl mx-auto space-y-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="text-[12vw] leading-none font-bold tracking-tighter text-accent"
                    >
                        VIA PRO
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-xl md:text-2xl text-foreground/60 max-w-2xl mx-auto font-light"
                    >
                        Інженерна точність. Надійне плече.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <Button
                            className="mt-8 text-lg px-8 py-4 bg-accent hover:bg-accent/90"
                            onClick={() => document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            Отримати консультацію зараз
                        </Button>
                    </motion.div>
                </motion.div>

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
                        <StatsCounter value={5} suffix="+" label="Років на ринку" />
                    </motion.div>

                    <motion.div variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }}>
                        <StatsCounter value={160} suffix="+" label="Реалізованих проєктів" />
                    </motion.div>

                    <motion.div variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }}>
                        <StatsCounter value={30} suffix="%" label="Щорічне зростання" />
                    </motion.div>
                </FadeInStagger>
            </Section>

            {/* ABOUT SECTION */}
            <Section id="about" className="py-32" noAnimation>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto items-center">
                    <FadeIn direction="right" className="h-full flex flex-col justify-center">
                        <div>
                            <span className="text-accent font-medium tracking-widest uppercase mb-4 block">Про компанію</span>
                            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                                Ми створюємо інфраструктуру майбутнього
                            </h2>
                            <p className="text-lg text-foreground/70 mb-6">
                                Компанія «ВІА ПРО» — це поєднання інженерного досвіду, сучасних технологій та бездоганної репутації. Заснована у 2021 році, ми пройшли шлях від локального бюро до потужного гравця на ринку проєктування інфраструктурних об'єктів та в сфері інжинірингу.
                            </p>
                            <div className="flex items-center gap-4 border-l-4 border-accent pl-6 py-2 bg-muted/30 rounded-r-lg">
                                <div>
                                    <p className="font-bold text-lg">{COMPANY_INFO.director}</p>
                                    <p className="text-sm text-foreground/60">Засновник та Директор</p>
                                </div>
                            </div>
                            <Button
                                variant="outline"
                                className="mt-8 self-start border-accent text-accent hover:bg-accent hover:text-white"
                                onClick={() => window.location.href = '/career'}
                            >
                                Долучитися до команди
                            </Button>
                        </div>
                    </FadeIn>
                    <FadeIn direction="left" delay={0.2} className="h-full flex items-center">
                        <div className="relative h-auto w-full max-w-lg aspect-[4/5] max-h-full bg-gray-200 rounded-2xl overflow-hidden shadow-2xl mx-auto lg:mx-0 lg:ml-auto">
                            {/* Placeholder for Director or Team photo */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-foreground/20 to-transparent z-10"></div>
                            <img src="/assets/images/square_about_image.png" alt="Construction Management" className="object-cover w-full h-full hover:scale-105 transition-transform duration-700" />
                        </div>
                    </FadeIn>
                </div>
            </Section>

            {/* SERVICES SECTION */}
            <Section id="services" className="bg-white py-32 rounded-3xl mx-4 my-8" noAnimation>
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <FadeIn>
                        <span className="text-accent font-medium tracking-widest uppercase mb-4 block">Діяльність</span>
                        <h2 className="text-4xl md:text-5xl font-bold">Комплексні рішення</h2>
                    </FadeIn>
                </div>

                <div className="px-4">
                    <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
                        {COMPANY_INFO.services.map((service, index) => (
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
                                <span className="text-accent font-medium tracking-widest uppercase mb-4 block">Портфоліо</span>
                                <h2 className="text-4xl md:text-5xl font-bold">Реалізовані кейси</h2>
                            </div>
                            <Link to="/projects">
                                <Button variant="outline" className="mt-8 md:mt-0 hidden md:flex">Всі проєкти</Button>
                            </Link>
                        </div>
                    </FadeIn>
                </div>

                <Carousel className="w-full">
                    {PROJECTS.map((project) => (
                        <div
                            key={project.id}
                            className="relative group aspect-[16/10] overflow-hidden rounded-3xl border border-white/10"
                        >
                            <img
                                src={project.image}
                                alt={project.title}
                                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                                draggable={false}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 md:p-12 flex flex-col justify-end text-white">
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
                        </div>
                    ))}
                </Carousel>

                <div className="px-4 mt-8 md:hidden text-center">
                    <Link to="/projects">
                        <Button variant="outline" className="w-full">Всі проєкти</Button>
                    </Link>
                </div>
            </Section>

            {/* MAP SECTION */}
            <MapSection />

            {/* CONTACT CTA */}
            <Section id="contacts" className="py-32 bg-foreground text-background text-center rounded-t-[3rem] mx-4 mt-12 mb-0" noAnimation>
                <FadeIn>
                    <div className="max-w-4xl mx-auto space-y-8">
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">Готові до співпраці?</h2>
                        <p className="text-xl text-white/60">Зв'яжіться з нами для обговорення вашого наступного проєкту.</p>
                        <div className="flex flex-col md:flex-row gap-4 justify-center pt-8">
                            <Button
                                className="bg-white text-foreground hover:bg-gray-200 gap-2"
                                onClick={() => window.open('https://t.me/Taras_luka', '_blank')}
                            >
                                <TelegramIcon className="w-5 h-5 text-[#2AABEE]" />
                                Отримати консультацію
                            </Button>
                            <Button
                                variant="outline"
                                className="border-white text-white hover:bg-white hover:text-foreground gap-2"
                                onClick={() => window.open('https://wa.me/380685032230', '_blank')}
                            >
                                <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
                                WhatsApp
                            </Button>
                        </div>
                    </div>
                </FadeIn>
            </Section>

        </main>
    );
};

export default Home;
