import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import logo from '../../assets/logo.png';
import { TelegramIcon, WhatsAppIcon, YouTubeIcon } from '../ui/SocialIcons';

const MotionLink = motion(Link);

interface HeaderProps {
    isOverlay?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isOverlay = false }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const isHome = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (e: React.MouseEvent, href: string) => {
        if (!isHome) {
            return; // Navigation will be handled by Router Link to "/#href"
        }
        e.preventDefault();
        const targetId = href.replace('#', '');
        const elem = document.getElementById(targetId);
        if (elem) {
            elem.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleLogoClick = (e: React.MouseEvent) => {
        if (isHome) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            navigate('/');
        }
    };

    const navLinks = [
        { name: 'Про компанію', href: '#about' },
        { name: 'Послуги', href: '#services' },
        { name: 'Проєкти', href: '/projects' },
        { name: 'Кар\'єра', href: '/career' },
        { name: 'Контакти', href: '#contacts' },
    ];

    // Determine styling based on overlay mode
    const navTextClass = isOverlay ? 'text-white/80 hover:text-white' : 'text-foreground/70 hover:text-foreground';
    const socialIconClass = isOverlay ? 'text-white/60 hover:text-white' : 'text-foreground/60 hover:text-accent';
    const bgScrolledClass = isOverlay
        ? 'bg-black/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.15)] backdrop-blur-[20px] backdrop-saturate-[180%] border border-white/10'
        : 'bg-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] backdrop-blur-[20px] backdrop-saturate-[180%] border border-white/20';

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4' : 'py-6'
                    }`}
            >
                <div className={`container mx-auto px-6 md:px-12 transition-all duration-300`}>
                    <div
                        className={`relative flex items-center justify-between rounded-full px-6 py-3 transition-all duration-500
                            ${isScrolled || isOverlay
                                ? bgScrolledClass
                                : 'bg-transparent border-transparent'
                            }
                        `}
                    >
                        {/* Glass Refraction Highlight for Scrolled State */}
                        {(isScrolled || isOverlay) && (
                            <div className="absolute inset-0 rounded-full border border-white/30 pointer-events-none mix-blend-overlay" />
                        )}

                        {/* Logo */}
                        <Link
                            to="/"
                            onClick={handleLogoClick}
                            className="font-bold text-2xl tracking-tighter text-foreground z-50 flex items-center"
                        >
                            <div className="w-40 h-10 md:w-48 md:h-12 relative group">
                                <img src={logo} alt="ВІА ПРО" className="w-full h-full object-contain object-left transition-transform duration-300 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-white/10 skew-x-12 translate-x-[-150%] group-hover:animate-[shimmer_1s_infinite] pointer-events-none" />
                            </div>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-8 z-50">
                            {navLinks.map((link) => {
                                const isAnchor = link.href.startsWith('#');
                                const to = isAnchor
                                    ? (isHome ? link.href : `/${link.href}`)
                                    : link.href;

                                return (
                                    <Link
                                        key={link.name}
                                        to={to}
                                        onClick={(e) => isAnchor ? handleNavClick(e, link.href) : undefined}
                                        className={`text-sm font-medium ${navTextClass} relative group py-1 transition-colors`}
                                    >
                                        {link.name}
                                        <span className={`absolute bottom-0 left-0 w-full h-[1px] ${isOverlay ? 'bg-white' : 'bg-accent'} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Social Icons */}
                        <div className="hidden md:flex items-center gap-4 z-50">
                            <a href="https://t.me/Taras_luka" target="_blank" rel="noopener noreferrer" className={`${socialIconClass} transition-colors hover:scale-110 duration-300`}><TelegramIcon className="w-5 h-5" /></a>
                            <a href="https://wa.me/380685032230" target="_blank" rel="noopener noreferrer" className={`${socialIconClass} transition-colors hover:scale-110 duration-300`}><WhatsAppIcon className="w-5 h-5" /></a>
                            <a href="https://www.youtube.com/@taraslukashyk" target="_blank" rel="noopener noreferrer" className={`${isOverlay ? 'text-white/60 hover:text-red-400' : 'text-foreground/60 hover:text-red-500'} transition-colors hover:scale-110 duration-300`}><YouTubeIcon className="w-5 h-5" /></a>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden z-50 p-2 text-foreground"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center space-y-8 md:hidden"
                    >
                        {navLinks.map((link, index) => {
                            const isAnchor = link.href.startsWith('#');
                            const to = isAnchor
                                ? (isHome ? link.href : `/${link.href}`)
                                : link.href;

                            return (
                                <MotionLink
                                    key={link.name}
                                    to={to}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + index * 0.1 }}
                                    className="text-3xl font-medium text-foreground"
                                    onClick={(e) => {
                                        if (isAnchor) handleNavClick(e, link.href);
                                        setIsMobileMenuOpen(false);
                                    }}
                                >
                                    {link.name}
                                </MotionLink>
                            );
                        })}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Button onClick={() => setIsMobileMenuOpen(false)}>Зв'язатись</Button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
