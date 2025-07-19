import { useState, useEffect } from 'react'; // React core imports

// Custom hook to determine if the current screen is "mobile" by checking orientation
function useIsMobile() {
    // Initial value: true if portrait (taller than wide)
    const [isMobile, setIsMobile] = useState(() => window.innerHeight > window.innerWidth);

    useEffect(() => {
        // On resize, recalculate orientation
        const handleResize = () => {
            setIsMobile(window.innerHeight > window.innerWidth);
        };

        // Listen to resize events
        window.addEventListener('resize', handleResize);

        // Clean up listener when component unmounts
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isMobile;
}

export default useIsMobile;
