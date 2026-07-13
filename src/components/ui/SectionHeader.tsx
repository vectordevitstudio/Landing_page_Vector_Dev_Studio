import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { fadeUp } from '../../lib/animations';
import { Reveal } from './Reveal';

interface SectionHeaderProps {
  /** Метка секции, напр. "01 — Услуги" */
  number: string;
  title: string;
  subtitle?: string;
  ghost?: string;
}

export const SectionHeader = ({ number, title, subtitle, ghost }: SectionHeaderProps) => {
  const { ref, inView } = useScrollAnimation(0.3);

  return (
    <div ref={ref} className="relative mb-14 md:mb-20">
      {ghost && (
        <span
          aria-hidden
          className="ghost-number pointer-events-none absolute -top-14 right-0 hidden text-[150px] md:block"
        >
          {ghost}
        </span>
      )}

      <div className="relative">
        {/* Технический верхний регистр */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-7 flex items-center gap-3 border-t border-[var(--border-strong)] pt-4"
        >
          <span className="plus-mark" aria-hidden />
          <span className="eyebrow text-ink">{`[ ${number} ]`}</span>
        </motion.div>

        <div className="grid gap-x-8 gap-y-5 md:grid-cols-12 md:items-end">
          <h2
            className={`font-display text-[30px] font-semibold leading-[1.03] text-ink md:text-[46px] ${
              subtitle ? 'md:col-span-8' : 'md:col-span-12'
            }`}
          >
            <Reveal text={title} play={inView} stagger={0.06} delay={0.05} />
          </h2>
          {subtitle && (
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={0.2}
              className="text-base leading-relaxed text-text-secondary md:col-span-4 md:text-right"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>
    </div>
  );
};
