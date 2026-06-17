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
          number="06"
          ghost="06"
          title="Что говорят клиенты"
          subtitle="Несколько историй о результатах после внедрения"
        />

        <div className="relative mx-auto max-w-3xl">
          <Quote
            className="absolute -left-2 -top-6 h-16 w-16 text-accent-violet/20"
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
                <p className="text-lg leading-relaxed text-text-primary md:text-xl">
                  «{t.quote}»
                </p>
                <footer className="mt-6 flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#6D56FA,#00D4FF)] text-sm font-bold text-white">
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
                  className={`h-2 rounded-full transition-all ${
                    i === index ? 'w-8 bg-accent-violet' : 'w-2 bg-white/15'
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => paginate(-1)}
                aria-label="Предыдущий отзыв"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-subtle)] text-text-secondary transition-colors hover:border-accent-violet hover:text-text-primary"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => paginate(1)}
                aria-label="Следующий отзыв"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-subtle)] text-text-secondary transition-colors hover:border-accent-violet hover:text-text-primary"
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
