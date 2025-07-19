import { useEffect, useState } from 'react'; // React core imports

// Custom hook that returns the current vertical scroll position (window.scrollY)
function useScrollY() {
    // Initialize state with the current scroll position
    const [scrollY, setScrollY] = useState(window.scrollY);

    useEffect(() => {
        // Event handler to update scrollY on scroll
        const handleScroll = () => setScrollY(window.scrollY);

        // Add scroll event listener to the window
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener on component unmount
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Return current Y scroll position
    return scrollY;
}

export default useScrollY;