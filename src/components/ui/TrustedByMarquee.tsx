import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../../translations';
import atbLogo from '../../assets/logos/atb.svg';
import fozzyLogo from '../../assets/logos/fozzy.svg';
import mcdonaldsLogo from '../../assets/logos/mcdonalds.svg';
import inzhurLogo from '../../assets/logos/inzhur.svg';
import molodistLogo from '../../assets/logos/molodist.png';
import okkoLogo from '../../assets/logos/окко.svg';

// Масив логотипів компаній-партнерів
const logos = [
    { src: atbLogo, alt: 'АТБ' },
    { src: fozzyLogo, alt: 'Фоззі Груп' },
    { src: mcdonaldsLogo, alt: 'McDonald\'s' },
    { src: inzhurLogo, alt: 'ІНЖУР' },
    { src: molodistLogo, alt: 'МОЛОДІСТЬ' },
    { src: okkoLogo, alt: 'ОККО' },
];

interface TrustedByMarqueeProps {
    showTitle?: boolean;
}

export const TrustedByMarquee: React.FC<TrustedByMarqueeProps> = ({ showTitle = true }) => {
    const t = useTranslation();

    return (
        <div className="w-full py-8 overflow-hidden bg-white/5 backdrop-blur-md border-y border-white/10">
            {showTitle && (
                <div className="mb-6 text-center">
                    <span className="text-sm font-medium tracking-widest uppercase text-foreground/60">
                        {t.trustedBy.title}
                    </span>
                </div>
            )}

            {/* Контейнер для бігучої стрічки */}
            <div className="relative flex overflow-hidden">
                {/* Анімована стрічка - дублюємо для безперервної анімації */}
                <motion.div
                    className="flex gap-16 items-center"
                    animate={{
                        x: [0, -1200], // Рухаємо на ширину одного набору логотипів
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 30,
                            ease: "linear",
                        },
                    }}
                >
                    {/* Перший набір логотипів */}
                    {logos.map((logo, index) => (
                        <div
                            key={`logo-1-${index}`}
                            className="flex-shrink-0 w-40 h-20 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                        >
                            <img
                                src={logo.src}
                                alt={logo.alt}
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>
                    ))}

                    {/* Другий набір логотипів (дублікат для безперервної анімації) */}
                    {logos.map((logo, index) => (
                        <div
                            key={`logo-2-${index}`}
                            className="flex-shrink-0 w-40 h-20 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                        >
                            <img
                                src={logo.src}
                                alt={logo.alt}
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>
                    ))}

                    {/* Третій набір логотипів (ще один дублікат для плавності) */}
                    {logos.map((logo, index) => (
                        <div
                            key={`logo-3-${index}`}
                            className="flex-shrink-0 w-40 h-20 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                        >
                            <img
                                src={logo.src}
                                alt={logo.alt}
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};
