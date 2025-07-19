import React, { useEffect } from 'react'; // React core imports
import { useLocation } from 'react-router-dom'; // Gets the current route info

// This component ensures the page scrolls to the top every time the route changes.
// It does not render any UI — it's purely functional.
function TopScrollRouting() {
    // useLocation gives access to the current route info
    const { pathname } = useLocation();

    useEffect(() => {
        // Scroll to top (X=0, Y=0) when the pathname (URL route) changes
        window.scrollTo(0, 0);
    }, [pathname]); // This effect runs every time the route changes

    // No visual output; this component only runs logic
    return null;
}

export default TopScrollRouting;
