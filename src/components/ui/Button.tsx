import React from 'react';
import { cn } from '../../lib/utils'; // Assuming you created utils.ts, if not I will handle imports carefully.

// Note: I need to install clsx and tailwind-merge if I use this pattern. 
// I will assume I can just use template literals for now if those libs aren't installed, 
// BUT simply installing them is better practice. I'll add them to the next command or just use simple string logic for now to avoid blocking.
// Actually, I'll stick to simple logic for this iteration to ensure it runs without extra installs if I missed them. 
// EXCEPT I see I didn't install `clsx` and `tailwind-merge` in the first big install command. 
// To be safe, I will implement a simple version without those deps for now, or install them.
// Let's install them quickly, it's worth it.

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline' | 'ghost';
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    className,
    variant = 'primary',
    children,
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-foreground text-background hover:bg-neutral-800 hover:scale-105 active:scale-95",
        outline: "border-2 border-foreground text-foreground hover:bg-foreground hover:text-background",
        ghost: "text-foreground hover:underline underline-offset-4"
    };

    const combinedClassName = cn(baseStyles, variants[variant], className);

    return (
        <button className={combinedClassName} {...props}>
            {children}
        </button>
    );
};
