import { motion } from 'framer-motion';
import { GlowCard } from '../ui/GlowCard';
import { SectionHeader } from '../ui/SectionHeader';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { containerVariants, itemVariants } from '../../lib/animations';
import { SERVICES } from '../../data/content';

const ICON_GRAD: Record<string, string> = {
  violet: 'from-accent-violet to-accent-violet-light',
  cyan: 'from-accent-cyan to-[#7DE9FF]',
  green: 'from-accent-green to-[#7DF0BA]',
  amber: 'from-accent-amber to-[#FFD27D]',
};

export const Services = () => {
  const { ref, inView } = useScrollAnimation(0.15);

  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="section-shell">
        <SectionHeader
          number="01"
          ghost="01"
          title="Что мы разрабатываем"
          subtitle="От AI-агентов до мобильных игр — полный спектр IT-разработки"
        />

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div key={service.title} variants={itemVariants}>
                <GlowCard className="h-full">
                  <div
                    className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${ICON_GRAD[service.color]} shadow-lg`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-text-primary">
                    {service.title}
                  </h3>
                  <p className="mb-5 text-sm leading-relaxed text-text-secondary">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex rounded-full border border-[var(--border-subtle)] bg-white/[0.06] px-3 py-1 text-2xs text-text-secondary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </GlowCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
