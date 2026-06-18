import { motion } from 'framer-motion';
import { SectionHeader } from '../ui/SectionHeader';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { TECH_STACK } from '../../data/content';
import { ANIMATIONS } from '../../lib/animations';

const DOT: Record<string, string> = {
  violet: 'bg-accent-violet',
  cyan: 'bg-accent-cyan',
  green: 'bg-accent-green',
  amber: 'bg-accent-amber',
};

export const TechStack = () => {
  const { ref, inView } = useScrollAnimation(0.15);

  return (
    <section className="relative py-24 md:py-32">
      <div className="section-shell">
        <SectionHeader
          number="05 — Технологии"
          ghost="05"
          title="Технологии, на которых строим"
          subtitle="Современный стек для AI, ML, бэкенда, фронтенда и инфраструктуры"
        />

        <div ref={ref} className="space-y-10">
          {TECH_STACK.map((group, gi) => (
            <div key={group.label}>
              <div className="mb-4 flex items-center gap-2.5">
                <span className={`h-2 w-2 rounded-full ${DOT[group.color]}`} />
                <h3 className="eyebrow text-ink-soft">{group.label}</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {group.items.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: gi * 0.05 + i * 0.025,
                      ease: ANIMATIONS.easeOut,
                    }}
                    whileHover={{ y: -3 }}
                    className="flex items-center gap-2 rounded-[4px] border border-[var(--border-medium)] bg-bg-card px-3.5 py-2 font-mono text-[13px] text-text-primary transition-colors hover:border-ink hover:bg-bg-card-hover"
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${DOT[group.color]}`} />
                    {item}
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
