import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '../components/ui/Section';
import { FadeIn } from '../components/ui/FadeIn';
import { Button } from '../components/ui/Button';
import { X, Phone, Send, Landmark } from 'lucide-react';

const Career: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Construct telegram message
        const message = `Доброго дня! Я зацікавлений у вакансії. Мій номер: ${phoneNumber}`;
        const telegramUrl = `https://t.me/Taras_luka?text=${encodeURIComponent(message)}`;
        window.open(telegramUrl, '_blank');
        setIsModalOpen(false);
    };

    return (
        <main className="bg-background min-h-screen">
            {/* HERO SECTION - Centered per user request */}
            <Section className="min-h-screen flex items-center justify-center px-6">
                <div className="max-w-4xl mx-auto text-center space-y-8 pt-10">
                    <FadeIn>
                        <span className="text-accent font-medium tracking-widest uppercase mb-4 block">Орієнтовані на результат</span>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] mb-8">
                            Твоє майбутнє будується тут
                        </h1>
                        <p className="text-xl md:text-2xl text-foreground/60 font-light leading-relaxed">
                            Ми шукаємо талановитих інженерів та фахівців, які готові змінювати інфраструктуру України разом з нами.
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <div className="bg-foreground text-background p-12 rounded-[3rem] space-y-8 relative overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

                            <h2 className="text-3xl md:text-4xl font-bold relative z-10">Готові до нових викликів?</h2>
                            <p className="text-lg text-white/70 max-w-2xl mx-auto relative z-10">
                                Залишайте свої контакти, і ми зв'яжемося з Вами для обговорення можливостей співпраці.
                            </p>

                            <Button
                                className="bg-white text-foreground hover:bg-gray-200 text-lg px-10 py-6 rounded-full relative z-10"
                                onClick={() => setIsModalOpen(true)}
                            >
                                Долучитися
                            </Button>
                        </div>
                    </FadeIn>
                </div>
            </Section>

            {/* VACANCY SECTION - Full Width Dark Glass Card */}
            <Section className="py-24 flex items-center relative overflow-hidden px-0">
                <div className="w-full relative z-10 px-4 md:px-8">
                    <FadeIn>
                        {/* Dark Glass Card - Full Width Styling */}
                        <div className="relative overflow-hidden rounded-[2rem] bg-[#1a1a1a]/80 backdrop-blur-xl border border-white/10 shadow-2xl p-8 md:p-14 w-full mx-auto">
                            {/* Glossy overlay effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16">
                                {/* Left Content */}
                                <div className="space-y-6 text-left flex-1 w-full">
                                    <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 text-white/40 text-[10px] tracking-[0.2em] uppercase font-bold">
                                        Відкрита вакансія
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                                            Інженер-проєктувальник автомобільних доріг / ОДР
                                        </h3>

                                        <p className="text-lg md:text-xl text-white/50 font-light leading-relaxed max-w-4xl">
                                            Шукаємо спеціаліста для розробки дорожньої інфраструктури (ПЗ, АД) та схем організації дорожнього руху. Робота включає проєктування, супровід та спілкування з клієнтами.
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2 text-white/30 text-sm pt-4">
                                        <Landmark size={18} />
                                        <span>Ірпінь офіс / віддалено (можлива часткова зайнятість)</span>
                                    </div>
                                </div>

                                {/* Right Action */}
                                <div className="flex flex-col items-center md:items-end gap-8 flex-shrink-0 w-full md:w-auto">
                                    <Button
                                        className="bg-white text-black hover:bg-white/90 text-lg px-12 py-5 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 w-full md:w-auto font-bold shadow-xl shadow-white/5"
                                        onClick={() => setIsModalOpen(true)}
                                    >
                                        Відгукнутися
                                    </Button>
                                    <p className="text-white/20 text-sm italic font-light max-w-[280px] text-center md:text-right leading-relaxed">
                                        "Поділись своїм досвідом — давай будувати майбутнє разом"
                                    </p>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </Section>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-xl"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 20, opacity: 0 }}
                            className="bg-background p-8 md:p-12 rounded-[2.5rem] shadow-2xl max-w-md w-full relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="absolute top-6 right-6 p-2 text-foreground/40 hover:text-foreground transition-colors"
                                onClick={() => setIsModalOpen(false)}
                            >
                                <X size={24} />
                            </button>

                            <div className="space-y-6 text-center">
                                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto text-accent">
                                    <Phone size={32} />
                                </div>

                                <h3 className="text-3xl font-bold">Залишити заявку</h3>
                                <p className="text-foreground/60">
                                    Введіть свій номер телефону, і ми зв’яжемося з Вами найближчим часом.
                                </p>

                                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                                    <div className="relative">
                                        <input
                                            type="tel"
                                            placeholder="+380 (__) ___ __ __"
                                            className="w-full px-6 py-4 bg-muted border-none rounded-2xl text-lg focus:ring-2 focus:ring-accent transition-all pl-12"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            required
                                            autoFocus
                                        />
                                        <Phone size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" />
                                    </div>

                                    <Button className="w-full py-6 rounded-2xl text-lg gap-2 bg-accent text-white hover:bg-accent/90">
                                        Надіслати <Send size={20} />
                                    </Button>
                                </form>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
};

export default Career;
