import { uk } from './uk';
import { en } from './en';
import { useLanguage, type Language } from '../contexts/LanguageContext';

export const translations = {
    uk,
    en,
};

export const useTranslation = () => {
    const { language } = useLanguage();
    return translations[language];
};

export { uk, en };
export type { Language };
