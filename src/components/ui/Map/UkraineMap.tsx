import React, { useState, useCallback } from 'react';
import { UKRAINE_REGIONS } from '../../../data/mapPaths';
import { getRegionStats, getStatsRange, type RegionStats } from '../../../data/regionStats';
import { RegionTooltip } from './RegionTooltip';

export const UkraineMap: React.FC = () => {
    const [hoveredRegion, setHoveredRegion] = useState<RegionStats | null>(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

    // Отримуємо діапазон значень для градієнту
    const { min, max } = getStatsRange();

    // Функція для обчислення кольору області на основі кількості об'єктів
    // Акцентний колір #184c71 (RGB: 24, 76, 113) з tailwind.config.js
    const getRegionColor = useCallback((regionId: number): string => {
        const stats = getRegionStats(regionId);

        if (!stats || stats.total === 0) {
            return 'transparent'; // Прозорий для областей без об'єктів
        }

        // Нормалізуємо значення від 0 до 1
        const normalized = max === min ? 1 : (stats.total - min) / (max - min);

        // Створюємо градієнт від світлого до темного акцентного кольору
        // opacity змінюється від 0.15 (min) до 0.75 (max)
        const opacity = 0.15 + normalized * 0.6;

        return `rgba(24, 76, 113, ${opacity.toFixed(2)})`;
    }, [min, max]);

    // Обробник наведення на область
    const handleMouseEnter = useCallback((e: React.MouseEvent<SVGPathElement>, regionId: number) => {
        const stats = getRegionStats(regionId);
        if (stats) {
            setHoveredRegion(stats);

            // Отримуємо координати відносно SVG елемента
            const svgRect = e.currentTarget.ownerSVGElement?.getBoundingClientRect();
            if (svgRect) {
                setTooltipPosition({
                    x: e.clientX - svgRect.left,
                    y: e.clientY - svgRect.top,
                });
            }
        }
    }, []);

    // Обробник руху миші для оновлення позиції tooltip
    const handleMouseMove = useCallback((e: React.MouseEvent<SVGPathElement>) => {
        const svgRect = e.currentTarget.ownerSVGElement?.getBoundingClientRect();
        if (svgRect && hoveredRegion) {
            setTooltipPosition({
                x: e.clientX - svgRect.left,
                y: e.clientY - svgRect.top,
            });
        }
    }, [hoveredRegion]);

    // Обробник виходу з області
    const handleMouseLeave = useCallback(() => {
        setHoveredRegion(null);
    }, []);

    return (
        <div className="w-full h-full relative">
            <svg
                viewBox="0 0 800 520"
                className="w-full h-full drop-shadow-sm"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {UKRAINE_REGIONS.map((region) => {
                    const stats = getRegionStats(region.id);
                    const hasData = stats && stats.total > 0;

                    return (
                        <path
                            key={region.id}
                            id={String(region.id)}
                            d={region.d}
                            data-name={region.name}
                            fill={getRegionColor(region.id)}
                            className={`
                                stroke-foreground/10 stroke-[1.5] 
                                transition-all duration-300 ease-out
                                ${hasData ? 'cursor-pointer hover:stroke-accent/70 hover:brightness-110' : 'cursor-default'}
                            `}
                            onMouseEnter={(e) => handleMouseEnter(e, region.id)}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                        />
                    );
                })}
            </svg>

            {/* Tooltip */}
            {hoveredRegion && (
                <RegionTooltip
                    stats={hoveredRegion}
                    x={tooltipPosition.x}
                    y={tooltipPosition.y}
                    visible={!!hoveredRegion}
                />
            )}
        </div>
    );
};
