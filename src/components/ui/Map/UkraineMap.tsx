import React from 'react';
import { UKRAINE_REGIONS } from '../../../data/mapPaths';

export const UkraineMap: React.FC = () => {
    return (
        <div className="w-full h-full relative">
            <svg
                viewBox="0 0 800 520" // Updated projection viewbox
                className="w-full h-full drop-shadow-sm"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {UKRAINE_REGIONS.map((region) => (
                    <path
                        key={region.id}
                        id={String(region.id)}
                        d={region.d}
                        data-name={region.name}
                        className="stroke-foreground/10 stroke-[0.5] fill-transparent hover:fill-accent/10 transition-all duration-500 ease-out cursor-pointer hover:stroke-accent/50"
                    />
                ))}
            </svg>
        </div>
    );
};
