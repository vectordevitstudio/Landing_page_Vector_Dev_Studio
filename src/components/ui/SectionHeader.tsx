import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { fadeUp } from '../../lib/animations';

interface SectionHeaderProps {
  /** Номер секции, напр. "01" */
  number: string;
  title: string;
  subtitle: string;
  ghost?: string;
}

export const SectionHeader = ({ number, title, subtitle, ghost }: SectionHeaderProps) => {
  const { ref, inView } = useScrollAnimation(0.3);

  return (
    <div ref={ref} className="relative mb-12 md:mb-16">
      {ghost && (
        <span
          aria-hidden
          className="ghost-number absolute -top-10 left-0 hidden text-[120px] md:block"
        >
          {ghost}
        </span>
      )}

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="relative"
      >
        <div className="mb-4 flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-accent-green shadow-[0_0_12px_rgba(57,217,138,0.8)]" />
          <span className="font-mono text-sm text-text-secondary/40">{number}</span>
        </div>
        <h2 className="text-3xl font-extrabold leading-tight text-text-primary md:text-[48px]">
          {title}
        </h2>
        <p className="mt-4 max-w-xl text-base text-text-secondary md:text-lg">{subtitle}</p>
      </motion.div>
    </div>
  );
};
