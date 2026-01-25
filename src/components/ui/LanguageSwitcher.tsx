import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

interface LanguageSwitcherProps {
    isOverlay?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ isOverlay = false }) => {
    const { language, toggleLanguage } = useLanguage();

    const textClass = isOverlay ? 'text-white' : 'text-foreground';
    const inactiveClass = isOverlay ? 'text-white/40' : 'text-foreground/40';

    return (
        <button
            onClick={toggleLanguage}
            className="relative flex items-center gap-2 transition-all duration-300"
            aria-label="Switch language"
        >
            {/* UA */}
            <motion.span
                className={`text-sm font-bold transition-all duration-300 ${language === 'uk' ? textClass : inactiveClass
                    } hover:opacity-100`}
                animate={{
                    scale: language === 'uk' ? 1.1 : 1,
                }}
                transition={{ duration: 0.2 }}
            >
                UA
            </motion.span>

            {/* Separator */}
            <span className={`${inactiveClass} text-xs`}>/</span>

            {/* EN */}
            <motion.span
                className={`text-sm font-bold transition-all duration-300 ${language === 'en' ? textClass : inactiveClass
                    } hover:opacity-100`}
                animate={{
                    scale: language === 'en' ? 1.1 : 1,
                }}
                transition={{ duration: 0.2 }}
            >
                EN
            </motion.span>
        </button>
    );
};
