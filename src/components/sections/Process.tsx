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
          number="04"
          ghost="04"
          title="Как мы работаем"
          subtitle="От задачи до результата — прозрачный процесс"
        />

        <div ref={ref} className="relative">
          {/* Линия (desktop) */}
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-white/[0.08] md:block">
            <motion.div
              className="h-full bg-[linear-gradient(90deg,#6D56FA,#00D4FF)]"
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
                    <span className="absolute left-7 top-14 h-[calc(100%+1rem)] w-px bg-white/[0.08] md:hidden" />
                  )}

                  <div className="relative z-10 inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#6D56FA,#00D4FF)] shadow-[0_0_24px_rgba(109,86,250,0.35)] transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-6 w-6 text-white" />
                  </div>

                  <div className="md:mt-5">
                    <div className="mb-1 font-mono text-2xs text-accent-cyan">
                      0{i + 1}
                    </div>
                    <h3 className="text-base font-bold text-text-primary">
                      {step.title}
                    </h3>
                    <p className="text-sm text-text-secondary">{step.subtitle}</p>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary/80">
                      {step.description}
                    </p>
                    <span className="mt-3 inline-flex rounded-full border border-[var(--border-subtle)] px-2.5 py-0.5 text-2xs text-text-secondary">
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
