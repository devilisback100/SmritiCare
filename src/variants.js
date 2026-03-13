export const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    }),
}

export const fadeIn = {
    hidden: { opacity: 0 },
    visible: (i = 0) => ({
        opacity: 1,
        transition: { delay: i * 0.08, duration: 0.4, ease: 'easeOut' },
    }),
}

export const scaleIn = {
    hidden: { opacity: 0, scale: 0.94 },
    visible: (i = 0) => ({
        opacity: 1,
        scale: 1,
        transition: { delay: i * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    }),
}

export const slideRight = {
    hidden: { opacity: 0, x: -20 },
    visible: (i = 0) => ({
        opacity: 1,
        x: 0,
        transition: { delay: i * 0.08, duration: 0.4, ease: 'easeOut' },
    }),
}