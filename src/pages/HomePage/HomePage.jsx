import React, { useRef } from 'react'; // React core imports
import { useNavigate } from "react-router-dom"; // Allow to navigate to another page

// JSX elements
import Navbar from '../../components/sections/Navbar/Navbar.jsx';
import HeroSection from '../../components/sections/HeroSection/HeroSection.jsx';
import Carousel3D from '../../components/sections/Carousel3D/Carousel3D.jsx';
import Footer from '../../components/sections/Footer/Footer.jsx';
import About from '../../components/sections/About/About.jsx';

// Hooks
import useScrollY from '../../hooks/useScrollY.js';
import useMousePosition from '../../hooks/useMousePosition.js';

// Styles
import './HomePageStyle.css';

function HomePage() {
    // Refs for smooth scroll navigation
    const HomeRef = useRef();
    const AboutRef = useRef();
    const EventsRef = useRef();
    const ContactsRef = useRef();

    // Scroll and mouse tracking
    const scrollY = useScrollY();
    const mouse = useMousePosition();
    const normalizedMouse = {
        x: (mouse.x / window.innerWidth - 0.5) * 2,
        y: (mouse.y / window.innerHeight - 0.5) * 2
    };

    const navigate = useNavigate();
    const handleGoToPage = () => navigate('/JoinTheFun');

    return (
        <div className="page-wrapper">
            {/* Navbar with scroll controls */}
            <Navbar 
                onHomeClick={() => HomeRef.current?.scrollIntoView({ behavior: 'smooth' })}
                onAboutClick={() => AboutRef.current?.scrollIntoView({ behavior: 'smooth' })}
                onEventsClick={() => EventsRef.current?.scrollIntoView({ behavior: 'smooth' })}
                onContactsClick={() => ContactsRef.current?.scrollIntoView({ behavior: 'smooth' })}
            />

            {/* Hero section with intro and mouse interaction */}
            <HeroSection
                ref={HomeRef}
                scroll={scrollY}
                mousepos={normalizedMouse}
                handleGoToPage={handleGoToPage}
            />

            {/* Scroll-driven About section */}
            <About sectionRef={AboutRef} />

            {/* Carousel section*/}
            <Carousel3D ref={EventsRef} />

            {/* Footer section */}
            <Footer ref={ContactsRef} />
        </div>
    );
}

export default HomePage;
