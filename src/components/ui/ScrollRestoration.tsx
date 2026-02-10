import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollRestoration component - scrolls to top when navigating to a new page
 * For routes (not hash links), it scrolls to the top of the page
 */
export const ScrollRestoration: React.FC = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        const scrollToHash = () => {
            const element = document.getElementById(hash.replace('#', ''));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                return true;
            }
            return false;
        };

        if (hash) {
            // Try immediately
            if (!scrollToHash()) {
                // Retry after a short delay to allow content to load
                const timer = setTimeout(() => {
                    scrollToHash();
                }, 100);
                return () => clearTimeout(timer);
            }
        } else {
            // Scroll to top if no hash
            window.scrollTo({ top: 0, behavior: 'instant' });
        }
    }, [pathname, hash]);

    return null;
};
