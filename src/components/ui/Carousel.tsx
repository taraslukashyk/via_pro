import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
    children: React.ReactNode[];
    className?: string;
}

export const Carousel: React.FC<CarouselProps> = ({ children, className = '' }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 10);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

            // Calculate active index based on scroll position
            const items = scrollRef.current.children;
            if (items.length > 0) {
                const itemWidth = (items[0] as HTMLElement).offsetWidth + 24; // width + gap
                const index = Math.round(scrollLeft / itemWidth);
                if (index !== activeIndex) {
                    setActiveIndex(index);
                }
            }
        }
    };

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', checkScroll);
            checkScroll();
            window.addEventListener('resize', checkScroll);
            return () => {
                scrollContainer.removeEventListener('scroll', checkScroll);
                window.removeEventListener('resize', checkScroll);
            };
        }
    }, [children]);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const container = scrollRef.current;
            const items = container.children;
            if (items.length > 0) {
                const itemWidth = (items[0] as HTMLElement).offsetWidth + 24; // width + gap
                container.scrollBy({
                    left: direction === 'left' ? -itemWidth : itemWidth,
                    behavior: 'smooth'
                });
            }
        }
    };

    const scrollTo = (index: number) => {
        if (scrollRef.current) {
            const container = scrollRef.current;
            const items = container.children;
            if (items[index]) {
                const itemWidth = (items[0] as HTMLElement).offsetWidth + 24;
                container.scrollTo({
                    left: index * itemWidth,
                    behavior: 'smooth'
                });
            }
        }
    };

    return (
        <div className={`relative group/carousel ${className}`}>
            {/* Стрілки навігації — ПК: круглі кнопки, Мобільний: тонкі смужки по боках */}
            {/* Ліва кнопка — ПК */}
            <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={`absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white disabled:opacity-0 rounded-full p-4 shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 hidden md:flex items-center justify-center ${!canScrollLeft ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-6 h-6 text-[#184c71]" />
            </button>

            {/* Права кнопка — ПК */}
            <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={`absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white disabled:opacity-0 rounded-full p-4 shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 hidden md:flex items-center justify-center ${!canScrollRight ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                aria-label="Next slide"
            >
                <ChevronRight className="w-6 h-6 text-[#184c71]" />
            </button>

            {/* Ліва смужка — мобільний */}
            <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={`absolute left-0 top-1/2 -translate-y-1/2 z-30 w-2 h-16 rounded-r-full bg-[#184c71]/40 active:bg-[#184c71]/70 transition-all duration-300 md:hidden ${!canScrollLeft ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                aria-label="Previous slide"
            />

            {/* Права смужка — мобільний */}
            <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={`absolute right-0 top-1/2 -translate-y-1/2 z-30 w-2 h-16 rounded-l-full bg-[#184c71]/40 active:bg-[#184c71]/70 transition-all duration-300 md:hidden ${!canScrollRight ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                aria-label="Next slide"
            />

            {/* Carousel Container with Gradient Mask */}
            <div
                className="relative overflow-hidden"
                style={{
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                    maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
                }}
            >
                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto gap-6 px-[10%] md:px-[calc(50%-350px)] py-8 no-scrollbar scroll-smooth snap-x snap-mandatory items-center"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {children.map((child, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-[80vw] md:w-[700px] snap-center transition-all duration-500"
                        >
                            <div className="transform transition-transform duration-500 hover:scale-[1.02]">
                                {child}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-4">
                {children.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollTo(index)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${index === activeIndex
                            ? 'w-8 bg-[#184c71]'
                            : 'w-1.5 bg-gray-300 hover:bg-gray-400'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};
