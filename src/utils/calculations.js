export const boundaries = el => el.getBoundingClientRect()

export const calculatePositionIndex = (position, seg) => Math.round(position / seg)
    
export const clamp = (n, min, max) => Math.min(Math.max(n, min), max)
