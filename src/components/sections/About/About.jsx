import React, { useRef, Suspense } from 'react'; // React core imports
import { Canvas } from '@react-three/fiber'; // Three.js canvas in React

// JSX Components
import LogoModelSecondary from '../../elements/LogoModel/LogoModelSecondary.jsx';
import TextBoxSection from '../TextBoxSection/TextBoxSection.jsx';

// Hooks
import useScrollY from '../../../hooks/useScrollY.js';
import useScrollZone from '../../../hooks/useScrollZone.js';

// Styles
import './AboutStyle.css';

function About({ sectionRef }) {
    // Track vertical scroll position on the window
    const scrollY = useScrollY();

    // Reference to the canvas container to measure position and size
    const scrollCanvasRef = useRef();

    // Calculate scroll zones to trigger animations or effects on the 3D model
    const [zoneStart, zoneEnd] = useScrollZone(scrollCanvasRef, {
        startOffset: 0.8,       // Start trigger at 80% from the top of the viewport
        extraStart: -200,       // Adjust trigger zone start slightly upward
        endMultiplier: 0.35,    // End trigger at 35% of the element's height
        extraEnd: -350          // Adjust trigger zone end upward
    });

    return (
        <section className="scroll-section" ref={sectionRef}>
            <div className="scroll-layout">
                
                {/* Left side: Text content */}
                <TextBoxSection />

                {/* Right side: 3D canvas container */}
                <div className="secondary-canvas-wrapper" ref={scrollCanvasRef}>
                    <Canvas className="canvas2" camera={{ position: [0, 0, 10], fov: 50 }}>
                        {/* Ambient light for general illumination */}
                        <ambientLight intensity={1} />
                        {/* Directional light simulating sunlight */}
                        <directionalLight position={[5, 5, 5]} />
                        {/* Lazy load the 3D logo model to improve performance */}
                        <Suspense fallback={null}>
                            <LogoModelSecondary
                                scrollY={scrollY}       // Pass current scroll Y for animation logic
                                zoneStart={zoneStart}   // Pass start of scroll zone for animation
                                zoneEnd={zoneEnd}       // Pass end of scroll zone for animation
                            />
                        </Suspense>
                    </Canvas>
                </div>
            </div>
        </section>
    );
}

export default About;
