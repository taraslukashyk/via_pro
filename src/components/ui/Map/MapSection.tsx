import React from 'react';
import { Section } from '../Section';
import { UkraineMap } from './UkraineMap';
import { useTranslation } from '../../../translations';

export const MapSection: React.FC = () => {
    const t = useTranslation();

    return (
        <Section className="py-20 relative overflow-hidden">
            <div className="text-center mb-16 relative z-10">
                <span className="text-accent font-medium tracking-widest uppercase mb-4 block">{t.geography.heading}</span>
                <h2 className="text-4xl md:text-5xl font-bold">{t.geography.subheading}</h2>
                <p className="mt-4 text-foreground/60 max-w-xl mx-auto">
                    {t.geography.description}
                </p>
            </div>

            <div className="relative w-full max-w-5xl mx-auto aspect-[3/2] bg-background/50 rounded-3xl p-4 md:p-8">
                <div className="relative w-full h-full">
                    <UkraineMap />
                </div>
            </div>
        </Section>
    );
};
