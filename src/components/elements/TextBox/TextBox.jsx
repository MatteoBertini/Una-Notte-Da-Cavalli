import React, { useState } from 'react'; // React core imports

// Hooks
import useIsMobile from '../../../hooks/useIsMobile.js';

// Styles
import './TextBoxStyle.css';

// Main functional component: accepts props for content, layout and animation
function TextBox({ title, content, id, progress, side }) {
    // Detect if device is mobile
    const isMobile = useIsMobile();

    // State to track whether the component is being hovered
    const [hovered, setHovered] = useState(false);

    // State to store the mouse position relative to the component
    const [mouse, setMouse] = useState({ x: 0, y: 0 });

    // Mouse move handler: triggers 3D tilt effect, only on desktop
    const handleMouseMove = (e) => {
        if (isMobile) return;  // Disable tilt on mobile

        // Get bounding box of the current component
        const rect = e.currentTarget.getBoundingClientRect();

        // Normalize mouse X position to range [-1, 1]
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;

        // Normalize mouse Y position to range [-1, 1]
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

        // Update the normalized mouse position in state
        setMouse({ x, y });
    };
    
    // Compute horizontal translation based on `side` and scroll `progress`
    let translateX;
    if (side === 'left') {
        translateX = -100 * (1 - progress); // Slide in from left
    } else {
        translateX = 100 * (1 - progress);  // Slide in from right
    }

    // Compute 3D tilt angles based on mouse position (only on desktop + hover)
    const rotateX = !isMobile && hovered ? -mouse.y * 20 : 0; // Tilt vertically
    const rotateY = !isMobile && hovered ? mouse.x * 20 : 0;  // Tilt horizontally

    // Slight scale increase on hover (desktop only)
    const scale = !isMobile && hovered ? 1.08 : 1;

    // Combine translation, rotation, and scale into a single transform string
    const transform = `translateX(${translateX}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;

    // Render the component
    return (
        <div
            id={id}  // Optional HTML ID for targeting
            className="text-box"  // Class for CSS styling
            style={{ opacity: progress, transform }} // Apply scroll fade-in and motion
            onMouseEnter={() => !isMobile && setHovered(true)} // Start tilt on hover
            onMouseLeave={() => !isMobile && setHovered(false)} // Reset tilt
            onMouseMove={handleMouseMove}  // Track mouse for rotation
        >
            {/* Title of the text box */}
            <h3>{title}</h3>

            {/* Render content line by line */}
            <div>
                {content.split('\n').map((line, index) => (
                    <p key={index}>{line}</p> // Map each line to a <p> element
                ))}
            </div>
        </div>
    );
}


export default TextBox;
