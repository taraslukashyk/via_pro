import React from 'react';
import { COMPANY_INFO } from '../../data/companyInfo';
import { useTranslation } from '../../translations';

export const Footer: React.FC = () => {
    const t = useTranslation();

    return (
        <footer className="bg-foreground text-background py-16 px-6 md:px-12 mt-20">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* Column 1: Brand */}
                <div className="space-y-4">
                    <h2 className="text-3xl font-bold tracking-tighter">{COMPANY_INFO.shortName}</h2>
                    <p className="text-gray-400 text-sm max-w-xs">
                        {t.company.name} — {t.footer.description}
                    </p>
                </div>

                {/* Column 2: Navigation */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">{t.footer.navigation}</h3>
                    <ul className="space-y-2 text-gray-400">
                        <li><a href="#about" className="hover:text-white transition-colors">{t.footer.navAbout}</a></li>
                        <li><a href="#services" className="hover:text-white transition-colors">{t.footer.navServices}</a></li>
                        <li><a href="#projects" className="hover:text-white transition-colors">{t.footer.navProjects}</a></li>
                    </ul>
                </div>

                {/* Column 3: Services */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">{t.footer.servicesTitle}</h3>
                    <ul className="space-y-2 text-gray-400">
                        <li><a href="/via_pro/projects" className="hover:text-white transition-colors">{t.footer.service1}</a></li>
                        <li><a href="/via_pro/projects" className="hover:text-white transition-colors">{t.footer.service2}</a></li>
                        <li><a href="/via_pro/projects" className="hover:text-white transition-colors">{t.footer.service3}</a></li>
                        <li><a href="/via_pro/projects" className="hover:text-white transition-colors">{t.footer.service4}</a></li>
                    </ul>
                </div>

                {/* Column 4: Contacts */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">{t.footer.contactsTitle}</h3>
                    <ul className="space-y-2 text-gray-400">
                        <li className="flex items-start gap-2">
                            <span>📍</span>
                            <span>{t.company.address}</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span>📞</span>
                            <a href={`tel:${COMPANY_INFO.phone}`}>{COMPANY_INFO.phone}</a>
                        </li>
                        <li className="flex items-center gap-2">
                            <span>✉️</span>
                            <a href={`mailto:${COMPANY_INFO.email}`}>{COMPANY_INFO.email}</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="container mx-auto mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
                <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4">
                    <p>&copy; {new Date().getFullYear()} {t.company.name}. {t.footer.copyright}</p>
                    <span className="hidden md:inline">•</span>
                    <p>
                        Created by{' '}
                        <a
                            href="https://www.linkedin.com/in/taras-lukashyk/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition-colors underline"
                        >
                            Taras Lukashyk
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
};
