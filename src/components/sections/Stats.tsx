import CountUp from 'react-countup';
import Marquee from 'react-fast-marquee';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { STATS, MARQUEE_TECH } from '../../data/content';
import { ANIMATIONS } from '../../lib/animations';

export const Stats = () => {
  const { ref, inView } = useScrollAnimation(0.4);

  return (
    <section className="relative border-y border-[var(--border-strong)] bg-bg-secondary">
      <div ref={ref} className="section-shell px-0">
        <div className="grid grid-cols-2 divide-x divide-y divide-[var(--border-medium)] md:grid-cols-4 md:divide-y-0">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: ANIMATIONS.easeOut }}
              className="group relative px-6 py-9 transition-colors hover:bg-bg-card md:px-8 md:py-12"
            >
              <span className="mb-5 block font-mono text-[11px] text-ink-muted">
                0{i + 1}
              </span>
              <div className="font-display text-[36px] font-semibold leading-none text-ink md:text-[46px]">
                {stat.prefix}
                {inView ? (
                  <CountUp
                    end={stat.value}
                    decimals={stat.decimals ?? 0}
                    duration={2}
                    useEasing
                  />
                ) : (
                  0
                )}
                <span className="text-accent-green">{stat.suffix}</span>
              </div>
              <p className="mt-4 max-w-[180px] text-sm leading-snug text-text-secondary">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Бегущая строка технологий */}
      <div className="border-t border-[var(--border-medium)] bg-bg-primary py-4">
        <Marquee speed={40} gradient gradientColor="#F2F0E9" gradientWidth={80} autoFill>
          {MARQUEE_TECH.map((t) => (
            <span
              key={t}
              className="mx-7 font-mono text-xs uppercase tracking-wider text-text-secondary"
            >
              <span className="mr-7 text-accent-green">+</span>
              {t}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
};
