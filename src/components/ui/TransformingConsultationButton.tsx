import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone } from 'lucide-react';
import { Button } from './Button';
import { useTranslation } from '../../translations';

interface TransformingConsultationButtonProps {
    isHeroVisible: boolean;
}

export const TransformingConsultationButton: React.FC<TransformingConsultationButtonProps> = ({ isHeroVisible }) => {
    const t = useTranslation();

    const handleClick = () => {
        document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <AnimatePresence mode="wait">
            {isHeroVisible ? (
                <motion.div
                    key="hero-button"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.5 } }}
                    className="inline-block"
                >
                    <Button
                        className="text-lg px-8 py-4 bg-accent hover:bg-accent/90 shadow-lg min-w-[200px]"
                        onClick={handleClick}
                    >
                        {t.hero.cta}
                    </Button>
                </motion.div>
            ) : (
                <motion.div
                    key="fab-container"
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20, transition: { duration: 0.5 } }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="fixed bottom-24 right-6 z-[9999]"
                >
                    {/* Pulsing waves - Smoother */}
                    <motion.div
                        className="absolute inset-0 rounded-full bg-accent"
                        style={{ willChange: 'transform, opacity' }}
                        animate={{
                            scale: [1, 1.5],
                            opacity: [0, 0.4, 0]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeOut"
                        }}
                    />
                    <motion.div
                        className="absolute inset-0 rounded-full bg-accent"
                        style={{ willChange: 'transform, opacity' }}
                        animate={{
                            scale: [1, 1.5],
                            opacity: [0, 0.3, 0]
                        }}
                        transition={{
                            duration: 3,
                            delay: 1.5,
                            repeat: Infinity,
                            ease: "easeOut"
                        }}
                    />

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.open('https://t.me/Taras_luka', '_blank')}
                        className="relative z-10 bg-accent text-white shadow-2xl flex items-center justify-center rounded-full"
                        style={{ width: '80px', height: '80px' }}
                    >
                        <Phone className="w-8 h-8" />
                    </motion.button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
