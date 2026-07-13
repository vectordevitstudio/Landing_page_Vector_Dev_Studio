import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { TESTIMONIALS } from '../../data/content';
import { ANIMATIONS } from '../../lib/animations';

export const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const paginate = (d: number) => {
    setDir(d);
    setIndex((prev) => (prev + d + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const t = TESTIMONIALS[index];

  return (
    <section className="relative bg-bg-secondary py-24 md:py-32">
      <div className="section-shell">
        <SectionHeader
          number="06 — Отзывы"
          ghost="06"
          title="Что говорят клиенты"
          subtitle="Несколько историй о результатах после внедрения"
        />

        <div className="relative mx-auto max-w-3xl rounded-[8px] border border-[var(--border-medium)] bg-bg-card p-8 md:p-12">
          <span className="plus-mark absolute right-5 top-5" aria-hidden />
          <Quote
            className="mb-6 h-9 w-9 fill-accent-lime text-accent-lime"
            aria-hidden
          />

          <div className="relative min-h-[220px] overflow-hidden">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.blockquote
                key={index}
                custom={dir}
                initial={{ opacity: 0, x: dir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -40 }}
                transition={{ duration: 0.4, ease: ANIMATIONS.easeOut }}
                className="relative"
              >
                <p className="text-[21px] font-medium leading-[1.45] tracking-tight text-ink md:text-[27px]">
                  «{t.quote}».
                </p>
                <footer className="mt-7 flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-[6px] bg-ink text-sm font-semibold text-[#F5F3EC]">
                    {t.initials}
                  </span>
                  <span>
                    <span className="block font-semibold text-text-primary">
                      {t.name}
                    </span>
                    <span className="block text-sm text-text-secondary">{t.role}</span>
                  </span>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Управление */}
          <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Отзыв ${i + 1}`}
                  onClick={() => {
                    setDir(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  className={`h-[3px] transition-all ${
                    i === index ? 'w-9 bg-ink' : 'w-4 bg-ink/20'
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => paginate(-1)}
                aria-label="Предыдущий отзыв"
                className="inline-flex h-10 w-10 items-center justify-center rounded-[6px] border border-[var(--border-medium)] text-text-secondary transition-colors hover:border-ink hover:bg-ink hover:text-[#F5F3EC]"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => paginate(1)}
                aria-label="Следующий отзыв"
                className="inline-flex h-10 w-10 items-center justify-center rounded-[6px] border border-[var(--border-medium)] text-text-secondary transition-colors hover:border-ink hover:bg-ink hover:text-[#F5F3EC]"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
