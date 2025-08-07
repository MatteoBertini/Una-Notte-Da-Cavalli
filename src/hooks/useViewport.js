import { useState, useEffect } from 'react'; // React core imports

// Custom hook that returns the current viewport dimensions (width and height).
function useViewport() {
    // Initial state: set width and height to the current window size
    const [viewport, setViewport] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        // Function to handle window resize and update state
        const handleResize = () => {
            setViewport({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        // Attach the event listener
        window.addEventListener('resize', handleResize);

        // Cleanup the listener on unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Return the current viewport size
    return viewport;
}

export default useViewport;
