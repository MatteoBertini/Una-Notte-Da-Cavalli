import React, { useEffect } from 'react'; // React core imports

// Assets
import LogoCavalli from "../../../assets/LogoCavalli.png";

// Styles
import './NavbarStyle.css';

// Component accepts click handlers for navigation buttons
function Navbar({ onHomeClick, onAboutClick, onEventsClick, onContactsClick }) {

    useEffect(() => {
        // Scroll listener to dynamically update navbar opacity
        function onScroll() {
            const scrollTop = window.scrollY; // Current scroll position
            const maxScroll = 1800; // Max scroll reference for full opacity effect

            // Calculate opacity from 0 to 0.5 based on scroll
            let opacity = scrollTop / maxScroll;
            if (opacity > 0.5) opacity = 0.5;
            if (opacity < 0) opacity = 0;

            // Apply CSS variables for gradient/border opacity
            document.documentElement.style.setProperty('--bg-gradient-opacity', opacity);
            document.documentElement.style.setProperty('--border-gradient-opacity', opacity);
        }

        window.addEventListener('scroll', onScroll); // Add scroll event
        onScroll(); // Trigger once on mount for initial state

        return () => window.removeEventListener('scroll', onScroll); // Cleanup on unmount
    }, []);

    return (
        <nav className="navbar">
            <div className="logo">
                <img src={LogoCavalli} alt="Logo" />
                <span>Una Notte Da Cavalli</span>
            </div>
            <ul className="nav-links">
                <li><a onClick={onHomeClick}>Home</a></li>
                <li><a onClick={onAboutClick}>About</a></li>
                <li><a onClick={onEventsClick}>Events</a></li>
                <li><a onClick={onContactsClick}>Contacts</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;
