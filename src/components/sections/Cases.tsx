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
          number="03"
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
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                filter === f
                  ? 'border-accent-violet bg-[rgba(109,86,250,0.15)] text-accent-violet-light'
                  : 'border-[var(--border-subtle)] text-text-secondary hover:border-[var(--border-medium)] hover:text-text-primary'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Сетка кейсов */}
        <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((c) => (
              <motion.article
                key={c.client + c.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: ANIMATIONS.easeOut }}
                whileHover={{ y: -6 }}
                className="group flex cursor-pointer flex-col overflow-hidden rounded-[20px] border border-[var(--border-subtle)] bg-bg-card"
              >
                {/* Превью */}
                <div
                  className="relative flex h-44 items-center justify-center overflow-hidden"
                  style={{ background: c.gradient }}
                >
                  <span className="font-mono text-2xl font-bold text-white/80">
                    {c.client}
                  </span>
                  <ArrowUpRight className="absolute right-4 top-4 h-5 w-5 text-white/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  <div className="absolute left-4 top-4">
                    <span className="rounded-full bg-black/40 px-3 py-1 text-2xs font-medium text-white backdrop-blur">
                      {c.badge}
                    </span>
                  </div>
                </div>

                {/* Тело */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-2 text-lg font-bold text-text-primary">
                    {c.title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-text-secondary">
                    {c.description}
                  </p>
                  <ul className="mb-5 space-y-1.5">
                    {c.results.map((r) => (
                      <li key={r} className="flex items-center gap-2 text-sm text-text-primary/90">
                        <span className="h-1 w-1 rounded-full bg-accent-green" />
                        {r}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-wrap gap-2">
                    {c.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-white/[0.05] px-2 py-1 font-mono text-2xs text-text-secondary"
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
