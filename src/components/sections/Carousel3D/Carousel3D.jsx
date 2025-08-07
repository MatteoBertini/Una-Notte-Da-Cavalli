import React, { useRef, useEffect } from "react"; // React core imports
import { Canvas } from "@react-three/fiber"; // Three.js canvas in React
import { useSpring } from "@react-spring/three"; // Spring animations for 3D
import { useDrag } from "@use-gesture/react"; // Dragging handling hook

// JSX components
import CarouselCard from "../../elements/CarouselCard/CarouselCard.jsx";

// Hooks
import useIsMobile from "../../../hooks/useIsMobile";
import useViewport from "../../../hooks/useViewport";

// Utils
import { clamp } from '../../../utils/InterpolationUtils.js';

// Styles
import './Carousel3DStyle.css';

// Configs
import siteConfig from '../../../config/SiteConfig.js';


const Carousel3D = React.memo(React.forwardRef((_, ref) => {
    const maxIndex = siteConfig.mediaItems.length - 1;

    const isMobile = useIsMobile();
    const { width, height } = useViewport();

    // Calculate scale and spacing based on screen size
    const scaleFactor = isMobile ? clamp(width / 450, 0.7, 0.975) : 0.975;
    const spacingFactor = isMobile ? 0.9 : 1.7;
    const dragSensitivity = isMobile ? 0.007 : 0.005;
    const canvasHeight = isMobile ? '80svh' : '90svh'; // Height based on device

    const current = useRef(2); // Start at center index

    // Spring animation controller
    const [{ x }, api] = useSpring(() => ({
        x: current.current,
        config: { tension: 300, friction: 30 },
        immediate: true
    }));

    // On ready: animate to current card smoothly
    useEffect(() => {
        api.start({ x: current.current, immediate: false });
    }, [isMobile, api]);

    // Set dynamic CSS variable for container height
    useEffect(() => {
        if (ref?.current) {
            ref.current.style.setProperty('--carousel-height', canvasHeight);
        }
    }, [canvasHeight, ref]);

    // Handle drag gestures to update carousel position
    const bind = useDrag(({ delta: [dx], last, memo = current.current }) => {
        let newX = memo - dx * dragSensitivity;

        if (isNaN(newX)) newX = current.current;
        newX = clamp(newX, 0, maxIndex); // Clamp within bounds

        if (!last) {
            api.start({ x: newX, immediate: true });
        } else {
            const snapIndex = Math.round(newX);
            current.current = snapIndex;
            api.start({ x: snapIndex, immediate: false });
        }

        return newX;
    }, {
        axis: 'x',
        pointer: { touch: true },
        filterTaps: true,
        threshold: 2,
        preventScroll: true
    });

    return (
        <div
            {...bind()}
            className="carousel-container"
            ref={ref}
        >
            <Canvas
                camera={{ position: [0, 0, isMobile ? 5 : 5], fov: 30 }}
                style={{ width: '100%', height: '100%' }}
            >
                <ambientLight intensity={0.8} />
                {siteConfig.mediaItems.map((item, i) => (
                    <CarouselCard
                        key={i}
                        index={i}
                        x={x}
                        scaleFactor={scaleFactor}
                        spacingFactor={spacingFactor}
                        isMobile={isMobile}
                        {...item}
                    />
                ))}
            </Canvas>
        </div>
    );
}));

export default Carousel3D;
