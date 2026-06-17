import type { Variants } from 'framer-motion';

export const ANIMATIONS = {
  easeOut: [0.16, 1, 0.3, 1] as [number, number, number, number],
  easeInOut: [0.45, 0, 0.55, 1] as [number, number, number, number],
  spring: { type: 'spring', stiffness: 100, damping: 20 } as const,
  springFast: { type: 'spring', stiffness: 200, damping: 25 } as const,
  fast: 0.3,
  normal: 0.6,
  slow: 0.9,
  staggerChildren: 0.08,
};

export const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: ANIMATIONS.staggerChildren },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: ANIMATIONS.normal, ease: ANIMATIONS.easeOut },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: ANIMATIONS.normal, ease: ANIMATIONS.easeOut, delay },
  }),
};
