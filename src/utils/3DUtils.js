import * as THREE from "three"; // Three.js core library

// Creates a rounded rectangle shape for use in 3D geometry
export function createRoundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const w = width;
    const h = height;
    const r = Math.min(radius, w / 2, h / 2); // Ensure radius doesn't exceed half size

    // Draw rounded rectangle path
    shape.moveTo(-w / 2 + r, -h / 2);
    shape.lineTo(w / 2 - r, -h / 2);
    shape.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
    shape.lineTo(w / 2, h / 2 - r);
    shape.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
    shape.lineTo(-w / 2 + r, h / 2);
    shape.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
    shape.lineTo(-w / 2, -h / 2 + r);
    shape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);

    return shape;
}

// Fixes UV coordinates so that textures map correctly to custom shapes
export function fixUVs(geometry) {
    geometry.computeBoundingBox(); // Calculate bounding box
    const bbox = geometry.boundingBox;

    const size = new THREE.Vector2(
        bbox.max.x - bbox.min.x,
        bbox.max.y - bbox.min.y
    );

    const uvAttribute = geometry.attributes.uv;

    // Recalculate UVs to span 0–1 space over the bounding box
    for (let i = 0; i < uvAttribute.count; i++) {
        const uv = new THREE.Vector2().fromBufferAttribute(uvAttribute, i);
        uv.x = (uv.x - bbox.min.x) / size.x;
        uv.y = (uv.y - bbox.min.y) / size.y;
        uvAttribute.setXY(i, uv.x, uv.y);
    }

    uvAttribute.needsUpdate = true;
}