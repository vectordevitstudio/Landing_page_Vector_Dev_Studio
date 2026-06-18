import { motion } from 'framer-motion';
import { SectionHeader } from '../ui/SectionHeader';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { containerVariants, itemVariants } from '../../lib/animations';
import { SERVICES } from '../../data/content';

const TILE: Record<string, string> = {
  violet: 'border-[rgba(74,64,201,0.3)] bg-[rgba(74,64,201,0.07)] text-accent-violet',
  cyan: 'border-[rgba(28,126,146,0.3)] bg-[rgba(28,126,146,0.07)] text-accent-cyan',
  green: 'border-[rgba(15,165,108,0.32)] bg-[rgba(15,165,108,0.08)] text-accent-green',
  amber: 'border-[rgba(178,107,42,0.3)] bg-[rgba(178,107,42,0.07)] text-accent-amber',
};

export const Services = () => {
  const { ref, inView } = useScrollAnimation(0.15);

  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="section-shell">
        <SectionHeader
          number="01 — Услуги"
          ghost="01"
          title="Что мы разрабатываем"
          subtitle="От AI-агентов до мобильных приложений — полный спектр IT-разработки"
        />

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 border-l border-t border-[var(--border-medium)] sm:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={itemVariants}
                className="group relative border-b border-r border-[var(--border-medium)] p-7 transition-colors duration-300 hover:bg-bg-card md:p-8"
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-[2px] w-0 bg-accent-lime transition-all duration-300 group-hover:w-full"
                />
                <div className="mb-6 flex items-start justify-between">
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-[6px] border ${TILE[service.color]}`}
                  >
                    <Icon className="h-[22px] w-[22px]" strokeWidth={1.6} />
                  </div>
                  <span className="font-mono text-xs text-ink-muted">
                    /0{i + 1}
                  </span>
                </div>
                <h3 className="mb-3 text-[18px] font-semibold tracking-tight text-ink">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
