import CountUp from 'react-countup';
import Marquee from 'react-fast-marquee';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { STATS, MARQUEE_TECH } from '../../data/content';
import { ANIMATIONS } from '../../lib/animations';

export const Stats = () => {
  const { ref, inView } = useScrollAnimation(0.4);

  return (
    <section className="relative border-y border-[var(--border-subtle)] bg-bg-secondary">
      <div ref={ref} className="section-shell py-14">
        <div className="grid grid-cols-2 gap-y-10 md:grid-cols-4 md:divide-x md:divide-white/[0.08]">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: ANIMATIONS.easeOut }}
              className="px-4 text-center md:px-8"
            >
              <div className="text-4xl font-extrabold tracking-tight md:text-5xl">
                <span className="text-gradient">
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
                  {stat.suffix}
                </span>
              </div>
              <p className="mx-auto mt-2 max-w-[160px] text-sm text-text-secondary">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Бегущая строка технологий */}
      <div className="border-t border-[var(--border-subtle)] bg-bg-primary/60 py-4">
        <Marquee speed={40} gradient gradientColor="#04040A" gradientWidth={80} autoFill>
          {MARQUEE_TECH.map((t) => (
            <span
              key={t}
              className="mx-6 font-mono text-sm text-text-secondary/70"
            >
              <span className="mr-6 text-accent-violet/60">→</span>
              {t}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
};
