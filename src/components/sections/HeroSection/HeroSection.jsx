import React, { forwardRef, Suspense } from 'react'; // React core imports
import { Canvas } from '@react-three/fiber'; // Three.js canvas in React

// JSX elements
import MainButton from '../../elements/MainButton/MainButton.jsx';
import LogoModelMain from '../../elements/LogoModel/LogoModelMain.jsx';

// Hooks
import useIsMobile from '../../../hooks/useIsMobile.js';
import useViewport from '../../../hooks/useViewport.js';

// Utils
import { clamp } from '../../../utils/InterpolationUtils.js';

// Styles
import './HeroSectionStyle.css';

// Forwarding ref to parent if needed for scroll zone detection or animation triggers
const HeroSection = forwardRef(({ scroll, mousepos, handleGoToPage }, ref) => {
    const isMobile = useIsMobile();                // Detect if screen is in portrait
    const { width } = useViewport();               // Get window width (used for scaling)

    // Clamp the scale to a visually nice range based on screen size
    const scale = clamp(width / 400, 1.05, 1.4);

    return (
        <div className="main-canvas-wrapper" ref={ref}>
            {/* Main 3D scene */}
            <Canvas className="canvas" camera={{ position: [0, 0, 10], fov: 50 }}>
                <ambientLight intensity={1} />
                <directionalLight position={[5, 5, 5]} />
                <Suspense fallback={null}>
                    <LogoModelMain
                        scrollY={scroll}
                        mouse={mousepos}
                        isMobile={isMobile}
                    />
                </Suspense>
            </Canvas>

            {/* Overlayed text and button */}
            <section className="hero-content">
                <h1>The Party Begins</h1>

                {/* Responsive scaling on the button */}
                <div className="button-wrapper" style={{ '--btn-scale': scale }}>
                    <MainButton text="Join the fun" onClick={handleGoToPage} />
                </div>
            </section>

            {/* Gradient fade for smooth transition to next section */}
            <div className="gradient-overlay" />
        </div>
    );
});

export default HeroSection;
