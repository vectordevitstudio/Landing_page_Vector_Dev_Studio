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
              className="group relative overflow-hidden px-6 py-9 md:px-8 md:py-12"
            >
              {/* Лаймовая заливка при наведении */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 [background:linear-gradient(160deg,rgba(203,242,74,0.30),rgba(203,242,74,0.06))]"
              />
              {/* Тёплое свечение из угла */}
              <span
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 [background:var(--gradient-glow-lime)]"
              />
              {/* Лаймовая линия сверху */}
              <span
                aria-hidden
                className="absolute left-0 top-0 h-[2px] w-0 bg-accent-lime transition-all duration-500 ease-out group-hover:w-full"
              />
              {/* Угловая регистрационная метка */}
              <span
                aria-hidden
                className="plus-mark absolute right-3.5 top-3.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />

              <span className="relative z-[1] mb-5 block font-mono text-[11px] text-ink-muted transition-colors duration-300 group-hover:text-accent-green">
                0{i + 1}
              </span>
              <div className="relative z-[1] font-display text-[36px] font-semibold leading-none text-ink transition-transform duration-300 group-hover:-translate-y-0.5 md:text-[46px]">
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
              <p className="relative z-[1] mt-4 max-w-[180px] text-sm leading-snug text-text-secondary">
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
