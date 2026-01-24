import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollRestoration component - scrolls to top when navigating to a new page
 * For routes (not hash links), it scrolls to the top of the page
 */
export const ScrollRestoration: React.FC = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        // Only scroll to top if there's no hash (anchor link)
        if (!hash) {
            window.scrollTo({ top: 0, behavior: 'instant' });
        }
    }, [pathname, hash]);

    return null;
};
