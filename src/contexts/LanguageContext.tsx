import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type Language = 'uk' | 'en';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'via-pro-language';

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>(() => {
        // Try to get language from localStorage, default to 'uk'
        const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
        return (stored === 'uk' || stored === 'en') ? stored : 'uk';
    });

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    };

    const toggleLanguage = () => {
        const newLang = language === 'uk' ? 'en' : 'uk';
        setLanguage(newLang);
    };

    useEffect(() => {
        // Sync with localStorage on mount
        localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
