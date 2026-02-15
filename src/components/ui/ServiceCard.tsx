import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useTranslation } from '../../translations';

interface ServiceCardProps {
    index: number;
    title: string;
    intro: string;
    details: string[];
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ index, title, intro, details }) => {
    const [isOpen, setIsOpen] = useState(false);
    const t = useTranslation();

    return (
        <motion.div
            layout
            initial="initial"
            animate="animate"
            variants={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 }
            }}
            onClick={() => setIsOpen(!isOpen)}
            className={`p-8 md:p-10 rounded-2xl bg-background border transition-all duration-300 group cursor-pointer flex flex-col
                ${isOpen ? 'border-accent shadow-lg h-[750px] overflow-y-auto' : 'border-foreground/5 hover:shadow-xl hover:border-accent/30 h-[380px] overflow-hidden'}
            `}
        >
            <motion.div layout="position" className="flex flex-col h-full">
                {/* Header Section */}
                <div className="flex justify-between items-start mb-6">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-colors duration-300
                        ${isOpen ? 'bg-accent text-white' : 'bg-foreground text-background group-hover:bg-accent group-hover:text-white'}
                    `}>
                        {index + 1}
                    </div>
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        className="text-foreground/40 group-hover:text-accent transition-colors"
                    >
                        <ChevronDown size={24} />
                    </motion.div>
                </div>

                <motion.h3 layout="position" className="text-2xl font-bold mb-4 leading-tight whitespace-pre-line">{title}</motion.h3>

                <motion.p layout="position" className="text-foreground/60 leading-relaxed mb-6 font-medium">
                    {intro}
                </motion.p>

                {/* Expandable Details */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            <div className="pt-4 border-t border-accent/10 space-y-3">
                                <h4 className="text-accent text-sm font-bold uppercase tracking-widest mb-3">{t.services.detailedBtn}:</h4>
                                <ul className="space-y-3">
                                    {details.map((item, idx) => (
                                        <motion.li
                                            key={idx}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="text-sm text-foreground/80 leading-relaxed pl-4 border-l-2 border-accent/30"
                                        >
                                            {item}
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Toggle Button Text */}
                <motion.div layout="position" className="mt-auto pt-6 flex items-center text-accent font-bold text-sm uppercase tracking-wider group-hover:translate-x-2 transition-transform">
                    {isOpen ? t.services.collapseBtn : t.services.detailsBtn}
                    <ArrowRight size={16} className={`ml-2 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
                </motion.div>
            </motion.div>
        </motion.div>
    );
};
