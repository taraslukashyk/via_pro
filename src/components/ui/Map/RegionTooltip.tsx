import React from 'react';
import type { RegionStats } from '../../../data/regionStats';
import { useTranslation } from '../../../translations';

interface RegionTooltipProps {
    stats: RegionStats;
    x: number;
    y: number;
    visible: boolean;
}

export const RegionTooltip: React.FC<RegionTooltipProps> = ({ stats, x, y, visible }) => {
    const t = useTranslation();

    if (!visible) return null;

    return (
        <div
            className="absolute z-50 pointer-events-none"
            style={{
                left: `${x}px`,
                top: `${y}px`,
                transform: 'translate(-50%, -120%)',
            }}
        >
            <div className="bg-background/95 backdrop-blur-sm border border-accent/20 rounded-xl shadow-2xl p-4 min-w-[280px]">
                {/* Заголовок - назва області */}
                <h3 className="text-lg font-bold text-foreground mb-3 border-b border-accent/10 pb-2">
                    {stats.name}
                </h3>

                {/* Загальна кількість */}
                <div className="mb-3 p-2 bg-accent/5 rounded-lg">
                    <div className="flex justify-between items-center">
                        <span className="text-foreground/80 font-medium">{t.geography.tooltipTotal}</span>
                        <span className="text-2xl font-bold text-accent">{stats.total}</span>
                    </div>
                </div>

                {/* Детальна статистика */}
                <div className="space-y-2 text-sm">
                    {/* Технагляд */}
                    {stats.technicalSupervision > 0 && (
                        <div className="flex justify-between items-center">
                            <span className="text-foreground/70">{t.geography.tooltipTechnicalSupervision}</span>
                            <span className="font-semibold text-foreground">{stats.technicalSupervision}</span>
                        </div>
                    )}

                    {/* Проєктування */}
                    {stats.design > 0 && (
                        <div className="flex justify-between items-center">
                            <span className="text-foreground/70">{t.geography.tooltipDesign}</span>
                            <span className="font-semibold text-foreground">{stats.design}</span>
                        </div>
                    )}

                    {/* Ремонт */}
                    {stats.repair > 0 && (
                        <div className="flex justify-between items-center">
                            <span className="text-foreground/70">{t.geography.tooltipRepair}</span>
                            <span className="font-semibold text-foreground">{stats.repair}</span>
                        </div>
                    )}

                    {/* Інше */}
                    {stats.other > 0 && (
                        <div className="flex justify-between items-center">
                            <span className="text-foreground/70">{t.geography.tooltipOther}</span>
                            <span className="font-semibold text-foreground">{stats.other}</span>
                        </div>
                    )}
                </div>

                {/* Трикутна стрілка вниз */}
                <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-full">
                    <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-accent/20"></div>
                </div>
            </div>
        </div>
    );
};
