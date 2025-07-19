import React, { useState, useRef, useMemo } from "react"; // React core imports
import { useFrame } from "@react-three/fiber"; // Hook to update animations on each frame
import { a, useSpring } from "@react-spring/three"; // Animated components + springs for 3D
import { useTexture } from "@react-three/drei"; // Load textures in Three.js
import * as THREE from "three"; // Three.js core library

// Assets
import gradientTexture from "../../../assets/Gradient.png"
import shadowGradientTexture from "../../../assets/ShadowGradient.png"

// Utils
import { createRoundedRectShape, fixUVs } from '../../../utils/3DUtils.js'; 

// Component for each individual carousel card
function CarouselCard({
    index,
    x, // spring-based x offset
    src, // image texture source
    scaleFactor = 1,
    spacingFactor = 1.7,
    isMobile
}) {
    // Load three textures: main image, border overlay, and glow effect
    const texture = useTexture(src);
    const borderTexture = useTexture(gradientTexture);
    const shadowGlowTexture = useTexture(shadowGradientTexture);

    // Ref to the group of meshes for interaction and rotation
    const ref = useRef();

    // Track hover state (only used on desktop)
    const [hovered, setHovered] = useState(false);

    // Calculate animated offset from the current spring `x` value
    const offset = x.to((val) => index - val);

    // Position each card with spacing, and slight z-offset based on distance from center
    const position = offset.to((o) => [o * spacingFactor, 0, -Math.abs(o)]);

    // Scale central card larger, others smaller
    const scale = offset.to((o) => (Math.abs(o) < 0.5 ? 1 : 0.7) * scaleFactor);

    // Slight rotation left/right for 3D parallax effect
    const rotation = offset.to((o) => [0, o * 0.2, 0]);

    // Animate glow opacity using react-spring
    const { glowOpacity } = useSpring({
        glowOpacity: hovered && !isMobile ? 1 : 0,
        config: { tension: 250, friction: 25 }
    });

    // Ensure all cards are looking slightly forward
    useFrame(() => {
        ref.current?.lookAt(0, 0, 10);
    });

    // Rounded rectangle radius and sizes
    const radius = 0.25 * scaleFactor;
    const innerWidth = 2.0 * scaleFactor;
    const innerHeight = 2.5 * scaleFactor;

    // Generate geometry for the image shape (rounded rectangle)
    const innerGeometry = useMemo(() => {
        const shape = createRoundedRectShape(innerWidth, innerHeight, radius);
        const geom = new THREE.ShapeGeometry(shape);
        fixUVs(geom); // fix UVs so texture maps correctly
        return geom;
    }, [innerWidth, innerHeight, radius]);

    // Slightly larger outer border geometry
    const outerWidth = innerWidth * 1.02;
    const outerHeight = innerHeight * 1.02;
    const outerGeometry = useMemo(() => {
        const shape = createRoundedRectShape(outerWidth, outerHeight, radius);
        const geom = new THREE.ShapeGeometry(shape);
        fixUVs(geom);
        return geom;
    }, [outerWidth, outerHeight, radius]);

    return (
        <a.group
            ref={ref}
            position={position}
            scale={scale}
            rotation={rotation}
            onPointerOver={() => !isMobile && setHovered(true)}
            onPointerOut={() => !isMobile && setHovered(false)}
        >
            {/* Glow Layer */}
            <a.mesh geometry={outerGeometry} position={[0, 0, -0.03]} scale={[1.1, 1.1, 1]}>
                <a.meshBasicMaterial
                    map={shadowGlowTexture}
                    transparent
                    opacity={glowOpacity}
                    toneMapped={false}
                    side={THREE.DoubleSide}
                    depthWrite={false}
                    depthTest={false}
                    color={"#ff0033"}
                />
            </a.mesh>

            {/* Border Layer */}
            <mesh geometry={outerGeometry} position={[0, 0, -0.01]}>
                <meshBasicMaterial
                    map={borderTexture}
                    transparent
                    toneMapped={false}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Main Image Layer */}
            <mesh geometry={innerGeometry} position={[0, 0, 0]}>
                <meshBasicMaterial
                    map={texture}
                    transparent
                    toneMapped={false}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </a.group>
    );
}

export default CarouselCard;
