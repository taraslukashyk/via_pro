import React, { useState, useCallback, useRef, useEffect } from 'react';
import { UKRAINE_REGIONS } from '../../../data/mapPaths';
import { getRegionStats, getStatsRange, type RegionStats } from '../../../data/regionStats';
import { RegionTooltip } from './RegionTooltip';

export const UkraineMap: React.FC = () => {
    const [hoveredRegion, setHoveredRegion] = useState<RegionStats | null>(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

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

    // Обробник наведення на область (десктоп)
    const handlePointerEnter = useCallback((e: React.PointerEvent<SVGPathElement>, regionId: number) => {
        if (e.pointerType !== 'mouse') return; // Ігноруємо touch події, щоб уникнути конфліктів на iOS
        const stats = getRegionStats(regionId);
        if (stats) {
            setHoveredRegion(stats);
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
    const handlePointerMove = useCallback((e: React.PointerEvent<SVGPathElement>) => {
        if (e.pointerType !== 'mouse') return;
        const svgRect = e.currentTarget.ownerSVGElement?.getBoundingClientRect();
        if (svgRect && hoveredRegion) {
            setTooltipPosition({
                x: e.clientX - svgRect.left,
                y: e.clientY - svgRect.top,
            });
        }
    }, [hoveredRegion]);

    // Обробник виходу з області
    const handlePointerLeave = useCallback((e: React.PointerEvent<SVGPathElement>) => {
        if (e.pointerType !== 'mouse') return;
        setHoveredRegion(null);
    }, []);

    // Обробник кліку/тачу для мобільних — toggle tooltip
    const handleClick = useCallback((e: React.MouseEvent<SVGPathElement>, regionId: number) => {
        e.stopPropagation(); // Запобігаємо закриттю при кліці на саму область

        const stats = getRegionStats(regionId);
        if (!stats) return;

        // Якщо натиснуто на ту ж область — приховати tooltip
        if (hoveredRegion?.id === regionId) {
            setHoveredRegion(null);
        } else {
            setHoveredRegion(stats);
            const svgRect = e.currentTarget.ownerSVGElement?.getBoundingClientRect();
            if (svgRect) {
                setTooltipPosition({
                    x: e.clientX - svgRect.left,
                    y: e.clientY - svgRect.top,
                });
            }
        }
    }, [hoveredRegion]);

    // Закриваємо тултип при кліці поза картою (корисно для мобільних)
    useEffect(() => {
        const handleDocumentClick = () => {
            setHoveredRegion(null);
        };
        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    return (
        <div className="w-full h-full relative" ref={containerRef}>
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
                            data-hovered={hoveredRegion?.id === region.id}
                            className={`
                                stroke-foreground/10 stroke-[1.5] 
                                transition-all duration-300 ease-out
                                ${hasData ? 'cursor-pointer md:hover:stroke-accent/70 md:hover:brightness-110 data-[hovered=true]:stroke-accent/70 data-[hovered=true]:brightness-110' : 'cursor-default'}
                            `}
                            onPointerEnter={(e) => handlePointerEnter(e, region.id)}
                            onPointerMove={handlePointerMove}
                            onPointerLeave={handlePointerLeave}
                            onClick={(e) => handleClick(e, region.id)}
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
                    containerRef={containerRef}
                />
            )}
        </div>
    );
};
