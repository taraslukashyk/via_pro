import React, { useRef, useEffect } from 'react';
import type { RegionStats } from '../../../data/regionStats';
import { useTranslation } from '../../../translations';

interface RegionTooltipProps {
    stats: RegionStats;
    x: number;
    y: number;
    visible: boolean;
    containerRef: React.RefObject<HTMLDivElement | null>;
}

export const RegionTooltip: React.FC<RegionTooltipProps> = ({ stats, x, y, visible, containerRef }) => {
    const t = useTranslation();
    const tooltipRef = useRef<HTMLDivElement>(null);

    // Обчислюємо безпечну позицію, щоб tooltip не виходив за межі контейнера
    useEffect(() => {
        if (!visible || !tooltipRef.current || !containerRef.current) return;

        const tooltip = tooltipRef.current;
        const container = containerRef.current;
        const containerRect = container.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();

        // Перевіряємо чи tooltip виходить за межі контейнера
        let adjustedX = x;
        let adjustedY = y;

        // Ліва межа
        if (tooltipRect.left < containerRect.left) {
            adjustedX = tooltipRect.width / 2 + 8;
        }
        // Права межа
        if (tooltipRect.right > containerRect.right) {
            adjustedX = containerRect.width - tooltipRect.width / 2 - 8;
        }
        // Верхня межа — якщо tooltip не вміщується зверху, показуємо знизу
        if (tooltipRect.top < containerRect.top) {
            adjustedY = y + tooltipRect.height + 24;
        }

        if (adjustedX !== x || adjustedY !== y) {
            tooltip.style.left = `${adjustedX}px`;
            tooltip.style.top = `${adjustedY}px`;
        }
    }, [visible, x, y, containerRef]);

    if (!visible) return null;

    // На мобільних — фіксована позиція внизу карти, на десктопі — слідує за курсором
    return (
        <>
            {/* Десктопна версія — слідує за курсором */}
            <div
                ref={tooltipRef}
                className="absolute z-50 pointer-events-none hidden md:block"
                style={{
                    left: `${x}px`,
                    top: `${y}px`,
                    transform: 'translate(-50%, -110%)',
                }}
            >
                <TooltipContent stats={stats} t={t} />
            </div>

            {/* Мобільна версія — фіксована позиція під картою */}
            <div className="md:hidden fixed top-20 left-4 right-4 z-50 pointer-events-none">
                <TooltipContent stats={stats} t={t} />
            </div>
        </>
    );
};

// Виносимо вміст tooltip в окремий компонент щоб не дублювати
interface TooltipContentProps {
    stats: RegionStats;
    t: ReturnType<typeof useTranslation>;
}

const TooltipContent: React.FC<TooltipContentProps> = ({ stats, t }) => (
    <div className="bg-background/95 backdrop-blur-sm border border-accent/20 rounded-xl shadow-2xl p-4 min-w-[220px]">
        {/* Заголовок — назва області */}
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

            {stats.repair > 0 && (
                <div className="flex justify-between items-center">
                    <span className="text-foreground/70">{t.geography.tooltipRepair}</span>
                    <span className="font-semibold text-foreground">{stats.repair}</span>
                </div>
            )}

            {stats.other > 0 && (
                <div className="flex justify-between items-center">
                    <span className="text-foreground/70">{t.geography.tooltipOther}</span>
                    <span className="font-semibold text-foreground">{stats.other}</span>
                </div>
            )}
        </div>
    </div>
);
