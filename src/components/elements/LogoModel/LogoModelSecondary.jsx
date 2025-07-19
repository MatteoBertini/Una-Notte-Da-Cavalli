import React, { useMemo, useRef } from 'react'; // React core imports
import { useGLTF } from '@react-three/drei'; // Load GLTF 3D models
import { useFrame } from '@react-three/fiber'; // Hook to update animations on each frame
import { clone } from 'three/examples/jsm/utils/SkeletonUtils'; // Utility to deep clone a 3D model with skeletons
import * as THREE from 'three'; // Three.js core library

// Hooks
import useIsMobile from '../../../hooks/useIsMobile';

// Assets
import LogoCavalli3D from "../../../assets/LogoCavalli3D.glb"

// Utils
import { clamp } from '../../../utils/InterpolationUtils.js';

// Functional component: takes scrollY and animation zones as props
const LogoModelSecondary = ({ scrollY, zoneStart, zoneEnd }) => {
    // Load the GLTF model from public folder
    const { scene } = useGLTF(LogoCavalli3D);

    // Reference for the 3D model object to manipulate position and rotation
    const modelRef = useRef();

    // Check if user is on mobile device
    const isMobile = useIsMobile();

    // Deep clone the loaded scene to avoid mutating original model instance
    // useMemo ensures cloning happens only when `scene` changes
    const clonedScene = useMemo(() => clone(scene), [scene]);

    // Constants for positioning and rotation control
    const startingX = 8;            // Starting X position of the model
    const maxRotation = Math.PI;    // Maximum rotation in radians (~180 degrees)

    // Base rotation quaternion to orient the model initially
    const baseQuat = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(Math.PI, 5 * Math.PI / 12, 0) // Rotate 180° around X, then ~75° around Y
    );
    const xAxis = useMemo(() => new THREE.Vector3(1, 0, 0), []);

    // Animation loop: runs every frame to update model rotation and position
    useFrame(() => {
        if (!modelRef.current) return;  // Safety check if ref is not yet assigned

        // Calculate animation progress based on scroll position inside given zone boundaries
        // progressRaw will be <0 before zoneStart and >1 after zoneEnd
        const progressRaw = (scrollY - zoneStart) / (zoneEnd - zoneStart);
        // Clamp progress between 0 and 1 to avoid invalid values
        const progress = clamp(progressRaw, 0, 1);

        // Additional rotation quaternion around X axis, animated based on scroll progress
        const rotationQuat = new THREE.Quaternion().setFromAxisAngle(
            xAxis,                       // X axis
            progress * maxRotation       // Interpolate rotation from 0 to maxRotation
        );

        // Apply combined rotation: base rotation * animated rotation
        modelRef.current.quaternion.copy(baseQuat).multiply(rotationQuat);

        // Adjust wow far the model will move on X axis if on mobile for different layout
        const endingPos = isMobile ? 7.75 : 9;

        // Update model X position interpolated between startingX and 0 based on scroll progress
        modelRef.current.position.x = startingX - progress * endingPos;
    });

    // Render the cloned 3D model primitive with initial scale and position
    return (<primitive ref={modelRef} object={clonedScene} scale={0.4} position={[startingX, 0, 0]} />);
};

export default LogoModelSecondary;