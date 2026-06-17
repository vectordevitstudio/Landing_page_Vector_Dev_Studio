import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { CASES, CASE_FILTERS, type CaseCategory } from '../../data/content';
import { ANIMATIONS } from '../../lib/animations';

export const Cases = () => {
  const [filter, setFilter] = useState<'Все' | CaseCategory>('Все');

  const visible = useMemo(
    () => (filter === 'Все' ? CASES : CASES.filter((c) => c.category === filter)),
    [filter]
  );

  return (
    <section id="cases" className="relative py-24 md:py-32">
      <div className="section-shell">
        <SectionHeader
          number="03 — Кейсы"
          ghost="03"
          title="Реализованные проекты"
          subtitle="Результаты, которые говорят сами за себя"
        />

        {/* Фильтр */}
        <div className="mb-10 flex flex-wrap gap-2">
          {CASE_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-[6px] border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors ${
                filter === f
                  ? 'border-ink bg-ink text-[#F5F3EC]'
                  : 'border-[var(--border-medium)] text-text-secondary hover:border-ink hover:text-ink'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Сетка кейсов */}
        <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((c, i) => (
              <motion.article
                key={c.client + c.title}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: ANIMATIONS.easeOut }}
                whileHover={{ y: -5 }}
                className="group relative flex cursor-pointer flex-col overflow-hidden rounded-[8px] border border-[var(--border-medium)] bg-bg-card transition-colors duration-300 hover:border-[var(--border-strong)]"
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-0 z-10 h-[2px] w-0 bg-accent-lime transition-all duration-300 group-hover:w-full"
                />
                {/* Превью */}
                <div
                  className="relative flex h-44 items-center justify-center overflow-hidden border-b border-[var(--border-medium)]"
                  style={{ background: c.gradient }}
                >
                  <span className="font-display text-[24px] font-medium tracking-tight text-ink/75">
                    {c.client}
                  </span>
                  <span className="absolute right-4 top-4 font-mono text-xs text-ink/40">
                    /0{i + 1}
                  </span>
                  <ArrowUpRight className="absolute bottom-4 right-4 h-5 w-5 text-ink/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  <div className="absolute left-4 top-4">
                    <span className="rounded-[4px] border border-[var(--border-medium)] bg-bg-card/80 px-2 py-1 font-mono text-2xs uppercase tracking-wider text-ink-soft backdrop-blur">
                      {c.badge}
                    </span>
                  </div>
                </div>

                {/* Тело */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-2 text-[19px] font-semibold tracking-tight text-ink">
                    {c.title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-text-secondary">
                    {c.description}
                  </p>
                  <ul className="mb-5 space-y-1.5">
                    {c.results.map((r) => (
                      <li key={r} className="flex items-center gap-2.5 text-sm text-text-primary">
                        <span className="h-1.5 w-1.5 shrink-0 bg-accent-green" />
                        {r}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-wrap gap-1.5">
                    {c.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-[4px] border border-[var(--border-medium)] px-2 py-1 font-mono text-2xs text-ink-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
