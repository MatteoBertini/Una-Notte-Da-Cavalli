import { useEffect, useState } from 'react'; // React core imports

// Custom hook that calculates a "scroll zone" based on a DOM element's position
// Returns [zoneStart, zoneEnd] values used for scroll-triggered animations
function useScrollZone(ref, config = {}) {
    // Destructure and set default config values
    const {
        startOffset = 0,     // Percentage of viewport height to offset zone start
        extraStart = 0,      // Pixel adjustment for zone start
        endMultiplier = 0,   // Multiplier of element height to determine zone end
        extraEnd = 0         // Pixel adjustment for zone end
    } = config;

    const [zoneStart, setZoneStart] = useState(0); // Start Y position of the zone
    const [zoneEnd, setZoneEnd] = useState(0);     // End Y position of the zone

    useEffect(() => {
        const updateZones = () => {
            if (ref.current) {
            // Get the bounding box of the target element
            const rect = ref.current.getBoundingClientRect();
            const scrollTop = window.scrollY || window.pageYOffset;
            const top = rect.top + scrollTop; // Absolute top position
            const height = rect.height;

            // Calculate scroll zone start and end points
            setZoneStart(top - window.innerHeight * startOffset + extraStart);
            setZoneEnd(top + height * endMultiplier + extraEnd);
            }
        };

        // Initial calculation on mount
        updateZones();

        // Update scroll zones on window resize (in case layout shifts)
        window.addEventListener('resize', updateZones);
        return () => window.removeEventListener('resize', updateZones);
    }, [ref, startOffset, extraStart, endMultiplier, extraEnd]);

    return [zoneStart, zoneEnd];
}

export default useScrollZone;