import { motion } from 'framer-motion';
import { SectionHeader } from '../ui/SectionHeader';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { PROCESS } from '../../data/content';
import { ANIMATIONS } from '../../lib/animations';

export const Process = () => {
  const { ref, inView } = useScrollAnimation(0.2);

  return (
    <section id="process" className="relative bg-bg-secondary py-24 md:py-32">
      <div className="section-shell">
        <SectionHeader
          number="04 — Процесс"
          ghost="04"
          title="Как мы работаем"
        />

        <div ref={ref} className="relative">
          {/* Линия (desktop) */}
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-[var(--border-medium)] md:block">
            <motion.div
              className="h-full bg-ink"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.4, ease: ANIMATIONS.easeOut }}
              style={{ transformOrigin: 'left' }}
            />
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-5 md:gap-4">
            {PROCESS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.25 + i * 0.12,
                    ease: ANIMATIONS.easeOut,
                  }}
                  className="group relative flex gap-4 md:block"
                >
                  {/* Вертикальная линия (mobile) */}
                  {i < PROCESS.length - 1 && (
                    <span className="absolute left-7 top-14 h-[calc(100%+1rem)] w-px bg-[var(--border-medium)] md:hidden" />
                  )}

                  <div className="relative z-10 inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-[6px] bg-ink text-[#F5F3EC] transition-colors duration-300 group-hover:bg-accent-green group-hover:text-ink">
                    <Icon className="h-6 w-6" strokeWidth={1.6} />
                  </div>

                  <div className="md:mt-6">
                    <div className="mb-2 font-mono text-xs font-medium text-ink-muted">
                      [ 0{i + 1} ]
                    </div>
                    <h3 className="text-[17px] font-semibold tracking-tight text-ink">
                      {step.title}
                    </h3>
                    <p className="text-sm text-text-secondary">{step.subtitle}</p>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      {step.description}
                    </p>
                    <span className="mt-3 inline-flex rounded-[4px] border border-[var(--border-medium)] px-2.5 py-1 font-mono text-2xs text-ink-soft">
                      {step.duration}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
