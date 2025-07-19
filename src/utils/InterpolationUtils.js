// Linear interpolation between two values, returns a value between start and end based on t
export function lerp(start, end, t) {
    // t should be between 0 and 1, where 0 returns start, 1 returns end, and intermediate values blend linearly
    return start + (end - start) * t;
}

// Clamp function that limits a number to a specified range
export function clamp(value, min, max) {
    // Ensure the value is at least 'min', and at most 'max'
    return Math.min(Math.max(value, min), max);
}