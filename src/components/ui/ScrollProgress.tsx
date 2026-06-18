import { motion, useScroll, useSpring } from 'framer-motion';

/** Тонкая полоса прогресса чтения сверху страницы. */
export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[9999] h-[2px] origin-left bg-[linear-gradient(90deg,var(--accent-green),var(--accent-lime))]"
    />
  );
};
