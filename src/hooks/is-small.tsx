import { useEffect, useState } from 'react';

export default function useSmallScreen() {
    const [isSmall, setIsSmall] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        setIsSmall(mediaQuery.matches);

        const handler = (e: MediaQueryListEvent) => setIsSmall(e.matches);
        mediaQuery.addEventListener('change', handler);

        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    return isSmall;
};
