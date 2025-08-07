import { useEffect, useState } from 'react'; // React core imports

// Custom hook that tracks the mouse cursor position (x, y) relative to the viewport
function useMousePosition() {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        // Handler for mousemove event — updates state with current mouse position
        const handleMouseMove = (event) => {
            setPosition({
                x: event.clientX, // Distance from the left edge of the viewport
                y: event.clientY  // Distance from the top edge of the viewport
            });
        };

        // Register the event listener
        window.addEventListener('mousemove', handleMouseMove);

        // Clean up on unmount
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return position;
}

export default useMousePosition;