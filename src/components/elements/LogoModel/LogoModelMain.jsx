import React, { useMemo, useRef } from 'react'; // React core imports
import { useGLTF } from '@react-three/drei'; // Load GLTF 3D models
import { useFrame } from '@react-three/fiber'; // Hook to update animations on each frame
import { clone } from 'three/examples/jsm/utils/SkeletonUtils'; // Utility to deep clone a 3D model with skeletons

// Assets
import LogoCavalli3D from "../../../assets/LogoCavalli3D.glb"

// Utils
import { lerp } from '../../../utils/InterpolationUtils'; 

const LogoModelMain = ({ scrollY, mouse, isMobile }) => {
    const { scene } = useGLTF(LogoCavalli3D); // Load GLTF once
    const ref = useRef();                            // Ref to the 3D object
    const clonedScene = useMemo(() => clone(scene), [scene]); // Clone the GLTF scene to prevent mutation issues

    // Starting parameters
    const offsetYRotation = -900;
    const startingY = 1.7;

    // Keep track of current animated values
    const currentY = useRef(startingY);
    const currentRotX = useRef(0);
    const currentRotY = useRef(offsetYRotation);
    const time = useRef(0);

    // Animate model frame-by-frame
    useFrame((state, delta) => {
        if (!ref.current) return;

        time.current += delta;

        let targetRotY, targetRotX;

        if (isMobile) {
            // On mobile: simple idle animation
            targetRotY = offsetYRotation + Math.sin(time.current * 1.35) * 0.7;
            targetRotX = 0;
        } else {
            // On desktop: rotate model based on mouse
            targetRotY = offsetYRotation + mouse.x * 0.8;
            targetRotX = mouse.y * 0.4;
        }

        const targetPosY = startingY - scrollY / 100;

        // Smooth transitions (lerp avoids sudden jumps)
        currentRotY.current = lerp(currentRotY.current, targetRotY, 0.2);
        currentRotX.current = lerp(currentRotX.current, targetRotX, 0.2);
        currentY.current = lerp(currentY.current, targetPosY, 0.2);

        // Apply animation to the 3D model
        ref.current.rotation.y = currentRotY.current;
        ref.current.rotation.x = currentRotX.current;
        ref.current.position.y = currentY.current;

        // Responsive scaling
        const targetScale = isMobile ? 0.16 : 0.25;
        ref.current.scale.setScalar(lerp(ref.current.scale.x, targetScale, 0.1));
    });

    return (
        <primitive
            ref={ref}
            object={clonedScene}
            scale={0.25}
            position={[0, startingY, 0]}
        />
    );
};

export default LogoModelMain;
